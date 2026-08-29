import type { EnquiryRecord } from '../data/content';
import { getSupabaseClient } from './supabase';

const STORAGE_KEY = 'dhanlaxmi_enquiries';

export function getLocalEnquiries(): EnquiryRecord[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      const initial: EnquiryRecord[] = [
        {
          id: 'enq-101',
          reference_number: 'DLP-2026-8801',
          customer_name: 'Hareshbhai Patel',
          phone: '9825123456',
          whatsapp: '9825123456',
          email: 'haresh.patel@example.com',
          service: 'Invitation & Kankotri',
          subcategory: 'Wedding Kankotri',
          quantity: '350 Cards',
          size: 'Standard Fold (8x6 inch)',
          paper_type: '280 GSM Metallic Board',
          printing_type: 'Multi-Color + Gold Foil',
          design_needed: 'Yes',
          binding_needed: 'Envelope Included',
          delivery_required: true,
          delivery_location: 'Alkapuri, Vadodara',
          required_date: '2026-09-15',
          requirements: 'Need Lord Ganesha logo on front cover in gold foil. Text matter in Gujarati.',
          status: 'Quoted',
          created_at: '2026-08-28T10:30:00.000Z',
        },
        {
          id: 'enq-102',
          reference_number: 'DLP-2026-8802',
          customer_name: 'Shreeji Logistics',
          phone: '9898011223',
          whatsapp: '9898011223',
          email: 'accounts@shreejilogistics.in',
          service: 'Commercial Printing',
          subcategory: 'Bilty Books & L.R.',
          quantity: '20 Books (100 sets each)',
          size: 'A4 Size (4-part NCR)',
          paper_type: 'NCR Carbonless (Pink/Yellow/Green/White)',
          printing_type: 'Single Color Offset',
          design_needed: 'Use existing layout',
          binding_needed: 'Hardbound Cloth Spine',
          delivery_required: true,
          delivery_location: 'GIDC Makarpura, Vadodara',
          required_date: '2026-09-05',
          requirements: 'Standard consignment note format with serial numbering starting from 5001.',
          status: 'New',
          created_at: '2026-08-29T08:15:00.000Z',
        },
      ];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(initial));
      return initial;
    }
    return JSON.parse(raw);
  } catch (err) {
    console.error('Error reading enquiries from localStorage', err);
    return [];
  }
}

export async function getEnquiriesAsync(): Promise<EnquiryRecord[]> {
  const supabase = getSupabaseClient();
  if (supabase) {
    try {
      const { data, error } = await supabase
        .from('enquiries')
        .select('*')
        .order('created_at', { ascending: false });

      if (!error && data && data.length > 0) {
        return data as EnquiryRecord[];
      }
    } catch (e) {
      console.warn('Supabase fetch failed, fallback to local storage:', e);
    }
  }
  return getLocalEnquiries();
}

export function getEnquiries(): EnquiryRecord[] {
  return getLocalEnquiries();
}

export async function saveEnquiryAsync(
  record: Omit<EnquiryRecord, 'id' | 'reference_number' | 'created_at' | 'status'> & {
    status?: EnquiryRecord['status'];
  }
): Promise<EnquiryRecord> {
  const list = getLocalEnquiries();
  const randomSuffix = Math.floor(1000 + Math.random() * 9000);
  const now = new Date();
  const refNum = `DLP-${now.getFullYear()}-${randomSuffix}`;

  const newRecord: EnquiryRecord = {
    id: 'enq-' + Date.now(),
    reference_number: refNum,
    ...record,
    status: record.status || 'New',
    created_at: now.toISOString(),
  };

  // 1. Save to LocalStorage
  list.unshift(newRecord);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(list));

  // 2. Sync to Supabase PostgreSQL if connected
  const supabase = getSupabaseClient();
  if (supabase) {
    try {
      await supabase.from('enquiries').insert([
        {
          reference_number: refNum,
          customer_name: newRecord.customer_name,
          phone: newRecord.phone,
          whatsapp: newRecord.whatsapp,
          email: newRecord.email,
          service: newRecord.service,
          subcategory: newRecord.subcategory,
          quantity: newRecord.quantity,
          size: newRecord.size,
          paper_type: newRecord.paper_type,
          printing_type: newRecord.printing_type,
          design_needed: newRecord.design_needed,
          binding_needed: newRecord.binding_needed,
          delivery_required: newRecord.delivery_required,
          delivery_location: newRecord.delivery_location,
          required_date: newRecord.required_date,
          requirements: newRecord.requirements,
          status: newRecord.status,
          created_at: newRecord.created_at,
        },
      ]);
    } catch (err) {
      console.warn('Could not sync to Supabase database:', err);
    }
  }

  return newRecord;
}

