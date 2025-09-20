import Button from "@/components/ui/Button";
import CardGrid from "@/components/ui/CardGrid";
import { Link, useNavigate } from "react-router-dom";
import { useFacilitiesStore, selectSortedFacilities } from "@/store/facilities";
import { useState } from "react";
import ConfirmDelete from "@/components/ui/ConfirmDelete";

export default function FacilitiesListPage() {
  const hydrated = useFacilitiesStore((s) => s.hydrated);
  const facilities = useFacilitiesStore(selectSortedFacilities);
  const remove = useFacilitiesStore((s) => s.remove);
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const [pendingId, setPendingId] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const pendingName = pendingId
    ? (facilities.find((f) => f.id === pendingId)?.name ?? "")
    : "";

  function requestDelete(id: string) {
    setPendingId(id);
    setOpen(true);
  }

  async function confirmDelete() {
    if (!pendingId || isDeleting) return;
    setIsDeleting(true);
    try {
      remove(pendingId); // store will auto-reassign default if needed
    } finally {
      setIsDeleting(false);
      setPendingId(null);
    }
  }

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
          facilities={facilities}
          onEdit={(id) => navigate(`/facilities/${id}/edit`)}
          onDelete={requestDelete}
        />
      )}

      <ConfirmDelete
        open={open}
        onOpenChange={(o) => {
          if (!o) setPendingId(null);
          setOpen(o);
        }}
        title="Delete Facility"
        description={
          <div>
            <p className="text-xl">
              Are you sure you want to delete this facility? This action cannot
              be undone.
            </p>
            {pendingName && (
              <p className="mt-2 text-xl">
                Facility: <span className="font-bold">{pendingName}</span>
              </p>
            )}
          </div>
        }
        confirmLabel="Yes, Delete"
        cancelLabel="Cancel"
        confirmDisabled={isDeleting}
        onConfirm={confirmDelete}
      />
    </div>
  );
}
