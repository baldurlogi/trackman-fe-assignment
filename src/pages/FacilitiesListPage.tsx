import { useEffect, useState } from "react";
import Button from "@/components/ui/Button";
import CardGrid from "@/components/ui/CardGrid";
import { Link } from "react-router-dom";
import { list, STORAGE_KEY } from "@/services/storage";
import { getStatus } from "@/utils/time";
import type { CardData } from "@/types";

export default function FacilitiesListPage() {
  const [cards, setCards] = useState<CardData[]>([]);

  const hydrate = () => {
    const facilities = list();
    const mapped: CardData[] = facilities.map((f) => ({
      id: f.id,
      title: f.name,
      status: getStatus(f.openingTime, f.closningTime) === "Open" ? "Open" : "Closed",
      image: f.imageUrl,
      address: f.address,
    }));
    setCards(mapped);
  }

  useEffect(() => {
    hydrate();

    const onStorage = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY) hydrate();
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, [])

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

      {cards.length === 0 ? (
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
