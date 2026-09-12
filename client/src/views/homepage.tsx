const navLinks = [
  { href: "#services", label: "Services" },
  { href: "#gallery", label: "Gallery" },
  { href: "#about", label: "About" },
  { href: "#contact", label: "Contact" },
] as const;

const services = [
  {
    title: "SNS Manicure",
    price: "$58",
    desc: "Shape, cuticle care, light massage, and SNS nail technique.",
  },
  {
    title: "Acrylic Manicure",
    price: "$58+",
    desc: "Shape, cuticle care, light massage, and acrylic application.",
  },
  {
    title: "Gel Manicure",
    price: "$42",
    desc: "Shape, cuticle care, light massage, and gel polish.",
  },
  {
    title: "Signature Pedicure",
    price: "$50",
    desc: "Exfoliating scrub, hydrating mask, extended massage, and meticulous polish.",
  },
  {
    title: "Thai Massage",
    price: "$55/90/125",
    desc: "Active, ancient bodywork therapy that combines acupressure, Indian Ayurvedic principles, and passive, assisted yoga postures",
  },
  {
    title: "Facial",
    price: "$60/95/130",
    desc: "A multi-step skin treatment designed to cleanse, exfoliate, and nourish the face while promoting deep relaxation.",
  },
] as const;

const galleryItems = [
  "Soft nude gel set",
  "Chrome French tips",
  "Floral nail art",
  "Gel pedicure",
  "Minimalist lines",
  "Bridal set",
] as const;

