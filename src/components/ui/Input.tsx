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
        className="w-full border border-gray-200 dark:border-gray-700 rounded-lg px-4 py-3 text-gray-700 dark:text-gray-200 dark:bg-gray-900 outline-none focus:ring-2 focus:ring-blue-500 dark:placeholder:text-gray-500"
      />
    </div>
  );
}
