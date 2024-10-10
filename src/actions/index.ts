import { getEnv } from "./app/index.action";
import { loginUser, loginUserWithGoogle, logoutUser, registerUser } from "./auth/index.action";

export const server = {
    // auth actions
    registerUser,
    logoutUser,
    loginUser,
    loginUserWithGoogle,
    // app
    getEnv
}