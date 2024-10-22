import type { ResponseAction } from "@/interfaces/app/response.interface";
import prisma from "@/libs/prisma";
import { supabase } from "@/libs/supabase";
import { getActionError } from "@/utils/get-action-error";
import { initResponseAction } from "@/utils/init-response";

export const getAll = async(): Promise<ResponseAction> => {
    console.log("getAll")
    const resp = initResponseAction();

    try {
        const { data, error } = await supabase.from('a05_test01').select('*')
        if ( error ) throw new Error(error.message + error.code)
        
        const resp_prisma = await prisma.test01Model.findMany()

        const resp_user = await prisma.userModel.findMany()
        const resp_role = await prisma.roleModel.findMany()

        console.log("prisma:::", resp_prisma)

        resp.data = {
            dataSupabase: data,
            dataPrisma: resp_prisma,
            dataUser: resp_user,
            dataRole: resp_role
        }
        resp.success = true
    } catch (error) {
        resp.message = getActionError(error);    
    }

    return resp
}