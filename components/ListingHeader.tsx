type ListingHeaderProps = {
  title: string;
  rating: number;
  reviewCount: number;
  location: string;
};

const ListingHeader = ({ title, rating, reviewCount, location }: ListingHeaderProps) => {
  const stars = "★".repeat(Math.round(rating)).padEnd(5, "☆");

  return (
    <header className="space-y-2 rounded-2xl border border-gray-200 bg-white p-4">
      <h1 className="text-xl font-semibold text-gray-900 sm:text-2xl">{title}</h1>
      <div className="flex flex-wrap items-center gap-2 text-sm text-gray-700">
        <span className="text-amber-500" aria-label={`Valoración ${rating} de 5`}>
          {stars}
        </span>
        <span>{rating.toFixed(1)}</span>
        <span>·</span>
        <span>{reviewCount} reseñas</span>
        <span>·</span>
        <span>{location}</span>
      </div>
    </header>
  );
};

export const ListingHeaderComponent = ListingHeader;