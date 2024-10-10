import { db, Role, User } from 'astro:db';
import { v4 as uuid } from 'uuid'
import  bcrypt from 'bcryptjs'

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
		email: 'alice@example.com',
		password: bcrypt.hashSync('1234567', 10),
		role: "admin"
	}
	const dafne = {
		id: uuid(),
		name: 'Dafne',
		email: 'dafne@example.com',
		password: bcrypt.hashSync('1234567', 10),
		role: "user"
	}

	await db.insert(Role).values(roles)
	await db.insert(User).values([alice, dafne])

	console.log("seed executed")
}
