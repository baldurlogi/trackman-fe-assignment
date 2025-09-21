import { useState } from "react";
import { Image as ImageIcon } from "lucide-react";

export default function FacilityImage({
  src,
  alt,
}: {
  src: string | null | undefined;
  alt: string;
}) {
  const [error, setError] = useState(false);

  if (!src || error) {
    return (
      <div className="aspect-video w-full rounded-xl bg-grey-100 flex items-center justify-center">
        <ImageIcon aria-hidden className="h-8 w-8 text-grey-600/70" />
        <span className="sr-only">No image available</span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      className="aspect-video w-full rounded-xl object-cover"
      loading="lazy"
      decoding="async"
      draggable={false}
      onError={() => setError(true)}
    />
  );
}