export type Language = 'en' | 'gu';

export interface BusinessInfo {
  name: string;
  nameGu: string;
  tagline: string;
  taglineGu: string;
  subTagline: string;
  subTaglineGu: string;
  phone: string;
  whatsapp: string;
  email: string;
  address: string;
  addressGu: string;
  landmark: string;
  landmarkGu: string;
  plusCode: string;
  googleMapsUrl: string;
  googleShareUrl: string;
  mapEmbedUrl: string;
  rating: number;
  reviewCount: number;
  hours: string;
  hoursGu: string;
}

export const BUSINESS_INFO: BusinessInfo = {
  name: 'Dhanlaxmi Printing Press',
  nameGu: 'ધનલક્ષ્મી પ્રિન્ટીંગ પ્રેસ',
  tagline: 'Complete Printing, Invitation, Design, Binding & Delivery Solutions',
  taglineGu: 'સંપૂર્ણ પ્રિન્ટીંગ, કંકોત્રી, ડિઝાઇન, બાઇન્ડીંગ અને ડિલિવરી સોલ્યુશન્સ',
  subTagline: 'From Your Idea to the Finished Print.',
  subTaglineGu: 'તમારા વિચારથી લઈને તૈયાર પ્રિન્ટ સુધીની સંપૂર્ણ સેવા.',
  phone: '98254 50176',
  whatsapp: '9825450176',
  email: 'dhanlaxmiprintingpress13@gmail.com',
  address: '53, New Heaven Enclave, Near Harish Petrol Pump, Outside Panigate, Relief Colony, Fatepura, Vadodara, Gujarat 390019',
  addressGu: '૫૩, ન્યુ હેવન એન્ક્લેવ, હરીશ પેટ્રોલ પંપ પાસે, પાણીગેટ બહાર, રિલીફ કોલોની, ફતેપુરા, વડોદરા, ગુજરાત ૩૯૦૦૧૯',
  landmark: 'Near Harish Petrol Pump, Located in Haven Complex',
  landmarkGu: 'હરીશ પેટ્રોલ પંપ પાસે, હેવન કોમ્પ્લેક્સ',
  plusCode: '76XC+R2 Vadodara, Gujarat',
  googleMapsUrl: 'https://www.google.com/maps/place/Dhanlaxmi+Printing+Press(Best+office+stationary+shop,printing+press,Best+offset+printing+press,All+work,flex+banner)/@22.2995996,73.2201232,17z/data=!4m6!3m5!1s0x395fc586514d979d:0xef09273e838ee96c!8m2!3d22.2995996!4d73.2201232!16s%2Fg%2F11b6nptky4',
  googleShareUrl: 'https://share.google/BCYgXUDfdL9vT2HjK',
  mapEmbedUrl: 'https://maps.google.com/maps?q=22.2995996,73.2201232&hl=en&z=17&output=embed',
  rating: 4.7,
  reviewCount: 33,
  hours: 'Mon - Sat: 8:00 AM - 8:00 PM',
  hoursGu: 'સોમવાર - શનિવાર: સવારે ૮:૦૦ થી રાત્રે ૮:૦૦',
};

export interface ServiceItem {
  id: string;
  title: string;
  titleGu: string;
  category: 'invitation' | 'commercial' | 'dtp' | 'printing' | 'binding' | 'transport';
  categoryLabel: string;
  categoryLabelGu: string;
  description: string;
  descriptionGu: string;
  features: string[];
  featuresGu: string[];
  useCases: string[];
  useCasesGu: string[];
  popular?: boolean;
  image?: string;
  badge?: string;
  badgeGu?: string;
}

