import React, { useState } from 'react';
import { Search, Filter, MessageCircle, ArrowRight, CheckCircle2, ChevronRight, X } from 'lucide-react';
import { ALL_SERVICES, BUSINESS_INFO, Language, ServiceItem } from '../data/content';
import { generateWhatsAppUrl } from '../utils/storage';

interface ServicesPageProps {
  navigate: (route: string) => void;
  lang: Language;
  onSelectService: (service: ServiceItem) => void;
  initialCategory?: string;
}

export const ServicesPage: React.FC<ServicesPageProps> = ({
  navigate,
  lang,
  onSelectService,
  initialCategory = 'all',
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeModalService, setActiveModalService] = useState<ServiceItem | null>(null);

  const categories = [
    { id: 'all', label: 'All Services', labelGu: 'તમામ સેવાઓ' },
    { id: 'invitation', label: 'Invitation & Kankotri', labelGu: 'કંકોત્રી અને આમંત્રણ' },
    { id: 'commercial', label: 'Commercial Printing', labelGu: 'કોમર્શિયલ પ્રિન્ટીંગ' },
    { id: 'dtp', label: 'DTP & Design', labelGu: 'ડીટીપી અને ડિઝાઇન' },
    { id: 'printing', label: 'Printing Services', labelGu: 'ઓફસેટ / સ્ક્રીન પ્રિન્ટીંગ' },
    { id: 'binding', label: 'Book & Binding', labelGu: 'બુક અને બાઇન્ડીંગ' },
    { id: 'transport', label: 'Transport & Delivery', labelGu: 'ટ્રાન્સપોર્ટ અને ડિલિવરી' },
  ];

  const filtered = ALL_SERVICES.filter((service) => {
    const matchesCategory =
      selectedCategory === 'all' || service.category === selectedCategory;
    const query = searchQuery.toLowerCase().trim();
    if (!query) return matchesCategory;

    const matchesSearch =
      service.title.toLowerCase().includes(query) ||
      service.titleGu.toLowerCase().includes(query) ||
      service.description.toLowerCase().includes(query) ||
      service.descriptionGu.toLowerCase().includes(query) ||
      service.useCases.some((u) => u.toLowerCase().includes(query)) ||
      service.useCasesGu.some((u) => u.toLowerCase().includes(query));

    return matchesCategory && matchesSearch;
  });

  const handleOpenDetail = (s: ServiceItem) => {
    setActiveModalService(s);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-900 to-indigo-950 text-white rounded-3xl p-8 sm:p-10 shadow-xl space-y-3">
        <span className="text-xs font-bold uppercase tracking-widest text-amber-400">
          {lang === 'gu' ? 'અમારી તમામ સેવાઓનું વિસ્તૃત કેટાલોગ' : 'Comprehensive Catalogue'}
        </span>
        <h1 className="text-2xl sm:text-4xl font-extrabold">
          {lang === 'gu' ? 'પ્રિન્ટીંગ, કંકોત્રી અને બાઇન્ડીંગ સેવાઓ' : 'Printing, Invitation & Binding Services'}
        </h1>
        <p className="text-xs sm:text-sm text-slate-300 max-w-3xl leading-relaxed">
          {lang === 'gu'
            ? 'લગ્ન કંકોત્રીથી લઈને ટેક્સ બિલ બુક, ડીટીપી કમ્પોઝિંગ, ઓફસેટ છાપકામ, ચોપડા બાઇન્ડીંગ અને ટ્રાન્સપોર્ટ ડિલિવરી સુધીની સંપૂર્ણ સેવાઓ.'
            : 'Browse through our full spectrum of offset, screen, invitation, commercial, DTP design and binding solutions. Filter by department or search for specific products.'}
        </p>
      </div>

      {/* Filter and Search Controls */}
      <div className="bg-white p-4 sm:p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
        <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
          {/* Search Input */}
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder={lang === 'gu' ? 'સેવા કે પ્રોડક્ટ શોધો (દા.ત. Kankotri, Bill Book)...' : 'Search services (e.g. Kankotri, Bill book)...'}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Results count */}
          <div className="text-xs text-slate-500 font-medium">
            {lang === 'gu' ? `કુલ ${filtered.length} સેવાઓ ઉપલબ્ધ છે` : `Showing ${filtered.length} services`}
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap gap-2 pt-2 border-t border-slate-100">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                selectedCategory === cat.id
                  ? 'bg-blue-900 text-white shadow-sm'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {lang === 'gu' ? cat.labelGu : cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Services Grid */}
      {filtered.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-2xl border border-slate-200 p-8 space-y-4">
          <p className="text-slate-500 text-sm">
            {lang === 'gu' ? 'આ શોધ મુજબ કોઈ સેવા મળી નથી.' : 'No services found matching your search.'}
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('all');
            }}
            className="px-4 py-2 bg-blue-900 text-white text-xs font-semibold rounded-lg"
          >
            {lang === 'gu' ? 'બધી સેવાઓ ફરી જુઓ' : 'Reset Search Filters'}
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((service) => (
            <div
              key={service.id}
              className="bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-lg hover:border-blue-300 transition-all flex flex-col justify-between overflow-hidden group"
            >
              <div className="p-6 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold px-2.5 py-1 rounded-md bg-blue-50 text-blue-800">
                    {lang === 'gu' ? service.categoryLabelGu : service.categoryLabel}
                  </span>
                  {service.popular && (
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-900">
                      ★ Featured
                    </span>
                  )}
                </div>

                <h3 className="font-extrabold text-base text-slate-900 group-hover:text-blue-900 transition-colors">
                  {lang === 'gu' ? service.titleGu : service.title}
                </h3>

                <p className="text-xs text-slate-600 leading-relaxed">
                  {lang === 'gu' ? service.descriptionGu : service.description}
                </p>

                <div className="pt-2 space-y-2">
                  <p className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                    {lang === 'gu' ? 'ઉપયોગ / પ્રકાર:' : 'Applications:'}
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {(lang === 'gu' ? service.useCasesGu : service.useCases).map((uc, i) => (
                      <span
                        key={i}
                        className="text-[11px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded-md"
                      >
                        {uc}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Bottom Actions */}
              <div className="p-4 bg-slate-50 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2">
                <button
                  onClick={() => handleOpenDetail(service)}
                  className="text-xs font-bold text-blue-900 hover:text-blue-700 flex items-center gap-1"
                >
                  <span>{lang === 'gu' ? 'વિગત / ખાસિયત' : 'Details'}</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>

                <div className="flex items-center gap-2">
                  <a
                    href={generateWhatsAppUrl(
                      BUSINESS_INFO.whatsapp,
                      `Hello Dhanlaxmi Printing Press, I am enquiring about ${service.title}. Please provide details & quote.`
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg transition-colors"
                    title="Enquire on WhatsApp"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                  </a>

                  <button
                    onClick={() => {
                      onSelectService(service);
                      navigate('quote');
                    }}
                    className="px-3 py-1.5 bg-blue-900 hover:bg-blue-800 text-white rounded-lg text-xs font-bold transition-colors"
                  >
                    {lang === 'gu' ? 'ભાવપત્રક' : 'Get Quote'}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Service Detail Modal */}
      {activeModalService && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl space-y-6 relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setActiveModalService(null)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-2">
              <span className="text-xs font-bold px-2.5 py-1 rounded-md bg-blue-50 text-blue-800">
                {lang === 'gu' ? activeModalService.categoryLabelGu : activeModalService.categoryLabel}
              </span>
              <h3 className="text-xl font-extrabold text-slate-900">
                {lang === 'gu' ? activeModalService.titleGu : activeModalService.title}
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                {lang === 'gu' ? activeModalService.descriptionGu : activeModalService.description}
              </p>
            </div>

            {/* Features */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                {lang === 'gu' ? 'મુખ્ય વિશિષ્ટતાઓ:' : 'Key Specifications & Highlights:'}
              </h4>
              <ul className="space-y-1.5 text-xs text-slate-700">
                {(lang === 'gu' ? activeModalService.featuresGu : activeModalService.features).map((feat, idx) => (
                  <li key={idx} className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Applications */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                {lang === 'gu' ? 'ઉપયોગના પ્રસંગો / ક્ષેત્રો:' : 'Typical Use Cases:'}
              </h4>
              <div className="flex flex-wrap gap-2">
                {(lang === 'gu' ? activeModalService.useCasesGu : activeModalService.useCases).map((uc, idx) => (
                  <span
                    key={idx}
                    className="text-xs bg-slate-100 text-slate-800 px-2.5 py-1 rounded-lg font-medium"
                  >
                    {uc}
                  </span>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row gap-3">
              <a
                href={generateWhatsAppUrl(
                  BUSINESS_INFO.whatsapp,
                  `Hello Dhanlaxmi Printing Press, I am interested in ${activeModalService.title}. Please share rates and sample options.`
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 shadow transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                <span>{lang === 'gu' ? 'વોટ્સએપ પૂછપરછ' : 'WhatsApp Enquiry'}</span>
              </a>

              <button
                onClick={() => {
                  onSelectService(activeModalService);
                  setActiveModalService(null);
                  navigate('quote');
                }}
                className="flex-1 py-3 bg-blue-900 hover:bg-blue-800 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 shadow transition-colors"
              >
                <span>{lang === 'gu' ? 'ભાવપત્રક ભરો' : 'Request Quote'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
