import React, { useState, useEffect, useRef } from 'react';
import AdminLayout from '../../layouts/AdminLayout';
import { QRCodeCanvas } from 'qrcode.react';


const templates = [
  { id: 'tent-card', name: 'Classic Tent Card', description: 'Tall vertical stand with border, best for table top acrylic holders.' },
  { id: 'coaster', name: 'Wooden Coaster', description: 'Minimalist circular style, perfect for coasters or table stickers.' },
  { id: 'minimal', name: 'Minimal QR Only', description: 'Raw QR code with standard table label below, clean and simple.' }
];

export default function QrCentre() {
  const [profile, setProfile] = useState({
    kitchenName: 'Gourmet Central Kitchen',
    logo: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23f97316'><path d='M11 9H9V2H7v7H5V2H3v7c0 2.12 1.66 3.84 3.75 3.97V22h2.5v-9.03C11.34 12.84 13 11.12 13 9V2h-2v7zm5-3V2h-2v4c0 2.93 2.02 5.37 5 5.89V22h2.5V2c-3 0-5.5 2.5-5.5 4z'/></svg>",
    id: 'gourmet-central'
  });

  // Customizer States
  const [qrType, setQrType] = useState('table'); // 'menu' or 'table'
  const tableMode = 'single';
  const [singleTable, setSingleTable] = useState('1');
  const fgColor = '#000000';
  const includeLogo = false;
  const [selectedTemplate, setSelectedTemplate] = useState('tent-card');
  const [qrSize, setQrSize] = useState(180);
  const [customInstructions, setCustomInstructions] = useState('Scan to View Menu & Order');

  const currentPreviewIdx = 0;

  // Load profile data
  useEffect(() => {
    const saved = localStorage.getItem('admin_profile_data');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setProfile({
          kitchenName: parsed.kitchenName || 'Gourmet Central Kitchen',
          logo: parsed.logo || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=150',
          id: parsed.kitchenName ? parsed.kitchenName.toLowerCase().replace(/\s+/g, '-') : 'gourmet-central'
        });
      } catch (e) {
        console.error('Failed to load profile for QR', e);
      }
    }
  }, []);

  // Compute public menu base URL
  const baseMenuUrl = `${window.location.origin}/restaurant/${profile.id}`;

  // Helper to generate URLs for QR
  const getQrData = (tableNum) => {
    if (qrType === 'menu') {
      return baseMenuUrl;
    }
    return `${baseMenuUrl}?table=${tableNum}`;
  };

  // Compile list of tables based on configuration
  const getTablesList = () => {
    if (qrType === 'menu') return ['Menu'];
    return [singleTable];
  };

  const tables = getTablesList();

  // Handle single download
  const downloadSingleQR = (tableVal) => {
    const canvasId = `qr-canvas-${tableVal}`;
    const canvas = document.getElementById(canvasId);
    if (!canvas) {
      alert('Could not find the QR Code preview canvas.');
      return;
    }

    try {
      const url = canvas.toDataURL('image/png');
      const a = document.createElement('a');
      a.href = url;
      a.download = `QR-${profile.id}-${qrType === 'menu' ? 'menu' : `Table-${tableVal}`}.png`;
      a.click();
    } catch (err) {
      console.error('Canvas download failed', err);
      alert('Unable to download QR code. If you have a custom logo overlay active, try disabling "Overlay Logo" and downloading again.');
    }
  };

  // Trigger browser print
  const handlePrint = () => {
    window.print();
  };

  return (
    <AdminLayout>
      <div className="max-w-7xl mx-auto space-y-8 pb-12">
        
        {/* Header Block */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
          <div>
            <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">QR Code Centre</h1>
            <p className="text-slate-500 text-sm mt-1">Generate, customize, and print high-quality QR codes for your tables or marketing materials.</p>
          </div>
          {/* <button
            onClick={handlePrint}
            className="w-full sm:w-auto px-6 py-3 bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm rounded-xl transition-all shadow-lg flex items-center justify-center gap-2 cursor-pointer"
          >
            <svg className="w-4.5 h-4.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6.72 13.82l-.24.1c-1.2.5-2.58.75-3.96.75H2.25v-9h.27c1.38 0 2.76.25 3.96.75l.24.1c1.2.5 2.58.75 3.96.75h3.18c1.38 0 2.76-.25 3.96-.75l.24-.1c1.2-.5 2.58-.75 3.96-.75h.27v9h-.27c-1.38 0-2.76.25-3.96.75l-.24.1c-1.2.5-2.58.75-3.96.75H10.5c-1.38 0-2.76-.25-3.96-.75zM12 5.625v12.75" />
            </svg>
            Print QR Card
          </button> */}
        </div>

        {/* Customizer + Preview Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left: Customizer Panel */}
          <div className="lg:col-span-5 bg-white border border-slate-100 rounded-2xl shadow-sm overflow-hidden p-6 sm:p-8 space-y-6">
            
            {/* 1. Target URL Type */}
            <div className="space-y-3">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest">1. Link Target</h3>
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => setQrType('menu')}
                  className={`px-4 py-3 text-xs font-bold rounded-xl border flex flex-col items-center gap-1.5 transition-all cursor-pointer ${
                    qrType === 'menu'
                      ? 'bg-orange-50 border-orange-200 text-orange-600 shadow-sm shadow-orange-500/5'
                      : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  General Menu QR
                </button>
                <button
                  onClick={() => setQrType('table')}
                  className={`px-4 py-3 text-xs font-bold rounded-xl border flex flex-col items-center gap-1.5 transition-all cursor-pointer ${
                    qrType === 'table'
                      ? 'bg-orange-50 border-orange-200 text-orange-600 shadow-sm shadow-orange-500/5'
                      : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25A2.25 2.25 0 0113.5 8.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />
                  </svg>
                  Table QRs
                </button>
              </div>
            </div>

            {/* 2. Table Configurations */}
            {qrType === 'table' && (
              <div className="space-y-4 pt-4 border-t border-slate-100 animate-fade-in">
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest">2. Table Configuration</h3>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Table Number</label>
                  <input
                    type="text"
                    value={singleTable}
                    onChange={(e) => setSingleTable(e.target.value.replace(/[^a-zA-Z0-9-]/g, ''))}
                    className="w-full bg-white border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm text-slate-800 font-medium focus:outline-none focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 transition-all"
                    placeholder="e.g. 5 or T-12"
                  />
                </div>
              </div>
            )}

            {/* 3. Customizer Details */}
            <div className="space-y-4 pt-4 border-t border-slate-100">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest text-slate-400">3. Customise Styles</h3>
              



              {/* Custom Instructions Text */}
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Frame Instructions</label>
                <input
                  type="text"
                  value={customInstructions}
                  onChange={(e) => setCustomInstructions(e.target.value)}
                  className="w-full bg-white border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm text-slate-800 font-medium focus:outline-none focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 transition-all"
                  placeholder="e.g. Scan to view menu"
                />
              </div>
            </div>

            {/* 4. Printing Stand templates */}
            <div className="space-y-4 pt-4 border-t border-slate-100">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest">4. Stand Template</h3>
              
              <div className="space-y-2.5">
                {templates.map((temp) => (
                  <button
                    key={temp.id}
                    onClick={() => setSelectedTemplate(temp.id)}
                    className={`w-full text-left p-3.5 rounded-xl border transition-all flex flex-col gap-1 cursor-pointer hover:bg-slate-50/50 ${
                      selectedTemplate === temp.id
                        ? 'bg-orange-50 border-orange-200 text-orange-900 shadow-sm shadow-orange-500/5'
                        : 'bg-white border-slate-100 text-slate-700'
                    }`}
                  >
                    <span className="text-xs font-bold uppercase tracking-wide">{temp.name}</span>
                    <span className="text-slate-500 text-[10px] leading-relaxed">{temp.description}</span>
                  </button>
                ))}
              </div>
            </div>

          </div>

          {/* Right: Live Preview */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Live Card Container */}
            <div className="bg-slate-50 border border-slate-100 p-8 rounded-2xl flex flex-col items-center justify-center min-h-[450px] shadow-inner relative overflow-hidden">
              


              {/* Template Card Designs */}
              <div className="w-full flex items-center justify-center pt-6">
                
                {/* 1. Classic Tent Card */}
                {selectedTemplate === 'tent-card' && (
                  <div className="w-[280px] bg-white border border-slate-200 rounded-2xl p-6 flex flex-col items-center text-center shadow-lg shadow-slate-100">
                    <div className="flex items-center gap-2 mb-4">
                      {profile.logo && <img src={profile.logo} alt="logo" className="w-6 h-6 rounded-full object-cover border border-slate-100" />}
                      <span className="text-[10px] font-black uppercase text-slate-800 tracking-wider truncate max-w-[150px]">{profile.kitchenName}</span>
                    </div>
                    
                    <div className="w-full border-t border-dashed border-slate-100 my-1 pt-4">
                      <h4 className="text-xs font-black tracking-widest text-slate-800 uppercase">SCAN QR CODE</h4>
                      <p className="text-[9px] text-slate-400 font-bold uppercase tracking-wider mt-1">{customInstructions}</p>
                    </div>

                    <div className="my-5 p-3.5 border border-slate-100 rounded-xl shadow-inner bg-slate-50">
                      <QRCodeCanvas
                        id={`qr-canvas-${tables[currentPreviewIdx] || 'default'}`}
                        value={getQrData(tables[currentPreviewIdx])}
                        size={qrSize}
                        fgColor={fgColor}
                        includeMargin={true}
                        level="H"
                        imageSettings={includeLogo && profile.logo ? {
                          src: profile.logo,
                          x: undefined,
                          y: undefined,
                          height: 28,
                          width: 28,
                          excavate: true
                        } : undefined}
                      />
                    </div>

                    {qrType === 'table' && (
                      <div className="bg-orange-50 border border-orange-100 text-orange-600 font-extrabold text-sm tracking-widest px-4 py-2 rounded-xl mt-1 uppercase shadow-sm shadow-orange-500/5">
                        Table {tables[currentPreviewIdx]}
                      </div>
                    )}
                  </div>
                )}



                {/* 3. Wooden Coaster */}
                {selectedTemplate === 'coaster' && (
                  <div className="w-[260px] h-[260px] rounded-full border border-amber-900/10 bg-amber-50/20 p-6 flex flex-col items-center justify-center text-center shadow-lg relative overflow-hidden">
                    <div className="absolute inset-4 rounded-full border-2 border-dashed border-amber-800/10 pointer-events-none" />
                    
                    {qrType === 'table' && (
                      <div className="text-[11px] font-black text-amber-800 tracking-widest mb-1.5 uppercase">
                        Table {tables[currentPreviewIdx]}
                      </div>
                    )}
                    
                    <div className="p-3 bg-white border border-amber-900/10 rounded-2xl shadow-md z-10">
                      <QRCodeCanvas
                        id={`qr-canvas-${tables[currentPreviewIdx] || 'default'}`}
                        value={getQrData(tables[currentPreviewIdx])}
                        size={120}
                        fgColor={fgColor}
                        includeMargin={true}
                        level="H"
                        imageSettings={includeLogo && profile.logo ? {
                          src: profile.logo,
                          x: undefined,
                          y: undefined,
                          height: 22,
                          width: 22,
                          excavate: true
                        } : undefined}
                      />
                    </div>

                    <p className="text-[9px] text-amber-800 font-black tracking-wider uppercase mt-2.5 z-10">{customInstructions}</p>
                  </div>
                )}

                {/* 4. Minimal Stand */}
                {selectedTemplate === 'minimal' && (
                  <div className="flex flex-col items-center bg-white p-6 border border-slate-100 rounded-2xl shadow-sm">
                    <QRCodeCanvas
                      id={`qr-canvas-${tables[currentPreviewIdx] || 'default'}`}
                      value={getQrData(tables[currentPreviewIdx])}
                      size={qrSize}
                      fgColor={fgColor}
                      includeMargin={true}
                      level="H"
                      imageSettings={includeLogo && profile.logo ? {
                        src: profile.logo,
                        x: undefined,
                        y: undefined,
                        height: 28,
                        width: 28,
                        excavate: true
                      } : undefined}
                    />
                    <div className="mt-3 text-center">
                      <p className="text-xs font-bold text-slate-800 tracking-wide uppercase">{profile.kitchenName}</p>
                      {qrType === 'table' && (
                        <p className="text-[10px] font-bold text-slate-400 mt-0.5">TABLE {tables[currentPreviewIdx]}</p>
                      )}
                    </div>
                  </div>
                )}

              </div>
            </div>

            {/* Export and download actions */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => downloadSingleQR(tables[currentPreviewIdx])}
                className="w-full px-5 py-3.5 border border-slate-200 hover:border-slate-300 text-slate-700 bg-white font-bold text-sm rounded-xl cursor-pointer transition-all flex items-center justify-center gap-2"
              >
                <svg className="w-4.5 h-4.5 text-slate-500" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
                </svg>
                Download PNG
              </button>
              
              {/* <button
                onClick={handlePrint}
                className="w-full sm:w-1/2 px-5 py-3.5 bg-orange-500 hover:bg-orange-600 text-white font-bold text-sm rounded-xl cursor-pointer transition-all shadow-lg shadow-orange-500/10 flex items-center justify-center gap-2"
              >
                <svg className="w-4.5 h-4.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6.72 13.82l-.24.1c-1.2.5-2.58.75-3.96.75H2.25v-9h.27c1.38 0 2.76.25 3.96.75l.24.1c1.2.5 2.58.75 3.96.75h3.18c1.38 0 2.76-.25 3.96-.75l.24-.1c1.2-.5 2.58-.75 3.96-.75h.27v9h-.27c-1.38 0-2.76.25-3.96.75l-.24.1c-1.2.5-2.58.75-3.96.75H10.5c-1.38 0-2.76-.25-3.96-.75zM12 5.625v12.75" />
                </svg>
                Print QR Code
              </button> */}
            </div>

          </div>
        </div>
      </div>

      {/* Hidden Print Section: Designed strictly for window.print() */}
      <div id="print-section" className="hidden">
        <style dangerouslySetInnerHTML={{ __html: `
          @media print {
            body * {
              visibility: hidden !important;
            }
            html, body {
              background: #fff !important;
              color: #000 !important;
            }
            #print-section, #print-section * {
              visibility: visible !important;
            }
            #print-section {
              position: absolute;
              left: 0;
              top: 0;
              width: 100%;
              display: grid !important;
              grid-template-columns: repeat(2, 1fr) !important;
              gap: 20px !important;
              padding: 10px !important;
            }
            .print-card {
              page-break-inside: avoid;
              border: 1px solid #e2e8f0 !important;
              background-color: #ffffff !important;
              border-radius: 12px !important;
              padding: 24px !important;
              display: flex !important;
              flex-direction: column !important;
              align-items: center !important;
              text-align: center !important;
              width: 280px !important;
              margin: 0 auto 20px auto !important;
              box-shadow: none !important;
            }
            .print-card.dark-theme {
              background-color: #090d16 !important;
              color: #ffffff !important;
              border-color: #1e293b !important;
            }
            .print-card.coaster-theme {
              border-radius: 50% !important;
              width: 260px !important;
              height: 260px !important;
              justify-content: center !important;
            }
            .print-card canvas {
              display: block !important;
            }
          }
        `}} />
        {tables.map((tableVal) => (
          <div key={tableVal} className="flex justify-center">
            {/* Renders styled printable cards based on template */}
            {selectedTemplate === 'tent-card' && (
              <div className="print-card">
                <div className="flex items-center gap-2 mb-3">
                  {profile.logo && <img src={profile.logo} alt="logo" className="w-5 h-5 rounded-full object-cover" />}
                  <span className="text-[10px] font-black uppercase text-slate-800 tracking-wider truncate max-w-[150px]">{profile.kitchenName}</span>
                </div>
                <div className="w-full border-t border-dashed border-slate-200 my-1 pt-3">
                  <h4 className="text-[11px] font-black tracking-widest text-slate-800 uppercase">SCAN QR CODE</h4>
                  <p className="text-[8px] text-slate-400 font-bold uppercase tracking-wider mt-0.5">{customInstructions}</p>
                </div>
                <div className="my-3.5 p-2 border border-slate-100 rounded-lg">
                  <QRCodeCanvas
                    value={getQrData(tableVal)}
                    size={150}
                    fgColor={fgColor}
                    includeMargin={true}
                    level="H"
                    imageSettings={includeLogo && profile.logo ? {
                      src: profile.logo,
                      x: undefined,
                      y: undefined,
                      height: 24,
                      width: 24,
                      excavate: true
                    } : undefined}
                  />
                </div>
                {qrType === 'table' && (
                  <div className="bg-orange-50 border border-orange-100 text-orange-600 font-extrabold text-[12px] px-3.5 py-1.5 rounded-lg mt-0.5 uppercase">
                    Table {tableVal}
                  </div>
                )}
              </div>
            )}



            {selectedTemplate === 'coaster' && (
              <div className="print-card coaster-theme">
                {qrType === 'table' && (
                  <div className="text-[9px] font-black text-amber-800 tracking-widest mb-1.5 uppercase">
                    Table {tableVal}
                  </div>
                )}
                <div className="p-2 bg-white border border-amber-900/10 rounded-xl">
                  <QRCodeCanvas
                    value={getQrData(tableVal)}
                    size={100}
                    fgColor={fgColor}
                    includeMargin={true}
                    level="H"
                    imageSettings={includeLogo && profile.logo ? {
                      src: profile.logo,
                      x: undefined,
                      y: undefined,
                      height: 20,
                      width: 20,
                      excavate: true
                    } : undefined}
                  />
                </div>
                <p className="text-[8px] text-amber-800 font-black tracking-wider uppercase mt-2">{customInstructions}</p>
              </div>
            )}

            {selectedTemplate === 'minimal' && (
              <div className="print-card" style={{ padding: '16px !important' }}>
                <QRCodeCanvas
                  value={getQrData(tableVal)}
                  size={150}
                  fgColor={fgColor}
                  includeMargin={true}
                  level="H"
                  imageSettings={includeLogo && profile.logo ? {
                    src: profile.logo,
                    x: undefined,
                    y: undefined,
                    height: 24,
                    width: 24,
                    excavate: true
                  } : undefined}
                />
                <div className="mt-2 text-center">
                  <p className="text-[10px] font-bold text-slate-800 tracking-wide uppercase">{profile.kitchenName}</p>
                  {qrType === 'table' && (
                    <p className="text-[8px] font-bold text-slate-400 mt-0.5">TABLE {tableVal}</p>
                  )}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

    </AdminLayout>
  );
}
