"use client";

import { useMemo, useState } from "react";

type BookingCardProps = {
  pricePerNight: number;
  maxGuests: number;
};

const getTodayString = () => new Date().toISOString().split("T")[0];

const addDays = (dateString: string, days: number) => {
  const baseDate = new Date(`${dateString}T00:00:00`);
  baseDate.setDate(baseDate.getDate() + days);
  return baseDate.toISOString().split("T")[0];
};

const BookingCard = ({ pricePerNight, maxGuests }: BookingCardProps) => {
  const [guests, setGuests] = useState(1);
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");

  const today = getTodayString();

  const decreaseGuests = () => setGuests((current) => Math.max(1, current - 1));
  const increaseGuests = () => setGuests((current) => Math.min(maxGuests, current + 1));

  const nights = useMemo(() => {
    if (!checkIn || !checkOut) return 0;

    const inDate = new Date(`${checkIn}T00:00:00`);
    const outDate = new Date(`${checkOut}T00:00:00`);
    const diffMs = outDate.getTime() - inDate.getTime();
    const calculatedNights = Math.ceil(diffMs / (1000 * 60 * 60 * 24));

    return calculatedNights > 0 ? calculatedNights : 0;
  }, [checkIn, checkOut]);

  const totalPrice = nights * pricePerNight;
  const minCheckOut = checkIn ? addDays(checkIn, 1) : today;

  return (
    <aside className="fixed inset-x-0 bottom-0 z-20 border-t border-gray-200 bg-white p-4 shadow-[0_-4px_12px_rgba(15,23,42,0.08)] md:sticky md:top-6 md:rounded-2xl md:border md:p-5 md:shadow-sm">
      <p className="text-lg font-semibold text-gray-900">${pricePerNight} por noche</p>
      <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-1">
        <label className="rounded-xl border border-gray-300 p-3 text-sm text-gray-700">
          <span className="mb-1 block text-xs font-semibold uppercase tracking-wide text-gray-500">Entrada</span>
          <input
            type="date"
            value={checkIn}
            min={today}
            onChange={(event) => {
              const nextCheckIn = event.target.value;
              setCheckIn(nextCheckIn);

              if (checkOut && nextCheckIn && checkOut <= nextCheckIn) {
                setCheckOut(addDays(nextCheckIn, 1));
              }
            }}
            className="w-full bg-transparent text-sm outline-none"
          />
        </label>
        <label className="rounded-xl border border-gray-300 p-3 text-sm text-gray-700">
          <span className="mb-1 block text-xs font-semibold uppercase tracking-wide text-gray-500">Salida</span>
          <input
            type="date"
            value={checkOut}
            min={minCheckOut}
            onChange={(event) => setCheckOut(event.target.value)}
            className="w-full bg-transparent text-sm outline-none"
          />
        </label>
      </div>
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
      <div className="mt-3 rounded-xl border border-gray-200 bg-gray-50 p-3 text-sm text-gray-700">
        <p>
          {nights > 0 ? `${nights} noche${nights > 1 ? "s" : ""}` : "Selecciona tus fechas"}
        </p>
        <p className="mt-1 font-semibold text-gray-900">Total: ${totalPrice}</p>
      </div>
      <button
        type="button"
        disabled={nights === 0}
        className="mt-4 w-full rounded-xl bg-rose-500 px-4 py-3 text-sm font-semibold text-white hover:bg-rose-600 disabled:cursor-not-allowed disabled:bg-rose-300"
      >
        Reservar
      </button>
    </aside>
  );
};

export const BookingCardComponent = BookingCard;