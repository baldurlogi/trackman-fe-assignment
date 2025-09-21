import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Textarea from "@/components/ui/Textarea";
import CheckboxField from "@/components/ui/CheckboxField";

import { facilityCreateSchema } from "@/schemas";
import { useFacilitiesStore } from "@/store/facilities";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { z } from "zod";
import type { TimeString, Facility } from "@/types";



type FormValues = z.infer<typeof facilityCreateSchema>;

export default function FacilitiesCreatePage() {
  const navigate = useNavigate();

  const facilitiesCount = useFacilitiesStore((s) => s.facilities.length);
  const isFirst = facilitiesCount === 0;

  const create = useFacilitiesStore((s) => s.create);
  const setDefault = useFacilitiesStore((s) => s.setDefault);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
  } = useForm<FormValues>({
    resolver: zodResolver(facilityCreateSchema),
    mode: "onBlur",
    defaultValues: {
      name: "",
      address: "",
      description: "",
      imageUrl: "",
      openingTime: "",
      closingTime: "",
      isDefault: isFirst,
    },
  });

  const onSubmit = async (raw: FormValues) => {
    try {
      const isFirstNow = useFacilitiesStore.getState().facilities.length === 0;

      const payload: Omit<Facility, "id" | "createdAt"> = {
        name: raw.name,
        address: raw.address,
        description: raw.description,
        imageUrl: raw.imageUrl,
        openingTime: raw.openingTime as TimeString,
        closingTime: raw.closingTime as TimeString,
        isDefault: isFirstNow ? true : !!raw.isDefault,
      };

      const created = create(payload);
      if (!isFirstNow && raw.isDefault) setDefault(created.id);

      navigate("/facilities");
    } catch (err) {
      console.error(err);
      alert(err instanceof Error ? err.message : "Failed to create facility.");
    }
  };

return (
    <div className="mx-auto max-w-7xl px-6 md:px-10 lg:px-14 py-8 text-left">
      <h1 className="mb-6">Create a New Facility</h1>

      <div className="w-full rounded-2xl bg-white p-6 md:p-8 shadow-sm ring-1 ring-black/5">
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <h2 className="mb-4 text-grey-800">Facility Information</h2>

          <Input id="name" label="Facility Name *" {...register("name")} error={errors.name?.message} />

          <Input id="address" label="Address *" {...register("address")} error={errors.address?.message} />

          <Textarea id="description" label="Description *" {...register("description")} error={errors.description?.message} />

          <Input
            id="imageUrl"
            label="Cover Image URL *"
            type="url"
            inputMode="url"
            placeholder="https://example.com/cover.jpg"
            {...register("imageUrl")}
            error={errors.imageUrl?.message}
          />

          <CheckboxField
            id="isDefault"
            label="Default Facility"
            description={
              isFirst
                ? "First facility is automatically the default."
                : "Setting this facility as default will override the current default facility."
            }
            disabled={isFirst}
            {...register("isDefault")}
          />

          <h2 className="mb-3 text-grey-800 font-semibold">Working Hours</h2>
          <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Input id="openingTime" label="Opening Time *" type="time" step={60} {...register("openingTime")} error={errors.openingTime?.message} />
            <Input id="closingTime" label="Closing Time *" type="time" step={60} {...register("closingTime")} error={errors.closingTime?.message} />
          </div>

          <div className="mt-4 flex justify-end gap-3">
            <Link to="/facilities">
              <Button id="cancel-create" title="Cancel" variant="secondary" />
            </Link>
            <Button
              id="submit-create"
              title={isSubmitting ? "Creating..." : "Create Facility"}
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