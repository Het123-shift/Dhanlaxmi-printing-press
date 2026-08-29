import React, { useState } from 'react';
import {
  Printer,
  FileEdit,
  Layers,
  Truck,
  CheckCircle2,
  Phone,
  MessageCircle,
  ArrowRight,
  Sparkles,
  ShieldCheck,
  Clock,
  Compass,
  ArrowUpRight,
  Tag,
  Percent,
} from 'lucide-react';
import {
  BUSINESS_INFO,
  ALL_SERVICES,
  GALLERY_ITEMS,
  ALBUM_COLLECTION_ITEMS,
  WORKFLOW_STEPS,
  Language,
  ServiceItem,
} from '../data/content';
import { generateWhatsAppUrl, generateCallUrl } from '../utils/storage';

interface HomePageProps {
  navigate: (route: string) => void;
  lang: Language;
  onSelectService: (service: ServiceItem) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ navigate, lang, onSelectService }) => {
  const [activeTab, setActiveTab] = useState<'all' | 'invitation' | 'commercial' | 'printing' | 'binding'>('all');

  const filteredServices =
    activeTab === 'all' ? ALL_SERVICES : ALL_SERVICES.filter((s) => s.category === activeTab);

  return (
    <div className="space-y-16 sm:space-y-24 pb-16">
      {/* 1. HIGH-IMPACT PREMIUM HERO */}
      <section className="relative bg-mandala-subtle text-white pt-12 sm:pt-16 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden border-b border-[#c9a227]/30">
        <div className="absolute top-0 right-0 w-1/2 h-full opacity-10 pointer-events-none bg-[radial-gradient(#c9a227_1px,transparent_1px)] [background-size:16px_16px]"></div>

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
          {/* Hero Left Content */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#101B36]/80 border border-[#c9a227]/40 shadow-inner">
              <span className="w-2 h-2 rounded-full bg-[#c9a227] animate-ping"></span>
              <span className="text-[11px] font-bold tracking-widest text-[#dfba47] uppercase font-mono">
                DHANLAXMI PRINTING PRESS • VADODARA
              </span>
            </div>

            <div className="space-y-2">
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight font-serif">
                {lang === 'gu' ? (
                  <>
                    તમારા વિચારથી લઈને <br />
                    <span className="gold-gradient-text">સંપૂર્ણ પરફેક્ટ પ્રિન્ટ સુધી.</span>
                  </>
                ) : (
                  <>
                    From Your Idea <br />
                    <span className="gold-gradient-text">to the Perfect Print.</span>
                  </>
                )}
              </h1>
              <p className="text-sm sm:text-lg text-[#dfba47] font-semibold tracking-wide">
                “{lang === 'gu' ? BUSINESS_INFO.taglineGu : BUSINESS_INFO.tagline}”
              </p>
            </div>

            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-light">
              {lang === 'gu'
                ? 'લગ્ન કંકોત્રી અને આમંત્રણ કાર્ડ્સથી લઈને જીએસટી બિલ બુક, ડીટીપી કમ્પોઝિંગ, મલ્ટી-કલર ઓફસેટ પ્રિન્ટીંગ, હાર્ડકવર બાઇન્ડીંગ અને સુરક્ષિત ડિલિવરી — અમે સમગ્ર પ્રક્રિયા ચોકસાઈપૂર્વક સંભાળીએ છીએ.'
                : 'From kankotri and auspicious celebration invites to commercial tax invoices, DTP composing, multi-color offset printing, register binding and doorstep delivery — we handle the complete print process.'}
            </p>

            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 pt-2">
              <button
                onClick={() => navigate('quote')}
                className="px-6 py-3.5 bg-gradient-to-r from-[#c9a227] via-[#dfba47] to-[#c9a227] hover:brightness-110 text-[#101B36] font-extrabold rounded-xl shadow-xl transition-all text-xs sm:text-sm flex items-center gap-2 border border-[#dfba47]"
              >
                <span>{lang === 'gu' ? 'ભાવપત્રક મેળવો' : 'Request a Quote'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <a
                href={generateWhatsAppUrl(
                  BUSINESS_INFO.whatsapp,
                  'Hello Dhanlaxmi Printing Press, I would like to discuss my printing requirement.'
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-3.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl shadow-md transition-all text-xs sm:text-sm flex items-center gap-2"
              >
                <MessageCircle className="w-4 h-4" />
                <span>{lang === 'gu' ? 'વોટ્સએપ પૂછપરછ' : 'WhatsApp Us'}</span>
              </a>

              <button
                onClick={() => navigate('services')}
                className="px-5 py-3.5 bg-white/10 hover:bg-white/20 text-slate-100 border border-white/20 font-semibold rounded-xl transition-all text-xs sm:text-sm backdrop-blur-sm"
              >
                {lang === 'gu' ? 'સેવાઓ જુઓ' : 'Explore Services'}
              </button>
            </div>

            <div className="grid grid-cols-3 gap-4 pt-6 max-w-lg mx-auto lg:mx-0 border-t border-[#c9a227]/20 text-left">
              <div className="flex items-center space-x-2">
                <ShieldCheck className="w-4 h-4 text-[#c9a227] flex-shrink-0" />
                <span className="text-[11px] sm:text-xs text-slate-200 font-medium leading-tight">
                  {lang === 'gu' ? 'સચોટ પ્રૂફિંગ' : 'Verified Proofing'}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4 text-[#dfba47] flex-shrink-0" />
                <span className="text-[11px] sm:text-xs text-slate-200 font-medium leading-tight">
                  {lang === 'gu' ? 'સમયસર ડિલિવરી' : 'Timely Dispatch'}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <Sparkles className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                <span className="text-[11px] sm:text-xs text-slate-200 font-medium leading-tight">
                  {lang === 'gu' ? 'ઈન-હાઉસ સેટઅપ' : 'Full In-House Setup'}
                </span>
              </div>
            </div>
          </div>

          {/* Hero Right Card */}
          <div className="lg:col-span-5 flex flex-col items-center">
            <div className="relative w-full max-w-sm">
              <div className="absolute -inset-1.5 rounded-3xl bg-gradient-to-tr from-[#c9a227] via-[#214E9A] to-[#ec008c] opacity-40 blur-sm"></div>

              <div className="relative bg-[#101B36] rounded-3xl p-6 shadow-2xl border border-[#c9a227]/50 space-y-6 text-center">
                <div className="w-36 h-36 sm:w-44 sm:h-44 mx-auto bg-white rounded-full p-1.5 shadow-2xl border-4 border-[#c9a227] flex items-center justify-center relative">
                  <img
                    src="/logo.png"
                    alt="Official Dhanlaxmi Printing Press Logo"
                    className="w-full h-full object-contain rounded-full"
                  />
                  <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-[#c9a227] border-2 border-white shadow flex items-center justify-center text-[9px] font-bold text-[#101B36]">
                    ★
                  </span>
                </div>

                <div className="space-y-1">
                  <h2 className="text-lg font-extrabold text-white tracking-wider uppercase font-serif">
                    {lang === 'gu' ? BUSINESS_INFO.nameGu : 'DHANLAXMI PRINTING PRESS'}
                  </h2>
                  <p className="text-xs text-[#dfba47] font-semibold">
                    {lang === 'gu' ? 'પાણીગેટ, વડોદરા-૨૫' : 'O/S. Panigate, Vadodara-25'}
                  </p>
                </div>

                <div className="flex justify-center items-center gap-2 py-1 bg-[#0a1124] rounded-xl p-2 border border-[#c9a227]/20">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#00aeef]" title="Cyan"></span>
                  <span className="w-2.5 h-2.5 rounded-full bg-[#ec008c]" title="Magenta"></span>
                  <span className="w-2.5 h-2.5 rounded-full bg-[#fff200]" title="Yellow"></span>
                  <span className="w-2.5 h-2.5 rounded-full bg-[#231f20] border border-white/50" title="Key (Black)"></span>
                  <span className="text-[11px] font-mono text-slate-300 font-semibold tracking-wider ml-1">
                    CMYK Precision Studio
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 text-left text-xs">
                  <div className="bg-white/5 p-2.5 rounded-xl border border-white/10">
                    <span className="text-[10px] text-[#dfba47] font-bold block uppercase">Album Collection:</span>
                    <span className="text-rose-400 text-[11px] font-bold">50% OFF Available</span>
                  </div>
                  <div className="bg-white/5 p-2.5 rounded-xl border border-white/10">
                    <span className="text-[10px] text-cyan-300 font-bold block uppercase">Commercial:</span>
                    <span className="text-slate-200 text-[11px] font-medium">Custom NCR Rates</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. PROMINENT PROMOTIONAL BANNER: 50% OFF ALBUM COLLECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-rose-950 via-[#101B36] to-amber-950 text-white rounded-3xl p-6 sm:p-10 border-2 border-[#c9a227] shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden">
          <div className="space-y-3 text-center md:text-left relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-rose-600 text-white rounded-full text-xs font-extrabold shadow animate-pulse">
              <Percent className="w-3.5 h-3.5" />
              <span>SPECIAL INVITATION OFFER</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold font-serif leading-tight">
              {lang === 'gu' ? (
                <>
                  અમારા આલ્બમ કલેક્શનની દરેક કંકોત્રી પર <br className="hidden sm:inline" />
                  <span className="text-rose-400 font-bold">૫૦% ની વિશેષ છૂટ</span>
                </>
              ) : (
                <>
                  50% OFF <br className="hidden sm:inline" />
                  <span className="text-[#dfba47]">Every Kankotri & Invitation Card</span> <br className="hidden sm:inline" />
                  from Our Album Collection
                </>
              )}
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 max-w-xl font-light">
              {lang === 'gu'
                ? 'લગ્ન, શ્રીમંત, બાબરી, વાસ્તુ, યજ્ઞ અને નિકાહ માટે અમારા ઉપલબ્ધ ફિઝિકલ આલ્બમમાંથી ગમતી ડિઝાઇન પસંદ કરો. (અન્ય કસ્ટમ પ્રિન્ટીંગ માટે ભાવ જરૂરિયાત મુજબ).'
                : 'Browse hundreds of traditional & modern invitation suites in our physical album books. (Custom separate printing quoted transparently based on requirements).'}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto relative z-10">
            <button
              onClick={() => navigate('invitation-kankotri')}
              className="px-6 py-3.5 bg-gradient-to-r from-[#c9a227] to-[#dfba47] text-[#101B36] font-extrabold rounded-xl text-xs sm:text-sm shadow-xl flex items-center justify-center gap-2 hover:brightness-110 transition-all"
            >
              <span>Explore Album Collection</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <a
              href={generateWhatsAppUrl(
                BUSINESS_INFO.whatsapp,
                'Hello Dhanlaxmi Printing Press, I would like to see your 50% OFF Album Kankotri designs.'
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-3.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg transition-all"
            >
              <MessageCircle className="w-4 h-4" />
              <span>WhatsApp Us</span>
            </a>
          </div>
        </div>
      </section>

      {/* 3. HIGHLIGHT STRIP */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl shadow-xl border border-[#c9a227]/30 p-5 sm:p-7 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 text-center">
          <div className="p-3 rounded-2xl bg-[#FAF7F0] hover:bg-white hover:shadow-md transition-all border border-transparent hover:border-[#c9a227]/30">
            <div className="w-10 h-10 mx-auto mb-2 rounded-xl bg-[#214E9A]/10 text-[#214E9A] flex items-center justify-center">
              <Printer className="w-5 h-5" />
            </div>
            <h3 className="text-xs font-bold text-slate-900">
              {lang === 'gu' ? 'મલ્ટી-કલર પ્રિન્ટીંગ' : 'Multi-Color Offset'}
            </h3>
            <p className="text-[10px] text-slate-500 font-medium">HD 4-Color CMYK</p>
          </div>

          <div className="p-3 rounded-2xl bg-[#FAF7F0] hover:bg-white hover:shadow-md transition-all border border-transparent hover:border-[#c9a227]/30">
            <div className="w-10 h-10 mx-auto mb-2 rounded-xl bg-[#c9a227]/15 text-[#9e7a17] flex items-center justify-center">
              <Sparkles className="w-5 h-5" />
            </div>
            <h3 className="text-xs font-bold text-slate-900">
              {lang === 'gu' ? 'સ્ક્રીન પ્રિન્ટીંગ & ફોઈલ' : 'Screen & Gold Foil'}
            </h3>
            <p className="text-[10px] text-slate-500 font-medium">Lustrous Metallic</p>
          </div>

          <div className="p-3 rounded-2xl bg-[#FAF7F0] hover:bg-white hover:shadow-md transition-all border border-transparent hover:border-[#c9a227]/30">
            <div className="w-10 h-10 mx-auto mb-2 rounded-xl bg-indigo-50 text-indigo-700 flex items-center justify-center">
              <FileEdit className="w-5 h-5" />
            </div>
            <h3 className="text-xs font-bold text-slate-900">
              {lang === 'gu' ? 'DTP કમ્પોઝિંગ' : 'DTP & Layout'}
            </h3>
            <p className="text-[10px] text-slate-500 font-medium">Gujarati & English</p>
          </div>

          <div className="p-3 rounded-2xl bg-[#FAF7F0] hover:bg-white hover:shadow-md transition-all border border-transparent hover:border-[#c9a227]/30">
            <div className="w-10 h-10 mx-auto mb-2 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center">
              <Layers className="w-5 h-5" />
            </div>
            <h3 className="text-xs font-bold text-slate-900">
              {lang === 'gu' ? 'બિલ બુક & L.R.' : 'Bill Books & L.R.'}
            </h3>
            <p className="text-[10px] text-slate-500 font-medium">Carbonless NCR</p>
          </div>

          <div className="p-3 rounded-2xl bg-[#FAF7F0] hover:bg-white hover:shadow-md transition-all border border-transparent hover:border-[#c9a227]/30">
            <div className="w-10 h-10 mx-auto mb-2 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
              <Layers className="w-5 h-5" />
            </div>
            <h3 className="text-xs font-bold text-slate-900">
              {lang === 'gu' ? 'બુક બાઇન્ડીંગ' : 'Book Binding'}
            </h3>
            <p className="text-[10px] text-slate-500 font-medium">Hardcover Rexine</p>
          </div>

          <div className="p-3 rounded-2xl bg-[#FAF7F0] hover:bg-white hover:shadow-md transition-all border border-transparent hover:border-[#c9a227]/30">
            <div className="w-10 h-10 mx-auto mb-2 rounded-xl bg-cyan-50 text-cyan-700 flex items-center justify-center">
              <Truck className="w-5 h-5" />
            </div>
            <h3 className="text-xs font-bold text-slate-900">
              {lang === 'gu' ? 'ટ્રાન્સપોર્ટ ડિલિવરી' : 'Transport Delivery'}
            </h3>
            <p className="text-[10px] text-slate-500 font-medium">Vadodara Dispatch</p>
          </div>
        </div>
      </section>

      {/* 4. ASYMMETRIC SERVICES CATALOGUE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4 border-b border-[#c9a227]/30 pb-4">
          <div>
            <span className="text-xs font-bold tracking-widest text-[#9e7a17] uppercase font-mono">
              {lang === 'gu' ? 'અમારી સેવાઓ' : 'Our Specialized Capabilities'}
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#101B36] font-serif mt-1">
              {lang === 'gu' ? 'લોકપ્રિય પ્રિન્ટીંગ અને કંકોત્રી સેવાઓ' : 'Featured Print & Stationery Services'}
            </h2>
          </div>

          <div className="flex flex-wrap gap-1.5 bg-white p-1.5 rounded-2xl border border-slate-200 text-xs font-semibold shadow-sm">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-3 py-1.5 rounded-xl transition-all ${
                activeTab === 'all'
                  ? 'bg-[#101B36] text-white shadow-sm'
                  : 'text-slate-700 hover:text-slate-950'
              }`}
            >
              {lang === 'gu' ? 'બધી સેવાઓ' : 'All'}
            </button>
            <button
              onClick={() => setActiveTab('invitation')}
              className={`px-3 py-1.5 rounded-xl transition-all ${
                activeTab === 'invitation'
                  ? 'bg-[#101B36] text-white shadow-sm'
                  : 'text-slate-700 hover:text-slate-950'
              }`}
            >
              {lang === 'gu' ? 'કંકોત્રી' : 'Kankotri & Invites'}
            </button>
            <button
              onClick={() => setActiveTab('commercial')}
              className={`px-3 py-1.5 rounded-xl transition-all ${
                activeTab === 'commercial'
                  ? 'bg-[#101B36] text-white shadow-sm'
                  : 'text-slate-700 hover:text-slate-950'
              }`}
            >
              {lang === 'gu' ? 'કોમર્શિયલ' : 'Commercial'}
            </button>
            <button
              onClick={() => setActiveTab('printing')}
              className={`px-3 py-1.5 rounded-xl transition-all ${
                activeTab === 'printing'
                  ? 'bg-[#101B36] text-white shadow-sm'
                  : 'text-slate-700 hover:text-slate-950'
              }`}
            >
              {lang === 'gu' ? 'પ્રિન્ટીંગ' : 'Offset / Screen'}
            </button>
            <button
              onClick={() => setActiveTab('binding')}
              className={`px-3 py-1.5 rounded-xl transition-all ${
                activeTab === 'binding'
                  ? 'bg-[#101B36] text-white shadow-sm'
                  : 'text-slate-700 hover:text-slate-950'
              }`}
            >
              {lang === 'gu' ? 'બાઇન્ડીંગ' : 'Binding'}
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredServices.map((service) => (
            <div
              key={service.id}
              className="bg-white rounded-3xl border border-[#c9a227]/25 shadow-sm hover:shadow-xl hover:border-[#c9a227] transition-all duration-300 flex flex-col justify-between overflow-hidden group premium-card"
            >
              <div className="p-6 space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <span className="text-[10px] font-bold px-2.5 py-1 rounded-md bg-[#FAF7F0] text-[#9e7a17] border border-[#c9a227]/30 uppercase font-mono">
                    {lang === 'gu' ? service.categoryLabelGu : service.categoryLabel}
                  </span>
                  {service.popular && (
                    <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-[#c9a227]/15 text-[#9e7a17]">
                      ★ Featured
                    </span>
                  )}
                </div>

                <h3 className="font-extrabold text-base text-[#101B36] group-hover:text-[#214E9A] transition-colors leading-snug font-serif">
                  {lang === 'gu' ? service.titleGu : service.title}
                </h3>

                <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed font-light">
                  {lang === 'gu' ? service.descriptionGu : service.description}
                </p>

                <div className="space-y-1.5 pt-2 border-t border-slate-100">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    {lang === 'gu' ? 'ખાસિયતો:' : 'Highlights:'}
                  </span>
                  <ul className="text-xs text-slate-700 space-y-1">
                    {(lang === 'gu' ? service.featuresGu : service.features).slice(0, 2).map((feat, idx) => (
                      <li key={idx} className="flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#c9a227] flex-shrink-0"></span>
                        <span className="truncate">{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="p-4 bg-[#FAF7F0] border-t border-[#c9a227]/20 flex items-center justify-between gap-2">
                <button
                  onClick={() => onSelectService(service)}
                  className="text-xs font-bold text-[#101B36] hover:text-[#214E9A] flex items-center gap-1 group-hover:underline"
                >
                  <span>{lang === 'gu' ? 'વિગત જુઓ' : 'View Service'}</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>

                <button
                  onClick={() => {
                    onSelectService(service);
                    navigate('quote');
                  }}
                  className="px-3 py-1.5 bg-[#101B36] hover:bg-[#214E9A] text-white rounded-xl text-xs font-bold transition-all shadow-sm"
                >
                  {lang === 'gu' ? 'ભાવપત્રક' : 'Get Quote'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. INVITATION & KANKOTRI SHOWCASE */}
      <section className="bg-gradient-to-br from-[#101B36] via-[#17254a] to-[#0a1124] text-white py-16 px-4 sm:px-6 lg:px-8 rounded-3xl max-w-7xl mx-auto border border-[#c9a227]/40 shadow-2xl relative overflow-hidden space-y-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-rose-600/90 text-white rounded-full text-xs font-bold font-mono">
              <Percent className="w-3.5 h-3.5" />
              <span>50% OFF • Album Collection</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold font-serif">
              {lang === 'gu' ? 'કંકોત્રી અને આમંત્રણ પત્રિકા સંગ્રહ' : 'Kankotri & Invitation Card Collection'}
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl font-light leading-relaxed">
              {lang === 'gu'
                ? 'અમારી કંકોત્રી અને આમંત્રણ કાર્ડ ડિઝાઈન્સની એક ઝાંખી જુઓ. અમારી દુકાનમાં ફિઝિકલ આલ્બમમાં ઘણી બધી વધુ ડિઝાઈન્સ ઉપલબ્ધ છે.'
                : 'Explore a selection of our Kankotri and Invitation Card designs. We have many more designs available in our physical albums at the shop.'}
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => navigate('contact')}
              className="px-4 py-2.5 bg-gradient-to-r from-[#c9a227] to-[#dfba47] text-[#101B36] font-extrabold rounded-xl text-xs shadow transition-all flex items-center gap-1.5"
            >
              <span>{lang === 'gu' ? 'અમારી મુલાકાત લો' : 'Visit Us'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
            <a
              href={generateWhatsAppUrl(
                BUSINESS_INFO.whatsapp,
                'Hello Dhanlaxmi Printing Press, I would like to see more Kankotri and Invitation Card designs from your album collection.'
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl text-xs flex items-center gap-1.5 shadow transition-all"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>{lang === 'gu' ? 'WhatsApp' : 'Contact on WhatsApp'}</span>
            </a>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {ALBUM_COLLECTION_ITEMS.slice(0, 4).map((item) => (
            <div
              key={item.id}
              onClick={() => navigate('invitation-kankotri')}
              className="bg-[#0a1124]/90 rounded-3xl p-5 border border-[#c9a227]/30 hover:border-[#c9a227] cursor-pointer transition-all hover:scale-[1.02] flex flex-col justify-between group space-y-4 relative"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-rose-600 text-white font-mono">
                    50% OFF
                  </span>
                  <span className="text-[10px] text-slate-400 font-mono">{item.code}</span>
                </div>
                <h3 className="font-bold text-sm text-white group-hover:text-[#dfba47] transition-colors font-serif">
                  {lang === 'gu' ? item.titleGu : item.title}
                </h3>
                <p className="text-xs text-slate-300 line-clamp-3 leading-relaxed font-light">
                  {lang === 'gu' ? item.descriptionGu : item.description}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-700/60 flex items-center justify-between text-xs text-[#dfba47] font-semibold">
                <span>{item.categoryLabel}</span>
                <span className="text-slate-400 group-hover:text-white transition-colors">Details →</span>
              </div>
            </div>
          ))}
        </div>

        {/* Note below displayed designs */}
        <div className="bg-[#0a1124]/80 rounded-2xl p-4 border border-[#c9a227]/20 text-center text-xs text-slate-300 font-light">
          {lang === 'gu'
            ? 'વધુ ડિઝાઈન્સ અમારા આલ્બમમાં ઉપલબ્ધ છે. અમારી દુકાનની મુલાકાત લો અથવા વધુ વિકલ્પો જોવા માટે WhatsApp પર સંપર્ક કરો.'
            : 'More designs are available in our albums. Visit our shop or contact us to explore more options.'}
        </div>
      </section>

      {/* 6. TIMELINE WORKFLOW */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
          <span className="text-xs font-bold tracking-widest text-[#9e7a17] uppercase font-mono">
            {lang === 'gu' ? 'કામ કરવાની પદ્ધતિ' : 'The Print Journey'}
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#101B36] font-serif">
            {lang === 'gu' ? 'તમારા ઓર્ડરની ૬ સરળ પ્રક્રિયા' : 'Our 6-Step Precision Workflow'}
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 font-light">
            Clear proofing, transparent communication, and verified quality checks at every step.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {WORKFLOW_STEPS.map((step) => (
            <div
              key={step.step}
              className="bg-white p-6 rounded-3xl border border-[#c9a227]/25 shadow-sm relative overflow-hidden group hover:border-[#c9a227] transition-all"
            >
              <div className="absolute top-3 right-4 text-4xl font-extrabold text-slate-100 group-hover:text-[#c9a227]/10 transition-colors font-mono">
                0{step.step}
              </div>
              <div className="relative z-10 space-y-3">
                <div className="w-10 h-10 rounded-2xl bg-[#101B36] text-[#dfba47] flex items-center justify-center font-bold text-xs shadow">
                  0{step.step}
                </div>
                <h3 className="font-extrabold text-base text-[#101B36] font-serif">
                  {lang === 'gu' ? step.titleGu : step.title}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed font-light">
                  {lang === 'gu' ? step.descGu : step.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 7. CONTACT CTA SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-[#101B36] via-[#17254a] to-[#101B36] text-white rounded-3xl p-8 sm:p-12 shadow-2xl text-center space-y-6 border border-[#c9a227]/40 relative overflow-hidden">
          <div className="max-w-2xl mx-auto space-y-3 relative z-10">
            <span className="text-xs font-bold tracking-widest text-[#dfba47] uppercase font-mono">
              {lang === 'gu' ? 'પ્રિન્ટીંગની જરૂરિયાત છે?' : 'Ready to Start Your Order?'}
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold font-serif">
              {lang === 'gu'
                ? 'ચાલો તમારી પ્રિન્ટીંગ જરૂરિયાત વિશે વિગતવાર વાત કરીએ.'
                : '“Need Printing? Let’s Discuss Your Requirement.”'}
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 font-light">
              Call directly, send a WhatsApp message, or submit an online quotation inquiry. Our Vadodara press team will assist you.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 relative z-10 pt-2">
            <a
              href={generateCallUrl(BUSINESS_INFO.phone)}
              className="px-6 py-3.5 bg-[#0a1124] hover:bg-slate-900 text-white font-bold rounded-xl text-xs sm:text-sm flex items-center gap-2 border border-[#c9a227]/40 shadow-md transition-all font-mono"
            >
              <Phone className="w-4 h-4 text-sky-400" />
              <span>Call: 98254 50176</span>
            </a>

            <a
              href={generateWhatsAppUrl(
                BUSINESS_INFO.whatsapp,
                'Hello Dhanlaxmi Printing Press, I would like to get a quote for my printing requirement.'
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl text-xs sm:text-sm flex items-center gap-2 shadow-lg transition-all"
            >
              <MessageCircle className="w-4 h-4" />
              <span>{lang === 'gu' ? 'વોટ્સએપ પર વાત કરો' : 'WhatsApp Us'}</span>
            </a>

            <button
              onClick={() => navigate('quote')}
              className="px-6 py-3.5 bg-gradient-to-r from-[#c9a227] to-[#dfba47] text-[#101B36] font-extrabold rounded-xl text-xs sm:text-sm flex items-center gap-2 shadow-md transition-all"
            >
              <span>{lang === 'gu' ? 'ઓનલાઇન ભાવપત્રક મેળવો' : 'Request a Quote'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
