type AmenitiesGridProps = {
  amenities: string[];
};

const amenityIcons: Record<string, string> = {
  WiFi: "📶",
  Cocina: "🍳",
  "Aire acondicionado": "❄",
  Lavadora: "🧺",
  Aparcamiento: "🚗",
  Piscina: "🏊",
};

const AmenitiesGrid = ({ amenities }: AmenitiesGridProps) => {
  return (
    <section className="rounded-2xl border border-gray-200 bg-white p-4">
      <h2 className="mb-3 text-lg font-semibold text-gray-900">Servicios</h2>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        {amenities.map((amenity) => (
          <div key={amenity} className="flex items-center gap-2 rounded-xl border border-gray-100 p-3 text-sm text-gray-700">
            <span aria-hidden="true">{amenityIcons[amenity] ?? "•"}</span>
            <span>{amenity}</span>
          </div>
        ))}
      </div>
    </section>
  );
};

export const AmenitiesGridComponent = AmenitiesGrid;