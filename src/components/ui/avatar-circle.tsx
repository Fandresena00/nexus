export default function AvatarCircle({
  initial,
  small,
}: {
  initial: string;
  small?: boolean;
}) {
  return (
    <div
      className={`flex items-center justify-center text-white border border-white  rounded-full bg-linear-120 from-blue-400 to-blue-700 font-bold ${
        small ? "w-7 h-7 text-[11px]" : "w-10 h-10 text-sm"
      }`}
    >
      {initial.toUpperCase()}
    </div>
  );
}
