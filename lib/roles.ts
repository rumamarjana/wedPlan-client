export const USER_ROLES = ["customer", "vendor", "admin"] as const

export type UserRole = (typeof USER_ROLES)[number]

export const ROLE_LABELS: Record<UserRole, string> = {
  customer: "Customer",
  vendor: "Vendor",
  admin: "Admin",
}

export const ROLE_DESCRIPTIONS: Record<UserRole, string> = {
  customer: "Plan your wedding and book vendors",
  vendor: "Offer your services to couples",
  admin: "Manage the WedPlan platform",
}

export function isUserRole(value: unknown): value is UserRole {
  return USER_ROLES.includes(value as UserRole)
}
