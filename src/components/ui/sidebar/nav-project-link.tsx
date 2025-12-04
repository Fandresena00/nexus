import Link from "next/link";

export default function NavProjectLink({
  title,
  badge,
  href,
  colorIndex = 0,
}: {
  title: string;
  badge: string;
  href: string;
  colorIndex?: number;
}) {
  const ticketColor = [
    "bg-blue-600",
    "bg-purple-600",
    "bg-green-600",
    "bg-orange-600",
    "bg-pink-600",
  ];

  const color = ticketColor[colorIndex % ticketColor.length];

  return (
    <div className="px-3 mb-1">
      <Link
        href={href}
        className="flex items-center gap-3 py-1.5 px-3 border-b border-b-gray-700 rounded-lg text-gray-700 text-xs transition-all hover:bg-blue-300/50"
      >
        <span className={`w-2 h-2 rounded-full shrink-0 ${color}`}></span>
        <span className="flex-1 whitespace-nowrap overflow-hidden text-ellipsis">
          {title}
        </span>
        <span className="py-0.5 px-2.5 rounded-full shrink-0 text-[11px] text-gray-700 bg-gray-200">
          {badge}
        </span>
      </Link>
    </div>
  );
}
