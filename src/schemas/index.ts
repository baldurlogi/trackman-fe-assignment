import { z } from "zod";

export const TIME_REGEX = /^(?:[01]\d|2[0-3]):[0-5]\d$/;

const timeString = z
  .string()
  .regex(TIME_REGEX, "Time must be 24h HH:MM (e.g. 08:00)");

const nonEmpty = (label: string) =>
  z.string().trim().min(1, `${label} is required`);

const httpUrl = z
  .url("Must be a valid URL")
  .refine((u) => /^https?:\/\//i.test(u), {
    message: "URL must start with http or https",
  });

export const facilitySchema = z
  .object({
    id: z.string(),
    name: nonEmpty("Name"),
    address: nonEmpty("Address"),
    description: nonEmpty("Description"),
    imageUrl: httpUrl,
    openingTime: timeString,
    closingTime: timeString,
    isDefault: z.boolean(),
    createdAt: z.iso.datetime().optional(),
  })
  .refine((v) => v.openingTime !== v.closingTime, {
    message: "Opening and closing time cannot be equal",
    path: ["closingTime"],
  });

export type FacilityForm = z.infer<typeof facilitySchema>;

export const validateFacility = (data: unknown) =>
  facilitySchema.safeParse(data);

export const facilityCreateSchema = facilitySchema.omit({
  id: true,
  createdAt: true,
});

export const facilityEditSchema = facilityCreateSchema;
