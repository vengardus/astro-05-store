import { defineAction } from "astro:actions";
import { object, z } from "astro:schema";
import { getAllByPage } from "./get-all-by-page.action";
import { getBySlug } from "./get-by-slug.action";
import { createUpdate } from "./create-update.action";

export const getAllProductsByPage = defineAction({
  accept: "json",
  input: z.object({
    page: z.number().default(1),
    limit: z.number().default(12),
  }),
  handler: async ({ page, limit }) => getAllByPage({ page, limit }),
});

export const getProducBySlug = defineAction({
  accept: "json",
  input: z.object({
    slug: z.string(),
  }),
  handler: async ({ slug }) => getBySlug({ slug }),
});



// Define the prductt schema
const MAX_FILES = 5_000_000 // 5MB
const ACCEPTED_IMAGE_TYPES = [
  'image/png', 
  'image/jpeg', 
  'image/jpg', 
  'image/webp', 
  'image/svg+xml'
]

export const productSchema = z.object({
    id: z.string().optional(),
    description: z.string(),
    gender: z.string(),
    price: z.number(),
    sizes: z.string(),
    slug: z.string(),
    stock: z.number(),
    tags: z.string(),
    title: z.string(),
    type: z.string(),

    imageFiles: z.array(
      z.instanceof(File)
        .refine((file) => file.size <= MAX_FILES, "El tamaño del archivo no puede superar los 5MB")
        .refine( (file) => ACCEPTED_IMAGE_TYPES.includes(file.type), "El tipo de archivo no es permitido")
    ).optional(),

  });

export const createUpdateProduct = defineAction({
  accept: "form",
  input: productSchema,
  handler: async (form, context) => createUpdate(form, context),
});
