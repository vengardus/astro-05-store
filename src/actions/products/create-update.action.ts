import { getSession } from "auth-astro/server";
import type { ActionAPIContext } from "astro:actions";
import type { ResponseAction } from "@/interfaces/app/response.interface";
import { getActionError } from "@/utils/get-action-error";
import { initResponseAction } from "@/utils/init-response";
import {v4 as UUID} from "uuid"
import type { createUpdateProduct, productSchema } from "./index.action";
import type { z } from "astro:schema";
import { db, eq, Product } from "astro:db";

type ProductForm = z.infer<typeof productSchema>;

export const createUpdate = async(form:ProductForm, context:ActionAPIContext): Promise<ResponseAction> => {
    const resp = initResponseAction();

    try {
        const session = await getSession(context.request)
        const user = session?.user
        if (!user) throw new Error('Usuario no autenticado')

        const isNewProduct = form.id === 'new'
        const {id= UUID(), ...rest} = form
        rest.slug = rest.slug?.toLowerCase().replace(' ', '-').trim()
        const product = {
            id,
            user: user.id!,
            ...rest,
        }

        console.log("product", product)

        if (isNewProduct) 
            await db.insert(Product).values(product)
        else
            await db.update(Product).set(product).where(eq(Product.id, id))

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