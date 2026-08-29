import React, { useState, useEffect } from 'react';
import {
  Shield,
  Search,
  CheckCircle2,
  Clock,
  Phone,
  MessageCircle,
  Mail,
  Trash2,
  Eye,
  X,
  RefreshCw,
  Lock,
  Database,
  KeyRound,
  ExternalLink,
  Download,
  Printer,
  Copy,
  Check,
  Filter,
  ArrowUpDown,
  FileSpreadsheet,
} from 'lucide-react';
import type { EnquiryRecord } from '../data/content';
import {
  getEnquiriesAsync,
  updateEnquiryStatusAsync,
  deleteEnquiry,
  generateWhatsAppUrl,
  generateCallUrl,
} from '../utils/storage';
import { getSupabaseConfig, saveSupabaseConfig } from '../utils/supabase';

interface AdminPageProps {
  navigate: (route: string) => void;
}

export const AdminPage: React.FC<AdminPageProps> = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState(false);

  // Supabase connection state
  const [showDbModal, setShowDbModal] = useState(false);
  const [supabaseUrl, setSupabaseUrl] = useState('');
  const [supabaseKey, setSupabaseKey] = useState('');
  const [isDbConnected, setIsDbConnected] = useState(false);
  const [copiedSql, setCopiedSql] = useState(false);

  const [enquiries, setEnquiries] = useState<EnquiryRecord[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'date-desc' | 'date-asc' | 'name' | 'status'>('date-desc');
  const [selectedEnquiry, setSelectedEnquiry] = useState<EnquiryRecord | null>(null);
  const [printSlipEnquiry, setPrintSlipEnquiry] = useState<EnquiryRecord | null>(null);

  useEffect(() => {
    const cfg = getSupabaseConfig();
    setSupabaseUrl(cfg.url);
    setSupabaseKey(cfg.key);
    setIsDbConnected(cfg.isConfigured);
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      loadData();
    }
  }, [isAuthenticated]);

  const loadData = async () => {
    setIsLoading(true);
    try {
      const data = await getEnquiriesAsync();
      setEnquiries(data);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'Patel2911') {
      setIsAuthenticated(true);
      setAuthError(false);
    } else {
      setAuthError(true);
    }
  };

  const handleSaveDbConfig = (e: React.FormEvent) => {
    e.preventDefault();
    saveSupabaseConfig(supabaseUrl, supabaseKey);
    const cfg = getSupabaseConfig();
    setIsDbConnected(cfg.isConfigured);
    setShowDbModal(false);
    loadData();
  };

  const handleStatusChange = async (id: string, ref: string, newStatus: EnquiryRecord['status']) => {
    await updateEnquiryStatusAsync(id, ref, newStatus);
    await loadData();
    if (selectedEnquiry && (selectedEnquiry.id === id || selectedEnquiry.reference_number === ref)) {
      setSelectedEnquiry({ ...selectedEnquiry, status: newStatus });
    }
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this enquiry record?')) {
      deleteEnquiry(id);
      loadData();
      if (selectedEnquiry && selectedEnquiry.id === id) {
        setSelectedEnquiry(null);
      }
    }
  };

  const exportToCsv = () => {
    if (filteredEnquiries.length === 0) {
      alert('No records to export.');
      return;
    }
    const headers = [
      'Reference No',
      'Date',
      'Customer Name',
      'Phone',
      'WhatsApp',
      'Email',
      'Service',
      'Subcategory',
      'Quantity',
      'Size',
      'Paper Type',
      'Printing Type',
      'Status',
      'Requirements',
    ];
    const rows = filteredEnquiries.map((e) => [
      e.reference_number,
      new Date(e.created_at).toLocaleString(),
      `"${e.customer_name.replace(/"/g, '""')}"`,
      e.phone,
      e.whatsapp || e.phone,
      e.email,
      `"${e.service.replace(/"/g, '""')}"`,
      `"${(e.subcategory || '').replace(/"/g, '""')}"`,
      `"${(e.quantity || '').replace(/"/g, '""')}"`,
      `"${(e.size || '').replace(/"/g, '""')}"`,
      `"${(e.paper_type || '').replace(/"/g, '""')}"`,
      `"${(e.printing_type || '').replace(/"/g, '""')}"`,
      e.status,
      `"${(e.requirements || '').replace(/"/g, '""')}"`,
    ]);

    const csvContent =
      'data:text/csv;charset=utf-8,' +
      [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute(
      'download',
      `Dhanlaxmi_Enquiries_${new Date().toISOString().slice(0, 10)}.csv`
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const copySqlSchema = () => {
    const sql = `-- 1. Create Enquiries Table
CREATE TABLE IF NOT EXISTS enquiries (
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

-- 2. Create Contact Messages Table
CREATE TABLE IF NOT EXISTS contact_messages (
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

-- 3. Indexes & RLS Policies
CREATE INDEX IF NOT EXISTS idx_enquiries_reference ON enquiries(reference_number);
CREATE INDEX IF NOT EXISTS idx_enquiries_status ON enquiries(status);
CREATE INDEX IF NOT EXISTS idx_enquiries_phone ON enquiries(phone);

ALTER TABLE enquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public insert for enquiries" ON enquiries FOR INSERT TO anon, authenticated WITH CHECK (true);
CREATE POLICY "Allow read for enquiries" ON enquiries FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Allow status updates for enquiries" ON enquiries FOR UPDATE TO anon, authenticated USING (true);
CREATE POLICY "Allow public insert for contact messages" ON contact_messages FOR INSERT TO anon, authenticated WITH CHECK (true);
CREATE POLICY "Allow read for contact messages" ON contact_messages FOR SELECT TO anon, authenticated USING (true);`;

    navigator.clipboard.writeText(sql);
    setCopiedSql(true);
    setTimeout(() => setCopiedSql(false), 3000);
  };

  const filteredEnquiries = enquiries
    .filter((item) => {
      const matchesStatus = statusFilter === 'all' || item.status === statusFilter;
      const q = search.toLowerCase();
      if (!q) return matchesStatus;

      return (
        item.customer_name.toLowerCase().includes(q) ||
        item.reference_number.toLowerCase().includes(q) ||
        item.phone.includes(q) ||
        item.service.toLowerCase().includes(q) ||
        (item.subcategory && item.subcategory.toLowerCase().includes(q))
      );
    })
    .sort((a, b) => {
      if (sortBy === 'date-desc') {
        return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
      }
      if (sortBy === 'date-asc') {
        return new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
      }
      if (sortBy === 'name') {
        return a.customer_name.localeCompare(b.customer_name);
      }
      if (sortBy === 'status') {
        return a.status.localeCompare(b.status);
      }
      return 0;
    });

  if (!isAuthenticated) {
    return (
      <div className="max-w-md mx-auto my-20 p-8 bg-white rounded-3xl border border-[#c9a227]/30 shadow-2xl space-y-6">
        <div className="text-center space-y-3">
          <div className="w-16 h-16 mx-auto bg-[#101B36] text-[#dfba47] rounded-2xl flex items-center justify-center shadow-lg border border-[#c9a227]/40">
            <Lock className="w-8 h-8" />
          </div>
          <h2 className="text-xl font-extrabold text-[#101B36] font-serif">
            Dhanlaxmi Admin Portal
          </h2>
          <p className="text-xs text-slate-500 font-light">
            Enter administrative credentials to manage quotes, print orders, and PostgreSQL database settings.
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-700">Administrator Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              className="w-full px-3.5 py-3 text-xs bg-[#FAF7F0] border border-slate-300 rounded-xl focus:ring-2 focus:ring-[#c9a227]"
              autoFocus
            />
            {authError && (
              <p className="text-[11px] text-rose-600 font-semibold mt-1">
                Incorrect password. Access denied.
              </p>
            )}
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-[#101B36] hover:bg-[#214E9A] text-white font-extrabold rounded-xl text-xs shadow-lg transition-all"
          >
            Authenticate & Login
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header */}
      <div className="bg-[#101B36] text-white rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border border-[#c9a227]/40 shadow-xl">
        <div className="flex items-center space-x-3">
          <div className="w-14 h-14 bg-white rounded-full p-1 shadow border-2 border-[#c9a227] flex-shrink-0">
            <img src="/logo.png" alt="Logo" className="w-full h-full object-contain rounded-full" />
          </div>
          <div>
            <h1 className="text-xl font-extrabold font-serif">
              Dhanlaxmi Printing Press • Admin Workspace
            </h1>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-xs text-[#dfba47] font-semibold">
                Orders & PostgreSQL Database Dashboard
              </span>
              <span
                className={`inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full ${
                  isDbConnected
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                    : 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                }`}
              >
                <Database className="w-3 h-3" />
                <span>{isDbConnected ? 'Supabase PostgreSQL Linked' : 'Local Storage Engine'}</span>
              </span>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={exportToCsv}
            className="px-3.5 py-2 bg-emerald-700 hover:bg-emerald-600 text-white text-xs font-bold rounded-xl flex items-center gap-1.5 shadow transition-all"
            title="Download records as Excel/CSV"
          >
            <FileSpreadsheet className="w-3.5 h-3.5" />
            <span>Export CSV</span>
          </button>

          <button
            onClick={() => setShowDbModal(true)}
            className="px-3 py-2 bg-white/10 hover:bg-white/20 text-xs font-semibold rounded-xl flex items-center gap-1.5 border border-white/20 text-cyan-300 transition-all"
          >
            <Database className="w-3.5 h-3.5" />
            <span>Database Settings</span>
          </button>

          <button
            onClick={loadData}
            disabled={isLoading}
            className="px-3 py-2 bg-white/10 hover:bg-white/20 text-xs font-semibold rounded-xl flex items-center gap-1.5 border border-white/20 text-slate-200 transition-all"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin' : ''}`} />
            <span>Refresh</span>
          </button>

          <button
            onClick={() => setIsAuthenticated(false)}
            className="px-3 py-2 bg-rose-900/50 hover:bg-rose-900 text-rose-200 text-xs font-semibold rounded-xl border border-rose-800 transition-all"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Interactive Stats Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        <button
          onClick={() => setStatusFilter('all')}
          className={`p-4 rounded-2xl border text-center transition-all ${
            statusFilter === 'all'
              ? 'bg-[#101B36] text-white border-[#c9a227] shadow-lg'
              : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300'
          }`}
        >
          <span className="text-[10px] font-bold uppercase tracking-wider block opacity-70">Total</span>
          <p className="text-2xl font-extrabold mt-1">{enquiries.length}</p>
        </button>

        <button
          onClick={() => setStatusFilter('New')}
          className={`p-4 rounded-2xl border text-center transition-all ${
            statusFilter === 'New'
              ? 'bg-blue-900 text-white border-blue-400 shadow-lg'
              : 'bg-white text-blue-900 border-slate-200 hover:border-blue-300'
          }`}
        >
          <span className="text-[10px] font-bold uppercase tracking-wider block text-blue-600">New Leads</span>
          <p className="text-2xl font-extrabold mt-1 text-blue-950">
            {enquiries.filter((e) => e.status === 'New').length}
          </p>
        </button>

        <button
          onClick={() => setStatusFilter('Contacted')}
          className={`p-4 rounded-2xl border text-center transition-all ${
            statusFilter === 'Contacted'
              ? 'bg-amber-900 text-white border-amber-400 shadow-lg'
              : 'bg-white text-amber-900 border-slate-200 hover:border-amber-300'
          }`}
        >
          <span className="text-[10px] font-bold uppercase tracking-wider block text-amber-600">Contacted</span>
          <p className="text-2xl font-extrabold mt-1 text-amber-950">
            {enquiries.filter((e) => e.status === 'Contacted').length}
          </p>
        </button>

        <button
          onClick={() => setStatusFilter('Quoted')}
          className={`p-4 rounded-2xl border text-center transition-all ${
            statusFilter === 'Quoted'
              ? 'bg-purple-900 text-white border-purple-400 shadow-lg'
              : 'bg-white text-purple-900 border-slate-200 hover:border-purple-300'
          }`}
        >
          <span className="text-[10px] font-bold uppercase tracking-wider block text-purple-600">Quoted</span>
          <p className="text-2xl font-extrabold mt-1 text-purple-950">
            {enquiries.filter((e) => e.status === 'Quoted').length}
          </p>
        </button>

        <button
          onClick={() => setStatusFilter('Approved')}
          className={`p-4 rounded-2xl border text-center transition-all ${
            statusFilter === 'Approved'
              ? 'bg-emerald-900 text-white border-emerald-400 shadow-lg'
              : 'bg-white text-emerald-900 border-slate-200 hover:border-emerald-300'
          }`}
        >
          <span className="text-[10px] font-bold uppercase tracking-wider block text-emerald-600">Approved</span>
          <p className="text-2xl font-extrabold mt-1 text-emerald-950">
            {enquiries.filter((e) => e.status === 'Approved').length}
          </p>
        </button>

        <button
          onClick={() => setStatusFilter('Completed')}
          className={`p-4 rounded-2xl border text-center transition-all ${
            statusFilter === 'Completed'
              ? 'bg-slate-900 text-white border-slate-400 shadow-lg'
              : 'bg-white text-slate-900 border-slate-200 hover:border-slate-300'
          }`}
        >
          <span className="text-[10px] font-bold uppercase tracking-wider block text-slate-600">Completed</span>
          <p className="text-2xl font-extrabold mt-1 text-slate-900">
            {enquiries.filter((e) => e.status === 'Completed').length}
          </p>
        </button>
      </div>

      {/* Interactive Controls Bar */}
      <div className="bg-white p-4 rounded-3xl border border-[#c9a227]/30 shadow-sm flex flex-col md:flex-row justify-between items-stretch md:items-center gap-3">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by customer name, ref ID, phone, service..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 text-xs bg-[#FAF7F0] border border-slate-300 rounded-xl focus:ring-2 focus:ring-[#c9a227] focus:bg-white font-mono"
          />
          {search && (
            <button
              onClick={() => setSearch('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-xs font-bold"
            >
              ×
            </button>
          )}
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <div className="flex items-center gap-1.5 text-xs text-slate-500 font-semibold">
            <ArrowUpDown className="w-3.5 h-3.5 text-[#9e7a17]" />
            <span>Sort:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="px-2.5 py-1.5 text-xs bg-[#FAF7F0] border border-slate-300 rounded-xl focus:ring-2 focus:ring-[#c9a227] font-semibold"
            >
              <option value="date-desc">Newest First</option>
              <option value="date-asc">Oldest First</option>
              <option value="name">Customer Name A-Z</option>
              <option value="status">By Status</option>
            </select>
          </div>

          <span className="text-xs text-slate-400 font-mono">
            Showing {filteredEnquiries.length} of {enquiries.length}
          </span>
        </div>
      </div>

      {/* Enhanced Interactive Enquiries Table */}
      <div className="bg-white rounded-3xl border border-[#c9a227]/30 shadow-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-[#101B36] text-white font-serif">
                <th className="p-3.5 font-bold font-mono text-[11px] text-[#dfba47]">Ref No.</th>
                <th className="p-3.5 font-bold">Date & Time</th>
                <th className="p-3.5 font-bold">Customer Name</th>
                <th className="p-3.5 font-bold">Direct Phone</th>
                <th className="p-3.5 font-bold">Service / Job</th>
                <th className="p-3.5 font-bold">Qty</th>
                <th className="p-3.5 font-bold">Status</th>
                <th className="p-3.5 font-bold text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 text-slate-700">
              {filteredEnquiries.length === 0 ? (
                <tr>
                  <td colSpan={8} className="p-10 text-center text-slate-500 font-light">
                    No matching quotation or inquiry records found.
                  </td>
                </tr>
              ) : (
                filteredEnquiries.map((enq) => (
                  <tr key={enq.id} className="hover:bg-[#FAF7F0] transition-colors">
                    <td className="p-3.5 font-mono font-bold text-[#101B36]">
                      <button
                        onClick={() => setSelectedEnquiry(enq)}
                        className="hover:underline hover:text-[#214E9A]"
                      >
                        {enq.reference_number}
                      </button>
                    </td>
                    <td className="p-3.5 text-slate-500 whitespace-nowrap text-[11px]">
                      {new Date(enq.created_at).toLocaleDateString()}{' '}
                      <span className="text-slate-400">
                        {new Date(enq.created_at).toLocaleTimeString([], {
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </span>
                    </td>
                    <td className="p-3.5 font-bold text-slate-900">{enq.customer_name}</td>
                    <td className="p-3.5 whitespace-nowrap">
                      <a
                        href={generateCallUrl(enq.phone)}
                        className="inline-flex items-center gap-1 font-bold text-[#101B36] hover:text-[#214E9A] bg-[#FAF7F0] px-2 py-0.5 rounded border border-[#c9a227]/30 font-mono"
                        title="Click to Call directly"
                      >
                        <Phone className="w-3 h-3 text-sky-600" />
                        <span>{enq.phone}</span>
                      </a>
                    </td>
                    <td className="p-3.5">
                      <span className="font-semibold text-slate-900 block">{enq.service}</span>
                      <span className="text-[11px] text-slate-500 font-light">{enq.subcategory || ''}</span>
                    </td>
                    <td className="p-3.5 text-slate-600 font-mono">{enq.quantity || 'N/A'}</td>
                    <td className="p-3.5">
                      <select
                        value={enq.status}
                        onChange={(e) =>
                          handleStatusChange(
                            enq.id,
                            enq.reference_number,
                            e.target.value as EnquiryRecord['status']
                          )
                        }
                        className={`text-[11px] font-bold px-2 py-1 rounded-lg border focus:outline-none cursor-pointer ${
                          enq.status === 'New'
                            ? 'bg-blue-50 text-blue-800 border-blue-300'
                            : enq.status === 'Contacted'
                            ? 'bg-amber-50 text-amber-800 border-amber-300'
                            : enq.status === 'Quoted'
                            ? 'bg-purple-50 text-purple-800 border-purple-300'
                            : enq.status === 'Approved'
                            ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                            : enq.status === 'Completed'
                            ? 'bg-slate-100 text-slate-800 border-slate-400'
                            : 'bg-rose-50 text-rose-800 border-rose-300'
                        }`}
                      >
                        <option value="New">● New</option>
                        <option value="Contacted">● Contacted</option>
                        <option value="Quoted">● Quoted</option>
                        <option value="Approved">● Approved</option>
                        <option value="Completed">● Completed</option>
                        <option value="Cancelled">● Cancelled</option>
                      </select>
                    </td>
                    <td className="p-3.5">
                      <div className="flex items-center justify-center space-x-1.5">
                        {/* Direct Call */}
                        <a
                          href={generateCallUrl(enq.phone)}
                          className="p-1.5 bg-[#FAF7F0] hover:bg-blue-100 text-[#101B36] rounded-lg border border-slate-200 transition-colors"
                          title="Call Customer"
                        >
                          <Phone className="w-3.5 h-3.5 text-sky-600" />
                        </a>

                        {/* Direct WhatsApp */}
                        <a
                          href={generateWhatsAppUrl(
                            enq.phone,
                            `Hello ${enq.customer_name}, regards from Dhanlaxmi Printing Press (Vadodara) regarding your enquiry Ref: ${enq.reference_number} for ${enq.service}.`
                          )}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 rounded-lg border border-emerald-200 transition-colors"
                          title="WhatsApp Customer"
                        >
                          <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
                        </a>

                        {/* Printable Job Slip */}
                        <button
                          onClick={() => setPrintSlipEnquiry(enq)}
                          className="p-1.5 bg-amber-50 hover:bg-amber-100 text-amber-800 rounded-lg border border-amber-200 transition-colors"
                          title="Print Job / Quote Slip"
                        >
                          <Printer className="w-3.5 h-3.5" />
                        </button>

                        {/* View Details */}
                        <button
                          onClick={() => setSelectedEnquiry(enq)}
                          className="p-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg transition-colors"
                          title="View Full Details"
                        >
                          <Eye className="w-3.5 h-3.5" />
                        </button>

                        {/* Delete Record */}
                        <button
                          onClick={() => handleDelete(enq.id)}
                          className="p-1.5 bg-rose-50 hover:bg-rose-100 text-rose-700 rounded-lg transition-colors"
                          title="Delete Record"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Supabase Database Settings Modal */}
      {showDbModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl space-y-5 relative border border-[#c9a227]/40 max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setShowDbModal(false)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-700 rounded-full"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-1">
              <div className="flex items-center gap-2 text-[#101B36] font-extrabold text-lg font-serif">
                <Database className="w-5 h-5 text-[#9e7a17]" />
                <span>Supabase PostgreSQL Cloud Configuration</span>
              </div>
              <p className="text-xs text-slate-500 font-light">
                Manage your real-time PostgreSQL database connection parameters.
              </p>
            </div>

            <form onSubmit={handleSaveDbConfig} className="space-y-4 text-xs">
              <div className="space-y-1">
                <label className="font-bold text-slate-800">Supabase Project URL</label>
                <input
                  type="url"
                  value={supabaseUrl}
                  onChange={(e) => setSupabaseUrl(e.target.value)}
                  placeholder="https://your-project.supabase.co"
                  className="w-full px-3.5 py-2.5 bg-[#FAF7F0] border border-slate-300 rounded-xl focus:ring-2 focus:ring-[#c9a227] font-mono text-xs"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-800">Supabase Anon Key (Public Key)</label>
                <input
                  type="text"
                  value={supabaseKey}
                  onChange={(e) => setSupabaseKey(e.target.value)}
                  placeholder="sb_publishable_..."
                  className="w-full px-3.5 py-2.5 bg-[#FAF7F0] border border-slate-300 rounded-xl focus:ring-2 focus:ring-[#c9a227] font-mono text-xs"
                />
              </div>

              <div className="bg-amber-50 p-4 rounded-2xl border border-amber-200 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-[#101B36] text-xs">
                    PostgreSQL Tables Schema SQL
                  </span>
                  <button
                    type="button"
                    onClick={copySqlSchema}
                    className="px-2.5 py-1 bg-white hover:bg-slate-100 text-slate-800 font-bold rounded-lg border border-amber-300 text-[11px] flex items-center gap-1 shadow-sm transition-all"
                  >
                    {copiedSql ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                        <span className="text-emerald-700">Copied SQL!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy SQL for Supabase</span>
                      </>
                    )}
                  </button>
                </div>
                <p className="text-[11px] text-slate-600 font-light leading-relaxed">
                  Run the schema once in your Supabase project's SQL Editor to enable real-time writes into <span className="font-mono font-semibold text-slate-800">enquiries</span> and <span className="font-mono font-semibold text-slate-800">contact_messages</span>.
                </p>
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="submit"
                  className="flex-1 py-3 bg-[#101B36] hover:bg-[#214E9A] text-white font-extrabold rounded-xl shadow transition-all"
                >
                  Save & Connect Supabase
                </button>
                <button
                  type="button"
                  onClick={() => setShowDbModal(false)}
                  className="px-5 py-3 bg-slate-100 text-slate-700 font-semibold rounded-xl"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Printable Job Slip Modal */}
      {printSlipEnquiry && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl space-y-6 relative border border-[#c9a227]/40 max-h-[90vh] overflow-y-auto print:p-0">
            <button
              onClick={() => setPrintSlipEnquiry(null)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-700 rounded-full"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Printable Area */}
            <div className="border-2 border-[#101B36] rounded-2xl p-6 space-y-4 bg-white">
              {/* Slip Header */}
              <div className="text-center pb-4 border-b border-slate-200 space-y-1">
                <div className="w-14 h-14 mx-auto rounded-full p-0.5 border border-[#c9a227] shadow-sm mb-1">
                  <img src="/logo.png" alt="Logo" className="w-full h-full object-contain rounded-full" />
                </div>
                <h2 className="text-base font-extrabold text-[#101B36] uppercase font-serif tracking-wider">
                  DHANLAXMI PRINTING PRESS
                </h2>
                <p className="text-[10px] text-slate-500 font-mono">
                  53, New Heaven Enclave, O/S. Panigate, Vadodara • Phone: +91 98254 50176
                </p>
                <div className="inline-block px-3 py-0.5 rounded-full bg-[#101B36] text-[#dfba47] text-[10px] font-extrabold font-mono uppercase mt-1">
                  JOB ORDER & QUOTATION SLIP
                </div>
              </div>

              {/* Details Grid */}
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div>
                  <span className="text-[10px] text-slate-400 font-bold block">REF NUMBER:</span>
                  <span className="font-mono font-bold text-[#101B36]">{printSlipEnquiry.reference_number}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 font-bold block">DATE:</span>
                  <span className="font-mono text-slate-700">{new Date(printSlipEnquiry.created_at).toLocaleDateString()}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 font-bold block">CUSTOMER NAME:</span>
                  <span className="font-bold text-slate-900">{printSlipEnquiry.customer_name}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 font-bold block">CONTACT NUMBER:</span>
                  <span className="font-mono font-bold text-slate-900">{printSlipEnquiry.phone}</span>
                </div>
                <div className="col-span-2">
                  <span className="text-[10px] text-slate-400 font-bold block">PRINT SERVICE:</span>
                  <span className="font-semibold text-slate-900">{printSlipEnquiry.service} {printSlipEnquiry.subcategory ? `— ${printSlipEnquiry.subcategory}` : ''}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 font-bold block">QUANTITY:</span>
                  <span className="font-bold text-slate-900">{printSlipEnquiry.quantity || 'As specified'}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 font-bold block">CURRENT STATUS:</span>
                  <span className="font-bold text-blue-900">{printSlipEnquiry.status}</span>
                </div>
                {printSlipEnquiry.paper_type && (
                  <div className="col-span-2">
                    <span className="text-[10px] text-slate-400 font-bold block">PAPER & FINISH:</span>
                    <span className="text-slate-800">{printSlipEnquiry.paper_type} {printSlipEnquiry.printing_type ? `(${printSlipEnquiry.printing_type})` : ''}</span>
                  </div>
                )}
                {printSlipEnquiry.requirements && (
                  <div className="col-span-2 bg-[#FAF7F0] p-2.5 rounded-xl border border-slate-200">
                    <span className="text-[10px] text-slate-500 font-bold block uppercase">NOTES / SPECS:</span>
                    <p className="text-slate-700 text-xs mt-0.5 whitespace-pre-wrap font-light">
                      {printSlipEnquiry.requirements}
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Slip Action Buttons */}
            <div className="flex gap-2">
              <button
                onClick={() => window.print()}
                className="flex-1 py-2.5 bg-[#101B36] hover:bg-[#214E9A] text-white font-extrabold rounded-xl text-xs flex items-center justify-center gap-2 shadow"
              >
                <Printer className="w-4 h-4" />
                <span>Print Job Slip</span>
              </button>

              <button
                onClick={() => setPrintSlipEnquiry(null)}
                className="px-5 py-2.5 bg-slate-100 text-slate-700 font-semibold rounded-xl text-xs"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Detail Modal */}
      {selectedEnquiry && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl space-y-6 relative max-h-[90vh] overflow-y-auto border border-[#c9a227]/40">
            <button
              onClick={() => setSelectedEnquiry(null)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-700 rounded-full"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="border-b border-slate-100 pb-3">
              <span className="text-xs font-mono font-bold text-[#101B36] bg-[#FAF7F0] px-2.5 py-1 rounded-md border border-[#c9a227]/30">
                Ref: {selectedEnquiry.reference_number}
              </span>
              <h3 className="text-xl font-extrabold text-[#101B36] mt-2 font-serif">
                {selectedEnquiry.customer_name}
              </h3>
              <p className="text-xs text-slate-500 font-light">
                Created on {new Date(selectedEnquiry.created_at).toLocaleString()}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="bg-[#FAF7F0] p-3 rounded-xl border border-slate-200">
                <span className="font-bold text-slate-500 block">Phone:</span>
                <a
                  href={generateCallUrl(selectedEnquiry.phone)}
                  className="font-bold text-[#101B36] flex items-center gap-1 font-mono mt-0.5"
                >
                  <Phone className="w-3 h-3 text-sky-600" />
                  <span>{selectedEnquiry.phone}</span>
                </a>
              </div>
              <div className="bg-[#FAF7F0] p-3 rounded-xl border border-slate-200">
                <span className="font-bold text-slate-500 block">Email:</span>
                <span className="text-slate-800 truncate block mt-0.5">{selectedEnquiry.email}</span>
              </div>
              <div className="bg-[#FAF7F0] p-3 rounded-xl border border-slate-200">
                <span className="font-bold text-slate-500 block">Service:</span>
                <span className="font-semibold text-slate-900 block mt-0.5">{selectedEnquiry.service}</span>
              </div>
              <div className="bg-[#FAF7F0] p-3 rounded-xl border border-slate-200">
                <span className="font-bold text-slate-500 block">Subcategory:</span>
                <span className="text-slate-800 block mt-0.5">{selectedEnquiry.subcategory || 'N/A'}</span>
              </div>
              <div className="bg-[#FAF7F0] p-3 rounded-xl border border-slate-200">
                <span className="font-bold text-slate-500 block">Quantity:</span>
                <span className="text-slate-800 font-mono block mt-0.5">{selectedEnquiry.quantity || 'N/A'}</span>
              </div>
              <div className="bg-[#FAF7F0] p-3 rounded-xl border border-slate-200">
                <span className="font-bold text-slate-500 block">Paper / Print:</span>
                <span className="text-slate-800 block mt-0.5">{selectedEnquiry.paper_type || 'Standard'}</span>
              </div>
            </div>

            {selectedEnquiry.requirements && (
              <div className="space-y-1 text-xs">
                <span className="font-bold text-slate-900 uppercase">Customer Requirements:</span>
                <p className="p-3 bg-[#FAF7F0] rounded-xl border border-slate-200 text-slate-700 leading-relaxed whitespace-pre-wrap font-light">
                  {selectedEnquiry.requirements}
                </p>
              </div>
            )}

            <div className="pt-3 border-t border-slate-100 flex flex-wrap gap-2">
              <a
                href={generateCallUrl(selectedEnquiry.phone)}
                className="flex-1 py-3 bg-[#101B36] hover:bg-[#214E9A] text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 shadow"
              >
                <Phone className="w-4 h-4 text-sky-400" />
                <span>Call Directly</span>
              </a>

              <a
                href={generateWhatsAppUrl(
                  selectedEnquiry.phone,
                  `Hello ${selectedEnquiry.customer_name}, this is Dhanlaxmi Printing Press following up on Quote Ref: ${selectedEnquiry.reference_number}.`
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 shadow"
              >
                <MessageCircle className="w-4 h-4" />
                <span>WhatsApp Customer</span>
              </a>

              <button
                onClick={() => setPrintSlipEnquiry(selectedEnquiry)}
                className="px-4 py-3 bg-amber-100 hover:bg-amber-200 text-amber-900 rounded-xl text-xs font-bold flex items-center gap-1.5"
              >
                <Printer className="w-4 h-4" />
                <span>Print Slip</span>
              </button>

              <button
                onClick={() => setSelectedEnquiry(null)}
                className="px-4 py-3 bg-slate-200 text-slate-800 rounded-xl text-xs font-semibold"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
