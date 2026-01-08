import { getPackageMetadata } from "@/get-package-metadata";
import { test, expect } from "bun:test";

const scopedPackageList = ["@types/node", "@eslint/js", "@astrojs/react"];

test.each(scopedPackageList)("Should get metadata for %s", async (name) => {
  const result = await getPackageMetadata({ name });

  if (!result.success) {
    console.error(result.error);
  }

  expect(result.success).toBe(true);
  expect(result.data).toBeDefined();
});
