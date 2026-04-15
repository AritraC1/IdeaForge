export default function TagGroup({
  items,
  selected,
  onChange,
}: {
  items: string[];
  selected: string[];
  onChange: (val: string[]) => void;
}) {
  const toggleItem = (item: string) => {
    if (selected.includes(item)) {
      onChange(selected.filter((i) => i !== item)); // remove
    } else {
      onChange([...selected, item]); // add
    }
  };

  return (
    <div className="flex flex-wrap gap-3">
      {items.map((item) => {
        const active = selected.includes(item);

        return (
          <button
            key={item}
            onClick={() => toggleItem(item)}
            className={`px-4 py-2 rounded-full text-sm border transition
              ${
                active
                  ? "bg-blue-100 border-blue-500 text-blue-600"
                  : "bg-gray-100 border-gray-200 text-gray-600 hover:bg-gray-200"
              }
            `}
          >
            {item}
          </button>
        );
      })}
    </div>
  );
}