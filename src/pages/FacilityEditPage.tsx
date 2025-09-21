import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Textarea from "@/components/ui/Textarea";
import CheckboxField from "@/components/ui/CheckboxField";

import { facilityEditSchema } from "@/schemas"; // ← use centralized schema
import { useFacilitiesStore } from "@/store/facilities";

import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useParams, useNavigate } from "react-router-dom";
import { z } from "zod";
import type { Facility, TimeString } from "@/types";

type FormValues = z.infer<typeof facilityEditSchema>;

export default function FacilityEditPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const hydrated = useFacilitiesStore((s) => s.hydrated);
  const facilities = useFacilitiesStore((s) => s.facilities);
  const update = useFacilitiesStore((s) => s.update);
  const setDefault = useFacilitiesStore((s) => s.setDefault);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isSubmitting, isValid },
  } = useForm<FormValues>({
    resolver: zodResolver(facilityEditSchema),
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

  // image preview
  const [imgOk, setImgOk] = useState(true);
  const imagePreview = watch("imageUrl");
  const imageUrlReg = register("imageUrl");

  const facility = id ? facilities.find((f) => f.id === id) : undefined;

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

  if (!hydrated) {
    return <div className="px-6 py-8 opacity-80">Loading...</div>;
  }

  if (!facility || !id) {
    return (
      <div className="mx-auto max-w-7xl px-6 md:px-10 lg:px-14 py-8 text-left">
        <h1 className="mb-2">Facility not found</h1>
        <p className="mt-2">
          The requested facility doesn’t exist.
          <Link to="/facilities" className="ml-2 underline">
            Back to list
          </Link>
        </p>
      </div>
    );
  }

  const onSubmit = async (raw: FormValues) => {
    try {
      const { facilities: allBefore } = useFacilitiesStore.getState();
      const isOnlyFacility = allBefore.length === 1;
      const wasDefault = facility.isDefault;
      const wantsDefault = !!raw.isDefault;

      const patch: Partial<Facility> = {
        name: raw.name,
        address: raw.address,
        description: raw.description,
        imageUrl: raw.imageUrl,
        openingTime: raw.openingTime as TimeString,
        closingTime: raw.closingTime as TimeString,
      };

      update(id, patch);

      if (isOnlyFacility) {
        if (!wasDefault) setDefault(id);
      } else if (!wasDefault && wantsDefault) {
        setDefault(id);
      } else if (wasDefault && !wantsDefault) {
        const fallback = allBefore.find((f) => f.id !== id);
        if (fallback) setDefault(fallback.id);
      }

      navigate("/facilities");
    } catch (err) {
      console.error(err);
      alert(err instanceof Error ? err.message : "Failed to update facility.");
    }
  };

  return (
    <div className="mx-auto max-w-7xl px-6 md:px-10 lg:px-14 py-8 text-left">
      <h1 className="mb-6">Edit Facility</h1>

      <div className="w-full rounded-2xl bg-white p-6 md:p-8 shadow-sm ring-1 ring-black/5">
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <h2 className="mb-4 text-grey-800">Facility Information</h2>

          <Input
            id="name"
            label="Facility Name *"
            {...register("name")}
            error={errors.name?.message}
          />

          <Input
            id="address"
            label="Address *"
            {...register("address")}
            error={errors.address?.message}
          />

          <Textarea
            id="description"
            label="Description *"
            {...register("description")}
            error={errors.description?.message}
          />

          <Input
            id="imageUrl"
            label="Cover Image URL *"
            type="url"
            inputMode="url"
            placeholder="https://example.com/cover.jpg"
            {...imageUrlReg}
            error={errors.imageUrl?.message}
            onChange={(e) => {
              setImgOk(true);
              imageUrlReg.onChange(e);
            }}
          />

          {imagePreview && imgOk && (
            <div className="mt-3">
              <img
                key={imagePreview}
                src={imagePreview}
                alt="Preview"
                className="h-24 w-40 rounded-md object-cover ring-1 ring-black/5"
                onError={() => setImgOk(false)}
              />
            </div>
          )}

          <CheckboxField
            id="isDefault"
            label="Default Facility"
            description="Setting this facility as default will override the current default facility."
            {...register("isDefault")}
          />

          <h2 className="mb-3 text-grey-800">Working Hours</h2>
          <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Input
              id="openingTime"
              label="Opening Time *"
              type="time"
              step={60}
              {...register("openingTime")}
              error={errors.openingTime?.message}
            />
            <Input
              id="closingTime"
              label="Closing Time *"
              type="time"
              step={60}
              {...register("closingTime")}
              error={errors.closingTime?.message}
            />
          </div>

          <div className="mt-2 flex justify-end gap-3">
            <Link to="/facilities">
              <Button id="cancel-edit" title="Cancel" variant="secondary" />
            </Link>
            <Button
              id="submit-edit"
              title={isSubmitting ? "Updating..." : "Update Facility"}
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
