import * as z from "zod";

export const DistObjectSchema = z.looseObject({
  tarball: z.url(),
  shasum: z.hash("sha1"),
  integrity: z.string().optional(),
  fileCount: z.number().optional(),
  unpackedSize: z.number().optional(),
  "npm-signature": z.string().optional(),
});

export type DistObject = z.infer<typeof DistObjectSchema>;
