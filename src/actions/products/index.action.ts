import { defineAction } from "astro:actions";
import { z } from "astro:schema";
import { getAllByPage } from "./get-all-by-page.action";
import { getBySlug } from "./get-by-slug.action";

export const getAllProductsByPage = defineAction({
    accept: "json",
    input: z.object({
        page: z.number().default(1),
        limit: z.number().default(12),
    }),
    handler: async ({ page, limit  }) => getAllByPage({ page, limit })
})

export const getProducBySlug = defineAction({
    accept: "json",
    input: z.object({
        slug: z.string()
    }),
    handler: async ({ slug }) => getBySlug({ slug })
})