export interface Listing {
  id: number;
  title: string;
  image: string;
  pricePerNight: number;
  rating: number;
  category: "Playa" | "Mansiones" | "Tendencias" | "Campo" | "Piscinas" | "Castillos";
  isFavorite: boolean;
}
