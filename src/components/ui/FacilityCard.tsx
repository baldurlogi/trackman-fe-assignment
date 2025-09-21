import Button from "./Button";
import { MapPin, Trash, Image as ImageIcon, Star } from "lucide-react";
import type { Facility } from "@/types";
import { useState, useCallback } from "react";
import { getStatus } from "@/utils/time";

type Props = {
  facility: Facility;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  onSetDefault: (id: string) => void;
  className?: string;
};

function FacilityCardBase({
  facility,
  onEdit,
  onDelete,
  onSetDefault,
  className = "",
}: Props) {
  const { id, name, address, imageUrl, openingTime, closingTime, isDefault } =
    facility;

  const [imgError, setImgError] = useState(false);

  const status = getStatus(openingTime, closingTime);
  const isOpen = status === "Open";

  const handleEdit = useCallback(() => onEdit(id), [id, onEdit]);
  const handleDelete = useCallback(() => onDelete(id), [id, onDelete]);
  const handleSetDefault = useCallback(() => {
    if (!isDefault) onSetDefault(id);
  }, [isDefault, id, onSetDefault]);

  return (
    <article
      className={`flex flex-col rounded-2xl shadow-sm bg-white p-4 hover:shadow-2xl ${className}`}
    >
      <div className="relative">
        {imageUrl && !imgError ? (
          <img
            src={imageUrl}
            alt={name}
            className="w-full aspect-video object-cover rounded-xl"
            loading="lazy"
            decoding="async"
            draggable={false}
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="w-full aspect-video flex items-center justify-center rounded-xl bg-grey-100">
            <ImageIcon aria-hidden className="w-8 h-8 text-grey-600/70" />
            <span className="sr-only">No image available</span>
          </div>
        )}

        <button
          type="button"
          title={isDefault ? "Default facility" : "Set as default"}
          aria-label={isDefault ? "Default facility" : "Set as default"}
          aria-pressed={isDefault}
          disabled={isDefault}
          onClick={handleSetDefault}
          className={`absolute left-3 top-3 inline-flex items-center justify-center h-11 w-11 rounded-full shadow ring-1 ring-black/5 ${
            isDefault
              ? "bg-orange-400 text-white"
              : "bg-white/90 text-grey-600 hover:text-orange-600"
          }`}
        >
          <Star className="w-6 h-6 fill-current" aria-hidden />
        </button>
      </div>

      <div className="mt-3 flex items-center justify-between gap-3">
        <h2 className="font-semibold truncate">{name}</h2>
        <span
          className={`px-2 py-0.5 rounded-full text-lg font-semibold ${
            isOpen
              ? "bg-success-light text-success"
              : "bg-error-light text-error"
          }`}
        >
          {status}
        </span>
      </div>

      <div className="mt-2 flex items-center justify-between gap-2">
        <div className="flex items-center gap-2 min-w-0">
          <MapPin size={16} className="text-grey-600 flex-shrink-0" />
          <p className="truncate text-grey-600">{address}</p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            id={`delete-${id}`}
            ariaLabel={`Delete ${name}`}
            icon={<Trash size={20} />}
            variant="secondary"
            size="md"
            onClick={handleDelete}
          />
          <Button
            id={`edit-${id}`}
            title="Edit"
            variant="secondary"
            size="md"
            onClick={handleEdit}
          />
        </div>
      </div>
    </article>
  );
}

// const FacilityCard = memo(FacilityCardBase);
export default FacilityCardBase;