export default function Home() {
  return (
    <div className="min-h-screen bg-rose-50/30 text-stone-800">
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-rose-100">
        <div className="max-w-7xl mx-auto px-6 py-4 md:h-20 md:py-0 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex items-center justify-between gap-4">
            <span className="text-2xl font-serif tracking-wide text-rose-900">
              Solar Nails
            </span>
            <a
              href="#book"
              className="md:hidden bg-rose-600 hover:bg-rose-700 text-white px-4 py-2 rounded-full text-sm font-medium transition shadow-sm"
            >
              Book
            </a>
          </div>
          <nav className="flex flex-wrap gap-4 md:gap-8 text-sm font-medium text-stone-600">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="hover:text-rose-600 transition"
              >
                {link.label}
              </a>
            ))}
          </nav>
          <a
            href="#book"
            className="hidden md:inline-flex bg-rose-600 hover:bg-rose-700 text-white px-5 py-2.5 rounded-full text-sm font-medium transition shadow-sm"
          >
            Book Appointment
          </a>
        </div>
      </header>

      <section className="max-w-7xl mx-auto px-6 py-20 md:py-32 grid md:grid-cols-2 gap-12 items-center">
        <div className="space-y-6">
          <span className="text-rose-600 font-semibold tracking-wider uppercase text-xs bg-rose-100/60 px-3 py-1 rounded-full">
            Family-Owned Nail Salon
          </span>
          <h1 className="text-4xl md:text-6xl font-serif leading-tight text-stone-900">
            Elevate Your Everyday Elegance
          </h1>
          <p className="text-stone-600 text-lg font-light leading-relaxed">
            Experience luxury nail care in a serene, modern environment. From
            meticulous gel manicures to custom nail art, we bring your
            vision to life.
          </p>
          <div className="flex flex-wrap gap-4 pt-4">
            <a
              href="#book"
              className="bg-rose-600 hover:bg-rose-700 text-white px-8 py-3.5 rounded-full font-medium transition"
            >
              Book Appointment
            </a>
            <a
              href="#services"
              className="border border-stone-300 hover:border-stone-400 px-8 py-3.5 rounded-full font-medium transition"
            >
              View Services
            </a>
          </div>
        </div>
        <div className="relative h-[450px] rounded-3xl overflow-hidden shadow-2xl bg-rose-100">
          <div className="absolute inset-0 flex items-center justify-center text-rose-400 font-serif italic">
            {/* Replace with <Image src="/hero.jpg" fill alt="Salon interior" className="object-cover" /> */}
            [Hero Image Placeholder]
          </div>
        </div>
      </section>

      <section id="services" className="scroll-mt-24 bg-white py-24 border-y border-rose-100/60">
        <div className="max-w-7xl mx-auto px-6 space-y-16">
          <div className="text-center max-w-2xl mx-auto space-y-4">
            <h2 className="text-3xl md:text-4xl font-serif text-stone-900">
              Signature Treatments
            </h2>
            <p className="text-stone-600 font-light">
              Curated services designed for health, beauty, and relaxation.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {services.map((service) => (
              <div
                key={service.title}
                className="p-8 rounded-2xl bg-rose-50/40 border border-rose-100/40 flex flex-col justify-between space-y-4"
              >
                <div className="space-y-2">
                  <div className="flex justify-between items-baseline gap-4">
                    <h3 className="font-serif text-xl text-stone-800">
                      {service.title}
                    </h3>
                    <span className="text-rose-600 font-medium">
                      {service.price}
                    </span>
                  </div>
                  <p className="text-stone-600 text-sm font-light">
                    {service.desc}
                  </p>
                </div>
                <a
                  href="#book"
                  className="text-rose-600 text-sm font-semibold hover:underline pt-2 inline-block"
                >
                  Book Service →
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="gallery" className="scroll-mt-24 py-24">
        <div className="max-w-7xl mx-auto px-6 space-y-16">
          <div className="text-center max-w-2xl mx-auto space-y-4">
            <h2 className="text-3xl md:text-4xl font-serif text-stone-900">
              Gallery
            </h2>
            <p className="text-stone-600 font-light">
              A glimpse of recent sets from the studio.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
            {galleryItems.map((item) => (
              <div
                key={item}
                className="h-56 rounded-2xl bg-rose-100 border border-rose-100/60 flex items-center justify-center text-rose-400 font-serif italic text-center px-4"
              >
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="about" className="scroll-mt-24 bg-white py-24 border-y border-rose-100/60">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-4">
            <h2 className="text-3xl md:text-4xl font-serif text-stone-900">
              About the Salon
            </h2>
            <p className="text-stone-600 font-light leading-relaxed">
              Solar Nails is a family-owned nail studio focused on healthy nails
              and considered design. Appointments are paced so each set receives
              full attention—from prep and cuticle work through a lasting
              finish.
            </p>
            <p className="text-stone-600 font-light leading-relaxed">
              We use premium gels, powders, and gentle products in a calm, modern space
              designed for a quiet hour of care.
            </p>
          </div>
          <div className="h-80 rounded-3xl bg-rose-100 flex items-center justify-center text-rose-400 font-serif italic">
            [Salon Portrait Placeholder]
          </div>
        </div>
      </section>

      <section id="contact" className="scroll-mt-24 py-24">
        <div className="max-w-7xl mx-auto px-6 space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-4">
            <h2 className="text-3xl md:text-4xl font-serif text-stone-900">
              Visit Us
            </h2>
            <p className="text-stone-600 font-light">
              Walk-ins are limited. Booking ahead is the best way to reserve
              your preferred time.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div className="p-8 rounded-2xl bg-white border border-rose-100/60 space-y-2">
              <h3 className="font-serif text-xl text-stone-800">Address</h3>
              <p className="text-stone-600 font-light text-sm">
                12811 Hwy 53
                <br />
                Marble Hill, GA 30148
              </p>
            </div>
            <div className="p-8 rounded-2xl bg-white border border-rose-100/60 space-y-2">
              <h3 className="font-serif text-xl text-stone-800">Hours</h3>
              <p className="text-stone-600 font-light text-sm">
                Mon–Fri 10am–6pm
                <br />
                Sat 10am–5pm
                <br />
                Sun Closed
              </p>
            </div>
            <div className="p-8 rounded-2xl bg-white border border-rose-100/60 space-y-2">
              <h3 className="font-serif text-xl text-stone-800">Phone</h3>
              <p className="text-stone-600 font-light text-sm">
                (770) 893-6041
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="book" className="scroll-mt-24 bg-rose-900 text-rose-50 py-24">
        <div className="max-w-3xl mx-auto px-6 text-center space-y-6">
          <h2 className="text-3xl md:text-4xl font-serif">
            Request an Appointment
          </h2>
          <p className="font-light text-rose-100 leading-relaxed">
            Online booking is coming soon. Call the studio with your
            preferred service, date, and time—we will confirm as soon as a seat
            is available.
          </p>
          <div className="flex flex-wrap justify-center gap-4 pt-2">
            <a
              href="tel:+17708936041"
              className="bg-white text-rose-900 hover:bg-rose-50 px-8 py-3.5 rounded-full font-medium transition"
            >
              Call (770) 893-6041
            </a>
          </div>
        </div>
      </section>

      <footer className="bg-white border-t border-rose-100 py-10">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <span className="font-serif text-rose-900 tracking-wide">
            Solar Nails
          </span>
          <nav className="flex flex-wrap justify-center gap-6 text-sm text-stone-600">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="hover:text-rose-600 transition"
              >
                {link.label}
              </a>
            ))}
            <a href="#book" className="hover:text-rose-600 transition">
              Book
            </a>
          </nav>
        </div>
      </footer>
    </div>
  );
}
