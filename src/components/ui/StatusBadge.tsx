export default function StatusBadge({ status }: { status: "Open" | "Closed" }) {
  const open = status === "Open";
  return (
    <span
      className={`px-2 py-0.5 rounded-full text-lg font-semibold ${
        open ? "bg-success-light text-success" : "bg-error-light text-error"
      }`}
    >
      {status}
    </span>
  );
}