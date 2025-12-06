export default function FormSelected({
  label,
  list,
}: {
  label: string;
  list: Array<string>;
}) {
  return (
    <div className="mb-5 px-5">
      <label className="block text-sm font-semibold text-gray-800 mb-2">
        {label}
      </label>
      <select className="w-full text-sm py-1.5 px-3.5 text-gray-800 rounded-sm border border-gray-400 transition-all placeholder:text-sm">
        {list.map((e) => (
          <option key={e}>{e}</option>
        ))}
      </select>
    </div>
  );
}
