import { defineAction } from "astro:actions";
import { getFromCookies } from "./get-from-cookies.action";

export const getCartFromCookies = defineAction({
    accept: "json",
    handler: async (_, {cookies}) => getFromCookies(cookies)
})