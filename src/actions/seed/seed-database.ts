import { v4 as uuid } from "uuid";
import bcrypt from "bcryptjs";
import { seedProducts } from "./seed-data";
import prisma from "@/libs/prisma";
import type { Product  } from "@/interfaces/products/product.interface"
import type { ProductImage  } from "@/interfaces/products/product-image.interface"

// https://astro.build/db/seed
export default async function seed() {
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
  await prisma.roleModel.deleteMany();
  await prisma.userModel.deleteMany();
  await prisma.productImageModel.deleteMany();
  await prisma.productModel.deleteMany();

  // 2. Inserta Roles
  await prisma.roleModel.createMany({ data: roles });

  // 3. Inserta usuarios
  await prisma.userModel.createMany({ data: [alice, dafne] });

  // 4. Inserta productos

  const products: Product[] = []
  const productImages: ProductImage[] = []
  
  seedProducts.forEach((p) => {
    const product: Product = {
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
      images: []
    };

    products.push(product)

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

  await prisma.productModel.createMany({ data: products });

  console.log("seed executed");
}
