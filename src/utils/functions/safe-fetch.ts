import { err, ok, Result } from "neverthrow";

interface SafeFetchInput {
  url: string;
  options?: RequestInit;
}

export async function safeFetch({
  url,
  options,
}: SafeFetchInput): Promise<Result<Response, Error>> {
  try {
    const request = new Request(url, options);
    const response = await fetch(request);
    return ok(response);
  } catch (error) {
    if (error instanceof TypeError) {
      return err(error);
    }
    const unknownError = new Error("Unknown error occurred while fetching", {
      cause: error,
    });
    return err(unknownError);
  }
}
