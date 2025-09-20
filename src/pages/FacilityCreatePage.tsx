import Button from "@/components/ui/Button";
import { facilitySchema } from "@/schemas";
import { useFacilitiesStore } from "@/store/facilities";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMemo } from "react";
import { useForm } from "react-hook-form"
import { Link } from "react-router-dom";
import type z from "zod";

const createSchema = facilitySchema.omit({ id: true, createdAt: true });
type FormValues = z.infer<typeof createSchema>;

export default function FacilitiesCreatePage() {
  const facilitiesCount = useFacilitiesStore((s) => s.facilities.length);
  const isFirst = facilitiesCount === 0;

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
    [isFirst]
  );

  const { register, handleSubmit, formState: { errors, isSubmitting, isValid }} = useForm<FormValues>({
    resolver: zodResolver(createSchema),
    mode: "onBlur",
    defaultValues,
  });

  const onSubmit = (data: FormValues) => {
    console.log("Create Facility (valid):", data);
  };

  return (
    <div className="px-6 py-8 flex flex-col items-start justify-start">
      <h1 className="mb-4 font-semibold">Create a New Facility</h1>

      <div className="mx-auto w-full max-w-4xl rounded-2xl bg-white p-6 shadow-sm ring-1 ring-black/5">
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <h2 className="mb-4 font-semibold text-gray-900">Facility Information</h2>

          <div className="mb-4">
            <label htmlFor="name" className="block font-medium text-gray-800">
              Facility Name <span>*</span>
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

          <div className="mb-4">
            <label htmlFor="address" className="block font-medium text-gray-800">
              Address <span>*</span>
            </label>
            <input
              id="address"
              type="text"
              {...register("address")}
              aria-invalid={!!errors.address}
              aria-describedby={errors.address ? "address-error" : undefined}
              placeholder=""
              className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 outline-none focus:ring-2 focus:ring-orange-500"
            />
            {errors.address && (
              <p id="address-error" className="mt-1 text-sm text-red-600">
                {errors.address.message}
              </p>
            )}
          </div>

          <div className="mb-4">
            <label htmlFor="description" className="block font-medium text-gray-800">
              Description <span>*</span>
            </label>
            <textarea
              id="description"
              rows={4}
              {...register("description")}
              aria-invalid={!!errors.description}
              aria-describedby={errors.description ? "description-error" : undefined}
              placeholder=""
              className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 outline-none focus:ring-2 focus:ring-orange-500"
            />
            {errors.description && (
              <p id="description-error" className="mt-1 text-sm text-red-600">
                {errors.description.message}
              </p>
            )}
          </div>

          <div className="mb-4">
            <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-800">
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
          </div>

          <div className="mb-6">
            <label className="flex items-start gap-3">
              <input
                id="isDefault"
                type="checkbox"
                {...register("isDefault")}
                disabled={isFirst}
                className="mt-1 h-4 w-4 rounded border-gray-300 text-orange-500 focus:ring-orange-500 disabled:opacity-60"
              />
              <span className="flex-1">
                <span className="text-sm font-medium text-gray-800">Default Facility</span>
                <p className="mt-1 text-sm text-gray-500">
                  Setting this facility as default will override the currently marked default facility.
                </p>
              </span>
            </label>
          </div>

          <h2 className="mb-3 text-sm font-semibold text-gray-900">Working Hours</h2>
          <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="openingTime" className="block text-sm font-medium text-gray-800">
                Opening Time <span className="text-red-600">*</span>
              </label>
              <input
                id="openingTime"
                type="time"
                step={60}
                {...register("openingTime")}
                aria-invalid={!!errors.openingTime}
                aria-describedby={errors.openingTime ? "openingTime-error" : undefined}
                className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 outline-none focus:ring-2 focus:ring-orange-500"
              />
              {errors.openingTime && (
                <p id="openingTime-error" className="mt-1 text-sm text-red-600">
                  {errors.openingTime.message}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="closingTime" className="block text-sm font-medium text-gray-800">
                Closing Time <span className="text-red-600">*</span>
              </label>
              <input
                id="closingTime"
                type="time"
                step={60}
                {...register("closingTime")}
                aria-invalid={!!errors.closingTime}
                aria-describedby={errors.closingTime ? "closingTime-error" : undefined}
                className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 outline-none focus:ring-2 focus:ring-orange-500"
              />
              {errors.closingTime && (
                <p id="closingTime-error" className="mt-1 text-sm text-red-600">
                  {errors.closingTime.message}
                </p>
              )}
            </div>
          </div>

          <div className="mt-4 flex justify-end gap-3">
            <Link to="/facilities">
              <Button
                id="cancel-create"
                title="Cancel"
                containerClass="px-6 py-2 bg-gray-100 text-gray-800 hover:bg-gray-200"
              />
            </Link>
            <Button
              id="submit-create"
              title="Create Facility"
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
  )
}