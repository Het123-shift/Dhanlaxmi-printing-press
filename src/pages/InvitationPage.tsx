import React, { useState } from 'react';
import {
  Sparkles,
  MessageCircle,
  ArrowRight,
  CheckCircle2,
  Send,
  Layers,
  Tag,
  Search,
  Eye,
  Info,
  X,
  MapPin,
  Phone,
  Navigation,
  BookOpen,
  Store,
} from 'lucide-react';
import {
  ALL_SERVICES,
  ALBUM_COLLECTION_ITEMS,
  BUSINESS_INFO,
  Language,
  AlbumCollectionItem,
} from '../data/content';
import { saveEnquiry, generateWhatsAppUrl, generateCallUrl } from '../utils/storage';

interface InvitationPageProps {
  navigate: (route: string) => void;
  lang: Language;
}

export const InvitationPage: React.FC<InvitationPageProps> = ({ navigate, lang }) => {
  const [activeTab, setActiveTab] = useState<'album' | 'custom'>('album');

  // Album collection state
  const [albumCategory, setAlbumCategory] = useState<string>('all');
  const [albumSearch, setAlbumSearch] = useState<string>('');
  const [selectedAlbumItem, setSelectedAlbumItem] = useState<AlbumCollectionItem | null>(null);

  // Custom Form State
  const [eventType, setEventType] = useState<string>('Wedding (લગ્ન પ્રસંગ)');
  const [quantity, setQuantity] = useState<string>('300 Cards');
  const [preferredSize, setPreferredSize] = useState<string>('Standard Fold (8x6 inch)');
  const [paperType, setPaperType] = useState<string>('Metallic Gloss Board');
  const [printingType, setPrintingType] = useState<string>('Multi-Color + Screen Gold Foil');
  const [designNeeded, setDesignNeeded] = useState<string>('Yes (DTP & Design needed)');
  const [cardLanguage, setCardLanguage] = useState<string>('Gujarati (ગુજરાતી)');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [email, setEmail] = useState('');
  const [specialReq, setSpecialReq] = useState('');
  const [uploadedFileName, setUploadedFileName] = useState<string>('');

  // Result state
  const [submittedRef, setSubmittedRef] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string>('');

  const filteredAlbumItems = ALBUM_COLLECTION_ITEMS.filter((item) => {
    const matchesCat = albumCategory === 'all' || item.category === albumCategory;
    const q = albumSearch.toLowerCase().trim();
    if (!q) return matchesCat;
    return (
      item.title.toLowerCase().includes(q) ||
      item.titleGu.toLowerCase().includes(q) ||
      item.code.toLowerCase().includes(q) ||
      item.description.toLowerCase().includes(q)
    );
  });

  const handleCustomSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) {
      setErrorMsg(
        lang === 'gu'
          ? 'કૃપા કરીને તમારું નામ અને મોબાઈલ નંબર દાખલ કરો.'
          : 'Please provide your name and phone number.'
      );
      return;
    }
    if (phone.trim().length < 10) {
      setErrorMsg(
        lang === 'gu'
          ? 'કૃપા કરીને માન્ય ૧૦ આંકડાનો મોબાઈલ નંબર દાખલ કરો.'
          : 'Please enter a valid 10-digit phone number.'
      );
      return;
    }

    setErrorMsg('');
    const newRecord = saveEnquiry({
      customer_name: name,
      phone: phone,
      whatsapp: whatsapp || phone,
      email: email || 'N/A',
      service: 'Custom Invitation & Kankotri',
      subcategory: eventType,
      quantity: quantity,
      size: preferredSize,
      paper_type: paperType,
      printing_type: printingType,
      design_needed: designNeeded,
      requirements: `Language: ${cardLanguage}. Special Instructions: ${specialReq} (Attachment: ${
        uploadedFileName || 'None'
      })`,
      delivery_required: false,
    });

    setSubmittedRef(newRecord.reference_number);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* ═══════════════════════════════════════════════════════════ */}
      {/*  HEADER BANNER                                             */}
      {/* ═══════════════════════════════════════════════════════════ */}
      <div className="bg-[#101B36] text-white rounded-3xl p-8 sm:p-12 shadow-xl border border-[#c9a227]/40 space-y-4 relative overflow-hidden">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-[#c9a227]/20 text-[#dfba47] rounded-full text-xs font-semibold font-mono">
          <Sparkles className="w-3.5 h-3.5" />
          <span>{lang === 'gu' ? 'કંકોત્રી અને આમંત્રણ સંગ્રહ' : 'Kankotri & Invitation Card Collection'}</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold font-serif">
          {lang === 'gu' ? 'કંકોત્રી અને આમંત્રણ પત્રિકા સંગ્રહ' : 'Kankotri & Invitation Card Collection'}
        </h1>
        <p className="text-xs sm:text-sm text-slate-300 max-w-3xl leading-relaxed font-light">
          {lang === 'gu'
            ? 'અમારી કંકોત્રી અને આમંત્રણ કાર્ડ ડિઝાઈન્સની એક ઝાંખી જુઓ. અમારી દુકાનમાં ફિઝિકલ આલ્બમમાં ઘણી બધી વધુ ડિઝાઈન્સ ઉપલબ્ધ છે.'
            : 'Explore a selection of our Kankotri and Invitation Card designs. We have many more designs available in our physical albums at the shop.'}
        </p>
      </div>

      {/* ═══════════════════════════════════════════════════════════ */}
      {/*  PROMOTIONAL BANNER — 50% OFF ALBUM COLLECTION            */}
      {/* ═══════════════════════════════════════════════════════════ */}
      <div className="bg-gradient-to-r from-rose-950 via-[#101B36] to-amber-950 text-white rounded-3xl p-6 sm:p-8 border-2 border-[#c9a227] shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2 text-center md:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-rose-600 text-white rounded-full text-xs font-extrabold shadow">
            <Tag className="w-3.5 h-3.5" />
            <span>SPECIAL INVITATION OFFER</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold font-serif text-white">
            {lang === 'gu'
              ? 'અમારા આલ્બમ કલેક્શનની દરેક કંકોત્રી અને આમંત્રણ કાર્ડ પર ૫૦% ની વિશેષ છૂટ'
              : '50% OFF on Every Kankotri & Invitation Card from Our Album Collection'}
          </h2>
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════════ */}
      {/*  TWO CORE OPTIONS: ALBUM vs CUSTOM TAB SWITCHER            */}
      {/* ═══════════════════════════════════════════════════════════ */}
      <div className="flex flex-col sm:flex-row items-stretch justify-center gap-4 max-w-2xl mx-auto">
        <button
          onClick={() => setActiveTab('album')}
          className={`flex-1 p-5 rounded-3xl border text-left transition-all relative overflow-hidden ${
            activeTab === 'album'
              ? 'bg-gradient-to-br from-[#101B36] to-[#1e2f57] text-white border-[#c9a227] shadow-xl ring-2 ring-[#c9a227]/40'
              : 'bg-white text-slate-800 border-slate-200 hover:border-[#c9a227]/50'
          }`}
        >
          <div className="flex items-center justify-between mb-2">
            <span className={`text-xs font-mono font-bold uppercase tracking-wider ${activeTab === 'album' ? 'text-[#dfba47]' : 'text-[#9e7a17]'}`}>
              Album Collection
            </span>
            <span className="px-2.5 py-0.5 bg-rose-600 text-white rounded-full text-[10px] font-extrabold shadow-sm">
              50% OFF
            </span>
          </div>
          <h3 className="font-extrabold text-base font-serif">
            {lang === 'gu' ? 'આલ્બમ કલેક્શન (૫૦% છૂટ)' : 'Album Collection Designs'}
          </h3>
          <p className={`text-xs mt-1 line-clamp-2 font-light ${activeTab === 'album' ? 'text-slate-300' : 'text-slate-500'}`}>
            {lang === 'gu'
              ? 'આલ્બમની દરેક કંકોત્રી પર ૫૦% છૂટ. વધુ ડિઝાઈન દુકાનમાં ઉપલબ્ધ.'
              : '50% OFF on every card from our albums. Many more designs available at our shop.'}
          </p>
        </button>

        <button
          onClick={() => setActiveTab('custom')}
          className={`flex-1 p-5 rounded-3xl border text-left transition-all relative overflow-hidden ${
            activeTab === 'custom'
              ? 'bg-gradient-to-br from-[#101B36] to-[#1e2f57] text-white border-[#c9a227] shadow-xl ring-2 ring-[#c9a227]/40'
              : 'bg-white text-slate-800 border-slate-200 hover:border-[#c9a227]/50'
          }`}
        >
          <div className="flex items-center justify-between mb-2">
            <span className={`text-xs font-mono font-bold uppercase tracking-wider ${activeTab === 'custom' ? 'text-cyan-300' : 'text-cyan-700'}`}>
              Custom Work
            </span>
            <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${activeTab === 'custom' ? 'bg-slate-600 text-slate-200' : 'bg-slate-800 text-slate-200'}`}>
              Custom Rates
            </span>
          </div>
          <h3 className="font-extrabold text-base font-serif">
            {lang === 'gu' ? 'કસ્ટમ / અલગ પ્રિન્ટીંગ' : 'Custom / Separate Printing'}
          </h3>
          <p className={`text-xs mt-1 line-clamp-2 font-light ${activeTab === 'custom' ? 'text-slate-300' : 'text-slate-500'}`}>
            {lang === 'gu'
              ? 'જથ્થો, સાઈઝ, કાગળ અને ડિઝાઇન મુજબ વાજબી દર.'
              : 'Rates based on your exact quantity, paper GSM, foil stamping & format.'}
          </p>
        </button>
      </div>

      {/* ═══════════════════════════════════════════════════════════ */}
      {/*  SECTION 1: ALBUM COLLECTION (50% OFF)                     */}
      {/* ═══════════════════════════════════════════════════════════ */}
      {activeTab === 'album' && (
        <div className="space-y-8 animate-in fade-in duration-300">
          {/* Album Filters & Search */}
          <div className="bg-white p-4 sm:p-6 rounded-3xl border border-[#c9a227]/30 shadow-sm space-y-4">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
              <div className="relative w-full sm:w-80">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder={lang === 'gu' ? 'ડિઝાઈન શોધો...' : 'Search designs...'}
                  value={albumSearch}
                  onChange={(e) => setAlbumSearch(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 text-xs bg-[#FAF7F0] border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#c9a227] focus:bg-white font-mono"
                />
              </div>

              <div className="flex flex-wrap gap-1.5">
                {[
                  { id: 'all', label: 'All Designs', labelGu: 'તમામ ડિઝાઈન' },
                  { id: 'wedding', label: 'Wedding', labelGu: 'લગ્ન' },
                  { id: 'traditional', label: 'Traditional', labelGu: 'પરંપરાગત' },
                  { id: 'muslim', label: 'Muslim Nikah', labelGu: 'નિકાહ' },
                  { id: 'religious', label: 'Shrimant / Mundan', labelGu: 'શ્રીમંત / મુંડન' },
                  { id: 'modern', label: 'Modern', labelGu: 'આધુનિક' },
                ].map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setAlbumCategory(cat.id)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                      albumCategory === cat.id
                        ? 'bg-[#101B36] text-[#dfba47] shadow border border-[#c9a227]/50'
                        : 'bg-[#FAF7F0] text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    {lang === 'gu' ? cat.labelGu : cat.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Curated Album Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredAlbumItems.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-3xl border border-[#c9a227]/30 shadow-sm hover:shadow-xl hover:border-[#c9a227] transition-all p-5 flex flex-col justify-between space-y-4 group premium-card relative overflow-hidden"
              >
                {/* 50% OFF Badge */}
                <div className="absolute top-3 right-3 z-10">
                  <span className="px-2 py-0.5 bg-rose-600 text-white rounded-md text-[10px] font-extrabold shadow font-mono">
                    50% OFF
                  </span>
                </div>

                <div className="space-y-3">
                  <div className="h-36 bg-gradient-to-br from-[#101B36] via-[#17254a] to-[#0a1124] rounded-2xl p-4 flex flex-col justify-between text-white border border-[#c9a227]/30 relative overflow-hidden">
                    <span className="text-[10px] font-mono text-[#dfba47] font-bold">{item.code}</span>
                    <div>
                      <span className="text-[10px] font-bold text-slate-300 block uppercase font-mono">
                        {lang === 'gu' ? item.categoryLabelGu : item.categoryLabel}
                      </span>
                      <h4 className="font-extrabold text-sm text-white font-serif line-clamp-2">
                        {lang === 'gu' ? item.titleGu : item.title}
                      </h4>
                    </div>
                  </div>

                  <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed font-light">
                    {lang === 'gu' ? item.descriptionGu : item.description}
                  </p>

                  <div className="text-[11px] bg-[#FAF7F0] p-2.5 rounded-xl border border-[#c9a227]/20 space-y-1">
                    <div className="flex justify-between">
                      <span className="text-slate-500">Board:</span>
                      <span className="font-semibold text-[#101B36] truncate">{item.paperType}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Finish:</span>
                      <span className="font-semibold text-[#101B36] truncate">{item.finish}</span>
                    </div>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-100 flex flex-col gap-2">
                  <button
                    onClick={() => setSelectedAlbumItem(item)}
                    className="w-full py-2 bg-[#FAF7F0] hover:bg-slate-100 text-[#101B36] font-bold rounded-xl text-xs flex items-center justify-center gap-1.5 border border-[#c9a227]/30 transition-all"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>{lang === 'gu' ? 'વિગત જુઓ' : 'View Details'}</span>
                  </button>

                  <div className="flex gap-2">
                    <a
                      href={generateWhatsAppUrl(
                        BUSINESS_INFO.whatsapp,
                        `Hello Dhanlaxmi Printing Press, I am inquiring about Album Design ${item.code}: ${item.title} (with 50% OFF).`
                      )}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-1 shadow"
                    >
                      <MessageCircle className="w-3.5 h-3.5" />
                      <span>WhatsApp</span>
                    </a>

                    <button
                      onClick={() => navigate('quote')}
                      className="flex-1 py-2 bg-[#101B36] hover:bg-[#214E9A] text-white font-bold rounded-xl text-xs shadow"
                    >
                      Quote
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* ─────────────────────────────────────────────────── */}
          {/*  "More designs available" note below displayed cards */}
          {/* ─────────────────────────────────────────────────── */}
          <div className="bg-[#FAF7F0] rounded-2xl p-5 border border-[#c9a227]/30 text-center space-y-1.5">
            <div className="flex items-center justify-center gap-2 text-[#9e7a17]">
              <BookOpen className="w-4 h-4" />
              <span className="text-xs font-bold font-serif">
                {lang === 'gu'
                  ? 'વધુ ડિઝાઈન્સ અમારા આલ્બમમાં ઉપલબ્ધ છે.'
                  : 'More designs are available in our albums.'}
              </span>
            </div>
            <p className="text-xs text-slate-600 font-light">
              {lang === 'gu'
                ? 'અમારી દુકાનની મુલાકાત લો અથવા વધુ વિકલ્પો માટે અમારો સંપર્ક કરો.'
                : 'Visit our shop or contact us to explore more options.'}
            </p>
          </div>

          {/* ─────────────────────────────────────────────────── */}
          {/*  "Looking for more designs?" visit/contact prompt   */}
          {/* ─────────────────────────────────────────────────── */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#c9a227]/30 shadow-md space-y-4 text-center">
            <div className="space-y-1.5">
              <Store className="w-6 h-6 mx-auto text-[#c9a227]" />
              <h3 className="text-lg sm:text-xl font-extrabold text-[#101B36] font-serif">
                {lang === 'gu' ? 'વધુ ડિઝાઈન શોધી રહ્યા છો?' : 'Looking for more designs?'}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 max-w-xl mx-auto leading-relaxed font-light">
                {lang === 'gu'
                  ? 'અમારી દુકાનની મુલાકાત લો અથવા WhatsApp પર સંપર્ક કરો — અમારા આલ્બમમાં ઘણી બધી વધુ કંકોત્રી અને આમંત્રણ કાર્ડ ડિઝાઈન ઉપલબ્ધ છે.'
                  : 'Visit our shop to explore our complete album collection, or contact us on WhatsApp for more options.'}
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              <button
                onClick={() => navigate('contact')}
                className="px-5 py-2.5 bg-gradient-to-r from-[#c9a227] to-[#dfba47] text-[#101B36] font-extrabold rounded-xl text-xs flex items-center gap-2 shadow"
              >
                <MapPin className="w-3.5 h-3.5" />
                <span>{lang === 'gu' ? 'અમારી દુકાન પર આવો' : 'Visit Us'}</span>
              </button>

              <a
                href={generateWhatsAppUrl(
                  BUSINESS_INFO.whatsapp,
                  'Hello Dhanlaxmi Printing Press, I want to see more Kankotri and Invitation Card designs from your album collection.'
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl text-xs flex items-center gap-2 shadow"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>{lang === 'gu' ? 'WhatsApp પર સંપર્ક કરો' : 'Contact on WhatsApp'}</span>
              </a>
            </div>
          </div>
        </div>
      )}

      {/* ═══════════════════════════════════════════════════════════ */}
      {/*  SECTION 2: CUSTOM / SEPARATE PRINTING                     */}
      {/* ═══════════════════════════════════════════════════════════ */}
      {activeTab === 'custom' && (
        <div className="space-y-8 animate-in fade-in duration-300">
          {/* Pricing Transparency Notice */}
          <div className="bg-[#FAF7F0] p-6 sm:p-8 rounded-3xl border border-[#c9a227]/40 space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold text-[#9e7a17] uppercase font-mono">
              <Info className="w-4 h-4" />
              <span>Custom Printing • Rates Based on Requirements</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-extrabold text-[#101B36] font-serif">
              {lang === 'gu'
                ? 'કસ્ટમ કંકોત્રી અને પ્રિન્ટીંગ — જરૂરિયાત મુજબ વાજબી દર'
                : 'Bespoke Invitation Printing — Rates Tailored to Your Specifications'}
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-light max-w-4xl">
              {lang === 'gu'
                ? 'અમારા આલ્બમ સિવાયના અલગથી કસ્ટમ પ્રિન્ટીંગ માટે ભાવ તમારા જથ્થા (Quantity), કાર્ડ સાઈઝ, પેપર જીએસએમ, ફોઈલ કલર્સ, ડીટીપી કમ્પોઝિંગ અને ફિનિશિંગ આધારિત નક્કી કરવામાં આવે છે.'
                : 'For custom printing outside our album collection, pricing is calculated transparently based on quantity, size, paper stock, gold/silver foil die requirements, number of ink passes, and finishing styles.'}
            </p>

            {/* Clear distinction notice */}
            <div className="bg-white rounded-xl p-4 border border-amber-200 mt-2">
              <p className="text-xs text-slate-700 font-medium">
                <span className="font-bold text-rose-700">Note:</span>{' '}
                {lang === 'gu'
                  ? 'આલ્બમ કલેક્શનની ૫૦% છૂટ ઓફર ફક્ત આલ્બમ કાર્ડ્સ માટે જ લાગુ થાય છે. અલગ/કસ્ટમ પ્રિન્ટીંગના ભાવ જરૂરિયાત મુજબ અલગ હોય છે.'
                  : 'The 50% OFF offer applies exclusively to our album collection cards. Custom/separate printing rates are quoted based on your specific requirements.'}
              </p>
            </div>
          </div>

          {/* Custom Quote Submission Form */}
          <div className="bg-white rounded-3xl p-6 sm:p-10 border border-[#c9a227]/30 shadow-xl space-y-8">
            <div className="border-b border-slate-100 pb-3">
              <span className="text-xs font-bold uppercase tracking-widest text-[#9e7a17] font-mono">
                {lang === 'gu' ? 'કસ્ટમ રિક્વાયરમેન્ટ ફોર્મ' : 'Custom Requirement Form'}
              </span>
              <h2 className="text-2xl font-extrabold text-[#101B36] font-serif mt-1">
                {lang === 'gu' ? 'તમારી કસ્ટમ કંકોત્રીની વિગત જણાવો' : 'Tell Us Your Custom Invitation Requirements'}
              </h2>
            </div>

            {submittedRef ? (
              <div className="p-8 bg-emerald-50 rounded-2xl border border-emerald-200 text-center space-y-4 animate-in fade-in">
                <div className="w-12 h-12 mx-auto bg-emerald-600 text-white rounded-full flex items-center justify-center shadow-lg">
                  <CheckCircle2 className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-extrabold text-emerald-950 font-serif">
                  {lang === 'gu' ? 'વિનંતી સફળતાપૂર્વક મોકલાઈ ગઈ છે!' : 'Custom Request Received!'}
                </h3>
                <p className="text-xs sm:text-sm text-emerald-800">
                  Reference ID:{' '}
                  <span className="font-mono font-bold text-slate-900 bg-white px-2.5 py-1 rounded-md border border-emerald-300">
                    {submittedRef}
                  </span>
                </p>
                <div className="pt-2 flex justify-center gap-3">
                  <a
                    href={generateWhatsAppUrl(
                      BUSINESS_INFO.whatsapp,
                      `Hello Dhanlaxmi Printing Press, I submitted Custom Invitation Quote Ref: ${submittedRef} for ${eventType}.`
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-5 py-2.5 bg-emerald-600 text-white font-bold rounded-xl text-xs flex items-center gap-2 shadow"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>WhatsApp Us Reference ID</span>
                  </a>
                </div>
              </div>
            ) : (
              <form onSubmit={handleCustomSubmit} className="space-y-6 text-xs">
                {errorMsg && (
                  <div className="p-3 bg-rose-50 text-rose-800 rounded-xl border border-rose-200 font-semibold">
                    {errorMsg}
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div className="space-y-1">
                    <label className="font-bold text-slate-700">Occasion / Celebration Type</label>
                    <select
                      value={eventType}
                      onChange={(e) => setEventType(e.target.value)}
                      className="w-full px-3 py-2.5 bg-[#FAF7F0] border border-slate-300 rounded-xl focus:ring-2 focus:ring-[#c9a227]"
                    >
                      <option value="Wedding (લગ્ન પ્રસંગ)">Wedding (લગ્ન પ્રસંગ)</option>
                      <option value="Shrimant Vidhi (શ્રીમંત વિધિ)">Shrimant Vidhi (શ્રીમંત વિધિ)</option>
                      <option value="Babri / Mundan (બાબરી / મુંડન)">Babri / Mundan (બાબરી / મુંડન)</option>
                      <option value="Navchandi Yagya (નવચંડી યજ્ઞ)">Navchandi Yagya (નવચંડી યજ્ઞ)</option>
                      <option value="Vastu Pujan (વાસ્તુ પૂજન)">Vastu Pujan (વાસ્તુ પૂજન)</option>
                      <option value="Muslim Nikah / Walima (નિકાહ / વલીમા)">Muslim Nikah / Walima (નિકાહ / વલીમા)</option>
                      <option value="Birthday (જન્મદિવસ)">Birthday (જન્મદિવસ)</option>
                      <option value="Inauguration (ઉદ્ઘાટન)">Inauguration (ઉદ્ઘાટન)</option>
                      <option value="Other (અન્ય)">Other (અન્ય)</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="font-bold text-slate-700">Quantity Needed</label>
                    <input
                      type="text"
                      value={quantity}
                      onChange={(e) => setQuantity(e.target.value)}
                      placeholder="e.g. 500 Cards"
                      className="w-full px-3 py-2.5 bg-[#FAF7F0] border border-slate-300 rounded-xl focus:ring-2 focus:ring-[#c9a227]"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="font-bold text-slate-700">Language Preference</label>
                    <select
                      value={cardLanguage}
                      onChange={(e) => setCardLanguage(e.target.value)}
                      className="w-full px-3 py-2.5 bg-[#FAF7F0] border border-slate-300 rounded-xl focus:ring-2 focus:ring-[#c9a227]"
                    >
                      <option value="Gujarati (ગુજરાતી)">Gujarati (ગુજરાતી)</option>
                      <option value="English">English</option>
                      <option value="Bilingual (Gujarati + English)">Bilingual (Gujarati + English)</option>
                      <option value="Hindi (હિન્દી)">Hindi (હિન્દી)</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="space-y-1">
                    <label className="font-bold text-slate-700">Full Name *</label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Bharatbhai Patel"
                      className="w-full px-3 py-2.5 bg-[#FAF7F0] border border-slate-300 rounded-xl focus:ring-2 focus:ring-[#c9a227]"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="font-bold text-slate-700">Mobile Phone *</label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="10-digit number"
                      className="w-full px-3 py-2.5 bg-[#FAF7F0] border border-slate-300 rounded-xl focus:ring-2 focus:ring-[#c9a227]"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="font-bold text-slate-700">WhatsApp</label>
                    <input
                      type="tel"
                      value={whatsapp}
                      onChange={(e) => setWhatsapp(e.target.value)}
                      placeholder="For PDF proof"
                      className="w-full px-3 py-2.5 bg-[#FAF7F0] border border-slate-300 rounded-xl focus:ring-2 focus:ring-[#c9a227]"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="font-bold text-slate-700">Email (Optional)</label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="name@domain.com"
                      className="w-full px-3 py-2.5 bg-[#FAF7F0] border border-slate-300 rounded-xl focus:ring-2 focus:ring-[#c9a227]"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-700">Custom Details / Specific Foil & Paper Notes</label>
                  <textarea
                    rows={3}
                    value={specialReq}
                    onChange={(e) => setSpecialReq(e.target.value)}
                    placeholder="Describe custom size, folding format, embossing, or attach Word draft..."
                    className="w-full px-3 py-2 bg-[#FAF7F0] border border-slate-300 rounded-xl focus:ring-2 focus:ring-[#c9a227]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-[#101B36] hover:bg-[#214E9A] text-white font-extrabold rounded-xl text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg transition-all"
                >
                  <span>Submit Custom Requirement for Price Estimate</span>
                  <Send className="w-4 h-4" />
                </button>
              </form>
            )}
          </div>
        </div>
      )}

      {/* ═══════════════════════════════════════════════════════════ */}
      {/*  PRICING CLARITY SUMMARY (Always visible)                  */}
      {/* ═══════════════════════════════════════════════════════════ */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="bg-white rounded-2xl p-5 border border-rose-200 shadow-sm space-y-2">
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 bg-rose-600 text-white rounded text-[10px] font-extrabold font-mono">
              50% OFF
            </span>
            <span className="text-xs font-bold text-[#101B36] font-serif">
              {lang === 'gu' ? 'આલ્બમ કંકોત્રી અને આમંત્રણ કાર્ડ' : 'Album Kankotri & Invitation Cards'}
            </span>
          </div>
          <p className="text-xs text-slate-600 font-light">
            {lang === 'gu'
              ? 'અમારા ફિઝિકલ આલ્બમ કલેક્શનમાંથી પસંદ કરેલ દરેક કાર્ડ પર ૫૦% ની છૂટ.'
              : '50% discount on every card chosen from our physical album collection at the shop.'}
          </p>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm space-y-2">
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 bg-slate-700 text-white rounded text-[10px] font-bold font-mono">
              Custom Rates
            </span>
            <span className="text-xs font-bold text-[#101B36] font-serif">
              {lang === 'gu' ? 'કસ્ટમ / અલગ પ્રિન્ટીંગ' : 'Custom / Separate Printing'}
            </span>
          </div>
          <p className="text-xs text-slate-600 font-light">
            {lang === 'gu'
              ? 'જરૂરિયાત મુજબ ભાવ — જથ્થો, સાઈઝ, કાગળ, પ્રિન્ટીંગ પ્રકાર અને ફિનિશિંગ.'
              : 'Rates based on requirements — quantity, size, paper, printing type, and finishing.'}
          </p>
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════════ */}
      {/*  STRONG CTA: Can't find the design you're looking for?     */}
      {/* ═══════════════════════════════════════════════════════════ */}
      <div className="bg-gradient-to-r from-[#101B36] via-[#17254a] to-[#101B36] text-white rounded-3xl p-8 sm:p-10 shadow-2xl text-center space-y-5 border border-[#c9a227]/40 relative overflow-hidden">
        <div className="max-w-2xl mx-auto space-y-3 relative z-10">
          <h2 className="text-xl sm:text-2xl font-extrabold font-serif">
            {lang === 'gu'
              ? 'તમને ગમતી ડિઝાઈન નથી મળી?'
              : "Can't find the design you're looking for?"}
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 font-light leading-relaxed max-w-lg mx-auto">
            {lang === 'gu'
              ? 'અમારી દુકાન પર આવો અથવા અમારો સંપર્ક કરો — અમારા આલ્બમમાં ઘણી બધી વધુ કંકોત્રી અને આમંત્રણ કાર્ડ ડિઝાઈન ઉપલબ્ધ છે.'
              : 'Visit us or contact us — we have many more Kankotri and Invitation Card designs available in our albums.'}
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3 relative z-10 pt-1">
          <a
            href={generateWhatsAppUrl(
              BUSINESS_INFO.whatsapp,
              'Hello Dhanlaxmi Printing Press, I could not find my preferred design on the website. Can you show me more album options?'
            )}
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl text-xs flex items-center gap-2 shadow-lg transition-all"
          >
            <MessageCircle className="w-4 h-4" />
            <span>{lang === 'gu' ? 'WhatsApp પર સંપર્ક કરો' : 'Contact on WhatsApp'}</span>
          </a>

          <button
            onClick={() => navigate('contact')}
            className="px-5 py-3 bg-white/10 hover:bg-white/20 text-white font-bold rounded-xl text-xs flex items-center gap-2 border border-white/20 backdrop-blur-sm transition-all"
          >
            <Navigation className="w-4 h-4" />
            <span>{lang === 'gu' ? 'દિશા મેળવો' : 'Get Directions'}</span>
          </button>

          <button
            onClick={() => navigate('quote')}
            className="px-5 py-3 bg-gradient-to-r from-[#c9a227] to-[#dfba47] text-[#101B36] font-extrabold rounded-xl text-xs flex items-center gap-2 shadow transition-all"
          >
            <ArrowRight className="w-4 h-4" />
            <span>{lang === 'gu' ? 'ભાવપત્રક મેળવો' : 'Request a Quote'}</span>
          </button>
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════════ */}
      {/*  ALBUM DETAIL MODAL                                        */}
      {/* ═══════════════════════════════════════════════════════════ */}
      {selectedAlbumItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl space-y-6 relative border border-[#c9a227]/40">
            <button
              onClick={() => setSelectedAlbumItem(null)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-700 rounded-full"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 bg-rose-600 text-white rounded text-[10px] font-bold font-mono">
                  50% OFF
                </span>
                <span className="text-xs font-mono font-bold text-blue-900 bg-blue-50 px-2 py-0.5 rounded">
                  {selectedAlbumItem.code}
                </span>
              </div>
              <h3 className="text-xl font-extrabold text-[#101B36] font-serif">
                {lang === 'gu' ? selectedAlbumItem.titleGu : selectedAlbumItem.title}
              </h3>
            </div>

            <div className="h-44 bg-gradient-to-br from-[#101B36] to-[#1e2f57] rounded-2xl p-5 flex flex-col justify-between text-white border border-[#c9a227]/30 shadow-inner">
              <span className="text-xs font-bold text-[#dfba47]">
                {lang === 'gu' ? 'ફિઝિકલ આલ્બમ કલેક્શન' : 'Physical Album Collection'}
              </span>
              <p className="text-xs text-slate-300 leading-relaxed font-light">
                {lang === 'gu' ? selectedAlbumItem.descriptionGu : selectedAlbumItem.description}
              </p>
              <div className="text-[10px] text-slate-400 font-mono">Dhanlaxmi Printing Press • Panigate</div>
            </div>

            <div className="space-y-2 text-xs">
              <div className="flex justify-between border-b border-slate-100 py-1.5">
                <span className="text-slate-500 font-semibold">Card Material:</span>
                <span className="font-bold text-[#101B36]">{selectedAlbumItem.paperType}</span>
              </div>
              <div className="flex justify-between border-b border-slate-100 py-1.5">
                <span className="text-slate-500 font-semibold">Print Finish:</span>
                <span className="font-bold text-[#101B36]">{selectedAlbumItem.finish}</span>
              </div>
            </div>

            <div className="flex gap-2 pt-2">
              <a
                href={generateWhatsAppUrl(
                  BUSINESS_INFO.whatsapp,
                  `Hello Dhanlaxmi Printing Press, I want to enquire about Album Card ${selectedAlbumItem.code}: ${selectedAlbumItem.title} (50% OFF).`
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-1.5 shadow"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Enquire on WhatsApp</span>
              </a>

              <button
                onClick={() => {
                  setSelectedAlbumItem(null);
                  navigate('quote');
                }}
                className="flex-1 py-2.5 bg-[#101B36] text-white font-bold rounded-xl text-xs shadow"
              >
                Request Quote
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
