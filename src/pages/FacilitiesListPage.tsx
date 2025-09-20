import Button from "@/components/ui/Button";
import CardGrid from "@/components/ui/CardGrid";
import { Link, useNavigate } from "react-router-dom";
import { useFacilitiesStore } from "@/store/facilities";
import { useMemo } from "react";

export default function FacilitiesListPage() {
  const hydrated = useFacilitiesStore((s) => s.hydrated);
  const facilities = useFacilitiesStore((s) => s.facilities);
  const navigate = useNavigate();

  const sortedFacilities = useMemo(() => {
    const arr = facilities.slice();
    const idx = arr.findIndex((f) => f.isDefault);
    if (idx > 0) {
      const [d] = arr.splice(idx, 1);
      arr.unshift(d);
    }
    return arr;
  }, [facilities]);

  return (
    <div className="px-30">
      <div className="py-6 flex justify-end">
        <Link to="/facilities/new">
          <Button
            containerClass="text-white bg-orange-400 flex text-2xl justify-end px-12 py-3"
            title={"Create Facility"}
            id="create-facility"
          />
        </Link>
      </div>

      {!hydrated ? (
        <div className="py-12 text-center opacity-80">Loading...</div>
      ) : facilities.length === 0 ? (
        <div className="py-12 text-center opacity-80">
          <p>No facilities yet.</p>
          <p className="mt-2">
            <Link to="/facilities/new" className="underline">
              Create your first facility
            </Link>
          </p>
        </div>
      ) : (
        <CardGrid
          facilities={sortedFacilities}
          onEdit={(id) => navigate(`/facilities/${id}/edit`)}
        />
      )}
    </div>
  );
}
