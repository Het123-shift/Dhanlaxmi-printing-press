import React, { useState } from 'react';
import {
  Truck,
  MapPin,
  Clock,
  Phone,
  MessageCircle,
  CheckCircle2,
  Send,
  PackageCheck,
  ShieldCheck,
} from 'lucide-react';
import { BUSINESS_INFO, Language } from '../data/content';
import { saveEnquiry, generateWhatsAppUrl } from '../utils/storage';

interface TransportDeliveryPageProps {
  navigate: (route: string) => void;
  lang: Language;
}

export const TransportDeliveryPage: React.FC<TransportDeliveryPageProps> = ({
  navigate,
  lang,
}) => {
  const [pickupDelivery, setPickupDelivery] = useState('Doorstep Delivery in Vadodara');
  const [materialType, setMaterialType] = useState('Wedding Kankotri Parcels');
  const [quantity, setQuantity] = useState('2 to 5 Boxes / 500 Cards');
  const [pickupLoc, setPickupLoc] = useState('Dhanlaxmi Printing Press, Panigate');
  const [deliveryLoc, setDeliveryLoc] = useState('');
  const [prefDate, setPrefDate] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [notes, setNotes] = useState('');

  const [submittedRef, setSubmittedRef] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim() || !deliveryLoc.trim()) {
      setErrorMsg(
        lang === 'gu'
          ? 'કૃપા કરીને નામ, ફોન નંબર અને ડિલિવરી સ્થળ દાખલ કરો.'
          : 'Please enter your name, phone number, and delivery location.'
      );
      return;
    }
    if (phone.trim().length < 10) {
      setErrorMsg(lang === 'gu' ? 'માન્ય ૧૦ આંકડાનો મોબાઈલ નંબર લખો.' : 'Please enter a valid 10-digit number.');
      return;
    }

    setErrorMsg('');
    const newRecord = saveEnquiry({
      customer_name: name,
      phone: phone,
      whatsapp: phone,
      email: 'N/A',
      service: 'Transport & Delivery Support',
      subcategory: materialType,
      quantity: quantity,
      delivery_required: true,
      delivery_location: deliveryLoc,
      required_date: prefDate,
      requirements: `Mode: ${pickupDelivery}. Pickup: ${pickupLoc}. Notes: ${notes}`,
    });

    setSubmittedRef(newRecord.reference_number);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-cyan-950 to-slate-900 text-white rounded-3xl p-8 sm:p-12 shadow-xl space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-cyan-500/20 text-cyan-300 rounded-full text-xs font-semibold">
          <Truck className="w-3.5 h-3.5" />
          <span>{lang === 'gu' ? 'સુરક્ષિત પેકિંગ અને લોજિસ્ટિક્સ સહાય' : 'Logistics & Dispatch Support'}</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold">
          {lang === 'gu' ? 'ટ્રાન્સપોર્ટ અને ડિલિવરી સપોર્ટ' : 'Transport & Delivery Support'}
        </h1>
        <p className="text-xs sm:text-sm text-slate-200 max-w-3xl leading-relaxed">
          {lang === 'gu'
            ? 'અમે અમારા ગ્રાહકોના પ્રિન્ટીંગ ઓર્ડર, કંકોત્રી, ચોપડા અને કોમર્શિયલ માલસામાનને સુરક્ષિત પેક કરીને વડોદરા શહેર તેમજ આસપાસના વિસ્તારોમાં સમયસર પહોંચાડવામાં સંપૂર્ણ સહાય કરીએ છીએ.'
            : 'We assist customers with safe, moisture-proof parcel packaging and local doorstep delivery or regional transport carrier coordination for completed print orders.'}
        </p>
      </div>

      {/* Scope Highlights */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3">
          <div className="w-10 h-10 rounded-xl bg-cyan-100 text-cyan-800 flex items-center justify-center font-bold">
            <PackageCheck className="w-5 h-5" />
          </div>
          <h3 className="font-extrabold text-base text-slate-900">
            {lang === 'gu' ? 'વોટરપ્રૂફ સુરક્ષિત પેકિંગ' : 'Secure Protective Packaging'}
          </h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            {lang === 'gu'
              ? 'કંકોત્રીના બોક્સ કે બિલ બુકના બંડલ પર ભેજ કે ધૂળ ન લાગે તે માટે મજબૂત પૂંઠા અને પ્લાસ્ટિક રેપિંગ.'
              : 'Heavy-duty corrugated boxes and moisture-resistant shrink wraps protect valuable printed materials.'}
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3">
          <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-800 flex items-center justify-center font-bold">
            <MapPin className="w-5 h-5" />
          </div>
          <h3 className="font-extrabold text-base text-slate-900">
            {lang === 'gu' ? 'વડોદરા સ્થાનિક ડિલિવરી' : 'Local Vadodara Doorstep Delivery'}
          </h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            {lang === 'gu'
              ? 'અલકાપુરી, માંજલપુર, મકરપુરા, સમા, ગોરવા, માંડવી અને સમગ્ર વડોદરામાં ઝડપી પહોંચ.'
              : 'Prompt local delivery support to shops, offices, residential homes, and marriage venues.'}
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
            <Truck className="w-5 h-5" />
          </div>
          <h3 className="font-extrabold text-base text-slate-900">
            {lang === 'gu' ? 'ટ્રાન્સપોર્ટ પાર્સલ બુકિંગ' : 'Regional Transport Booking'}
          </h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            {lang === 'gu'
              ? 'વડોદરા બહારના ગ્રાહકો માટે સ્થાનિક ટ્રાન્સપોર્ટ કેરિયર દ્વારા પાર્સલ મોકલવાની સગવડ.'
              : 'Reliable hand-off and consignment note coordination with trusted regional freight carriers.'}
          </p>
        </div>
      </div>

      {/* Delivery Request Form */}
      <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-xl space-y-8">
        <div className="border-b border-slate-100 pb-4">
          <span className="text-xs font-extrabold uppercase tracking-widest text-cyan-800">
            {lang === 'gu' ? 'ડિલિવરી પૂછપરછ ફોર્મ' : 'Delivery Dispatch Request'}
          </span>
          <h2 className="text-2xl font-extrabold text-slate-900 mt-1">
            {lang === 'gu' ? 'પ્રિન્ટીંગ માલની ડિલિવરી માટે વિગત મોકલો' : 'Request Delivery Support for Your Order'}
          </h2>
          <p className="text-xs sm:text-sm text-slate-500">
            {lang === 'gu'
              ? 'તમારો ઓર્ડર ક્યાં પહોંચાડવાનો છે તેની વિગત આપો.'
              : 'Provide delivery location and material details for timely dispatch planning.'}
          </p>
        </div>

        {submittedRef ? (
          <div className="p-8 bg-emerald-50 rounded-2xl border border-emerald-200 text-center space-y-4 animate-in fade-in">
            <div className="w-12 h-12 mx-auto bg-emerald-600 text-white rounded-full flex items-center justify-center shadow-lg">
              <CheckCircle2 className="w-7 h-7" />
            </div>
            <div className="space-y-1">
              <h3 className="text-xl font-extrabold text-emerald-950">
                {lang === 'gu' ? 'ડિલિવરી વિનંતી સફળતાપૂર્વક નોંધાઈ!' : 'Delivery Request Received!'}
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
                ? 'અમે તમારા આપેલા સરનામે ડિલિવરી સમય અને વ્યવસ્થા માટે સંપર્ક કરીશું.'
                : 'Our dispatch coordinator will confirm delivery scheduling and driver details.'}
            </p>

            <div className="flex flex-wrap justify-center gap-3 pt-2">
              <a
                href={generateWhatsAppUrl(
                  BUSINESS_INFO.whatsapp,
                  `Hello Dhanlaxmi Printing Press, I submitted delivery request Ref: ${submittedRef} to ${deliveryLoc}.`
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl text-xs flex items-center gap-2 shadow"
              >
                <MessageCircle className="w-4 h-4" />
                <span>{lang === 'gu' ? 'વોટ્સએપ પર ડિલિવરી અપડેટ' : 'Track on WhatsApp'}</span>
              </a>
              <button
                onClick={() => {
                  setSubmittedRef(null);
                  setName('');
                  setPhone('');
                  setDeliveryLoc('');
                }}
                className="px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-800 font-semibold rounded-xl text-xs"
              >
                {lang === 'gu' ? 'બીજી વિનંતી મોકલો' : 'Submit Another Request'}
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
                  {lang === 'gu' ? 'ડિલિવરી પ્રકાર (Requirement Mode) *' : 'Delivery Mode *'}
                </label>
                <select
                  value={pickupDelivery}
                  onChange={(e) => setPickupDelivery(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-cyan-600 focus:bg-white"
                >
                  <option value="Doorstep Delivery in Vadodara">Doorstep Delivery in Vadodara</option>
                  <option value="Transport Carrier Parcel Dispatch">Transport Carrier Parcel Dispatch</option>
                  <option value="Store Pickup (Panigate Press)">Store Pickup (Panigate Press)</option>
                  <option value="Urgent Courier Dispatch">Urgent Courier Dispatch</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-800">
                  {lang === 'gu' ? 'માલનો પ્રકાર (Material Type) *' : 'Material Type *'}
                </label>
                <select
                  value={materialType}
                  onChange={(e) => setMaterialType(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-cyan-600 focus:bg-white"
                >
                  <option value="Wedding Kankotri Parcels">Wedding Kankotri Parcels</option>
                  <option value="Commercial Bill Books / Registers">Commercial Bill Books / Registers</option>
                  <option value="Stationery / Visiting Cards">Stationery / Visiting Cards</option>
                  <option value="Large Flex Banners / Standees">Large Flex Banners / Standees</option>
                  <option value="Books / Multi-Page Publications">Books / Multi-Page Publications</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-800">
                  {lang === 'gu' ? 'અંદાજિત જથ્થો / વજન' : 'Approximate Quantity / Parcels'}
                </label>
                <input
                  type="text"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  placeholder="e.g. 2 Boxes / 300 Cards"
                  className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-cyan-600 focus:bg-white"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-800">
                  {lang === 'gu' ? 'ડિલિવરી સ્થળ / સરનામું *' : 'Delivery Address / Area in Vadodara *'}
                </label>
                <input
                  type="text"
                  required
                  value={deliveryLoc}
                  onChange={(e) => setDeliveryLoc(e.target.value)}
                  placeholder={
                    lang === 'gu'
                      ? 'દા.ત. ૧૨, શ્યામ સોસાયટી, માંજલપુર, વડોદરા'
                      : 'e.g. 12, Shyam Society, Manjalpur, Vadodara'
                  }
                  className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-cyan-600 focus:bg-white"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-800">
                  {lang === 'gu' ? 'જરૂરી તારીખ (Preferred Date)' : 'Preferred Delivery Date'}
                </label>
                <input
                  type="date"
                  value={prefDate}
                  onChange={(e) => setPrefDate(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-cyan-600 focus:bg-white"
                />
              </div>
            </div>

            {/* Customer Details */}
            <div className="border-t border-slate-100 pt-5 space-y-4">
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                {lang === 'gu' ? 'સંપર્ક માહિતી' : 'Contact Details'}
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700">
                    {lang === 'gu' ? 'પૂરું નામ *' : 'Full Name *'}
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Mukeshbhai"
                    className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-cyan-600 focus:bg-white"
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
                    placeholder="10-digit mobile number"
                    className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-cyan-600 focus:bg-white"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-700">
                  {lang === 'gu' ? 'ખાસ સૂચના (Landmark / Timing)' : 'Special Landmark / Contact Timing'}
                </label>
                <textarea
                  rows={2}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder={lang === 'gu' ? 'દા.ત. સાંજે ૫ વાગ્યા પછી ડિલિવરી આપવી...' : 'e.g. Deliver between 5 PM - 7 PM, near temple...'}
                  className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-cyan-600 focus:bg-white"
                />
              </div>
            </div>

            {/* Submit */}
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <button
                type="submit"
                className="px-6 py-3.5 bg-cyan-900 hover:bg-cyan-800 text-white font-extrabold rounded-xl text-xs flex items-center gap-2 shadow transition-all"
              >
                <span>{lang === 'gu' ? 'ડિલિવરી રિક્વેસ્ટ મોકલો' : 'Request Delivery Support'}</span>
                <Send className="w-4 h-4" />
              </button>

              <a
                href={`tel:${BUSINESS_INFO.phone}`}
                className="px-5 py-3.5 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl text-xs flex items-center gap-2 shadow transition-all"
              >
                <Phone className="w-4 h-4 text-sky-400" />
                <span>Call Press: 98254 50176</span>
              </a>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
