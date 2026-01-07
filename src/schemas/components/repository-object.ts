import * as z from "zod";

export const RepositoryObjectSchema = z.object({
  type: z.string(),
  url: z.url(),
});

export type RepositoryObject = z.infer<typeof RepositoryObjectSchema>;
