/**
 * Flour-dusted edge between a dark (char) section and a cream (flour) one.
 * Place it as the first child of the flour section; `flip` for the bottom.
 */
export default function SectionEdge({ flip = false }: { flip?: boolean }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 1440 28"
      preserveAspectRatio="none"
      className={`absolute left-0 h-7 w-full text-[#0f0d07] ${
        flip ? "bottom-0 rotate-180" : "top-0"
      }`}
    >
      <path
        fill="currentColor"
        d="M0 0h1440v9c-38 6-61-3-104 2-52 6-78 14-131 9-47-4-70-13-118-10-56 3-83 15-140 13-49-2-74-12-122-12-55 0-82 13-137 12-51-1-77-12-128-11-54 1-80 11-134 11-50 0-76-9-126-10-57-1-87 9-143 7-41-1-80-9-157-12z"
      />
      <g fill="currentColor" opacity="0.55">
        <circle cx="212" cy="22" r="1.4" />
        <circle cx="388" cy="25" r="1" />
        <circle cx="644" cy="23" r="1.6" />
        <circle cx="905" cy="26" r="1.1" />
        <circle cx="1130" cy="24" r="1.3" />
        <circle cx="1318" cy="21" r="1" />
      </g>
    </svg>
  );
}
