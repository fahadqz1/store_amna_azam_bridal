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

      {/* 💎 Luxury About Section */}
      <section className="py-20 md:py-32 bg-gradient-to-b from-white via-transparent to-[#faf9f7]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div className="order-2 md:order-1">
              <div className="relative">
                {/* Decorative background */}
                <div className="absolute -inset-4 bg-gradient-to-r from-[#f4a196]/20 to-[#d4af37]/20 rounded-lg blur-xl opacity-60"></div>
                <div className="relative bg-gradient-to-br from-[#fdf8f7] to-[#f9f1ed] p-8 rounded-lg shadow-2xl">
                  <div className="flex items-start mb-6">
                    <div className="text-4xl mr-4">👰</div>
                    <div>
                      <h3 className="text-2xl font-serif text-[#643a5f] mb-2">Bridal Elegance</h3>
                      <p className="text-sm text-[#8f413c]">Handcrafted luxury for your special day</p>
                    </div>
                  </div>
                  <div className="border-t border-[#e38f85]/30 pt-6">
                    <p className="text-[#1a1a1a] leading-relaxed text-lg font-light">
                      Har ladki apne din ke liye kuch special laye... AMNA AZAM exact us feeling ko design mein capture karti hai.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="order-1 md:order-2">
              <div className="mb-6">
                <span className="text-sm uppercase tracking-widest text-[#d4af37] font-semibold">✨ Premium Collection</span>
              </div>
              <h2 className="text-5xl md:text-6xl font-serif font-bold mb-8 leading-tight">
                <span className="text-[#643a5f]">AMNA AZAM</span>
                <span className="block text-3xl md:text-4xl text-[#084038] font-light mt-2">Luxury Bridal Couture</span>
              </h2>
              <p className="text-[#1a1a1a] text-lg leading-relaxed mb-6 font-light">
                AMNA AZAM premium Pakistani fashion ka ek shrine hai. Hum specialize karte hain exquisite bridal wear, eastern couture, aur contemporary pret collections mein jo Pakistani heritage ki richness ko celebrate karte hain.
              </p>
              <p className="text-[#1a1a1a] text-lg leading-relaxed mb-10 font-light">
                Har piece meticulously crafted hai premium fabrics aur intricate details ke saath, women ke liye jo timeless elegance aur modern sophistication ki appreciate karte hain.
              </p>
              <div className="flex gap-4">
                <a
                  href="/shop"
                  className="btn-primary"
                >
                  Shop Bridal Collection
                </a>
                <a
                  href="/about"
                  className="btn-secondary"
                >
                  Discover More
                </a>
              </div>
            </div>
          </div>

          {/* Features Bar */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-24 pt-24 border-t border-[#e5d9e0]">
            <div className="text-center">
              <div className="text-4xl mb-4">💎</div>
              <h4 className="text-xl font-serif text-[#643a5f] mb-2">Luxury Quality</h4>
              <p className="text-[#1a1a1a]/70">Premium fabrics & timeless designs</p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-4">👗</div>
              <h4 className="text-xl font-serif text-[#643a5f] mb-2">Expert Craftsmanship</h4>
              <p className="text-[#1a1a1a]/70">Handcrafted by master artisans</p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-4">🌟</div>
              <h4 className="text-xl font-serif text-[#643a5f] mb-2">Heritage Inspired</h4>
              <p className="text-[#1a1a1a]/70">Celebrating Pakistani traditions</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
