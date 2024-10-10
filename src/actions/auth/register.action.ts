import type { ResponseAction } from "@/interfaces/app/response.interface";
import { initResponseAction } from "@/utils/init-response";
import type { AstroCookies } from "astro";
// import { createUserWithEmailAndPassword, sendEmailVerification, updateProfile, type AuthError } from "firebase/auth";
// import { firebase } from "src/firebase/config";

export const register = async (
  data: { name: string; email: string; password: string; rememberMe?: boolean },
  cookies: AstroCookies,
): Promise<ResponseAction> => {
  const { name, email, password, rememberMe } = data;
  
  const resp = initResponseAction()

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

  // Creación de usuario
  try {
    // await createUserWithEmailAndPassword(
    //   firebase.auth,
    //   email,
    //   password,
    // );

    // if ( ! firebase.auth.currentUser )
    //   throw new Error("Ocurripo un error al registrar usuario");

    // // Actualizar datos de usuario (display name)
    // updateProfile(firebase.auth.currentUser, { 
    //   displayName: name,
    //   //photoURL: "https://i.pravatar.cc/300"
    // });

    // // Verificar el correo electronico
    // await sendEmailVerification(firebase.auth.currentUser, {
    //   // url: `http://localhost:4321/protected?emailVerified=true`,
    //   url: `${import.meta.env.WEBSITE_URL}/protected?emailVerified=true`,
    // });

    resp.success = true;
    //return user;
  } catch (error) {
    console.log(error);
    // const firebaseError = error as AuthError;
    // if (firebaseError.code === "auth/email-already-in-use") 
    //   resp.message = "El correo ya existe";
    // else
    //   resp.message = "Ocurripo un error al registrar usuario. Error: " + error; //throw new Error("Ocurripo un error al registrar usuario");
  }

  return resp
};
