import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
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
    return <div className="px-6 py-8 opacity-80">Loading...</div>;
  }

  if (!facility || !id) {
    return (
      <div className="mx-auto max-w-7xl px-6 md:px-10 lg:px-14 py-8 text-left">
        <h1 className="mb-2">Facility not found</h1>
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
        if (!wasDefault && wantsDefault) setDefault(id);
        else if (wasDefault && !wantsDefault) {
          const fallback = allBefore.find((f) => f.id !== id);
          if (fallback) setDefault(fallback.id);
        }
      }
      navigate("/facilities");
    } catch (err) {
      console.error(err);
      setSubmitError(err instanceof Error ? err.message : "Failed to update facility.");
    } finally {
      setSaving(false);
    }
  };

  const imagePreview = watch("imageUrl");

  return (
    <div className="mx-auto max-w-7xl px-6 md:px-10 lg:px-14 py-8 text-left">
      <h1 className="mb-6">Edit Facility</h1>

      <div className="w-full rounded-2xl bg-white p-6 md:p-8 shadow-sm ring-1 ring-black/5">
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <h2 className="mb-4 text-grey-800">Facility Information</h2>

          {/* Name */}
          <Input
            id="name"
            label="Facility Name *"
            {...register("name")}
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? "name-error" : undefined}
            error={errors.name?.message}
          />

          {/* Address */}
          <Input
            id="address"
            label="Address *"
            {...register("address")}
            aria-invalid={!!errors.address}
            aria-describedby={errors.address ? "address-error" : undefined}
            error={errors.address?.message}
          />

          {/* Description */}
          <div className="mb-4">
            <label htmlFor="description" className="block font-medium text-grey-800">
              Description *
            </label>
            <textarea
              id="description"
              rows={4}
              {...register("description")}
              aria-invalid={!!errors.description}
              aria-describedby={errors.description ? "description-error" : undefined}
              className={`mt-1 w-full rounded-lg border bg-white px-3 py-2 text-grey-800
                          placeholder:text-grey-600/60 focus:outline-none focus:ring-2
                          ${errors.description ? "border-error focus:ring-error" : "border-grey-200 focus:ring-orange-400"}`}
            />
            {errors.description && (
              <p id="description-error" className="mt-1 text-error">
                {errors.description.message}
              </p>
            )}
          </div>

          {/* Image URL + preview */}
          <Input
            id="imageUrl"
            label="Cover Image URL *"
            type="url"
            inputMode="url"
            placeholder="https://example.com/cover.jpg"
            {...register("imageUrl")}
            aria-invalid={!!errors.imageUrl}
            aria-describedby={errors.imageUrl ? "imageUrl-error" : undefined}
            error={errors.imageUrl?.message}
          />
          {imagePreview && (
            <div className="mt-3">
              <img
                src={imagePreview}
                alt="Preview"
                className="h-24 w-40 rounded-md object-cover ring-1 ring-black/5"
                onError={(e) => ((e.target as HTMLImageElement).style.display = "none")}
              />
            </div>
          )}

          {/* Default Facility */}
          <div className="mb-6">
            <label className="flex items-start gap-3">
              <input
                id="isDefault"
                type="checkbox"
                {...register("isDefault")}
                className="mt-1 h-4 w-4 rounded border-grey-200 accent-orange-400"
              />
              <span className="flex-1">
                <span className="font-medium text-grey-800">Default Facility</span>
                <p className="mt-1 text-grey-600">
                  Setting this facility as default will override the currently marked default facility.
                </p>
              </span>
            </label>
          </div>

          <h2 className="mb-3 text-grey-800">Working Hours</h2>
          <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Input
              id="openingTime"
              label="Opening Time *"
              type="time"
              step={60}
              {...register("openingTime")}
              aria-invalid={!!errors.openingTime}
              aria-describedby={errors.openingTime ? "openingTime-error" : undefined}
              error={errors.openingTime?.message}
            />
            <Input
              id="closingTime"
              label="Closing Time *"
              type="time"
              step={60}
              {...register("closingTime")}
              aria-invalid={!!errors.closingTime}
              aria-describedby={errors.closingTime ? "closingTime-error" : undefined}
              error={errors.closingTime?.message}
            />
          </div>

          {/* Submit error */}
          {submitError && (
            <div
              role="alert"
              className="mb-4 rounded-lg border border-error-light bg-error-light px-3 py-2 text-error"
            >
              {submitError}
            </div>
          )}

          {/* Actions */}
          <div className="mt-2 flex justify-end gap-3">
            <Link to="/facilities">
              <Button id="cancel-edit" title="Cancel" variant="secondary" />
            </Link>
            <Button
              id="submit-edit"
              title="Update Facility"
              variant="primary"
              type="submit"
              disabled={isSubmitting || !isValid}
            />
          </div>
        </form>
      </div>
    </div>
  );
}
