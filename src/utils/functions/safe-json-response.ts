import { err, ok, Result } from "neverthrow";

export async function safeJsonResponse(
  response: Response
): Promise<Result<any, Error>> {
  try {
    const json = await response.json();
    return ok(json);
  } catch (error) {
    if (error instanceof TypeError || error instanceof SyntaxError) {
      return err(error);
    }
    const unknownError = new Error(
      "Unknown error occurred while reading response body as JSON",
      {
        cause: error,
      }
    );
    return err(unknownError);
  }
}
