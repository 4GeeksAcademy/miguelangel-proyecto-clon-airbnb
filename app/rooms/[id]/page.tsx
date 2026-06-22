"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { AmenitiesGridComponent } from "@/components/AmenitiesGrid";
import { BookingCardComponent } from "@/components/BookingCard";
import { HostInfoComponent } from "@/components/HostInfo";
import { ListingHeaderComponent } from "@/components/ListingHeader";
import { PhotoGalleryComponent } from "@/components/PhotoGallery";
import type { Room } from "@/types/room";

const RoomDetailPage = () => {
  const params = useParams<{ id: string }>();
  const [room, setRoom] = useState<Room | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const roomId = params.id ?? "0";
    const timer = setTimeout(() => {
      setRoom({
        id: roomId,
        title: "Loft luminoso con terraza en el centro",
        location: "Madrid, España",
        images: ["Foto 1/5", "Foto 2/5", "Foto 3/5", "Foto 4/5", "Foto 5/5"],
        pricePerNight: 135,
        rating: 4.8,
        reviewCount: 126,
        hostName: "Laura",
        hostYears: 6,
        amenities: ["WiFi", "Cocina", "Aire acondicionado", "Lavadora", "Aparcamiento", "Piscina"],
        guests: 4,
        bedrooms: 2,
        beds: 3,
        bathrooms: 1,
      });
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [params.id]);

  if (loading) {
    return (
      <main className="mx-auto min-h-screen max-w-6xl px-4 py-6">
        <p className="rounded-2xl border border-gray-200 bg-white p-6 text-center text-gray-700">Cargando detalle de la habitación...</p>
      </main>
    );
  }

  if (!room) {
    return (
      <main className="mx-auto min-h-screen max-w-6xl px-4 py-6">
        <p className="rounded-2xl border border-gray-200 bg-white p-6 text-center text-gray-700">No se encontró la habitación.</p>
      </main>
    );
  }

  return (
    <main className="mx-auto min-h-screen max-w-6xl px-4 py-4 pb-28 md:pb-8">
      <Link
        href="/catalog"
        className="mb-4 inline-flex items-center gap-2 rounded-full border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
      >
        <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-4 w-4" aria-hidden="true">
          <path d="M12.5 4.5L7 10l5.5 5.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <span>Volver a resultados</span>
      </Link>
      <section className="grid grid-cols-1 gap-5 md:grid-cols-[minmax(0,1fr)_320px]">
        <div className="space-y-4">
          <PhotoGalleryComponent images={room.images} />
          <ListingHeaderComponent title={room.title} rating={room.rating} reviewCount={room.reviewCount} location={room.location} />
          <HostInfoComponent hostName={room.hostName} hostYears={room.hostYears} />
          <article className="rounded-2xl border border-gray-200 bg-white p-4 text-sm text-gray-700">
            {room.guests} huéspedes · {room.bedrooms} dormitorios · {room.beds} camas · {room.bathrooms} baño
          </article>
          <AmenitiesGridComponent amenities={room.amenities} />
        </div>
        <BookingCardComponent pricePerNight={room.pricePerNight} />
      </section>
    </main>
  );
};

export default RoomDetailPage;