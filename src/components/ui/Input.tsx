export default function Input({
  label,
  placeholder,
}: {
  label: string;
  placeholder: string;
}) {
  return (
    <div>
      <p className="text-xs font-semibold text-gray-400 tracking-wider mb-2">
        {label}
      </p>
      <input
        placeholder={placeholder}
        className="w-full border border-gray-200 rounded-lg px-4 py-3 text-gray-700 outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
}
