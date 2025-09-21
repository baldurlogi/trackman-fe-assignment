import type { ButtonHTMLAttributes, ReactNode } from "react";
import type { InputHTMLAttributes, TextareaHTMLAttributes } from "react";


// BUTTON
export type Variant = "primary" | "secondary" | "ghost" | "danger";
export type Size = "md" | "sm";

export type ButtonProps = {
  id: string;
  title?: string;
  icon?: ReactNode;
  variant?: Variant;
  size?: Size;
  ariaLabel?: string;
  containerClass?: string;
} & ButtonHTMLAttributes<HTMLButtonElement>;

// CONFIRM DELETE DIALOG
export type ConfirmDeleteProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description?: ReactNode;
  confirmLabel?: string;
  cancelLabel?: string;
  onConfirm: () => void | Promise<void>;
  confirmDisabled?: boolean;
};

// FACILITY
export type TimeString = `${string}:${string}`;

export interface Facility {
  id: string;
  name: string;
  address: string;
  description: string;
  imageUrl: string;
  openingTime: TimeString;
  closingTime: TimeString;
  isDefault: boolean;
  createdAt: string;
}

export type FacilityCardProps = {
  facility: Facility;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  onSetDefault: (id: string) => void;
  className?: string;
};

export type FacilityListProps = {
  facilities: Facility[];
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
  onSetDefault?: (id: string) => void;
  className?: string;
};

export type FacilitiesState = {
  facilities: Facility[];
  hydrated: boolean;
};

export type CreateFacilityInput =
  Omit<Facility, "id" | "createdAt"> &
  Partial<Pick<Facility, "id" | "createdAt">>;

  export type FacilitiesActions = {
  hydrate: () => void;
  create: (f: CreateFacilityInput) => Facility;
  update: (id: string, patch: Partial<Facility>) => Facility;
  remove: (id: string) => void;
  replaceAll: (next: Facility[]) => void;
  setDefault: (id: string) => void;

  getDefault: () => Facility | undefined;
  getSorted: () => Facility[];
};

export type FacilitiesStore = FacilitiesState & FacilitiesActions;


// INPUT
export type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  error?: string;
  label?: string;
  hint?: string;
};

export type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  error?: string;
  label?: string;
  hint?: string;
};

export type CheckboxFieldProps = Omit<InputHTMLAttributes<HTMLInputElement>, "type"> & {
  label: string;
  description?: string;
  error?: string;
};