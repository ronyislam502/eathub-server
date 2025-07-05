import { z } from "zod";

const createCuisineValidationSchema = z.object({
  body: z.object({
    title: z.string(),
  }),
});

const updateCuisineValidationSchema = z.object({
  body: z.object({
    title: z.string().optional(),
  }),
});

export const CuisineValidations = {
  createCuisineValidationSchema,
  updateCuisineValidationSchema,
};
