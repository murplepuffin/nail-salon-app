import Link from 'next/link';
import Image from 'next/Image';

export default function Home() {
  return (
    <div className="min-h-screen bg-rose-50/30 text-stone-800">
      {/* Navigation */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-rose-100">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <span className="text-2xl font-serif tracking-wide text-rose-900">Lush & Polish</span>
          <nav className="hidden md:flex gap-8 text-sm font-medium text-stone-600">
            <Link href="#services" className="hover:text-rose-600 transition">Services</Link>
            <Link href="#gallery" className="hover:text-rose-600 transition">Gallery</Link>
            <Link href="#about" className="hover:text-rose-600 transition">About</Link>
            <Link href="#contact" className="hover:text-rose-600 transition">Contact</Link>
          </nav>
          <Link 
            href="#book" 
            className="bg-rose-600 hover:bg-rose-700 text-white px-5 py-2.5 rounded-full text-sm font-medium transition shadow-sm"
          >
            Book Appointment
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 py-20 md:py-32 grid md:grid-cols-2 gap-12 items-center">
        <div className="space-y-6">
          <span className="text-rose-600 font-semibold tracking-wider uppercase text-xs bg-rose-100/60 px-3 py-1 rounded-full">
            Boutique Nail Studio
          </span>
          <h1 className="text-4xl md:text-6xl font-serif leading-tight text-stone-900">
            Elevate Your Everyday Elegance
          </h1>
          <p className="text-stone-600 text-lg font-light leading-relaxed">
            Experience luxury nail care in a serene, modern environment. From meticulous Japanese gel manicures to custom nail art, we bring your vision to life.
          </p>
          <div className="flex gap-4 pt-4">
            <Link 
              href="#book" 
              className="bg-rose-600 hover:bg-rose-700 text-white px-8 py-3.5 rounded-full font-medium transition"
            >
              Reserve a Table
            </Link>
            <Link 
              href="#services" 
              className="border border-stone-300 hover:border-stone-400 px-8 py-3.5 rounded-full font-medium transition"
            >
              View Menu
            </Link>
          </div>
        </div>
        <div className="relative h-[450px] rounded-3xl overflow-hidden shadow-2xl bg-rose-100">
          <div className="absolute inset-0 flex items-center justify-center text-rose-400 font-serif italic">
            <Image src="/hero.jpg" fill alt="Salon interior" className="object-cover" />
          </div>
        </div>
      </section>

      {/* Services Preview */}
      <section id="services" className="bg-white py-24 border-y border-rose-100/60">
        <div className="max-w-7xl mx-auto px-6 space-y-16">
          <div className="text-center max-w-2xl mx-auto space-y-4">
            <h2 className="text-3xl md:text-4xl font-serif text-stone-900">Signature Treatments</h2>
            <p className="text-stone-600 font-light">Curated services designed for health, beauty, and relaxation.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: "Classic Manicure", price: "$40", desc: "Shape, cuticle care, light massage, and regular polish." },
              { title: "Japanese Gel Set", price: "$75", desc: "Long-lasting, premium non-toxic gel overlay and custom art base." },
              { title: "Lush Pedicure", price: "$65", desc: "Exfoliating scrub, hydrating mask, massage, and meticulous polish." },
            ].map((service, idx) => (
              <div key={idx} className="p-8 rounded-2xl bg-rose-50/40 border border-rose-100/40 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between items-baseline">
                    <h3 className="font-serif text-xl text-stone-800">{service.title}</h3>
                    <span className="text-rose-600 font-medium">{service.price}</span>
                  </div>
                  <p className="text-stone-600 text-sm font-light">{service.desc}</p>
                </div>
                <Link href="#book" className="text-rose-600 text-sm font-semibold hover:underline pt-2 inline-block">
                  Book Service →
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
