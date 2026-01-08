import * as z from "zod";

export const HumanObjectSchema = z.looseObject({
  name: z.string().optional(),
  email: z.string().optional(),
  url: z.string().optional(),
});

export type HumanObject = z.infer<typeof HumanObjectSchema>;
