import type { AstroCookies } from "astro";
import type { ResponseAction } from "@/interfaces/app/response.interface";
import type { CartItem } from "@/interfaces/cart/cart-item.interface";
import { getActionError } from "@/utils/get-action-error";
import { initResponseAction } from "@/utils/init-response";
import type { CartItemExtends } from "@/interfaces/cart/cart-item-extends.interface";
import prisma from "@/libs/prisma";

export const getFromCookies = async (
  cookies: AstroCookies,
): Promise<ResponseAction> => {
  const resp = initResponseAction();

  try {
    const cart = JSON.parse(cookies.get("cart")?.value ?? "[]") as CartItem[];

    const productIds = cart.map((item: CartItem) => item.productId);
    /*
    const dbProducts = await db
      .select()
      .from(Product)
      .innerJoin(ProductImage, eq(ProductImage.productId, Product.id))
      .where(inArray(Product.id, productIds));
    */

    const dbProducts = await prisma.productModel.findMany({
        where: {
          id: {
            in: productIds,
          },
        },
        include: {
          images: true, // Incluye las
        },
      });


    const cartProducts:CartItemExtends[] = cart.map((item) => {
      const product = dbProducts.find(
        (dbp) => dbp.id == item.productId,
      );
      if (!product) throw new Error("Product in Cart not found");
      return {
        productId: item.productId,
        title: product.title,
        size: item.size,
        quantity: item.quantity,
        image: product.images[0].image.startsWith("http")
          ? product.images[0].image
          : `${import.meta.env.PUBLIC_URL}/images/products/${product.images[0].image}`,
        slug: product.slug,
        price: product.price
      };
    });

    console.log("cartProducts", cartProducts);
    resp.data = cartProducts;

    resp.success = true;
  } catch (error) {
    resp.message = getActionError(error);
  }

  return resp;
};
