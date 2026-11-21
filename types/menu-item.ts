import type { LucideIcon } from "lucide-react"
import type { UserRole } from "@/lib/roles"

export type MenuItem = {
    name: string
    url: string
    icon: LucideIcon
}

export type MenuItemsByRole = Record<UserRole, MenuItem[]>
