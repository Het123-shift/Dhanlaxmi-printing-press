import React, { useState } from 'react';
import { MessageCircle, X, Send } from 'lucide-react';
import { BUSINESS_INFO, Language } from '../data/content';
import { generateWhatsAppUrl } from '../utils/storage';

interface FloatingWhatsAppProps {
  lang: Language;
  customTopic?: string;
}

export const FloatingWhatsApp: React.FC<FloatingWhatsAppProps> = ({ lang, customTopic }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [userMsg, setUserMsg] = useState('');

  const defaultMsg = customTopic
    ? `Hello Dhanlaxmi Printing Press, I am interested in ${customTopic}. Please share details and pricing.`
    : lang === 'gu'
    ? 'નમસ્તે ધનલક્ષ્મી પ્રિન્ટીંગ પ્રેસ, મારે પ્રિન્ટીંગ / કંકોત્રી બાબતે માહિતી મેળવવી છે.'
    : 'Hello Dhanlaxmi Printing Press, I would like to enquire about your printing and kankotri services.';

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    const finalMsg = userMsg.trim() || defaultMsg;
    const url = generateWhatsAppUrl(BUSINESS_INFO.whatsapp, finalMsg);
    window.open(url, '_blank');
    setIsOpen(false);
    setUserMsg('');
  };

  const handleQuickClick = (text: string) => {
    const url = generateWhatsAppUrl(BUSINESS_INFO.whatsapp, text);
    window.open(url, '_blank');
    setIsOpen(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Popover */}
      {isOpen && (
        <div className="mb-3 w-80 sm:w-96 bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in slide-in-from-bottom-5 duration-200">
          {/* Header */}
          <div className="bg-emerald-700 text-white p-4 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-white rounded-full p-0.5 shadow-sm flex-shrink-0">
                <img
                  src="/logo.png"
                  alt="Dhanlaxmi Logo"
                  className="w-full h-full object-contain rounded-full"
                />
              </div>
              <div>
                <h4 className="font-bold text-sm leading-tight">
                  {lang === 'gu' ? BUSINESS_INFO.nameGu : BUSINESS_INFO.name}
                </h4>
                <p className="text-[11px] text-emerald-100 flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-300 animate-pulse"></span>
                  {lang === 'gu' ? 'ઓનલાઇન સહાય માટે ઉપલબ્ધ' : 'Direct WhatsApp Support'}
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white/80 hover:text-white p-1 rounded-lg hover:bg-emerald-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body */}
          <div className="p-4 bg-slate-50 text-xs space-y-3">
            <div className="bg-white p-3 rounded-xl rounded-tl-none shadow-sm border border-slate-100 text-slate-700 leading-relaxed">
              <p className="font-semibold text-slate-900 mb-1">
                {lang === 'gu' ? 'ધનલક્ષ્મી પ્રિન્ટીંગ પ્રેસમાં આપનું સ્વાગત છે! 🙏' : 'Welcome to Dhanlaxmi Printing Press! 🙏'}
              </p>
              <p>
                {lang === 'gu'
                  ? 'કંકોત્રી, બિલ બુક, ડીટીપી, ઓફસેટ પ્રિન્ટીંગ કે બાઇન્ડીંગ માટે અમને સીધો મેસેજ મોકલો.'
                  : 'How can we help you today with your printing, kankotri, or design requirement?'}
              </p>
            </div>

            {/* Quick Suggestions */}
            <div className="space-y-1.5 pt-1">
              <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                {lang === 'gu' ? 'ઝડપી વિકલ્પો:' : 'Quick Inquiries:'}
              </p>
              <button
                onClick={() =>
                  handleQuickClick(
                    'Hello Dhanlaxmi Printing Press, I want to enquire about Wedding Kankotri designs & pricing.'
                  )
                }
                className="w-full text-left p-2 rounded-lg bg-white hover:bg-emerald-50 hover:text-emerald-800 border border-slate-200 transition-colors text-[11px] text-slate-700 font-medium"
              >
                💌 {lang === 'gu' ? 'લગ્ન કંકોત્રી ડિઝાઈન અને ભાવ' : 'Wedding Kankotri Designs & Rates'}
              </button>
              <button
                onClick={() =>
                  handleQuickClick(
                    'Hello Dhanlaxmi Printing Press, I need a quotation for Bill Books / Tax Invoices.'
                  )
                }
                className="w-full text-left p-2 rounded-lg bg-white hover:bg-emerald-50 hover:text-emerald-800 border border-slate-200 transition-colors text-[11px] text-slate-700 font-medium"
              >
                📄 {lang === 'gu' ? 'બિલ બુક / ચલણ પ્રિન્ટીંગ' : 'Bill Books / GST Invoice Printing'}
              </button>
              <button
                onClick={() =>
                  handleQuickClick(
                    'Hello Dhanlaxmi Printing Press, I need urgent DTP typing / layout design work.'
                  )
                }
                className="w-full text-left p-2 rounded-lg bg-white hover:bg-emerald-50 hover:text-emerald-800 border border-slate-200 transition-colors text-[11px] text-slate-700 font-medium"
              >
                ✍️ {lang === 'gu' ? 'ગુજરાતી DTP ટાઈપિંગ અને કમ્પોઝિંગ' : 'Gujarati DTP Composing & Artwork'}
              </button>
            </div>

            {/* Input Form */}
            <form onSubmit={handleSend} className="pt-2">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={userMsg}
                  onChange={(e) => setUserMsg(e.target.value)}
                  placeholder={
                    lang === 'gu' ? 'તમારો મેસેજ અહીં લખો...' : 'Type your enquiry message...'
                  }
                  className="flex-1 px-3 py-2 text-xs bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
                <button
                  type="submit"
                  className="px-3 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition-colors flex items-center justify-center shadow-sm"
                  title="Send to WhatsApp"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Floating Button Icon */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white shadow-2xl flex items-center justify-center transition-transform hover:scale-105 active:scale-95 group relative"
        aria-label="Chat on WhatsApp"
      >
        <MessageCircle className="w-8 h-8 group-hover:animate-bounce" />
        <span className="absolute -top-1 -right-1 w-4 h-4 bg-amber-400 text-slate-950 font-extrabold text-[10px] rounded-full flex items-center justify-center shadow">
          1
        </span>
      </button>
    </div>
  );
};