export const ALL_SERVICES: ServiceItem[] = [
  // Invitation & Kankotri
  {
    id: 'wedding-kankotri',
    title: 'Wedding Kankotri (Lagna Patrika)',
    titleGu: 'લગ્ન કંકોત્રી / પત્રિકા',
    category: 'invitation',
    categoryLabel: 'Invitation & Kankotri',
    categoryLabelGu: 'કંકોત્રી અને આમંત્રણ',
    description: 'Traditional and modern wedding invitation cards with bespoke motifs, gold foil, embossing, and fine textures.',
    descriptionGu: 'પરંપરાગત અને આધુનિક લગ્ન કંકોત્રી, સોનેરી ફોઈલ, એમ્બોસિંગ અને પ્રીમિયમ પેપર ક્વોલિટી સાથે.',
    features: ['Hindu & Multi-faith templates', 'Gold/Silver Foil Stamping', 'Handmade & Velvet paper options', 'Gujarati/English typesetting'],
    featuresGu: ['હિન્દુ તેમજ સર્વધર્મ ફોરમેટ', 'ગોલ્ડ/સિલ્વર ફોઇલિંગ', 'હેન્ડમેડ અને વેલ્વેટ પેપર વિકલ્પો', 'ગુજરાતી-અંગ્રેજી અક્ષર જોડણી'],
    useCases: ['Gujarati Weddings', 'Grand Receptions', 'Sangeet & Mehendi Invites'],
    useCasesGu: ['ગુજરાતી લગ્ન પ્રસંગો', 'રિસેપ્શન આમંત્રણ', 'સંગીત અને મહેંદી ઉત્સવ'],
    popular: true,
  },
  {
    id: 'mundan-cards',
    title: 'Mundan Cards (Babri Invites)',
    titleGu: 'મુંડન સંસ્કાર / બાબરી કાર્ડ',
    category: 'invitation',
    categoryLabel: 'Invitation & Kankotri',
    categoryLabelGu: 'કંકોત્રી અને આમંત્રણ',
    description: 'Auspicious baby haircut / Mundan ceremony invitation cards with traditional blessings and joyful designs.',
    descriptionGu: 'શુભ બાબરી / મુંડન સંસ્કાર માટેના સુંદર અને પવિત્ર મંત્રોચ્ચાર વાળા આમંત્રણ કાર્ડ.',
    features: ['Custom photo insertion', 'Auspicious Shlokas', 'Glossy & Matt finish'],
    featuresGu: ['ફોટો સાથે પ્રિન્ટીંગ', 'શુભ શ્લોક અને મુહૂર્ત વિગત', 'ગ્લોસી અને મેટ ફિનિશ'],
    useCases: ['Child Mundan Ceremonies', 'Family Gatherings', 'Kuldevi Poojan'],
    useCasesGu: ['બાળકના મુંડન સંસ્કાર', 'કુટુંબ સ્નેહમિલન', 'કુલદેવી પૂજન વિધિ'],
    popular: true,
  },
  {
    id: 'shrimant-baby-shower',
    title: 'Shrimant Vidhi / Baby Shower Cards',
    titleGu: 'શ્રીમંત વિધિ / બેબી શાવર પત્રિકા',
    category: 'invitation',
    categoryLabel: 'Invitation & Kankotri',
    categoryLabelGu: 'કંકોત્રી અને આમંત્રણ',
    description: 'Special pious celebration cards for Godh Bharai / Shrimant Prasang with elegant pastel and gold tones.',
    descriptionGu: 'ગોદ ભરાઈ / શ્રીમંત પ્રસંગ માટે અત્યંત મનોહર અને કલાત્મક આમંત્રણ પત્રિકાઓ.',
    features: ['Pastel & Floral Themes', 'Custom Family Poetry', 'Pocket & Box style formats'],
    featuresGu: ['પેસ્ટલ અને ફ્લોરલ થીમ્સ', 'કૌટુંબિક શુભકામનાઓ', 'પોકેટ અને ફોલ્ડિંગ સ્ટાઇલ'],
    useCases: ['Shrimant Vidhi', 'Baby Shower Dinners', 'Family Festivities'],
    useCasesGu: ['શ્રીમંત વિધિ', 'બેબી શાવર ડિનર', 'પારિવારિક પ્રસંગો'],
    popular: true,
  },
  {
    id: 'navchandi-yagya',
    title: 'Navchandi Yagya / Religious Invites',
    titleGu: 'નવચંડી યજ્ઞ / ધાર્મિક મહોત્સવ પત્રિકા',
    category: 'invitation',
    categoryLabel: 'Invitation & Kankotri',
    categoryLabelGu: 'કંકોત્રી અને આમંત્રણ',
    description: 'Vedic religious celebration invitations, Yagya programs, temple consecrations and bhajan sandhya cards.',
    descriptionGu: 'યજ્ઞ મહોત્સવ, વાસ્તુ પૂજન, સપ્તાહ અને ધાર્મિક ઉત્સવો માટેની ભક્તિભાવપૂર્ણ પત્રિકાઓ.',
    features: ['Deity Imagery & Mantras', 'Multi-page event schedule', 'Premium Parchment paper'],
    featuresGu: ['દેવી-દેવતાઓની છબી અને શ્લોક', 'કાર્યક્રમ પત્રિકા સ્વરૂપ', 'પ્રીમિયમ પાર્ચમેન્ટ પેપર'],
    useCases: ['Navchandi Havan', 'Bhagwat Saptah', 'Temple Pratishtha'],
    useCasesGu: ['નવચંડી હવન', 'શ્રીમદ્ ભાગવત સપ્તાહ', 'મંદિર પ્રાણ પ્રતિષ્ઠા'],
  },
  {
    id: 'vastu-pujan',
    title: 'Vastu Pujan / Griha Pravesh Invites',
    titleGu: 'વાસ્તુ પૂજન / ગૃહ પ્રવેશ આમંત્રણ',
    category: 'invitation',
    categoryLabel: 'Invitation & Kankotri',
    categoryLabelGu: 'કંકોત્રી અને આમંત્રણ',
    description: 'House warming and new office opening invitations with auspicious Kalash and Toran motifs.',
    descriptionGu: 'નવા મકાનના વાસ્તુ પૂજન અને ગૃહ પ્રવેશ પ્રસંગ માટેની શુભ મંગલ પત્રિકાઓ.',
    features: ['Kalash & Swastik Motifs', 'Gold Border Accents', 'Matching envelopes included'],
    featuresGu: ['કળશ અને સ્વસ્તિક પ્રતીકો', 'સોનેરી કિનારી ડિઝાઇન', 'મેચિંગ કવર સાથે'],
    useCases: ['New Home Entry', 'Office Vastu', 'Factory Inauguration'],
    useCasesGu: ['નવા ઘરનો ગૃહ પ્રવેશ', 'ઓફિસ વાસ્તુ', 'ફેક્ટરી મુહૂર્ત'],
  },
  {
    id: 'muslim-invitations',
    title: 'Muslim Nikah & Walima Cards',
    titleGu: 'મુસ્લિમ નિકાહ અને વલીમા કાર્ડ',
    category: 'invitation',
    categoryLabel: 'Invitation & Kankotri',
    categoryLabelGu: 'કંકોત્રી અને આમંત્રણ',
    description: 'Traditional Islamic calligraphy and floral borders for Nikah, Walima, and Dawat celebrations.',
    descriptionGu: 'ઇસ્લામિક કલિગ્રાફી, બિસ્મિલ્લાહ લખાણ અને અદભુત ડિઝાઇનની નિકાહ-વલીમા પત્રિકાઓ.',
    features: ['Bismillah & Urdu/Gujarati Fonts', 'Laser Cut & Metallic Inks', 'Single & Multi-fold styles'],
    featuresGu: ['શુદ્ધ અરેબિક/ઉર્દૂ અને ગુજરાતી ટાઇપિંગ', 'લેઝર કટ અને ચમકદાર શાહી', 'સિંગલ અને મલ્ટી-ફોલ્ડ'],
    useCases: ['Nikah Ceremonies', 'Walima Receptions', 'Dawat-e-Khas'],
    useCasesGu: ['નિકાહ સમારોહ', 'વલીમા રિસેપ્શન', 'દાવત આમંત્રણ'],
    popular: true,
  },
  {
    id: 'birthday-inauguration',
    title: 'Birthday & Inauguration Cards',
    titleGu: 'બર્થડે અને ઓપનિંગ આમંત્રણ',
    category: 'invitation',
    categoryLabel: 'Invitation & Kankotri',
    categoryLabelGu: 'કંકોત્રી અને આમંત્રણ',
    description: 'Vibrant invitations for landmark birthdays, corporate openings, retail launches, and milestones.',
    descriptionGu: 'જન્મદિવસની ઉજવણી, શોરૂમ કે ઓફિસ ઉદ્ઘાટન માટેના આકર્ષક આમંત્રણ કાર્ડ.',
    features: ['Creative Die-cut shapes', 'Lamination & Spot UV', 'Quick turnaround'],
    featuresGu: ['આકર્ષક ડાઈ-કટ આકાર', 'લેમિનેશન અને સ્પોટ યુવી', 'ઝડપી ડિલિવરી'],
    useCases: ['1st & 50th Birthdays', 'Showroom Launch', 'Anniversaries'],
    useCasesGu: ['જન્મદિવસ ઉત્સવ', 'શોરૂમ ઓપનિંગ', 'વર્ષગાંઠ સમારોહ'],
  },

  // Commercial Printing
  {
    id: 'bill-books',
    title: 'GST Bill Books & Tax Invoices',
    titleGu: 'જીએસટી બિલ બુક અને ટેક્સ ઇન્વોઇસ',
    category: 'commercial',
    categoryLabel: 'Commercial Printing',
    categoryLabelGu: 'કોમર્શિયલ પ્રિન્ટીંગ',
    description: 'Carbonless NCR paper duplicate and triplicate billing books with sequential numbering and firm details.',
    descriptionGu: 'ડુપ્લિકેટ અને ટ્રીપ્લિકેટ કાર્બનલેસ NCR બિલ બુક, ક્રમશઃ નંબરિંગ અને મજબૂત બાઈન્ડિંગ સાથે.',
    features: ['NCR Carbonless Duplicate/Triplicate', 'Clear red numbering', 'Perforated tear-off sheets', 'Hardboard cover binding'],
    featuresGu: ['NCR કાર્બનલેસ ડુપ્લિકેટ/ટ્રિપ્લિકેટ', 'સ્પષ્ટ લાલ નંબરિંગ', 'પરફોરેશન કટીંગ', 'મજબૂત હાર્ડબોર્ડ કવર'],
    useCases: ['Retail Shops', 'Wholesale Traders', 'Service Agencies'],
    useCasesGu: ['રિટેલ દુકાનો', 'હોલસેલ વેપારીઓ', 'સર્વિસ પ્રોવાઇડર્સ'],
    popular: true,
  },
  {
    id: 'bilty-books',
    title: 'Bilty Books & Transport L.R.',
    titleGu: 'બિલ્ટી બુક અને ટ્રાન્સપોર્ટ L.R.',
    category: 'commercial',
    categoryLabel: 'Commercial Printing',
    categoryLabelGu: 'કોમર્શિયલ પ્રિન્ટીંગ',
    description: 'Official transport consignment receipt books, lorry receipts (L.R.), and delivery challans.',
    descriptionGu: 'ટ્રાન્સપોર્ટ ઓપરેટરો અને લોજિસ્ટિક્સ કંપનીઓ માટે અધિકૃત કન્સાઇનમેન્ટ બિલ્ટી અને L.R. બુક.',
    features: ['Standard & Custom Legal formats', 'Heavy Maplitho / NCR paper', 'Cloth-backed spine binding'],
    featuresGu: ['સ્ટાન્ડર્ડ તેમજ કસ્ટમ લીગલ ફોરમેટ', 'હેવી મેપલિથો / NCR કાગળ', 'કાપડ પટ્ટી મજબૂત સિલાઈ'],
    useCases: ['Logistics Companies', 'Fleet Owners', 'Warehouse Goods Dispatch'],
    useCasesGu: ['લોજિસ્ટિક્સ કંપનીઓ', 'ટ્રાન્સપોર્ટ સર્વિસ', 'ગોડાઉન માલ રવાનગી'],
    popular: true,
  },
  {
    id: 'visiting-cards',
    title: 'Visiting Cards & Letterheads',
    titleGu: 'વિઝિટિંગ કાર્ડ અને લેટરપેડ',
    category: 'commercial',
    categoryLabel: 'Commercial Printing',
    categoryLabelGu: 'કોમર્શિયલ પ્રિન્ટીંગ',
    description: 'High-impact business cards in Matte, Gloss, Velvet, and Spot UV finishes, along with executive letterheads.',
    descriptionGu: 'મેટ, ગ્લોસ, વેલ્વેટ અને સ્પોટ યુવી ફિનિશિંગવાળા વિઝિટિંગ કાર્ડ્સ તથા કંપની લેટરપેડ.',
    features: ['350 GSM Heavy Board', 'Velvet & Matte Lamination', 'Executive Bond Paper Letterheads'],
    featuresGu: ['૩૫૦ જીએસએમ હેવી કાર્ડ', 'વેલ્વેટ અને મેટ લેમિનેશન', 'એક્ઝિક્યુટિવ બોન્ડ પેપર લેટરપેડ'],
    useCases: ['Business Executives', 'Professionals', 'Corporate Identity'],
    useCasesGu: ['વેપારીઓ', 'ડોક્ટર્સ/વકીલો/એન્જિનિયર્સ', 'કોર્પોરેટ ઓફિસ'],
    popular: true,
  },
  {
    id: 'stickers-labels',
    title: 'Product Stickers & Gumming Labels',
    titleGu: 'પ્રોડક્ટ સ્ટીકર્સ અને ગમીંગ લેબલ્સ',
    category: 'commercial',
    categoryLabel: 'Commercial Printing',
    categoryLabelGu: 'કોમર્શિયલ પ્રિન્ટીંગ',
    description: 'High-adhesion paper and PVC stickers, barcode labels, packaging seals, and product branding stickers.',
    descriptionGu: 'પેકેજિંગ, બ્રાન્ડિંગ અને બારકોડ માટેના મજબૂત ગુંદરવાળા સ્ટીકર્સ અને લેબલ્સ.',
    features: ['Mirror Coat & Chromo paper', 'Custom Die-cut shapes', 'Water-resistant options'],
    featuresGu: ['મિરર કોટ અને ક્રોમો પેપર', 'કસ્ટમ ડાઈ-કટ આકાર', 'વોટર રેઝિસ્ટન્ટ વિકલ્પ'],
    useCases: ['Food Packaging', 'Industrial Products', 'Retail Jars & Boxes'],
    useCasesGu: ['ફૂડ પેકિંગ', 'ઔદ્યોગિક પાર્ટ્સ', 'બોક્સ લેબલિંગ'],
  },
  {
    id: 'pamphlets-handbills',
    title: 'Pamphlets, Flyers & Handbills',
    titleGu: 'પત્રિકા, પેમ્ફલેટ અને હેન્ડબિલ',
    category: 'commercial',
    categoryLabel: 'Commercial Printing',
    categoryLabelGu: 'કોમર્શિયલ પ્રિન્ટીંગ',
    description: 'Mass distribution advertising leaflets, newspaper inserts, product promotion flyers in single or multi-color.',
    descriptionGu: 'છાપામાં નાખવાની જાહેરાત પત્રિકાઓ, પ્રોડક્ટ પ્રમોશન હેન્ડબિલ સિંગલ તેમજ મલ્ટી કલરમાં.',
    features: ['Single Color & Full CMYK', '54 to 80 GSM Maplitho Paper', 'High volume fast printing'],
    featuresGu: ['સિંગલ કલર અને ફુલ CMYK', '૫૪ થી ૮૦ જીએસએમ કાગળ', 'વિશાળ જથ્થામાં ઝડપી પ્રિન્ટ'],
    useCases: ['Newspaper Inserts', 'Store Opening Announcements', 'Tuition Classes & Coaching'],
    useCasesGu: ['દૈનિક અખબાર ઇન્સર્ટ', 'દુકાન ઓપનિંગ જાહેરાત', 'ક્લાસીસ અને એજ્યુકેશન'],
  },
  {
    id: 'envelopes-folders',
    title: 'Custom Envelopes & Presentation Folders',
    titleGu: 'કસ્ટમ એન્વેલપ અને ફાઇલ ફોલ્ડર્સ',
    category: 'commercial',
    categoryLabel: 'Commercial Printing',
    categoryLabelGu: 'કોમર્શિયલ પ્રિન્ટીંગ',
    description: 'Branded official stationery envelopes in all standard postal sizes (9.5x4.5, 10x4, A4) and document folders.',
    descriptionGu: 'કંપનીના લોગોવાળા તમામ સાઈઝના ઓફિસ એન્વેલપ (કવર) અને ડોક્યુમેન્ટ ફાઈલ ફોલ્ડર્સ.',
    features: ['Window & Non-window envelopes', 'Peel & Seal adhesive flap', 'Heavy duty document pockets'],
    featuresGu: ['વિન્ડો અને સાદા કવર', 'પીલ એન્ડ સીલ ગમ પટ્ટી', 'મજબૂત ડોક્યુમેન્ટ પોકેટ'],
    useCases: ['Official Correspondence', 'Tender Submissions', 'Client Proposals'],
    useCasesGu: ['સત્તાવાર પત્રવ્યવહાર', 'ટેન્ડર સબમિશન', 'ક્લાયન્ટ પ્રોપોઝલ'],
  },

  // DTP & Design
  {
    id: 'dtp-composing',
    title: 'Gujarati & English DTP Composing',
    titleGu: 'ગુજરાતી અને અંગ્રેજી DTP કમ્પોઝિંગ',
    category: 'dtp',
    categoryLabel: 'DTP & Design',
    categoryLabelGu: 'ડીટીપી અને ડિઝાઇન',
    description: 'Accurate text composing, grammatical proofreading, traditional poetic wording, and typesetting in Gujarati and English.',
    descriptionGu: 'શુદ્ધ ગુજરાતી જોડણી, શાસ્ત્રોક્ત શ્લોકો, સંસ્કારી લખાણ અને અંગ્રેજી ભાષાનું સચોટ ડીટીપી કમ્પોઝિંગ.',
    features: ['Authentic Gujarati Unicode & Fonts', 'Proof verification before print', 'Manuscript to print translation'],
    featuresGu: ['શુદ્ધ ગુજરાતી ફોન્ટ્સ અને જોડાક્ષર', 'પ્રિન્ટીંગ પહેલાં ગ્રાહક પ્રૂફ ચેક', 'હસ્તલિખિત લખાણમાંથી DTP'],
    useCases: ['Kankotri Content Creation', 'Legal Deeds & Contracts', 'School Magazines & Books'],
    useCasesGu: ['કંકોત્રી લખાણ', 'દસ્તાવેજ અને કરાર', 'પુસ્તિકા અને મેગેઝીન'],
    popular: true,
  },
  {
    id: 'graphic-layout',
    title: 'Graphic Layout & Artwork Design',
    titleGu: 'ગ્રાફિક લેઆઉટ અને આર્ટવર્ક ડિઝાઇન',
    category: 'dtp',
    categoryLabel: 'DTP & Design',
    categoryLabelGu: 'ડીટીપી અને ડિઝાઇન',
    description: 'Complete digital layout preparation, vector logos, brochure layouts, advertisement designs, and flex creatives.',
    descriptionGu: 'બ્રોશર, જાહેરાત, લોગો અને ફ્લેક્સ બેનર માટે આકર્ષક અને પ્રોફેશનલ ગ્રાફિક લેઆઉટ ડિઝાઇનિંગ.',
    features: ['Print-ready CMYK output', 'Vector graphics creation', 'Digital proof sharing via WhatsApp/Email'],
    featuresGu: ['પ્રિન્ટ રેડી CMYK ફાઇલો', 'હાઈ રેઝોલ્યુશન વેક્ટર આર્ટ', 'વોટ્સએપ/ઈમેઈલ પર ડિજિટલ પ્રૂફ'],
    useCases: ['Brand Identity', 'Product Catalogs', 'Outdoor Advertising'],
    useCasesGu: ['બ્રાન્ડ લોગો', 'પ્રોડક્ટ કેટલોગ', 'હોર્ડિંગ્સ અને બેનર્સ'],
  },

  // Printing Services
  {
    id: 'offset-printing',
    title: 'Multi-Color Offset Printing',
    titleGu: 'મલ્ટી-કલર ઓફસેટ પ્રિન્ટીંગ',
    category: 'printing',
    categoryLabel: 'Printing Services',
    categoryLabelGu: 'પ્રિન્ટીંગ સેવાઓ',
    description: 'High-speed, precision 4-color offset press printing for brochures, books, flyers, and premium packaging.',
    descriptionGu: 'મોટા જથ્થામાં ચોકસાઈભર્યા કલર પ્રિન્ટીંગ માટે આધુનિક ૪-કલર ઓફસેટ મશીન દ્વારા પ્રિન્ટીંગ.',
    features: ['True CMYK color fidelity', 'Cost-effective for high volumes', 'Wide range of paper GSM supported'],
    featuresGu: ['ચોક્કસ CMYK કલર પરિણામ', 'મોટા જથ્થામાં સૌથી સસ્તું અને ઉત્તમ', 'વિવિધ પ્રકારના કાગળ પર સુવિધા'],
    useCases: ['Bulk Corporate Brochures', 'Magazines & Booklets', 'Product Boxes'],
    useCasesGu: ['કંપની બ્રોશર્સ', 'મેગેઝીન અને પુસ્તકો', 'પ્રોડક્ટ પેકિંગ બોક્સ'],
    popular: true,
  },
  {
    id: 'screen-printing',
    title: 'Screen Printing & Foil Stamping',
    titleGu: 'સ્ક્રીન પ્રિન્ટીંગ અને ફોઇલ સ્ટેમ્પિંગ',
    category: 'printing',
    categoryLabel: 'Printing Services',
    categoryLabelGu: 'પ્રિન્ટીંગ સેવાઓ',
    description: 'Artisanal screen printing for wedding invitations, gold & silver foil stamping, spot UV, and specialty inks.',
    descriptionGu: 'કંકોત્રી, લેટરપેડ અને સ્પેશિયલ કાર્ડ્સ પર સોનેરી/રૂપેરી ફોઇલિંગ અને સ્ક્રીન પ્રિન્ટીંગ.',
    features: ['Metallic Gold/Silver Foils', 'Raised Thermography Textures', 'Deep rich opaque ink layers'],
    featuresGu: ['ચળકતી ગોલ્ડ અને સિલ્વર ફોઇલ', 'ઉપસેલા અક્ષરો (એમ્બોસિંગ)', 'ઘાટા અને સ્પષ્ટ રંગો'],
    useCases: ['Wedding Kankotri Details', 'Special Visiting Cards', 'Religious Certificates'],
    useCasesGu: ['કંકોત્રી પર સોનેરી નામ', 'પ્રીમિયમ વિઝિટિંગ કાર્ડ', 'સન્માન પત્ર અને સર્ટીફિકેટ'],
  },
  {
    id: 'flex-banner',
    title: 'Flex Banner & Vinyl Signage',
    titleGu: 'ફ્લેક્સ બેનર અને વિનાઇલ સાઇનેજ',
    category: 'printing',
    categoryLabel: 'Printing Services',
    categoryLabelGu: 'પ્રિન્ટીંગ સેવાઓ',
    description: 'Weather-resistant large format outdoor flex banners, star flex, vinyl stickers, and standees for events.',
    descriptionGu: 'વોટરપ્રૂફ મોટા ફ્લેક્સ બેનર, સ્ટાર ફ્લેક્સ, વિનાઇલ પ્રિન્ટ અને સ્ટેન્ડી ઉત્સવો તથા જાહેરાતો માટે.',
    features: ['Star Flex & Eco-solvent vinyl', 'Eyelets and border reinforcing', 'Vivid outdoor color life'],
    featuresGu: ['સ્ટાર ફ્લેક્સ અને વિનાઇલ', 'મજબૂત કિનારી અને રીંગ ફિટિંગ', 'લાંબો સમય ટકતા તેજસ્વી રંગો'],
    useCases: ['Shop Front Boards', 'Event Stage Backdrops', 'Roadside Hoardings'],
    useCasesGu: ['દુકાનનું બોર્ડ', 'સ્ટેજ બેકડ્રોપ બેનર', 'પ્રમોશનલ સ્ટેન્ડી'],
  },

  // Book & Binding
  {
    id: 'book-binding-works',
    title: 'Hardcover Book Binding & Ledgers',
    titleGu: 'હાર્ડકવર બુક બાઇન્ડીંગ અને ખાતાવહી',
    category: 'binding',
    categoryLabel: 'Book & Binding',
    categoryLabelGu: 'બુક અને બાઇન્ડીંગ',
    description: 'Durable hardcover rexine bindings, golden embossed title lettering, section-sewn binding for office ledgers and books.',
    descriptionGu: 'મજબૂત રેક્ઝીન હાર્ડકવર બાઇન્ડીંગ, સોનેરી અક્ષરોનું એમ્બોસિંગ અને મજબૂત સિલાઈવાળી ખાતાવહી.',
    features: ['Rexine & Canvas Hardboards', 'Gold Foil Title Embossing', 'Reinforced stitch binding'],
    featuresGu: ['રેક્ઝીન અને કેનવાસ હાર્ડબોર્ડ', 'સોનેરી અક્ષરોનું કવર પ્રિન્ટીંગ', 'મજબૂત દોરા સિલાઈ'],
    useCases: ['Accounting Khata Vahi', 'Lawyer Case Registers', 'Library Books Restoring'],
    useCasesGu: ['ચોપડા પૂજન ખાતાવહી', 'વકીલ કેસ ડાયરી', 'સ્કૂલ/કોલેજ રજીસ્ટર'],
    popular: true,
  },
  {
    id: 'office-registers',
    title: 'Office Registers & Custom Ruled Books',
    titleGu: 'ઓફિસ રજીસ્ટર અને રૂલિંગ ચોપડા',
    category: 'binding',
    categoryLabel: 'Book & Binding',
    categoryLabelGu: 'બુક અને બાઇન્ડીંગ',
    description: 'Attendance registers, stock entry books, society maintenance registers, log books with custom column rulings.',
    descriptionGu: 'હાજરી પત્રક, સ્ટોક રજીસ્ટર, સોસાયટી મેન્ટેનન્સ બુક અને જરૂરિયાત મુજબના ખાનાવાળા ચોપડા.',
    features: ['Custom ledger rulings', 'Page numbering on every sheet', 'Heavy duty binder spine'],
    featuresGu: ['જરૂરિયાત મુજબના ખાના (રૂલિંગ)', 'દરેક પાના પર પેજ નંબરિંગ', 'લાંબો સમય સચવાય તેવું બાઇન્ડીંગ'],
    useCases: ['Housing Societies', 'Factory In-Out Entry', 'School Attendance'],
    useCasesGu: ['હાઉસિંગ સોસાયટીઓ', 'ફેક્ટરી ગેટ પાસ બુક', 'સ્કૂલ સ્ટાફ રજીસ્ટર'],
  },

  // Transport & Delivery
  {
    id: 'transport-dispatch',
    title: 'Transport Packing & Delivery Assistance',
    titleGu: 'ટ્રાન્સપોર્ટ પેકિંગ અને ડિલિવરી સહાય',
    category: 'transport',
    categoryLabel: 'Transport & Delivery',
    categoryLabelGu: 'ટ્રાન્સપોર્ટ અને ડિલિવરી',
    description: 'Safe moisture-proof packing and doorstep delivery in Vadodara, plus reliable regional parcel dispatch.',
    descriptionGu: 'વોટરપ્રૂફ પેકિંગ સાથે વડોદરા શહેરમાં હોમ ડિલિવરી તથા ગુજરાતભરમાં ટ્રાન્સપોર્ટ પાર્સલ મોકલવાની સુવિધા.',
    features: ['Moisture-proof shrink wrap', 'Doorstep local delivery support', 'Transport parcel tracking help'],
    featuresGu: ['પાણી ન લાગે તેવું સુરક્ષિત પેકિંગ', 'વડોદરામાં સ્થાનિક ડિલિવરી સહાય', 'ટ્રાન્સપોર્ટ બિલ્ટી દ્વારા રવાનગી'],
    useCases: ['Bulk Invitation Orders', 'Commercial Bill Books', 'Outstation Clients'],
    useCasesGu: ['કંકોત્રી પાર્સલ', 'વેપારી બિલ બુક જથ્થો', 'બહારગામના ગ્રાહકો'],
    popular: true,
  },
];

