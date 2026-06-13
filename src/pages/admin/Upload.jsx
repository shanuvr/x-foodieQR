import React, { useState, useEffect } from 'react';
import AdminLayout from '../../layouts/AdminLayout';

export default function Upload() {
  const [menuPages, setMenuPages] = useState([]);
  const [saveStatus, setSaveStatus] = useState(''); // 'saving', 'saved', ''
  const [dragActive, setDragActive] = useState(false);

  // Load from local storage
  useEffect(() => {
    const saved = localStorage.getItem('admin_uploaded_menu_cards');
    if (saved) {
      try {
        setMenuPages(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to load menu card images', e);
      }
    }
  }, []);

  // Handle file uploads (Base64 conversion)
  const handleFiles = (filesList) => {
    const files = Array.from(filesList).filter(file => file.type.startsWith('image/'));
    if (files.length === 0) return;

    files.forEach(file => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setMenuPages(prev => [...prev, reader.result]);
      };
      reader.readAsDataURL(file);
    });
  };

  const handleFileInput = (e) => {
    if (e.target.files) {
      handleFiles(e.target.files);
    }
  };

  // Drag-and-drop handlers
  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files);
    }
  };

  // Rotate image 90 degrees clockwise using canvas
  const rotateImage = (index) => {
    const src = menuPages[index];
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');

      // Swap dimensions
      canvas.width = img.height;
      canvas.height = img.width;

      // Draw rotated image
      ctx.translate(canvas.width / 2, canvas.height / 2);
      ctx.rotate((90 * Math.PI) / 180);
      ctx.drawImage(img, -img.width / 2, -img.height / 2);

      const rotatedBase64 = canvas.toDataURL('image/jpeg', 0.85); // Compress slightly to save local storage space
      setMenuPages(prev => prev.map((item, idx) => idx === index ? rotatedBase64 : item));
    };
    img.src = src;
  };

  // Delete page
  const deletePage = (index) => {
    setMenuPages(prev => prev.filter((_, idx) => idx !== index));
  };

  // Move page left in order
  const moveLeft = (index) => {
    if (index === 0) return;
    setMenuPages(prev => {
      const next = [...prev];
      const temp = next[index];
      next[index] = next[index - 1];
      next[index - 1] = temp;
      return next;
    });
  };

  // Move page right in order
  const moveRight = (index) => {
    if (index === menuPages.length - 1) return;
    setMenuPages(prev => {
      const next = [...prev];
      const temp = next[index];
      next[index] = next[index + 1];
      next[index + 1] = temp;
      return next;
    });
  };

  // Save changes
  const handleSave = () => {
    setSaveStatus('saving');
    setTimeout(() => {
      try {
        localStorage.setItem('admin_uploaded_menu_cards', JSON.stringify(menuPages));
        setSaveStatus('saved');
        setTimeout(() => setSaveStatus(''), 2500);
      } catch (e) {
        console.error(e);
        alert("Could not save menu cards. The images might be too large for browser local storage. Try compressing or uploading smaller images.");
        setSaveStatus('');
      }
    }, 800);
  };

  return (
    <AdminLayout>
      <div className="max-w-7xl mx-auto space-y-8 pb-12">
        
        {/* Header Block */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
          <div>
            <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Upload Menu Card</h1>
            <p className="text-slate-500 text-sm mt-1">Skip digital menu item setup. Upload clean images of your physical menu cards instead.</p>
          </div>
          <div className="flex items-center gap-3 w-full sm:w-auto">
            {saveStatus === 'saved' && (
              <span className="text-sm font-semibold text-emerald-600 bg-emerald-50 border border-emerald-100 px-3.5 py-2 rounded-xl flex items-center gap-1.5 animate-fade-in">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg>
                Menu Saved!
              </span>
            )}
            <button
              onClick={handleSave}
              disabled={saveStatus === 'saving' || menuPages.length === 0}
              className="w-full sm:w-auto px-6 py-3 bg-orange-500 hover:bg-orange-600 disabled:bg-slate-100 disabled:text-slate-400 disabled:shadow-none text-white font-bold text-sm rounded-xl transition-all cursor-pointer shadow-lg shadow-orange-500/10 flex items-center justify-center gap-2"
            >
              {saveStatus === 'saving' ? (
                <>
                  <svg className="w-4 h-4 animate-spin text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                  </svg>
                  Saving...
                </>
              ) : 'Save Menu Card'}
            </button>
          </div>
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Main Area: Upload & Previews */}
          <div className="lg:col-span-8 space-y-6">
            
            {menuPages.length === 0 ? (
              // Empty State Dropzone
              <div 
                onDragEnter={handleDrag}
                onDragOver={handleDrag}
                onDragLeave={handleDrag}
                onDrop={handleDrop}
                className={`w-full min-h-[400px] border-2 border-dashed rounded-2xl flex flex-col items-center justify-center text-center p-8 transition-all relative ${
                  dragActive 
                    ? 'border-orange-500 bg-orange-50/10' 
                    : 'border-slate-200 hover:border-orange-400 bg-white'
                }`}
              >
                <div className="w-20 h-20 rounded-full bg-orange-50 border border-orange-100 flex items-center justify-center text-orange-500 mb-4 shadow-sm shadow-orange-500/5">
                  <svg className="w-10 h-10" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM18.75 10.5h.008v.008h-.008V10.5z" />
                  </svg>
                </div>
                <h3 className="font-extrabold text-slate-800 text-lg">Upload your Menu Card Images</h3>
                <p className="text-slate-500 text-sm max-w-sm mt-1 leading-normal">Drag and drop your menu card files here, or click to select them from your computer.</p>
                
                <label className="mt-6 inline-flex items-center gap-2 px-6 py-3 border border-slate-200 hover:border-slate-300 rounded-xl text-xs font-bold text-slate-700 bg-white hover:bg-slate-50 transition-all cursor-pointer shadow-sm select-none">
                  Choose Files
                  <input 
                    type="file" 
                    multiple 
                    accept="image/*" 
                    className="hidden" 
                    onChange={handleFileInput} 
                  />
                </label>
              </div>
            ) : (
              // Active State: Grid of Pages
              <div className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                  {menuPages.map((page, idx) => (
                    <div key={idx} className="bg-white border border-slate-100 rounded-2xl shadow-sm overflow-hidden flex flex-col relative group">
                      
                      {/* Page Counter badge */}
                      <div className="absolute top-3 left-3 px-3 py-1 bg-black/60 backdrop-blur-sm text-white text-[10px] font-black uppercase tracking-wider rounded-lg border border-white/10 z-10">
                        Page {idx + 1}
                      </div>

                      {/* Always Visible Delete Button */}
                      <button
                        type="button"
                        onClick={() => deletePage(idx)}
                        title="Delete page"
                        className="absolute top-3 right-3 p-1.5 bg-black/60 hover:bg-red-500 text-white rounded-lg transition-colors cursor-pointer border border-white/10 shadow-sm z-10"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>

                      {/* Image Preview Container */}
                      <div className="aspect-[3/4] bg-slate-50 relative overflow-hidden flex items-center justify-center border-b border-slate-100">
                        <img 
                          src={page} 
                          alt={`Menu Page ${idx + 1}`} 
                          className="w-full h-full object-contain" 
                        />
                      </div>

                      {/* Bottom Control Bar */}
                      <div className="p-3 bg-slate-50/50 flex items-center justify-between gap-2">
                        {/* Order controls */}
                        <div className="flex gap-1.5">
                          <button
                            type="button"
                            onClick={() => moveLeft(idx)}
                            disabled={idx === 0}
                            title="Move Left"
                            className="p-2 border border-slate-200 bg-white hover:bg-slate-50 disabled:opacity-40 rounded-xl cursor-pointer transition-colors"
                          >
                            <svg className="w-3.5 h-3.5 text-slate-600" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                            </svg>
                          </button>
                          <button
                            type="button"
                            onClick={() => moveRight(idx)}
                            disabled={idx === menuPages.length - 1}
                            title="Move Right"
                            className="p-2 border border-slate-200 bg-white hover:bg-slate-50 disabled:opacity-40 rounded-xl cursor-pointer transition-colors"
                          >
                            <svg className="w-3.5 h-3.5 text-slate-600" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                            </svg>
                          </button>
                        </div>

                        {/* Rotate control */}
                        <button
                          type="button"
                          onClick={() => rotateImage(idx)}
                          title="Rotate 90° Clockwise"
                          className="p-2 border border-slate-200 bg-white hover:bg-slate-50 rounded-xl text-xs font-bold text-slate-700 flex items-center gap-1 cursor-pointer transition-colors"
                        >
                          <svg className="w-3.5 h-3.5 text-slate-600" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
                          </svg>
                          Rotate
                        </button>
                      </div>

                    </div>
                  ))}

                  {/* Add Page Card */}
                  <label className="aspect-[3/4] rounded-2xl border-2 border-dashed border-slate-200 hover:border-orange-500 hover:bg-orange-50/5 flex flex-col items-center justify-center gap-2 cursor-pointer transition-all text-slate-400 hover:text-orange-500">
                    <div className="w-12 h-12 rounded-full bg-slate-50 flex items-center justify-center border border-slate-200 text-slate-400">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                      </svg>
                    </div>
                    <span className="text-xs font-bold uppercase tracking-wider">Add More Pages</span>
                    <input 
                      type="file" 
                      multiple 
                      accept="image/*" 
                      className="hidden" 
                      onChange={handleFileInput} 
                    />
                  </label>
                </div>
              </div>
            )}

          </div>

          {/* Sidebar: Guidelines Card */}
          <div className="lg:col-span-4 bg-white border border-slate-100 rounded-2xl shadow-sm p-6 sm:p-8 space-y-6">
            <h3 className="font-extrabold text-slate-900 text-sm uppercase tracking-wider pb-3 border-b border-slate-100 flex items-center gap-2">
              <svg className="w-5 h-5 text-orange-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              Photo Guidelines
            </h3>
            
            <ul className="space-y-4">
              <li className="flex gap-3 items-start">
                <span className="w-5 h-5 rounded-full bg-orange-50 text-orange-600 border border-orange-100 flex items-center justify-center text-[10px] font-black flex-shrink-0 mt-0.5">1</span>
                <div>
                  <h4 className="font-bold text-slate-800 text-xs uppercase tracking-wide">Flat Angle</h4>
                  <p className="text-slate-500 text-[11px] leading-relaxed mt-0.5 font-medium">Place the menu card flat and photograph directly from above to avoid perspective distortion.</p>
                </div>
              </li>

              <li className="flex gap-3 items-start">
                <span className="w-5 h-5 rounded-full bg-orange-50 text-orange-600 border border-orange-100 flex items-center justify-center text-[10px] font-black flex-shrink-0 mt-0.5">2</span>
                <div>
                  <h4 className="font-bold text-slate-800 text-xs uppercase tracking-wide">Bright Lighting</h4>
                  <p className="text-slate-500 text-[11px] leading-relaxed mt-0.5 font-medium">Ensure even, bright lighting to make sure food items and prices are clearly readable for customers.</p>
                </div>
              </li>

              <li className="flex gap-3 items-start">
                <span className="w-5 h-5 rounded-full bg-orange-50 text-orange-600 border border-orange-100 flex items-center justify-center text-[10px] font-black flex-shrink-0 mt-0.5">3</span>
                <div>
                  <h4 className="font-bold text-slate-800 text-xs uppercase tracking-wide">Correct Alignment</h4>
                  <p className="text-slate-500 text-[11px] leading-relaxed mt-0.5 font-medium">Use the **Rotate** button on the preview card to fix any rotated uploads before saving.</p>
                </div>
              </li>
            </ul>

            <div className="bg-orange-50/50 border border-orange-100 rounded-2xl p-4.5">
              <h4 className="font-extrabold text-orange-950 text-xs uppercase tracking-wider flex items-center gap-1.5">
                <svg className="w-4 h-4 text-orange-600" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Why Use Menu Cards?
              </h4>
              <p className="text-orange-900/80 text-[10px] leading-relaxed mt-2 font-medium">
                Perfect for quick onboarding! If you don't have time to enter menu categories and items individually, your customers can scan the QR code and instantly view your high-quality physical menu card images on their phone.
              </p>
            </div>

          </div>

        </div>

      </div>
    </AdminLayout>
  );
}
