import { db, Role, User, Product, ProductImage } from 'astro:db';
import { v4 as uuid } from 'uuid'
import  bcrypt from 'bcryptjs'
import { seedProducts } from './seed-data';

// https://astro.build/db/seed
export default async function seed() {
	// TODO

	const roles = [
		{ id: 'admin', name: 'Administrador' },
		{ id: 'user', name: 'Usuario de sistema' }
	]

	const alice = {
		id: uuid(),
		name: 'Alice',
		email: 'alice@gmail.com',
		password: bcrypt.hashSync('1234567'),
		role: "admin"
	}
	const dafne = {
		id: uuid(),
		name: 'Dafne',
		email: 'dafne@gmail.com',
		password: bcrypt.hashSync('1234567'),
		role: "user"
	}

	await db.insert(Role).values(roles)
	await db.insert(User).values([alice, dafne])

	const queries:any = []

	seedProducts.forEach((p) => {
		const product = {
			id: uuid(),
			description : p.description,
			gender : p.gender as string,
			price : p.price,
			sizes : p.sizes.join(','),	
			slug : p.slug,
			stock : p.stock, 	
			tags : p.tags.join(','),
			title : p.title,
			type : p.type as string,
			user : alice.id
		}

		queries.push(db.insert(Product).values(product))

		p.images.forEach((img) => {
			const image = {
				id : uuid(),
				productId : product.id,
				image : img
			}
			queries.push(db.insert(ProductImage).values(image))
		})
	})

	await db.batch(queries)

	console.log("seed executed")
}
