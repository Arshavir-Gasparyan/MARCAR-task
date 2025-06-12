"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import clsx from "clsx";

const options = [
  { label: "Не выбрана", value: "" },
  { label: "По возрастанию", value: "asc" },
  { label: "По убыванию", value: "desc" },
];

export default function SortDropdown() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentOrder = searchParams.get("order") || "";

  const [open, setOpen] = useState(false);
  const selected =
    options.find((opt) => opt.value === currentOrder) || options[0];

  const handleSelect = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (value === "") {
      params.delete("order");
    } else {
      params.set("order", value);
    }

    router.push(`?${params.toString()}`);
    setOpen(false);
  };

  return (
    <div className="relative w-64 p-4">
      <label className="text-sm font-medium text-white mb-1">
        Сортировка по цене
      </label>
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex justify-between items-center bg-white border border-gray-300 rounded-lg px-4 py-2 text-sm text-gray-800 shadow-sm"
      >
        {selected.label}
      </button>

      {open && (
        <ul className="absolute mt-1 w-full bg-white rounded-lg shadow-lg text-sm text-gray-800">
          {options.map((opt) => (
            <li
              key={opt.value}
              onClick={() => handleSelect(opt.value)}
              className={clsx(
                "cursor-pointer px-4 py-2 hover:bg-blue-100 flex justify-between items-center",
                opt.value === currentOrder && "bg-blue-50 font-medium"
              )}
            >
              <span>{opt.label}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
