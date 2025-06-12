import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { CarsResponse, Car } from "../types/cars";
import { parseCarsRespnse } from "../helper/parseResponse";

export function useCars() {
  const searchParams = useSearchParams();
  const page = searchParams.get("page") || "1";
  const order = searchParams.get("order") || undefined;

  const [cars, setCars] = useState<Car[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCars() {
      setLoading(true);
      const query = order
        ? `_limit=12&_page=${page}&_sort=price&_order=${order}`
        : `_limit=12&_page=${page}`;

      const res = await fetch(`/api/cars?${query}`);
      const data: CarsResponse = await res.json();

      setCars(parseCarsRespnse(data.data));
      setTotal(data.meta.total);
      setLoading(false);
    }

    fetchCars();
  }, [page, order]);

  const currentPage = Number(page);

  return { cars, total, loading, currentPage, order };
}
