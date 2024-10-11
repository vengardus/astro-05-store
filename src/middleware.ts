import { defineMiddleware } from "astro:middleware";
import { getSession } from "auth-astro/server";

const privateRoutes = ["/protected"];
const notAuthenticatedRoutes = ["/auth/login", "/auth/register"];

// `context` and `next` are automatically typed
export const onRequest = defineMiddleware( async (context, next) => {
  console.log("Middleware executed");
  //console.log(context.url);

  const session = await getSession(context.request);
  const isLoggedIn = !!session;
  const user = session?.user;

  context.locals.isLoggedIn = isLoggedIn; // definida en env.d.ts
  context.locals.user = null;
  context.locals.isAdmin = false;

  if (user) {
    context.locals.user = {
      name: user.name!,
      email: user.email!,
    };

    console.log("middleware-user", user)

    context.locals.isAdmin = user.role === "admin";
  }

  if (!isLoggedIn && privateRoutes.includes(context.url.pathname)) {
    return context.redirect("/");
  }

  if (!context.locals.isAdmin && context.url.pathname.startsWith("/dashboard")) {
    return context.redirect("/");
  }

  if (isLoggedIn && notAuthenticatedRoutes.includes(context.url.pathname)) {
    return context.redirect("/");
  }

  return next();
});
