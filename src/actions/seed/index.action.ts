import { defineAction } from "astro:actions";
import { seed } from "./seed-database.action";

export const seedData = defineAction({
    accept: "json",
    handler: async () => seed()
})