import { AbbreviatedVersionObjectSchema } from "@/schemas/abbreviated/version-object";
import * as z from "zod";

export const FullVersionObjectSchema = z.looseObject({
  ...AbbreviatedVersionObjectSchema.omit({
    hasInstallScript: true,
  }).shape,
  _id: z.string(),
  _nodeVersion: z.string(),
  _npmUser: z.string(),
  _npmVersion: z.string(),
  main: z.string(),
});

export type FullVersionObject = z.infer<typeof FullVersionObjectSchema>;