// Physical Album Collection with 50% OFF promotion
export interface AlbumCollectionItem {
  id: string;
  code: string;
  title: string;
  titleGu: string;
  category: 'wedding' | 'religious' | 'modern' | 'muslim' | 'traditional' | 'special';
  categoryLabel: string;
  categoryLabelGu: string;
  description: string;
  descriptionGu: string;
  paperType: string;
  finish: string;
  discountBadge: string;
  discountBadgeGu: string;
}

export const ALBUM_COLLECTION_ITEMS: AlbumCollectionItem[] = [
  {
    id: 'alb-01',
    code: 'DLP-ALB-101',
    title: 'Royal Paisley Gold Foil Wedding Kankotri',
    titleGu: 'રોયલ કૈરી ગોલ્ડ ફોઇલ લગ્ન કંકોત્રી',
    category: 'wedding',
    categoryLabel: 'Wedding Collection',
    categoryLabelGu: 'લગ્ન સંગ્રહ',
    description: 'Classic Gujarati wedding card with detailed gold embossed peacock & paisley motif on metallic ivory board with matching designer envelope.',
    descriptionGu: 'ધાતુની ચમકવાળા આઇવરી બોર્ડ પર સોનેરી મોર અને કૈરીની ભાત સાથેની પરંપરાગત ગુજરાતી કંકોત્રી.',
    paperType: '300 GSM Metallic Shimmer Board',
    finish: 'Gold Hot Foil Stamping & Embossing',
    discountBadge: '50% OFF • Album Collection',
    discountBadgeGu: '૫૦% છૂટ • આલ્બમ કલેક્શન',
  },
  {
    id: 'alb-02',
    code: 'DLP-ALB-102',
    title: 'Velvet Touch Radha Krishna Lagna Patrika',
    titleGu: 'વેલ્વેટ ટચ રાધા-કૃષ્ણ લગ્ન પત્રિકા',
    category: 'traditional',
    categoryLabel: 'Traditional Kankotri',
    categoryLabelGu: 'પરંપરાગત કંકોત્રી',
    description: 'Deep maroon velvet finish cover with intricate golden Radha-Krishna blessing emblem and multi-fold ceremony inserts.',
    descriptionGu: 'ઘેરા મરૂન વેલ્વેટ કવર અને સોનેરી રાધા-કૃષ્ણ આશીર્વાદ પ્રતીક સાથેની મલ્ટી-ફોલ્ડ પત્રિકા.',
    paperType: 'Velvet Laminated Hard Board',
    finish: 'Deep Gold Emboss & Laser Border',
    discountBadge: '50% OFF • Album Collection',
    discountBadgeGu: '૫૦% છૂટ • આલ્બમ કલેક્શન',
  },
  {
    id: 'alb-03',
    code: 'DLP-ALB-103',
    title: 'Bismillah Islamic Floral Nikah Card',
    titleGu: 'બિસ્મિલ્લાહ ઇસ્લામિક ફ્લોરલ નિકાહ કાર્ડ',
    category: 'muslim',
    categoryLabel: 'Muslim Collection',
    categoryLabelGu: 'મુસ્લિમ સંગ્રહ',
    description: 'Emerald green and gold Islamic Nikah card with elegant Bismillah calligraphy, ornate dome gate fold, and silver/gold foil inserts.',
    descriptionGu: 'લીલા અને સોનેરી રંગમાં બિસ્મિલ્લાહ લખાણ અને મસ્જિદ કમાનાકાર ફોલ્ડિંગ સાથેનું સુંદર નિકાહ કાર્ડ.',
    paperType: '280 GSM Textured Pearl Card',
    finish: 'Gold Calligraphy & Laser Gate Fold',
    discountBadge: '50% OFF • Album Collection',
    discountBadgeGu: '૫૦% છૂટ • આલ્બમ કલેક્શન',
  },
  {
    id: 'alb-04',
    code: 'DLP-ALB-104',
    title: 'Lord Ganesha Auspicious Shrimant / Baby Shower Card',
    titleGu: 'શ્રી ગણેશ શ્રીમંત વિધિ / બેબી શાવર પત્રિકા',
    category: 'religious',
    categoryLabel: 'Auspicious Ceremony',
    categoryLabelGu: 'શુભ પ્રસંગ પત્રિકા',
    description: 'Pastel yellow and peach Godh Bharai / Shrimant invitation with Ganesha blessings, maternal shlokas and gold glitter border.',
    descriptionGu: 'પીળા અને પીચ રંગના પેસ્ટલ કાગળ પર ગણેશજી અને શ્રીમંત વિધિના શુભ શ્લોક સાથેની પત્રિકા.',
    paperType: '250 GSM Fine Linen Card',
    finish: 'Multi-Color Screen & Gold Trim',
    discountBadge: '50% OFF • Album Collection',
    discountBadgeGu: '૫૦% છૂટ • આલ્બમ કલેક્શન',
  },
  {
    id: 'alb-05',
    code: 'DLP-ALB-105',
    title: 'Mundan Sanskar & Babri Celebration Invite',
    titleGu: 'મુંડન સંસ્કાર અને બાબરી આમંત્રણ પત્રિકા',
    category: 'religious',
    categoryLabel: 'Mundan & Sanskar',
    categoryLabelGu: 'મુંડન સંસ્કાર',
    description: 'Charming festive invitation card for child babri and family dinner with auspicious kuldevi symbols and custom photo frame.',
    descriptionGu: 'બાળકના બાબરી / મુંડન પ્રસંગ માટે કુળદેવીના પ્રતીક અને બાળકના ફોટો સાથેનું રંગબેરંગી કાર્ડ.',
    paperType: '300 GSM Art Board Gloss Laminated',
    finish: 'Full Color Offset + Gold Accent',
    discountBadge: '50% OFF • Album Collection',
    discountBadgeGu: '૫૦% છૂટ • આલ્બમ કલેક્શન',
  },
  {
    id: 'alb-06',
    code: 'DLP-ALB-106',
    title: 'Modern Minimal Pastel Geometric Wedding Suite',
    titleGu: 'મોર્ડન મિનિમલ પેસ્ટલ લગ્ન ઇન્વિટેશન',
    category: 'modern',
    categoryLabel: 'Modern Invitations',
    categoryLabelGu: 'આધુનિક આમંત્રણ',
    description: 'Contemporary minimalist card with soft blush pink and sage green palette, rose-gold foil typography and sleek translucent vellum band.',
    descriptionGu: 'આધુનિક પેસ્ટલ ગુલાબી અને આછા લીલા શેડ્સ સાથે રોઝ-ગોલ્ડ ફોઇલ ટાઇપોગ્રાફીનું આધુનિક કાર્ડ.',
    paperType: '350 GSM Cotton Cardstock + Vellum Wrap',
    finish: 'Rose Gold Foil & Blind Deboss',
    discountBadge: '50% OFF • Album Collection',
    discountBadgeGu: '૫૦% છૂટ • આલ્બમ કલેક્શન',
  },
  {
    id: 'alb-07',
    code: 'DLP-ALB-107',
    title: 'Vedic Navchandi Yagya & Vastu Pujan Patrika',
    titleGu: 'વૈદિક નવચંડી યજ્ઞ અને વાસ્તુ પૂજન પત્રિકા',
    category: 'traditional',
    categoryLabel: 'Traditional & Vedic',
    categoryLabelGu: 'વૈદિક ઉત્સવ પત્રિકા',
    description: 'Multi-page folded religious invitation booklet with complete timetable, yagya rituals, and sacred Sanskrit shlokas.',
    descriptionGu: 'સંપૂર્ણ કાર્યક્રમ વિગત, યજ્ઞ વિધિ અને સંસ્કૃત શ્લોકો સાથેનું ફોલ્ડિંગ ધાર્મિક પુસ્તિકા કાર્ડ.',
    paperType: '120 GSM Maplitho Parchment',
    finish: 'Two-Color Print & Gold Border',
    discountBadge: '50% OFF • Album Collection',
    discountBadgeGu: '૫૦% છૂટ • આલ્બમ કલેક્શન',
  },
  {
    id: 'alb-08',
    code: 'DLP-ALB-108',
    title: 'Grand Regal Box Style Wedding Kankotri',
    titleGu: 'ગ્રાન્ડ રીગલ બોક્સ સ્ટાઇલ કંકોત્રી',
    category: 'special',
    categoryLabel: 'Premium Box Kankotri',
    categoryLabelGu: 'પ્રીમિયમ બોક્સ કંકોત્રી',
    description: 'Luxury hardboard box kankotri featuring gold-plated metallic corners, ribbon pullout, and separate cards for every festive event.',
    descriptionGu: 'સોનેરી મેટલ કોર્નર, રિબન પુલઆઉટ અને દરેક ઉત્સવ માટે અલગ-અલગ કાર્ડ્સવાળી આલીશાન બોક્સ કંકોત્રી.',
    paperType: 'Hardbound Rigid Box + Metallic Inserts',
    finish: 'Gold Screen + UV Gloss Embossing',
    discountBadge: '50% OFF • Album Collection',
    discountBadgeGu: '૫૦% છૂટ • આલ્બમ કલેક્શન',
  },
];

