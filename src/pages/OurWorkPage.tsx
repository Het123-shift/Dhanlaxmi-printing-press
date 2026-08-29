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
  Filter,
  Layers,
  Image as ImageIcon,
} from 'lucide-react';
import { OUR_WORK_ITEMS, BUSINESS_INFO, Language, WorkItem } from '../data/content';
import { generateWhatsAppUrl } from '../utils/storage';

interface OurWorkPageProps {
  navigate: (route: string) => void;
  lang: Language;
}

export const OurWorkPage: React.FC<OurWorkPageProps> = ({ navigate, lang }) => {
  const [selectedCat, setSelectedCat] = useState<string>('all');
  const [search, setSearch] = useState<string>('');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const categories = [
    { id: 'all', label: 'All Work', labelGu: 'તમામ કામગીરી' },
    { id: 'kankotri', label: 'Kankotri & Wedding', labelGu: 'કંકોત્રી અને લગ્ન' },
    { id: 'bill-books', label: 'Bill Books & Invoices', labelGu: 'બિલ બુક' },
    { id: 'commercial', label: 'Commercial & Stationery', labelGu: 'કોમર્શિયલ સ્ટેશનરી' },
    { id: 'dtp', label: 'DTP & Typesetting', labelGu: 'DTP કમ્પોઝિંગ' },
    { id: 'printing', label: 'Offset & Screen', labelGu: 'ઓફસેટ પ્રિન્ટ' },
    { id: 'binding', label: 'Book Binding & Ledgers', labelGu: 'ચોપડા બાઇન્ડીંગ' },
    { id: 'flex', label: 'Flex Banners', labelGu: 'ફ્લેક્સ બેનર' },
  ];

  const filteredWork = OUR_WORK_ITEMS.filter((item) => {
    const matchesCat = selectedCat === 'all' || item.category === selectedCat;
    const q = search.toLowerCase().trim();
    if (!q) return matchesCat;

    return (
      item.title.toLowerCase().includes(q) ||
      item.titleGu.toLowerCase().includes(q) ||
      item.shortDesc.toLowerCase().includes(q) ||
      item.shortDescGu.toLowerCase().includes(q) ||
      item.tag.toLowerCase().includes(q)
    );
  });

  const activeWorkItem = lightboxIndex !== null ? filteredWork[lightboxIndex] : null;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Hero Banner */}
      <div className="bg-[#101B36] text-white rounded-3xl p-8 sm:p-12 shadow-xl border border-[#c9a227]/40 space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-[#c9a227]/20 text-[#dfba47] rounded-full text-xs font-semibold font-mono">
          <Sparkles className="w-3.5 h-3.5" />
          <span>{lang === 'gu' ? 'અમારા કામનો પરિચય' : 'Our Work Showcase'}</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold font-serif">
          {lang === 'gu' ? 'અમારું કામ (Our Work)' : 'Our Work'}
        </h1>
        <p className="text-xs sm:text-sm text-slate-300 max-w-3xl leading-relaxed font-light">
          {lang === 'gu'
            ? 'ધનલક્ષ્મી પ્રિન્ટીંગ પ્રેસ દ્વારા તૈયાર કરવામાં આવતી લગ્ન કંકોત્રી, ટેક્સ બિલ બુક, ડીટીપી કમ્પોઝિંગ, ચોપડા બાઇન્ડીંગ અને પ્રિન્ટીંગ પ્રોજેક્ટ્સની ઝાંખી.'
            : 'Explore some of the printing, invitation, stationery and book-related work completed by Dhanlaxmi Printing Press.'}
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 sm:p-6 rounded-3xl border border-[#c9a227]/30 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder={lang === 'gu' ? 'કામગીરી શોધો (દા.ત. NCR, Foil)...' : 'Search completed work (e.g. NCR, Foil)...'}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 text-xs bg-[#FAF7F0] border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#c9a227] focus:bg-white font-mono"
            />
          </div>

          <span className="text-xs text-slate-500 font-semibold font-mono">
            {lang === 'gu' ? `કુલ ${filteredWork.length} વર્ક આઇટમ્સ` : `Showing ${filteredWork.length} project items`}
          </span>
        </div>

        <div className="flex flex-wrap gap-2 pt-2 border-t border-slate-100">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCat(cat.id)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                selectedCat === cat.id
                  ? 'bg-[#101B36] text-[#dfba47] shadow border border-[#c9a227]/50'
                  : 'bg-[#FAF7F0] text-slate-700 hover:bg-slate-100'
              }`}
            >
              {lang === 'gu' ? cat.labelGu : cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Responsive Work Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredWork.map((item, idx) => (
          <div
            key={item.id}
            onClick={() => setLightboxIndex(idx)}
            className="bg-white rounded-3xl border border-[#c9a227]/25 shadow-sm hover:shadow-xl hover:border-[#c9a227] transition-all cursor-pointer overflow-hidden flex flex-col justify-between group premium-card"
          >
            {/* Visual Header */}
            <div className="h-44 bg-gradient-to-br from-[#101B36] via-[#17254a] to-[#0a1124] p-5 flex flex-col justify-between relative overflow-hidden">
              <div className="flex items-center justify-between relative z-10">
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-white/10 text-[#dfba47] font-mono">
                  {lang === 'gu' ? item.categoryLabelGu : item.categoryLabel}
                </span>
                <span className="text-[10px] text-slate-400 font-mono">#{item.id}</span>
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

            {/* Content Body */}
            <div className="p-5 space-y-3 flex-1 flex flex-col justify-between">
              <p className="text-xs text-slate-600 leading-relaxed font-light">
                {lang === 'gu' ? item.shortDescGu : item.shortDesc}
              </p>

              <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="text-[#101B36] font-bold group-hover:text-[#214E9A] flex items-center gap-1">
                  <span>View Project</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </span>
                <span className="text-[10px] text-slate-400 font-mono">Dhanlaxmi Press</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Detail Lightbox Modal */}
      {activeWorkItem && lightboxIndex !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl space-y-6 relative border border-[#c9a227]/40 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <span className="text-xs font-bold text-slate-500 font-mono">
                Project {lightboxIndex + 1} of {filteredWork.length}
              </span>
              <button
                onClick={() => setLightboxIndex(null)}
                className="p-1.5 text-slate-400 hover:text-slate-700 rounded-full"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="h-52 bg-gradient-to-br from-[#101B36] via-[#17254a] to-[#0a1124] rounded-2xl p-6 text-white flex flex-col justify-between border border-[#c9a227]/30 shadow-inner">
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 bg-white rounded-full p-0.5 shadow">
                  <img src="/logo.png" alt="Logo" className="w-full h-full object-contain rounded-full" />
                </div>
                <span className="px-3 py-1 bg-[#c9a227] text-[#101B36] font-bold rounded-full text-xs">
                  {lang === 'gu' ? activeWorkItem.tagGu : activeWorkItem.tag}
                </span>
              </div>

              <div className="space-y-1">
                <span className="text-xs font-mono text-cyan-300 uppercase tracking-widest">
                  {lang === 'gu' ? activeWorkItem.categoryLabelGu : activeWorkItem.categoryLabel}
                </span>
                <h3 className="text-xl font-extrabold text-white font-serif">
                  {lang === 'gu' ? activeWorkItem.titleGu : activeWorkItem.title}
                </h3>
              </div>

              <div className="text-[10px] text-slate-400 font-mono">
                Dhanlaxmi Printing Press • Panigate, Vadodara
              </div>
            </div>

            <div className="space-y-2 text-xs">
              <h4 className="font-bold text-[#101B36] uppercase tracking-wider font-mono">
                Work Scope & Specifications:
              </h4>
              <p className="text-slate-600 leading-relaxed text-sm font-light">
                {lang === 'gu' ? activeWorkItem.shortDescGu : activeWorkItem.shortDesc}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t border-slate-100">
              <div className="flex gap-2 w-full sm:w-auto">
                <button
                  onClick={() =>
                    setLightboxIndex((lightboxIndex - 1 + filteredWork.length) % filteredWork.length)
                  }
                  className="flex-1 sm:flex-none px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold flex items-center justify-center gap-1"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Prev</span>
                </button>
                <button
                  onClick={() => setLightboxIndex((lightboxIndex + 1) % filteredWork.length)}
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
                    `Hello Dhanlaxmi Printing Press, I am asking about your work item: ${activeWorkItem.title}.`
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 sm:flex-none px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 shadow"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Inquire</span>
                </a>

                <button
                  onClick={() => {
                    setLightboxIndex(null);
                    navigate('quote');
                  }}
                  className="flex-1 sm:flex-none px-4 py-2 bg-[#101B36] hover:bg-[#214E9A] text-white rounded-xl text-xs font-bold shadow"
                >
                  Get Quote
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
