import { Star } from "lucide-react";

export default function DefaultStar({
  isDefault,
  onClick,
}: {
  isDefault: boolean;
  onClick: () => void;
}) {
  const label = isDefault ? "Default facility" : "Set as default";
  return (
    <button
      type="button"
      title={label}
      aria-label={label}
      aria-pressed={isDefault}
      disabled={isDefault}
      onClick={onClick}
      className={`absolute left-3 top-3 inline-flex h-10 w-10 items-center justify-center rounded-full shadow ring-1 ring-black/5 ${isDefault ? "bg-orange-400 text-white" : "bg-white/90 text-grey-600 hover:text-orange-600"}`}
    >
      <Star className="h-5 w-5 fill-current" aria-hidden />
    </button>
  );
}