// Representative "Our Work" CMS Data for future real photography integration
export interface WorkItem {
  id: string;
  title: string;
  titleGu: string;
  category:
    | 'kankotri'
    | 'commercial'
    | 'bill-books'
    | 'dtp'
    | 'printing'
    | 'binding'
    | 'flex'
    | 'stationery';
  categoryLabel: string;
  categoryLabelGu: string;
  shortDesc: string;
  shortDescGu: string;
  detailedDesc?: string;
  detailedDescGu?: string;
  tag: string;
  tagGu: string;
  date?: string;
  client?: string;
}

export const OUR_WORK_ITEMS: WorkItem[] = [
  {
    id: 'work-01',
    title: 'Traditional Gold Foil Embossed Lagna Patrika',
    titleGu: 'સોનેરી ફોઇલવાળી પરંપરાગત લગ્ન પત્રિકા',
    category: 'kankotri',
    categoryLabel: 'Kankotri & Invitations',
    categoryLabelGu: 'કંકોત્રી અને આમંત્રણ',
    shortDesc: 'Gujarati wedding invitation card with hot foil stamping, intricate shlokas and custom matching envelopes.',
    shortDescGu: 'ગુજરાતી લગ્ન કંકોત્રી, સોનેરી અક્ષરો અને શુભ શ્લોકો સાથે.',
    tag: 'Gold Foil Stamped',
    tagGu: 'ગોલ્ડ ફોઇલ',
  },
  {
    id: 'work-02',
    title: 'Triplicate Carbonless (1+2 NCR) GST Invoice Books',
    titleGu: 'ટ્રીપ્લિકેટ કાર્બનલેસ જીએસટી ટેક્સ બિલ બુક',
    category: 'bill-books',
    categoryLabel: 'Bill Books & Invoices',
    categoryLabelGu: 'બિલ બુક અને ઇન્વોઇસ',
    shortDesc: 'Custom numbered NCR books (White/Pink/Yellow) with clean perforation and hardboard spine binding.',
    shortDescGu: 'ત્રણ નકલોવાળી કાર્બનલેસ બિલ બુક નંબરિંગ અને પરફોરેશન સાથે.',
    tag: 'Carbonless NCR',
    tagGu: 'NCR ડુપ્લિકેટ',
  },
  {
    id: 'work-03',
    title: 'Heavy Duty Transport Consignment (L.R.) Books',
    titleGu: 'ટ્રાન્સપોર્ટ કન્સાઇનમેન્ટ (L.R.) બિલ્ટી બુક',
    category: 'commercial',
    categoryLabel: 'Commercial Printing',
    categoryLabelGu: 'કોમર્શિયલ પ્રિન્ટીંગ',
    shortDesc: '4-part legal format transport consignment receipt books with cloth spine reinforcement.',
    shortDescGu: 'કાપડ પટ્ટી મજબૂત સિલાઈ સાથે ૪-ભાગવાળી ટ્રાન્સપોર્ટ બિલ્ટી બુક.',
    tag: 'Cloth Spine Bound',
    tagGu: 'કાપડ બાઇન્ડીંગ',
  },
  {
    id: 'work-04',
    title: 'Executive Velvet Matte Business Cards with Spot UV',
    titleGu: 'વેલ્વેટ મેટ વિઝિટિંગ કાર્ડ સ્પોટ યુવી સાથે',
    category: 'stationery',
    categoryLabel: 'Stationery & Cards',
    categoryLabelGu: 'સ્ટેશનરી અને કાર્ડ્સ',
    shortDesc: '350 GSM luxury business cards with velvet soft-touch lamination and raised gloss UV brand logo.',
    shortDescGu: '૩૫૦ જીએસએમ પ્રીમિયમ વિઝિટિંગ કાર્ડ્સ ચમકતા લોગો સાથે.',
    tag: 'Spot UV Finish',
    tagGu: 'સ્પોટ યુવી',
  },
  {
    id: 'work-05',
    title: 'Pure Gujarati DTP Composing & Religious Magazine',
    titleGu: 'શુદ્ધ ગુજરાતી DTP કમ્પોઝિંગ અને ધાર્મિક પુસ્તિકા',
    category: 'dtp',
    categoryLabel: 'DTP & Layout Design',
    categoryLabelGu: 'ડીટીપી અને લેઆઉટ',
    shortDesc: 'Typeset manuscript in authentic Gujarati font with correct mantras, poetic stanzas and pagination.',
    shortDescGu: 'સંસ્કૃત શ્લોકો અને શુદ્ધ ગુજરાતી જોડણી સાથેનું DTP લેઆઉટ.',
    tag: 'Accurate Proofing',
    tagGu: 'શુદ્ધ જોડણી',
  },
  {
    id: 'work-06',
    title: 'Hardcover Rexine Ledger Binding with Gold Lettering',
    titleGu: 'હાર્ડકવર રેક્ઝીન ખાતાવહી અને સોનેરી અક્ષરો',
    category: 'binding',
    categoryLabel: 'Book & Binding',
    categoryLabelGu: 'બુક અને બાઇન્ડીંગ',
    shortDesc: 'Long-lasting accounting ledger register with thread sewing, rexine binding, and gold title lettering.',
    shortDescGu: 'વર્ષો સુધી સચવાય તેવી મજબૂત ખાતાવહી સોનેરી ટાઈટલ સાથે.',
    tag: 'Gold Lettered Rexine',
    tagGu: 'સોનેરી ટાઈટલ',
  },
  {
    id: 'work-07',
    title: 'High Definition Multi-Color Corporate Brochure',
    titleGu: 'હાઈ ડેફિનેશન ૪-કલર ઓફસેટ કંપની બ્રોશર',
    category: 'printing',
    categoryLabel: 'Offset Printing',
    categoryLabelGu: 'ઓફસેટ પ્રિન્ટીંગ',
    shortDesc: 'Multi-fold promotional catalog on 170 GSM gloss art paper printed on 4-color offset press.',
    shortDescGu: '૧૭૦ જીએસએમ ગ્લોસી આર્ટ પેપર પર ૪-કલર ઓફસેટ બ્રોશર પ્રિન્ટ.',
    tag: '4-Color CMYK',
    tagGu: 'CMYK ઓફસેટ',
  },
  {
    id: 'work-08',
    title: 'Weatherproof Star Flex Event Backdrop Banner',
    titleGu: 'વોટરપ્રૂફ સ્ટાર ફ્લેક્સ ઇવેન્ટ બેકડ્રોપ બેનર',
    category: 'flex',
    categoryLabel: 'Flex & Large Formats',
    categoryLabelGu: 'ફ્લેક્સ અને સાઈનેજ',
    shortDesc: 'Heavyweight star flex banner for stage decoration with metal eyelets and vibrant outdoor ink.',
    shortDescGu: 'સ્ટેજ પ્રોગ્રામ અને જાહેરાત માટે હેવી સ્ટાર ફ્લેક્સ બેનર.',
    tag: 'Star Flex Banner',
    tagGu: 'સ્ટાર ફ્લેક્સ',
  },
];

