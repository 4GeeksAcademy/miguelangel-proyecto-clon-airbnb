"use client";

import { useState } from "react";

type BookingCardProps = {
  pricePerNight: number;
};

const BookingCard = ({ pricePerNight }: BookingCardProps) => {
  const [guests, setGuests] = useState(1);

  const decreaseGuests = () => setGuests((current) => Math.max(1, current - 1));
  const increaseGuests = () => setGuests((current) => Math.min(10, current + 1));

  return (
    <aside className="fixed inset-x-0 bottom-0 z-20 border-t border-gray-200 bg-white p-4 shadow-[0_-4px_12px_rgba(15,23,42,0.08)] md:sticky md:top-6 md:rounded-2xl md:border md:p-5 md:shadow-sm">
      <p className="text-lg font-semibold text-gray-900">${pricePerNight} por noche</p>
      <div className="mt-3 flex items-center justify-between rounded-xl border border-gray-300 p-3">
        <span className="text-sm font-medium text-gray-700">Huéspedes</span>
        <div className="flex items-center gap-3">
          <button type="button" onClick={decreaseGuests} className="h-8 w-8 rounded-full border border-gray-300 text-lg">
            -
          </button>
          <span className="w-6 text-center text-sm font-semibold text-gray-900">{guests}</span>
          <button type="button" onClick={increaseGuests} className="h-8 w-8 rounded-full border border-gray-300 text-lg">
            +
          </button>
        </div>
      </div>
      <button
        type="button"
        className="mt-4 w-full rounded-xl bg-rose-500 px-4 py-3 text-sm font-semibold text-white hover:bg-rose-600"
      >
        Reservar
      </button>
    </aside>
  );
};

export const BookingCardComponent = BookingCard;