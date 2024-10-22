import type { ResponseAction } from "@/interfaces/app/response.interface";
import prisma from "@/libs/prisma";
import { getActionError } from "@/utils/get-action-error";
import { initResponseAction } from "@/utils/init-response";

interface Props {
  slug: string;
}

export const getBySlug = async ({ slug }: Props): Promise<ResponseAction> => {
  const resp = initResponseAction();

  try {
    if ( slug === undefined) throw new Error('slug is required')
    if ( slug === 'new') {
      resp.data = {
        product: null,
        images: [],
        isNew: true
      }
      resp.success = true
      return resp
    }

    //const [product] = await db.select().from(Product).where(eq(Product.slug, slug)).limit(1);
    const product = await prisma.productModel.findUnique({
      where: {
        slug
      },
      include: {
        images: {
          take: 2
        }
      },
    })
    
    if (!product) throw new Error('Product not found')

    //const images = await db.select().from(ProductImage).where(eq(ProductImage.productId, product.id)).limit(2);
    const images = await prisma.productImageModel.findMany({
      where: {
        productId: product.id
      },
      take: 2
    })
    resp.data = {
      product,
      //images: images.map(image => image.image)
      images
    }
    resp.success = true

  } catch (error) {
    resp.message = getActionError(error);
  }

  return resp;
};
