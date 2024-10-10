import type { ResponseAction } from "@/interfaces/app/response.interface";
import { initResponseAction } from "@/utils/init-response";


export const loginWithGoogle = async (credentials:any): Promise<ResponseAction> => {
    const resp = initResponseAction();

    try {
        //const credential = GoogleAuthProvider.credentialFromResult(credentials);
        
        // if ( ! credential )
        //     throw new Error("No se pudo autenticar con Google. Google SIgnIn falló");

        //await signInWithCredential(firebase.auth, credential)
        resp.success = true
    } catch (error) {
        // const firebaseError = error as AuthError;
        // resp.message = `Ocurrió un error en la autenticación: ${firebaseError.code}`;
    }
    return resp
}