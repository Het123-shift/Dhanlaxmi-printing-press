export interface RouteMetadata {
  title: string;
  description: string;
  canonical: string;
  ogTitle: string;
  ogDescription: string;
  ogUrl: string;
  robots: string;
}

const BASE_URL = 'https://dhanlaxmi-printing-press.vercel.app';
const DEFAULT_IMAGE = `${BASE_URL}/logo.png`;

export const ROUTE_METADATA: Record<string, RouteMetadata> = {
  home: {
    title: 'Dhanlaxmi Printing Press | Best Printing & Kankotri Press in Vadodara',
    description: 'Dhanlaxmi Printing Press in Vadodara offers 50% OFF on Wedding Kankotri & Invitations from Album Collection, Bill Books, L.R., Visiting Cards, DTP Composing, Multi-Color Offset & Screen Printing.',
    canonical: `${BASE_URL}/`,
    ogTitle: 'Dhanlaxmi Printing Press | Best Printing & Kankotri in Vadodara',
    ogDescription: '50% OFF on Every Kankotri & Invitation Card from Our Album Collection. Quality Offset, Screen & Commercial Printing in Vadodara.',
    ogUrl: `${BASE_URL}/`,
    robots: 'index, follow',
  },
  about: {
    title: 'About Us | Dhanlaxmi Printing Press Vadodara',
    description: 'Learn about Dhanlaxmi Printing Press, our decades of printing heritage in Vadodara, quality craftsmanship in wedding kankotri, offset printing, and complete stationery solutions.',
    canonical: `${BASE_URL}/about`,
    ogTitle: 'About Us | Dhanlaxmi Printing Press Vadodara',
    ogDescription: 'Discover our story, printing craftsmanship, and commitment to quality printing and invitation services in Vadodara.',
    ogUrl: `${BASE_URL}/about`,
    robots: 'index, follow',
  },
  services: {
    title: 'Printing Services Catalogue | Dhanlaxmi Printing Press Vadodara',
    description: 'Explore our comprehensive printing services in Vadodara: wedding invitations, commercial stationery, tax invoice bill books, DTP composing, multi-color offset, screen printing, and book binding.',
    canonical: `${BASE_URL}/services`,
    ogTitle: 'Printing Services Catalogue | Dhanlaxmi Printing Press Vadodara',
    ogDescription: 'Complete catalogue of printing, invitation, commercial stationery, and binding solutions in Vadodara.',
    ogUrl: `${BASE_URL}/services`,
    robots: 'index, follow',
  },
  'invitation-kankotri': {
    title: 'Wedding Kankotri & Invitation Cards (50% OFF Album Collection) | Vadodara',
    description: 'Get 50% OFF on wedding kankotri and invitation cards from our physical album collection in Vadodara. Traditional Gujarati, Hindu, and Muslim wedding cards with screen gold foil and custom printing.',
    canonical: `${BASE_URL}/invitation-kankotri`,
    ogTitle: 'Wedding Kankotri & Invitations (50% OFF Album Collection) | Vadodara',
    ogDescription: 'Explore traditional and modern Gujarati wedding kankotri and invitation cards with 50% OFF from our album collection in Vadodara.',
    ogUrl: `${BASE_URL}/invitation-kankotri`,
    robots: 'index, follow',
  },
  'commercial-printing': {
    title: 'Commercial Printing & Bill Books | Dhanlaxmi Printing Press Vadodara',
    description: 'Custom GST tax invoice bill books, bilty books, lorry receipts (L.R.), challan pads, visiting cards, and corporate stationery printing in Vadodara with serial numbering and carbonless NCR paper.',
    canonical: `${BASE_URL}/commercial-printing`,
    ogTitle: 'Commercial Printing & Bill Books | Vadodara',
    ogDescription: 'High-quality GST bill books, L.R. books, challan pads, and commercial stationery printing in Vadodara.',
    ogUrl: `${BASE_URL}/commercial-printing`,
    robots: 'index, follow',
  },
  gallery: {
    title: 'Work Gallery & Samples | Dhanlaxmi Printing Press Vadodara',
    description: 'Browse our sample gallery of wedding kankotri cards, commercial bill books, visiting cards, offset printing, and hardcover book binding crafted in Vadodara.',
    canonical: `${BASE_URL}/gallery`,
    ogTitle: 'Work Gallery & Printing Samples | Vadodara',
    ogDescription: 'View real photographs and samples of wedding invitations, stationery, and offset prints by Dhanlaxmi Printing Press.',
    ogUrl: `${BASE_URL}/gallery`,
    robots: 'index, follow',
  },
  contact: {
    title: 'Contact & Location | Dhanlaxmi Printing Press Panigate Vadodara',
    description: 'Visit Dhanlaxmi Printing Press near Harish Petrol Pump, Outside Panigate, Vadodara. Call +91 98254 50176 or message on WhatsApp for printing inquiries and quotes.',
    canonical: `${BASE_URL}/contact`,
    ogTitle: 'Contact & Location | Dhanlaxmi Printing Press Vadodara',
    ogDescription: 'Find address, map directions, phone number, and WhatsApp contact for Dhanlaxmi Printing Press in Vadodara.',
    ogUrl: `${BASE_URL}/contact`,
    robots: 'index, follow',
  },
  'dtp-design': {
    title: 'DTP Composing & Layout Design | Dhanlaxmi Printing Press Vadodara',
    description: 'Professional Gujarati and English DTP composing, typesetting, wedding shloka drafting, vector invitation borders, and print-ready digital artwork in Vadodara.',
    canonical: `${BASE_URL}/dtp-design`,
    ogTitle: 'DTP Composing & Graphic Design | Vadodara',
    ogDescription: 'Accurate Gujarati typesetting, wedding invitation composing, and corporate document layout design in Vadodara.',
    ogUrl: `${BASE_URL}/dtp-design`,
    robots: 'index, follow',
  },
  'printing-services': {
    title: 'Offset & Screen Printing Capabilities | Dhanlaxmi Printing Press Vadodara',
    description: 'Learn about our multi-color offset and silkscreen printing capabilities in Vadodara. High-fidelity CMYK prints, metallic gold foil stamping, and commercial volume print runs.',
    canonical: `${BASE_URL}/printing-services`,
    ogTitle: 'Offset & Screen Printing Services | Vadodara',
    ogDescription: 'Multi-color offset and silkscreen printing with rich metallic inks and sharp fidelity at Dhanlaxmi Printing Press Vadodara.',
    ogUrl: `${BASE_URL}/printing-services`,
    robots: 'index, follow',
  },
  'book-binding': {
    title: 'Hardcover Book & Ledger Binding | Dhanlaxmi Printing Press Vadodara',
    description: 'Expert hardcover rexine binding, account register stitching, gold foil lettering on spine, and society record book binding services in Vadodara.',
    canonical: `${BASE_URL}/book-binding`,
    ogTitle: 'Hardcover Book & Ledger Binding | Vadodara',
    ogDescription: 'Durable rexine book binding, ledger registers, and gold foil embossed covers by Dhanlaxmi Printing Press Vadodara.',
    ogUrl: `${BASE_URL}/book-binding`,
    robots: 'index, follow',
  },
  'transport-delivery': {
    title: 'Transport & Delivery Assistance | Dhanlaxmi Printing Press Vadodara',
    description: 'Reliable parcel packaging and delivery support across Vadodara and Gujarat for bulk wedding invitations, commercial bill books, and printed stationery.',
    canonical: `${BASE_URL}/transport-delivery`,
    ogTitle: 'Transport & Delivery Assistance | Vadodara',
    ogDescription: 'Safe packaging and dispatch solutions for your bulk printing orders across Vadodara and Gujarat.',
    ogUrl: `${BASE_URL}/transport-delivery`,
    robots: 'index, follow',
  },
  admin: {
    title: 'Admin Portal | Dhanlaxmi Printing Press',
    description: 'Staff portal for Dhanlaxmi Printing Press.',
    canonical: `${BASE_URL}/admin`,
    ogTitle: 'Admin Portal | Dhanlaxmi Printing Press',
    ogDescription: 'Staff portal for Dhanlaxmi Printing Press.',
    ogUrl: `${BASE_URL}/admin`,
    robots: 'noindex, nofollow',
  },
};

