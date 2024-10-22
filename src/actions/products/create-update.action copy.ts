import { getSession } from "auth-astro/server";
import type { ActionAPIContext } from "astro:actions";
import type { ResponseAction } from "@/interfaces/app/response.interface";
import { getActionError } from "@/utils/get-action-error";
import { initResponseAction } from "@/utils/init-response";
import { v4 as UUID } from "uuid";
import type { productSchema } from "./index.action";
import type { z } from "astro:schema";
import { ImageUpload } from "@/utils/image-upload";
import prisma from "@/libs/prisma";

type ProductForm = z.infer<typeof productSchema>;

export const createUpdate = async (
  form: ProductForm,
  context: ActionAPIContext,
): Promise<ResponseAction> => {
  const resp = initResponseAction();

  try {
    const session = await getSession(context.request);
    const user = session?.user;
    if (!user) throw new Error("Usuario no autenticado");

    const isNewProduct = form.id === "new";
    if (isNewProduct) form.id = undefined;
    const { id = UUID(), imageFiles, ...rest } = form;
    rest.slug = rest.slug?.toLowerCase().replace(" ", "-").trim();

    const user_ = await prisma.userModel.findUnique({
      where: {
        id: user?.id!
      }
    })
    if (!user_) {
      throw new Error('User not found')
    }


    const product = {
      id,
      //user: user.id!,
      //...rest,
      description: form.description,
      gender: form.gender as string,
      price: form.price,
      sizes: form.sizes,
      slug: form.slug,
      stock: form.stock,
      tags: form.tags,
      title: form.title,
      type: form.type as string,
      userId: user_.id!,
      //user: user_
    };

    console.log("product", product, isNewProduct);

    // Transaccion

    const prismaTx = await prisma.$transaction(async (tx) => {
      // producto
      if (isNewProduct)
        await prisma.productModel.create({ data: product }); //
      else 
        await prisma.productModel.update({ where: { id: product.id }, data: product });
      
      // Images
      const secureUrls: string[] = [];
      console.log("imageFiles", imageFiles);

      if (
        form.imageFiles &&
        form.imageFiles.length > 0 &&
        form.imageFiles[0].size > 0
      ) {
        const urls = await Promise.all(
          form.imageFiles.map((file) => ImageUpload.uploadImage(file)),
        );
        secureUrls.push(...urls);
      }

      secureUrls.forEach(async (imageUrl) => {
        const imageObj = {
          id: UUID(),
          image: imageUrl,
          productId: product.id,
        };

        await prisma.productImageModel.create({ data: imageObj });
        
      });

      // imageFiles?.forEach(async (imageFile) => {
      //     if (imageFile.size <= 0) return
      //     await ImageUpload.uploadImage(imageFile)
      // })

      //await db.batch(queries);
      return {
        product
      }
    });

    resp.data = {
      user,
      product: prismaTx.product,
      isNewProduct,
    };
    resp.success = true;
  } catch (error) {
    resp.message = getActionError(error);
  }

  return resp;
};
