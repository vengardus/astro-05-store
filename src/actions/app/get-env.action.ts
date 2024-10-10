import type { ResponseAction } from "@/interfaces/app/response.interface"
import { initResponseAction } from "@/utils/init-response";

export const getEnv_ = async (key:string):Promise<ResponseAction> => {
    const resp = initResponseAction();
    console.log('get-key', key)
    const value = import.meta.env[key]?? ''
    resp.success = true
    resp.data = value

    return resp
}