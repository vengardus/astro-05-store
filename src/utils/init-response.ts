import type { ResponseAction } from "@/interfaces/app/response.interface";


export const initResponseAction = ():ResponseAction => {
    const resp: ResponseAction = {
        success: false,
        data: null,
        pagination: {
            currentPage: 0,
            totalPages: 0
        },
    };
    return resp
}