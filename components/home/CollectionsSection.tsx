'use client';

import Link from 'next/link';
import Image from 'next/image';

interface Collection {
  id: string;
  name: string;
  slug: string;
  image: string;
  description: string;
}

const collections: Collection[] = [
  {
    id: '1',
    name: 'Eastern Wear',
    slug: 'eastern-wear',
    image:
      'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=600&h=600&fit=crop',
    description: 'Traditional and contemporary eastern wear for every occasion',
  },
  {
    id: '2',
    name: 'Bridal',
    slug: 'bridal',
    image:
      'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=600&h=600&fit=crop',
    description: 'Exquisite bridal couture for your special day',
  },
  {
    id: '3',
    name: 'Luxury Pret',
    slug: 'pret',
    image:
      'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=600&h=600&fit=crop',
    description: 'Ready-to-wear luxury collections',
  },
  {
    id: '4',
    name: 'Formal Wear',
    slug: 'formal',
    image:
      'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=600&h=600&fit=crop',
    description: 'Elegant formal wear for formal occasions',
  },
];

export default function CollectionsSection() {
  return (
    <section className="py-16 md:py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Shop by Collection
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Explore our exclusive collections tailored for every style and occasion
          </p>
        </div>

        {/* Collections Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {collections.map((collection) => (
            <Link
              key={collection.id}
              href={`/collections/${collection.slug}`}
              className="group overflow-hidden"
            >
              <div className="relative overflow-hidden bg-gray-200 aspect-square mb-4">
                <Image
                  src={collection.image}
                  alt={collection.name}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-300" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-gray-700 transition-colors">
                {collection.name}
              </h3>
              <p className="text-gray-600 text-sm">{collection.description}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
