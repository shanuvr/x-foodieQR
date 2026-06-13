import React, { useState, useEffect } from 'react';
import SuperAdminLayout from '../../layouts/SuperAdminLayout';

const PRESET_IMAGES = [
  { name: 'Restaurant', url: '/outlet_restaurant.png', emoji: '🍽️' },
  { name: 'Bakery', url: '/outlet_bakery.png', emoji: '🥐' },
  { name: 'Resto Bar', url: '/outlet_restobar.png', emoji: '🍸' },
  { name: 'Beer Parlour', url: '/outlet_beerparlour.png', emoji: '🍺' },
  { name: 'Chayakada', url: '/outlet_chayakada.png', emoji: '☕' },
  { name: 'Street Food', url: '/outlet_streetfood.png', emoji: '🌮' },
  { name: 'Homely Meals', url: '/outlet_homelymeal.png', emoji: '🍱' },
];

export default function SuperAdminOutletTypes() {
  const [types, setTypes] = useState([]);
  const [name, setName] = useState('');
  const [desc, setDesc] = useState('');
  const [image, setImage] = useState('');
  const [editId, setEditId] = useState(null);

  // Load from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('super_admin_outlet_types');
    if (saved) {
      setTypes(JSON.parse(saved));
    } else {
      const seedTypes = [
        { id: '1', name: 'Fine Dining', desc: 'Premium sit-down service with formal ambience and multi-course menus.', image: '/outlet_restaurant.png', active: true },
        { id: '2', name: 'Cafe / Bakery', desc: 'Casual environment offering coffee, tea, pastries, and light bites.', image: '/outlet_bakery.png', active: true },
        { id: '3', name: 'Quick Service (QSR)', desc: 'Fast food outlets emphasizing speed of service and takeout orders.', image: '/outlet_streetfood.png', active: true },
        { id: '4', name: 'Bar & Lounge', desc: 'Licensed premises specializing in alcoholic beverages alongside finger foods.', image: '/outlet_restobar.png', active: true },
        { id: '5', name: 'Dessert Parlor', desc: 'Specialty sweet outlets focusing on ice creams, waffles, and cakes.', image: '/outlet_bakery.png', active: false },
      ];
      localStorage.setItem('super_admin_outlet_types', JSON.stringify(seedTypes));
      setTypes(seedTypes);
    }
  }, []);

  const saveToStorage = (updated) => {
    localStorage.setItem('super_admin_outlet_types', JSON.stringify(updated));
    setTypes(updated);
  };

  const handleAddOrEdit = (e) => {
    e.preventDefault();
    if (!name.trim()) return;

    if (editId) {
      // Edit
      const updated = types.map(t => t.id === editId ? { ...t, name, desc, image } : t);
      saveToStorage(updated);
      setEditId(null);
    } else {
      // Add
      const newType = {
        id: String(Date.now()),
        name,
        desc,
        image,
        active: true
      };
      const updated = [...types, newType];
      saveToStorage(updated);
    }

    setName('');
    setDesc('');
    setImage('');
  };

  const handleToggleActive = (id) => {
    const updated = types.map(t => t.id === id ? { ...t, active: !t.active } : t);
    saveToStorage(updated);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this outlet type? Existing restaurants mapped to this category may need re-assignment.")) {
      const updated = types.filter(t => t.id !== id);
      saveToStorage(updated);
    }
  };

  const handleStartEdit = (item) => {
    setEditId(item.id);
    setName(item.name);
    setDesc(item.desc);
    setImage(item.image || '');
  };

  return (
    <SuperAdminLayout>
      <div className="space-y-6 pb-12 text-left">
        
        {/* Title */}
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Outlet Categories</h1>
          <p className="text-slate-500 text-sm mt-1">Configure operational classifications available to partners during the wizard onboarding process.</p>
        </div>

        {/* Form and Table Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Form Panel */}
          <div className="bg-white border border-slate-100 p-6 rounded-2xl shadow-sm h-fit space-y-4">
            <div>
              <h3 className="font-bold text-slate-900 text-base">{editId ? 'Modify Category' : 'Create New Category'}</h3>
              <p className="text-xs text-slate-400 font-semibold mt-0.5">Define category names, descriptions, and pictures displayed to outlet owners.</p>
            </div>

            <form onSubmit={handleAddOrEdit} className="space-y-4">
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-500 uppercase">Category Name</label>
                <input
                  type="text"
                  placeholder="e.g. Buffet Restaurant"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200/80 rounded-xl px-3.5 py-2.5 text-xs font-semibold text-slate-700 placeholder-slate-400 focus:outline-none focus:border-orange-500 focus:bg-white focus:ring-4 focus:ring-orange-500/5 transition-all"
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-500 uppercase">Description / Scope</label>
                <textarea
                  placeholder="Summarize the menu structure and style..."
                  value={desc}
                  onChange={(e) => setDesc(e.target.value)}
                  rows="3"
                  className="w-full bg-slate-50 border border-slate-200/80 rounded-xl px-3.5 py-2.5 text-xs font-semibold text-slate-700 placeholder-slate-400 focus:outline-none focus:border-orange-500 focus:bg-white focus:ring-4 focus:ring-orange-500/5 transition-all resize-none"
                />
              </div>

              {/* Photo Selector / File Uploader */}
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-slate-500 uppercase block">Category Photo / Picture</label>
                
                {/* Preview block */}
                <div className="relative h-36 w-full rounded-xl bg-slate-50 border border-slate-200 overflow-hidden flex items-center justify-center group/img">
                  {image ? (
                    <>
                      <img src={image} alt="Preview" className="w-full h-full object-cover" />
                      <button
                        type="button"
                        onClick={() => setImage('')}
                        className="absolute top-2 right-2 p-1.5 bg-black/60 hover:bg-black/80 text-white rounded-full transition-colors cursor-pointer"
                        title="Remove Image"
                      >
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </>
                  ) : (
                    <div className="text-center space-y-1 text-slate-400">
                      <svg className="w-8 h-8 mx-auto stroke-current" fill="none" strokeWidth="1.5" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375 0 11-.75 0 .375 0 01.75 0z" />
                      </svg>
                      <span className="text-[10px] font-semibold block">No photo selected</span>
                    </div>
                  )}
                </div>

                {/* Presets List */}
                <div className="space-y-1">
                  <span className="text-[9px] font-bold text-slate-400 uppercase block">Choose Preset Picture</span>
                  <div className="flex gap-1.5 overflow-x-auto pb-1 scrollbar-none">
                    {PRESET_IMAGES.map((img) => (
                      <button
                        key={img.url}
                        type="button"
                        onClick={() => setImage(img.url)}
                        className={`flex-shrink-0 w-12 h-12 rounded-lg border-2 overflow-hidden transition-all relative group cursor-pointer ${
                          image === img.url ? 'border-orange-500 ring-2 ring-orange-500/10' : 'border-slate-200 hover:border-slate-300'
                        }`}
                        title={img.name}
                      >
                        <img src={img.url} alt={img.name} className="w-full h-full object-cover" />
                        <span className="absolute inset-0 bg-black/40 flex items-center justify-center text-[10px] opacity-80 group-hover:opacity-100">{img.emoji}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Upload or URL Paste */}
                <div className="grid grid-cols-2 gap-2 pt-1">
                  <div>
                    <label className="flex items-center justify-center gap-1.5 px-3 py-2 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-xl cursor-pointer transition-colors text-[10px] font-bold text-slate-600">
                      <svg className="w-3.5 h-3.5 text-slate-400" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
                      </svg>
                      Upload File
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            const reader = new FileReader();
                            reader.onloadend = () => {
                              setImage(reader.result);
                            };
                            reader.readAsDataURL(file);
                          }
                        }}
                        className="hidden"
                      />
                    </label>
                  </div>
                  <div>
                    <input
                      type="text"
                      placeholder="Paste Image URL..."
                      value={typeof image === 'string' && image.startsWith('data:') ? '' : image}
                      onChange={(e) => setImage(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-2.5 py-2 text-[10px] font-bold text-slate-700 placeholder-slate-400 focus:outline-none focus:border-orange-500 focus:bg-white transition-all"
                    />
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2 pt-2">
                {editId && (
                  <button
                    type="button"
                    onClick={() => {
                      setEditId(null);
                      setName('');
                      setDesc('');
                      setImage('');
                    }}
                    className="w-1/2 py-2.5 border border-slate-200 hover:bg-slate-50 text-slate-600 font-bold text-xs rounded-xl transition-all cursor-pointer text-center"
                  >
                    Cancel
                  </button>
                )}
                <button
                  type="submit"
                  className={`py-2.5 bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs rounded-xl transition-all cursor-pointer shadow-lg shadow-orange-500/10 ${
                    editId ? 'w-1/2' : 'w-full'
                  }`}
                >
                  {editId ? 'Save Category' : 'Create Category'}
                </button>
              </div>
            </form>
          </div>

          {/* Table List Panel */}
          <div className="lg:col-span-2 bg-white border border-slate-100 rounded-2xl shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-100 bg-slate-50/50 text-[10px] font-bold text-slate-400 uppercase tracking-wider select-none">
                    <th className="py-4 px-6">Classification</th>
                    <th className="py-4 px-4 hidden md:table-cell">Description</th>
                    <th className="py-4 px-4">Status</th>
                    <th className="py-4 px-6 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50 text-xs text-slate-700">
                  {types.map((item) => (
                    <tr key={item.id} className="hover:bg-slate-50/30 transition-colors">
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl border border-slate-100 overflow-hidden bg-slate-50 flex-shrink-0 flex items-center justify-center">
                            {item.image ? (
                              <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                            ) : (
                              <span className="text-base">🍽️</span>
                            )}
                          </div>
                          <div>
                            <span className="font-bold text-slate-800 block">{item.name}</span>
                            <span className="text-[10px] text-slate-400 font-medium md:hidden block mt-0.5 max-w-xs line-clamp-1">{item.desc}</span>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-4 text-slate-500 leading-normal max-w-xs hidden md:table-cell">{item.desc}</td>
                      <td className="py-4 px-4">
                        <button
                          onClick={() => handleToggleActive(item.id)}
                          className={`inline-flex items-center text-[10px] font-bold px-2.5 py-0.5 rounded-full border transition-colors cursor-pointer ${
                            item.active
                              ? 'bg-green-50 text-green-700 border-green-100 hover:bg-green-100'
                              : 'bg-slate-50 text-slate-500 border-slate-200 hover:bg-slate-100'
                          }`}
                        >
                          {item.active ? 'Active' : 'Disabled'}
                        </button>
                      </td>
                      <td className="py-4 px-6 text-right space-x-2 whitespace-nowrap">
                        <button
                          onClick={() => handleStartEdit(item)}
                          className="px-2 py-1.5 border border-slate-200 hover:bg-slate-50 text-slate-600 rounded-lg font-bold text-[10px] transition-colors cursor-pointer"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(item.id)}
                          className="px-2 py-1.5 bg-rose-50 hover:bg-rose-100 border border-rose-100 hover:border-rose-200 text-rose-600 rounded-lg font-bold text-[10px] transition-colors cursor-pointer"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                  {types.length === 0 && (
                    <tr>
                      <td colSpan="4" className="py-12 text-center text-slate-400 italic">
                        No categories defined. Create one using the form.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

        </div>

      </div>
    </SuperAdminLayout>
  );
}
