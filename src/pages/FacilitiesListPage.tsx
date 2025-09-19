import Button from "@/components/ui/Button";
import CardGrid from "@/components/ui/CardGrid";
import { courses } from "@/constants";
import { Link } from "react-router-dom";

export default function FacilitiesListPage() {
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
      <div>
        <CardGrid cards={courses} />
      </div>
    </div>
  );
}