export function updatePageMetadata(route: string) {
  const meta = ROUTE_METADATA[route] || {
    title: 'Dhanlaxmi Printing Press | Vadodara',
    description: 'Printing, Wedding Kankotri, Commercial Stationery & Book Binding in Vadodara.',
    canonical: `${BASE_URL}/${route === 'home' ? '' : route}`,
    ogTitle: 'Dhanlaxmi Printing Press | Vadodara',
    ogDescription: 'Quality printing and wedding kankotri services in Vadodara.',
    ogUrl: `${BASE_URL}/${route === 'home' ? '' : route}`,
    robots: route === 'admin' ? 'noindex, nofollow' : 'noindex, follow',
  };

  // 1. Document Title
  document.title = meta.title;

  // 2. Helper to set or create meta tag
  const setMetaTag = (attrName: string, attrVal: string, content: string) => {
    let el = document.querySelector(`meta[${attrName}="${attrVal}"]`) as HTMLMetaElement | null;
    if (!el) {
      el = document.createElement('meta');
      el.setAttribute(attrName, attrVal);
      document.head.appendChild(el);
    }
    el.setAttribute('content', content);
  };

  // Meta Description & Robots
  setMetaTag('name', 'description', meta.description);
  setMetaTag('name', 'robots', meta.robots);

  // Open Graph
  setMetaTag('property', 'og:title', meta.ogTitle);
  setMetaTag('property', 'og:description', meta.ogDescription);
  setMetaTag('property', 'og:url', meta.ogUrl);
  setMetaTag('property', 'og:image', DEFAULT_IMAGE);

  // Twitter
  setMetaTag('name', 'twitter:title', meta.ogTitle);
  setMetaTag('name', 'twitter:description', meta.ogDescription);
  setMetaTag('name', 'twitter:image', DEFAULT_IMAGE);

  // Canonical Link
  let canonicalEl = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
  if (!canonicalEl) {
    canonicalEl = document.createElement('link');
    canonicalEl.setAttribute('rel', 'canonical');
    document.head.appendChild(canonicalEl);
  }
  canonicalEl.setAttribute('href', meta.canonical);
}
