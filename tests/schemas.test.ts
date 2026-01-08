import { AbbreviatedMetadataSchema } from "@/schemas/abbreviated/metadata";
import { FullMetadataSchema } from "@/schemas/full/metadata";
import {
  ABBREVIATED_METADATA_ACCEPT_HEADER,
  NPM_REGISTRY_URL,
} from "@/utils/constants";
import { getJsonResponse } from "@/utils/functions/get-json-response";
import { describe, test, expect } from "bun:test";
import { prettifyError } from "zod";

const topNpmPackages = [
  "react",
  "lodash",
  "react-dom",
  "axios",
  "chalk",
  "tslib",
  "commander",
  "inquirer",
  "express",
  "vue",
];

describe("Abbreviated metadata schema", () => {
  test.each(topNpmPackages)("should validate %s", async (packageName) => {
    const getAbbreviatedMetadataResult = await getJsonResponse({
      url: `${NPM_REGISTRY_URL}/${packageName}`,
      options: {
        headers: {
          Accept: ABBREVIATED_METADATA_ACCEPT_HEADER,
        },
      },
    });
    if (getAbbreviatedMetadataResult.isErr()) {
      console.error(getAbbreviatedMetadataResult.error);
      throw getAbbreviatedMetadataResult.error;
    }
    const metadata = getAbbreviatedMetadataResult.value;

    const validationResult = AbbreviatedMetadataSchema.safeParse(metadata);

    if (!validationResult.success) {
      await Bun.write(
        `tests/logs/schemas/abbreviated/${packageName}.txt`,
        prettifyError(validationResult.error)
      );
    } else {
      expect(validationResult.data).toStrictEqual(metadata);
    }

    expect(validationResult.success).toBe(true);
  });
});

describe("Full metadata schema", () => {
  test.each(topNpmPackages)("should validate %s", async (packageName) => {
    const getFullMetadataResult = await getJsonResponse({
      url: `${NPM_REGISTRY_URL}/${packageName}`,
      options: {
        headers: {
          Accept: "application/json",
        },
      },
    });
    if (getFullMetadataResult.isErr()) {
      console.error(getFullMetadataResult.error);
      throw getFullMetadataResult.error;
    }
    const metadata = getFullMetadataResult.value;

    const validationResult = FullMetadataSchema.safeParse(metadata);

    if (!validationResult.success) {
      await Bun.write(
        `tests/logs/schemas/full/${packageName}.txt`,
        prettifyError(validationResult.error)
      );
    } else {
      expect(validationResult.data).toStrictEqual(metadata);
    }

    expect(validationResult.success).toBe(true);
  });
});
