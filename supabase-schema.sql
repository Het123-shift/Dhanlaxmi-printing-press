-- =========================================================================
-- DHANLAXMI PRINTING PRESS - COMPLETE SUPABASE POSTGRESQL DATABASE SCHEMA
-- Project ID: jthsfxdavsvgldjwqosp
-- =========================================================================

-- 1. ENQUIRIES & QUOTATIONS TABLE
CREATE TABLE IF NOT EXISTS public.enquiries (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    reference_number VARCHAR(50) UNIQUE NOT NULL,
    customer_name VARCHAR(255) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    whatsapp VARCHAR(20),
    email VARCHAR(255),
    service VARCHAR(100) NOT NULL,
    subcategory VARCHAR(150),
    quantity VARCHAR(100),
    size VARCHAR(100),
    paper_type VARCHAR(150),
    printing_type VARCHAR(150),
    design_needed VARCHAR(100),
    binding_needed VARCHAR(150),
    delivery_required BOOLEAN DEFAULT FALSE,
    delivery_location TEXT,
    required_date VARCHAR(50),
    requirements TEXT,
    uploaded_files JSONB DEFAULT '[]'::jsonb,
    status VARCHAR(50) DEFAULT 'New' CHECK (status IN ('New', 'Contacted', 'Quoted', 'Approved', 'Completed', 'Cancelled')),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. CONTACT MESSAGES TABLE
CREATE TABLE IF NOT EXISTS public.contact_messages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    reference_number VARCHAR(50) UNIQUE NOT NULL,
    name VARCHAR(255) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    email VARCHAR(255),
    subject VARCHAR(150),
    message TEXT NOT NULL,
    status VARCHAR(50) DEFAULT 'New',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. USER INTERACTION & ENGAGEMENT ANALYTICS TABLE
CREATE TABLE IF NOT EXISTS public.user_interactions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    interaction_type VARCHAR(50) NOT NULL, -- e.g. 'whatsapp_click', 'call_click', 'quote_started', 'album_viewed'
    page_url TEXT,
    service_or_item VARCHAR(150),
    user_agent TEXT,
    language VARCHAR(10) DEFAULT 'en',
    metadata JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. CUSTOMER REVIEWS & TESTIMONIALS TABLE
CREATE TABLE IF NOT EXISTS public.customer_reviews (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    customer_name VARCHAR(255) NOT NULL,
    rating INTEGER CHECK (rating >= 1 AND rating <= 5) DEFAULT 5,
    service_type VARCHAR(100),
    review_text TEXT NOT NULL,
    is_verified BOOLEAN DEFAULT TRUE,
    is_published BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =========================================================================
-- 5. PERFORMANCE INDEXES
-- =========================================================================
CREATE INDEX IF NOT EXISTS idx_enquiries_ref ON public.enquiries(reference_number);
CREATE INDEX IF NOT EXISTS idx_enquiries_phone ON public.enquiries(phone);
CREATE INDEX IF NOT EXISTS idx_enquiries_status ON public.enquiries(status);
CREATE INDEX IF NOT EXISTS idx_enquiries_created ON public.enquiries(created_at DESC);

CREATE INDEX IF NOT EXISTS idx_contact_ref ON public.contact_messages(reference_number);
CREATE INDEX IF NOT EXISTS idx_interactions_type ON public.user_interactions(interaction_type);
CREATE INDEX IF NOT EXISTS idx_interactions_created ON public.user_interactions(created_at DESC);

-- =========================================================================
-- 6. ROW LEVEL SECURITY (RLS) & PUBLIC ACCESS POLICIES
-- =========================================================================
ALTER TABLE public.enquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_interactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.customer_reviews ENABLE ROW LEVEL SECURITY;

-- Enquiries Policies (Allow Public Insert, Read & Status Updates)
DROP POLICY IF EXISTS "Allow public insert for enquiries" ON public.enquiries;
CREATE POLICY "Allow public insert for enquiries" ON public.enquiries
    FOR INSERT TO anon, authenticated
    WITH CHECK (true);

DROP POLICY IF EXISTS "Allow read for enquiries" ON public.enquiries;
CREATE POLICY "Allow read for enquiries" ON public.enquiries
    FOR SELECT TO anon, authenticated
    USING (true);

DROP POLICY IF EXISTS "Allow update for enquiries" ON public.enquiries;
CREATE POLICY "Allow update for enquiries" ON public.enquiries
    FOR UPDATE TO anon, authenticated
    USING (true);

DROP POLICY IF EXISTS "Allow delete for enquiries" ON public.enquiries;
CREATE POLICY "Allow delete for enquiries" ON public.enquiries
    FOR DELETE TO anon, authenticated
    USING (true);

-- Contact Messages Policies
DROP POLICY IF EXISTS "Allow public insert for contact_messages" ON public.contact_messages;
CREATE POLICY "Allow public insert for contact_messages" ON public.contact_messages
    FOR INSERT TO anon, authenticated
    WITH CHECK (true);

DROP POLICY IF EXISTS "Allow read for contact_messages" ON public.contact_messages;
CREATE POLICY "Allow read for contact_messages" ON public.contact_messages
    FOR SELECT TO anon, authenticated
    USING (true);

-- User Interactions Policies
DROP POLICY IF EXISTS "Allow public insert for user_interactions" ON public.user_interactions;
CREATE POLICY "Allow public insert for user_interactions" ON public.user_interactions
    FOR INSERT TO anon, authenticated
    WITH CHECK (true);

DROP POLICY IF EXISTS "Allow read for user_interactions" ON public.user_interactions;
CREATE POLICY "Allow read for user_interactions" ON public.user_interactions
    FOR SELECT TO anon, authenticated
    USING (true);

-- Customer Reviews Policies
DROP POLICY IF EXISTS "Allow public read for customer_reviews" ON public.customer_reviews;
CREATE POLICY "Allow public read for customer_reviews" ON public.customer_reviews
    FOR SELECT TO anon, authenticated
    USING (is_published = true);

-- =========================================================================
-- 7. INITIAL SAMPLE SEED DATA
-- =========================================================================
INSERT INTO public.enquiries (
    reference_number, customer_name, phone, whatsapp, email,
    service, subcategory, quantity, size, paper_type,
    printing_type, design_needed, binding_needed, delivery_required,
    delivery_location, required_date, requirements, status
) VALUES 
(
    'DLP-2026-8801',
    'Hareshbhai Patel',
    '9825123456',
    '9825123456',
    'haresh.patel@example.com',
    'Invitation & Kankotri',
    'Wedding Kankotri (Lagna Patrika)',
    '350 Cards',
    'Standard Fold (8x6 inch)',
    '300 GSM Metallic Shimmer Board',
    'Screen Printing with Gold Foil',
    'Yes (Need DTP Composing)',
    'Standard Matching Envelope',
    TRUE,
    'Alkapuri, Vadodara',
    '2026-09-15',
    'Need Lord Ganesha logo on front cover in gold foil. Text matter in Gujarati.',
    'Quoted'
),
(
    'DLP-2026-8802',
    'Shreeji Logistics (Rajesh Shah)',
    '9898011223',
    '9898011223',
    'accounts@shreejilogistics.in',
    'Commercial Printing',
    'Bilty Books & L.R.',
    '20 Books (100 sets each)',
    'A4 Size (4-part NCR)',
    'NCR Carbonless (Pink/Yellow/Green/White)',
    'Single Color Offset',
    'Re-print Previous Job',
    'Hardbound Rexine Book Spine',
    TRUE,
    'GIDC Makarpura, Vadodara',
    '2026-09-05',
    'Standard consignment note format with serial numbering starting from 5001.',
    'New'
)
ON CONFLICT (reference_number) DO NOTHING;
