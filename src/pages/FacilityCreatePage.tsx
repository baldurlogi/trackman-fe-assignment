import Button from "@/components/ui/Button";
import { facilitySchema } from "@/schemas";
import { useFacilitiesStore } from "@/store/facilities";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { z } from "zod";
import type { TimeString, Facility } from "@/types";
import Input from "@/components/ui/Input";

const createSchema = facilitySchema.omit({ id: true, createdAt: true });
type FormValues = z.infer<typeof createSchema>;

export default function FacilitiesCreatePage() {
  const navigate = useNavigate();

  const facilitiesCount = useFacilitiesStore((s) => s.facilities.length);
  const isFirst = facilitiesCount === 0;

  const create = useFacilitiesStore((s) => s.create);
  const setDefault = useFacilitiesStore((s) => s.setDefault);

  const defaultValues: FormValues = useMemo(
    () => ({
      name: "",
      address: "",
      description: "",
      imageUrl: "",
      openingTime: "",
      closingTime: "",
      isDefault: isFirst,
    }),
    [isFirst],
  );

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
  } = useForm<FormValues>({
    resolver: zodResolver(createSchema),
    mode: "onBlur",
    defaultValues,
  });

  const [saving, setSaving] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const onSubmit = async (raw: FormValues) => {
    if (saving) return;
    setSubmitError(null);
    setSaving(true);

    try {
      const countNow = useFacilitiesStore.getState().facilities.length;
      const isFirstNow = countNow === 0;

      const payload: Omit<Facility, "id" | "createdAt"> = {
        name: raw.name.trim(),
        address: raw.address.trim(),
        description: raw.description.trim(),
        imageUrl: raw.imageUrl.trim(),
        openingTime: raw.openingTime as TimeString,
        closingTime: raw.closingTime as TimeString,
        isDefault: isFirstNow ? true : !!raw.isDefault,
      };

      const created = create(payload);

      if (!isFirstNow && raw.isDefault) {
        setDefault(created.id);
      }
      navigate("/facilities");
    } catch (err) {
      console.error(err);
      setSubmitError(
        err instanceof Error ? err.message : "Failed to created facility.",
      );
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="mx-auto max-w-7xl px-6 md:px-10 lg:px-14 py-8 text-left">
      <h1 className="mb-6">Create a New Facility</h1>

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
            <label
              htmlFor="description"
              className="block font-medium text-grey-800"
            >
              Description <span>*</span>
            </label>
            <textarea
              id="description"
              rows={4}
              {...register("description")}
              aria-invalid={!!errors.description}
              aria-describedby={
                errors.description ? "description-error" : undefined
              }
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

          {/* Image URL */}
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

          {/* Default checkbox */}
          <div className="mb-6">
            <label className="flex items-start gap-3">
              <input
                id="isDefault"
                type="checkbox"
                {...register("isDefault")}
                disabled={isFirst}
                className="mt-1 h-4 w-4 rounded border-grey-200 accent-orange-400 disabled:opacity-60"
              />
              <span className="flex-1">
                <span className="font-medium text-grey-800">
                  Default Facility
                </span>
                <p className="mt-1 text-grey-600">
                  {isFirst
                    ? "First facility is automatically the default."
                    : "Setting this facility as default will override the currently marked default facility."}
                </p>
              </span>
            </label>
          </div>

          {/* Working hours */}
          <h2 className="mb-3 text-grey-800 font-semibold">Working Hours</h2>
          <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {/* Opening / Closing */}
            <Input
              id="openingTime"
              label="Opening Time *"
              type="time"
              step={60}
              {...register("openingTime")}
              aria-invalid={!!errors.openingTime}
              aria-describedby={
                errors.openingTime ? "openingTime-error" : undefined
              }
              error={errors.openingTime?.message}
            />

            <Input
              id="closingTime"
              label="Closing Time *"
              type="time"
              step={60}
              {...register("closingTime")}
              aria-invalid={!!errors.closingTime}
              aria-describedby={
                errors.closingTime ? "closingTime-error" : undefined
              }
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
          <div className="mt-4 flex justify-end gap-3">
            <Link to="/facilities">
              <Button id="cancel-create" title="Cancel" variant="secondary" />
            </Link>
            <Button
              id="submit-create"
              title="Create Facility"
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
