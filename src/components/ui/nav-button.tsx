export default function NavButton({
  icon,
  text,
  badge,
  active,
  principal,
}: {
  icon?: React.ReactNode;
  text?: string;
  badge?: boolean;
  active?: boolean;
  principal?: boolean;
}) {
  return (
    <button
      className={`relative flex items-center justify-center gap-1 whitespace-nowrap text-xs font-bold cursor-pointer transition-all rounded-lg active:translate-y-0.5
            ${text == null && icon != null ? "hover:bg-gray-300" : null}
            ${
              text != null && !principal && !active
                ? " hover:text-blue-800 tracking-wide py-1 px-1.5  hover:bg-blue-100"
                : null
            }
            ${
              text != null && !principal && active
                ? "text-blue-800 tracking-wide py-1 px-1.5 bg-blue-50 hover:bg-blue-100"
                : null
            }
            ${
              text != null && principal && !active
                ? "text-white tracking-wide py-0.5 px-2 bg-blue-600 hover:bg-blue-700 hover:-translate-y-0.5"
                : null
            }
      `}
    >
      {icon != null ? <span className="p-1.5">{icon}</span> : null}
      {text != null ? <span className="p-1.5">{text}</span> : null}
      {badge ? (
        <span className="absolute top-0.5 right-0.5 w-1.5 h-1.5 bg-red-600 rounded-full"></span>
      ) : null}
    </button>
  );
}
