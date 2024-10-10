export interface Navbar {
  name: string;
  path: string;
  label?: string;
  options?: {
    name: string;
    path: string;
  }[];
}
