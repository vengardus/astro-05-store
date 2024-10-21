import type { ResponseAction } from "@/interfaces/app/response.interface";
import prisma from "@/libs/prisma";
import { getActionError } from "@/utils/get-action-error";
import { initResponseAction } from "@/utils/init-response";
import type { AstroCookies } from "astro";
import  bcrypt from 'bcryptjs'

export const register = async (
  data: { name: string; email: string; password: string; rememberMe?: boolean },
  cookies: AstroCookies,
): Promise<ResponseAction> => {
  const { name, email, password, rememberMe } = data;
  
  const resp = initResponseAction()

  // Cookies
  if (rememberMe) {
    cookies.set("email", email, {
      expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 365), // 1 año
      path: "/",
    });
  } else {
    cookies.delete("email", {
      path: "/",
    });
  }

  console.log(name, email, password, rememberMe);
  // Creación de usuario
  try {
    const role = await prisma.roleModel.findUnique({
      where: { id: "user" },
    })

    if ( !role) throw new Error('Role not found')

    const user = await prisma.userModel.create({
      data: {
        name,
        email,
        password: bcrypt.hashSync(password),
        roleId: role.id
      },
    })

    resp.success = true
    resp.data = user;
    //return user;
  } catch (error) {
    console.log(error);
    resp.message = getActionError(error);
  }

  return resp
};
