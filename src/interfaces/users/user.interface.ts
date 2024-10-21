import type { Role } from "../roles/role.interface"

export interface User {
    id: string
    name: string
    email: string
    password: string
    createdAt: Date
    
    role: Role
  }