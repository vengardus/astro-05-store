import type { AstroCookies } from "astro";
import type { ResponseAction } from "@/interfaces/app/response.interface";
//import { signInWithEmailAndPassword, type AuthError } from "firebase/auth";
// import { firebase } from "src/firebase/config";
import { initResponseAction } from "@/utils/init-response";

export const login = async (
  data: { email: string; password: string, rememberMe?: boolean },
  cookies: AstroCookies,
):Promise<ResponseAction> => {
  const { email, password, rememberMe } = data;

  const resp = initResponseAction();

  // Cookies
  if (rememberMe) {
    cookies.set("email", email, {
      expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 365), // 1 año
      path: "/",
    });
  } else {
    cookies.delete("email", {
      path: "/",
    });
  }
  
  try {
    // const user = await signInWithEmailAndPassword(
    //   firebase.auth,
    //   email,
    //   password,
    // );

    //resp.success = user ? true : false;
  } catch (error) {
    // const firebaseError = error as AuthError;
    // resp.message = `Ocurrió un error en la autenticación: ${firebaseError.code}`;
   
  }
  return resp;
};
