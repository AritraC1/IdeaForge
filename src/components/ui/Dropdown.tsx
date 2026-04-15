"use client";

import { useState } from "react";

type DropdownProps = {
  label: string;
  value: string;
  options: string[];
  onChange?: (val: string) => void;
  placeholder?: string;
};

export default function Dropdown({
  label,
  value,
  options,
  onChange,
  placeholder = "Select...",
}: DropdownProps) {
  const [open, setOpen] = useState(false);

  const handleSelect = (option: string) => {
    onChange?.(option);
    setOpen(false);
  };

  return (
    <div className="relative">
      <p className="text-xs font-semibold text-gray-400 tracking-wider mb-2">
        {label}
      </p>

      {/* Trigger */}
      <div
        onClick={() => setOpen(!open)}
        className="w-full cursor-pointer border border-gray-200 rounded-lg px-4 py-3 text-gray-700 flex justify-between items-center hover:border-gray-300"
      >
        <span className={`${!value ? "text-gray-400" : ""}`}>
          {value || placeholder}
        </span>
        <span className="text-gray-400">▾</span>
      </div>

      {/* Options */}
      {open && (
        <div className="absolute z-10 mt-2 w-full bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden">
          {options.map((option) => {
            const active = option === value;

            return (
              <div
                key={option}
                onClick={() => handleSelect(option)}
                className={`px-4 py-2 text-sm cursor-pointer hover:bg-gray-100
                  ${active ? "bg-blue-50 text-blue-600" : "text-gray-700"}
                `}
              >
                {option}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
