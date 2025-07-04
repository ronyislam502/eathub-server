import { z } from "zod";

const createAddressValidationSchema = z.object({
  street: z.string().min(1, "Street is required"),
  city: z.string().min(1, "City is required"),
  state: z.string().optional(),
  postalCode: z.string().min(1, "Postal code is required"),
  country: z.string().min(1, "Country is required"),
});

const createSellerValidationSchema = z.object({
  body: z.object({
    password: z.string().max(20).optional(),
    seller: z.object({
      name: z.string().min(1, "Name is required"),
      description: z.string().min(1, "description is required"),
      email: z.string().email("Email is required"),
      phone: z.string().min(4, "Phone is required"),
      address: createAddressValidationSchema,
    }),
  }),
});

const updateAddressValidationSchema = z.object({
  street: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  postalCode: z.string().optional(),
  country: z.string().optional(),
});

const updateUserValidationSchema = z.object({
  body: z.object({
    name: z.string().optional(),
    description: z.string().optional(),
    email: z.string().email().optional(),
    password: z.string().optional(),
    address: updateAddressValidationSchema,
    phone: z.string().optional(),
  }),
});

export const SellerValidations = {
  createSellerValidationSchema,
  updateUserValidationSchema,
};
