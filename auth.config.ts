import prisma from '@/libs/prisma';
import type { AdapterUser } from '@auth/core/adapters';
import Credentials from '@auth/core/providers/credentials';
//import { db, eq, User } from 'astro:db';
import { defineConfig } from 'auth-astro';
import bcrypt from 'bcryptjs'

export default defineConfig({

  providers: [
    Credentials({
      credentials: {
        email: { label: 'Correo', type: 'text'},
        password: { label: 'Contraseña', type: 'password' },
      },

      authorize: async ({email, password}) => {
        console.log("email:", email as string)
        console.log("password:", password as string)
        const user = await prisma
          .userModel
          .findUnique({
            where: {
              email: email as string
            }
          })

        if (!user) {
          console.log("User not found")
          throw new Error('User not found')
        }
        
        
        if (!bcrypt.compareSync(password as string, user.password) ) {
          console.log("Password incorrect!!!")
          throw new Error('Password incorrect!!!')
        }

        const {password:_, ...rest} = user
        console.log("rest::", rest)
        return rest
      },
    }),

  ],


  callbacks: {
    jwt: ({ token, user }) => {
      if (user) {
        token.user = user;
      }

      return token;
    },

    session: ({ session, token }) => {
      session.user = token.user as AdapterUser;

      console.log("session-user", session.user)
      return session;
    },
  },

});