import Link from "next/link";
import type { Listing } from "@/types/listing";

type ListingCardProps = {
  listing: Listing;
  onToggleFavorite: (id: number) => void;
};

const renderStars = (rating: number) => {
  const fullStars = Math.round(rating);
  return "★".repeat(fullStars) + "☆".repeat(5 - fullStars);
};

const ListingCard = ({ listing, onToggleFavorite }: ListingCardProps) => {
  return (
    <div className="relative">
      <Link href={`/rooms/${listing.id}`} className="block">
        <article className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm transition hover:shadow-md">
          <div className="mb-3 h-44 w-full rounded-xl bg-gray-200" aria-label={listing.image} />
          <h3 className="text-base font-semibold text-gray-900">{listing.title}</h3>
          <p className="mt-1 text-sm text-gray-600">${listing.pricePerNight} por noche</p>
          <p className="mt-2 text-sm text-amber-500" aria-label={`Valoración ${listing.rating} de 5`}>
            {renderStars(listing.rating)}
          </p>
        </article>
      </Link>
      <button
        type="button"
        onClick={() => onToggleFavorite(listing.id)}
        className="absolute right-7 top-7 rounded-full bg-white/80 px-2 py-1 text-lg"
        aria-label="Marcar como favorito"
      >
        {listing.isFavorite ? "♥" : "♡"}
      </button>
    </div>
  );
};

export const ListingCardComponent = ListingCard;
