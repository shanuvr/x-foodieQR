import React, { useState } from 'react';

export default function RestaurantMenu() {
  const [activeTab, setActiveTab] = useState('main-course');
  const [selectedRecipeItem, setSelectedRecipeItem] = useState(null);

  const mainCourses = [
    {
      id: 'truffle-burrata',
      name: 'Truffle Burrata',
      veg: true,
      kcal: '320 kcal',
      price: '₹850',
      description: 'Creamy burrata, heirloom tomatoes, basil pesto, and shaved black truffle.',
      img: 'https://lh3.googleusercontent.com/aida/AP1WRLtt37hoKaXq4KAzkPM3qWw5ReyBx_d-BxhJluuB5JN1XhNg14aZoXkIpPONzBAc16ZgxZ_VqazxEuLByPdYY9WyBpwHkLhKu8vonAeqJ96yxuJXvBltJ8LuU0_6sJeBY-TwlohpX0dfcVd4FEUsYCAvQUrhV-gUvXEnj9L_hwsmzHYHwvn7F9d3W_jOgDGyeH3SObvBQZcM6oCUJLqOvEe9dokars_nEALIA82tYYWDfNoGTK7i5CVD0tll',
      ingredients: 'Fresh Burrata, heirloom tomatoes, basil pesto, shaved black truffle, balsamic glaze, extra virgin olive oil, pine nuts, parmesan, sea salt',
      recipe: 'Place heirloom tomatoes on a serving plate. Rest fresh Burrata cheese directly in the center. Drizzle with premium basil pesto and aged sweet balsamic glaze. Finish with shaved black truffle, sea salt flakes, and cold-pressed extra virgin olive oil.'
    },
    {
      id: 'pan-seared-salmon',
      name: 'Pan-Seared Salmon',
      veg: false,
      kcal: '480 kcal',
      spice: '🌶️',
      price: '₹1,850',
      description: 'Atlantic salmon, asparagus spears, saffron risotto, and lemon butter sauce.',
      img: 'https://lh3.googleusercontent.com/aida/AP1WRLttvmillzjiktR7oBvnPhJ0caFebD-1TXCHiqSZwZc4goxLDGnCEdOMn_5jVFb6LBGcSbhZnjUiq2SmoTLSrZJTt0Fj0-aPBzQHHxP-fomFl-Mu0FiOnVwV88sKEQLXkvZkuaVSOBqqztsITakqBY0VexAHmNq62lwICytnSLr4VzskFfRx1LX2p71cKQruamspzyb9jTtxR02IA6b18yXENxoF_hUs1hKUtKX4HgvaIZB2E_m2-wcUblGG',
      ingredients: 'Atlantic salmon, asparagus, Arborio rice, vegetable broth, saffron, butter, lemon, olive oil, dry white wine, pepper, sea salt',
      recipe: 'Season salmon fillet with sea salt, black pepper, and lemon zest. Sear skin-side down in a hot pan for 4 minutes until crispy, then flip and cook for 2 more minutes. Serve over a bed of warm saffron Arborio risotto and grilled asparagus spears. Drizzle with creamy lemon butter emulsion.'
    },
    {
      id: 'butter-chicken',
      name: 'Butter Chicken',
      veg: false,
      kcal: '750 kcal',
      spice: '🌶️🌶️',
      price: '₹1,250',
      description: 'Tender tandoori chicken simmered in a rich tomato, butter, and cream gravy. Served with choice of bread or rice.',
      img: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&w=600&q=80',
      ingredients: 'Chicken thighs, yogurt, ginger-garlic paste, garam masala, Kashmiri chili, Roma tomatoes, cashews, butter, heavy cream, fenugreek leaves',
      recipe: 'Marinate chicken pieces in thick spiced yogurt and grill in a hot tandoor oven until charred. Prepare a velvety smooth gravy of pureed Roma tomatoes, cashew butter, and cream cooked with toasted dried fenugreek leaves (Kasuri Methi). Fold in grilled chicken and garnish with heavy cream and fresh coriander.'
    },
    {
      id: 'paneer-tikka-masala',
      name: 'Paneer Tikka Masala',
      veg: true,
      kcal: '520 kcal',
      spice: '🌶️🌶️',
      price: '₹750',
      description: 'Char-grilled paneer tikka cubes cooked in a moderately spiced, creamy onion-tomato masala gravy.',
      img: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=600&q=80',
      ingredients: 'Cottage cheese (paneer), bell peppers, red onions, curd, besan flour, ginger-garlic paste, cumin, coriander powder, fresh cream, butter',
      recipe: 'Marinate fresh cottage cheese cubes and bell peppers in a mix of yogurt, gram flour, and garam masala; char-grill until smoky. Cook an aromatic gravy using caramelized onions, tomato paste, fresh ginger-garlic paste, and crushed spices. Gently stir in the grilled paneer and garnish with cream.'
    },
    {
      id: 'wild-mushroom-risotto',
      name: 'Wild Mushroom Risotto',
      veg: true,
      kcal: '450 kcal',
      price: '₹950',
      description: 'Creamy Arborio rice slow-cooked with wild porcini, field mushrooms, Parmesan, and finished with truffle oil.',
      img: 'https://images.unsplash.com/photo-1476124369491-e7addf5db371?auto=format&fit=crop&w=600&q=80',
      ingredients: 'Arborio rice, porcini mushrooms, button mushrooms, vegetable stock, dry white wine, yellow onion, garlic, butter, Parmigiano-Reggiano, white truffle oil',
      recipe: 'Sauté chopped porcini and wild field mushrooms in olive oil and butter until browned. Toast Arborio rice in the same pan. Slowly add hot vegetable stock, ladle by ladle, stirring continuously until the rice absorbs the liquid and becomes creamy. Stir in grated Parmigiano-Reggiano and drizzle with white truffle oil.'
    },
    {
      id: 'hyderabadi-mutton-biryani',
      name: 'Hyderabadi Mutton Biryani',
      veg: false,
      kcal: '850 kcal',
      spice: '🌶️🌶️🌶️',
      price: '₹1,150',
      description: 'Fragrant long-grain basmati rice layered with tender goat meat, saffron, and aromatic spices cooked on dum.',
      img: 'https://images.unsplash.com/photo-1633945274405-b6c8069047b0?auto=format&fit=crop&w=600&q=80',
      ingredients: 'Goat meat, basmati rice, yogurt, fried onions, mint, fresh coriander, saffron, ghee, cardamom, cloves, cinnamon, milk, raw papaya paste',
      recipe: 'Marinate tender goat meat in spiced yogurt, raw papaya paste, and golden-fried onions. Parboil premium basmati rice with green cardamom, cloves, and bay leaves. Layer the marinated meat and rice in a heavy-bottomed pot, drizzle with saffron-infused milk and ghee, seal the lid with dough, and slow-cook (Dum) for 45 minutes.'
    },
    {
      id: 'lamb-rogan-josh',
      name: 'Lamb Rogan Josh',
      veg: false,
      kcal: '650 kcal',
      spice: '🌶️🌶️🌶️',
      price: '₹1,450',
      description: 'Slow-cooked tender lamb in a rich aromatic Kashmiri gravy with saffron rice.',
      img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDNYXHjq9CCgqOG45Ixfk0UyX04pE8PAKXT7cgV9zfA0jtU9WjRxD6z3VoVTwjECmAnSvSEgKixTGSog9rgkToBd5fzKK4Is-WvRQPiY68na-mK_DNlfhImykTlD3ZAFp3C9ywmPwrD-8Oj0H-y-qabRDwRkVBKQcEBEhZFX5l1mRsYqXR3rR3MigxP85y58uYucmIYljyND70nqVR6XxfPeapXAdBOjN1ocyrghLF_mSchZdAf9oUkkU5QVINEMBxmRAXqSAnMoJQM',
      ingredients: 'Lamb shoulder, mustard oil, Kashmiri chili powder, yogurt, fennel powder, ginger powder, cardamom, cloves, cinnamon, bay leaves, saffron',
      recipe: 'Sear lamb chunks in mustard oil with whole Kashmiri spices. Stir in yogurt, Kashmiri red chili paste, fennel seed powder, and dry ginger powder. Pour in a little water, seal the pot, and cook slowly on low heat for 90 minutes until the meat is fork-tender and the gravy is oil-separated. Serve hot over saffron rice.'
    }
  ];

  const drinks = [
    {
      id: 'artisan-cocktail',
      name: 'Artisan Cocktail',
      veg: true,
      kcal: '180 kcal',
      price: '₹950',
      description: 'A craft blend of premium spirits, botanical bitters, and fresh seasonal citrus.',
      img: 'https://lh3.googleusercontent.com/aida/AP1WRLsIfEvr0qi9LK7m5xOXnWfAhZoOCSnBMBX5pQz8zvl-pnTcmdFXGR5HSmN9OD9yC7mTcIn03R6eS7nATEisR0LlbT2J__79_wOPHwoJijmI8F3-igNUhrPROrg-Q4x3Q62H0sD35uwsMMUeAyzjISJiOy6cz-rmMDbOP1CGLGf468Il7Mw0KmiKz19HM14_oJfdVh0TD6vPVDfKLkxCzAkS8Ln87tORDcEsnvZvEv9icH_ktg1UsqcUqP4',
      ingredients: 'Premium dry gin, elderflower liqueur, lemon juice, simple syrup, orange bitters, fresh rosemary, fresh thyme, ice, orange peel',
      recipe: 'Combine fresh botanicals and citrus zests in a cocktail shaker and muddle gently. Add premium dry gin, elderflower liqueur, and botanical bitters with plenty of ice. Shake vigorously for 15 seconds. Double strain into a chilled coupe glass and garnish with an express orange peel.'
    },
    {
      id: 'mango-lassi',
      name: 'Mango Lassi',
      veg: true,
      kcal: '220 kcal',
      price: '₹450',
      description: 'Traditional yogurt-based drink blended with sweet Alphonso mango puree and green cardamom.',
      img: 'https://images.unsplash.com/photo-1553530666-ba11a7da3888?auto=format&fit=crop&w=600&q=80',
      ingredients: 'Alphonso mango pulp, Greek yogurt, whole milk, sugar, green cardamom, pistachios, almonds, saffron strands',
      recipe: 'Blend fresh sweet Alphonso mango pulp with thick chilled yogurt, milk, and sugar until creamy and frothy. Add a pinch of green cardamom powder and blend once more. Pour into a serving glass, garnish with sliced pistachios, almonds, and saffron strands, and serve chilled.'
    },
    {
      id: 'vintage-red-wine',
      name: 'Vintage Red Wine',
      veg: true,
      kcal: '125 kcal',
      price: '₹1,200',
      description: 'A robust Cabernet Sauvignon with notes of dark berries and oak finish.',
      img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCdZpxumZhZbIDDyYUprxQ6o-JcvDAzIzXQUlAythF6IC1lx9I_4ABGRHu9e6lLsBCmpcOObccKLeJp3ouNyauS7OcyMjqrnAsJ66a31OtusNujQU_94XYG1Zf9BQhnBWxupVhWZ2firieCFIMlpiNVUt-UuMymtnfC738zfSbR1S0rQiixHsUlxlTeI1pZpp1f0-cP-YvhFnemgHraAI0V9R7KQUimaQoBQH0vRGkRKkjGlXHKGszV_O_OxfCoXt3rIYklXngKPiHb',
      ingredients: 'Cabernet Sauvignon grapes (oak-aged reserve), sulfur dioxide',
      recipe: 'Store bottle horizontally at 16°C. Carefully uncork the bottle and decant for 30 minutes before serving to aerate. Pour gently into a large Cabernet glass to let the aromas of black currant, cedar wood, and oak unfold. Serve at room temperature.'
    },
    {
      id: 'fresh-mint-mojito',
      name: 'Fresh Mint Mojito',
      veg: true,
      kcal: '90 kcal',
      price: '₹550',
      description: 'Refreshing lime and fresh mint leaves muddled with pure sugar cane, topped with sparkling soda water.',
      img: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=600&q=80',
      ingredients: 'Fresh mint leaves, lime wedges, sugar cane juice, fresh lime juice, crushed ice, carbonated club soda',
      recipe: 'Muddle fresh mint leaves, raw sugar cane juice, and lime wedges directly at the bottom of a highball glass. Fill the glass to the brim with crushed ice. Pour freshly squeezed lime juice and top with chilled, highly carbonated soda water. Stir gently and garnish with a mint sprig.'
    },
    {
      id: 'iced-caramel-macchiato',
      name: 'Iced Caramel Macchiato',
      veg: true,
      kcal: '190 kcal',
      price: '₹450',
      description: 'Rich espresso layered with fresh cold milk and sweet vanilla syrup, drizzled with caramel sauce.',
      img: 'https://images.unsplash.com/photo-1485808191679-5f86510681a2?auto=format&fit=crop&w=600&q=80',
      ingredients: 'Espresso coffee, cold whole milk, vanilla syrup, caramel sauce, ice cubes',
      recipe: 'Add house-made vanilla syrup to the bottom of a glass. Pour in chilled whole milk and fill the glass with ice cubes. Slowly pour freshly pulled double espresso shots directly over the ice so it floats on top of the milk. Drizzle generously with hot buttery caramel sauce in a crosshatch pattern.'
    },
    {
      id: 'sparkling-water',
      name: 'Sparkling Water',
      veg: true,
      kcal: '0 kcal',
      price: '₹350',
      description: 'Crisp, naturally carbonated mineral water served chilled with lemon.',
      img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCdZpxumZhZbIDDyYUprxQ6o-JcvDAzIzXQUlAythF6IC1lx9I_4ABGRHu9e6lLsBCmpcOObccKLeJp3ouNyauS7OcyMjqrnAsJ66a31OtusNujQU_94XYG1Zf9BQhnBWxupVhWZ2firieCFIMlpiNVUt-UuMymtnfC738zfSbR1S0rQiixHsUlxlTeI1pZpp1f0-cP-YvhFnemgHraAI0V9R7KQUimaQoBQH0vRGkRKkjGlXHKGszV_O_OxfCoXt3rIYklXngKPiHb',
      ingredients: 'Natural spring sparkling mineral water, fresh Meyer lemon',
      recipe: 'Chill natural spring sparkling mineral water to 4°C. Pour into a clean, dry highball glass to preserve carbonation. Garnish with a fresh thin slice of Meyer lemon and serve immediately.'
    }
  ];

  const renderItemCard = (item) => (
    <div key={item.id} className="max-w-[95%] md:max-w-2xl flex items-center gap-3 sm:gap-6 bg-white p-3 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow group min-w-0">
      {/* Left Image */}
      <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-lg overflow-hidden flex-shrink-0 bg-[#edeeef]">
        <img 
          alt={item.name} 
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
          src={item.img} 
        />
      </div>
      
      {/* Center content */}
      <div className="flex-grow min-w-0 flex flex-col justify-between self-stretch py-0.5">
        <div>
          <div className="flex items-center gap-1.5 mb-1 flex-wrap">
            <h3 className="font-bold text-[#212529] text-[14px] sm:text-[18px] leading-tight truncate">{item.name}</h3>
            <div className={`flex-shrink-0 flex items-center justify-center w-3.5 h-3.5 sm:w-4 sm:h-4 border-2 ${item.veg ? 'border-green-600' : 'border-red-600'} p-[1.5px] sm:p-[2px]`}>
              <div className={`w-full h-full rounded-full ${item.veg ? 'bg-green-600' : 'bg-red-600'}`}></div>
            </div>
          </div>
          <p className="text-[10px] sm:text-[12px] font-normal text-[#534433] line-clamp-2 leading-snug mb-1">{item.description}</p>
        </div>
        <div className="flex items-center flex-wrap gap-x-2 gap-y-1 text-[9px] sm:text-[11px] text-[#534433] font-semibold mt-1">
          {/* View Recipe Button */}
          <button 
            onClick={() => setSelectedRecipeItem(item)}
            className="px-2 py-0.5 sm:px-2.5 sm:py-1 rounded bg-[#fff8ed] border border-orange-100 text-[#855400] text-[9px] sm:text-[10px] font-bold hover:bg-[#855400] hover:text-white transition-colors cursor-pointer active:scale-95 whitespace-nowrap"
          >
            View Recipe
          </button>
          <span className="text-gray-400">•</span>
          <span className="whitespace-nowrap">{item.kcal}</span>
          {item.spice && (
            <>
              <span className="text-gray-400">•</span>
              <span className="whitespace-nowrap">Spice Level: {item.spice}</span>
            </>
          )}
        </div>
      </div>
      
      {/* Right Column: Price & Add Button */}
      <div className="flex flex-col items-end justify-center gap-1.5 flex-shrink-0 pl-1.5 sm:pl-4 border-l border-gray-100 self-stretch">
        <span className="font-extrabold text-[#855400] text-xs sm:text-base whitespace-nowrap">{item.price}</span>
        <button className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-[#FFA500] text-white flex items-center justify-center hover:bg-[#e69500] transition-colors shadow-sm cursor-pointer">
          <svg className="w-4 h-4 sm:w-5 sm:h-5 text-white" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
        </button>
      </div>
    </div>
  );

  return (
    <>
      <div className="flex flex-col gap-2 mb-6">
        <h1 className="font-bold text-[32px] md:text-[48px] text-[#212529] leading-tight">Novotel Signature Restaurant</h1>
        <p className="flex items-center gap-2 text-[#534433] text-sm sm:text-base">
          <svg className="w-4 h-4 text-[#855400] flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
          </svg>
          P.O Bag 1101, HITEC City, Kondapur, Hyderabad, 500081, India
        </p>
      </div>

      {/* Category Navigation Tabs */}
      <div className="flex border-b border-gray-200 mb-6 overflow-x-auto scrollbar-none" id="menu">
        <button 
          className={`px-6 sm:px-12 py-3 font-bold text-[14px] transition-all whitespace-nowrap cursor-pointer border-b-2 ${activeTab === 'main-course' ? 'text-[#855400] border-[#ffa500] bg-[#fff8ed]' : 'text-[#534433] border-transparent hover:text-[#855400]'}`} 
          onClick={() => setActiveTab('main-course')}
        >
          Main Course
        </button>
        <button 
          className={`px-6 sm:px-12 py-3 font-bold text-[14px] transition-all whitespace-nowrap cursor-pointer border-b-2 ${activeTab === 'drinks' ? 'text-[#855400] border-[#ffa500] bg-[#fff8ed]' : 'text-[#534433] border-transparent hover:text-[#855400]'}`} 
          onClick={() => setActiveTab('drinks')}
        >
          Drinks
        </button>
      </div>

      {/* Menu Items Content */}
      {activeTab === 'main-course' && (
        <div className="space-y-6 max-h-[640px] overflow-y-auto menu-scrollbar pr-2">
          {mainCourses.map(renderItemCard)}
        </div>
      )}

      {activeTab === 'drinks' && (
        <div className="space-y-6 max-h-[640px] overflow-y-auto menu-scrollbar pr-2">
          {drinks.map(renderItemCard)}
        </div>
      )}

      {/* Recipe Modal */}
      {selectedRecipeItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white rounded-2xl w-full max-w-[480px] overflow-hidden border border-[#d9c3ac] shadow-2xl flex flex-col max-h-[90vh]">
            {/* Header - Photo Kept As Is */}
            <div className="relative h-48 bg-gray-100 flex-shrink-0">
              <img 
                alt={selectedRecipeItem.name} 
                className="w-full h-full object-cover" 
                src={selectedRecipeItem.img} 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
              <button 
                onClick={() => setSelectedRecipeItem(null)}
                className="absolute top-4 right-4 bg-black/40 hover:bg-black/60 text-white w-8 h-8 rounded-full flex items-center justify-center backdrop-blur-md transition-colors cursor-pointer border border-white/10"
              >
                ✕
              </button>
              <div className="absolute bottom-4 left-5 right-5 text-left">
                <div className="flex items-center gap-1.5 mb-1 flex-wrap">
                  <span className="flex-shrink-0 flex items-center justify-center w-3.5 h-3.5 border border-white p-[1.5px] bg-white rounded-sm">
                    <div className={`w-full h-full rounded-full ${selectedRecipeItem.veg ? 'bg-green-600' : 'bg-red-600'}`}></div>
                  </span>
                  <span className="text-[10px] uppercase tracking-wider text-amber-400 font-extrabold">{selectedRecipeItem.kcal}</span>
                </div>
                <h3 className="font-bold text-white text-[20px] sm:text-[22px] leading-tight drop-shadow-sm">{selectedRecipeItem.name}</h3>
              </div>
            </div>
            {/* Content */}
            <div className="p-5 overflow-y-auto flex-grow text-left space-y-4">
              <div>
                <h4 className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-[#855400] mb-1">Description</h4>
                <p className="text-xs sm:text-sm font-semibold text-gray-700 leading-relaxed">{selectedRecipeItem.description}</p>
              </div>

              {/* Ingredients Section */}
              <div className="border-t border-gray-100 pt-3">
                <h4 className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-[#855400] mb-2">Ingredients</h4>
                <div className="flex flex-wrap gap-1.5">
                  {selectedRecipeItem.ingredients.split(', ').map((ing, idx) => (
                    <span key={idx} className="px-2.5 py-1 bg-[#fff8ed] border border-[#d9c3ac]/30 rounded-full text-[10px] sm:text-xs font-semibold text-[#855400]">
                      {ing}
                    </span>
                  ))}
                </div>
              </div>

              {/* Preparation / Recipe Steps Section */}
              <div className="border-t border-gray-100 pt-3">
                <h4 className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-[#855400] mb-2">Chef's Recipe & Preparation</h4>
                <ol className="space-y-2.5">
                  {selectedRecipeItem.recipe.split('. ').map((step, idx) => step && (
                    <li key={idx} className="flex gap-2.5 items-start text-[11px] sm:text-xs font-semibold text-gray-600 leading-relaxed">
                      <span className="flex-shrink-0 w-5 h-5 rounded-full bg-[#FFA500]/10 text-[#855400] flex items-center justify-center font-bold text-[10px] mt-0.5">{idx + 1}</span>
                      <span>{step.trim()}</span>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
            {/* Footer */}
            <div className="p-4 bg-gray-50 border-t border-gray-100 flex items-center justify-between flex-shrink-0">
              <span className="font-extrabold text-[#855400] text-base sm:text-lg">{selectedRecipeItem.price}</span>
              <button 
                onClick={() => setSelectedRecipeItem(null)}
                className="px-5 py-2 bg-[#FFA500] hover:bg-orange-600 text-white rounded-lg text-xs font-bold shadow-sm transition-colors cursor-pointer"
              >
                Close Recipe
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
