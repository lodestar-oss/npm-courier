import { safeFetch, type SafeFetchInput } from "@/utils/functions/safe-fetch";
import { safeJsonResponse } from "@/utils/functions/safe-json-response";
import { err, type Result } from "neverthrow";

export async function getJsonResponse({
  url,
  options,
}: SafeFetchInput): Promise<Result<any, Error>> {
  const fetchResult = await safeFetch({ url, options });

  if (fetchResult.isErr()) {
    return fetchResult;
  }

  const response = fetchResult.value;

  if (!response.ok) {
    return err(
      new Error(`HTTP Error ${response.status}: ${response.statusText}`)
    );
  }

  const jsonResult = await safeJsonResponse(response);

  return jsonResult;
}
