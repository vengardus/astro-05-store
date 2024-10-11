import { count, db, Product, sql } from "astro:db";
import type { ResponseAction } from "@/interfaces/app/response.interface";
import type { ProductWithImages } from "@/interfaces/products/product-with-images.interface";
import { getActionError } from "@/utils/get-action-error";
import { initResponseAction } from "@/utils/init-response";

export const getAllByPage = async ({
  page = 1,
  limit = 12,
}): Promise<ResponseAction> => {
  const resp = initResponseAction();
  page = page < 1 ? 1 : page;

  try {
    const [totalRecords] = await db.select({ count: count() }).from(Product);
    const totalPages = Math.ceil(totalRecords.count / limit);

    console.log("getAllByPage", page, limit, totalPages);
    if (page > totalPages) resp.data = [];
    else {
      const productsQuery = sql`
            select a.*,
            ( select GROUP_CONCAT(image,',') from 
                ( select * from ProductImage where productId = a.id limit 2 )
            ) as images
            from Product a
            LIMIT 12 OFFSET 0;
        `;

      const { rows } = await db.run(productsQuery);
      const products = rows as unknown as ProductWithImages[];

    //   const products: { Product: IProduct; ProductImage: IProductImage }[] =
    //     await db
    //       .select()
    //       .from(Product)
    //       .innerJoin(ProductImage, eq(ProductImage.productId, Product.id))
    //       .limit(limit)
    //       .offset((page - 1) * limit);

      resp.data = products;
    }

    resp.success = true;
    resp.pagination.totalPages = totalPages;
  } catch (error) {
    resp.message = getActionError(error);
  }

  return resp;
};
