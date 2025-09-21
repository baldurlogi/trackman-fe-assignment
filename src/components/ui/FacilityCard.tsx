import Button from "./Button";
import { MapPin, Trash } from "lucide-react";
import type { FacilityCardProps } from "@/types";
import { useCallback, useMemo, memo } from "react";
import { getStatus } from "@/utils/time";
import DefaultStar from "./DefaultStar";
import StatusBadge from "./StatusBadge";
import FacilityImage from "./FacilityImage";


function FacilityCardBase({
  facility,
  onEdit,
  onDelete,
  onSetDefault,
  className = "",
}: FacilityCardProps) {
  const { id, name, address, imageUrl, openingTime, closingTime, isDefault } =
    facility;

  const status = useMemo(
    () => getStatus(openingTime, closingTime),
    [openingTime, closingTime],
  );

  const handleEdit = useCallback(() => onEdit(id), [id, onEdit]);
  const handleDelete = useCallback(() => onDelete(id), [id, onDelete]);
  const handleSetDefault = useCallback(() => {
    if (!isDefault) onSetDefault(id);
  }, [isDefault, id, onSetDefault]);

  return (
    <article
      className={`flex flex-col rounded-2xl bg-white p-4 shadow-sm hover:shadow-2xl ${className}`}
    >
      <div className="relative">
        <FacilityImage src={imageUrl} alt={name} />
        <DefaultStar isDefault={isDefault} onClick={handleSetDefault} />
      </div>

      <div className="mt-3 flex items-center justify-between gap-3">
        <h2 className="truncate font-semibold">{name}</h2>
        <StatusBadge status={status} />
      </div>

      <div className="mt-2 flex items-center justify-between gap-2">
        <div className="min-w-0 flex items-center gap-2">
          <MapPin size={16} className="flex-shrink-0 text-grey-600" />
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

export default memo(FacilityCardBase);
