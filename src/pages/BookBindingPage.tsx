import React, { useState } from 'react';
import {
  Layers,
  BookOpen,
  CheckCircle2,
  Send,
  MessageCircle,
  Upload,
  ArrowRight,
} from 'lucide-react';
import { BUSINESS_INFO, Language } from '../data/content';
import { saveEnquiry, generateWhatsAppUrl } from '../utils/storage';

interface BookBindingPageProps {
  navigate: (route: string) => void;
  lang: Language;
}

export const BookBindingPage: React.FC<BookBindingPageProps> = ({ navigate, lang }) => {
  const [workType, setWorkType] = useState('Hardcover Rexine Binding with Golden Foil Lettering');
  const [approxPages, setApproxPages] = useState('100 to 200 Pages');
  const [quantity, setQuantity] = useState('10 to 25 Books');
  const [size, setSize] = useState('Ledger Size (14x11 in) / A4');
  const [coverType, setCoverType] = useState('Heavy Hardboard Rexine with Golden Emboss');
  const [bindingMethod, setBindingMethod] = useState('Section Thread Stitching (Sui-Dora) + Cloth Spine');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [notes, setNotes] = useState('');
  const [uploadedFileName, setUploadedFileName] = useState('');

  const [submittedRef, setSubmittedRef] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState('');

  const bindingTypes = [
    {
      title: 'Hardbound Register & Ledger Binding',
      titleGu: 'હાર્ડબાઉન્ડ રજીસ્ટર અને ખાતાવહી બાઇન્ડીંગ',
      desc: 'Heavy hardboards wrapped in durable rexine or book cloth with gold foil hot-stamped titles on front and spine.',
      descGu: 'મજબૂત પૂંઠા પર રેક્ઝીન કે કાપડનું પડ, સાથે પૂંઠા અને ધાર પર સોનેરી અક્ષરોનું એમ્બોસિંગ.',
    },
    {
      title: 'Section Sewing & Thread Stitching',
      titleGu: 'સેક્શન સીલાઈ અને દોરા બાઇન્ડીંગ',
      desc: 'Traditional thread sewing that allows books and thick registers to lay completely flat on desks without pages tearing loose.',
      descGu: 'પરંપરાગત મજબૂત દોરાની સિલાઈ જેથી જાડા ચોપડા સરળતાથી સપાટ ખુલી શકે અને પાના છૂટા ન પડે.',
    },
    {
      title: 'Commercial Society & Attendance Books',
      titleGu: 'સોસાયટી અને હાજરી પત્રક ચોપડા',
      desc: 'Custom ruled ledger grids, numbering, index pages, and reinforced cloth spine edges for multi-year record storage.',
      descGu: 'કસ્ટમ ખાના, ક્રમશઃ પાના નંબર, ઈન્ડેક્સ અને વર્ષો સુધી સચવાઈ રહે તેવા મજબૂત ચોપડા.',
    },
    {
      title: 'Softcover & Glue Pad Binding',
      titleGu: 'સોફ્ટકવર અને પેડ બાઇન્ડીંગ',
      desc: 'Perforated tear-away bill books, voucher pads, receipt books with protective wraparound covers.',
      descGu: 'સરળતાથી પાનું ફાડી શકાય તેવી પરફોરેટેડ બિલ બુક, વાઉચર અને રીસીપ્ટ પેડ બાઈન્ડીંગ.',
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
      setErrorMsg(lang === 'gu' ? 'નામ અને મોબાઈલ નંબર લખવો જરૂરી છે.' : 'Name and phone are required.');
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
      service: 'Book & Binding Works',
      subcategory: workType,
      quantity: quantity,
      size: size,
      binding_needed: `${coverType} | ${bindingMethod} | Pages: ${approxPages}`,
      requirements: `${notes} (Attachment: ${uploadedFileName || 'None'})`,
      delivery_required: false,
    });

    setSubmittedRef(newRecord.reference_number);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white rounded-3xl p-8 sm:p-12 shadow-xl space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-500/20 text-indigo-300 rounded-full text-xs font-semibold">
          <BookOpen className="w-3.5 h-3.5" />
          <span>{lang === 'gu' ? 'ટકાઉ બુક બાઇન્ડીંગ અને ચોપડા મેકિંગ' : 'Durable Bindery & Register Manufacturing'}</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold">
          {lang === 'gu' ? 'બુક બાઇન્ડીંગ અને રજીસ્ટર વર્ક' : 'Book & Binding Solutions'}
        </h1>
        <p className="text-xs sm:text-sm text-slate-200 max-w-3xl leading-relaxed">
          {lang === 'gu'
            ? 'સોસાયટી ચોપડા, ખાતાવહી, હાજરી પત્રક, બિલ બુક અને પુસ્તકો માટે રેક્ઝીન હાર્ડકવર, ગોલ્ડન ફોઇલ એમ્બોસિંગ અને મજબૂત સિલાઈ બાઇન્ડીંગ.'
            : 'Hardbound rexine bindings, gold embossed titles, thread sewing, custom accounts ledgers, attendance registers, and softbound book finishing.'}
        </p>
      </div>

      {/* Binding Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {bindingTypes.map((item, idx) => (
          <div
            key={idx}
            className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all space-y-3"
          >
            <div className="w-9 h-9 rounded-xl bg-indigo-50 text-indigo-700 flex items-center justify-center font-bold text-sm">
              0{idx + 1}
            </div>
            <h3 className="font-extrabold text-sm text-slate-900 leading-snug">
              {lang === 'gu' ? item.titleGu : item.title}
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              {lang === 'gu' ? item.descGu : item.desc}
            </p>
          </div>
        ))}
      </div>

      {/* Binding Quote Form */}
      <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-xl space-y-8">
        <div className="border-b border-slate-100 pb-4">
          <span className="text-xs font-extrabold uppercase tracking-widest text-indigo-800">
            {lang === 'gu' ? 'બાઇન્ડીંગ ભાવપત્રક' : 'Binding Quotation'}
          </span>
          <h2 className="text-2xl font-extrabold text-slate-900 mt-1">
            {lang === 'gu' ? 'ચોપડા / બુક બાઇન્ડીંગ માટે વિગત મોકલો' : 'Request a Binding Quote'}
          </h2>
          <p className="text-xs sm:text-sm text-slate-500">
            {lang === 'gu'
              ? 'પાનાની સંખ્યા, કવરનો પ્રકાર અને જથ્થો પસંદ કરી ભાવ મેળવો.'
              : 'Specify book dimensions, page count, and cover preferences to get exact binding rates.'}
          </p>
        </div>

        {submittedRef ? (
          <div className="p-8 bg-emerald-50 rounded-2xl border border-emerald-200 text-center space-y-4 animate-in fade-in">
            <div className="w-12 h-12 mx-auto bg-emerald-600 text-white rounded-full flex items-center justify-center shadow-lg">
              <CheckCircle2 className="w-7 h-7" />
            </div>
            <div className="space-y-1">
              <h3 className="text-xl font-extrabold text-emerald-950">
                {lang === 'gu' ? 'બાઇન્ડીંગ વિનંતી સફળતાપૂર્વક નોંધાઈ!' : 'Binding Enquiry Received Successfully!'}
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
                ? 'અમારી ટીમ તમારી વિગત ચકાસીને સૌથી વ્યાજબી દર જણાવશે.'
                : 'Our bindery supervisor will evaluate your specifications and reply with quotation details.'}
            </p>

            <div className="flex flex-wrap justify-center gap-3 pt-2">
              <a
                href={generateWhatsAppUrl(
                  BUSINESS_INFO.whatsapp,
                  `Hello Dhanlaxmi Printing Press, I submitted binding quote Ref: ${submittedRef} for ${workType}.`
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl text-xs flex items-center gap-2 shadow"
              >
                <MessageCircle className="w-4 h-4" />
                <span>{lang === 'gu' ? 'વોટ્સએપ પર વાત કરો' : 'Discuss on WhatsApp'}</span>
              </a>
              <button
                onClick={() => {
                  setSubmittedRef(null);
                  setName('');
                  setPhone('');
                }}
                className="px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-800 font-semibold rounded-xl text-xs"
              >
                {lang === 'gu' ? 'બીજી વિગત મોકલો' : 'Submit Another Request'}
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
                  {lang === 'gu' ? 'બાઇન્ડીંગનો પ્રકાર (Work Type) *' : 'Work Type *'}
                </label>
                <select
                  value={workType}
                  onChange={(e) => setWorkType(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-600 focus:bg-white"
                >
                  <option value="Hardcover Rexine Binding with Golden Foil Lettering">Hardcover Rexine with Gold Foil</option>
                  <option value="Society Record Register & Ledger Book">Society Record Register & Ledger Book</option>
                  <option value="Attendance / Stock Register Making">Attendance / Stock Register Making</option>
                  <option value="Softcover Bookbinding / Perfect Binding">Softcover Bookbinding / Perfect Binding</option>
                  <option value="Spiral / Wiro Binding">Spiral / Wiro Binding</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-800">
                  {lang === 'gu' ? 'અંદાજિત પાના (Approx Pages)' : 'Approximate Pages'}
                </label>
                <select
                  value={approxPages}
                  onChange={(e) => setApproxPages(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-600 focus:bg-white"
                >
                  <option value="50 to 100 Pages">50 to 100 Pages</option>
                  <option value="100 to 200 Pages">100 to 200 Pages</option>
                  <option value="300 to 500 Pages (Thick Ledger)">300 to 500 Pages (Thick Ledger)</option>
                  <option value="500+ Pages (Heavy Volume)">500+ Pages (Heavy Volume)</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-800">
                  {lang === 'gu' ? 'ચોપડાની સંખ્યા (Quantity)' : 'Quantity'}
                </label>
                <select
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-600 focus:bg-white"
                >
                  <option value="1 to 5 Books">1 to 5 Books</option>
                  <option value="10 to 25 Books">10 to 25 Books</option>
                  <option value="50 to 100 Books">50 to 100 Books</option>
                  <option value="100+ Books (Bulk Commercial)">100+ Books (Bulk Commercial)</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-800">
                  {lang === 'gu' ? 'કદ (Size)' : 'Dimensions / Size'}
                </label>
                <select
                  value={size}
                  onChange={(e) => setSize(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-600 focus:bg-white"
                >
                  <option value="Ledger Size (14x11 in)">Ledger Size (14x11 in)</option>
                  <option value="A4 Size (8.27 x 11.69 in)">A4 Size (8.27 x 11.69 in)</option>
                  <option value="Legal Size (8.5 x 14 in)">Legal Size (8.5 x 14 in)</option>
                  <option value="Custom Size">Custom Size</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-800">
                  {lang === 'gu' ? 'કવરનો પ્રકાર (Cover Type)' : 'Cover Type'}
                </label>
                <select
                  value={coverType}
                  onChange={(e) => setCoverType(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-600 focus:bg-white"
                >
                  <option value="Heavy Hardboard Rexine with Golden Emboss">Hardboard Rexine with Golden Emboss</option>
                  <option value="Cloth Bound Hardboard (Kapda Patti)">Cloth Bound Hardboard (Kapda Patti)</option>
                  <option value="Laminated 350 GSM Art Card (Softcover)">Laminated 350 GSM Art Card (Softcover)</option>
                  <option value="Plastic Sheet Protective Cover">Plastic Sheet Protective Cover</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-800">
                  {lang === 'gu' ? 'સિલાઈ પદ્ધતિ (Binding Method)' : 'Binding Method'}
                </label>
                <select
                  value={bindingMethod}
                  onChange={(e) => setBindingMethod(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-600 focus:bg-white"
                >
                  <option value="Section Thread Stitching (Sui-Dora) + Cloth Spine">Section Thread Stitching (Sui-Dora)</option>
                  <option value="Side Wire Stapling + Tape Spine">Side Wire Stapling + Tape Spine</option>
                  <option value="Perfect Glue Binding">Perfect Glue Binding</option>
                  <option value="Spiral / Comb Ring">Spiral / Comb Ring</option>
                </select>
              </div>
            </div>

            {/* Customer Details */}
            <div className="border-t border-slate-100 pt-5 space-y-4">
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                {lang === 'gu' ? 'સંપર્ક વિગત' : 'Customer Details'}
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
                    placeholder="e.g. Ketanbhai Joshi"
                    className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-600 focus:bg-white"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700">
                    {lang === 'gu' ? 'મોબાઈલ નંબર *' : 'Phone / Mobile *'}
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="10-digit mobile"
                    className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-600 focus:bg-white"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700">Email (Optional)</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="ketan@example.com"
                    className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-600 focus:bg-white"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-700">
                  {lang === 'gu' ? 'વિશેષ નોંધ / ગોલ્ડન અક્ષરોનું નામ' : 'Notes / Golden Embossing Title Name'}
                </label>
                <textarea
                  rows={2}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder={lang === 'gu' ? 'દા.ત. પૂંઠા પર સોસાયટીનું નામ સોનેરી અક્ષરે લખવું...' : 'e.g. Society name to be embossed on cover in gold letters...'}
                  className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-600 focus:bg-white"
                />
              </div>
            </div>

            {/* Actions */}
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <button
                type="submit"
                className="px-6 py-3.5 bg-indigo-900 hover:bg-indigo-800 text-white font-extrabold rounded-xl text-xs flex items-center gap-2 shadow transition-all"
              >
                <span>{lang === 'gu' ? 'બાઇન્ડીંગ ભાવપત્રક મોકલો' : 'Submit Binding Quote Request'}</span>
                <Send className="w-4 h-4" />
              </button>

              <a
                href={generateWhatsAppUrl(
                  BUSINESS_INFO.whatsapp,
                  `Hello Dhanlaxmi Printing Press, I need binding quote for ${workType}.`
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-3.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl text-xs flex items-center gap-2 shadow transition-all"
              >
                <MessageCircle className="w-4 h-4" />
                <span>{lang === 'gu' ? 'વોટ્સએપ પર પૂછપરછ' : 'Enquire on WhatsApp'}</span>
              </a>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
