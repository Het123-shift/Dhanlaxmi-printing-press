import React, { useState } from 'react';
import {
  MapPin,
  Phone,
  MessageCircle,
  Mail,
  Clock,
  Send,
  CheckCircle2,
  Navigation,
  Sparkles,
} from 'lucide-react';
import { BUSINESS_INFO, Language } from '../data/content';
import { saveEnquiry, generateWhatsAppUrl, generateCallUrl } from '../utils/storage';

interface ContactPageProps {
  navigate: (route: string) => void;
  lang: Language;
}

export const ContactPage: React.FC<ContactPageProps> = ({ navigate, lang }) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('General Printing Enquiry');
  const [message, setMessage] = useState('');

  const [submittedRef, setSubmittedRef] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim() || !message.trim()) {
      setErrorMsg(
        lang === 'gu'
          ? 'કૃપા કરીને નામ, ફોન અને સંદેશો ભરો.'
          : 'Please enter your name, phone number, and message.'
      );
      return;
    }
    if (phone.trim().length < 10) {
      setErrorMsg(lang === 'gu' ? 'માન્ય ૧૦ આંકડાનો મોબાઈલ નંબર લખો.' : 'Please enter a valid 10-digit number.');
      return;
    }

    setErrorMsg('');
    const record = saveEnquiry({
      customer_name: name,
      phone: phone,
      whatsapp: phone,
      email: email || 'N/A',
      service: 'General Contact',
      subcategory: subject,
      requirements: message,
      delivery_required: false,
    });

    setSubmittedRef(record.reference_number);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Banner */}
      <div className="bg-[#101B36] text-white rounded-3xl p-8 sm:p-12 shadow-xl border border-[#c9a227]/40 space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-[#c9a227]/20 text-[#dfba47] rounded-full text-xs font-semibold font-mono">
          <MapPin className="w-3.5 h-3.5" />
          <span>{lang === 'gu' ? 'પાણીગેટ, વડોદરા સ્થિત પ્રિન્ટીંગ પ્રેસ' : 'Visit Our Vadodara Press'}</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold font-serif">
          {lang === 'gu' ? 'સંપર્ક અને મુલાકાત (Contact Us)' : 'Contact & Location'}
        </h1>
        <p className="text-xs sm:text-sm text-slate-300 max-w-3xl leading-relaxed font-light">
          {lang === 'gu'
            ? 'નવા ઓર્ડર, સેમ્પલ જોવા માટે રૂબરૂ મુલાકાત, ટેલિફોનિક પૂછપરછ અથવા વોટ્સએપ પર ભાવ જાણવા માટે અમારો સંપર્ક કરો.'
            : 'Get in touch directly with Dhanlaxmi Printing Press. Visit our Panigate shop to inspect physical paper samples and gold foil dies or reach out digitally.'}
        </p>
      </div>

      {/* Grid: Contact Cards & Form */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Left: Official Contact Points */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#c9a227]/30 shadow-xl space-y-6">
            {/* Logo and Brand */}
            <div className="flex items-center space-x-4 pb-5 border-b border-slate-100">
              <div className="w-16 h-16 bg-white rounded-full p-1 border-2 border-[#c9a227] shadow flex-shrink-0">
                <img
                  src="/logo.png"
                  alt="Dhanlaxmi Printing Press Official Logo"
                  className="w-full h-full object-contain rounded-full"
                />
              </div>
              <div>
                <h3 className="font-extrabold text-base text-[#101B36] uppercase font-serif">
                  {lang === 'gu' ? BUSINESS_INFO.nameGu : BUSINESS_INFO.name}
                </h3>
                <p className="text-xs text-[#c9a227] font-bold uppercase tracking-wider font-mono">
                  {lang === 'gu' ? 'વડોદરા - ૨૫' : 'Vadodara - 390025'}
                </p>
              </div>
            </div>

            {/* Address */}
            <div className="space-y-4 text-xs text-slate-700">
              {/* Google Reviews Badge */}
              <div className="flex items-center justify-between p-3 rounded-2xl bg-amber-50/80 border border-amber-200">
                <div className="flex items-center gap-2">
                  <div className="flex text-amber-500 text-xs">
                    {'★'.repeat(5)}
                  </div>
                  <span className="font-extrabold text-[#101B36] text-xs">
                    {BUSINESS_INFO.rating} / 5.0
                  </span>
                </div>
                <span className="text-[11px] text-slate-600 font-medium font-mono">
                  {BUSINESS_INFO.reviewCount} Google Reviews
                </span>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-xl bg-[#FAF7F0] text-[#9e7a17] border border-[#c9a227]/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <span className="font-bold text-[#101B36] block mb-0.5">
                    {lang === 'gu' ? 'સરનામું (Official Address):' : 'Official Press Address:'}
                  </span>
                  <p className="leading-relaxed text-slate-600 font-light">
                    {lang === 'gu' ? BUSINESS_INFO.addressGu : BUSINESS_INFO.address}
                  </p>
                  <p className="text-[11px] text-[#9e7a17] font-semibold mt-1">
                    {lang === 'gu' ? BUSINESS_INFO.landmarkGu : BUSINESS_INFO.landmark}
                  </p>
                  <div className="mt-1 inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-slate-100 text-[10px] font-mono text-slate-600">
                    <span>Plus Code:</span>
                    <span className="font-bold text-slate-800">{BUSINESS_INFO.plusCode}</span>
                  </div>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-[#FAF7F0] text-sky-700 border border-sky-200 flex items-center justify-center flex-shrink-0">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <span className="font-bold text-[#101B36] block mb-0.5">
                    {lang === 'gu' ? 'ટેલિફોન / મોબાઈલ:' : 'Direct Phone:'}
                  </span>
                  <a
                    href={generateCallUrl(BUSINESS_INFO.phone)}
                    className="hover:text-[#214E9A] font-bold text-[#101B36] font-mono"
                  >
                    +91 98254 50176
                  </a>
                </div>
              </div>

              {/* WhatsApp */}
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center justify-center flex-shrink-0">
                  <MessageCircle className="w-4 h-4" />
                </div>
                <div>
                  <span className="font-bold text-[#101B36] block mb-0.5">
                    {lang === 'gu' ? 'વોટ્સએપ હેલ્પલાઇન:' : 'WhatsApp Helpline:'}
                  </span>
                  <a
                    href={generateWhatsAppUrl(
                      BUSINESS_INFO.whatsapp,
                      'Hello Dhanlaxmi Printing Press, I would like to get in touch.'
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-emerald-700 font-bold text-emerald-800 font-mono"
                  >
                    +91 98254 50176
                  </a>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-rose-50 text-rose-700 border border-rose-200 flex items-center justify-center flex-shrink-0">
                  <Mail className="w-4 h-4" />
                </div>
                <div className="truncate">
                  <span className="font-bold text-[#101B36] block mb-0.5">Email:</span>
                  <a
                    href={`mailto:${BUSINESS_INFO.email}`}
                    className="hover:text-[#214E9A] font-semibold text-slate-800 truncate"
                  >
                    {BUSINESS_INFO.email}
                  </a>
                </div>
              </div>

              {/* Hours */}
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center flex-shrink-0">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <span className="font-bold text-[#101B36] block mb-0.5">
                    {lang === 'gu' ? 'સમય:' : 'Working Timings:'}
                  </span>
                  <span className="text-slate-600 font-light">
                    {lang === 'gu' ? BUSINESS_INFO.hoursGu : BUSINESS_INFO.hours}
                  </span>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="pt-4 border-t border-slate-100 grid grid-cols-2 gap-3">
              <a
                href={generateCallUrl(BUSINESS_INFO.phone)}
                className="py-2.5 bg-[#101B36] text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 shadow"
              >
                <Phone className="w-3.5 h-3.5 text-sky-400" />
                <span>Call Now</span>
              </a>

              <a
                href={BUSINESS_INFO.googleShareUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="py-2.5 bg-gradient-to-r from-[#c9a227] to-[#dfba47] text-[#101B36] rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 shadow hover:brightness-105 transition-all"
              >
                <Navigation className="w-3.5 h-3.5" />
                <span>Google Maps</span>
              </a>
            </div>
          </div>
        </div>

        {/* Right: Message Form */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-10 border border-[#c9a227]/30 shadow-xl space-y-6">
          <div className="border-b border-slate-100 pb-3">
            <span className="text-xs font-extrabold uppercase tracking-widest text-[#9e7a17] font-mono">
              {lang === 'gu' ? 'સંદેશો મોકલો' : 'Drop a Message'}
            </span>
            <h2 className="text-2xl font-extrabold text-[#101B36] font-serif mt-1">
              {lang === 'gu' ? 'અમને સંદેશ મોકલો' : 'Send Us an Online Inquiry'}
            </h2>
            <p className="text-xs text-slate-500 font-light">
              Leave your contact notes and requirements below. Our desk will contact you.
            </p>
          </div>

          {submittedRef ? (
            <div className="p-8 bg-emerald-50 rounded-2xl border border-emerald-200 text-center space-y-4 animate-in fade-in">
              <div className="w-12 h-12 mx-auto bg-emerald-600 text-white rounded-full flex items-center justify-center shadow-lg">
                <CheckCircle2 className="w-7 h-7" />
              </div>
              <div className="space-y-1">
                <h3 className="text-xl font-extrabold text-emerald-950 font-serif">
                  {lang === 'gu' ? 'સંદેશો સફળતાપૂર્વક મોકલાઈ ગયો છે!' : 'Message Received Successfully!'}
                </h3>
                <p className="text-xs sm:text-sm text-emerald-800">
                  Reference ID:{' '}
                  <span className="font-mono font-bold text-slate-900 bg-white px-2.5 py-1 rounded-md border border-emerald-300">
                    {submittedRef}
                  </span>
                </p>
              </div>

              <div className="flex flex-wrap justify-center gap-3 pt-2">
                <a
                  href={generateWhatsAppUrl(
                    BUSINESS_INFO.whatsapp,
                    `Hello Dhanlaxmi Printing Press, I sent inquiry Ref: ${submittedRef}.`
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl text-xs flex items-center gap-2 shadow"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Notify via WhatsApp</span>
                </a>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {errorMsg && (
                <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs font-semibold">
                  {errorMsg}
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700">Full Name *</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Ramesh Patel"
                    className="w-full px-3 py-2.5 text-xs bg-[#FAF7F0] border border-slate-300 rounded-xl focus:ring-2 focus:ring-[#c9a227]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700">Mobile Number *</label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="10-digit mobile"
                    className="w-full px-3 py-2.5 text-xs bg-[#FAF7F0] border border-slate-300 rounded-xl focus:ring-2 focus:ring-[#c9a227]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700">Email (Optional)</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@example.com"
                    className="w-full px-3 py-2.5 text-xs bg-[#FAF7F0] border border-slate-300 rounded-xl focus:ring-2 focus:ring-[#c9a227]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700">Inquiry Subject</label>
                  <select
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="w-full px-3 py-2.5 text-xs bg-[#FAF7F0] border border-slate-300 rounded-xl focus:ring-2 focus:ring-[#c9a227]"
                  >
                    <option value="General Printing Enquiry">General Printing Enquiry</option>
                    <option value="Wedding Kankotri / Invitation">Wedding Kankotri / Invitation</option>
                    <option value="Commercial Bill Books & Invoices">Commercial Bill Books & Invoices</option>
                    <option value="Urgent DTP / Typesetting Work">Urgent DTP / Typesetting Work</option>
                    <option value="Book Binding & Registers">Book Binding & Registers</option>
                    <option value="Delivery & Order Status">Delivery & Order Status</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-700">Message / Product Details *</label>
                <textarea
                  rows={4}
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Write your specifications or questions here..."
                  className="w-full px-3 py-2 text-xs bg-[#FAF7F0] border border-slate-300 rounded-xl focus:ring-2 focus:ring-[#c9a227]"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-[#101B36] hover:bg-[#214E9A] text-white font-extrabold rounded-xl text-xs flex items-center justify-center gap-2 shadow transition-all"
              >
                <span>Send Message</span>
                <Send className="w-4 h-4" />
              </button>
            </form>
          )}
        </div>
      </div>

      {/* Map Embed Section */}
      <div className="bg-white rounded-3xl p-6 border border-[#c9a227]/30 shadow-xl space-y-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
          <div>
            <h3 className="font-extrabold text-base text-[#101B36] font-serif">
              {lang === 'gu' ? 'ધનલક્ષ્મી પ્રિન્ટીંગ પ્રેસનું સ્થાન (Google Maps Location)' : 'Location Map & Google Directions'}
            </h3>
            <p className="text-xs text-slate-500 font-light">
              {lang === 'gu' ? BUSINESS_INFO.addressGu : BUSINESS_INFO.address}
            </p>
          </div>
          <a
            href={BUSINESS_INFO.googleShareUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 bg-[#101B36] hover:bg-[#214E9A] text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow transition-all"
          >
            <Navigation className="w-3.5 h-3.5" />
            <span>Open in Google Maps</span>
          </a>
        </div>

        <div className="w-full h-80 rounded-2xl overflow-hidden border border-slate-200 relative bg-slate-100 shadow-inner">
          <iframe
            title="Dhanlaxmi Printing Press Official Google Maps Location"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            loading="lazy"
            allowFullScreen
            referrerPolicy="no-referrer-when-downgrade"
            src={BUSINESS_INFO.mapEmbedUrl}
          ></iframe>
        </div>
      </div>
    </div>
  );
};
