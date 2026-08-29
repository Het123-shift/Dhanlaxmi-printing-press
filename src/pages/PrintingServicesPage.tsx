import React from 'react';
import { Printer, Sparkles, Layers, ArrowRight, MessageCircle, CheckCircle2 } from 'lucide-react';
import { BUSINESS_INFO, Language } from '../data/content';
import { generateWhatsAppUrl } from '../utils/storage';

interface PrintingServicesPageProps {
  navigate: (route: string) => void;
  lang: Language;
}

export const PrintingServicesPage: React.FC<PrintingServicesPageProps> = ({ navigate, lang }) => {
  const printMethods = [
    {
      title: 'Multi-Color Offset Printing',
      titleGu: 'મલ્ટી-કલર ઓફસેટ પ્રિન્ટીંગ',
      tagline: 'High Volume & True Color Fidelity',
      taglineGu: 'મોટા જથ્થા માટે શ્રેષ્ઠ અને સચોટ કલર છાપકામ',
      whatIs: 'Offset printing uses etched metal plates that transfer ink onto rubber rollers and then onto the paper sheet. It is the global benchmark for rich, razor-sharp color rendering.',
      whatIsGu: 'ઓફસેટ પ્રિન્ટીંગમાં મેટલ પ્લેટ્સ અને રબર રોલર્સની મદદથી કાગળ પર શાહી છાપવામાં આવે છે. મોટા લોટ માટે આ સૌથી સસ્તી અને શાર્પ પદ્ધતિ છે.',
      suitableFor: 'Brochures, Catalogues, Magazine Covers, Invitation Inserts, Pamphlets, Colored Booklets, and Box Packaging.',
      suitableForGu: 'બ્રોશર, કેટલોગ, રંગીન કંકોત્રી, પાટિયા/કવર, પત્રિકાઓ, પુસ્તક કવર અને પેકિંગ બોક્સ.',
      customization: 'CMYK 4-Color process, Spot Pantone colors, Matte/Gloss varnish, Paper weights from 70 GSM to 400 GSM.',
      customizationGu: '૪-કલર CMYK, સ્પોટ કલર, મેટ/ગ્લોસ વાર્નિશ, ૭૦ થી ૪૦૦ GSM સુધીના કાગળ.',
    },
    {
      title: 'Screen Printing (Silkscreen)',
      titleGu: 'સ્ક્રીન પ્રિન્ટીંગ (સિલ્કસ્ક્રીન)',
      tagline: 'Thick Metallic Inks & Specialty Substrates',
      taglineGu: 'સોનેરી-રૂપેરી ચમકદાર શાહી અને વિશિષ્ટ કાગળ પર છાપકામ',
      whatIs: 'Screen printing forces viscous ink through a precision mesh stencil. It applies significantly thicker layers of opaque metallic gold, silver, pearl, and white inks.',
      whatIsGu: 'સ્ક્રીન પ્રિન્ટીંગમાં મેશ જાળી દ્વારા જાડી શાહી છાપવામાં આવે છે. આનાથી સોનેરી (ગોલ્ડ) અને ચાંદી (સિલ્વર) ચમકદાર અક્ષરો ખૂબ જ આકર્ષક ઉપસી આવે છે.',
      suitableFor: 'Traditional Wedding Kankotri, Cloth/Jute Bags, Rigid Dark Paper Boards, Plastic Sheets, and Metallic Seals.',
      suitableForGu: 'પરંપરાગત લગ્ન કંકોત્રી, કાપડની થેલીઓ, ડાર્ક જાડા પૂંઠા, પ્લાસ્ટિક અને ફેન્સી કવર.',
      customization: 'Rich Rich Gold Inks, Silver Sparkle, Raised Puff ink, Velvet sheets, Fluorescent colors.',
      customizationGu: 'શુદ્ધ ગોલ્ડન શાહી, સિલ્વર ચમક, ઉપસેલા અક્ષરો (Puff), વેલ્વેટ અને ટેક્ષ્ચર શીટ્સ.',
    },
    {
      title: 'Commercial Offset Stationery Printing',
      titleGu: 'કોમર્શિયલ ઓફસેટ સ્ટેશનરી પ્રિન્ટીંગ',
      tagline: 'High Speed, Numbering & Multi-Part NCR',
      taglineGu: 'ઝડપી છાપકામ, સચોટ નંબરિંગ અને કાર્બનલેસ પેપર',
      whatIs: 'Specialized single and two-color offset presses optimized for crisp line grids, legal notices, and multi-copy self-carbon paper numbering.',
      whatIsGu: 'બિલ બુક અને ખાતાવહી માટે ખાસ તૈયાર કરેલી મશીનરી જે ચોક્કસ લાઈનિંગ અને આપોઆપ ક્રમશઃ નંબર છાપે છે.',
      suitableFor: 'GST Bill Books, Bilty Books, Lorry Receipts (L.R.), Challan pads, Voucher books, and Letter pads.',
      suitableForGu: 'જીએસટી બિલ બુક, ટ્રાન્સપોર્ટ L.R., ડિલિવરી ચલણ, વાઉચર બુક્સ અને લેટરપેડ.',
      customization: 'Red/Black auto crash numbering, Micro perforation tear lines, Colored NCR sheets (Pink/Yellow/Blue).',
      customizationGu: 'લાલ કે કાળી શાહીમાં ક્રમશઃ નંબર, ટીયર ઓફ પંચિંગ, રંગબેરંગી કાર્બનલેસ પેપર.',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-blue-900 to-indigo-950 text-white rounded-3xl p-8 sm:p-12 shadow-xl space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-500/20 text-cyan-300 rounded-full text-xs font-semibold">
          <Printer className="w-3.5 h-3.5" />
          <span>{lang === 'gu' ? 'ઓફસેટ, મલ્ટી-કલર અને સ્ક્રીન પ્રિન્ટીંગ' : 'Press Technology & Capabilities'}</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold">
          {lang === 'gu' ? 'પ્રિન્ટીંગ સેવાઓ અને ટેકનોલોજી' : 'Printing Services & Press Methods'}
        </h1>
        <p className="text-xs sm:text-sm text-slate-200 max-w-3xl leading-relaxed">
          {lang === 'gu'
            ? 'ગ્રાહકની જરૂરિયાત અને જથ્થા અનુસાર અમે સૌથી યોગ્ય પ્રિન્ટીંગ પદ્ધતિ પસંદ કરીએ છીએ જેથી ઉત્તમ પરિણામ અને વ્યાજબી ભાવ મળી રહે.'
            : 'Explore our multi-color offset, screen, and commercial printing processes. Clear comparisons to help you choose the right technique for your budget and finish.'}
        </p>
      </div>

      {/* Printing Method Detailed Cards */}
      <div className="space-y-8">
        {printMethods.map((method, idx) => (
          <div
            key={idx}
            className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-md grid grid-cols-1 lg:grid-cols-12 gap-6 items-start"
          >
            <div className="lg:col-span-4 space-y-3 border-b lg:border-b-0 lg:border-r border-slate-100 pb-4 lg:pb-0 lg:pr-6">
              <div className="w-10 h-10 rounded-xl bg-blue-900 text-white flex items-center justify-center font-bold">
                0{idx + 1}
              </div>
              <h3 className="text-xl font-extrabold text-slate-900">
                {lang === 'gu' ? method.titleGu : method.title}
              </h3>
              <p className="text-xs font-bold text-amber-700">
                {lang === 'gu' ? method.taglineGu : method.tagline}
              </p>
              <div className="pt-2 flex flex-col gap-2">
                <button
                  onClick={() => navigate('quote')}
                  className="px-4 py-2 bg-blue-900 hover:bg-blue-800 text-white text-xs font-bold rounded-xl transition-all text-center"
                >
                  {lang === 'gu' ? 'આના માટે ભાવ પૂછો' : 'Request Quote'}
                </button>
                <a
                  href={generateWhatsAppUrl(
                    BUSINESS_INFO.whatsapp,
                    `Hello Dhanlaxmi Printing Press, I want to inquire about ${method.title}.`
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-emerald-50 text-emerald-800 hover:bg-emerald-100 text-xs font-semibold rounded-xl transition-all flex items-center justify-center gap-1.5"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>WhatsApp Inquiry</span>
                </a>
              </div>
            </div>

            <div className="lg:col-span-8 space-y-4 text-xs">
              <div>
                <h4 className="font-bold text-slate-900 uppercase tracking-wider mb-1 text-[11px]">
                  {lang === 'gu' ? 'આ પદ્ધતિ શું છે? (What It Is):' : 'What It Is:'}
                </h4>
                <p className="text-slate-600 leading-relaxed">
                  {lang === 'gu' ? method.whatIsGu : method.whatIs}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="bg-slate-50 p-4 rounded-xl space-y-1 border border-slate-200/70">
                  <h5 className="font-bold text-blue-900 uppercase tracking-wider text-[10px]">
                    {lang === 'gu' ? 'કોના માટે સૌથી વધુ અનુકૂળ:' : 'Best Suitable For:'}
                  </h5>
                  <p className="text-slate-700 leading-relaxed">
                    {lang === 'gu' ? method.suitableForGu : method.suitableFor}
                  </p>
                </div>

                <div className="bg-slate-50 p-4 rounded-xl space-y-1 border border-slate-200/70">
                  <h5 className="font-bold text-amber-900 uppercase tracking-wider text-[10px]">
                    {lang === 'gu' ? 'કસ્ટમાઇઝેશન વિકલ્પો:' : 'Customization Options:'}
                  </h5>
                  <p className="text-slate-700 leading-relaxed">
                    {lang === 'gu' ? method.customizationGu : method.customization}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Comparison Matrix Table */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xl space-y-6">
        <div>
          <h2 className="text-xl font-extrabold text-slate-900">
            {lang === 'gu' ? 'પ્રિન્ટીંગ પદ્ધતિ સરખામણી કોષ્ટક' : 'Printing Technique Quick Comparison'}
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            {lang === 'gu'
              ? 'તમારા ઓર્ડરના કદ અને પેપર જરૂરિયાત મુજબ યોગ્ય પદ્ધતિ સમજો.'
              : 'Compare methods side-by-side to select the ideal option for your project.'}
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-900 text-white">
                <th className="p-3.5 rounded-tl-xl font-bold">Printing Type</th>
                <th className="p-3.5 font-bold">Best Quantity Run</th>
                <th className="p-3.5 font-bold">Ideal Suitable Products</th>
                <th className="p-3.5 rounded-tr-xl font-bold">Key Advantage</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 text-slate-700">
              <tr className="hover:bg-slate-50">
                <td className="p-3.5 font-extrabold text-blue-900">Multi-Color Offset</td>
                <td className="p-3.5">500 to 50,000+ copies</td>
                <td className="p-3.5">Brochures, Catalogues, Magazine Covers, Pamphlets</td>
                <td className="p-3.5 font-medium text-emerald-800">Ultra sharp photography & economical in volume</td>
              </tr>
              <tr className="hover:bg-slate-50">
                <td className="p-3.5 font-extrabold text-amber-900">Screen Printing</td>
                <td className="p-3.5">100 to 2,000 cards</td>
                <td className="p-3.5">Wedding Kankotri, Cloth Bags, Velvet Sheets, Gold Foils</td>
                <td className="p-3.5 font-medium text-amber-800">Lustrous metallic gold, heavy ink layer on dark sheets</td>
              </tr>
              <tr className="hover:bg-slate-50">
                <td className="p-3.5 font-extrabold text-slate-900">Commercial Bill Offset</td>
                <td className="p-3.5">10 to 500+ books</td>
                <td className="p-3.5">Tax Invoices, Transport Bilty, Challans, Registers</td>
                <td className="p-3.5 font-medium text-blue-800">Precise NCR transfer, fast crash numbering & perforation</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
