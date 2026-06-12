import React, { useState } from 'react';
import AdminLayout from '../../layouts/AdminLayout';

export default function AddCategory() {
  const [imagePreview, setImagePreview] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState(null);

  const openEditModal = (category) => {
    setSelectedCategory(category);
    setIsEditModalOpen(true);
  };

  const openDeleteModal = (category) => {
    setCategoryToDelete(category);
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

  return (
    <AdminLayout>
      <div className="max-w-7xl mx-auto flex flex-col gap-5">
        
        {/* Header */}
        <div>
          <h1 className="text-xl font-extrabold text-slate-900 tracking-tight">Add New Category</h1>
          <p className="text-xs text-slate-500 mt-1">Create categories like "Main Course", "Desserts", or "Drinks" to organize your menu.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Left Column: Form */}
          <div className="lg:col-span-5 xl:col-span-4 flex flex-col gap-5">
            {/* Main Form Container */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
              <form className="p-2 sm:p-5 flex flex-col gap-3 sm:gap-5">
                
                <div className="grid grid-cols-1 gap-3 sm:gap-5">
              
              {/* Left Column: Text Details */}
              <div className="flex flex-col gap-4">
                
                {/* Category Title */}
                <div className="flex flex-col gap-2">
                  <label className="text-[12px] font-bold text-slate-600 uppercase tracking-widest">
                    Category Title <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Signature Cocktails"
                    className="w-full px-3 py-1.5 sm:py-2 bg-slate-50 border border-slate-200 rounded-xl text-[12px] sm:text-[13px] text-slate-800 placeholder-slate-400 font-medium focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-400 transition-all"
                  />
                </div>

                {/* Category Description */}
                <div className="flex flex-col gap-2">
                  <label className="text-[12px] font-bold text-slate-600 uppercase tracking-widest">
                    Description <span className="text-slate-400 normal-case tracking-normal font-medium">(Optional)</span>
                  </label>
                  <textarea
                    rows="2"
                    placeholder="Briefly describe what's in this category..."
                    className="w-full px-3 py-1.5 sm:py-2 bg-slate-50 border border-slate-200 rounded-xl text-[12px] sm:text-[13px] text-slate-800 placeholder-slate-400 font-medium focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-400 transition-all resize-none"
                  />
                  <p className="text-[11px] text-slate-400 font-medium">Keep it short and appetizing. Maximum 150 characters.</p>
                </div>

              </div>

              {/* Right Column: Image Upload */}
              <div className="flex flex-col gap-2">
                <label className="text-[12px] font-bold text-slate-600 uppercase tracking-widest">
                  Category Image <span className="text-red-500">*</span>
                </label>
                
                <div 
                  className={`relative flex-1 flex flex-col items-center justify-center p-3 sm:p-4 border-2 border-dashed rounded-2xl transition-all duration-200 min-h-[80px] sm:min-h-[160px] ${
                    isDragging 
                      ? 'border-orange-500 bg-orange-50' 
                      : 'border-slate-200 bg-slate-50 hover:bg-slate-100/50'
                  }`}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                >
                  <input 
                    type="file" 
                    accept="image/*" 
                    onChange={handleImageChange}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" 
                  />
                  
                  {imagePreview ? (
                    <div className="absolute inset-0 p-2 z-0">
                      <img 
                        src={imagePreview} 
                        alt="Category Preview" 
                        className="w-full h-full object-cover rounded-xl shadow-sm"
                      />
                      <div className="absolute inset-0 bg-black/40 rounded-xl m-2 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-sm">
                        <span className="text-white font-bold text-sm tracking-wide bg-black/50 px-4 py-2 rounded-lg">
                          Click to change
                        </span>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center flex flex-col items-center gap-2 sm:gap-3 z-0 pointer-events-none">
                      <div className="w-10 h-10 sm:w-14 sm:h-14 bg-white rounded-full shadow-sm flex items-center justify-center border border-slate-100">
                        <svg className="w-5 h-5 sm:w-6 sm:h-6 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-[12px] sm:text-[14px] font-bold text-slate-700">
                          <span className="text-orange-500">Click to upload</span> or drag and drop
                        </p>
                        <p className="text-[10px] sm:text-[12px] text-slate-500 font-medium mt-0.5 sm:mt-1">SVG, PNG, JPG or GIF (max. 5MB)</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-end gap-3 pt-3 sm:pt-4 border-t border-slate-100">
              <button 
                type="button"
                className="px-4 py-2 sm:px-6 sm:py-2.5 rounded-xl text-[12px] sm:text-[14px] font-bold text-slate-600 hover:bg-slate-100 transition-colors"
              >
                Cancel
              </button>
              <button 
                type="submit"
                className="px-4 py-2 sm:px-6 sm:py-2.5 rounded-xl text-[12px] sm:text-[14px] font-bold text-white bg-orange-500 hover:bg-orange-600 shadow-lg shadow-orange-500/20 transition-all flex items-center gap-2"
              >
                Save Category
              </button>
            </div>

              </form>
            </div>
          </div>
        
          {/* Right Column: Table */}
          <div className="lg:col-span-7 xl:col-span-8">
            {/* Existing Categories Table */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-slate-200 flex justify-between items-center">
            <h2 className="text-lg font-bold text-slate-800">Existing Categories</h2>
            <span className="text-sm font-medium text-slate-500">3 total</span>
          </div>
          
          <div className="overflow-x-auto custom-scrollbar">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/50">
                  <th className="px-4 sm:px-6 py-4 text-[11px] font-bold text-slate-500 uppercase tracking-wider border-b border-slate-200 w-16 sm:w-24">Photo</th>
                  <th className="px-4 sm:px-6 py-4 text-[11px] font-bold text-slate-500 uppercase tracking-wider border-b border-slate-200">Title</th>
                  <th className="px-4 sm:px-6 py-4 text-[11px] font-bold text-slate-500 uppercase tracking-wider border-b border-slate-200">Description</th>
                  <th className="px-4 sm:px-6 py-4 text-[11px] font-bold text-slate-500 uppercase tracking-wider border-b border-slate-200 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {[
                  {
                    id: 1,
                    title: 'Main Course',
                    desc: 'Hearty, satisfying meals including steaks, pastas, and house specialties.',
                    img: 'https://images.unsplash.com/photo-1544025162-831109a15a31?q=80&w=150&auto=format&fit=crop'
                  },
                  {
                    id: 2,
                    title: 'Signature Cocktails',
                    desc: 'Hand-crafted drinks mixed with premium spirits and fresh ingredients.',
                    img: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?q=80&w=150&auto=format&fit=crop'
                  },
                  {
                    id: 3,
                    title: 'Desserts',
                    desc: 'Sweet treats to finish your meal perfectly.',
                    img: 'https://images.unsplash.com/photo-1551024601-bec78aea704b?q=80&w=150&auto=format&fit=crop'
                  }
                ].map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50/50 transition-colors group">
                    <td className="px-4 sm:px-6 py-4">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl overflow-hidden shadow-sm border border-slate-200 bg-slate-100 flex-shrink-0">
                        <img src={item.img} alt={item.title} className="w-full h-full object-cover" />
                      </div>
                    </td>
                    <td className="px-4 sm:px-6 py-4">
                      <span className="text-[13px] sm:text-[14px] font-bold text-slate-800">{item.title}</span>
                    </td>
                    <td className="px-4 sm:px-6 py-4">
                      <div className="max-h-[60px] overflow-y-auto custom-scrollbar pr-1">
                        <p className="text-[12px] sm:text-[13px] text-slate-500 max-w-[150px] sm:max-w-xs">{item.desc}</p>
                      </div>
                    </td>
                    <td className="px-4 sm:px-6 py-4 text-right">
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

      {/* Edit Category Modal */}
      {isEditModalOpen && selectedCategory && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg overflow-hidden flex flex-col max-h-[90vh]">
            <div className="p-5 border-b border-slate-100 flex items-center justify-between sticky top-0 bg-white z-10">
              <h2 className="text-lg font-bold text-slate-800">Edit Category</h2>
              <button 
                onClick={() => setIsEditModalOpen(false)}
                className="p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-600 rounded-lg transition-colors"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="p-5 overflow-y-auto custom-scrollbar flex flex-col gap-5">
              <div className="flex flex-col gap-2">
                <label className="text-[12px] font-bold text-slate-600 uppercase tracking-widest">
                  Category Title
                </label>
                <input
                  type="text"
                  defaultValue={selectedCategory.title}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-[13px] text-slate-800 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-400 transition-all"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-[12px] font-bold text-slate-600 uppercase tracking-widest">
                  Description
                </label>
                <textarea
                  rows="3"
                  defaultValue={selectedCategory.desc}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-[13px] text-slate-800 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-400 transition-all resize-none"
                />
              </div>
              
              <div className="flex flex-col gap-2">
                <label className="text-[12px] font-bold text-slate-600 uppercase tracking-widest">
                  Category Image
                </label>
                <div className="relative h-40 rounded-xl border-2 border-slate-200 border-dashed group p-2 bg-slate-50">
                  <input 
                    type="file" 
                    accept="image/*" 
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" 
                  />
                  <img src={selectedCategory.img} alt={selectedCategory.title} className="w-full h-full object-cover rounded-lg shadow-sm" />
                  <div className="absolute inset-2 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity rounded-lg backdrop-blur-[2px] pointer-events-none">
                    <span className="text-white font-bold text-xs bg-black/50 px-3 py-1.5 rounded-lg">Change Image</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-4 border-t border-slate-100 flex justify-end gap-3 bg-slate-50 sticky bottom-0">
              <button 
                onClick={() => setIsEditModalOpen(false)}
                className="px-4 py-2 rounded-xl text-[13px] font-bold text-slate-600 hover:bg-slate-200 transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={() => setIsEditModalOpen(false)}
                className="px-4 py-2 rounded-xl text-[13px] font-bold text-white bg-orange-500 hover:bg-orange-600 shadow-md shadow-orange-500/20 transition-all"
              >
                Update Category
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && categoryToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-xl w-[85%] sm:w-full max-w-sm overflow-hidden flex flex-col">
            <div className="p-4 sm:p-6 flex flex-col items-center text-center gap-2 sm:gap-4">
              <div className="w-10 h-10 sm:w-16 sm:h-16 bg-red-100 text-red-500 rounded-full flex items-center justify-center mb-0 sm:mb-2">
                <svg className="w-5 h-5 sm:w-8 sm:h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <div>
                <h3 className="text-base sm:text-xl font-bold text-slate-800">Delete Category?</h3>
                <p className="text-[11px] sm:text-sm text-slate-500 mt-1 sm:mt-2">
                  Are you sure you want to delete <span className="font-bold text-slate-700">"{categoryToDelete.title}"</span>? This action cannot be undone.
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
