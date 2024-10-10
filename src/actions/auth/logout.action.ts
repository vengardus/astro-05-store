import type { ResponseAction } from "@/interfaces/app/response.interface";
import { initResponseAction } from "@/utils/init-response";
// import { signOut, type AuthError } from "firebase/auth";
// import { firebase } from "src/firebase/config";

export const logout = async (): Promise<ResponseAction> => {
    const resp = initResponseAction();  

    try {
        //await signOut(firebase.auth);
        resp.success = true;
    } catch (error) {
        // const firebaseError = error as AuthError;
        // resp.message = `Ocurrió un error en la autenticación: ${firebaseError.code}`;
    }
    return resp
}