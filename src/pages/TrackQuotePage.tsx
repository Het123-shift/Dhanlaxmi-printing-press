import React, { useState } from 'react';
import {
  Search,
  CheckCircle2,
  Clock,
  Phone,
  MessageCircle,
  FileText,
  AlertCircle,
  ArrowRight,
  ShieldCheck,
} from 'lucide-react';
import type { EnquiryRecord } from '../data/content';
import { getEnquiriesAsync, generateWhatsAppUrl, generateCallUrl } from '../utils/storage';
import { BUSINESS_INFO, Language } from '../data/content';

interface TrackQuotePageProps {
  navigate: (route: string) => void;
  lang: Language;
}

export const TrackQuotePage: React.FC<TrackQuotePageProps> = ({ navigate, lang }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searched, setSearched] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<EnquiryRecord[]>([]);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    const query = searchQuery.trim();
    if (!query) return;

    setIsLoading(true);
    setSearched(true);
    try {
      const all = await getEnquiriesAsync();
      const matched = all.filter(
        (item) =>
          item.reference_number.toLowerCase() === query.toLowerCase() ||
          item.phone.includes(query) ||
          (query.length >= 4 && item.customer_name.toLowerCase().includes(query.toLowerCase()))
      );
      setResults(matched);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Banner */}
      <div className="bg-gradient-to-r from-blue-900 via-indigo-950 to-slate-900 text-white rounded-3xl p-8 sm:p-10 shadow-xl space-y-3 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-400/20 text-amber-300 rounded-full text-xs font-semibold">
          <Search className="w-3.5 h-3.5" />
          <span>{lang === 'gu' ? 'ઓનલાઇન સ્ટેટસ ટ્રેકિંગ' : 'Live Status Lookup'}</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-extrabold">
          {lang === 'gu' ? 'તમારું ભાવપત્રક / ઓર્ડર સ્ટેટસ તપાસો' : 'Track Your Requested Quote'}
        </h1>
        <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto leading-relaxed">
          {lang === 'gu'
            ? 'તમારો રેફરન્સ નંબર (દા.ત. DLP-2026-8801) અથવા તમારો ૧૦ આંકડાનો મોબાઈલ નંબર દાખલ કરીને તમારા ભાવપત્રકની સ્થિતિ જાણો.'
            : 'Enter your Reference ID (e.g. DLP-2026-8801) or 10-digit Phone Number to check your quotation progress.'}
        </p>
      </div>

      {/* Search Box */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xl space-y-6">
        <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              required
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={
                lang === 'gu'
                  ? 'રેફરન્સ નંબર અથવા મોબાઈલ નંબર લખો...'
                  : 'Enter Reference ID (e.g. DLP-2026-8801) or Phone Number...'
              }
              className="w-full pl-11 pr-4 py-3.5 text-xs sm:text-sm bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-600 focus:bg-white transition-all font-mono"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="px-6 py-3.5 bg-blue-900 hover:bg-blue-800 text-white font-extrabold rounded-xl text-xs sm:text-sm shadow flex items-center justify-center gap-2 transition-all"
          >
            <Search className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
            <span>{lang === 'gu' ? 'સ્ટેટસ શોધો' : 'Track Quote'}</span>
          </button>
        </form>

        {/* Search Results */}
        {searched && (
          <div className="space-y-4 pt-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 border-b border-slate-100 pb-2">
              {lang === 'gu' ? 'શોધ પરિણામો:' : 'Search Results:'} ({results.length})
            </h3>

            {results.length === 0 ? (
              <div className="p-8 text-center bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
                <AlertCircle className="w-8 h-8 mx-auto text-amber-500" />
                <p className="text-xs sm:text-sm font-semibold text-slate-800">
                  {lang === 'gu'
                    ? 'આ રેફરન્સ નંબર કે મોબાઈલ નંબર સાથે કોઈ ભાવપત્રક મળ્યું નથી.'
                    : 'No quote request found for this Reference ID or Phone Number.'}
                </p>
                <p className="text-xs text-slate-500">
                  {lang === 'gu'
                    ? 'કૃપા કરીને સાચો નંબર દાખલ કરો અથવા સીધા વોટ્સએપ પર અમારો સંપર્ક કરો.'
                    : 'Please double-check your input or contact our press team directly on WhatsApp.'}
                </p>
                <a
                  href={generateWhatsAppUrl(
                    BUSINESS_INFO.whatsapp,
                    `Hello Dhanlaxmi Printing Press, I would like to check the status of my quote request for search: ${searchQuery}.`
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white text-xs font-bold rounded-xl shadow"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>Ask on WhatsApp</span>
                </a>
              </div>
            ) : (
              <div className="space-y-4">
                {results.map((item) => (
                  <div
                    key={item.id}
                    className="p-6 bg-slate-50 rounded-2xl border border-slate-200 hover:border-blue-300 transition-all space-y-4"
                  >
                    <div className="flex flex-wrap items-start justify-between gap-2">
                      <div>
                        <span className="text-xs font-mono font-bold text-blue-900 bg-white px-2.5 py-1 rounded-md border border-slate-200">
                          Ref: {item.reference_number}
                        </span>
                        <h4 className="text-base font-extrabold text-slate-900 mt-1.5">
                          {item.customer_name}
                        </h4>
                        <p className="text-[11px] text-slate-500">
                          Requested on {new Date(item.created_at).toLocaleDateString()} at{' '}
                          {new Date(item.created_at).toLocaleTimeString([], {
                            hour: '2-digit',
                            minute: '2-digit',
                          })}
                        </p>
                      </div>

                      {/* Status Badge */}
                      <span
                        className={`text-xs font-extrabold px-3 py-1 rounded-full border ${
                          item.status === 'New'
                            ? 'bg-blue-100 text-blue-800 border-blue-200'
                            : item.status === 'Contacted'
                            ? 'bg-amber-100 text-amber-900 border-amber-200'
                            : item.status === 'Quoted'
                            ? 'bg-purple-100 text-purple-900 border-purple-200'
                            : item.status === 'Approved'
                            ? 'bg-emerald-100 text-emerald-900 border-emerald-200'
                            : item.status === 'Completed'
                            ? 'bg-slate-200 text-slate-800 border-slate-300'
                            : 'bg-rose-100 text-rose-900 border-rose-200'
                        }`}
                      >
                        ● Status: {item.status}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                      <div className="bg-white p-2.5 rounded-xl border border-slate-200/80">
                        <span className="text-[10px] text-slate-400 block uppercase">Service</span>
                        <span className="font-bold text-slate-900">{item.service}</span>
                      </div>
                      <div className="bg-white p-2.5 rounded-xl border border-slate-200/80">
                        <span className="text-[10px] text-slate-400 block uppercase">Job / Type</span>
                        <span className="font-semibold text-slate-800 truncate block">
                          {item.subcategory || 'General'}
                        </span>
                      </div>
                      <div className="bg-white p-2.5 rounded-xl border border-slate-200/80">
                        <span className="text-[10px] text-slate-400 block uppercase">Quantity</span>
                        <span className="font-semibold text-slate-800">{item.quantity || 'N/A'}</span>
                      </div>
                      <div className="bg-white p-2.5 rounded-xl border border-slate-200/80">
                        <span className="text-[10px] text-slate-400 block uppercase">Delivery</span>
                        <span className="font-semibold text-slate-800">
                          {item.delivery_required ? 'Doorstep Delivery' : 'Store Pickup'}
                        </span>
                      </div>
                    </div>

                    {item.requirements && (
                      <div className="text-xs bg-white p-3 rounded-xl border border-slate-200/80">
                        <span className="text-[10px] font-bold text-slate-400 block uppercase mb-0.5">
                          Requirements / Notes:
                        </span>
                        <p className="text-slate-700 leading-relaxed">{item.requirements}</p>
                      </div>
                    )}

                    {/* Actions */}
                    <div className="pt-2 border-t border-slate-200/80 flex flex-wrap items-center justify-between gap-3">
                      <span className="text-xs text-slate-500">
                        Need immediate assistance with this quote?
                      </span>

                      <div className="flex gap-2">
                        <a
                          href={generateCallUrl(BUSINESS_INFO.phone)}
                          className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-bold flex items-center gap-1.5 shadow"
                        >
                          <Phone className="w-3 h-3 text-sky-400" />
                          <span>Call Press</span>
                        </a>

                        <a
                          href={generateWhatsAppUrl(
                            BUSINESS_INFO.whatsapp,
                            `Hello Dhanlaxmi Printing Press, I am following up on Quote Ref: ${item.reference_number} for ${item.service}.`
                          )}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-bold flex items-center gap-1.5 shadow"
                        >
                          <MessageCircle className="w-3 h-3" />
                          <span>Follow up on WhatsApp</span>
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
