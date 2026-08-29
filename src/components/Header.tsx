import React, { useState, useEffect } from 'react';
import { Phone, MessageCircle, MapPin, Clock, ChevronDown, Sparkles } from 'lucide-react';
import { BUSINESS_INFO, Language } from '../data/content';
import { generateWhatsAppUrl, generateCallUrl } from '../utils/storage';

interface HeaderProps {
  currentRoute: string;
  navigate: (route: string) => void;
  lang: Language;
  setLang: (l: Language) => void;
}

export const Header: React.FC<HeaderProps> = ({ currentRoute, navigate, lang, setLang }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { route: 'home', label: 'Home', labelGu: 'હોમ' },
    { route: 'about', label: 'About Us', labelGu: 'અમારા વિશે' },
    {
      route: 'services',
      label: 'Services',
      labelGu: 'સેવાઓ',
      isDropdown: true,
      subItems: [
        { route: 'services', label: 'All Services Overview', labelGu: 'તમામ સેવાઓ' },
        { route: 'invitation-kankotri', label: 'Invitation & Kankotri', labelGu: 'કંકોત્રી અને આમંત્રણ' },
        { route: 'commercial-printing', label: 'Commercial Printing', labelGu: 'કોમર્શિયલ પ્રિન્ટીંગ' },
        { route: 'dtp-design', label: 'DTP & Design', labelGu: 'ડીટીપી અને ડિઝાઇન' },
        { route: 'printing-services', label: 'Printing Services', labelGu: 'ઓફસેટ / સ્ક્રીન પ્રિન્ટીંગ' },
        { route: 'book-binding', label: 'Book & Binding', labelGu: 'બુક અને બાઇન્ડીંગ' },
        { route: 'transport-delivery', label: 'Transport & Delivery', labelGu: 'ટ્રાન્સપોર્ટ અને ડિલિવરી' },
      ],
    },
    { route: 'invitation-kankotri', label: 'Kankotri', labelGu: 'કંકોત્રી' },
    { route: 'commercial-printing', label: 'Commercial', labelGu: 'કોમર્શિયલ' },
    { route: 'gallery', label: 'Gallery', labelGu: 'ગેલેરી' },
    { route: 'quote', label: 'Request Quote', labelGu: 'ભાવપત્રક' },
    { route: 'contact', label: 'Contact', labelGu: 'સંપર્ક' },
  ];

  const handleNav = (route: string) => {
    navigate(route);
    setMobileMenuOpen(false);
    setServicesDropdownOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-50 transition-all duration-300">
      {/* CMYK Accent Line on Top */}
      <div className="h-1 w-full bg-gradient-to-r from-[#00aeef] via-[#ec008c] via-[#fff200] to-[#231f20]"></div>

      {/* Top Bar with Gold Trim */}
      <div className="bg-[#101B36] text-slate-300 text-xs py-1.5 px-4 sm:px-8 border-b border-[#c9a227]/20">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center gap-2">
          <div className="flex items-center space-x-4 sm:space-x-6 flex-wrap">
            <span className="flex items-center text-[#c9a227] font-medium tracking-wide">
              <MapPin className="w-3.5 h-3.5 mr-1 inline text-[#c9a227]" />
              <span>{lang === 'gu' ? 'પાણીગેટ, વડોદરા (ગુજરાત)' : 'O/S. Panigate, Vadodara'}</span>
            </span>
            <span className="hidden md:flex items-center text-slate-300 font-light">
              <Clock className="w-3.5 h-3.5 mr-1 text-[#c9a227]/70" />
              <span>{lang === 'gu' ? BUSINESS_INFO.hoursGu : BUSINESS_INFO.hours}</span>
            </span>
          </div>

          <div className="flex items-center space-x-3 sm:space-x-4">
            {/* Direct Calling Link */}
            <a
              href={generateCallUrl(BUSINESS_INFO.phone)}
              className="flex items-center bg-[#214E9A]/40 hover:bg-[#214E9A] text-slate-100 px-2.5 py-0.5 rounded-md transition-all border border-[#214E9A]/80 font-mono font-semibold"
              title="Call Dhanlaxmi Printing Press Directly"
            >
              <Phone className="w-3 h-3 mr-1 text-[#c9a227] animate-pulse" />
              <span>98254 50176</span>
            </a>

            <div className="h-3 w-px bg-slate-700"></div>

            {/* Language Switcher */}
            <div className="flex items-center bg-[#0a1124] rounded-lg p-0.5 border border-[#c9a227]/30 shadow-inner">
              <button
                onClick={() => setLang('en')}
                className={`px-2 py-0.5 rounded text-[11px] font-semibold transition-all ${
                  lang === 'en'
                    ? 'bg-[#c9a227] text-[#101B36] font-bold shadow-sm'
                    : 'text-slate-300 hover:text-white'
                }`}
                title="English"
              >
                ENG
              </button>
              <button
                onClick={() => setLang('gu')}
                className={`px-2 py-0.5 rounded text-[11px] font-semibold font-gujarati transition-all ${
                  lang === 'gu'
                    ? 'bg-[#c9a227] text-[#101B36] font-bold shadow-sm'
                    : 'text-slate-300 hover:text-white'
                }`}
                title="ગુજરાતી"
              >
                ગુજરાતી
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div
        className={`transition-all duration-300 ${
          isScrolled
            ? 'bg-white/95 backdrop-blur-md shadow-lg border-b border-slate-200/80 py-2'
            : 'bg-[#FAF7F0] border-b border-[#c9a227]/20 py-3'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo & Brand Identity */}
            <div
              onClick={() => handleNav('home')}
              className="flex items-center space-x-3 cursor-pointer group select-none"
            >
              <div className="relative w-13 h-13 sm:w-15 sm:h-15 flex-shrink-0 bg-white rounded-full p-0.5 shadow-md border-2 border-[#c9a227]/70 group-hover:border-[#c9a227] transition-all">
                <img
                  src="/logo.png"
                  alt="Dhanlaxmi Printing Press Official Logo"
                  className="w-full h-full object-contain rounded-full"
                />
              </div>
              <div className="flex flex-col">
                <span className="text-base sm:text-lg font-extrabold tracking-tight text-[#101B36] group-hover:text-[#214E9A] transition-colors uppercase leading-tight font-serif">
                  {lang === 'gu' ? BUSINESS_INFO.nameGu : 'DHANLAXMI'}
                </span>
                <span className="text-[10px] sm:text-xs font-bold text-[#c9a227] tracking-widest uppercase">
                  {lang === 'gu' ? 'પ્રિન્ટીંગ પ્રેસ • વડોદરા' : 'PRINTING PRESS • VADODARA'}
                </span>
              </div>
            </div>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center space-x-1 font-medium text-xs text-slate-700">
              <button
                onClick={() => handleNav('home')}
                className={`px-3 py-2 rounded-lg transition-all ${
                  currentRoute === 'home'
                    ? 'text-[#101B36] font-bold bg-[#FAF7F0] shadow-sm border border-[#c9a227]/40'
                    : 'hover:text-[#214E9A] hover:bg-white/60'
                }`}
              >
                {lang === 'gu' ? 'હોમ' : 'Home'}
              </button>

              <button
                onClick={() => handleNav('about')}
                className={`px-3 py-2 rounded-lg transition-all ${
                  currentRoute === 'about'
                    ? 'text-[#101B36] font-bold bg-[#FAF7F0] shadow-sm border border-[#c9a227]/40'
                    : 'hover:text-[#214E9A] hover:bg-white/60'
                }`}
              >
                {lang === 'gu' ? 'અમારા વિશે' : 'About'}
              </button>

              {/* Services Dropdown */}
              <div
                className="relative"
                onMouseEnter={() => setServicesDropdownOpen(true)}
                onMouseLeave={() => setServicesDropdownOpen(false)}
              >
                <button
                  onClick={() => handleNav('services')}
                  className={`px-3 py-2 rounded-lg flex items-center gap-1 transition-all ${
                    [
                      'services',
                      'invitation-kankotri',
                      'commercial-printing',
                      'dtp-design',
                      'printing-services',
                      'book-binding',
                      'transport-delivery',
                    ].includes(currentRoute)
                      ? 'text-[#101B36] font-bold bg-[#FAF7F0] shadow-sm border border-[#c9a227]/40'
                      : 'hover:text-[#214E9A] hover:bg-white/60'
                  }`}
                >
                  <span>{lang === 'gu' ? 'સેવાઓ' : 'Services'}</span>
                  <ChevronDown
                    className={`w-3.5 h-3.5 transition-transform duration-200 ${
                      servicesDropdownOpen ? 'rotate-180 text-[#c9a227]' : ''
                    }`}
                  />
                </button>

                {servicesDropdownOpen && (
                  <div className="absolute top-full left-0 w-64 bg-white shadow-2xl rounded-2xl border border-[#c9a227]/30 py-2 animate-in fade-in slide-in-from-top-2 duration-150 z-50">
                    <div
                      onClick={() => handleNav('services')}
                      className="px-4 py-2 text-xs font-bold text-[#101B36] bg-[#FAF7F0] hover:bg-[#c9a227]/10 cursor-pointer border-b border-slate-100 flex items-center justify-between"
                    >
                      <span>{lang === 'gu' ? 'તમામ સેવાઓ જુઓ' : 'All Services Overview'}</span>
                      <span className="text-[#c9a227]">→</span>
                    </div>
                    <div
                      onClick={() => handleNav('invitation-kankotri')}
                      className="px-4 py-2.5 text-xs text-slate-700 hover:bg-[#FAF7F0] hover:text-[#101B36] cursor-pointer flex items-center justify-between"
                    >
                      <span>{lang === 'gu' ? 'કંકોત્રી અને આમંત્રણ કાર્ડ' : 'Invitation & Kankotri'}</span>
                      <span className="text-[9px] bg-[#c9a227]/15 text-[#9e7a17] px-1.5 py-0.5 rounded font-bold uppercase">Special</span>
                    </div>
                    <div
                      onClick={() => handleNav('commercial-printing')}
                      className="px-4 py-2.5 text-xs text-slate-700 hover:bg-[#FAF7F0] hover:text-[#101B36] cursor-pointer"
                    >
                      {lang === 'gu' ? 'કોમર્શિયલ પ્રિન્ટીંગ (બિલ બુક, વગેરે)' : 'Commercial Printing'}
                    </div>
                    <div
                      onClick={() => handleNav('dtp-design')}
                      className="px-4 py-2.5 text-xs text-slate-700 hover:bg-[#FAF7F0] hover:text-[#101B36] cursor-pointer"
                    >
                      {lang === 'gu' ? 'DTP અને ગુજરાતી કમ્પોઝિંગ' : 'DTP & Layout Design'}
                    </div>
                    <div
                      onClick={() => handleNav('printing-services')}
                      className="px-4 py-2.5 text-xs text-slate-700 hover:bg-[#FAF7F0] hover:text-[#101B36] cursor-pointer"
                    >
                      {lang === 'gu' ? 'ઓફસેટ અને સ્ક્રીન પ્રિન્ટીંગ' : 'Offset & Screen Printing'}
                    </div>
                    <div
                      onClick={() => handleNav('book-binding')}
                      className="px-4 py-2.5 text-xs text-slate-700 hover:bg-[#FAF7F0] hover:text-[#101B36] cursor-pointer"
                    >
                      {lang === 'gu' ? 'બુક બાઇન્ડીંગ અને રજીસ્ટર' : 'Book & Binding Works'}
                    </div>
                    <div
                      onClick={() => handleNav('transport-delivery')}
                      className="px-4 py-2.5 text-xs text-slate-700 hover:bg-[#FAF7F0] hover:text-[#101B36] cursor-pointer"
                    >
                      {lang === 'gu' ? 'ટ્રાન્સપોર્ટ અને ડિલિવરી સપોર્ટ' : 'Transport & Delivery'}
                    </div>
                  </div>
                )}
              </div>

              <button
                onClick={() => handleNav('invitation-kankotri')}
                className={`px-3 py-2 rounded-lg transition-all ${
                  currentRoute === 'invitation-kankotri'
                    ? 'text-[#101B36] font-bold bg-[#FAF7F0] shadow-sm border border-[#c9a227]/40'
                    : 'hover:text-[#214E9A] hover:bg-white/60'
                }`}
              >
                {lang === 'gu' ? 'કંકોત્રી' : 'Kankotri'}
              </button>

              <button
                onClick={() => handleNav('commercial-printing')}
                className={`px-3 py-2 rounded-lg transition-all ${
                  currentRoute === 'commercial-printing'
                    ? 'text-[#101B36] font-bold bg-[#FAF7F0] shadow-sm border border-[#c9a227]/40'
                    : 'hover:text-[#214E9A] hover:bg-white/60'
                }`}
              >
                {lang === 'gu' ? 'કોમર્શિયલ' : 'Commercial'}
              </button>

              <button
                onClick={() => handleNav('gallery')}
                className={`px-3 py-2 rounded-lg transition-all ${
                  currentRoute === 'gallery'
                    ? 'text-[#101B36] font-bold bg-[#FAF7F0] shadow-sm border border-[#c9a227]/40'
                    : 'hover:text-[#214E9A] hover:bg-white/60'
                }`}
              >
                {lang === 'gu' ? 'ગેલેરી' : 'Gallery'}
              </button>

              <button
                onClick={() => handleNav('contact')}
                className={`px-3 py-2 rounded-lg transition-all ${
                  currentRoute === 'contact'
                    ? 'text-[#101B36] font-bold bg-[#FAF7F0] shadow-sm border border-[#c9a227]/40'
                    : 'hover:text-[#214E9A] hover:bg-white/60'
                }`}
              >
                {lang === 'gu' ? 'સંપર્ક' : 'Contact'}
              </button>
            </nav>

            {/* Desktop Right CTAs */}
            <div className="hidden lg:flex items-center space-x-2.5">
              <a
                href={generateWhatsAppUrl(
                  BUSINESS_INFO.whatsapp,
                  'Hello Dhanlaxmi Printing Press, I would like to enquire about your printing services.'
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-3 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-semibold shadow-sm hover:shadow transition-all"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>WhatsApp</span>
              </a>

              <button
                onClick={() => handleNav('quote')}
                className="px-4 py-2 bg-gradient-to-r from-[#c9a227] to-[#dfba47] hover:from-[#dfba47] hover:to-[#c9a227] text-[#101B36] rounded-xl text-xs font-extrabold shadow-md hover:shadow-lg transition-all tracking-wide flex items-center gap-1.5 border border-[#9e7a17]/30"
              >
                <span>{lang === 'gu' ? 'ભાવપત્રક મેળવો' : 'Request Quote'}</span>
                <span>→</span>
              </button>
            </div>

            {/* Mobile Controls */}
            <div className="flex items-center space-x-2 lg:hidden">
              <a
                href={generateCallUrl(BUSINESS_INFO.phone)}
                className="p-2 bg-[#101B36] text-[#c9a227] rounded-xl shadow-sm"
                title="Call"
              >
                <Phone className="w-4 h-4" />
              </a>

              <a
                href={generateWhatsAppUrl(BUSINESS_INFO.whatsapp, 'Hello Dhanlaxmi Printing Press, I want to enquire.')}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-emerald-600 text-white rounded-xl shadow-sm"
                title="WhatsApp"
              >
                <MessageCircle className="w-4 h-4" />
              </a>

              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-xl text-slate-800 bg-white border border-slate-200 focus:outline-none"
                aria-label="Toggle navigation menu"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  {mobileMenuOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Animated Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 px-4 pt-3 pb-6 max-h-[85vh] overflow-y-auto shadow-2xl animate-in slide-in-from-top-2 duration-200">
          <div className="space-y-1.5 py-1">
            {navItems.map((item) => (
              <button
                key={item.route}
                onClick={() => handleNav(item.route)}
                className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-bold flex items-center justify-between ${
                  currentRoute === item.route
                    ? 'bg-[#FAF7F0] text-[#101B36] border border-[#c9a227]/40'
                    : 'text-slate-800 hover:bg-slate-50'
                }`}
              >
                <span>{lang === 'gu' ? item.labelGu : item.label}</span>
              </button>
            ))}

            <div className="pt-3 border-t border-slate-100 flex gap-2">
              <button
                onClick={() => handleNav('quote')}
                className="flex-1 py-2.5 bg-gradient-to-r from-[#c9a227] to-[#dfba47] text-[#101B36] font-extrabold rounded-xl text-xs text-center shadow"
              >
                {lang === 'gu' ? 'ભાવપત્રક મેળવો' : 'Request Quote'}
              </button>
              <button
                onClick={() => handleNav('track-quote')}
                className="flex-1 py-2.5 bg-slate-100 text-slate-800 font-bold rounded-xl text-xs text-center border border-slate-200"
              >
                {lang === 'gu' ? 'સ્ટેટસ ટ્રેક કરો' : 'Track Quote'}
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
