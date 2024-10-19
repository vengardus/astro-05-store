import { defineAction } from "astro:actions";
import { getAll } from "./get-all.action";

export const getAllTest = defineAction({
    accept: "json",
    handler: async () => getAll()
})