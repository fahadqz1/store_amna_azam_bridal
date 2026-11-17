'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/98 backdrop-blur-sm border-b border-[#E8E3DC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-24">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0">
            <div className="text-xl sm:text-2xl font-serif font-normal tracking-widest text-[#242424]">
              AMNA AZAM
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-12">
            <Link href="/" className="font-sans text-sm font-normal text-[#242424] hover:text-[#B99A62] transition-colors uppercase tracking-wide">
              Home
            </Link>
            <Link href="/shop" className="font-sans text-sm font-normal text-[#242424] hover:text-[#B99A62] transition-colors uppercase tracking-wide">
              New Arrivals
            </Link>
            <Link href="/collections/eastern-wear" className="font-sans text-sm font-normal text-[#242424] hover:text-[#B99A62] transition-colors uppercase tracking-wide">
              Eastern Wear
            </Link>
            <Link href="/collections/bridal" className="font-sans text-sm font-normal text-[#242424] hover:text-[#B99A62] transition-colors uppercase tracking-wide">
              Bridal
            </Link>
            <Link href="/collections/pret" className="font-sans text-sm font-normal text-[#242424] hover:text-[#B99A62] transition-colors uppercase tracking-wide">
              Luxury Pret
            </Link>
          </nav>

          {/* Right Actions */}
          <div className="flex items-center space-x-6 lg:space-x-8">
            {/* Search */}
            <button aria-label="Search" className="text-[#242424] hover:text-[#B99A62] transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>

            {/* Account */}
            <Link href="/auth/login" aria-label="Account" className="text-[#242424] hover:text-[#B99A62] transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </Link>

            {/* Wishlist */}
            <button aria-label="Wishlist" className="text-[#242424] hover:text-[#B99A62] transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </button>

            {/* Cart */}
            <Link href="/cart" aria-label="Shopping Bag" className="relative text-[#242424] hover:text-[#B99A62] transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              <span className="absolute -top-2 -right-2 bg-[#B99A62] text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-sans">0</span>
            </Link>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden text-[#242424] hover:text-[#B99A62]"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden border-t border-[#E8E3DC] py-4">
            <nav className="flex flex-col space-y-4">
              <Link href="/" className="font-sans text-sm font-normal text-[#242424] hover:text-[#B99A62] uppercase tracking-wide">
                Home
              </Link>
              <Link href="/shop" className="font-sans text-sm font-normal text-[#242424] hover:text-[#B99A62] uppercase tracking-wide">
                New Arrivals
              </Link>
              <Link href="/collections/eastern-wear" className="font-sans text-sm font-normal text-[#242424] hover:text-[#B99A62] uppercase tracking-wide">
                Eastern Wear
              </Link>
              <Link href="/collections/bridal" className="font-sans text-sm font-normal text-[#242424] hover:text-[#B99A62] uppercase tracking-wide">
                Bridal
              </Link>
              <Link href="/collections/pret" className="font-sans text-sm font-normal text-[#242424] hover:text-[#B99A62] uppercase tracking-wide">
                Luxury Pret
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
