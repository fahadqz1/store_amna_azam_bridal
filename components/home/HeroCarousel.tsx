'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface HeroSlide {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  cta_text: string;
  cta_link: string;
}

const slides: HeroSlide[] = [
  {
    id: '1',
    title: 'Eastern Elegance',
    subtitle: 'Timeless Couture',
    description: 'Discover our exquisite collection of traditional Pakistani Eastern wear.',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1600&h=900&fit=crop',
    cta_text: 'Explore Collection',
    cta_link: '/collections/eastern-wear',
  },
  {
    id: '2',
    title: 'Bridal Couture',
    subtitle: 'Your Special Day',
    description: 'Handcrafted bridal wear featuring exquisite embroidery and premium fabrics.',
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=1600&h=900&fit=crop',
    cta_text: 'View Bridal',
    cta_link: '/collections/bridal',
  },
  {
    id: '3',
    title: 'Luxury Pret',
    subtitle: 'Effortless Sophistication',
    description: 'Premium ready-to-wear combining traditional aesthetics with modern style.',
    image: 'https://images.unsplash.com/photo-1515193377552-7bcd41b2afb8?w=1600&h=900&fit=crop',
    cta_text: 'Shop Now',
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
    }, 6000);
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

  const slide = slides[currentSlide] || slides[0];

  return (
    <div className="relative w-full h-96 sm:h-[500px] md:h-[600px] lg:h-[700px] overflow-hidden bg-[#F8F5F0]">
      {/* Slide Background */}
      <div className="absolute inset-0">
        <Image
          src={slide.image}
          alt={slide.title}
          fill
          className="object-cover"
          priority
          quality={85}
        />
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/20"></div>
      </div>

      {/* Content */}
      <div className="absolute inset-0 flex items-center justify-start">
        <div className="max-w-2xl mx-auto lg:mx-0 lg:ml-16 px-6 sm:px-8 lg:px-0">
          <div className="animate-fade-in space-y-4 md:space-y-6">
            {/* Subtitle */}
            <div>
              <span className="font-sans text-xs sm:text-sm font-normal text-white/80 uppercase tracking-widest">
                {slide.subtitle}
              </span>
            </div>

            {/* Title */}
            <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-normal text-white leading-tight">
              {slide.title}
            </h1>

            {/* Description */}
            <p className="font-serif text-sm sm:text-base md:text-lg text-white/90 max-w-xl leading-relaxed">
              {slide.description}
            </p>

            {/* CTA */}
            <div className="pt-4">
              <Link
                href={slide.cta_link}
                className="inline-block px-10 py-3 md:py-4 bg-[#242424] text-white font-sans text-sm font-semibold uppercase tracking-widest hover:bg-[#603E50] transition-colors duration-300"
              >
                {slide.cta_text}
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        aria-label="Previous slide"
        className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 z-20 p-2 text-white hover:bg-black/40 transition-colors"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      <button
        onClick={nextSlide}
        aria-label="Next slide"
        className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 z-20 p-2 text-white hover:bg-black/40 transition-colors"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Slide Indicators */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
            className={`h-1 transition-all duration-300 ${
              index === currentSlide ? 'w-8 bg-white' : 'w-2 bg-white/50'
            }`}
          />
        ))}
      </div>
    </div>
  );
}
