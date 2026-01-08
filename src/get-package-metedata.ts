import { AbbreviatedMetadataSchema } from "@/schemas/abbreviated/metadata";
import { FullMetadataSchema } from "@/schemas/full/metadata";
import {
  ABBREVIATED_METADATA_ACCEPT_HEADER,
  NPM_REGISTRY_URL,
} from "@/utils/constants";
import { getJsonResponse } from "@/utils/functions/get-json-response";

export async function getPackageMetadata({
  name,
  format = "abbreviated",
}: {
  name: string;
  format?: "abbreviated" | "full";
}) {
  const acceptHeader =
    format === "abbreviated"
      ? ABBREVIATED_METADATA_ACCEPT_HEADER
      : "application/json";

  const getJsonResult = await getJsonResponse({
    url: `${NPM_REGISTRY_URL}/${name}`,
    options: { headers: { Accept: acceptHeader } },
  });

  if (getJsonResult.isErr()) {
    return { success: false, error: getJsonResult.error };
  }

  const validationResult =
    format === "abbreviated"
      ? AbbreviatedMetadataSchema.safeParse(getJsonResult.value)
      : FullMetadataSchema.safeParse(getJsonResult.value);

  if (!validationResult.success) {
    return { success: false, error: validationResult.error };
  }

  return { success: true, data: validationResult.data };
}
