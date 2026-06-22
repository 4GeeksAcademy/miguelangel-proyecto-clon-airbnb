export interface Room {
  id: string;
  title: string;
  location: string;
  images: string[];
  pricePerNight: number;
  rating: number;
  reviewCount: number;
  hostName: string;
  hostYears: number;
  amenities: string[];
  guests: number;
  bedrooms: number;
  beds: number;
  bathrooms: number;
}