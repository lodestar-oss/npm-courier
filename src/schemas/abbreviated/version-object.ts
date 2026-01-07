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
  deprecated: z.string().optional(),
  dependencies: OptionalRecordSchema,
  acceptDependencies: OptionalRecordSchema,
  optionalDependencies: OptionalRecordSchema,
  devDependencies: OptionalRecordSchema,
  bundleDependencies: z.array(z.string()).optional(),
  peerDependencies: OptionalRecordSchema,
  peerDependenciesMeta: z
    .record(z.string(), z.object({ optional: z.boolean() }))
    .optional(),
  bin: OptionalRecordSchema,
  directories: OptionalRecordSchema,
  engines: OptionalRecordSchema,
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
