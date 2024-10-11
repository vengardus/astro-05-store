import type { Navbar } from "@/interfaces/app/nabvar.interface";

export const siteInfo = {
  title: "My Site",
  description: "This is my site",
};

export const NAVBAR_OPTIONS: Navbar[] = [
  {
    name: "Home",
    path: "/",
  },
  {
    name: "Protegido",
    path: "/protected",
    label: "protected",
  },
  {
    name: "Dashboard",
    path: "/dashboard",
    //label: "protected",
  },
  {
    name: "Ingresar",
    path: "/auth/login",
    label: "login",
  },
  {
    name: "Salir",
    path: "/auth/logout",
    label: "logout",
  },
];