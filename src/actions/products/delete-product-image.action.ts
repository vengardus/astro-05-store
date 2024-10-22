import type { ResponseAction } from "@/interfaces/app/response.interface";
import prisma from "@/libs/prisma";
import { getActionError } from "@/utils/get-action-error";
import { ImageUpload } from "@/utils/image-upload";
import { initResponseAction } from "@/utils/init-response";
import { getSession } from "auth-astro/server";

export const deleteProductImage = async (
  imageId: string,
  request: Request
): Promise<ResponseAction> => {
  const resp = initResponseAction();

  try {
    const session = await getSession(request)
    const user = session?.user
    if (!user) throw new Error('Usuario no autenticado')

    const productImage = await prisma.productImageModel.findUnique({
      where: {
        id: imageId
      }
    })
    
    if (!productImage) throw new Error('Product Image not found')    
    
    await prisma.productImageModel.delete({
      where: {
        id: imageId
      }
    })
   
    if (productImage.image.includes("http")) 
        await ImageUpload.delete(productImage.image)
    
    resp.success = true
  } catch (error) {
    resp.message = getActionError(error);
  }

  return resp;
};