export const GALLERY_ITEMS = OUR_WORK_ITEMS.map((w, idx) => ({
  id: `gal-${idx + 1}`,
  title: w.title,
  titleGu: w.titleGu,
  category: w.category === 'kankotri' ? 'wedding' : w.category === 'bill-books' ? 'commercial' : w.category === 'binding' ? 'binding' : 'commercial',
  categoryLabel: w.categoryLabel,
  categoryLabelGu: w.categoryLabelGu,
  description: w.shortDesc,
  descriptionGu: w.shortDescGu,
  tag: w.tag,
  tagGu: w.tagGu,
}));

export interface WorkflowStep {
  step: number;
  title: string;
  titleGu: string;
  desc: string;
  descGu: string;
  iconName: string;
}

export const WORKFLOW_STEPS: WorkflowStep[] = [
  {
    step: 1,
    title: 'Share Requirement',
    titleGu: 'જરૂરિયાત જણાવો',
    desc: 'Provide your idea, text matter, sample, quantity, and preferred paper type via Form or WhatsApp.',
    descGu: 'તમારો વિચાર, લખાણ, સેમ્પલ, જથ્થો અને પેપર પસંદગી ફોર્મ અથવા વોટ્સએપ દ્વારા શેર કરો.',
    iconName: 'MessageSquareShare',
  },
  {
    step: 2,
    title: 'DTP & Design Preparation',
    titleGu: 'ડીટીપી અને ડિઝાઇન',
    desc: 'Our specialists compose Gujarati & English text, layout motifs, and prepare print-ready artwork.',
    descGu: 'અમારા નિષ્ણાતો ગુજરાતી તેમજ અંગ્રેજીમાં શુદ્ધ જોડણી સાથે કલાત્મક ડિઝાઇન અને લેઆઉટ તૈયાર કરે છે.',
    iconName: 'FileEdit',
  },
  {
    step: 3,
    title: 'Customer Proof Approval',
    titleGu: 'પ્રૂફ ચેક અને મંજૂરી',
    desc: 'We share PDF or physical proof with you. Once you approve the spelling and layout, we proceed.',
    descGu: 'અમે તમને વોટ્સએપ પર પીડીએફ પ્રૂફ મોકલીએ છીએ. તમારી મંજૂરી મળ્યા બાદ જ પ્રિન્ટીંગ શરૂ થાય છે.',
    iconName: 'CheckCircle2',
  },
  {
    step: 4,
    title: 'Precision Printing',
    titleGu: 'ચોકસાઈભર્યું પ્રિન્ટીંગ',
    desc: 'High-definition offset, multi-color, or screen printing with vibrant inks and quality paper.',
    descGu: 'ઉત્તમ ગુણવત્તાવાળા ઓફસેટ, મલ્ટી-કલર કે સ્ક્રીન પ્રિન્ટીંગ દ્વારા સ્પષ્ટ છાપકામ થાય છે.',
    iconName: 'Printer',
  },
  {
    step: 5,
    title: 'Binding & Finishing',
    titleGu: 'બાઇન્ડીંગ અને ફિનિશિંગ',
    desc: 'Cutting, creasing, gold foil stamping, numbering, perforation, and stitch/hardbound binding.',
    descGu: 'કટીંગ, ગોલ્ડ ફોઇલ, નંબરિંગ, પંચિંગ અને મજબૂત સિલાઈ/બાઇન્ડીંગ કામ પૂર્ણ કરવામાં આવે છે.',
    iconName: 'Layers',
  },
  {
    step: 6,
    title: 'Transport & Delivery',
    titleGu: 'પેકિંગ અને ડિલિવરી',
    desc: 'Moisture-proof packing and doorstep delivery or transport parcel dispatch right to you.',
    descGu: 'સુરક્ષિત પેકિંગ સાથે વડોદરામાં અથવા ટ્રાન્સપોર્ટ દ્વારા તમારા સુધી માલ પહોંચાડવામાં આવે છે.',
    iconName: 'Truck',
  },
];

export interface EnquiryRecord {
  id: string;
  reference_number: string;
  customer_name: string;
  phone: string;
  whatsapp: string;
  email: string;
  service: string;
  subcategory?: string;
  quantity?: string;
  size?: string;
  paper_type?: string;
  printing_type?: string;
  design_needed?: string;
  binding_needed?: string;
  delivery_required?: boolean;
  delivery_location?: string;
  required_date?: string;
  requirements?: string;
  uploaded_files?: string[];
  status: 'New' | 'Contacted' | 'Quoted' | 'Approved' | 'Completed' | 'Cancelled';
  created_at: string;
}
