import React, { useState } from 'react';
import AdminLayout from '../../layouts/AdminLayout';

export default function AddMenu() {
  const [imagePreview, setImagePreview] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);

  const openEditModal = (item) => {
    setSelectedItem(item);
    setIsEditModalOpen(true);
  };

  const openDeleteModal = (item) => {
    setItemToDelete(item);
    setIsDeleteModalOpen(true);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const dummyMenuItems = [
    {
      id: 1,
      itemName: 'Grilled Salmon',
      category: 'Main Course',
      price: '24.99',
      type: 'Non-Veg',
      availability: 'Available',
      img: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?q=80&w=150&auto=format&fit=crop'
    },
    {
      id: 2,
      itemName: 'Margarita Pizza',
      category: 'Main Course',
      price: '14.99',
      type: 'Veg',
      availability: 'Available',
      img: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?q=80&w=150&auto=format&fit=crop'
    },
    {
      id: 3,
      itemName: 'Spicy Tacos',
      category: 'Starters',
      price: '12.50',
      type: 'Non-Veg',
      availability: 'Out of Stock',
      img: 'https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?q=80&w=150&auto=format&fit=crop'
    }
  ];

  const inputClass = "w-full px-3 py-1.5 sm:py-2 bg-slate-50 border border-slate-200 rounded-xl text-[12px] sm:text-[13px] text-slate-800 placeholder-slate-400 font-medium focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-400 transition-all";
  const labelClass = "text-[11px] sm:text-[12px] font-bold text-slate-600 uppercase tracking-widest";

  return (
    <AdminLayout>
      <div className="max-w-7xl mx-auto flex flex-col gap-5">
        
        {/* Header */}
        <div>
          <h1 className="text-xl font-extrabold text-slate-900 tracking-tight">Add New Menu Item</h1>
          <p className="text-xs text-slate-500 mt-1">Fill out the details below to add a new delicious item to your menu.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Left Column: Form */}
          <div className="lg:col-span-5 xl:col-span-4 flex flex-col gap-5">
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
              <form className="p-3 sm:p-5 flex flex-col gap-4 sm:gap-5">
                
                <div className="flex flex-col gap-3 sm:gap-4">
                  
                  {/* Image Upload */}
                  <div className="flex flex-col gap-2">
                    <label className={labelClass}>Item Image <span className="text-red-500">*</span></label>
                    <div 
                      className={`relative flex flex-col items-center justify-center p-3 sm:p-4 border-2 border-dashed rounded-2xl transition-all duration-200 min-h-[120px] ${
                        isDragging ? 'border-orange-500 bg-orange-50' : 'border-slate-200 bg-slate-50 hover:bg-slate-100/50'
                      }`}
                      onDragOver={handleDragOver}
                      onDragLeave={handleDragLeave}
                      onDrop={handleDrop}
                    >
                      <input type="file" accept="image/*" onChange={handleImageChange} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" />
                      {imagePreview ? (
                        <div className="absolute inset-0 p-2 z-0">
                          <img src={imagePreview} alt="Preview" className="w-full h-full object-cover rounded-lg shadow-sm" />
                          <div className="absolute inset-2 bg-black/40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity rounded-lg backdrop-blur-[2px]">
                            <span className="text-white font-bold text-xs bg-black/50 px-3 py-1.5 rounded-lg">Change</span>
                          </div>
                        </div>
                      ) : (
                        <div className="text-center flex flex-col items-center gap-2 z-0 pointer-events-none">
                          <div className="w-10 h-10 bg-white rounded-full shadow-sm flex items-center justify-center border border-slate-100">
                            <svg className="w-5 h-5 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                          </div>
                          <p className="text-[12px] font-bold text-slate-700">Click or drag image</p>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Item Name & Price */}
                  <div className="grid grid-cols-3 gap-3">
                    <div className="col-span-2 flex flex-col gap-2">
                      <label className={labelClass}>Item Name <span className="text-red-500">*</span></label>
                      <input type="text" placeholder="e.g. Garlic Butter Steak" className={inputClass} required />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className={labelClass}>Price <span className="text-red-500">*</span></label>
                      <input type="number" placeholder="0.00" className={inputClass} required />
                    </div>
                  </div>

                  {/* Category & Type */}
                  <div className="grid grid-cols-2 gap-3">
                    <div className="flex flex-col gap-2">
                      <label className={labelClass}>Category <span className="text-red-500">*</span></label>
                      <select className={inputClass} required>
                        <option value="">Select Category</option>
                        <option value="Starters">Starters</option>
                        <option value="Main Course">Main Course</option>
                        <option value="Desserts">Desserts</option>
                        <option value="Drinks">Drinks</option>
                      </select>
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className={labelClass}>Type <span className="text-red-500">*</span></label>
                      <select className={inputClass} defaultValue="Veg">
                        <option value="Veg">Veg</option>
                        <option value="Non-Veg">Non-Veg</option>
                        <option value="Vegan">Vegan</option>
                        <option value="Egg">Contains Egg</option>
                      </select>
                    </div>
                  </div>

                  {/* Spicy Level & Prep Time */}
                  <div className="grid grid-cols-2 gap-3">
                    <div className="flex flex-col gap-2">
                      <label className={labelClass}>Spicy Level</label>
                      <select className={inputClass} defaultValue="Not Spicy">
                        <option value="Not Spicy">🚫 Not Spicy</option>
                        <option value="Mild">🌶️ Mild</option>
                        <option value="Medium">🌶️🌶️ Medium</option>
                        <option value="Hot">🌶️🌶️🌶️ Hot</option>
                      </select>
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className={labelClass}>Prep Time</label>
                      <input type="text" placeholder="e.g. 15 mins" className={inputClass} />
                    </div>
                  </div>

                  {/* Calories & Availability */}
                  <div className="grid grid-cols-2 gap-3">
                    <div className="flex flex-col gap-2">
                      <label className={labelClass}>Calories</label>
                      <input type="number" placeholder="kcal" className={inputClass} />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className={labelClass}>Availability</label>
                      <select className={inputClass} defaultValue="Available">
                        <option value="Available">Available</option>
                        <option value="Out of Stock">Out of Stock</option>
                      </select>
                    </div>
                  </div>

                  {/* Description */}
                  <div className="flex flex-col gap-2">
                    <label className={labelClass}>Description</label>
                    <textarea rows="2" placeholder="Briefly describe the dish..." className={`${inputClass} resize-none`} />
                  </div>

                  {/* Ingredients */}
                  <div className="flex flex-col gap-2">
                    <label className={labelClass}>Ingredients</label>
                    <input type="text" placeholder="e.g. Tomato, Garlic, Basil (comma separated)" className={inputClass} />
                  </div>

                  {/* Recipe */}
                  <div className="flex flex-col gap-2">
                    <label className={labelClass}>Recipe Details <span className="text-slate-400 normal-case tracking-normal font-medium">(Internal use)</span></label>
                    <textarea rows="2" placeholder="Preparation instructions or notes for kitchen..." className={`${inputClass} resize-none`} />
                  </div>

                </div>

                {/* Action Buttons */}
                <div className="flex items-center justify-end gap-3 pt-3 sm:pt-4 border-t border-slate-100">
                  <button type="button" className="px-4 py-2 sm:px-6 sm:py-2.5 rounded-xl text-[12px] sm:text-[14px] font-bold text-slate-600 hover:bg-slate-100 transition-colors">
                    Cancel
                  </button>
                  <button type="submit" className="px-4 py-2 sm:px-6 sm:py-2.5 rounded-xl text-[12px] sm:text-[14px] font-bold text-white bg-orange-500 hover:bg-orange-600 shadow-lg shadow-orange-500/20 transition-all flex items-center gap-2">
                    Save Menu Item
                  </button>
                </div>

              </form>
            </div>
          </div>
        
          {/* Right Column: Table */}
          <div className="lg:col-span-7 xl:col-span-8">
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
              <div className="p-4 sm:p-6 border-b border-slate-200 flex justify-between items-center">
                <h2 className="text-lg font-bold text-slate-800">Existing Menu Items</h2>
                <span className="text-sm font-medium text-slate-500">3 total</span>
              </div>
              
              <div className="overflow-x-auto custom-scrollbar">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50/50">
                      <th className="px-4 sm:px-6 py-4 text-[11px] font-bold text-slate-500 uppercase tracking-wider border-b border-slate-200 w-16 sm:w-24 whitespace-nowrap">Photo</th>
                      <th className="px-4 sm:px-6 py-4 text-[11px] font-bold text-slate-500 uppercase tracking-wider border-b border-slate-200 whitespace-nowrap">Item Name</th>
                      <th className="px-4 sm:px-6 py-4 text-[11px] font-bold text-slate-500 uppercase tracking-wider border-b border-slate-200 whitespace-nowrap">Category</th>
                      <th className="px-4 sm:px-6 py-4 text-[11px] font-bold text-slate-500 uppercase tracking-wider border-b border-slate-200 whitespace-nowrap">Price</th>
                      <th className="px-4 sm:px-6 py-4 text-[11px] font-bold text-slate-500 uppercase tracking-wider border-b border-slate-200 whitespace-nowrap">Type</th>
                      <th className="px-4 sm:px-6 py-4 text-[11px] font-bold text-slate-500 uppercase tracking-wider border-b border-slate-200 whitespace-nowrap">Availability</th>
                      <th className="px-4 sm:px-6 py-4 text-[11px] font-bold text-slate-500 uppercase tracking-wider border-b border-slate-200 text-right whitespace-nowrap">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {dummyMenuItems.map((item) => (
                      <tr key={item.id} className="hover:bg-slate-50/50 transition-colors group">
                        <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl overflow-hidden shadow-sm border border-slate-200 bg-slate-100 flex-shrink-0">
                            <img src={item.img} alt={item.itemName} className="w-full h-full object-cover" />
                          </div>
                        </td>
                        <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                          <span className="text-[13px] sm:text-[14px] font-bold text-slate-800">{item.itemName}</span>
                        </td>
                        <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                          <span className="text-[12px] sm:text-[13px] text-slate-500 font-medium">{item.category}</span>
                        </td>
                        <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                          <span className="text-[12px] sm:text-[13px] font-bold text-orange-500">${item.price}</span>
                        </td>
                        <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                          <span className="text-[12px] sm:text-[13px] font-bold text-slate-600">{item.type}</span>
                        </td>
                        <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                          <span className={`text-[10px] sm:text-[11px] font-bold px-2.5 py-1 rounded-full ${
                            item.availability === 'Available' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                          }`}>
                            {item.availability}
                          </span>
                        </td>
                        <td className="px-4 sm:px-6 py-4 text-right whitespace-nowrap">
                          <div className="flex items-center justify-end gap-2">
                            <button onClick={() => openEditModal(item)} type="button" className="p-2 text-slate-400 hover:text-orange-500 hover:bg-orange-50 rounded-lg transition-colors" title="Edit">
                              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                              </svg>
                            </button>
                            <button onClick={() => openDeleteModal(item)} type="button" className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors" title="Delete">
                              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                              </svg>
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Edit Menu Modal */}
      {isEditModalOpen && selectedItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg overflow-hidden flex flex-col max-h-[90vh]">
            <div className="p-4 sm:p-5 border-b border-slate-100 flex items-center justify-between sticky top-0 bg-white z-10">
              <h2 className="text-lg font-bold text-slate-800">Edit Menu Item</h2>
              <button onClick={() => setIsEditModalOpen(false)} className="p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-600 rounded-lg transition-colors">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>
            
            <div className="p-4 sm:p-5 overflow-y-auto custom-scrollbar flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <label className={labelClass}>Item Name</label>
                <input type="text" defaultValue={selectedItem.itemName} className={inputClass} />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="flex flex-col gap-2">
                  <label className={labelClass}>Price</label>
                  <input type="number" defaultValue={selectedItem.price} className={inputClass} />
                </div>
                <div className="flex flex-col gap-2">
                  <label className={labelClass}>Category</label>
                  <select defaultValue={selectedItem.category} className={inputClass}>
                    <option value="Starters">Starters</option>
                    <option value="Main Course">Main Course</option>
                    <option value="Desserts">Desserts</option>
                    <option value="Drinks">Drinks</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="flex flex-col gap-2">
                  <label className={labelClass}>Type</label>
                  <select defaultValue={selectedItem.type} className={inputClass}>
                    <option value="Veg">Veg</option>
                    <option value="Non-Veg">Non-Veg</option>
                    <option value="Vegan">Vegan</option>
                    <option value="Egg">Contains Egg</option>
                  </select>
                </div>
                <div className="flex flex-col gap-2">
                  <label className={labelClass}>Spicy Level</label>
                  <select defaultValue={selectedItem.spicyLevel || "Not Spicy"} className={inputClass}>
                    <option value="Not Spicy">🚫 Not Spicy</option>
                    <option value="Mild">🌶️ Mild</option>
                    <option value="Medium">🌶️🌶️ Medium</option>
                    <option value="Hot">🌶️🌶️🌶️ Hot</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="flex flex-col gap-2">
                  <label className={labelClass}>Prep Time</label>
                  <input type="text" defaultValue={selectedItem.prepTime || ""} placeholder="e.g. 15 mins" className={inputClass} />
                </div>
                <div className="flex flex-col gap-2">
                  <label className={labelClass}>Calories</label>
                  <input type="number" defaultValue={selectedItem.calories || ""} placeholder="kcal" className={inputClass} />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="col-span-2 sm:col-span-1 flex flex-col gap-2">
                  <label className={labelClass}>Availability</label>
                  <select defaultValue={selectedItem.availability} className={inputClass}>
                    <option value="Available">Available</option>
                    <option value="Out of Stock">Out of Stock</option>
                  </select>
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label className={labelClass}>Description</label>
                <textarea rows="2" defaultValue={selectedItem.desc || ""} className={`${inputClass} resize-none`} placeholder="Briefly describe the dish..." />
              </div>

              <div className="flex flex-col gap-2">
                <label className={labelClass}>Ingredients</label>
                <input type="text" defaultValue={selectedItem.ingredients || ""} placeholder="e.g. Tomato, Garlic, Basil" className={inputClass} />
              </div>

              <div className="flex flex-col gap-2">
                <label className={labelClass}>Recipe Details</label>
                <textarea rows="2" defaultValue={selectedItem.recipe || ""} className={`${inputClass} resize-none`} placeholder="Internal kitchen notes..." />
              </div>
              
              <div className="flex flex-col gap-2">
                <label className={labelClass}>Item Image</label>
                <div className="relative h-32 sm:h-40 rounded-xl border-2 border-slate-200 border-dashed group p-2 bg-slate-50">
                  <input type="file" accept="image/*" className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" />
                  <img src={selectedItem.img} alt={selectedItem.itemName} className="w-full h-full object-cover rounded-lg shadow-sm" />
                  <div className="absolute inset-2 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity rounded-lg backdrop-blur-[2px] pointer-events-none">
                    <span className="text-white font-bold text-xs bg-black/50 px-3 py-1.5 rounded-lg">Change Image</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-3 sm:p-4 border-t border-slate-100 flex justify-end gap-3 bg-slate-50 sticky bottom-0">
              <button onClick={() => setIsEditModalOpen(false)} className="px-4 py-2 rounded-xl text-[12px] sm:text-[13px] font-bold text-slate-600 hover:bg-slate-200 transition-colors">
                Cancel
              </button>
              <button onClick={() => setIsEditModalOpen(false)} className="px-4 py-2 rounded-xl text-[12px] sm:text-[13px] font-bold text-white bg-orange-500 hover:bg-orange-600 shadow-md shadow-orange-500/20 transition-all">
                Update Item
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && itemToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-xl w-[85%] sm:w-full max-w-sm overflow-hidden flex flex-col">
            <div className="p-4 sm:p-6 flex flex-col items-center text-center gap-2 sm:gap-4">
              <div className="w-10 h-10 sm:w-16 sm:h-16 bg-red-100 text-red-500 rounded-full flex items-center justify-center mb-0 sm:mb-2">
                <svg className="w-5 h-5 sm:w-8 sm:h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <div>
                <h3 className="text-base sm:text-xl font-bold text-slate-800">Delete Item?</h3>
                <p className="text-[11px] sm:text-sm text-slate-500 mt-1 sm:mt-2">
                  Are you sure you want to delete <span className="font-bold text-slate-700">"{itemToDelete.itemName}"</span>? This action cannot be undone.
                </p>
              </div>
            </div>
            <div className="p-2 sm:p-4 border-t border-slate-100 flex justify-center gap-2 sm:gap-3 bg-slate-50">
              <button 
                onClick={() => setIsDeleteModalOpen(false)}
                className="px-3 py-1.5 sm:px-6 sm:py-2.5 rounded-lg sm:rounded-xl text-[12px] sm:text-[14px] font-bold text-slate-600 hover:bg-slate-200 transition-colors w-full"
              >
                Cancel
              </button>
              <button 
                onClick={() => setIsDeleteModalOpen(false)}
                className="px-3 py-1.5 sm:px-6 sm:py-2.5 rounded-lg sm:rounded-xl text-[12px] sm:text-[14px] font-bold text-white bg-red-500 hover:bg-red-600 shadow-md shadow-red-500/20 transition-all w-full"
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}

    </AdminLayout>
  );
}
