import Button from "./Button";
import { MapPin, Trash, Image as ImageIcon, Star } from "lucide-react";
import type { Facility } from "@/types";
import { useState } from "react";
import { getStatus } from "@/utils/time";

type Props = {
  facility: Facility;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  onSetDefault: (id: string) => void;
};

const Card = ({ facility, onEdit, onDelete, onSetDefault }: Props) => {
  const { id, name, address, imageUrl, openingTime, closingTime, isDefault } = facility;

  const [imgError, setImgError] = useState(false);

  const isOpen = getStatus(openingTime, closingTime) === "open";
  const statusLabel = isOpen ? "Open" : "Closed";

  const statusClasses = isOpen ? "bg-success-light text-success" : "bg-error-light text-error";

  return (
    <div className="flex flex-col rounded-2xl shadow-sm bg-white p-4 hover:shadow-2xl">
      {/* Image */}
      <div className="relative">
        {imageUrl && !imgError ? (
          <img
            src={imageUrl}
            alt={`${name} photo`}
            className="w-full aspect-video object-cover rounded-xl"
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="w-full aspect-video flex items-center justify-center bg-muted">
            <ImageIcon aria-hidden className="w-8 h-8 opacity-60" />
            <span className="sr-only">No image available</span>
          </div>
        )}

        <button
          type="button"
          aria-label={isDefault ? "Default facility" : "Set as default"}
          aria-pressed={isDefault}
          onClick={() => !isDefault && onSetDefault(id)}
          className={`absolute left-3 top-3 inline-flex items-center justify-center h-7 w-7 rounded-full shadow ring-1 ring-black/5 ${isDefault ? "bg-orange-500 text-white" : "bg-white/90 text-gray-600 hover:text-orange-600"}`}
        >
          <Star className="w-4 h-4 fill-current" aria-hidden />
        </button>
      </div>

      {/* Title + Status */}
      <div className="flex mt-3 items-center justify-between">
        <h2 className="font-semibold">{name}</h2>
        {statusLabel && (
          <h3
            className={`font-semibold px-2 py-1 rounded-full ${statusClasses}`}
          >
            {statusLabel}
          </h3>
        )}
      </div>

      {/* Address + actions */}
      <div className="mt-2 flex items-center justify-between">
        <div className="flex items-center gap-2 min-w-0">
          <MapPin size={16} className="text-gray-500 flex-shrink-0" />
          <h3 className="truncate font-medium whitespace-nowrap text-gray-700">
            {address}
          </h3>
        </div>
        <div className="flex items-center gap-2">
          <Button
            id={`delete-${id}`}
            ariaLabel={`Delete ${name}`}
            icon={<Trash size={28} />}
            containerClass="rounded-md px-3 py-1 bg-gray-100 text-grey-600"
            onClick={() => onDelete(id)}
          />
          <Button
            id={`edit-${id}`}
            title="Edit"
            containerClass="rounded-md px-8 py-1 bg-gray-100 text-grey-600 text-lg"
            onClick={() => onEdit(id)}
          />
        </div>
      </div>
    </div>
  );
};

export default Card;
