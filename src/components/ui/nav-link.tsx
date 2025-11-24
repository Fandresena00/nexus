import Link from "next/link";

export default function NavLink({
  title,
  href,
  icon,
  active,
  badge,
}: {
  title: string;
  href: string;
  icon: React.ReactNode;
  active?: boolean;
  badge?: string;
}) {
  return (
    <div className="px-7 mb-1">
      <Link
        href={href}
        className={`group relative flex items-center gap-3 py-1 px-5 rounded-lg text-gray-600 transition-all hover:bg-blue-300/40 ${
          active
            ? `bg-blue-500/10 shadow shadow-blue-600/50 before:content-[""] before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:w-1 before:h-5 before:bg-blue-700 before:rounded-xs`
            : ""
        }`}
      >
        <span
          className={`flex items-center justify-center group-hover:text-black shrink-0 ${
            active ? "text-blue-600" : ""
          }`}
        >
          {icon}
        </span>
        <span
          className={`flex-1 font-bold text-xs whitespace-nowrap group-hover:text-black ${
            active ? "text-blue-700" : ""
          }`}
        >
          {title}
        </span>
        {badge != null ? (
          <span className="flex items-center justify-center py-0.5 px-2 text-xs rounded-full bg-blue-800 text-blue-50 font-bold">
            {badge}
          </span>
        ) : null}
      </Link>
    </div>
  );
}
