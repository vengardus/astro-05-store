import { v4 as uuid } from "uuid";
import bcrypt from "bcryptjs";
import { seedProducts } from "./seed-data";
import prisma from "@/libs/prisma";
import type { Product } from "@/interfaces/products/product.interface";
import type { ProductImage } from "@/interfaces/products/product-image.interface";
import { initResponseAction } from "@/utils/init-response";
import type { ResponseAction } from "@/interfaces/app/response.interface";
import { getActionError } from "@/utils/get-action-error";
import type { ProductModel } from "@prisma/client";


// https://astro.build/db/seed
export const seed = async (): Promise<ResponseAction> => {
  const resp = initResponseAction();

  try {
    // define roles y usuarios
    const roles = [
      { id: "admin", name: "Administrador" },
      { id: "user", name: "Usuario de sistema" },
    ];

    const alice = {
      id: "ABC-ALICE", // uuid(),
      name: "Alice",
      email: "alice@gmail.com",
      password: bcrypt.hashSync("1234567"),
      roleId: "admin",
    };
    const dafne = {
      id: "ABC-DAFNE", //uuid(),
      name: "Dafne",
      email: "dafne@gmail.com",
      password: bcrypt.hashSync("1234567"),
      roleId: "user",
    };

    // 1. Delete registers
    await prisma.productImageModel.deleteMany();
    await prisma.productModel.deleteMany();
    await prisma.userModel.deleteMany();
    await prisma.roleModel.deleteMany();

    // 2. Inserta Roles
    await prisma.roleModel.createMany({ data: roles });

    // 3. Inserta usuarios
    await prisma.userModel.createMany({ data: [alice, dafne] });
    const users = await prisma.userModel.findMany();

    // 4. Inserta productos

    const products: ProductModel[] = [];
    const productImages: ProductImage[] = [];

    seedProducts.forEach((p) => {
      const product = {
        id: uuid(),
        description: p.description,
        gender: p.gender as string,
        price: p.price,
        sizes: p.sizes.join(","),
        slug: p.slug,
        stock: p.stock,
        tags: p.tags.join(","),
        title: p.title,
        type: p.type as string,
        userId: alice.id,
        //images: [],
        //user: users[0]!,
      };

      products.push(product);

      //await prisma.productModel.create({ data: products });

      p.images.forEach((img) => {
        const image = {
          id: uuid(),
          productId: product.id,
          image: img,
        };
        productImages.push(image);
      });
    });

    // await prisma.productModel.create({ data: {
    //   description: products[0].description,
    //   gender: products[0].gender,
    //   price: products[0].price,       
    //   sizes: products[0].sizes,
    //   slug: products[0].slug,
    //   stock: products[0].stock,
    //   tags: products[0].tags,
    //   title: products[0].title,
    //   type: products[0].type,
    //   userId: alice.id,
      
    // } });
    await prisma.productModel.createMany({ data: products });
    await prisma.productImageModel.createMany({ data: productImages });

    resp.success = true;
  } catch (error) {
    resp.message = getActionError(error);
  }

  console.log("seed executed");
  return resp;
};
