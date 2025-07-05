export const USER_ROLE = {
  SUPER_ADMIN: "SUPER_ADMIN",
  ADMIN: "ADMIN",
  SELLER: "SELLER",
  CUSTOMER: "CUSTOMER",
  COURIER: "COURIER",
} as const;

export const USER_STATUS = {
  ACTIVE: "ACTIVE",
  SUSPEND: "SUSPEND",
} as const;

export const UserSearchableFields = [
  "name",
  "email",
  "phone",
  "role",
  "status",
];
