import { err, ok } from "neverthrow";

export async function safeJsonResponse(response: Response) {
  try {
    const json = await response.json();
    return ok(json);
  } catch (error) {
    if (error instanceof TypeError) {
      return err(error);
    }
    if (error instanceof SyntaxError) {
      return err(error);
    }
    const unknownError = new Error(
      "Unknown error occurred while parsing JSON from response",
      {
        cause: error,
      }
    );
    return err(unknownError);
  }
}
