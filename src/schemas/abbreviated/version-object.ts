import { DistObjectSchema } from "@/schemas/components/dist-object";
import * as z from "zod";

const OptionalRecordSchema = z.record(z.string(), z.string()).optional();

const FundingObjectSchema = z.object({
  type: z.string(),
  url: z.url(),
});

export const AbbreviatedVersionObjectSchema = z.object({
  name: z.string(),
  version: z.string(),
  dist: DistObjectSchema,
  deprecated: z.union([z.string(), z.boolean()]).optional(),
  dependencies: OptionalRecordSchema,
  acceptDependencies: OptionalRecordSchema,
  optionalDependencies: OptionalRecordSchema,
  devDependencies: OptionalRecordSchema,
  bundleDependencies: z.union([z.array(z.string()), z.boolean()]).optional(),
  peerDependencies: OptionalRecordSchema,
  peerDependenciesMeta: z
    .record(z.string(), z.object({ optional: z.boolean() }))
    .optional(),
  bin: z.union([z.record(z.string(), z.string()), z.string()]).optional(),
  directories: OptionalRecordSchema,
  engines: z
    .union([z.record(z.string(), z.string()), z.array(z.string())])
    .optional(),
  _hasShrinkwrap: z.boolean().optional(),
  hasInstallScript: z.boolean().optional(),
  funding: z
    .union([
      z.url(),
      FundingObjectSchema,
      z.array(z.union([z.url(), FundingObjectSchema])),
    ])
    .optional(),
  cpu: z.array(z.string()).optional(),
  os: z.array(z.string()).optional(),
});

export type AbbreviatedVersionObject = z.infer<
  typeof AbbreviatedVersionObjectSchema
>;
