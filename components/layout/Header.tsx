'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0">
            <div className="text-2xl font-bold tracking-widest text-gray-900">
              AMNA AZAM
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link
              href="/shop"
              className="text-gray-700 hover:text-gray-900 transition-colors text-sm font-medium"
            >
              SHOP
            </Link>
            <Link
              href="/collections/eastern-wear"
              className="text-gray-700 hover:text-gray-900 transition-colors text-sm font-medium"
            >
              EASTERN WEAR
            </Link>
            <Link
              href="/collections/bridal"
              className="text-gray-700 hover:text-gray-900 transition-colors text-sm font-medium"
            >
              BRIDAL
            </Link>
            <Link
              href="/collections/pret"
              className="text-gray-700 hover:text-gray-900 transition-colors text-sm font-medium"
            >
              PRET
            </Link>
            <Link
              href="/about"
              className="text-gray-700 hover:text-gray-900 transition-colors text-sm font-medium"
            >
              ABOUT
            </Link>
          </nav>

          {/* Right Actions */}
          <div className="flex items-center space-x-6">
            {/* Search */}
            <button
              aria-label="Search"
              className="text-gray-700 hover:text-gray-900 transition-colors"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </button>

            {/* Account */}
            <Link
              href="/auth/login"
              aria-label="Account"
              className="text-gray-700 hover:text-gray-900 transition-colors"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
            </Link>

            {/* Cart */}
            <Link
              href="/cart"
              aria-label="Shopping cart"
              className="relative text-gray-700 hover:text-gray-900 transition-colors"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                />
              </svg>
              <span className="absolute -top-2 -right-2 bg-gray-900 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                0
              </span>
            </Link>

            {/* Mobile Menu Toggle */}
            <button
              className="md:hidden text-gray-700 hover:text-gray-900 transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden pb-4 space-y-2">
            <Link
              href="/shop"
              className="block text-gray-700 hover:text-gray-900 transition-colors text-sm font-medium py-2"
            >
              SHOP
            </Link>
            <Link
              href="/collections/eastern-wear"
              className="block text-gray-700 hover:text-gray-900 transition-colors text-sm font-medium py-2"
            >
              EASTERN WEAR
            </Link>
            <Link
              href="/collections/bridal"
              className="block text-gray-700 hover:text-gray-900 transition-colors text-sm font-medium py-2"
            >
              BRIDAL
            </Link>
            <Link
              href="/collections/pret"
              className="block text-gray-700 hover:text-gray-900 transition-colors text-sm font-medium py-2"
            >
              PRET
            </Link>
            <Link
              href="/about"
              className="block text-gray-700 hover:text-gray-900 transition-colors text-sm font-medium py-2"
            >
              ABOUT
            </Link>
          </nav>
        )}
      </div>
    </header>
  );
}
