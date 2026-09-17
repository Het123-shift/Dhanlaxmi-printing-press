import React from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { OurWorkPage } from './pages/OurWorkPage';
import { ServicesPage } from './pages/ServicesPage';
import { InvitationPage } from './pages/InvitationPage';
import { CommercialPrintingPage } from './pages/CommercialPrintingPage';
import { DtpDesignPage } from './pages/DtpDesignPage';
import { PrintingServicesPage } from './pages/PrintingServicesPage';
import { BookBindingPage } from './pages/BookBindingPage';
import { TransportDeliveryPage } from './pages/TransportDeliveryPage';
import { GalleryPage } from './pages/GalleryPage';
import { QuotePage } from './pages/QuotePage';
import { ContactPage } from './pages/ContactPage';
import { AdminPage } from './pages/AdminPage';
import { TrackQuotePage } from './pages/TrackQuotePage';
import type { Language, ServiceItem } from './data/content';
import { updatePageMetadata } from './utils/seo';

function parseRouteFromLocation(): string {
  // 1. If an old hash exists (e.g. /#/about or #/services), migrate it
  if (window.location.hash) {
    const rawHash = window.location.hash.replace(/^#\/?/, '').trim();
    if (rawHash) {
      // Normalize 'home' hash to ''
      const targetPath = rawHash === 'home' ? '/' : `/${rawHash}`;
      // Clean up the URL in address bar without reloading
      window.history.replaceState(null, '', targetPath);
      return rawHash;
    }
  }

  // 2. Parse from window.location.pathname
  const path = window.location.pathname.replace(/^\/+|\/+$/g, '');
  if (!path) {
    return 'home';
  }
  return path;
}

export function App() {
  const [currentRoute, setCurrentRoute] = React.useState<string>(parseRouteFromLocation);
  const [lang, setLang] = React.useState<Language>('en');
  const [selectedServiceForQuote, setSelectedServiceForQuote] = React.useState<ServiceItem | null>(null);

  // Sync SEO metadata whenever currentRoute changes
  React.useEffect(() => {
    updatePageMetadata(currentRoute);
  }, [currentRoute]);

  // Handle browser back / forward navigation
  React.useEffect(() => {
    const handlePopState = () => {
      const route = parseRouteFromLocation();
      setCurrentRoute(route);
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigate = (route: string) => {
    const normalizedRoute = route === 'home' || route === '' ? 'home' : route;
    setCurrentRoute(normalizedRoute);

    const targetPath = normalizedRoute === 'home' ? '/' : `/${normalizedRoute}`;
    if (window.location.pathname !== targetPath) {
      window.history.pushState(null, '', targetPath);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectService = (service: ServiceItem) => {
    setSelectedServiceForQuote(service);
  };

  return (
    <div className={`min-h-screen flex flex-col bg-[#FAF7F0] text-slate-900 ${lang === 'gu' ? 'font-gujarati' : ''}`}>
      {/* Sticky Header */}
      <Header
        currentRoute={currentRoute}
        navigate={navigate}
        lang={lang}
        setLang={setLang}
      />

      {/* Main Content Body */}
      <main className="flex-1">
        {currentRoute === 'home' && (
          <HomePage
            navigate={navigate}
            lang={lang}
            onSelectService={handleSelectService}
          />
        )}
        {currentRoute === 'about' && (
          <AboutPage navigate={navigate} lang={lang} />
        )}
        {currentRoute === 'our-work' && (
          <OurWorkPage navigate={navigate} lang={lang} />
        )}
        {currentRoute === 'services' && (
          <ServicesPage
            navigate={navigate}
            lang={lang}
            onSelectService={handleSelectService}
          />
        )}
        {currentRoute === 'invitation-kankotri' && (
          <InvitationPage navigate={navigate} lang={lang} />
        )}
        {currentRoute === 'commercial-printing' && (
          <CommercialPrintingPage navigate={navigate} lang={lang} />
        )}
        {currentRoute === 'dtp-design' && (
          <DtpDesignPage navigate={navigate} lang={lang} />
        )}
        {currentRoute === 'printing-services' && (
          <PrintingServicesPage navigate={navigate} lang={lang} />
        )}
        {currentRoute === 'book-binding' && (
          <BookBindingPage navigate={navigate} lang={lang} />
        )}
        {currentRoute === 'transport-delivery' && (
          <TransportDeliveryPage navigate={navigate} lang={lang} />
        )}
        {currentRoute === 'gallery' && (
          <GalleryPage navigate={navigate} lang={lang} />
        )}
        {currentRoute === 'quote' && (
          <QuotePage
            navigate={navigate}
            lang={lang}
            preselectedService={selectedServiceForQuote}
          />
        )}
        {currentRoute === 'track-quote' && (
          <TrackQuotePage navigate={navigate} lang={lang} />
        )}
        {currentRoute === 'contact' && (
          <ContactPage navigate={navigate} lang={lang} />
        )}
        {currentRoute === 'admin' && (
          <AdminPage navigate={navigate} />
        )}
      </main>

      {/* Persistent WhatsApp Widget */}
      <FloatingWhatsApp
        lang={lang}
        customTopic={
          currentRoute === 'invitation-kankotri'
            ? 'Wedding Kankotri & Album 50% OFF Offer'
            : currentRoute === 'commercial-printing'
            ? 'Commercial Bill Books & Invoices'
            : currentRoute === 'dtp-design'
            ? 'DTP Composing & Design'
            : currentRoute === 'book-binding'
            ? 'Hardcover Book Binding & Registers'
            : currentRoute === 'transport-delivery'
            ? 'Transport & Delivery Support'
            : currentRoute === 'our-work'
            ? 'Our Printing Work Portfolio'
            : undefined
        }
      />

      {/* Comprehensive Footer */}
      <Footer navigate={navigate} lang={lang} />
    </div>
  );
}

export default App;