export function saveEnquiry(
  record: Omit<EnquiryRecord, 'id' | 'reference_number' | 'created_at' | 'status'> & {
    status?: EnquiryRecord['status'];
  }
): EnquiryRecord {
  // Synchronous entry point that also kicks off async Supabase write
  const list = getLocalEnquiries();
  const randomSuffix = Math.floor(1000 + Math.random() * 9000);
  const now = new Date();
  const refNum = `DLP-${now.getFullYear()}-${randomSuffix}`;

  const newRecord: EnquiryRecord = {
    id: 'enq-' + Date.now(),
    reference_number: refNum,
    ...record,
    status: record.status || 'New',
    created_at: now.toISOString(),
  };

  list.unshift(newRecord);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(list));

  const supabase = getSupabaseClient();
  if (supabase) {
    supabase
      .from('enquiries')
      .insert([
        {
          reference_number: refNum,
          customer_name: newRecord.customer_name,
          phone: newRecord.phone,
          whatsapp: newRecord.whatsapp,
          email: newRecord.email,
          service: newRecord.service,
          subcategory: newRecord.subcategory,
          quantity: newRecord.quantity,
          size: newRecord.size,
          paper_type: newRecord.paper_type,
          printing_type: newRecord.printing_type,
          design_needed: newRecord.design_needed,
          binding_needed: newRecord.binding_needed,
          delivery_required: newRecord.delivery_required,
          delivery_location: newRecord.delivery_location,
          required_date: newRecord.required_date,
          requirements: newRecord.requirements,
          status: newRecord.status,
          created_at: newRecord.created_at,
        },
      ])
      .then(({ error }) => {
        if (error) console.warn('Supabase sync warning:', error);
      });
  }

  return newRecord;
}

export async function updateEnquiryStatusAsync(
  id: string,
  ref: string,
  newStatus: EnquiryRecord['status']
): Promise<boolean> {
  const list = getLocalEnquiries();
  const idx = list.findIndex((e) => e.id === id || e.reference_number === ref);
  if (idx !== -1) {
    list[idx].status = newStatus;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
  }

  const supabase = getSupabaseClient();
  if (supabase) {
    try {
      await supabase
        .from('enquiries')
        .update({ status: newStatus })
        .or(`id.eq.${id},reference_number.eq.${ref}`);
    } catch (e) {
      console.warn('Supabase status update error:', e);
    }
  }
  return true;
}

export function updateEnquiryStatus(
  id: string,
  newStatus: EnquiryRecord['status']
): boolean {
  const list = getLocalEnquiries();
  const idx = list.findIndex((e) => e.id === id);
  if (idx !== -1) {
    const ref = list[idx].reference_number;
    list[idx].status = newStatus;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(list));

    const supabase = getSupabaseClient();
    if (supabase) {
      supabase
        .from('enquiries')
        .update({ status: newStatus })
        .eq('reference_number', ref)
        .then(() => {});
    }
    return true;
  }
  return false;
}

export function deleteEnquiry(id: string): boolean {
  const list = getLocalEnquiries();
  const target = list.find((e) => e.id === id);
  const filtered = list.filter((e) => e.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));

  if (target) {
    const supabase = getSupabaseClient();
    if (supabase) {
      supabase
        .from('enquiries')
        .delete()
        .eq('reference_number', target.reference_number)
        .then(() => {});
    }
  }
  return true;
}

export function generateWhatsAppUrl(phone: string, text: string): string {
  const cleanPhone = phone.replace(/[^0-9]/g, '');
  const targetNumber = cleanPhone.length === 10 ? `91${cleanPhone}` : cleanPhone;
  const encodedText = encodeURIComponent(text);
  return `https://wa.me/${targetNumber}?text=${encodedText}`;
}

export function generateCallUrl(phone: string): string {
  const cleanPhone = phone.replace(/[^0-9]/g, '');
  return `tel:${cleanPhone}`;
}
