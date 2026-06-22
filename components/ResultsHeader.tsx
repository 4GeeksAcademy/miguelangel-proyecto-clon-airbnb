"use client";

import { useState } from "react";

export type PriceOrder = "asc" | "desc";

type ResultsHeaderProps = {
  totalResults: number;
  onOrderChange: (order: PriceOrder) => void;
};

const ResultsHeader = ({ totalResults, onOrderChange }: ResultsHeaderProps) => {
  const [order, setOrder] = useState<PriceOrder>("asc");

  const handleChange = (nextOrder: PriceOrder) => {
    setOrder(nextOrder);
    onOrderChange(nextOrder);
  };

  return (
    <section className="mb-4 flex flex-col gap-3 rounded-2xl border border-gray-200 bg-white p-4 md:flex-row md:items-center md:justify-between">
      <p className="text-sm font-semibold text-gray-900 md:text-base">
        Más de {totalResults.toLocaleString("es-ES")} alojamientos
      </p>
      <label className="flex items-center gap-2 text-sm text-gray-700" htmlFor="price-order">
        Ordenar por precio:
        <select
          id="price-order"
          value={order}
          onChange={(event) => handleChange(event.target.value as PriceOrder)}
          className="rounded-full border border-gray-300 bg-white px-3 py-2 outline-none ring-rose-300 focus:ring"
        >
          <option value="asc">Ascendente</option>
          <option value="desc">Descendente</option>
        </select>
      </label>
    </section>
  );
};

export const ResultsHeaderComponent = ResultsHeader;