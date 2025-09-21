import FacilityCardBase from "./FacilityCard";
import type { Facility } from "@/types";
import { memo } from "react";

type Props = {
  facilities: Facility[];
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
  onSetDefault?: (id: string) => void;
  className?: string;
};

const noop = () => {};

function FacilityGrid({
  facilities,
  onEdit = noop,
  onDelete = noop,
  onSetDefault = noop,
  className = "",
}: Props) {
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
