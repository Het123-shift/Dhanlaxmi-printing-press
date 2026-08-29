import React, { useState } from 'react';
import {
  Search,
  X,
  ChevronLeft,
  ChevronRight,
  MessageCircle,
  Sparkles,
  ArrowRight,
  ArrowUpRight,
} from 'lucide-react';
import { GALLERY_ITEMS, BUSINESS_INFO, Language } from '../data/content';
import { generateWhatsAppUrl } from '../utils/storage';

interface GalleryPageProps {
  navigate: (route: string) => void;
  lang: Language;
}

export const GalleryPage: React.FC<GalleryPageProps> = ({ navigate, lang }) => {
  const [selectedCat, setSelectedCat] = useState<string>('all');
  const [search, setSearch] = useState<string>('');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const categories = [
    { id: 'all', label: 'All Portfolio', labelGu: 'બધા સેમ્પલ' },
    { id: 'wedding', label: 'Wedding & Kankotri', labelGu: 'લગ્ન કંકોત્રી' },
    { id: 'hindu', label: 'Hindu Invitations', labelGu: 'હિન્દુ આમંત્રણ' },
    { id: 'muslim', label: 'Muslim Invitations', labelGu: 'મુસ્લિમ કંકોત્રી' },
    { id: 'commercial', label: 'Bill Books & Stationery', labelGu: 'બિલ બુક અને સ્ટેશનરી' },
    { id: 'binding', label: 'Book & Binding', labelGu: 'બુક અને બાઇન્ડીંગ' },
    { id: 'printing', label: 'Flex & Large Formats', labelGu: 'ફ્લેક્સ અને સાઈનેજ' },
  ];

  const filteredItems = GALLERY_ITEMS.filter((item) => {
    const matchesCat = selectedCat === 'all' || item.category === selectedCat;
    const q = search.toLowerCase().trim();
    if (!q) return matchesCat;

    return (
      item.title.toLowerCase().includes(q) ||
      item.titleGu.toLowerCase().includes(q) ||
      item.description.toLowerCase().includes(q) ||
      item.descriptionGu.toLowerCase().includes(q) ||
      item.tag.toLowerCase().includes(q)
    );
  });

  const openLightbox = (idx: number) => {
    setLightboxIndex(idx);
  };

  const closeLightbox = () => {
    setLightboxIndex(null);
  };

  const nextLightbox = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex + 1) % filteredItems.length);
    }
  };

  const prevLightbox = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex - 1 + filteredItems.length) % filteredItems.length);
    }
  };

  const activeLightboxItem = lightboxIndex !== null ? filteredItems[lightboxIndex] : null;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Banner */}
      <div className="bg-[#101B36] text-white rounded-3xl p-8 sm:p-12 shadow-xl border border-[#c9a227]/40 space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-[#c9a227]/20 text-[#dfba47] rounded-full text-xs font-semibold font-mono">
          <Sparkles className="w-3.5 h-3.5" />
          <span>{lang === 'gu' ? 'ગુણવત્તાયુક્ત સેમ્પલ પોર્ટફોલિયો' : 'Design & Print Portfolio'}</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold font-serif">
          {lang === 'gu' ? 'સેમ્પલ વર્ક ગેલેરી' : 'Sample Showcase & Gallery'}
        </h1>
        <p className="text-xs sm:text-sm text-slate-300 max-w-3xl leading-relaxed font-light">
          {lang === 'gu'
            ? 'અહીં અમારા દ્વારા તૈયાર કરવામાં આવતી લગ્ન કંકોત્રી, મુસ્લિમ નિકાહ કાર્ડ, જીએસટી બિલ બુક, ટ્રાન્સપોર્ટ L.R. બિલ્ટી, વિઝિટિંગ કાર્ડ, રજીસ્ટર અને ફ્લેક્સ બેનરના સેમ્પલ્સ પ્રસ્તુત છે.'
            : 'Explore representative samples of our wedding stationery, religious patrika, triplicate carbonless bill books, hardbound ledgers, and marketing collateral.'}
        </p>
      </div>

      {/* Filter & Search Bar */}
      <div className="bg-white p-4 sm:p-6 rounded-3xl border border-[#c9a227]/30 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder={lang === 'gu' ? 'સેમ્પલ શોધો (દા.ત. Gold Foil, NCR)...' : 'Search samples (e.g. Gold Foil, NCR)...'}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 text-xs bg-[#FAF7F0] border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#c9a227] focus:bg-white"
            />
            {search && (
              <button
                onClick={() => setSearch('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          <span className="text-xs text-slate-500 font-semibold font-mono">
            {lang === 'gu' ? `કુલ ${filteredItems.length} સેમ્પલ્સ` : `Showing ${filteredItems.length} portfolio items`}
          </span>
        </div>

        {/* Category filters */}
        <div className="flex flex-wrap gap-2 pt-2 border-t border-slate-100">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCat(cat.id)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                selectedCat === cat.id
                  ? 'bg-[#101B36] text-[#dfba47] shadow-sm border border-[#c9a227]/50'
                  : 'bg-[#FAF7F0] text-slate-700 hover:bg-slate-100'
              }`}
            >
              {lang === 'gu' ? cat.labelGu : cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Editorial Masonry Grid */}
      {filteredItems.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-3xl border border-slate-200 p-8 space-y-3">
          <p className="text-slate-500 text-sm">No samples matched your search criteria.</p>
          <button
            onClick={() => {
              setSearch('');
              setSelectedCat('all');
            }}
            className="px-4 py-2 bg-[#101B36] text-white text-xs font-semibold rounded-xl"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredItems.map((item, idx) => (
            <div
              key={item.id}
              onClick={() => openLightbox(idx)}
              className="bg-white rounded-3xl border border-[#c9a227]/25 shadow-sm hover:shadow-xl hover:border-[#c9a227] transition-all duration-300 cursor-pointer overflow-hidden flex flex-col justify-between group premium-card"
            >
              {/* Studio Canvas Header */}
              <div className="h-44 bg-gradient-to-br from-[#101B36] via-[#17254a] to-[#0a1124] p-5 flex flex-col justify-between relative overflow-hidden">
                <div className="flex items-center justify-between relative z-10">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-white/10 text-[#dfba47] backdrop-blur-sm border border-white/10 font-mono">
                    {lang === 'gu' ? item.categoryLabelGu : item.categoryLabel}
                  </span>
                  <span className="text-[10px] font-mono text-slate-400">#{item.id}</span>
                </div>

                <div className="relative z-10 space-y-1">
                  <span className="text-[11px] font-bold text-[#dfba47] block">
                    {lang === 'gu' ? item.tagGu : item.tag}
                  </span>
                  <h3 className="font-extrabold text-white text-sm leading-tight group-hover:text-[#dfba47] transition-colors font-serif">
                    {lang === 'gu' ? item.titleGu : item.title}
                  </h3>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-5 space-y-3 flex-1 flex flex-col justify-between">
                <p className="text-xs text-slate-600 leading-relaxed font-light">
                  {lang === 'gu' ? item.descriptionGu : item.description}
                </p>

                <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span className="text-[#101B36] font-bold group-hover:text-[#214E9A] flex items-center gap-1">
                    <span>Inspect Sample</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </span>
                  <span className="text-[10px] text-slate-400 font-mono">Dhanlaxmi Press</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Lightbox Modal */}
      {activeLightboxItem && lightboxIndex !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl space-y-6 relative max-h-[90vh] overflow-y-auto border border-[#c9a227]/40">
            {/* Top Close & Navigation */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <span className="text-xs font-bold text-slate-500 font-mono">
                Sample {lightboxIndex + 1} of {filteredItems.length}
              </span>
              <button
                onClick={closeLightbox}
                className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* High-Res Studio Spec Canvas */}
            <div className="w-full h-56 sm:h-64 bg-gradient-to-br from-[#101B36] via-[#17254a] to-[#0a1124] rounded-2xl p-6 text-white flex flex-col justify-between relative overflow-hidden shadow-inner border border-[#c9a227]/30">
              <div className="flex items-center justify-between">
                <div className="w-11 h-11 bg-white rounded-full p-0.5 shadow">
                  <img src="/logo.png" alt="Logo" className="w-full h-full object-contain rounded-full" />
                </div>
                <span className="px-3 py-1 bg-[#c9a227] text-[#101B36] font-bold rounded-full text-xs">
                  {lang === 'gu' ? activeLightboxItem.tagGu : activeLightboxItem.tag}
                </span>
              </div>

              <div className="space-y-1">
                <span className="text-xs font-mono text-cyan-300 uppercase tracking-widest">
                  {lang === 'gu' ? activeLightboxItem.categoryLabelGu : activeLightboxItem.categoryLabel}
                </span>
                <h3 className="text-xl sm:text-2xl font-extrabold text-white font-serif">
                  {lang === 'gu' ? activeLightboxItem.titleGu : activeLightboxItem.title}
                </h3>
              </div>

              <div className="text-[11px] text-slate-300 font-mono flex items-center justify-between">
                <span>Dhanlaxmi Printing Press • Vadodara</span>
                <span>CMYK & Gold Foil Specification</span>
              </div>
            </div>

            {/* Description */}
            <div className="space-y-2 text-xs">
              <h4 className="font-bold text-[#101B36] uppercase tracking-wider font-mono">
                Sample Specifications:
              </h4>
              <p className="text-slate-600 leading-relaxed text-sm font-light">
                {lang === 'gu' ? activeLightboxItem.descriptionGu : activeLightboxItem.description}
              </p>
            </div>

            {/* Controls */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t border-slate-100">
              <div className="flex gap-2 w-full sm:w-auto">
                <button
                  onClick={prevLightbox}
                  className="flex-1 sm:flex-none px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold flex items-center justify-center gap-1"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Prev</span>
                </button>
                <button
                  onClick={nextLightbox}
                  className="flex-1 sm:flex-none px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold flex items-center justify-center gap-1"
                >
                  <span>Next</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              <div className="flex gap-2 w-full sm:w-auto">
                <a
                  href={generateWhatsAppUrl(
                    BUSINESS_INFO.whatsapp,
                    `Hello Dhanlaxmi Printing Press, I am looking at sample: ${activeLightboxItem.title}. Please share price & availability.`
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 sm:flex-none px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 shadow"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>WhatsApp</span>
                </a>

                <button
                  onClick={() => {
                    closeLightbox();
                    navigate('quote');
                  }}
                  className="flex-1 sm:flex-none px-4 py-2 bg-[#101B36] hover:bg-[#214E9A] text-white rounded-xl text-xs font-bold shadow"
                >
                  Request Quote
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
