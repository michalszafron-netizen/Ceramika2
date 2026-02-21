import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Instagram,
  Mail,
  MapPin,
  Menu,
  X,
  ArrowRight,
  ArrowUpRight,
  Lock,
  Plus,
  Trash2,
  LogOut,
  ChevronRight,
  Star,
} from 'lucide-react';
import { BrowserRouter as Router, Routes, Route, Link, useParams, useNavigate } from 'react-router-dom';

// --- Types ---
interface Product {
  id: number;
  name: string;
  description: string;
  price: string;
  image_url: string;
  category: string;
}

interface Testimonial {
  id: number;
  author: string;
  content: string;
}

// --- Navbar ---
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${scrolled ? 'bg-[#1a1208]/95 backdrop-blur-md py-3 shadow-lg shadow-black/30' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <Link to="/" className="text-2xl font-serif tracking-[0.15em] uppercase text-white">
          CERAMIKA
          <span className="text-[#ec6d13] text-xs font-sans font-light tracking-normal ml-2 normal-case">Artystyczna</span>
        </Link>

        <div className="hidden md:flex items-center gap-10">
          <a href="/#about" className="text-white/70 hover:text-[#ec6d13] transition-colors text-sm tracking-widest uppercase">O nas</a>
          <a href="/#gallery" className="text-white/70 hover:text-[#ec6d13] transition-colors text-sm tracking-widest uppercase">Produkty</a>
          <a href="/#contact" className="text-white/70 hover:text-[#ec6d13] transition-colors text-sm tracking-widest uppercase">Kontakt</a>
          <Link to="/admin" className="text-white/40 hover:text-white/70 transition-colors p-2">
            <Lock size={16} />
          </Link>
        </div>

        <button
          className="md:hidden text-white"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-full left-0 w-full bg-[#1a1208]/98 border-t border-white/10 p-6 flex flex-col space-y-5 md:hidden"
          >
            <a href="/#about" onClick={() => setIsOpen(false)} className="text-white/80 text-lg font-serif">O nas</a>
            <a href="/#gallery" onClick={() => setIsOpen(false)} className="text-white/80 text-lg font-serif">Produkty</a>
            <a href="/#contact" onClick={() => setIsOpen(false)} className="text-white/80 text-lg font-serif">Kontakt</a>
            <Link to="/admin" onClick={() => setIsOpen(false)} className="text-white/50 text-lg font-serif flex items-center gap-2">
              <Lock size={16} /> Panel Admina
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

// --- Hero Section ---
const Hero = () => {
  return (
    <section className="relative min-h-screen w-full overflow-hidden flex items-center">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <img
          src="/img/hero.jpeg"
          alt="Ceramics"
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0d0a05]/95 via-[#0d0a05]/70 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0d0a05] via-transparent to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-32 grid grid-cols-1 lg:grid-cols-2 items-center gap-16">
        <div>
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex items-center gap-3 mb-8"
          >
            <div className="w-8 h-px bg-[#ec6d13]" />
            <span className="text-[#ec6d13] text-xs tracking-[0.3em] uppercase font-sans">Studio Ceramiki Artystycznej</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="text-5xl md:text-7xl lg:text-8xl font-serif text-white leading-[1.05] mb-8"
          >
            Ręcznie<br />
            <em className="text-[#ec6d13] not-italic">dotykane</em><br />
            przez ziemię
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="text-white/60 text-lg leading-relaxed mb-12 max-w-md font-sans"
          >
            Każda krzywizna, tekstura i szkliwo opowiada historię. Odkryj piękno w niedoskonałości rzemiosła.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.1 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <a
              href="#gallery"
              className="group inline-flex items-center gap-3 bg-[#ec6d13] hover:bg-[#d45e0a] text-white px-8 py-4 transition-all duration-300 font-sans text-sm tracking-widest uppercase"
            >
              Odkryj Kolekcję
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </a>
            <a
              href="#about"
              className="inline-flex items-center gap-3 border border-white/20 hover:border-[#ec6d13] text-white/70 hover:text-white px-8 py-4 transition-all duration-300 font-sans text-sm tracking-widest uppercase"
            >
              O pracowni
            </a>
          </motion.div>
        </div>

        {/* Stats Card */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, delay: 0.6 }}
          className="hidden lg:flex flex-col gap-6"
        >
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 p-8">
            <div className="text-6xl font-serif text-white mb-2">100%</div>
            <div className="text-[#ec6d13] text-xs tracking-widest uppercase font-sans mb-1">Gwarancja Precyzji</div>
            <div className="text-white/50 text-sm font-sans">Rzemiosło, któremu możesz w pełni zaufać.</div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-[#ec6d13]/10 border border-[#ec6d13]/20 p-6">
              <div className="text-3xl font-serif text-white mb-1">15 dni</div>
              <div className="text-white/50 text-xs tracking-widest uppercase font-sans">na satysfakcję klienta</div>
            </div>
            <div className="bg-white/5 border border-white/10 p-6">
              <div className="text-3xl font-serif text-white mb-1">500+</div>
              <div className="text-white/50 text-xs tracking-widest uppercase font-sans">zadowolonych klientów</div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <div className="w-px h-16 bg-gradient-to-b from-transparent to-white/30 animate-pulse" />
      </div>
    </section>
  );
};

// --- Category Tabs (About / Gallery page) ---
const CategoryPill = ({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) => (
  <button
    onClick={onClick}
    className={`px-6 py-2 text-xs tracking-widest uppercase font-sans transition-all ${active
        ? 'bg-[#ec6d13] text-white'
        : 'border border-white/20 text-white/50 hover:border-[#ec6d13] hover:text-white'
      }`}
  >
    {label}
  </button>
);

// --- Gallery Section ---
const Gallery = ({ products }: { products: Product[] }) => {
  const [activeCategory, setActiveCategory] = useState('Wszystkie');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const categories = ['Wszystkie', ...new Set(products.map(p => p.category))];
  const filtered = activeCategory === 'Wszystkie' ? products : products.filter(p => p.category === activeCategory);

  return (
    <section id="gallery" className="py-32 bg-[#0d0a05]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-16">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="flex items-center gap-3 mb-6"
          >
            <div className="w-8 h-px bg-[#ec6d13]" />
            <span className="text-[#ec6d13] text-xs tracking-[0.3em] uppercase font-sans">Kolekcja</span>
          </motion.div>
          <div className="flex flex-col md:flex-row justify-between items-end gap-8">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-5xl md:text-6xl font-serif text-white"
            >
              Wzbogać swoją<br /><em className="text-[#ec6d13] not-italic">przestrzeń</em>
            </motion.h2>
            <div className="flex gap-3 flex-wrap">
              {categories.map(cat => (
                <CategoryPill
                  key={cat}
                  label={cat}
                  active={activeCategory === cat}
                  onClick={() => setActiveCategory(cat)}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-1">
          {filtered.map((product, idx) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.08 }}
              className="group relative cursor-pointer overflow-hidden"
              onClick={() => setSelectedImage(product.image_url)}
            >
              <div className="aspect-[4/5] overflow-hidden">
                <img
                  src={product.image_url}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 brightness-75 group-hover:brightness-90"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-100" />
              <div className="absolute inset-0 bg-[#ec6d13]/0 group-hover:bg-[#ec6d13]/10 transition-all duration-500" />
              <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                <p className="text-[#ec6d13] text-xs tracking-widest uppercase font-sans mb-1">{product.category}</p>
                <h3 className="text-white text-xl font-serif">{product.name}</h3>
                {product.price && <p className="text-white/60 text-sm font-sans mt-1">{product.price}</p>}
                <Link
                  to={`/product/${product.id}`}
                  onClick={e => e.stopPropagation()}
                  className="mt-3 inline-flex items-center gap-2 text-[#ec6d13] text-xs tracking-widest uppercase font-sans hover:gap-3 transition-all"
                >
                  Szczegóły <ArrowUpRight size={14} />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-6"
            onClick={() => setSelectedImage(null)}
          >
            <button className="absolute top-8 right-8 text-white/60 hover:text-white transition-colors hover:rotate-90 duration-200">
              <X size={32} />
            </button>
            <motion.img
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              src={selectedImage}
              className="max-w-full max-h-full object-contain"
              referrerPolicy="no-referrer"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

// --- About Section ---
const About = () => {
  const categories = [
    { name: 'Kamionka', desc: 'Twarda, trwała ceramika wypalana w wysokich temperaturach.' },
    { name: 'Porcelana', desc: 'Delikatna i elegancka, olśniewająca przezroczystością.' },
    { name: 'Fajans', desc: 'Kolorowa i radosna, pełna ekspresji artystycznej.' },
  ];

  return (
    <section id="about" className="py-32 bg-[#110e06] scroll-mt-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-start mb-24">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-px bg-[#ec6d13]" />
              <span className="text-[#ec6d13] text-xs tracking-[0.3em] uppercase font-sans">O nas</span>
            </div>
            <h2 className="text-5xl md:text-6xl font-serif text-white leading-[1.1] mb-8">
              Chłodne gliniane<br />
              <em className="text-[#ec6d13] not-italic">kreacje</em>, które<br />
              tworzą dom
            </h2>
            <p className="text-white/60 leading-relaxed mb-6 font-sans text-lg">
              Skrupulatnie wykonane przez wykwalifikowane ręce rzemieślników. Każda krzywa opowiada historię rzemiosła i pasji przekazywanej przez pokolenia.
            </p>
            <p className="text-white/40 leading-relaxed font-sans">
              Nasze studio to miejsce, gdzie tradycyjne techniki garncarskie spotykają się ze współczesnym designem. Każdy przedmiot jest unikalny – nosimy w sobie ślady dłoni, które go tworzyły.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="aspect-[4/5] overflow-hidden"
          >
            <img
              src="/img/about.jpeg"
              alt="O nas"
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </motion.div>
        </div>

        {/* Categories */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-white/10">
          {categories.map((cat, idx) => (
            <motion.div
              key={cat.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.15 }}
              className="bg-[#110e06] p-10 hover:bg-[#ec6d13]/5 transition-colors group"
            >
              <div className="text-[#ec6d13] text-xs tracking-widest uppercase font-sans mb-4">0{idx + 1}</div>
              <h3 className="text-3xl font-serif text-white mb-4 group-hover:text-[#ec6d13] transition-colors">{cat.name}</h3>
              <p className="text-white/40 font-sans text-sm leading-relaxed">{cat.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// --- Testimonials ---
const Testimonials = ({ testimonials }: { testimonials: Testimonial[] }) => {
  return (
    <section className="py-32 bg-[#0d0a05] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center gap-3 mb-16">
          <div className="w-8 h-px bg-[#ec6d13]" />
          <span className="text-[#ec6d13] text-xs tracking-[0.3em] uppercase font-sans">Głosy klientów</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-1">
          {testimonials.map((t, idx) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.15 }}
              className="bg-[#1a1208] border-t-2 border-[#ec6d13]/0 hover:border-[#ec6d13] p-10 transition-all duration-300"
            >
              <Star className="text-[#ec6d13] mb-6" size={20} fill="currentColor" />
              <p className="text-white/80 text-xl font-serif leading-relaxed mb-8">
                "{t.content}"
              </p>
              <cite className="text-[#ec6d13] text-xs tracking-[0.25em] uppercase font-sans not-italic">
                — {t.author}
              </cite>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// --- Contact Section ---
const Contact = () => {
  const [status, setStatus] = useState<'idle' | 'sending' | 'success'>('idle');
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      if (res.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', message: '' });
      } else {
        setStatus('idle');
        alert('Błąd serwera. Spróbuj ponownie.');
      }
    } catch {
      setStatus('idle');
      alert('Błąd sieci.');
    }
  };

  return (
    <section id="contact" className="py-32 bg-[#110e06] scroll-mt-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-px bg-[#ec6d13]" />
              <span className="text-[#ec6d13] text-xs tracking-[0.3em] uppercase font-sans">Kontakt</span>
            </div>
            <h2 className="text-5xl md:text-6xl font-serif text-white leading-[1.1] mb-12">
              Zamów<br /><em className="text-[#ec6d13] not-italic">wyjątkowe</em><br />naczynie
            </h2>

            <div className="space-y-8">
              <div className="flex items-start gap-5">
                <div className="w-12 h-12 border border-[#ec6d13]/30 flex items-center justify-center text-[#ec6d13] shrink-0">
                  <Mail size={18} />
                </div>
                <div>
                  <p className="text-white/40 text-xs tracking-widest uppercase font-sans mb-1">Email</p>
                  <p className="text-white font-sans">pracownia@terraform.pl</p>
                </div>
              </div>
              <div className="flex items-start gap-5">
                <div className="w-12 h-12 border border-[#ec6d13]/30 flex items-center justify-center text-[#ec6d13] shrink-0">
                  <MapPin size={18} />
                </div>
                <div>
                  <p className="text-white/40 text-xs tracking-widest uppercase font-sans mb-1">Studio</p>
                  <p className="text-white font-sans">Kraków, ul. Ceramiczna 5</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-[#1a1208] p-10 border border-white/10">
            {status === 'success' ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-16"
              >
                <div className="w-16 h-16 border-2 border-[#ec6d13] flex items-center justify-center mx-auto mb-6">
                  <ChevronRight size={32} className="text-[#ec6d13] rotate-[-90deg]" />
                </div>
                <h3 className="text-2xl font-serif text-white mb-2">Wiadomość wysłana!</h3>
                <p className="text-white/50 font-sans mb-8">Odpowiemy najszybciej jak to możliwe.</p>
                <button onClick={() => setStatus('idle')} className="text-[#ec6d13] text-xs tracking-widest uppercase font-sans hover:underline">
                  Wyślij kolejną →
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-white/40 text-xs tracking-widest uppercase font-sans mb-2">Imię i nazwisko</label>
                  <input
                    required type="text"
                    className="w-full bg-transparent border-b border-white/20 focus:border-[#ec6d13] py-3 text-white font-sans outline-none transition-colors"
                    value={formData.name}
                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-white/40 text-xs tracking-widest uppercase font-sans mb-2">Email</label>
                  <input
                    required type="email"
                    className="w-full bg-transparent border-b border-white/20 focus:border-[#ec6d13] py-3 text-white font-sans outline-none transition-colors"
                    value={formData.email}
                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-white/40 text-xs tracking-widest uppercase font-sans mb-2">Wiadomość</label>
                  <textarea
                    required rows={4}
                    className="w-full bg-transparent border-b border-white/20 focus:border-[#ec6d13] py-3 text-white font-sans outline-none transition-colors resize-none"
                    value={formData.message}
                    onChange={e => setFormData({ ...formData, message: e.target.value })}
                  />
                </div>
                <button
                  disabled={status === 'sending'}
                  type="submit"
                  className="w-full bg-[#ec6d13] hover:bg-[#d45e0a] text-white py-4 font-sans text-sm tracking-widest uppercase transition-colors disabled:opacity-50 flex items-center justify-center gap-3 group"
                >
                  {status === 'sending' ? 'Wysyłanie...' : (
                    <>Wyślij wiadomość <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" /></>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

// --- Footer ---
const Footer = () => (
  <footer className="bg-[#0a0704] border-t border-white/5 py-16 px-6">
    <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
      <div>
        <h2 className="text-2xl font-serif tracking-[0.15em] uppercase text-white mb-1">CERAMIKA</h2>
        <p className="text-white/30 text-xs font-sans tracking-widest">© 2024. Wszystkie prawa zastrzeżone.</p>
      </div>
      <div className="flex gap-8">
        <a href="#" className="text-white/30 hover:text-[#ec6d13] transition-colors text-xs tracking-widest uppercase font-sans">Instagram</a>
        <a href="#" className="text-white/30 hover:text-[#ec6d13] transition-colors text-xs tracking-widest uppercase font-sans">Pinterest</a>
        <a href="#" className="text-white/30 hover:text-[#ec6d13] transition-colors text-xs tracking-widest uppercase font-sans">Behance</a>
      </div>
      <p className="text-white/20 text-xs font-sans">Partner Światowy</p>
    </div>
  </footer>
);

// --- Pages ---
const HomePage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);

  useEffect(() => {
    fetch('/api/products').then(res => res.json()).then(setProducts);
    fetch('/api/testimonials').then(res => res.json()).then(setTestimonials);
  }, []);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <Hero />
      <Gallery products={products} />
      <About />
      <Testimonials testimonials={testimonials} />
      <Contact />
    </motion.div>
  );
};

const ProductPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`/api/products/${id}`)
      .then(res => res.json())
      .then(data => {
        if (data.error) navigate('/');
        else setProduct(data);
      });
  }, [id]);

  if (!product) return (
    <div className="h-screen flex items-center justify-center bg-[#0d0a05] text-white font-sans">
      Ładowanie...
    </div>
  );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-[#0d0a05] pt-28 pb-24 px-6"
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
        <div className="aspect-[4/5] overflow-hidden">
          <img
            src={product.image_url}
            alt={product.name}
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </div>
        <div className="pt-8">
          <Link to="/" className="text-white/40 hover:text-[#ec6d13] text-xs tracking-widest uppercase font-sans flex items-center gap-2 mb-10 transition-colors">
            <ChevronRight size={14} className="rotate-180" /> Powrót do galerii
          </Link>
          <span className="text-[#ec6d13] text-xs tracking-widest uppercase font-sans">{product.category}</span>
          <h1 className="text-5xl md:text-6xl font-serif text-white mt-4 mb-6">{product.name}</h1>
          {product.price && <p className="text-3xl font-serif text-[#ec6d13] mb-8">{product.price}</p>}
          <div className="border-t border-white/10 pt-8 mb-10">
            <p className="text-white/60 leading-relaxed text-lg font-sans">{product.description}</p>
            <p className="text-white/40 leading-relaxed mt-4 font-sans text-sm">
              Każdy egzemplarz jest unikatowy i może nieznacznie różnić się od zdjęcia. To właśnie te drobne różnice budują wartość ręcznie tworzonej ceramiki.
            </p>
          </div>
          <button className="bg-[#ec6d13] hover:bg-[#d45e0a] text-white px-10 py-4 font-sans text-sm tracking-widest uppercase transition-colors flex items-center gap-3 group">
            Zapytaj o dostępność <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

// --- Admin Page ---
const AdminPage = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [products, setProducts] = useState<Product[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [showAddTestimonialForm, setShowAddTestimonialForm] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [newProduct, setNewProduct] = useState({ name: '', description: '', price: '', image_url: '', category: 'Wazy' });
  const [newTestimonial, setNewTestimonial] = useState({ author: '', content: '' });

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch('/api/admin/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password })
    });
    const data = await res.json();
    if (data.success) { setIsLoggedIn(true); fetchProducts(); fetchTestimonials(); }
    else setError('Błędne hasło');
  };

  const fetchProducts = () => fetch('/api/products').then(r => r.json()).then(setProducts);
  const fetchTestimonials = () => fetch('/api/testimonials').then(r => r.json()).then(setTestimonials);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.length) return;
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('image', file);
    setIsUploading(true);
    try {
      const res = await fetch('/api/upload', { method: 'POST', body: formData });
      const data = await res.json();
      if (data.success) setNewProduct(p => ({ ...p, image_url: data.url }));
      else alert('Błąd przesyłania');
    } catch { alert('Błąd sieci'); }
    finally { setIsUploading(false); }
  };

  const handleAddProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch('/api/products', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(newProduct) });
    setShowAddForm(false);
    setNewProduct({ name: '', description: '', price: '', image_url: '', category: 'Wazy' });
    fetchProducts();
  };

  const handleDeleteProduct = async (id: number) => {
    if (!confirm('Usunąć ten produkt?')) return;
    await fetch(`/api/products/${id}`, { method: 'DELETE' });
    fetchProducts();
  };

  const handleAddTestimonial = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch('/api/testimonials', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(newTestimonial) });
    setShowAddTestimonialForm(false);
    setNewTestimonial({ author: '', content: '' });
    fetchTestimonials();
  };

  const handleDeleteTestimonial = async (id: number) => {
    if (!confirm('Usunąć tę opinię?')) return;
    await fetch(`/api/testimonials/${id}`, { method: 'DELETE' });
    fetchTestimonials();
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-[#0d0a05] flex items-center justify-center px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-[#1a1208] border border-white/10 p-10 w-full max-w-md"
        >
          <div className="w-14 h-14 border border-[#ec6d13]/50 flex items-center justify-center text-[#ec6d13] mx-auto mb-8">
            <Lock size={22} />
          </div>
          <h2 className="text-2xl font-serif text-white text-center mb-8">Panel Administratora</h2>
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-white/40 text-xs tracking-widest uppercase font-sans mb-2">Hasło</label>
              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="w-full bg-transparent border-b border-white/20 focus:border-[#ec6d13] py-3 text-white font-sans outline-none transition-colors"
              />
            </div>
            {error && <p className="text-red-400 text-sm font-sans text-center">{error}</p>}
            <button className="w-full bg-[#ec6d13] hover:bg-[#d45e0a] text-white py-4 font-sans text-sm tracking-widest uppercase transition-colors">
              Zaloguj się
            </button>
          </form>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0d0a05] pt-28 pb-24 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-12">
          <h1 className="text-4xl font-serif text-white">Zarządzanie Pracownią</h1>
          <button
            onClick={() => setIsLoggedIn(false)}
            className="flex items-center gap-2 text-white/40 hover:text-[#ec6d13] transition-colors text-sm font-sans"
          >
            <LogOut size={16} /> Wyloguj
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            {/* Products panel */}
            <div className="bg-[#1a1208] border border-white/10 p-8">
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl font-serif text-white">Produkty w Galerii</h2>
                <button
                  onClick={() => setShowAddForm(true)}
                  className="bg-[#ec6d13] hover:bg-[#d45e0a] text-white py-2 px-4 text-sm tracking-widest uppercase font-sans flex items-center gap-2 transition-colors"
                >
                  <Plus size={14} /> Dodaj
                </button>
              </div>

              {showAddForm && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="mb-8 p-6 bg-white/5 border border-white/10"
                >
                  <form onSubmit={handleAddProduct} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <input placeholder="Nazwa" required className="p-3 bg-transparent border border-white/20 focus:border-[#ec6d13] text-white font-sans outline-none transition-colors" value={newProduct.name} onChange={e => setNewProduct({ ...newProduct, name: e.target.value })} />
                      <input placeholder="Cena (np. 120 zł)" className="p-3 bg-transparent border border-white/20 focus:border-[#ec6d13] text-white font-sans outline-none transition-colors" value={newProduct.price} onChange={e => setNewProduct({ ...newProduct, price: e.target.value })} />
                    </div>
                    <textarea placeholder="Opis" className="w-full p-3 bg-transparent border border-white/20 focus:border-[#ec6d13] text-white font-sans outline-none transition-colors resize-none" rows={3} value={newProduct.description} onChange={e => setNewProduct({ ...newProduct, description: e.target.value })} />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="border border-white/20 hover:border-[#ec6d13] text-white/60 hover:text-white py-3 px-4 text-sm font-sans flex items-center justify-center cursor-pointer transition-colors">
                          {isUploading ? 'Przesyłanie...' : 'Wybierz zdjęcie'}
                          <input type="file" accept="image/*" className="hidden" onChange={handleFileUpload} disabled={isUploading} />
                        </label>
                        {newProduct.image_url && <img src={newProduct.image_url} alt="Podgląd" className="h-12 w-12 object-cover border border-white/20" />}
                        <input placeholder="lub wklej URL" className="w-full p-3 bg-transparent border border-white/20 focus:border-[#ec6d13] text-white/60 text-xs font-sans outline-none transition-colors" value={newProduct.image_url} onChange={e => setNewProduct({ ...newProduct, image_url: e.target.value })} />
                      </div>
                      <input placeholder="Kategoria" required className="p-3 bg-transparent border border-white/20 focus:border-[#ec6d13] text-white font-sans outline-none transition-colors h-fit" value={newProduct.category} onChange={e => setNewProduct({ ...newProduct, category: e.target.value })} />
                    </div>
                    <div className="flex gap-4">
                      <button type="submit" className="flex-1 bg-[#ec6d13] hover:bg-[#d45e0a] text-white py-3 font-sans text-sm tracking-widest uppercase transition-colors">Zapisz</button>
                      <button type="button" onClick={() => setShowAddForm(false)} className="flex-1 border border-white/20 hover:border-white/50 text-white/60 hover:text-white py-3 font-sans text-sm tracking-widest uppercase transition-colors">Anuluj</button>
                    </div>
                  </form>
                </motion.div>
              )}

              <div className="space-y-3">
                {products.map(p => (
                  <div key={p.id} className="flex items-center gap-4 p-4 border border-transparent hover:border-white/10 transition-colors group">
                    <img src={p.image_url} className="w-14 h-14 object-cover" referrerPolicy="no-referrer" />
                    <div className="flex-1">
                      <h3 className="text-white font-sans font-medium">{p.name}</h3>
                      <p className="text-white/40 text-sm font-sans">{p.category} {p.price && `• ${p.price}`}</p>
                    </div>
                    <button onClick={() => handleDeleteProduct(p.id)} className="text-white/20 hover:text-red-400 transition-colors opacity-0 group-hover:opacity-100">
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))}
                {products.length === 0 && <p className="text-white/30 font-sans text-sm py-4">Brak produktów w galerii.</p>}
              </div>
            </div>

            {/* Testimonials panel */}
            <div className="bg-[#1a1208] border border-white/10 p-8">
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl font-serif text-white">Głosy z Pracowni</h2>
                <button onClick={() => setShowAddTestimonialForm(true)} className="bg-[#ec6d13] hover:bg-[#d45e0a] text-white py-2 px-4 text-sm tracking-widest uppercase font-sans flex items-center gap-2 transition-colors">
                  <Plus size={14} /> Dodaj
                </button>
              </div>

              {showAddTestimonialForm && (
                <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="mb-8 p-6 bg-white/5 border border-white/10">
                  <form onSubmit={handleAddTestimonial} className="space-y-4">
                    <input placeholder="Autor (np. Anna K.)" required className="w-full p-3 bg-transparent border border-white/20 focus:border-[#ec6d13] text-white font-sans outline-none transition-colors" value={newTestimonial.author} onChange={e => setNewTestimonial({ ...newTestimonial, author: e.target.value })} />
                    <textarea placeholder="Treść opinii" required rows={3} className="w-full p-3 bg-transparent border border-white/20 focus:border-[#ec6d13] text-white font-sans outline-none transition-colors resize-none" value={newTestimonial.content} onChange={e => setNewTestimonial({ ...newTestimonial, content: e.target.value })} />
                    <div className="flex gap-4">
                      <button type="submit" className="flex-1 bg-[#ec6d13] hover:bg-[#d45e0a] text-white py-3 font-sans text-sm tracking-widest uppercase transition-colors">Zapisz</button>
                      <button type="button" onClick={() => setShowAddTestimonialForm(false)} className="flex-1 border border-white/20 hover:border-white/50 text-white/60 py-3 font-sans text-sm tracking-widest uppercase transition-colors">Anuluj</button>
                    </div>
                  </form>
                </motion.div>
              )}

              <div className="space-y-3">
                {testimonials.map(t => (
                  <div key={t.id} className="flex items-start gap-4 p-4 border border-transparent hover:border-white/10 transition-colors group">
                    <div className="flex-1">
                      <p className="text-white/70 font-sans text-sm italic mb-1">"{t.content}"</p>
                      <p className="text-[#ec6d13] text-xs tracking-widest uppercase font-sans">— {t.author}</p>
                    </div>
                    <button onClick={() => handleDeleteTestimonial(t.id)} className="text-white/20 hover:text-red-400 transition-colors opacity-0 group-hover:opacity-100 mt-1">
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))}
                {testimonials.length === 0 && <p className="text-white/30 font-sans text-sm py-4">Brak opinii.</p>}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="bg-[#1a1208] border border-[#ec6d13]/20 p-8 h-fit">
            <Star className="text-[#ec6d13] mb-4" size={20} fill="currentColor" />
            <h3 className="text-xl font-serif text-white mb-4">Panel Sterowania</h3>
            <div className="space-y-4 text-sm font-sans">
              <div className="flex justify-between border-b border-white/5 pb-3">
                <span className="text-white/40">Produkty</span>
                <span className="text-white font-medium">{products.length}</span>
              </div>
              <div className="flex justify-between border-b border-white/5 pb-3">
                <span className="text-white/40">Opinie</span>
                <span className="text-white font-medium">{testimonials.length}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- App ---
export default function App() {
  return (
    <Router>
      <div className="bg-[#0d0a05] min-h-screen">
        <Navbar />
        <AnimatePresence mode="wait">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/product/:id" element={<ProductPage />} />
            <Route path="/admin" element={<AdminPage />} />
          </Routes>
        </AnimatePresence>
        <Footer />
      </div>
    </Router>
  );
}
