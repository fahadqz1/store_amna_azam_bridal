import HeroCarousel from '@/components/home/HeroCarousel';
import FeaturedSection from '@/components/home/FeaturedSection';
import CollectionsSection from '@/components/home/CollectionsSection';
import FeaturesSection from '@/components/home/FeaturesSection';

export default function Home() {
  return (
    <>
      <HeroCarousel />
      <FeaturesSection />
      <FeaturedSection />
      <CollectionsSection />

      {/* About Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                About AMNA AZAM
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed mb-6">
                AMNA AZAM is a premier destination for luxury Pakistani fashion.
                We specialize in exquisite eastern wear, bridal couture, and
                contemporary pret collections that celebrate the richness of
                Pakistani heritage.
              </p>
              <p className="text-gray-600 text-lg leading-relaxed mb-8">
                Each piece is meticulously crafted with premium fabrics and
                attention to detail, designed for women who appreciate timeless
                elegance and modern sophistication.
              </p>
              <a
                href="/about"
                className="inline-block px-8 py-3 bg-gray-900 text-white font-semibold hover:bg-gray-800 transition-colors"
              >
                Learn More
              </a>
            </div>
            <div className="bg-gray-100 aspect-square rounded-lg flex items-center justify-center">
              <div className="text-center text-gray-400">
                <svg
                  className="w-24 h-24 mx-auto mb-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1}
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                <p>Brand image coming soon</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
