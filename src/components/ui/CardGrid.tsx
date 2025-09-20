import Card from "./Card";
import type { Facility } from "@/types";
import { useFacilitiesStore } from "@/store/facilities";

type Props = {
  facilities: Facility[];
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
}

const CardGrid = ({ facilities, onEdit, onDelete }: Props) => {
  const setDefault = useFacilitiesStore((s) => s.setDefault);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {facilities.map((f) => (
        <Card
          key={f.id}
          facility={f}
          onEdit={onEdit ?? (() => {})}
          onDelete={onDelete ?? (() => {})}
          onSetDefault={setDefault}
        />
      ))}
    </div>
  );
};

export default CardGrid;
