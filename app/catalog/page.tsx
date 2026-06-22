"use client";

import { useEffect, useMemo, useState } from "react";
import { ListingCardComponent } from "@/components/ListingCard";
import { MapPlaceholderComponent } from "@/components/MapPlaceholder";
import { NavbarComponent } from "@/components/Navbar";
import { ResultsHeaderComponent, type PriceOrder } from "@/components/ResultsHeader";
import type { Listing } from "@/types/listing";

const seedCatalogListings: Listing[] = [
  { id: 101, title: "Apartamento moderno en Malasaña", image: "catalog-1", pricePerNight: 95, rating: 4.7, category: "Tendencias", isFavorite: false },
  { id: 102, title: "Casa con piscina en Marbella", image: "catalog-2", pricePerNight: 220, rating: 4.9, category: "Piscinas", isFavorite: true },
  { id: 103, title: "Cabaña frente al mar en Cádiz", image: "catalog-3", pricePerNight: 130, rating: 4.6, category: "Playa", isFavorite: false },
  { id: 104, title: "Castillo histórico en Segovia", image: "catalog-4", pricePerNight: 310, rating: 4.8, category: "Castillos", isFavorite: false },
  { id: 105, title: "Finca rural en Asturias", image: "catalog-5", pricePerNight: 115, rating: 4.5, category: "Campo", isFavorite: false },
  { id: 106, title: "Mansión con jardines en Toledo", image: "catalog-6", pricePerNight: 410, rating: 4.9, category: "Mansiones", isFavorite: false },
  { id: 107, title: "Loft minimalista en Valencia", image: "catalog-7", pricePerNight: 140, rating: 4.4, category: "Tendencias", isFavorite: true },
  { id: 108, title: "Villa costera en Tenerife", image: "catalog-8", pricePerNight: 260, rating: 4.8, category: "Playa", isFavorite: false },
];

const CatalogPage = () => {
  const [listings, setListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(true);
  const [order, setOrder] = useState<PriceOrder>("asc");
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      setListings(seedCatalogListings);
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const visibleListings = useMemo(() => {
    const normalizedSearch = searchText.toLowerCase().trim();

    return listings
      .filter((listing) => {
        if (!normalizedSearch) return true;

        const matchesTitle = listing.title.toLowerCase().includes(normalizedSearch);
        const matchesCategory = listing.category.toLowerCase().includes(normalizedSearch);
        return matchesTitle || matchesCategory;
      })
      .sort((a, b) => (order === "asc" ? a.pricePerNight - b.pricePerNight : b.pricePerNight - a.pricePerNight));
  }, [listings, order, searchText]);

  const toggleFavorite = (id: number) => {
    setListings((current) => current.map((item) => (item.id === id ? { ...item, isFavorite: !item.isFavorite } : item)));
  };

  return (
    <>
      <NavbarComponent onSearchChange={setSearchText} />
      <main className="mx-auto min-h-screen max-w-7xl px-4 py-6">
        <ResultsHeaderComponent totalResults={visibleListings.length} onOrderChange={setOrder} />
        {loading ? (
          <p className="rounded-2xl border border-gray-200 bg-white p-6 text-center text-gray-700">Cargando alojamientos...</p>
        ) : (
          <section className="grid grid-cols-1 gap-5 md:grid-cols-[minmax(0,1fr)_320px]">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {visibleListings.map((listing) => (
                <ListingCardComponent key={listing.id} listing={listing} onToggleFavorite={toggleFavorite} />
              ))}
              {visibleListings.length === 0 && (
                <p className="sm:col-span-2 rounded-2xl border border-gray-200 bg-white p-6 text-center text-gray-700">
                  No hay alojamientos que coincidan con tu búsqueda.
                </p>
              )}
            </div>
            <MapPlaceholderComponent />
          </section>
        )}
      </main>
    </>
  );
};

export default CatalogPage;