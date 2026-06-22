"use client";

import { useState } from "react";

type PhotoGalleryProps = {
  images: string[];
};

const PhotoGallery = ({ images }: PhotoGalleryProps) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const total = images.length;

  const showPrevious = () => {
    setActiveIndex((current) => (current === 0 ? total - 1 : current - 1));
  };

  const showNext = () => {
    setActiveIndex((current) => (current === total - 1 ? 0 : current + 1));
  };

  return (
    <section className="space-y-3 rounded-2xl border border-gray-200 bg-white p-4">
      <div className="flex h-56 items-center justify-center rounded-xl bg-gray-200 text-lg font-semibold text-gray-700 sm:h-72">
        {images[activeIndex]}
      </div>
      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={showPrevious}
          className="rounded-full border border-gray-300 px-4 py-2 text-sm font-medium text-gray-800"
        >
          Anterior
        </button>
        <p className="text-sm text-gray-700">
          {activeIndex + 1} / {total}
        </p>
        <button
          type="button"
          onClick={showNext}
          className="rounded-full border border-gray-300 px-4 py-2 text-sm font-medium text-gray-800"
        >
          Siguiente
        </button>
      </div>
    </section>
  );
};

export const PhotoGalleryComponent = PhotoGallery;