import React, { useState } from 'react';
import {
  FileText,
  Send,
  MessageCircle,
  Upload,
  CheckCircle2,
  Phone,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  ShieldCheck,
} from 'lucide-react';
import { BUSINESS_INFO, ALL_SERVICES, Language, ServiceItem } from '../data/content';
import { saveEnquiry, generateWhatsAppUrl, generateCallUrl } from '../utils/storage';

interface QuotePageProps {
  navigate: (route: string) => void;
  lang: Language;
  preselectedService?: ServiceItem | null;
}

export const QuotePage: React.FC<QuotePageProps> = ({
  navigate,
  lang,
  preselectedService,
}) => {
  const [currentStep, setCurrentStep] = useState<number>(1);

  // Form State
  const [category, setCategory] = useState<string>(
    preselectedService ? preselectedService.category : 'invitation'
  );
  const [specificService, setSpecificService] = useState<string>(
    preselectedService ? preselectedService.title : 'Wedding Kankotri (Lagna Patrika)'
  );
  const [quantity, setQuantity] = useState('300 to 500 Copies / Cards');
  const [preferredSize, setPreferredSize] = useState('Standard Size');
  const [paperType, setPaperType] = useState('Metallic Gloss Card / Velvet Board');
  const [printingType, setPrintingType] = useState('Multi-Color Offset / Screen Foil');
  const [designRequired, setDesignRequired] = useState('Yes (Need DTP Composing)');
  const [bindingRequired, setBindingRequired] = useState('Standard Matching Envelope');
  const [transportRequired, setTransportRequired] = useState(false);
  const [deliveryLocation, setDeliveryLocation] = useState('');
  const [requiredDate, setRequiredDate] = useState('');
  const [uploadedFiles, setUploadedFiles] = useState<string[]>([]);
  const [additionalRequirements, setAdditionalRequirements] = useState('');

  // Customer Contact State
  const [fullName, setFullName] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [whatsappNumber, setWhatsappNumber] = useState('');
  const [email, setEmail] = useState('');

  // Result & Error States
  const [submittedRef, setSubmittedRef] = useState<string | null>(null);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const names = Array.from(e.target.files).map((f) => f.name);
      setUploadedFiles((prev) => [...prev, ...names]);
    }
  };

  const validateStep = (step: number) => {
    const errs: { [key: string]: string } = {};
    if (step === 4) {
      if (!fullName.trim()) errs.fullName = 'Full name is required.';
      if (!mobileNumber.trim()) errs.mobileNumber = 'Mobile number is required.';
      else if (mobileNumber.trim().length < 10) errs.mobileNumber = 'Enter a valid 10-digit mobile number.';
      if (email.trim() && !/\S+@\S+\.\S+/.test(email)) errs.email = 'Enter a valid email.';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => Math.min(prev + 1, 5));
    }
  };

  const handlePrev = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep(4)) {
      setCurrentStep(4);
      return;
    }

    const record = saveEnquiry({
      customer_name: fullName,
      phone: mobileNumber,
      whatsapp: whatsappNumber || mobileNumber,
      email: email || 'N/A',
      service: category,
      subcategory: specificService,
      quantity: quantity,
      size: preferredSize,
      paper_type: paperType,
      printing_type: printingType,
      design_needed: designRequired,
      binding_needed: bindingRequired,
      delivery_required: transportRequired,
      delivery_location: deliveryLocation || 'Pickup at Press',
      required_date: requiredDate || 'Flexible',
      requirements: `${additionalRequirements} | Uploaded: ${uploadedFiles.join(', ') || 'None'}`,
    });

    setSubmittedRef(record.reference_number);
  };

  const steps = [
    { num: 1, label: 'Service', labelGu: 'સેવા' },
    { num: 2, label: 'Specs', labelGu: 'વિગત' },
    { num: 3, label: 'Artwork', labelGu: 'ફાઈલ' },
    { num: 4, label: 'Contact', labelGu: 'સંપર્ક' },
    { num: 5, label: 'Review', labelGu: 'ચકાસણી' },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Banner */}
      <div className="bg-[#101B36] text-white rounded-3xl p-8 sm:p-10 shadow-xl border border-[#c9a227]/40 space-y-3 text-center">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-[#c9a227]/20 text-[#dfba47] rounded-full text-xs font-semibold font-mono">
          <Sparkles className="w-3.5 h-3.5" />
          <span>{lang === 'gu' ? 'ઓનલાઇન ભાવપત્રક વિનંતી' : 'Digital Quotation Studio'}</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-extrabold font-serif">
          {lang === 'gu' ? 'ઓનલાઇન ભાવપત્રક મેળવો (Request a Quote)' : 'Request a Custom Printing Quote'}
        </h1>
        <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto font-light">
          {lang === 'gu'
            ? 'સરળ ૫-પગલાંમાં તમારી પ્રિન્ટીંગ જરૂરિયાત પસંદ કરો અને ચોક્કસ ભાવ મેળવો.'
            : 'Complete our multi-step quote wizard to calculate paper GSM, finishes, and volume discounts.'}
        </p>
      </div>

      {submittedRef ? (
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-[#c9a227]/40 shadow-2xl text-center space-y-6 animate-in fade-in">
          <div className="w-16 h-16 mx-auto bg-emerald-600 text-white rounded-full flex items-center justify-center shadow-lg">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <div className="space-y-2">
            <h2 className="text-2xl font-extrabold text-[#101B36] font-serif">
              {lang === 'gu' ? 'અમને તમારી ભાવપત્રક વિનંતી મળી ગઈ છે!' : '“We have received your request.”'}
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              {lang === 'gu' ? 'તમારો ઓર્ડર રેફરન્સ નંબર:' : 'Your Official Enquiry Reference Number:'}{' '}
              <span className="font-mono font-extrabold text-[#101B36] bg-[#FAF7F0] px-3 py-1 rounded-lg border border-[#c9a227]/40 shadow-sm ml-1">
                {submittedRef}
              </span>
            </p>
          </div>

          <p className="text-xs text-slate-600 max-w-md mx-auto leading-relaxed font-light">
            Our Vadodara estimation desk is reviewing your requirements. You can track this quote anytime or continue directly on WhatsApp.
          </p>

          <div className="flex flex-wrap justify-center gap-3 pt-2">
            <a
              href={generateWhatsAppUrl(
                BUSINESS_INFO.whatsapp,
                `Hello Dhanlaxmi Printing Press, I have submitted Quote Request Ref: ${submittedRef} for ${specificService}. Please share quotation.`
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl text-xs sm:text-sm flex items-center gap-2 shadow-lg transition-all"
            >
              <MessageCircle className="w-4 h-4" />
              <span>{lang === 'gu' ? 'વોટ્સએપ પર વાત કરો' : 'Continue on WhatsApp'}</span>
            </a>

            <button
              onClick={() => {
                setSubmittedRef(null);
                setCurrentStep(1);
                setFullName('');
                setMobileNumber('');
                setAdditionalRequirements('');
              }}
              className="px-5 py-3.5 bg-[#FAF7F0] hover:bg-slate-100 text-[#101B36] font-semibold rounded-xl text-xs sm:text-sm border border-[#c9a227]/30 transition-all"
            >
              {lang === 'gu' ? 'બીજી વિનંતી મોકલો' : 'Submit Another Quote'}
            </button>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-[#c9a227]/30 shadow-xl space-y-8">
          {/* Progress Indicator */}
          <div className="grid grid-cols-5 gap-2 border-b border-slate-100 pb-6">
            {steps.map((s) => (
              <div
                key={s.num}
                onClick={() => s.num < currentStep && setCurrentStep(s.num)}
                className={`text-center cursor-pointer transition-all ${
                  currentStep === s.num
                    ? 'opacity-100 font-bold'
                    : currentStep > s.num
                    ? 'opacity-80 text-emerald-700'
                    : 'opacity-40'
                }`}
              >
                <div
                  className={`w-8 h-8 mx-auto mb-1 rounded-full flex items-center justify-center text-xs font-mono font-bold transition-all ${
                    currentStep === s.num
                      ? 'bg-[#101B36] text-[#dfba47] shadow-md border border-[#c9a227]'
                      : currentStep > s.num
                      ? 'bg-emerald-600 text-white'
                      : 'bg-slate-100 text-slate-500'
                  }`}
                >
                  {currentStep > s.num ? '✓' : s.num}
                </div>
                <span className="text-[10px] sm:text-xs block truncate text-slate-700">
                  {lang === 'gu' ? s.labelGu : s.label}
                </span>
              </div>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* STEP 1: CHOOSE SERVICE */}
            {currentStep === 1 && (
              <div className="space-y-5 animate-in fade-in duration-200">
                <div className="border-b border-slate-100 pb-2">
                  <h3 className="text-base font-extrabold text-[#101B36] font-serif">
                    Step 1: Choose Service & Category
                  </h3>
                  <p className="text-xs text-slate-500">Select what you want printed.</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-800">Primary Department</label>
                    <select
                      value={category}
                      onChange={(e) => {
                        setCategory(e.target.value);
                        const matching = ALL_SERVICES.find((s) => s.category === e.target.value);
                        if (matching) setSpecificService(matching.title);
                      }}
                      className="w-full px-3 py-2.5 text-xs bg-[#FAF7F0] border border-slate-300 rounded-xl focus:ring-2 focus:ring-[#c9a227]"
                    >
                      <option value="invitation">Invitation & Kankotri (કંકોત્રી અને આમંત્રણ)</option>
                      <option value="commercial">Commercial Printing (બિલ બુક, L.R., લેટરપેડ)</option>
                      <option value="dtp">DTP & Graphic Design (કમ્પોઝિંગ અને ડિઝાઇન)</option>
                      <option value="printing">Printing Services (ઓફસેટ / સ્ક્રીન પ્રિન્ટીંગ)</option>
                      <option value="binding">Book & Binding (ચોપડા અને બાઇન્ડીંગ)</option>
                      <option value="transport">Transport & Delivery (ડિલિવરી સપોર્ટ)</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-800">Specific Product / Job</label>
                    <select
                      value={specificService}
                      onChange={(e) => setSpecificService(e.target.value)}
                      className="w-full px-3 py-2.5 text-xs bg-[#FAF7F0] border border-slate-300 rounded-xl focus:ring-2 focus:ring-[#c9a227]"
                    >
                      {ALL_SERVICES.filter((s) => category === 'all' || s.category === category).map((srv) => (
                        <option key={srv.id} value={srv.title}>
                          {lang === 'gu' ? srv.titleGu : srv.title}
                        </option>
                      ))}
                      <option value="Other Custom Requirement">Other Custom Requirement</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {/* STEP 2: SPECIFICATIONS */}
            {currentStep === 2 && (
              <div className="space-y-5 animate-in fade-in duration-200">
                <div className="border-b border-slate-100 pb-2">
                  <h3 className="text-base font-extrabold text-[#101B36] font-serif">
                    Step 2: Quantity & Specifications
                  </h3>
                  <p className="text-xs text-slate-500">Specify dimensions and print methods.</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-800">Quantity / Copies *</label>
                    <input
                      type="text"
                      value={quantity}
                      onChange={(e) => setQuantity(e.target.value)}
                      placeholder="e.g. 350 Cards / 20 Books"
                      className="w-full px-3 py-2.5 text-xs bg-[#FAF7F0] border border-slate-300 rounded-xl focus:ring-2 focus:ring-[#c9a227]"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-800">Preferred Size</label>
                    <input
                      type="text"
                      value={preferredSize}
                      onChange={(e) => setPreferredSize(e.target.value)}
                      placeholder="e.g. A4 / 8x6 in / 9x4 in"
                      className="w-full px-3 py-2.5 text-xs bg-[#FAF7F0] border border-slate-300 rounded-xl focus:ring-2 focus:ring-[#c9a227]"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-800">Paper Type / GSM</label>
                    <select
                      value={paperType}
                      onChange={(e) => setPaperType(e.target.value)}
                      className="w-full px-3 py-2.5 text-xs bg-[#FAF7F0] border border-slate-300 rounded-xl focus:ring-2 focus:ring-[#c9a227]"
                    >
                      <option value="Metallic Gloss Card / Velvet Board">Metallic Gloss Card / Velvet Board</option>
                      <option value="NCR Carbonless (2-part or 3-part)">NCR Carbonless (2-part or 3-part)</option>
                      <option value="300-350 GSM Art Card">300-350 GSM Art Card (Visiting/Posters)</option>
                      <option value="Executive Bond Paper 85-100 GSM">Executive Bond Paper 85-100 GSM</option>
                      <option value="Maplitho / Standard 70-80 GSM">Maplitho / Standard 70-80 GSM</option>
                      <option value="Star Flex Vinyl">Star Flex Vinyl (Banners)</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {/* STEP 3: ARTWORK & DELIVERY */}
            {currentStep === 3 && (
              <div className="space-y-5 animate-in fade-in duration-200">
                <div className="border-b border-slate-100 pb-2">
                  <h3 className="text-base font-extrabold text-[#101B36] font-serif">
                    Step 3: Artwork Files & Delivery
                  </h3>
                  <p className="text-xs text-slate-500">Attach sample design and specify transport needs.</p>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-800">Upload Reference / Design Files</label>
                    <label className="px-4 py-4 bg-[#FAF7F0] border border-dashed border-[#c9a227]/50 rounded-2xl cursor-pointer hover:bg-white flex flex-col items-center justify-center gap-1.5 text-xs text-slate-600 transition-all text-center">
                      <Upload className="w-5 h-5 text-[#9e7a17]" />
                      <span className="font-semibold text-[#101B36]">Click to upload photos, Word drafts, or PDFs</span>
                      <span className="text-[10px] text-slate-400">Supported: PDF, JPG, PNG, DOCX, CDR</span>
                      <input type="file" multiple onChange={handleFileUpload} className="hidden" />
                    </label>

                    {uploadedFiles.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {uploadedFiles.map((name, idx) => (
                          <span
                            key={idx}
                            className="text-[11px] bg-[#FAF7F0] text-[#101B36] px-2 py-0.5 rounded-md border border-[#c9a227]/30 font-mono flex items-center gap-1"
                          >
                            <span>{name}</span>
                            <button
                              type="button"
                              onClick={() => setUploadedFiles(uploadedFiles.filter((_, i) => i !== idx))}
                              className="text-rose-500 font-bold ml-1"
                            >
                              ×
                            </button>
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="space-y-2 pt-2 border-t border-slate-100">
                    <label className="flex items-center gap-2 text-xs font-bold text-slate-800 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={transportRequired}
                        onChange={(e) => setTransportRequired(e.target.checked)}
                        className="w-4 h-4 text-[#101B36] rounded focus:ring-[#c9a227]"
                      />
                      <span>Doorstep Delivery Support Required in Vadodara</span>
                    </label>

                    {transportRequired && (
                      <input
                        type="text"
                        value={deliveryLocation}
                        onChange={(e) => setDeliveryLocation(e.target.value)}
                        placeholder="e.g. Near Harinagar, Gotri, Vadodara"
                        className="w-full px-3 py-2 text-xs bg-[#FAF7F0] border border-slate-300 rounded-xl focus:ring-2 focus:ring-[#c9a227]"
                      />
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* STEP 4: CUSTOMER DETAILS */}
            {currentStep === 4 && (
              <div className="space-y-5 animate-in fade-in duration-200">
                <div className="border-b border-slate-100 pb-2">
                  <h3 className="text-base font-extrabold text-[#101B36] font-serif">
                    Step 4: Contact Information
                  </h3>
                  <p className="text-xs text-slate-500">Where should we send the quotation and PDF proofs?</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-700">Full Name *</label>
                    <input
                      type="text"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="e.g. Mukeshbhai Patel"
                      className="w-full px-3 py-2.5 text-xs bg-[#FAF7F0] border border-slate-300 rounded-xl focus:ring-2 focus:ring-[#c9a227]"
                    />
                    {errors.fullName && <p className="text-[10px] text-rose-600 font-bold">{errors.fullName}</p>}
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-700">Mobile Phone Number *</label>
                    <input
                      type="tel"
                      value={mobileNumber}
                      onChange={(e) => setMobileNumber(e.target.value)}
                      placeholder="10-digit number"
                      className="w-full px-3 py-2.5 text-xs bg-[#FAF7F0] border border-slate-300 rounded-xl focus:ring-2 focus:ring-[#c9a227]"
                    />
                    {errors.mobileNumber && <p className="text-[10px] text-rose-600 font-bold">{errors.mobileNumber}</p>}
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-700">WhatsApp Number</label>
                    <input
                      type="tel"
                      value={whatsappNumber}
                      onChange={(e) => setWhatsappNumber(e.target.value)}
                      placeholder="Same as mobile or other"
                      className="w-full px-3 py-2.5 text-xs bg-[#FAF7F0] border border-slate-300 rounded-xl focus:ring-2 focus:ring-[#c9a227]"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-700">Email Address (Optional)</label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="name@example.com"
                      className="w-full px-3 py-2.5 text-xs bg-[#FAF7F0] border border-slate-300 rounded-xl focus:ring-2 focus:ring-[#c9a227]"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* STEP 5: REVIEW & SUBMIT */}
            {currentStep === 5 && (
              <div className="space-y-5 animate-in fade-in duration-200">
                <div className="border-b border-slate-100 pb-2">
                  <h3 className="text-base font-extrabold text-[#101B36] font-serif">
                    Step 5: Review Summary & Submit
                  </h3>
                  <p className="text-xs text-slate-500">Confirm your requested specifications before sending.</p>
                </div>

                <div className="bg-[#FAF7F0] p-5 rounded-2xl border border-[#c9a227]/30 grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase font-mono block">Service</span>
                    <span className="font-bold text-[#101B36]">{specificService}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase font-mono block">Quantity</span>
                    <span className="font-bold text-[#101B36]">{quantity}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase font-mono block">Paper & Size</span>
                    <span className="font-bold text-[#101B36]">{paperType} ({preferredSize})</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase font-mono block">Customer</span>
                    <span className="font-bold text-[#101B36]">{fullName}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase font-mono block">Phone</span>
                    <span className="font-bold text-[#101B36]">{mobileNumber}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase font-mono block">Delivery</span>
                    <span className="font-bold text-[#101B36]">{transportRequired ? deliveryLocation : 'Pickup at Press'}</span>
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700">Special Notes / Urgency</label>
                  <textarea
                    rows={2}
                    value={additionalRequirements}
                    onChange={(e) => setAdditionalRequirements(e.target.value)}
                    placeholder="e.g. Required by next week, gold foil border..."
                    className="w-full px-3 py-2 text-xs bg-[#FAF7F0] border border-slate-300 rounded-xl focus:ring-2 focus:ring-[#c9a227]"
                  />
                </div>
              </div>
            )}

            {/* Navigation Controls */}
            <div className="flex items-center justify-between pt-4 border-t border-slate-100">
              {currentStep > 1 ? (
                <button
                  type="button"
                  onClick={handlePrev}
                  className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Previous</span>
                </button>
              ) : (
                <div></div>
              )}

              {currentStep < 5 ? (
                <button
                  type="button"
                  onClick={handleNext}
                  className="px-6 py-2.5 bg-[#101B36] hover:bg-[#214E9A] text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow transition-all"
                >
                  <span>Continue</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              ) : (
                <button
                  type="submit"
                  className="px-8 py-3 bg-gradient-to-r from-[#c9a227] to-[#dfba47] text-[#101B36] font-extrabold rounded-xl text-xs sm:text-sm flex items-center gap-2 shadow-xl hover:brightness-110 transition-all"
                >
                  <span>Submit Quote Request</span>
                  <Send className="w-4 h-4" />
                </button>
              )}
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
