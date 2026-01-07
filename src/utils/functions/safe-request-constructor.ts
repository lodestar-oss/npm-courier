import { err, ok, type Result } from "neverthrow";

interface RequestConstructorInput {
  url: string;
  options?: RequestInit;
}

export function safeRequestConstructor(
  { url, options }: RequestConstructorInput,
  context: Record<string, any>
): Result<
  { output: Request; newContext: Record<string, any> },
  { error: Error; newContext: Record<string, any> }
> {
  const newContext = {
    ...context,
    safeRequestConstructor: {
      input: {
        url,
        options,
      },
    },
  };
  try {
    const request = new Request(url, options);
    Object.assign(newContext.safeRequestConstructor, {
      success: true,
    });
    return ok({ output: request, newContext });
  } catch (error) {
    Object.assign(newContext.safeRequestConstructor, {
      success: false,
      error,
    });
    return err({ error: error as Error, newContext });
  }
}
