import React from 'react';
import {
  MapPin,
  Phone,
  Mail,
  MessageCircle,
  Clock,
  CheckCircle2,
  Shield,
  HeartHandshake,
  ArrowRight,
  Sparkles,
  Tag,
  Printer,
  Layers,
  Truck,
  FileEdit,
} from 'lucide-react';
import {
  BUSINESS_INFO,
  Language,
  OUR_WORK_ITEMS,
  ALBUM_COLLECTION_ITEMS,
} from '../data/content';
import { generateWhatsAppUrl, generateCallUrl } from '../utils/storage';

interface AboutPageProps {
  navigate: (route: string) => void;
  lang: Language;
}

export const AboutPage: React.FC<AboutPageProps> = ({ navigate, lang }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16">
      {/* 1. HEADER BANNER */}
      <div className="bg-[#101B36] text-white rounded-3xl p-8 sm:p-12 shadow-xl border border-[#c9a227]/40 space-y-4 relative overflow-hidden">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-[#c9a227]/20 text-[#dfba47] rounded-full text-xs font-semibold font-mono">
          <Sparkles className="w-3.5 h-3.5" />
          <span>{lang === 'gu' ? 'પ્રામાણિક અને ગુણવત્તાયુક્ત સેવા' : 'About Dhanlaxmi Printing Press'}</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold font-serif">
          {lang === 'gu' ? 'અમારા વિશે — ધનલક્ષ્મી પ્રિન્ટીંગ પ્રેસ' : 'About Dhanlaxmi Printing Press'}
        </h1>
        <p className="text-xs sm:text-sm text-slate-300 max-w-3xl leading-relaxed font-light">
          {lang === 'gu'
            ? 'વડોદરા સ્થિત ધનલક્ષ્મી પ્રિન્ટીંગ પ્રેસ પ્રિન્ટીંગ, કંકોત્રી, ડીટીપી, બાઈન્ડિંગ અને ડિલિવરી ક્ષેત્રે સંપૂર્ણ સેવાઓ પૂરી પાડે છે.'
            : 'Dhanlaxmi Printing Press is a dedicated commercial and invitation printing house located at Panigate in Vadodara, Gujarat. We combine time-honored Indian craft with modern multi-color offset and DTP technology.'}
        </p>
      </div>

      {/* 2. SUB-NAVIGATION BAR (About Dhanlaxmi & Our Work) */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-4 bg-white rounded-2xl border border-[#c9a227]/30 shadow-sm">
        <div className="flex items-center space-x-2">
          <span className="text-xs font-bold text-slate-500 uppercase font-mono">Explore Section:</span>
          <span className="text-xs font-extrabold text-[#101B36]">About & Credentials</span>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => navigate('our-work')}
            className="px-4 py-2 bg-gradient-to-r from-[#c9a227] to-[#dfba47] text-[#101B36] font-bold rounded-xl text-xs flex items-center gap-1.5 shadow"
          >
            <span>View All Our Work</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* 3. BUSINESS IDENTITY & ETHOS */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        <div className="lg:col-span-7 space-y-6 text-slate-700 text-xs sm:text-sm leading-relaxed font-light">
          <div className="space-y-3">
            <span className="text-xs font-bold uppercase tracking-widest text-[#9e7a17] font-mono">
              Our Ethos & Precision
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#101B36] font-serif">
              {lang === 'gu' ? 'અમારો મૂળ ઉદ્દેશ અને કાર્યપદ્ધતિ' : 'Our Work & Commitment to Vadodara'}
            </h2>
          </div>

          <p>
            {lang === 'gu'
              ? 'ધનલક્ષ્મી પ્રિન્ટીંગ પ્રેસ ખાતે અમે માનીએ છીએ કે પ્રિન્ટીંગ માત્ર કાગળ પર શાહી છાપવાનું કામ નથી, પરંતુ કોઈપણ પ્રસંગ કે વ્યવસાયની સાચી છાપ ઊભી કરવાનો પાયો છે. લગ્ન જેવા પવિત્ર પ્રસંગની કંકોત્રીથી લઈને વેપારીઓના રોજિંદા ઉપયોગના બિલ બુક અને ઓફિસ રજીસ્ટર સુધી, અમે દરેક કામમાં ગ્રાહકની જરૂરિયાતને પ્રાથમિકતા આપીએ છીએ.'
              : 'At Dhanlaxmi Printing Press, we believe printing is the cornerstone of great communication — whether announcing a once-in-a-lifetime wedding ceremony with sacred shlokas and gold foil, or streamlining everyday business transactions with customized NCR bill books.'}
          </p>

          <p>
            {lang === 'gu'
              ? 'અમારી પાસે ડિઝાઇનિંગ, ગુજરાતી અને અંગ્રેજી ભાષાનું સચોટ DTP કમ્પોઝિંગ, ગ્રાહકની રૂબરૂ કે ઓનલાઇન મંજૂરી બાદ પ્રિન્ટીંગ, હાર્ડકવર ચોપડા બાઇન્ડીંગ અને તૈયાર ઓર્ડરની સલામત ડિલિવરીનો સંપૂર્ણ સેટઅપ ઉપલબ્ધ છે.'
              : 'We manage the complete printing workflow: content drafting, accurate Gujarati & English DTP typesetting, customer proof checks via WhatsApp or in person, press execution, hardbound binding, and transport/delivery support across Vadodara and neighboring areas.'}
          </p>

          {/* Local Cultural Trust Box */}
          <div className="bg-[#FAF7F0] rounded-2xl p-6 border border-[#c9a227]/40 space-y-2">
            <div className="flex items-center gap-2 text-[#101B36] font-bold text-xs font-serif">
              <HeartHandshake className="w-4 h-4 text-[#9e7a17]" />
              <span>સ્થાનિક ગ્રાહકો માટે વિશેષ પરિચય (Local Vadodara Trust)</span>
            </div>
            <p className="text-xs text-slate-700 leading-relaxed font-gujarati">
              ધનલક્ષ્મી પ્રિન્ટીંગ પ્રેસમાં અમે હિન્દુ તેમજ મુસ્લિમ તમામ ધર્મોના રીત-રિવાજોને અનુરૂપ કંકોત્રી તૈયાર કરીએ છીએ. શ્રીમંત વિધિ, મુંડન સંસ્કાર, નવચંડી યજ્ઞ, વાસ્તુ પૂજન, નિકાહ, વલીમા, તેમજ વેપારી ભાઈઓ માટે જીએસટી બિલ બુક, બિલ્ટી બુક અને ચોપડા બાઈન્ડીંગનું કામ સમયસર અને વાજબી ભાવે કરી આપવામાં આવે છે.
            </p>
          </div>
        </div>

        {/* Right Official Card */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-[#c9a227]/30 space-y-6">
            <div className="text-center space-y-3 pb-6 border-b border-slate-100">
              <div className="w-28 h-28 mx-auto bg-white rounded-full p-1 border-2 border-[#c9a227] shadow-md">
                <img
                  src="/logo.png"
                  alt="Dhanlaxmi Printing Press Logo"
                  className="w-full h-full object-contain rounded-full"
                />
              </div>
              <div>
                <h3 className="font-extrabold text-base text-[#101B36] uppercase font-serif">
                  {lang === 'gu' ? BUSINESS_INFO.nameGu : BUSINESS_INFO.name}
                </h3>
                <p className="text-xs text-[#9e7a17] font-semibold font-mono">
                  {lang === 'gu' ? 'પાણીગેટ, વડોદરા - ૨૫' : 'O/S. Panigate, Vadodara-25'}
                </p>
              </div>
            </div>

            <div className="space-y-3 text-xs text-slate-700">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#9e7a17] flex-shrink-0 mt-0.5" />
                <span className="leading-relaxed font-light">
                  {lang === 'gu' ? BUSINESS_INFO.addressGu : BUSINESS_INFO.address}
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-sky-700 flex-shrink-0" />
                <a href={generateCallUrl(BUSINESS_INFO.phone)} className="font-bold text-[#101B36] font-mono">
                  +91 98254 50176
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <MessageCircle className="w-4 h-4 text-emerald-700 flex-shrink-0" />
                <a
                  href={generateWhatsAppUrl(BUSINESS_INFO.whatsapp, 'Hello Dhanlaxmi Printing Press, I want to inquire.')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-bold text-emerald-800 font-mono"
                >
                  +91 98254 50176
                </a>
              </div>
              <div className="flex items-center gap-2.5 truncate">
                <Mail className="w-4 h-4 text-rose-700 flex-shrink-0" />
                <a href={`mailto:${BUSINESS_INFO.email}`} className="truncate font-light text-slate-800">
                  {BUSINESS_INFO.email}
                </a>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-100 flex gap-2">
              <a
                href={generateCallUrl(BUSINESS_INFO.phone)}
                className="flex-1 py-2.5 bg-[#101B36] text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 shadow"
              >
                <Phone className="w-3.5 h-3.5 text-sky-400" />
                <span>Call Press</span>
              </a>
              <button
                onClick={() => navigate('contact')}
                className="flex-1 py-2.5 bg-[#FAF7F0] hover:bg-slate-100 text-[#101B36] rounded-xl text-xs font-bold border border-[#c9a227]/40 transition-all"
              >
                Find on Map
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 4. 50% OFF ALBUM COLLECTION PROMOTION HIGHLIGHT */}
      <div className="bg-gradient-to-r from-rose-950 via-[#101B36] to-amber-950 text-white rounded-3xl p-6 sm:p-10 border-2 border-[#c9a227] shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2 text-center md:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-rose-600 text-white rounded-full text-xs font-extrabold shadow">
            <Tag className="w-3.5 h-3.5" />
            <span>ALBUM COLLECTION OFFER</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold font-serif">
            {lang === 'gu'
              ? 'અમારા આલ્બમ કલેક્શનની દરેક કંકોત્રી પર ૫૦% ની વિશેષ છૂટ'
              : '50% OFF on Every Kankotri & Invitation Card from Our Album Collection'}
          </h2>
          <p className="text-xs text-slate-300 max-w-xl font-light">
            Choose from dozens of traditional Gujarati wedding, Mundan, Shrimant, and Islamic Nikah designs available in our physical album books.
          </p>
        </div>

        <button
          onClick={() => navigate('invitation-kankotri')}
          className="px-6 py-3.5 bg-gradient-to-r from-[#c9a227] to-[#dfba47] text-[#101B36] font-extrabold rounded-xl text-xs sm:text-sm shadow-xl flex items-center gap-2"
        >
          <span>Browse Album Collection (50% OFF)</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* 5. OUR WORK PREVIEW SECTION */}
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 border-b border-[#c9a227]/30 pb-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-[#9e7a17] font-mono">
              Representative Portfolio
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#101B36] font-serif mt-1">
              {lang === 'gu' ? 'અમારા કામની ઝાંખી (Our Work Preview)' : 'Selected Work Highlights'}
            </h2>
          </div>

          <button
            onClick={() => navigate('our-work')}
            className="px-4 py-2 bg-[#101B36] hover:bg-[#214E9A] text-white font-bold rounded-xl text-xs flex items-center gap-1.5 shadow"
          >
            <span>View All Our Work</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {OUR_WORK_ITEMS.slice(0, 4).map((item) => (
            <div
              key={item.id}
              onClick={() => navigate('our-work')}
              className="bg-white rounded-3xl border border-[#c9a227]/30 shadow-sm hover:shadow-xl transition-all p-5 flex flex-col justify-between space-y-4 cursor-pointer group premium-card"
            >
              <div className="space-y-2">
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-[#FAF7F0] text-[#9e7a17] font-mono">
                  {lang === 'gu' ? item.categoryLabelGu : item.categoryLabel}
                </span>
                <h4 className="font-extrabold text-sm text-[#101B36] group-hover:text-[#214E9A] font-serif">
                  {lang === 'gu' ? item.titleGu : item.title}
                </h4>
                <p className="text-xs text-slate-600 line-clamp-2 font-light">
                  {lang === 'gu' ? item.shortDescGu : item.shortDesc}
                </p>
              </div>

              <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-[#9e7a17] font-bold">
                <span>{lang === 'gu' ? item.tagGu : item.tag}</span>
                <span className="text-slate-400 group-hover:text-[#101B36]">Inspect →</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 6. COMPLETE WORKFLOW & PRINTING CAPABILITIES */}
      <div className="bg-white rounded-3xl p-6 sm:p-10 border border-[#c9a227]/30 shadow-xl space-y-6">
        <div className="space-y-1">
          <span className="text-xs font-bold uppercase tracking-widest text-[#9e7a17] font-mono">
            End-to-End Execution
          </span>
          <h3 className="text-xl sm:text-2xl font-extrabold text-[#101B36] font-serif">
            {lang === 'gu' ? 'અમારી સંપૂર્ણ પ્રિન્ટીંગ ક્ષમતા' : 'Complete In-House Capabilities'}
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
          <div className="p-4 bg-[#FAF7F0] rounded-2xl border border-[#c9a227]/20 space-y-1.5">
            <Printer className="w-5 h-5 text-[#214E9A]" />
            <h4 className="font-bold text-[#101B36]">Multi-Color Offset & Screen</h4>
            <p className="text-slate-600 leading-relaxed font-light">
              HD 4-color press printing and metallic gold/silver screen foil printing.
            </p>
          </div>

          <div className="p-4 bg-[#FAF7F0] rounded-2xl border border-[#c9a227]/20 space-y-1.5">
            <FileEdit className="w-5 h-5 text-indigo-700" />
            <h4 className="font-bold text-[#101B36]">Gujarati & English DTP</h4>
            <p className="text-slate-600 leading-relaxed font-light">
              Correct linguistic composing, mantras, poetry, and digital proof checks.
            </p>
          </div>

          <div className="p-4 bg-[#FAF7F0] rounded-2xl border border-[#c9a227]/20 space-y-1.5">
            <Layers className="w-5 h-5 text-emerald-700" />
            <h4 className="font-bold text-[#101B36]">Hardbound Rexine Binding</h4>
            <p className="text-slate-600 leading-relaxed font-light">
              Durable accounting ledger registers, numbering, and gold foil embossing.
            </p>
          </div>

          <div className="p-4 bg-[#FAF7F0] rounded-2xl border border-[#c9a227]/20 space-y-1.5">
            <Truck className="w-5 h-5 text-cyan-700" />
            <h4 className="font-bold text-[#101B36]">Transport & Vadodara Delivery</h4>
            <p className="text-slate-600 leading-relaxed font-light">
              Moisture-proof packing and doorstep delivery or outstation transport dispatch.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
