-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "ast";

-- CreateTable
CREATE TABLE "ast"."a05_test01" (
    "id" BIGSERIAL NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "description" TEXT,
    "type" TEXT,
    "price" DOUBLE PRECISION NOT NULL DEFAULT 10,

    CONSTRAINT "a05_test01_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ast"."ast_role" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "ast_role_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ast"."ast_user" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "roleId" TEXT NOT NULL,

    CONSTRAINT "ast_user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ast"."ast_product" (
    "id" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "gender" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "sizes" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "stock" DOUBLE PRECISION NOT NULL,
    "tags" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "ast_product_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ast"."ast_product_image" (
    "id" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "productId" TEXT NOT NULL,

    CONSTRAINT "ast_product_image_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ast_user_email_key" ON "ast"."ast_user"("email");

-- CreateIndex
CREATE UNIQUE INDEX "ast_product_slug_key" ON "ast"."ast_product"("slug");

-- AddForeignKey
ALTER TABLE "ast"."ast_user" ADD CONSTRAINT "ast_user_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "ast"."ast_role"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ast"."ast_product" ADD CONSTRAINT "ast_product_userId_fkey" FOREIGN KEY ("userId") REFERENCES "ast"."ast_user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ast"."ast_product_image" ADD CONSTRAINT "ast_product_image_productId_fkey" FOREIGN KEY ("productId") REFERENCES "ast"."ast_product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
