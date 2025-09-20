import Button from "@/components/ui/Button";
import { facilitySchema } from "@/schemas";
import { useFacilitiesStore } from "@/store/facilities";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useParams, useNavigate } from "react-router-dom";
import { z } from "zod";
import type { Facility, TimeString } from "@/types";

const editSchema = facilitySchema.omit({ id: true, createdAt: true });
type FormValues = z.infer<typeof editSchema>;

export default function FacilityEditPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const hydrated = useFacilitiesStore((s) => s.hydrated);
  const facilities = useFacilitiesStore((s) => s.facilities);
  const update = useFacilitiesStore((s) => s.update);
  const setDefault = useFacilitiesStore((s) => s.setDefault);
  const facility = id ? facilities.find((f) => f.id === id) : undefined;

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isSubmitting, isValid },
  } = useForm<FormValues>({
    resolver: zodResolver(editSchema),
    mode: "onBlur",
    defaultValues: {
      name: "",
      address: "",
      description: "",
      imageUrl: "",
      openingTime: "08:00",
      closingTime: "17:00",
      isDefault: false,
    },
  });

  useEffect(() => {
    if (!hydrated || !facility) return;
    reset({
      name: facility.name,
      address: facility.address,
      description: facility.description,
      imageUrl: facility.imageUrl,
      openingTime: facility.openingTime,
      closingTime: facility.closingTime,
      isDefault: facility.isDefault,
    });
  }, [hydrated, facility, reset]);

  const [saving, setSaving] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  if (!hydrated) {
    return <div className="p-6 opacity-80">Loading...</div>;
  }

  if (!facility || !id) {
    return (
      <div className="p-6">
        <h1 className="text-xl font-semibold">Facility not found</h1>
        <p className="mt-2">
          The requested facility doesn’t exist.
          <Link to="/facilities" className="ml-2 underline">Back to list</Link>
        </p>
      </div>
    );
  }

  const onSubmit = async (raw: FormValues) => {
    if (saving) return;
    setSubmitError(null);
    setSaving(true);

    try {
        const state = useFacilitiesStore.getState();
        const allBefore = state.facilities;
        const isOnlyFacility = allBefore.length === 1;
        const wasDefault = facility.isDefault;
        const wantsDefault = !!raw.isDefault;

        const patch: Partial<Facility> = {
            name: raw.name.trim(),
            address: raw.address.trim(),
            description: raw.description.trim(),
            imageUrl: raw.imageUrl.trim(),
            openingTime: raw.openingTime as TimeString,
            closingTime: raw.closingTime as TimeString,
      };

      update(id, patch);

      if (isOnlyFacility) {
        if (!wasDefault) setDefault(id);
      } else {
        if (!wasDefault && wantsDefault) {
            setDefault(id);
        }
        else if (wasDefault && !wantsDefault) {
            const fallback = allBefore.find((f) => f.id !== id);
            if (fallback) setDefault(fallback.id);
        }
      }
      navigate("/facilities");
    } catch (err) {
        console.error(err);
        setSubmitError(
            err instanceof Error ? err.message : "Failed to update facility."
        );
    } finally {
        setSaving(false);
    }
  };

  const imagePreview = watch("imageUrl");

  return (
    <div className="px-6 py-8">
      <h1 className="mb-4 text-2xl font-semibold">Edit Facility</h1>

      <div className="mx-auto w-full max-w-4xl rounded-2xl bg-white p-6 shadow-sm ring-1 ring-black/5">
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <h2 className="mb-4 text-sm font-semibold text-gray-900">
            Facility Information
          </h2>

          {/* Name */}
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-800"
            >
              Facility Name <span className="text-red-600">*</span>
            </label>
            <input
              id="name"
              type="text"
              {...register("name")}
              aria-invalid={!!errors.name}
              aria-describedby={errors.name ? "name-error" : undefined}
              className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 outline-none focus:ring-2 focus:ring-orange-500"
            />
            {errors.name && (
              <p id="name-error" className="mt-1 text-sm text-red-600">
                {errors.name.message}
              </p>
            )}
          </div>

          {/* Address */}
          <div className="mb-4">
            <label
              htmlFor="address"
              className="block text-sm font-medium text-gray-800"
            >
              Address <span className="text-red-600">*</span>
            </label>
            <input
              id="address"
              type="text"
              {...register("address")}
              aria-invalid={!!errors.address}
              aria-describedby={errors.address ? "address-error" : undefined}
              className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 outline-none focus:ring-2 focus:ring-orange-500"
            />
            {errors.address && (
              <p id="address-error" className="mt-1 text-sm text-red-600">
                {errors.address.message}
              </p>
            )}
          </div>

          {/* Description */}
          <div className="mb-4">
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-800"
            >
              Description <span className="text-red-600">*</span>
            </label>
            <textarea
              id="description"
              rows={4}
              {...register("description")}
              aria-invalid={!!errors.description}
              aria-describedby={
                errors.description ? "description-error" : undefined
              }
              className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 outline-none focus:ring-2 focus:ring-orange-500"
            />
            {errors.description && (
              <p id="description-error" className="mt-1 text-sm text-red-600">
                {errors.description.message}
              </p>
            )}
          </div>

          {/* Image URL + Tiny Preview */}
          <div className="mb-6">
            <label
              htmlFor="imageUrl"
              className="block text-sm font-medium text-gray-800"
            >
              Cover Image URL <span className="text-red-600">*</span>
            </label>
            <input
              id="imageUrl"
              type="url"
              inputMode="url"
              {...register("imageUrl")}
              aria-invalid={!!errors.imageUrl}
              aria-describedby={errors.imageUrl ? "imageUrl-error" : undefined}
              placeholder="https://example.com/cover.jpg"
              className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 outline-none focus:ring-2 focus:ring-orange-500"
            />
            {errors.imageUrl && (
              <p id="imageUrl-error" className="mt-1 text-sm text-red-600">
                {errors.imageUrl.message}
              </p>
            )}
            {imagePreview && (
              <div className="mt-3">
                {/* small visual confirmation */}
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="h-24 w-40 rounded-md object-cover ring-1 ring-black/5"
                  onError={(e) => {
                    // hide broken preview
                    (e.target as HTMLImageElement).style.display = "none";
                  }}
                />
              </div>
            )}
          </div>

          {/* Default Facility (enabled on edit) */}
          <div className="mb-6">
            <label className="flex items-start gap-3">
              <input
                id="isDefault"
                type="checkbox"
                {...register("isDefault")}
                className="mt-1 h-4 w-4 rounded border-gray-300 text-orange-500 focus:ring-orange-500"
              />
              <span className="flex-1">
                <span className="text-sm font-medium text-gray-800">
                  Default Facility
                </span>
                <p className="mt-1 text-sm text-gray-500">
                  Setting this facility as default will override the currently
                  marked default facility.
                </p>
              </span>
            </label>
          </div>

          {/* Working Hours */}
          <h2 className="mb-3 text-sm font-semibold text-gray-900">
            Working Hours
          </h2>
          <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label
                htmlFor="openingTime"
                className="block text-sm font-medium text-gray-800"
              >
                Opening Time <span className="text-red-600">*</span>
              </label>
              <input
                id="openingTime"
                type="time"
                step={60}
                {...register("openingTime")}
                aria-invalid={!!errors.openingTime}
                aria-describedby={
                  errors.openingTime ? "openingTime-error" : undefined
                }
                className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 outline-none focus:ring-2 focus:ring-orange-500"
              />
              {errors.openingTime && (
                <p id="openingTime-error" className="mt-1 text-sm text-red-600">
                  {errors.openingTime.message}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="closingTime"
                className="block text-sm font-medium text-gray-800"
              >
                Closing Time <span className="text-red-600">*</span>
              </label>
              <input
                id="closingTime"
                type="time"
                step={60}
                {...register("closingTime")}
                aria-invalid={!!errors.closingTime}
                aria-describedby={
                  errors.closingTime ? "closingTime-error" : undefined
                }
                className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 outline-none focus:ring-2 focus:ring-orange-500"
              />
              {errors.closingTime && (
                <p id="closingTime-error" className="mt-1 text-sm text-red-600">
                  {errors.closingTime.message}
                </p>
              )}
            </div>
          </div>

          {/* Submit error (if any) */}
          {submitError && (
            <div
              role="alert"
              className="mb-4 rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700"
            >
              {submitError}
            </div>
          )}

          {/* Actions (no save logic yet in this task) */}
          <div className="mt-2 flex justify-end gap-3">
            <Link to="/facilities">
              <Button
                id="cancel-edit"
                title="Cancel"
                containerClass="px-6 py-2 bg-gray-100 text-gray-800 hover:bg-gray-200"
              />
            </Link>
            <Button
              id="submit-edit"
              title="Save Changes"
              containerClass={`px-6 py-2 text-white ${
                isSubmitting || !isValid
                  ? "bg-orange-300 cursor-not-allowed"
                  : "bg-orange-500 hover:bg-orange-600"
              }`}
            />
          </div>
        </form>
      </div>
    </div>
  );
}
