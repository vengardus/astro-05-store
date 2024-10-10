import { defineAction } from "astro:actions";
import { getEnv_ } from "./get-env.action";
import { z } from "astro:schema";

export const getEnv = defineAction({
    accept: "json",
    input: z.object({
        key: z.string()
    }),
    handler: async ({key}) => getEnv_(key)
})  