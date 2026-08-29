import React from 'react';
import { Phone, Mail, MapPin, MessageCircle, ArrowUp, Clock, Search, Lock, Tag } from 'lucide-react';
import { BUSINESS_INFO, Language } from '../data/content';
import { generateCallUrl, generateWhatsAppUrl } from '../utils/storage';

interface FooterProps {
  navigate: (route: string) => void;
  lang: Language;
}

export const Footer: React.FC<FooterProps> = ({ navigate, lang }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNav = (route: string) => {
    navigate(route);
    scrollToTop();
  };

  return (
    <footer className="bg-[#0A1124] text-slate-300 pt-14 pb-8 border-t-4 border-[#c9a227]">
      {/* CMYK Precision Line */}
      <div className="h-1 w-full -mt-14 mb-14 bg-gradient-to-r from-[#00aeef] via-[#ec008c] via-[#fff200] to-[#231f20]"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Col 1: Brand & Logo */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-14 h-14 bg-white rounded-full p-0.5 border-2 border-[#c9a227] flex-shrink-0 shadow">
                <img
                  src="/logo.png"
                  alt="Dhanlaxmi Printing Press Logo"
                  className="w-full h-full object-contain rounded-full"
                />
              </div>
              <div>
                <h3 className="text-white font-extrabold text-base tracking-tight uppercase font-serif">
                  {lang === 'gu' ? BUSINESS_INFO.nameGu : BUSINESS_INFO.name}
                </h3>
                <p className="text-[#dfba47] text-xs font-semibold font-mono">
                  {lang === 'gu' ? 'વડોદરા - ગુજરાત' : 'Vadodara, Gujarat'}
                </p>
              </div>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed font-light">
              {lang === 'gu'
                ? 'સંપૂર્ણ પ્રિન્ટીંગ, કંકોત્રી, ડીટીપી, ડિઝાઇન, બાઇન્ડીંગ અને ડિલિવરી સોલ્યુશન્સ. તમારા વિચારથી લઈને તૈયાર પ્રિન્ટ સુધીની ગુણવત્તાયુક્ત સેવા.'
                : 'Complete printing, invitation cards, kankotri, DTP composing, multi-color offset printing, book binding, and transport delivery solutions in Vadodara.'}
            </p>

            {/* Direct Connect Buttons */}
            <div className="pt-2 flex flex-wrap gap-2">
              <a
                href={generateCallUrl(BUSINESS_INFO.phone)}
                className="px-3 py-1.5 bg-[#101B36] hover:bg-[#214E9A] text-white rounded-lg text-xs font-bold flex items-center gap-1.5 border border-[#c9a227]/40"
              >
                <Phone className="w-3.5 h-3.5 text-sky-400" />
                <span>Call Directly</span>
              </a>
              <a
                href={generateWhatsAppUrl(
                  BUSINESS_INFO.whatsapp,
                  'Hello Dhanlaxmi Printing Press, I would like to inquire about printing.'
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 bg-emerald-700 hover:bg-emerald-600 text-white rounded-lg text-xs font-bold flex items-center gap-1.5"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>WhatsApp</span>
              </a>
            </div>
          </div>

          {/* Col 2: Quick Links & Tracking */}
          <div>
            <h4 className="text-white font-bold text-sm tracking-wider uppercase mb-4 border-b border-slate-800 pb-2 text-[#dfba47] font-mono">
              {lang === 'gu' ? 'મહત્વપૂર્ણ લિંક્સ' : 'Quick Navigation'}
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => handleNav('home')}
                  className="hover:text-[#dfba47] transition-colors text-left"
                >
                  → {lang === 'gu' ? 'હોમ પેજ' : 'Home'}
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('about')}
                  className="hover:text-[#dfba47] transition-colors text-left"
                >
                  → {lang === 'gu' ? 'અમારા વિશે' : 'About Us'}
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('our-work')}
                  className="hover:text-[#dfba47] transition-colors text-left font-bold text-[#dfba47] flex items-center gap-1"
                >
                  <Tag className="w-3.5 h-3.5" />
                  <span>{lang === 'gu' ? 'અમારું કામ (Our Work)' : 'Our Work Showcase'}</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('invitation-kankotri')}
                  className="hover:text-rose-400 transition-colors text-left font-semibold text-rose-300 flex items-center gap-1"
                >
                  <Tag className="w-3 h-3 text-rose-400" />
                  <span>{lang === 'gu' ? 'આલ્બમ કંકોત્રી (૫૦% છૂટ)' : 'Album Kankotri (50% OFF)'}</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('quote')}
                  className="hover:text-[#dfba47] transition-colors text-left font-semibold text-amber-300"
                >
                  → {lang === 'gu' ? 'ઓનલાઇન ભાવપત્રક મેળવો' : 'Request a Quote'}
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('track-quote')}
                  className="hover:text-cyan-300 transition-colors text-left font-bold text-cyan-400 flex items-center gap-1"
                >
                  <Search className="w-3.5 h-3.5" />
                  <span>{lang === 'gu' ? 'તમારું ભાવપત્રક તપાસો (Track Quote)' : 'Track Your Requested Quote'}</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('contact')}
                  className="hover:text-[#dfba47] transition-colors text-left"
                >
                  → {lang === 'gu' ? 'સંપર્ક અને સરનામું' : 'Contact & Location'}
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('admin')}
                  className="text-slate-600 hover:text-slate-400 transition-colors text-left text-[11px] pt-1 flex items-center gap-1"
                  aria-label="Staff Login"
                >
                  <Lock className="w-3 h-3 text-slate-600" />
                  <span>Staff Portal</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Key Services */}
          <div>
            <h4 className="text-white font-bold text-sm tracking-wider uppercase mb-4 border-b border-slate-800 pb-2 text-[#dfba47] font-mono">
              {lang === 'gu' ? 'અમારી મુખ્ય સેવાઓ' : 'Core Services'}
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => handleNav('invitation-kankotri')}
                  className="hover:text-[#dfba47] transition-colors text-left"
                >
                  • {lang === 'gu' ? 'લગ્ન કંકોત્રી અને આમંત્રણ પત્રિકા' : 'Wedding Kankotri & Invitations'}
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('commercial-printing')}
                  className="hover:text-[#dfba47] transition-colors text-left"
                >
                  • {lang === 'gu' ? 'બિલ બુક, બિલ્ટી બુક, ચલણ' : 'Bill Books, Bilty & L.R. Books'}
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('commercial-printing')}
                  className="hover:text-[#dfba47] transition-colors text-left"
                >
                  • {lang === 'gu' ? 'વિઝિટિંગ કાર્ડ, લેટરપેડ, સ્ટીકર્સ' : 'Visiting Cards & Letterheads'}
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('dtp-design')}
                  className="hover:text-[#dfba47] transition-colors text-left"
                >
                  • {lang === 'gu' ? 'DTP કમ્પોઝિંગ અને ડિઝાઈનિંગ' : 'Gujarati & English DTP Composing'}
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('printing-services')}
                  className="hover:text-[#dfba47] transition-colors text-left"
                >
                  • {lang === 'gu' ? 'ઓફસેટ અને મલ્ટી-કલર પ્રિન્ટીંગ' : 'Offset & Multi-Color Printing'}
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('book-binding')}
                  className="hover:text-[#dfba47] transition-colors text-left"
                >
                  • {lang === 'gu' ? 'બુક બાઇન્ડીંગ અને ખાતાવહી રજીસ્ટર' : 'Hardcover Book Binding & Registers'}
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('transport-delivery')}
                  className="hover:text-[#dfba47] transition-colors text-left"
                >
                  • {lang === 'gu' ? 'ટ્રાન્સપોર્ટ અને ડિલિવરી સહાય' : 'Transport & Delivery Assistance'}
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Official Contact & Address */}
          <div className="space-y-3">
            <h4 className="text-white font-bold text-sm tracking-wider uppercase mb-4 border-b border-slate-800 pb-2 text-[#dfba47] font-mono">
              {lang === 'gu' ? 'સરનામું અને સંપર્ક' : 'Visit & Contact Us'}
            </h4>

            <div className="flex items-start space-x-2.5 text-xs text-slate-300">
              <MapPin className="w-4 h-4 text-[#dfba47] flex-shrink-0 mt-0.5" />
              <span className="leading-relaxed font-light">
                {lang === 'gu' ? BUSINESS_INFO.addressGu : BUSINESS_INFO.address}
              </span>
            </div>

            <div className="flex items-center space-x-2.5 text-xs text-slate-300">
              <Phone className="w-4 h-4 text-sky-400 flex-shrink-0" />
              <a
                href={generateCallUrl(BUSINESS_INFO.phone)}
                className="hover:text-[#dfba47] font-semibold transition-colors font-mono"
              >
                +91 98254 50176 (Direct Call)
              </a>
            </div>

            <div className="flex items-center space-x-2.5 text-xs text-slate-300">
              <MessageCircle className="w-4 h-4 text-emerald-400 flex-shrink-0" />
              <a
                href={generateWhatsAppUrl(
                  BUSINESS_INFO.whatsapp,
                  'Hello Dhanlaxmi Printing Press, I would like to enquire about printing.'
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-emerald-400 font-semibold transition-colors font-mono"
              >
                +91 98254 50176 (WhatsApp)
              </a>
            </div>

            <div className="flex items-center space-x-2.5 text-xs text-slate-300 truncate">
              <Mail className="w-4 h-4 text-rose-400 flex-shrink-0" />
              <a
                href={`mailto:${BUSINESS_INFO.email}`}
                className="hover:text-[#dfba47] transition-colors truncate font-light"
              >
                {BUSINESS_INFO.email}
              </a>
            </div>

            <div className="flex items-center space-x-2.5 text-xs text-slate-400 pt-1">
              <Clock className="w-4 h-4 text-slate-400 flex-shrink-0" />
              <span>{lang === 'gu' ? BUSINESS_INFO.hoursGu : BUSINESS_INFO.hours}</span>
            </div>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="pt-8 mt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>
            © Dhanlaxmi Printing Press, Vadodara. All Rights Reserved.
          </p>

          <div className="flex items-center space-x-4">
            <span className="text-slate-400 font-light">
              {lang === 'gu' ? 'સંપૂર્ણ પ્રિન્ટીંગ સોલ્યુશન્સ' : 'Precision Quality Printing'}
            </span>
            <button
              onClick={scrollToTop}
              className="p-2 rounded-lg bg-slate-800 text-slate-300 hover:bg-[#c9a227] hover:text-slate-950 transition-all flex items-center gap-1 font-semibold"
              title="Back to Top"
            >
              <ArrowUp className="w-3.5 h-3.5" />
              <span className="text-[11px]">{lang === 'gu' ? 'ટોપ' : 'Top'}</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
