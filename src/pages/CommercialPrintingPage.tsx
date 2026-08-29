import React, { useState } from 'react';
import {
  FileText,
  MessageCircle,
  ArrowRight,
  CheckCircle2,
  Send,
  Printer,
  Layers,
  Sparkles,
} from 'lucide-react';
import { ALL_SERVICES, BUSINESS_INFO, Language } from '../data/content';
import { saveEnquiry, generateWhatsAppUrl } from '../utils/storage';

interface CommercialPrintingPageProps {
  navigate: (route: string) => void;
  lang: Language;
}

export const CommercialPrintingPage: React.FC<CommercialPrintingPageProps> = ({
  navigate,
  lang,
}) => {
  const commercialServices = ALL_SERVICES.filter((s) => s.category === 'commercial');

  const [bookType, setBookType] = useState<string>('GST Tax Invoice Bill Books');
  const [copyType, setCopyType] = useState<string>('Duplicate (1+1 NCR Carbonless)');
  const [quantity, setQuantity] = useState<string>('10 Books (100 sets each)');
  const [bookSize, setBookSize] = useState<string>('A4 Standard Size');
  const [companyName, setCompanyName] = useState('');
  const [contactPerson, setContactPerson] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [gstNumber, setGstNumber] = useState('');
  const [specialInstructions, setSpecialInstructions] = useState('');

  const [submittedRef, setSubmittedRef] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactPerson.trim() || !phone.trim() || !companyName.trim()) {
      setErrorMsg(
        lang === 'gu'
          ? 'કૃપા કરીને કંપનીનું નામ, સંપર્ક વ્યક્તિ અને ફોન નંબર દાખલ કરો.'
          : 'Please provide company name, contact person, and phone number.'
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
      customer_name: `${contactPerson} (${companyName})`,
      phone: phone,
      whatsapp: phone,
      email: email || 'N/A',
      service: 'Commercial Printing',
      subcategory: bookType,
      quantity: quantity,
      size: bookSize,
      paper_type: copyType,
      requirements: `GSTIN: ${gstNumber || 'Not provided'}. Notes: ${specialInstructions}`,
      delivery_required: false,
    });

    setSubmittedRef(newRecord.reference_number);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Header Banner */}
      <div className="bg-[#101B36] text-white rounded-3xl p-8 sm:p-12 shadow-xl border border-[#c9a227]/40 space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-[#c9a227]/20 text-[#dfba47] rounded-full text-xs font-semibold font-mono">
          <Printer className="w-3.5 h-3.5" />
          <span>{lang === 'gu' ? 'વેપાર અને ઉદ્યોગ માટે પ્રિન્ટીંગ' : 'B2B & Commercial Stationery Studio'}</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold font-serif">
          {lang === 'gu' ? 'કોમર્શિયલ પ્રિન્ટીંગ સોલ્યુશન્સ' : 'Commercial Printing & Business Stationery'}
        </h1>
        <p className="text-xs sm:text-sm text-slate-300 max-w-3xl leading-relaxed font-light">
          {lang === 'gu'
            ? 'જીએસટી બિલ બુક, ટ્રાન્સપોર્ટ L.R. બિલ્ટી બુક, ચલણ, લેટરપેડ, વિઝિટિંગ કાર્ડ, એન્વેલપ અને વાર્ષિક કેલેન્ડરનું સચોટ પ્રિન્ટીંગ.'
            : 'Precision carbonless NCR invoices, transport consignment notes, corporate stationery, tamper-proof stickers, and promotional literature for Vadodara businesses.'}
        </p>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {commercialServices.map((service) => (
          <div
            key={service.id}
            className="bg-white rounded-3xl border border-[#c9a227]/30 shadow-sm hover:shadow-xl hover:border-[#c9a227] transition-all p-6 flex flex-col justify-between space-y-4 group premium-card"
          >
            <div className="space-y-3">
              <span className="text-[10px] font-bold px-2.5 py-0.5 rounded bg-[#FAF7F0] text-[#9e7a17] border border-[#c9a227]/30 uppercase font-mono">
                {lang === 'gu' ? service.categoryLabelGu : service.categoryLabel}
              </span>
              <h3 className="font-extrabold text-base text-[#101B36] font-serif group-hover:text-[#214E9A] transition-colors">
                {lang === 'gu' ? service.titleGu : service.title}
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed font-light">
                {lang === 'gu' ? service.descriptionGu : service.description}
              </p>

              <div className="space-y-1 pt-2 border-t border-slate-100">
                <span className="text-[10px] font-bold text-slate-400 uppercase font-mono">Highlights:</span>
                <ul className="text-xs text-slate-700 space-y-1">
                  {(lang === 'gu' ? service.featuresGu : service.features).map((feat, idx) => (
                    <li key={idx} className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#c9a227]"></span>
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
              <button
                onClick={() => {
                  setBookType(service.title);
                  window.scrollTo({ top: 700, behavior: 'smooth' });
                }}
                className="text-xs font-bold text-[#101B36] hover:text-[#214E9A] flex items-center gap-1"
              >
                <span>Select for Order</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <a
                href={generateWhatsAppUrl(
                  BUSINESS_INFO.whatsapp,
                  `Hello Dhanlaxmi Printing Press, I would like to inquire about ${service.title}.`
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-emerald-50 text-emerald-700 rounded-xl hover:bg-emerald-100"
                title="Inquire on WhatsApp"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* Commercial Quote Form */}
      <div className="bg-white rounded-3xl p-6 sm:p-10 border border-[#c9a227]/30 shadow-xl space-y-8">
        <div className="border-b border-slate-100 pb-3">
          <span className="text-xs font-bold uppercase tracking-widest text-[#9e7a17] font-mono">
            {lang === 'gu' ? 'કોમર્શિયલ ઓર્ડર ફોર્મ' : 'Commercial Print Estimate Form'}
          </span>
          <h2 className="text-2xl font-extrabold text-[#101B36] font-serif mt-1">
            {lang === 'gu' ? 'વેપારી પ્રિન્ટીંગ જરૂરિયાત મોકલો' : 'Request Commercial Print Specifications'}
          </h2>
          <p className="text-xs text-slate-500 font-light">
            Fill in your company details and print specifications for volume business quotes.
          </p>
        </div>

        {submittedRef ? (
          <div className="p-8 bg-emerald-50 rounded-2xl border border-emerald-200 text-center space-y-4 animate-in fade-in">
            <div className="w-12 h-12 mx-auto bg-emerald-600 text-white rounded-full flex items-center justify-center shadow-lg">
              <CheckCircle2 className="w-7 h-7" />
            </div>
            <h3 className="text-xl font-extrabold text-emerald-950 font-serif">
              {lang === 'gu' ? 'કોમર્શિયલ વિનંતી સફળતાપૂર્વક મોકલાઈ ગઈ છે!' : 'Commercial Request Submitted!'}
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
                  `Hello Dhanlaxmi Printing Press, I submitted Commercial Print Quote Ref: ${submittedRef} for ${bookType}.`
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
          <form onSubmit={handleSubmit} className="space-y-6 text-xs">
            {errorMsg && (
              <div className="p-3 bg-rose-50 text-rose-800 rounded-xl border border-rose-200 font-semibold">
                {errorMsg}
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="space-y-1">
                <label className="font-bold text-slate-700">Product / Book Type</label>
                <select
                  value={bookType}
                  onChange={(e) => setBookType(e.target.value)}
                  className="w-full px-3 py-2.5 bg-[#FAF7F0] border border-slate-300 rounded-xl focus:ring-2 focus:ring-[#c9a227]"
                >
                  <option value="GST Tax Invoice Bill Books">GST Tax Invoice Bill Books</option>
                  <option value="Transport Bilty & L.R. Books">Transport Bilty & L.R. Books</option>
                  <option value="Delivery Challan / Cash Memo">Delivery Challan / Cash Memo</option>
                  <option value="Visiting Cards (Matte/Gloss/Velvet)">Visiting Cards (Matte/Gloss/Velvet)</option>
                  <option value="Letterheads & Office Envelopes">Letterheads & Office Envelopes</option>
                  <option value="Product Labels & Gumming Stickers">Product Labels & Gumming Stickers</option>
                  <option value="Handbills & Promotional Pamphlets">Handbills & Promotional Pamphlets</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-700">Copies / Carbonless Spec</label>
                <select
                  value={copyType}
                  onChange={(e) => setCopyType(e.target.value)}
                  className="w-full px-3 py-2.5 bg-[#FAF7F0] border border-slate-300 rounded-xl focus:ring-2 focus:ring-[#c9a227]"
                >
                  <option value="Duplicate (1+1 NCR Carbonless)">Duplicate (1+1 NCR Carbonless)</option>
                  <option value="Triplicate (1+2 NCR Carbonless)">Triplicate (1+2 NCR Carbonless)</option>
                  <option value="Quadruplicate (1+3 NCR Carbonless)">Quadruplicate (1+3 NCR Carbonless)</option>
                  <option value="Single Sheet (Standard Maplitho)">Single Sheet (Standard Maplitho)</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-700">Quantity Required</label>
                <input
                  type="text"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  placeholder="e.g. 20 Books / 1000 Cards"
                  className="w-full px-3 py-2.5 bg-[#FAF7F0] border border-slate-300 rounded-xl focus:ring-2 focus:ring-[#c9a227]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="space-y-1">
                <label className="font-bold text-slate-700">Company / Business Name *</label>
                <input
                  type="text"
                  required
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  placeholder="e.g. Shreeji Logistics"
                  className="w-full px-3 py-2.5 bg-[#FAF7F0] border border-slate-300 rounded-xl focus:ring-2 focus:ring-[#c9a227]"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-700">Contact Person Name *</label>
                <input
                  type="text"
                  required
                  value={contactPerson}
                  onChange={(e) => setContactPerson(e.target.value)}
                  placeholder="e.g. Maheshbhai"
                  className="w-full px-3 py-2.5 bg-[#FAF7F0] border border-slate-300 rounded-xl focus:ring-2 focus:ring-[#c9a227]"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-700">Phone Number *</label>
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
                <label className="font-bold text-slate-700">GSTIN Number (Optional)</label>
                <input
                  type="text"
                  value={gstNumber}
                  onChange={(e) => setGstNumber(e.target.value)}
                  placeholder="24AAAAA0000A1Z5"
                  className="w-full px-3 py-2.5 bg-[#FAF7F0] border border-slate-300 rounded-xl focus:ring-2 focus:ring-[#c9a227]"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="font-bold text-slate-700">Numbering, Serial Range & Special Notes</label>
              <textarea
                rows={3}
                value={specialInstructions}
                onChange={(e) => setSpecialInstructions(e.target.value)}
                placeholder="Serial numbering from 001 to 1000, perforation, hard binding preferences..."
                className="w-full px-3 py-2 bg-[#FAF7F0] border border-slate-300 rounded-xl focus:ring-2 focus:ring-[#c9a227]"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-[#101B36] hover:bg-[#214E9A] text-white font-extrabold rounded-xl text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg transition-all"
            >
              <span>Submit Commercial Requirement</span>
              <Send className="w-4 h-4" />
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
