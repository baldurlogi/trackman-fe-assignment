import Button from "./Button";
import { MapPin, Trash } from "lucide-react";
import type { CardProps } from "@/types";

const Card = ({ title, status, image, address }: CardProps) => {
  return (
    <div className="flex flex-col rounded-2xl shadow-sm bg-white p-4 hover:shadow-2xl">
      {/* Image */}
      <img
        src={image}
        alt="Golf court"
        className="w-full aspect-video object-cover rounded-xl"
      />

      {/* Title + Status */}
      <div className="flex mt-3 items-center justify-between">
        <h2 className="font-semibold">{title}</h2>
        {status && (
          <h3
            className={`font-semibold px-2 py-1 rounded-full ${status === "Closed" ? "bg-error-light text-error" : "bg-success-light text-success"}`}
          >
            {status}
          </h3>
        )}
      </div>

      {/* Address + actions */}
      <div className="mt-2 flex items-center justify-between">
        <div className="flex item-center gap-2 min-w-0">
          <MapPin size={16} className="text-gray-500 flex-shrink-0" />
          <h3 className="truncate font-medium whitespace-nowrap text-gray-700">
            {address}
          </h3>
        </div>
        <div className="flex items-center gap-2">
          <Button
            id="delete"
            icon={<Trash size={28} />}
            containerClass="rounded-md px-3 py-1 bg-gray-100 text-grey-600"
          />
          <Button
            id="edit"
            title="Edit"
            containerClass="rounded-md px-8 py-1 bg-gray-100 text-grey-600 text-lg"
          />
        </div>
      </div>
    </div>
  );
};

export default Card;
