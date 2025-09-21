import FacilityCardBase from "./FacilityCard";
import type { FacilityListProps } from "@/types";
import { memo } from "react";

const noop = () => {};

function FacilityGrid({
  facilities,
  onEdit = noop,
  onDelete = noop,
  onSetDefault = noop,
  className = "",
}: FacilityListProps) {
  return (
    <div
      role="list"
      className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 ${className}`}
    >
      {facilities.map((f) => (
        <div role="listitem" key={f.id}>
          <FacilityCardBase
            facility={f}
            onEdit={onEdit}
            onDelete={onDelete}
            onSetDefault={onSetDefault}
          />
        </div>
      ))}
    </div>
  );
}

export default memo(FacilityGrid);
