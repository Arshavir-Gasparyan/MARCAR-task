"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { Car } from "../types/cars";

export default function CarCard({ car }: { car: Car }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (!isHovered || car.images.length <= 1) return;

    const intervalId = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % car.images.length);
    }, 500);

    return () => clearInterval(intervalId);
  }, [isHovered, car.images.length]);

  useEffect(() => {
    if (!isHovered) setCurrentImageIndex(0);
  }, [isHovered]);

  return (
    <div
      className="rounded-2xl overflow-hidden bg-indigo-400 shadow-md hover:shadow-xl hover:scale-[1.02] transition duration-300 cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative w-full aspect-[4/3] sm:aspect-[5/3] md:aspect-[16/9]">
        <Image
          src={car.images[currentImageIndex]}
          alt={`${car.markId} ${car.folderId}`}
          fill
          className="object-cover transition-opacity duration-500"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          priority
        />
      </div>

      <div className="p-4">
        <h3 className="text-lg font-semibold text-white mb-1">
          {car.markId} {car.folderId}
        </h3>
        <p className="text-white font-bold text-xl mb-2">
          {car.price.toLocaleString()} ₽
        </p>

        {/* Extra car info */}
        <div className="text-sm text-indigo-100 space-y-1">
          <p>
            <strong>Year:</strong> {car.year} • <strong>Run:</strong>{" "}
            {car.run.toLocaleString()} km
          </p>
          <p>
            <strong>Color:</strong> {car.color}{" "}
          </p>
          <p>
            <strong>Wheel:</strong> {car.wheel} • <strong>State:</strong>{" "}
            {car.state}
          </p>
          <p>
            <strong>Owners:</strong> {car.ownersNumber} •{" "}
            <strong>Availability:</strong> {car.availability}
          </p>
        </div>
      </div>
    </div>
  );
}
