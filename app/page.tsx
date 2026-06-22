"use client";

import { useEffect, useMemo, useState } from "react";
import { CategoryFiltersComponent } from "@/components/CategoryFilters";
import { ListingGridComponent } from "@/components/ListingGrid";
import { NavbarComponent } from "@/components/Navbar";
import type { Listing } from "@/types/listing";

const seedListings: Listing[] = [
  { id: 1, title: "Cabaña frente al mar", image: "playa-1", pricePerNight: 120, rating: 4.7, category: "Playa", isFavorite: false },
  { id: 2, title: "Villa de lujo con jardín", image: "mansion-1", pricePerNight: 380, rating: 4.9, category: "Mansiones", isFavorite: true },
  { id: 3, title: "Loft urbano moderno", image: "trend-1", pricePerNight: 170, rating: 4.5, category: "Tendencias", isFavorite: false },
  { id: 4, title: "Casa rural entre montañas", image: "campo-1", pricePerNight: 110, rating: 4.6, category: "Campo", isFavorite: false },
  { id: 5, title: "Apartamento con piscina infinita", image: "pool-1", pricePerNight: 240, rating: 4.8, category: "Piscinas", isFavorite: false },
  { id: 6, title: "Castillo medieval restaurado", image: "castle-1", pricePerNight: 420, rating: 4.9, category: "Castillos", isFavorite: false },
  { id: 7, title: "Bungalow tropical en la costa", image: "playa-2", pricePerNight: 145, rating: 4.4, category: "Playa", isFavorite: true },
  { id: 8, title: "Mansión con vista al lago", image: "mansion-2", pricePerNight: 350, rating: 4.7, category: "Mansiones", isFavorite: false },
];

const HomePage = () => {
  const [listings, setListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState("");
  const [activeCategory, setActiveCategory] = useState<Listing["category"] | "">("");

  useEffect(() => {
    const timer = setTimeout(() => {
      setListings(seedListings);
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const filteredListings = useMemo(() => {
    return listings.filter((listing) => {
      const matchesSearch = listing.title.toLowerCase().includes(searchText.toLowerCase().trim());
      const matchesCategory = activeCategory ? listing.category === activeCategory : true;
      return matchesSearch && matchesCategory;
    });
  }, [listings, searchText, activeCategory]);

  const toggleFavorite = (id: number) => {
    setListings((current) => current.map((item) => (item.id === id ? { ...item, isFavorite: !item.isFavorite } : item)));
  };

  return (
    <main className="min-h-screen">
      <NavbarComponent onSearchChange={setSearchText} />
      <CategoryFiltersComponent onCategoryChange={setActiveCategory} />
      <section className="mx-auto max-w-7xl px-4 py-6">
        {loading ? (
          <p className="rounded-xl border border-gray-200 bg-white p-6 text-center text-gray-700">Cargando alojamientos...</p>
        ) : (
          <ListingGridComponent listings={filteredListings} onToggleFavorite={toggleFavorite} />
        )}
      </section>
    </main>
  );
};

export default HomePage;
