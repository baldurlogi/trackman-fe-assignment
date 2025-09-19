import { z } from "zod";

export const TIME_REGEX = /^(?:[01]\d|2[0-3]):[0-5]\d$/;

const timeString = z
    .string()
    .regex(TIME_REGEX, "Time must be 24h HH:MM (e.g. 08:00)");

const httpUrl = z
    .url("Must be a valid URL")
    .refine((u) => /^https?:\/\//i.test(u), {
        message: "URL must start with httpor https",
    })

export const facilitySchema = z
    .object({
        id: z.string(),
        name: z.string().min(1, "Name is required"),
        address: z.string().min(1, "Address is required"),
        description: z.string().min(1, "Description is required"),
        imageUrl: httpUrl,
        openingTime: timeString,
        closingTime: timeString,
        isDefault: z.boolean(),
        createdAt: z.date().optional(),
    })
    .refine((v) => v.openingTime !== v.closingTime, {
        message: "Opening and closing time cannot be equal",
        path: ["closingTime"],
    });

export type FacilityForm = z.infer<typeof facilitySchema>;

export const validateFacility = (data: unknown) => facilitySchema.safeParse(data);