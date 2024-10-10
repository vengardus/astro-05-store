import Credentials from '@auth/core/providers/credentials';
import { db, eq, User } from 'astro:db';
import { defineConfig } from 'auth-astro';
import bcrypt from 'bcryptjs'

export default defineConfig({
  providers: [
    Credentials({
      credentials: {
        email: { label: 'Correo', type: 'text'},
        password: { label: 'Contraseña', type: 'password' },
      },
      authorize: async (credentials) => {
        const [user] = await db
          .select()
          .from(User)
          .where(eq(User.email, `${credentials?.email}`))
        
        if (!user) {
          throw new Error('User not found')
        }
        
        if ( bcrypt.compareSync(`${credentials?.password}`, `${user.password}`) ) {
          throw new Error('Password incorrect')
        }

        const {password:_, ...rest} = user
        console.log(rest)
        return rest
        
      },
    }),
  ],
});