export default function FormInputLabel({
  label,
  type,
  required,
  placeholder,
  textarea,
}: {
  label: string;
  type?: string;
  required?: boolean;
  placeholder?: string;
  textarea?: boolean;
}) {
  return (
    <div className="mb-5 px-5">
      <label className="block text-sm font-semibold text-gray-800 mb-2">
        {label}{" "}
        {required ? <span className="text-red-600 font-black">*</span> : null}
      </label>
      {textarea ? (
        <textarea
          className="w-full text-sm py-1.5 px-3.5 text-gray-800 rounded-sm border border-gray-400 transition-all placeholder:text-sm"
          placeholder={placeholder}
        ></textarea>
      ) : (
        <input
          type={type}
          className="w-full text-sm py-1.5 px-3.5 text-gray-800 rounded-sm border border-gray-400 transition-all placeholder:text-sm"
          placeholder={placeholder}
          required={required}
        />
      )}
    </div>
  );
}
