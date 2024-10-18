import { getSession } from "auth-astro/server";
import type { ActionAPIContext } from "astro:actions";
import type { ResponseAction } from "@/interfaces/app/response.interface";
import { getActionError } from "@/utils/get-action-error";
import { initResponseAction } from "@/utils/init-response";
import {v4 as UUID} from "uuid"
import type { createUpdateProduct, productSchema } from "./index.action";
import type { z } from "astro:schema";
import { db, eq, Product, ProductImage } from "astro:db";
import { ImageUpload } from "@/utils/image-upload";

type ProductForm = z.infer<typeof productSchema>;

export const createUpdate = async(form:ProductForm, context:ActionAPIContext): Promise<ResponseAction> => {
    const resp = initResponseAction();

    try {
        const session = await getSession(context.request)
        const user = session?.user
        if (!user) throw new Error('Usuario no autenticado')

        const isNewProduct = form.id === 'new'
        if (isNewProduct) form.id = undefined
        const {id= UUID(), imageFiles, ...rest} = form
        rest.slug = rest.slug?.toLowerCase().replace(' ', '-').trim()
        const product = {
            id,
            user: user.id!,
            ...rest,
        }

        console.log("product", product)

        const queries:any = []

        // producto
        if (isNewProduct) 
            queries.push(db.insert(Product).values(product))
        else
            queries.push(db.update(Product).set(product).where(eq(Product.id, id)))

        // Images
        const secureUrls:string[] = []
        console.log("imageFiles", imageFiles)
        
        if ( 
            form.imageFiles &&
            form.imageFiles.length > 0 &&
            form.imageFiles[0].size > 0

        ) {
            const urls = await Promise.all(
                form.imageFiles.map(file => ImageUpload.uploadImage(file))
            )
            secureUrls.push(...urls)
        }

        secureUrls.forEach(imageUrl => {
            const imageObj = {
                id: UUID(),
                image:imageUrl,
                productId: product.id
            }

            queries.push(db.insert(ProductImage).values(imageObj))
        })

        // imageFiles?.forEach(async (imageFile) => {
        //     if (imageFile.size <= 0) return 
        //     await ImageUpload.uploadImage(imageFile)
        // })
        
        await db.batch(queries) 

        resp.data = {
            user,
            product,
            isNewProduct
        }
        resp.success = true
    } catch (error) {
        resp.message = getActionError(error);        
    }

    return resp
    
}