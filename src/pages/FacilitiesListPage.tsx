import Button from "@/components/ui/Button";
import CardGrid from "@/components/ui/CardGrid";
import { Link } from "react-router-dom";
import { getStatus } from "@/utils/time";
import type { CardData } from "@/types";
import { useFacilitiesStore } from "@/store/facilities";

export default function FacilitiesListPage() {
  const hydrated = useFacilitiesStore((s) => s.hydrated);
  const facilities = useFacilitiesStore((s) => s.getSorted());

  const cards: CardData[] = facilities.map((f) => ({
    id: f.id,
    title: f.name,
    status: getStatus(f.openingTime, f.closningTime) === "Open" ? "Open" : "Closed",
    image: f.imageUrl,
    address: f.address,
  }));

  return (
    <div className="px-30">
      <div className="py-6 flex justify-end">
        <Link to="/facilities/new">
          <Button
            containerClass="text-white bg-orange-400 flex text-2xl justify-end px-12 py-3"
            title={"Create Facility"}
            id="create facility"
          />
        </Link>
      </div>

      {!hydrated ? (
        <div className="py-12 text-center opacity-80">Loading...</div>
      ) : cards.length === 0 ? (
        <div className="py-12 text-center opacity-80">
          <p>No facilities yet.</p>
          <p className="mt-2">
            <Link to="/facilities/new" className="underline" >
              Create your first facility
            </Link>
          </p>
        </div>
      ) : (
        <CardGrid cards={cards} />
      )}
    </div>
  );
}
