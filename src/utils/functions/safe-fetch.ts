import { err, ok, Result } from "neverthrow";

export async function safeFetch({
  url,
  options,
}: {
  url: string;
  options?: RequestInit;
}): Promise<Result<Response, Error>> {
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
