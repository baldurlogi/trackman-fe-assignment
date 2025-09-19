import Button from "./Button";
import { MapPin, Trash } from "lucide-react";

type CardProps = {
  title?: string;
  status?: "Open" | "Closed";
  image: string;
  address: string;
};

const Card = ({ title, status, image, address }: CardProps) => {
  return (
    <div className="flex flex-col rounded-2xl shadow-sm bg-white p-4">
      {/* Image */}
      <img
        src={image}
        alt="Golf court"
        className="w-full aspect-video object-cover rounded-xl"
      />

      {/* Title + Status */}
      <div className="flex mt-3 items-center justify-between">
        <h3 className="text-lg font-semibold">{title}</h3>
        {status && (
          <span
            className={`font-semibold px-2 py-1 rounded-full ${status === "Closed" ? "bg-error-light text-error" : "bg-success-light text-success"}`}
          >
            {status}
          </span>
        )}
      </div>

      {/* Address + actions */}
      <div className="mt-2 flex items-center justify-between">
        <div className="flex item-center gap-2 min-w-0">
          <MapPin size={16} className="text-gray-500 flex-shrink-0" />
          <p className="truncate whitespace-nowrap text-sm text-gray-700">
            {address}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button id="delete" icon={<Trash size={16} />} containerClass="rounded-md px-2 py-1 bg-gray-100 text-grey-600" />
          <Button id="edit" title="Edit" containerClass="rounded-md px-2 py-1 bg-gray-100 text-grey-600" />
        </div>
      </div>
    </div>
  );
};

export default Card;
