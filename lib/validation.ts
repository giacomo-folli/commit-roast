import { z } from "zod";

export const usernameSchema = z
  .string()
  .min(1)
  .max(39)
  .regex(/^[a-zA-Z0-9-]+$/);

export const contributionsSchema = z.object({
  username: usernameSchema,
  from: z.string().optional(),
  to: z.string().optional(),
});
