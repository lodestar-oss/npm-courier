import { safeFetch, type SafeFetchInput } from "@/utils/functions/safe-fetch";
import { safeJsonResponse } from "@/utils/functions/safe-json-response";
import type { Result } from "neverthrow";

export async function getJsonResponse({
  url,
  options,
}: SafeFetchInput): Promise<Result<any, Error>> {
  const fetchResult = await safeFetch({ url, options });

  if (fetchResult.isErr()) {
    return fetchResult;
  }

  const jsonResult = await safeJsonResponse(fetchResult.value);

  return jsonResult;
}
