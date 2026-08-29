import React, { useState } from 'react';
import {
  FileEdit,
  Send,
  MessageCircle,
  Upload,
  CheckCircle2,
  Sparkles,
  Layers,
  FileCheck,
} from 'lucide-react';
import { BUSINESS_INFO, Language } from '../data/content';
import { saveEnquiry, generateWhatsAppUrl } from '../utils/storage';

interface DtpDesignPageProps {
  navigate: (route: string) => void;
  lang: Language;
}

export const DtpDesignPage: React.FC<DtpDesignPageProps> = ({ navigate, lang }) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [designLanguage, setDesignLanguage] = useState('Gujarati (શુદ્ધ ગુજરાતી)');
  const [designType, setDesignType] = useState('Wedding Kankotri Matter Composing');
  const [textContent, setTextContent] = useState('');
  const [stylePreference, setStylePreference] = useState('Traditional Gold Foil Border & Classic Gujarati Fonts');
  const [extraInstructions, setExtraInstructions] = useState('');
  const [uploadedFileName, setUploadedFileName] = useState('');

  const [submittedRef, setSubmittedRef] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState('');

  const dtpServices = [
    {
      title: 'Gujarati Content Drafting & Proofing',
      titleGu: 'ગુજરાતી કન્ટેન્ટ ડ્રાફ્ટિંગ અને પ્રૂફિંગ',
      desc: 'Expert composing with sacred shlokas, religious terms, correct family member lists, and wedding timings.',
      descGu: 'શુભ શ્લોકો, મુહૂર્ત, કૌટુંબિક નામાવલી અને સાચી ગુજરાતી જોડણી સાથેનું સચોટ કમ્પોઝિશન.',
    },
    {
      title: 'English Business Composing & Tables',
      titleGu: 'અંગ્રેજી બિઝનેસ કમ્પોઝિંગ અને કોષ્ટક',
      desc: 'Clean corporate layout design for tax invoices, contracts, legal bylaws, and accounting formats.',
      descGu: 'જીએસટી બિલ બુક, કંપની નિયમો, કરારનામા અને ટેબ્યુલર ફોર્મેટ માટે વ્યવસ્થિત લેઆઉટ.',
    },
    {
      title: 'Invitation Vector Artwork & Borders',
      titleGu: 'આમંત્રણ વેક્ટર આર્ટવર્ક અને બોર્ડર્સ',
      desc: 'Bespoke Ganpati motifs, Kalash, Nikah calligraphic frames, and floral borders prepared for foil dies.',
      descGu: 'ગણેશજી, કળશ, ઉર્દૂ બિસ્મિલ્લાહ અને ફોઈલ બ્લોક માટે યોગ્ય હાઈ-ડેફિનેશન વેક્ટર બોર્ડર્સ.',
    },
    {
      title: 'Print-Ready Output Preparation',
      titleGu: 'પ્રિન્ટ-રેડી આર્ટવર્ક તૈયારી',
      desc: 'Proper bleed margins, CMYK color separation, screen positive drafting, and PDF digital proofs.',
      descGu: 'ઓફસેટ પ્લેટ અને સ્ક્રીન પોઝિટિવ માટે ચોક્કસ CMYK કલર સેપરેશન અને વ્યાવસાયિક પીડીએફ પ્રૂફ.',
    },
  ];

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setUploadedFileName(e.target.files[0].name);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) {
      setErrorMsg(lang === 'gu' ? 'કૃપા કરીને નામ અને મોબાઈલ નંબર લખો.' : 'Please provide name and phone number.');
      return;
    }
    if (phone.trim().length < 10) {
      setErrorMsg(lang === 'gu' ? 'માન્ય ૧૦ આંકડાનો મોબાઈલ નંબર દાખલ કરો.' : 'Please enter a valid 10-digit number.');
      return;
    }

    setErrorMsg('');
    const newRecord = saveEnquiry({
      customer_name: name,
      phone: phone,
      whatsapp: phone,
      email: email || 'N/A',
      service: 'DTP & Content Design',
      subcategory: designType,
      requirements: `Language: ${designLanguage}. Style: ${stylePreference}. Text: ${textContent}. Notes: ${extraInstructions} (File: ${uploadedFileName || 'None'})`,
      delivery_required: false,
    });

    setSubmittedRef(newRecord.reference_number);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Banner */}
      <div className="bg-gradient-to-r from-indigo-950 via-blue-900 to-slate-900 text-white rounded-3xl p-8 sm:p-12 shadow-xl space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-500/20 text-indigo-300 rounded-full text-xs font-semibold">
          <FileEdit className="w-3.5 h-3.5" />
          <span>{lang === 'gu' ? 'શુદ્ધ જોડણી અને સુંદર લેઆઉટ' : 'Accurate Gujarati & English Typography'}</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold">
          {lang === 'gu' ? 'DTP અને ડિઝાઇન સેવાઓ' : 'DTP & Design Solutions'}
        </h1>
        <p className="text-xs sm:text-sm text-slate-200 max-w-3xl leading-relaxed">
          {lang === 'gu'
            ? 'કંકોત્રીનું લખાણ હોય, ધાર્મિક પુસ્તક હોય, જાહેરાત કે બિલ બુકનું ફોર્મેટ હોય — અમારા અનુભવી DTP સ્ટાફ દ્વારા શુદ્ધ જોડણી અને કલાત્મક લેઆઉટ તૈયાર કરી ગ્રાહકને વોટ્સએપ પર પ્રૂફ મોકલવામાં આવે છે.'
            : 'From handwritten wedding details to legal documents and commercial ads, our DTP specialists draft clean, error-free typography in Gujarati and English.'}
        </p>
      </div>

      {/* DTP Specialties Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {dtpServices.map((srv, idx) => (
          <div
            key={idx}
            className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all space-y-3"
          >
            <div className="w-9 h-9 rounded-xl bg-indigo-50 text-indigo-700 flex items-center justify-center font-bold text-sm">
              0{idx + 1}
            </div>
            <h3 className="font-extrabold text-sm text-slate-900 leading-snug">
              {lang === 'gu' ? srv.titleGu : srv.title}
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              {lang === 'gu' ? srv.descGu : srv.desc}
            </p>
          </div>
        ))}
      </div>

      {/* Workflow Visual */}
      <div className="bg-slate-900 text-white p-8 rounded-3xl space-y-6">
        <h2 className="text-lg font-extrabold text-amber-400">
          {lang === 'gu' ? 'DTP અને ડિઝાઇનિંગનો કાર્યપ્રવાહ' : 'Our DTP Proofing & Approval Workflow'}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 text-xs">
          <div className="bg-slate-800/80 p-4 rounded-xl space-y-2 border border-slate-700">
            <span className="text-amber-400 font-bold">પગલું ૧</span>
            <h4 className="font-bold text-white">Send Raw Draft</h4>
            <p className="text-slate-300">Share your handwritten notes, Word document or photo on WhatsApp or form.</p>
          </div>
          <div className="bg-slate-800/80 p-4 rounded-xl space-y-2 border border-slate-700">
            <span className="text-amber-400 font-bold">પગલું ૨</span>
            <h4 className="font-bold text-white">DTP Composing</h4>
            <p className="text-slate-300">We type with accurate Gujarati fonts, format paragraphs, and place emblems.</p>
          </div>
          <div className="bg-slate-800/80 p-4 rounded-xl space-y-2 border border-slate-700">
            <span className="text-amber-400 font-bold">પગલું ૩</span>
            <h4 className="font-bold text-white">Digital Proofing</h4>
            <p className="text-slate-300">We send you a high-res PDF image for family or office review and corrections.</p>
          </div>
          <div className="bg-slate-800/80 p-4 rounded-xl space-y-2 border border-slate-700">
            <span className="text-amber-400 font-bold">પગલું ૪</span>
            <h4 className="font-bold text-white">Final Sign-off</h4>
            <p className="text-slate-300">Once approved, plates/screens are exposed for crisp, flawless press production.</p>
          </div>
        </div>
      </div>

      {/* Send Content Form */}
      <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-xl space-y-8">
        <div className="border-b border-slate-100 pb-4">
          <span className="text-xs font-extrabold uppercase tracking-widest text-indigo-700">
            {lang === 'gu' ? 'તમારું લખાણ મોકલો' : 'Submit Raw Content / Draft'}
          </span>
          <h2 className="text-2xl font-extrabold text-slate-900 mt-1">
            {lang === 'gu' ? 'DTP કમ્પોઝિંગ અને ડિઝાઇનિંગ માટે લખાણ આપો' : 'Send Your Content for Composing'}
          </h2>
          <p className="text-xs sm:text-sm text-slate-500">
            {lang === 'gu'
              ? 'તમે લખાણ અહીં ટાઇપ કરી શકો છો અથવા કાગળ પર લખેલા ફોટાની ફાઇલ અપલોડ કરી શકો છો.'
              : 'Paste your draft text below or attach a clear photograph of handwritten notes.'}
          </p>
        </div>

        {submittedRef ? (
          <div className="p-8 bg-emerald-50 rounded-2xl border border-emerald-200 text-center space-y-4 animate-in fade-in">
            <div className="w-12 h-12 mx-auto bg-emerald-600 text-white rounded-full flex items-center justify-center shadow-lg">
              <CheckCircle2 className="w-7 h-7" />
            </div>
            <div className="space-y-1">
              <h3 className="text-xl font-extrabold text-emerald-950">
                {lang === 'gu' ? 'લખાણ સફળતાપૂર્વક મળ્યું છે!' : 'Content Submitted for DTP Composing!'}
              </h3>
              <p className="text-xs sm:text-sm text-emerald-800">
                {lang === 'gu' ? 'રેફરન્સ નંબર:' : 'Reference ID:'}{' '}
                <span className="font-mono font-bold text-slate-900 bg-white px-2.5 py-1 rounded-md border border-emerald-300">
                  {submittedRef}
                </span>
              </p>
            </div>
            <p className="text-xs text-slate-600 max-w-lg mx-auto leading-relaxed">
              {lang === 'gu'
                ? 'અમારો DTP સ્ટાફ લખાણ તૈયાર કરીને તમને વોટ્સએપ પર પ્રૂફ મોકલશે.'
                : 'Our DTP team will begin typesetting and share the PDF proof on your WhatsApp number.'}
            </p>

            <div className="flex flex-wrap justify-center gap-3 pt-2">
              <a
                href={generateWhatsAppUrl(
                  BUSINESS_INFO.whatsapp,
                  `Hello Dhanlaxmi Printing Press, I submitted DTP draft Ref: ${submittedRef}.`
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl text-xs flex items-center gap-2 shadow"
              >
                <MessageCircle className="w-4 h-4" />
                <span>{lang === 'gu' ? 'વોટ્સએપ પર અપડેટ લો' : 'Get WhatsApp Update'}</span>
              </a>
              <button
                onClick={() => {
                  setSubmittedRef(null);
                  setName('');
                  setPhone('');
                  setTextContent('');
                }}
                className="px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-800 font-semibold rounded-xl text-xs"
              >
                {lang === 'gu' ? 'બીજું લખાણ મોકલો' : 'Submit Another Draft'}
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            {errorMsg && (
              <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs font-semibold">
                {errorMsg}
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-800">
                  {lang === 'gu' ? 'ડિઝાઇનનો પ્રકાર (Design Type) *' : 'Type of Design *'}
                </label>
                <select
                  value={designType}
                  onChange={(e) => setDesignType(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-600 focus:bg-white"
                >
                  <option value="Wedding Kankotri Matter Composing">Wedding Kankotri Matter Composing</option>
                  <option value="Religious Yagya / Katha Booklet Composing">Religious Yagya / Katha Booklet Composing</option>
                  <option value="Bill Book & Invoice Layout Design">Bill Book & Invoice Layout Design</option>
                  <option value="Visiting Card & Logo Layout">Visiting Card & Logo Layout</option>
                  <option value="Handbill & Flyer Advertising Design">Handbill & Flyer Advertising Design</option>
                  <option value="Legal Document / Society Bylaws Typing">Legal Document / Society Bylaws Typing</option>
                  <option value="Flex Banner Artwork">Flex Banner Artwork</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-800">
                  {lang === 'gu' ? 'ભાષા પસંદગી (Language) *' : 'Language *'}
                </label>
                <select
                  value={designLanguage}
                  onChange={(e) => setDesignLanguage(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-600 focus:bg-white"
                >
                  <option value="Gujarati (શુદ્ધ ગુજરાતી)">Gujarati (શુદ્ધ ગુજરાતી)</option>
                  <option value="English">English</option>
                  <option value="Hindi (हिन्दी)">Hindi (हिन्दी)</option>
                  <option value="Bilingual Gujarati + English">Bilingual (Gujarati + English)</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-800">
                  {lang === 'gu' ? 'પસંદગીની સ્ટાઇલ (Preferred Style)' : 'Preferred Style'}
                </label>
                <select
                  value={stylePreference}
                  onChange={(e) => setStylePreference(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-600 focus:bg-white"
                >
                  <option value="Traditional Gold Foil Border & Classic Gujarati Fonts">Traditional Gold Foil Border & Classic Fonts</option>
                  <option value="Modern Minimalist Layout">Modern Minimalist Layout</option>
                  <option value="Royal Vintage Calligraphy">Royal Vintage Calligraphy</option>
                  <option value="Standard Clean Commercial Table Format">Standard Clean Commercial Table Format</option>
                </select>
              </div>
            </div>

            {/* Content Textarea */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-800">
                {lang === 'gu' ? 'તમારું લખાણ અહીં પેસ્ટ અથવા ટાઈપ કરો:' : 'Type or Paste Your Draft Content Here:'}
              </label>
              <textarea
                rows={4}
                value={textContent}
                onChange={(e) => setTextContent(e.target.value)}
                placeholder={
                  lang === 'gu'
                    ? 'દા.ત. શ્રી ગણેશાય નમઃ | ચિ. ... સંગે ... શુભ લગ્ન મુહૂર્ત: ૨૪ નવેમ્બર...'
                    : 'Paste names, event dates, program timings, or table columns here...'
                }
                className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-600 focus:bg-white font-mono"
              />
            </div>

            {/* Upload Attachment */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-800 flex items-center justify-between">
                <span>{lang === 'gu' ? 'કાગળ પર લખેલા લખાણનો ફોટો કે ડોક્યુમેન્ટ અપલોડ કરો (Upload File)' : 'Upload Handwritten Page Photo or Document (Optional)'}</span>
                <span className="text-[10px] text-slate-400 font-normal">Max 15MB</span>
              </label>
              <div className="flex items-center gap-2">
                <label className="flex-1 px-3 py-2 bg-slate-50 border border-dashed border-slate-300 rounded-xl cursor-pointer hover:bg-slate-100 flex items-center justify-center gap-2 text-xs text-slate-600">
                  <Upload className="w-4 h-4 text-slate-500" />
                  <span className="truncate">{uploadedFileName || (lang === 'gu' ? 'ફોટો કે પીડીએફ પસંદ કરો' : 'Attach Photo / Doc / PDF')}</span>
                  <input type="file" onChange={handleFileUpload} className="hidden" />
                </label>
                {uploadedFileName && (
                  <button
                    type="button"
                    onClick={() => setUploadedFileName('')}
                    className="text-xs text-rose-600 hover:underline px-1"
                  >
                    Clear
                  </button>
                )}
              </div>
            </div>

            {/* Customer Details */}
            <div className="border-t border-slate-100 pt-5 space-y-4">
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                {lang === 'gu' ? 'સંપર્ક માહિતી' : 'Your Contact Details'}
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700">
                    {lang === 'gu' ? 'પૂરું નામ *' : 'Full Name *'}
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Bharatbhai Shah"
                    className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-600 focus:bg-white"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700">
                    {lang === 'gu' ? 'મોબાઈલ નંબર (પ્રૂફ મોકલવા માટે) *' : 'Phone / Mobile (for WhatsApp proof) *'}
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="10-digit mobile number"
                    className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-600 focus:bg-white"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700">Email (Optional)</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@example.com"
                    className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-600 focus:bg-white"
                  />
                </div>
              </div>
            </div>

            {/* Submit */}
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <button
                type="submit"
                className="px-6 py-3.5 bg-indigo-900 hover:bg-indigo-800 text-white font-extrabold rounded-xl text-xs flex items-center gap-2 shadow transition-all"
              >
                <span>{lang === 'gu' ? 'લખાણ સબમિટ કરો' : 'Submit Content for DTP'}</span>
                <Send className="w-4 h-4" />
              </button>

              <a
                href={generateWhatsAppUrl(
                  BUSINESS_INFO.whatsapp,
                  'Hello Dhanlaxmi Printing Press, I want to send content draft for DTP composing.'
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-3.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl text-xs flex items-center gap-2 shadow transition-all"
              >
                <MessageCircle className="w-4 h-4" />
                <span>{lang === 'gu' ? 'વોટ્સએપ પર સીધું મોકલો' : 'Direct Send on WhatsApp'}</span>
              </a>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
