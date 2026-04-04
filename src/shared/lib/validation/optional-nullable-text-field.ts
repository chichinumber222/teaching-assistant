import z from "zod";

export const optionalNullableTextField = (max: number) =>
  z
    .string("Поле должно быть строкой")
    .nullable()
    .optional()
    .transform((value) => {
      if (value == null) return null;

      const trimmed = value.trim();
      return trimmed === "" ? null : trimmed;
    })
    .pipe(
      z.string().max(max, `Максимальная длина — ${max} символов`).nullable(),
    );
