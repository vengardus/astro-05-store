import type { ResponseAction } from "@/interfaces/app/response.interface";
import { getActionError } from "@/utils/get-action-error";
import { initResponseAction } from "@/utils/init-response";
import { db, eq, Product, ProductImage } from "astro:db";

interface Props {
  slug: string;
}

export const getBySlug = async ({ slug }: Props): Promise<ResponseAction> => {
  const resp = initResponseAction();

  try {
    const [product] = await db.select().from(Product).where(eq(Product.slug, slug)).limit(1);
    if (!product) throw new Error('Product not found')
    const images = await db.select().from(ProductImage).where(eq(ProductImage.productId, product.id)).limit(2);
    resp.data = {
      product,
      images: images.map(image => image.image)
    }
    resp.success = true

  } catch (error) {
    resp.message = getActionError(error);
  }

  return resp;
};
