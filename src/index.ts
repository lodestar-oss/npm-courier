import { AbbreviatedMetadataSchema } from "@/schemas/abbreviated/metadata";
import {
  ABBREVIATED_METADATA_ACCEPT_HEADER,
  NPM_REGISTRY_URL,
} from "@/utils/constants";
import { safeFetch } from "@/utils/functions/safe-fetch";
import { safeJsonResponse } from "@/utils/functions/safe-json-response";

async function getPackageMetadata({
  name,
  format,
}: {
  name: string;
  format: "abbreviated" | "full";
}) {
  const acceptHeader =
    format === "abbreviated"
      ? ABBREVIATED_METADATA_ACCEPT_HEADER
      : "application/json";

  const fetchResult = await safeFetch({
    url: `${NPM_REGISTRY_URL}/${name}`,
    options: {
      headers: {
        Accept: acceptHeader,
      },
    },
  });

  if (fetchResult.isErr()) {
    console.error(fetchResult.error);
    return;
  }

  const response = fetchResult.value;

  if (!response.ok) {
    console.error(response.statusText);
    return;
  }

  const jsonResult = await safeJsonResponse(response);

  if (jsonResult.isErr()) {
    console.error(jsonResult.error);
    return;
  }

  const metadata = jsonResult.value;

  const parseMetadataResult = AbbreviatedMetadataSchema.safeParse(metadata);

  if (!parseMetadataResult.success) {
    console.error(parseMetadataResult.error);
    return;
  }

  console.log("Successfully fetched metadata for ", name);

  await Bun.write("./metadata.json", JSON.stringify(metadata, null, 2));
}

console.log("Getting metadata for react...");
await getPackageMetadata({ name: "react", format: "abbreviated" });
console.log("Done.");
