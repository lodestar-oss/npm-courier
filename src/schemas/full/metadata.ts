import { HumanObjectSchema } from "@/schemas/components/human-object";
import { RepositoryObjectSchema } from "@/schemas/components/repository-object";
import { FullVersionObjectSchema } from "@/schemas/full/version-object";
import * as z from "zod";

export const FullMetadataSchema = z.object({
  _id: z.string(),
  _rev: z.string(),
  "dist-tags": z.record(z.string(), z.string()),
  time: z.record(z.string(), z.string()),
  name: z.string(),
  users: z.record(z.string(), z.boolean()).optional(),
  versions: z.record(z.string(), FullVersionObjectSchema),
  author: HumanObjectSchema.optional(),
  bugs: z
    .union([
      z.string(),
      z.object({ url: z.string().optional(), email: z.string().optional() }),
    ])
    .optional(),
  contributors: z.array(HumanObjectSchema).optional(),
  description: z.string().optional(),
  homepage: z.string().optional(),
  keywords: z.array(z.string()).optional(),
  license: z.string().optional(),
  maintainers: z.array(HumanObjectSchema),
  readme: z.string().optional(),
  readmeFilename: z.string().optional(),
  repository: RepositoryObjectSchema.optional(),
});

export type FullMetadata = z.infer<typeof FullMetadataSchema>;
