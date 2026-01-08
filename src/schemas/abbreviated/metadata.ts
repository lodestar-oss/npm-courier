import { AbbreviatedVersionObjectSchema } from "@/schemas/abbreviated/version-object";
import * as z from "zod";

export const AbbreviatedMetadataSchema = z.object({
  name: z.string(),
  modified: z.string(),
  "dist-tags": z.record(z.string(), z.string()),
  versions: z.record(z.string(), AbbreviatedVersionObjectSchema),
});

export type AbbreviatedMetadata = z.infer<typeof AbbreviatedMetadataSchema>;
