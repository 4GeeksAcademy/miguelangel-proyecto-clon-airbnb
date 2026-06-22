import { ListingCardComponent } from "@/components/ListingCard";
import type { Listing } from "@/types/listing";

type ListingGridProps = {
  listings: Listing[];
  onToggleFavorite: (id: number) => void;
};

const ListingGrid = ({ listings, onToggleFavorite }: ListingGridProps) => {
  return (
    <section className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
      {listings.map((listing) => (
        <ListingCardComponent
          key={listing.id}
          listing={listing}
          onToggleFavorite={onToggleFavorite}
        />
      ))}
    </section>
  );
};

export const ListingGridComponent = ListingGrid;
