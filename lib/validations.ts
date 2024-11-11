import { z } from "zod";

export const signUpSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export const signInSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export const addressSchema = z.object({
  name: z.string().min(1, "Name is required"),
  mobileNo: z.string().regex(/^\d{10}$/, "Mobile number must be 10 digits"),
  email: z.string().email("Invalid email format"),
  address: z.string().min(5, "Address should have at least 5 characters"),
  area: z.string().optional(),
  landmark: z.string().optional(),
  pinCode: z.string().regex(/^\d{6}$/, "Pin code must be 6 digits"),
  city: z.string().min(1, "City is required"),
  state: z.string().min(1, "State is required"),
});

export type AddressFormValues = z.infer<typeof addressSchema>;
