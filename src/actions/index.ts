import { getEnv } from "./app/index.action";
import { loginUser, loginUserWithGoogle, logoutUser, registerUser } from "./auth/index.action";
import { getCartFromCookies } from "./cart/index.action";
import { getAllProductsByPage, getProducBySlug } from "./products/index.action";

export const server = {
    // auth actions
    registerUser,
    logoutUser,
    loginUser,
    loginUserWithGoogle,
 
    // app
    getEnv,

    // products
    getAllProductsByPage,
    getProducBySlug,

    // cart
    getCartFromCookies
}