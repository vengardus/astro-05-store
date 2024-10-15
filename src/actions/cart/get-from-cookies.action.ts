import type { AstroCookies } from "astro";
import type { ResponseAction } from "@/interfaces/app/response.interface";
import type { CartItem } from "@/interfaces/cart/cart-item.interface";
import { getActionError } from "@/utils/get-action-error";
import { initResponseAction } from "@/utils/init-response";
import { db, eq, inArray, Product, ProductImage } from "astro:db";
import type { CartItemExtends } from "@/interfaces/cart/cart-item-extends.interface";

export const getFromCookies = async (
  cookies: AstroCookies,
): Promise<ResponseAction> => {
  const resp = initResponseAction();

  try {
    const cart = JSON.parse(cookies.get("cart")?.value ?? "[]") as CartItem[];

    const productIds = cart.map((item: CartItem) => item.productId);

    const dbProducts = await db
      .select()
      .from(Product)
      .innerJoin(ProductImage, eq(ProductImage.productId, Product.id))
      .where(inArray(Product.id, productIds));

    const cartProducts:CartItemExtends[] = cart.map((item) => {
      const product = dbProducts.find(
        (dbp) => dbp.Product.id == item.productId,
      );
      if (!product) throw new Error("Product in Cart not found");
      return {
        productId: item.productId,
        title: product.Product.title,
        size: item.size,
        quantity: item.quantity,
        image: product.ProductImage.image.startsWith("http")
          ? product.ProductImage.image
          : `${import.meta.env.PUBLIC_URL}/images/products/${product.ProductImage.image}`,
        slug: product.Product.slug,
        price: product.Product.price
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
