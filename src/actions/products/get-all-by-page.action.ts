//import { count, db, Product, sql } from "astro:db";
import type { ResponseAction } from "@/interfaces/app/response.interface";
import type { ProductWithImages } from "@/interfaces/products/product-with-images.interface";
import prisma from "@/libs/prisma";
import { getActionError } from "@/utils/get-action-error";
import { initResponseAction } from "@/utils/init-response";

export const getAllByPage = async ({
  page = 1,
  limit = 12,
}): Promise<ResponseAction> => {
  const resp = initResponseAction();
  page = page < 1 ? 1 : page;

  try {
    //const [totalRecords] = await db.select({ count: count() }).from(Product);
    const totalRecords = await prisma.productModel.count();
    const totalPages = Math.ceil(totalRecords / limit);

    console.log("getAllByPage", page, limit, totalPages);
    if (page > totalPages) resp.data = [];
    else {
      // Consulta los productos y sus imágenes
      const products = await prisma.productModel.findMany({
        skip: (page - 1) * limit,
        take: limit,
        include: {
          images: {
            take: 2, // Límite de imágenes
          },
        },
        orderBy: {
          title: "asc",
        },
      });

      // Mapea los productos y ajusta el formato de las imágenes
      const productsWithImages: ProductWithImages[] = products.map((product) => ({
        ...product,
        images: product.images.length
          ? product.images.map((img) => img.image).join(",")
          : "no-image.png",
      }));

      resp.data = productsWithImages;
      console.log("products", products);
    }

    resp.success = true;
    resp.pagination.totalPages = totalPages;
  } catch (error) {
    resp.message = getActionError(error);
  }

  return resp;
};
