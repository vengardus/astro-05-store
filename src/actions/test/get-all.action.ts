import type { ResponseAction } from "@/interfaces/app/response.interface";
import { supabase } from "@/libs/supabase";
import { getActionError } from "@/utils/get-action-error";
import { initResponseAction } from "@/utils/init-response";

export const getAll = async(): Promise<ResponseAction> => {
    const resp = initResponseAction();

    try {
        const { data, error } = await supabase.from('a05_test').select('*')
        if ( error ) throw new Error(error.message)

        resp.data = data
        resp.success = true
    } catch (error) {
        resp.message = getActionError(error);    
    }

    return resp
}