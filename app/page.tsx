"use client";

import CarCard from "./components/CarCard";
import Header from "./components/Header";
import Pagination from "./components/Pagination";
import SortDropdown from "./components/SortDropdown";
import { useCars } from "./hooks/useCars";

export default function Home() {
  const { cars, total, currentPage, order, loading } = useCars();

  return (
    <div className="bg-black flex flex-col min-h-screen">
      <Header>
        <SortDropdown />
      </Header>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-6">
        {loading
          ? Array.from({ length: 12 }).map((_, i) => (
              <div
                key={i}
                className="rounded-2xl bg-gray-300 h-[240px] animate-pulse"
              />
            ))
          : cars.map((car, index) => <CarCard key={index} car={car} />)}
      </div>
      <div className="flex justify-center items-center py-6 cursor-pointer">
        <Pagination
          currentPage={currentPage}
          totalPages={Math.ceil(total / 12)}
          order={order}
        />
      </div>
    </div>
  );
}
