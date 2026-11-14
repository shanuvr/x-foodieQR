import React, { useState } from 'react';
import AdminLayout from '../../layouts/AdminLayout';
import { FaCheck, FaEye, FaTimes, FaExternalLinkAlt } from 'react-icons/fa';

const TEMPLATES = [
  {
    id: 'template-1',
    number: 1,
    name: 'Template 1: Modern Minimalist Bistro',
    route: '/test-template-1',
    image: '/templates/template1-preview.jpg'
  },
  {
    id: 'template-2',
    number: 2,
    name: 'Template 2: Bold Street Gourmet & Grill',
    route: '/test-template-2',
    image: '/templates/template2-preview.jpg'
  },
  {
    id: 'template-3',
    number: 3,
    name: 'Template 3: Sweet Delights & Patisserie',
    route: '/test-template-3',
    image: '/templates/template3-preview.jpg'
  },
  {
    id: 'template-4',
    number: 4,
    name: 'Template 4: Fresh Botanical & Organic Deli',
    route: '/test-template-4',
    image: '/templates/template4-preview.jpg'
  },
  {
    id: 'template-5',
    number: 5,
    name: 'Template 5: Royal Amber Luxury Fine Dining',
    route: '/test-template-5',
    image: '/templates/template5-preview.jpg'
  }
];

export default function Template() {
  const [selectedTemplateId, setSelectedTemplateId] = useState(() => {
    return localStorage.getItem('selected_menu_template') || 'template-1';
  });

  const [previewTemplate, setPreviewTemplate] = useState(null);

  const handleSelect = (tmplId) => {
    setSelectedTemplateId(tmplId);
    localStorage.setItem('selected_menu_template', tmplId);
  };

  return (
    <AdminLayout>
      <div className="max-w-6xl mx-auto space-y-6 pb-12 font-sans text-slate-800">
        
        {/* Header */}
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Menu Templates
          </h1>
          <p className="text-slate-500 text-sm mt-1">
            Select a template for your digital menu.
          </p>
        </div>

        {/* Templates Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {TEMPLATES.map((tmpl) => {
            const isSelected = tmpl.id === selectedTemplateId;

            return (
              <div
                key={tmpl.id}
                onClick={() => handleSelect(tmpl.id)}
                className={`bg-white rounded-2xl border-2 transition-all overflow-hidden flex flex-col cursor-pointer shadow-sm hover:shadow-md ${
                  isSelected
                    ? 'border-orange-500 ring-2 ring-orange-500/20'
                    : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                {/* Photo Preview */}
                <div className="relative aspect-[16/10] bg-slate-100 overflow-hidden group">
                  <img
                    src={tmpl.image}
                    alt={tmpl.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />

                  {/* Selected Tag on Image */}
                  {isSelected && (
                    <div className="absolute top-3 right-3 bg-emerald-500 text-white text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1.5 shadow-md">
                      <FaCheck className="text-[10px]" /> Selected
                    </div>
                  )}

                  {/* Quick Preview Hover Button */}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setPreviewTemplate(tmpl);
                    }}
                    className="absolute bottom-3 right-3 bg-black/70 hover:bg-black text-white text-xs font-semibold px-3 py-1.5 rounded-lg flex items-center gap-1.5 backdrop-blur-sm transition-all"
                  >
                    <FaEye className="text-xs" /> Preview
                  </button>
                </div>

                {/* Card Footer: Name and Select Button */}
                <div className="p-4 flex flex-col gap-3 flex-1 justify-between">
                  <h3 className="text-base font-bold text-slate-900 leading-snug">
                    {tmpl.name}
                  </h3>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleSelect(tmpl.id);
                    }}
                    className={`w-full py-2.5 px-4 rounded-xl text-sm font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-emerald-500 text-white shadow-sm'
                        : 'bg-orange-500 hover:bg-orange-600 text-white shadow-sm'
                    }`}
                  >
                    {isSelected ? (
                      <>
                        <FaCheck /> Selected
                      </>
                    ) : (
                      'Select'
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Simple Preview Modal */}
        {previewTemplate && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fadeIn">
            <div className="bg-white rounded-2xl w-full max-w-4xl h-[85vh] flex flex-col overflow-hidden shadow-2xl">
              <div className="p-4 bg-slate-900 text-white flex items-center justify-between">
                <span className="font-bold text-sm sm:text-base">
                  {previewTemplate.name}
                </span>
                <div className="flex items-center gap-2">
                  {previewTemplate.id !== selectedTemplateId ? (
                    <button
                      onClick={() => {
                        handleSelect(previewTemplate.id);
                        setPreviewTemplate(null);
                      }}
                      className="px-3.5 py-1.5 bg-orange-500 hover:bg-orange-600 text-white rounded-lg text-xs font-bold transition-all flex items-center gap-1"
                    >
                      <FaCheck /> Select
                    </button>
                  ) : (
                    <span className="px-3 py-1 bg-emerald-500/20 text-emerald-400 rounded-lg text-xs font-bold border border-emerald-500/30 flex items-center gap-1">
                      <FaCheck /> Selected
                    </span>
                  )}
                  <a
                    href={previewTemplate.route}
                    target="_blank"
                    rel="noreferrer"
                    className="p-1.5 text-slate-400 hover:text-white transition-colors"
                    title="Open in new tab"
                  >
                    <FaExternalLinkAlt className="text-xs" />
                  </a>
                  <button
                    onClick={() => setPreviewTemplate(null)}
                    className="p-1.5 text-slate-400 hover:text-white transition-colors"
                    title="Close"
                  >
                    <FaTimes className="text-base" />
                  </button>
                </div>
              </div>
              <div className="flex-1 bg-slate-100 flex items-center justify-center p-2 sm:p-4">
                <div className="w-[390px] max-w-full h-full bg-white rounded-2xl shadow-lg overflow-hidden border border-slate-300">
                  <iframe
                    src={previewTemplate.route}
                    title={previewTemplate.name}
                    className="w-full h-full border-0"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </AdminLayout>
  );
}
