export default function SkipLink() {
  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only fixed left-3 top-3 z-50 rounded-md bg-white px-3 py-2 text-grey-800 shadow focus:outline-none focus:ring-2 focus:ring-orange-400"
    >
      Skip to main content
    </a>
  );
}
