import { getEnv } from "./app/index.action";
import { loginUser, loginUserWithGoogle, logoutUser, registerUser } from "./auth/index.action";
import { getCartFromCookies } from "./cart/index.action";
import { createUpdateProduct, deleteProductImage, getAllProductsByPage, getProducBySlug } from "./products/index.action";
import { seedData } from "./seed/index.action";
import { getAllTest } from "./test/index.action";

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
    getCartFromCookies,

    // admin
    // products
    createUpdateProduct,
    deleteProductImage,

    // test
    getAllTest,

    // seed
    seedData
}