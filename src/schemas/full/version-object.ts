import { AbbreviatedVersionObjectSchema } from "@/schemas/abbreviated/version-object";
import { HumanObjectSchema } from "@/schemas/components/human-object";
import * as z from "zod";

export const FullVersionObjectSchema = z.looseObject({
  ...AbbreviatedVersionObjectSchema.omit({
    hasInstallScript: true,
  }).shape,
  _id: z.string(),
  _nodeVersion: z.string().optional(),
  _npmUser: HumanObjectSchema.optional(),
  _npmVersion: z.string().optional(),
  main: z.string().optional(),
});

export type FullVersionObject = z.infer<typeof FullVersionObjectSchema>;
