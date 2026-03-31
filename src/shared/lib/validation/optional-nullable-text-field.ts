import z from "zod";

export const optionalNullableTextField = (max: number) =>
  z.preprocess((value) => {
    if (value == null) {
      return null;
    }

    if (typeof value !== "string") {
      return value;
    }

    const trimmed = value.trim();
    return trimmed === "" ? null : trimmed;
  }, z.string().max(max).nullable());
