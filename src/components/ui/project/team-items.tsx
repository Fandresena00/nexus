export default function TeamItems() {
  return (
    <div className="flex items-center gap-3 p-3 bg-gray-300 border border-gray-500  rounded-lg">
      <div className="flex items-center justify-center font-bold text-white bg-linear-120 from-blue-600 to-blue-800 shadow w-10 h-10 rounded-full ">
        JD
      </div>
      <div className="flex-1">
        <div className="text-sm font-bold text-blue-950">
          Jean Dupont (Vous)
        </div>
        <div className="text-xs text-gray-800">jean.dupont@acme.com</div>
      </div>
      <select className="py-1 px-2.5 bg-white rounded-lg text-xs font-bold text-gray-700 cursor-pointer">
        <option>Propriétaire</option>
      </select>
    </div>
  );
}
