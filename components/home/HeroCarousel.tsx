'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface HeroSlide {
  id: string;
  title: string;
  subtitle: string | null;
  image: string;
  cta_text: string | null;
  cta_link: string | null;
}

const slides: HeroSlide[] = [
  {
    id: '1',
    title: 'Timeless Design',
    subtitle: 'Modern Essence',
    image:
      'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=1200&h=600&fit=crop',
    cta_text: 'Shop Eastern Wear',
    cta_link: '/collections/eastern-wear',
  },
  {
    id: '2',
    title: 'Bridal Elegance',
    subtitle: 'Your Special Day',
    image:
      'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=1200&h=600&fit=crop',
    cta_text: 'View Bridal',
    cta_link: '/collections/bridal',
  },
  {
    id: '3',
    title: 'Luxury Pret',
    subtitle: 'Ready to Wear Perfection',
    image:
      'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=1200&h=600&fit=crop',
    cta_text: 'Explore Collection',
    cta_link: '/collections/pret',
  },
];

export default function HeroCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);

  useEffect(() => {
    if (!autoPlay) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [autoPlay]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    setAutoPlay(false);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
    setAutoPlay(false);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    setAutoPlay(false);
  };

  return (
    <div className="relative h-screen md:h-[600px] overflow-hidden bg-gray-100">
      {/* Slides */}
      {slides.map((s, index) => (
        <div
          key={s.id}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === currentSlide ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <div className="relative w-full h-full">
            <Image
              src={s.image}
              alt={s.title}
              fill
              className="object-cover"
              priority={index === 0}
            />
            <div className="absolute inset-0 bg-black/30" />
          </div>

          {/* Content */}
          <div className="absolute inset-0 flex flex-col justify-center items-start px-4 md:px-12 lg:px-20 max-w-2xl">
            <div className="animate-fade-in">
              {s.subtitle && (
                <p className="text-sm md:text-base font-light text-white/80 mb-2">
                  {s.subtitle}
                </p>
              )}
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
                {s.title}
              </h1>
              {s.cta_text && s.cta_link && (
                <Link
                  href={s.cta_link}
                  className="inline-block px-8 md:px-10 py-3 md:py-4 bg-white text-gray-900 font-semibold hover:bg-gray-100 transition-all duration-300 hover:shadow-lg"
                >
                  {s.cta_text}
                </Link>
              )}
            </div>
          </div>
        </div>
      ))}

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        aria-label="Previous slide"
        className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-20 p-2 md:p-3 bg-white/80 hover:bg-white text-gray-900 transition-all duration-300"
      >
        <svg
          className="w-5 h-5 md:w-6 md:h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </button>

      <button
        onClick={nextSlide}
        aria-label="Next slide"
        className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-20 p-2 md:p-3 bg-white/80 hover:bg-white text-gray-900 transition-all duration-300"
      >
        <svg
          className="w-5 h-5 md:w-6 md:h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
      </button>

      {/* Dots */}
      <div className="absolute bottom-6 md:bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
            className={`h-2 transition-all duration-300 ${
              index === currentSlide
                ? 'w-8 bg-white'
                : 'w-2 bg-white/50 hover:bg-white/75'
            }`}
          />
        ))}
      </div>
    </div>
  );
}
