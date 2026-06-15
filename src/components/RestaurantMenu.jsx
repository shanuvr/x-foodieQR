import React, { useState } from 'react';

export default function RestaurantMenu({ onAddItem, onDownloadRegister }) {
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
      img: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&w=600&q=80',
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
      img: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&w=600&q=80',
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
      img: 'https://images.unsplash.com/photo-1545247181-516773cae72d?auto=format&fit=crop&w=600&q=80',
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
      img: 'https://images.unsplash.com/photo-1536935338788-846bb9981813?auto=format&fit=crop&w=600&q=80',
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
      img: 'https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?auto=format&fit=crop&w=600&q=80',
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
      img: 'https://images.unsplash.com/photo-1523362628745-0c100150b504?auto=format&fit=crop&w=600&q=80',
      ingredients: 'Natural spring sparkling mineral water, fresh Meyer lemon',
      recipe: 'Chill natural spring sparkling mineral water to 4°C. Pour into a clean, dry highball glass to preserve carbonation. Garnish with a fresh thin slice of Meyer lemon and serve immediately.'
    }
  ];

  const handleDownloadMenu = () => {
    const printWindow = window.open('', '_blank');
    if (!printWindow) {
      alert('Please allow popups to download/print the menu.');
      return;
    }

    const mainCoursesHtml = mainCourses.map(item => `
      <div class="menu-card">
        <img class="menu-img" src="${item.img}" alt="${item.name}" />
        <div class="menu-details">
          <div>
            <div class="menu-header">
              <span class="menu-name">
                <span class="veg-badge ${item.veg ? 'veg' : 'non-veg'}"></span>
                ${item.name}
              </span>
              <span class="menu-price">${item.price}</span>
            </div>
            <div class="menu-badges">
              <span class="badge badge-kcal">${item.kcal}</span>
              <span class="badge ${item.spice ? 'badge-spice' : 'badge-mild'}">${item.spice ? item.spice + ' Spice' : 'Mild'}</span>
            </div>
          </div>
          <p class="menu-desc">${item.description}</p>
        </div>
      </div>
    `).join('');

    const drinksHtml = drinks.map(item => `
      <div class="menu-card">
        <img class="menu-img" src="${item.img}" alt="${item.name}" />
        <div class="menu-details">
          <div>
            <div class="menu-header">
              <span class="menu-name">
                <span class="veg-badge veg"></span>
                ${item.name}
              </span>
              <span class="menu-price">${item.price}</span>
            </div>
            <div class="menu-badges">
              <span class="badge badge-kcal">${item.kcal}</span>
              <span class="badge badge-mild">Mild</span>
            </div>
          </div>
          <p class="menu-desc">${item.description}</p>
        </div>
      </div>
    `).join('');

    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
      <head>
        <title>Novotel Signature Restaurant Menu</title>
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;600;700;800&display=swap');
          
          /* Set print page dimension rules */
          @page {
            size: A4 portrait;
            margin: 12mm 15mm;
          }

          /* Force colors & backgrounds in print */
          * {
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
            box-sizing: border-box;
          }

          body {
            font-family: 'Outfit', sans-serif;
            color: #212529;
            background-color: #faf8f5;
            padding: 20px;
            margin: 0 auto;
            max-width: 800px;
            min-height: 100vh;
            width: 100%;
          }

          .menu-border-frame {
            border: 4px double #d9c3ac;
            padding: 24px;
            border-radius: 16px;
            background-color: #ffffff;
            box-shadow: 0 4px 20px rgba(0,0,0,0.02);
            width: 100%;
          }

          .header {
            text-align: center;
            border-bottom: 2px solid #ffa500;
            padding-bottom: 20px;
            margin-bottom: 30px;
            position: relative;
          }

          .header h1 {
            font-size: 34px;
            font-weight: 800;
            color: #855400;
            margin: 0 0 6px 0;
            letter-spacing: 1px;
            text-transform: uppercase;
          }

          .header p {
            color: #534433;
            font-weight: 600;
            font-size: 13px;
            margin: 0;
            letter-spacing: 0.5px;
          }

          .section-title {
            font-size: 18px;
            font-weight: 800;
            color: #855400;
            border-bottom: 2px solid #fff8ed;
            padding-bottom: 8px;
            margin: 30px 0 20px 0;
            text-transform: uppercase;
            letter-spacing: 1.5px;
            display: flex;
            align-items: center;
            gap: 10px;
          }

          .section-title::after {
            content: '';
            flex-grow: 1;
            height: 1.5px;
            background: linear-gradient(to right, #d9c3ac, transparent);
          }

          .grid {
            display: grid !important;
            grid-template-cols: repeat(2, 1fr) !important;
            gap: 20px !important;
            width: 100% !important;
          }

          .menu-card {
            display: flex !important;
            gap: 12px !important;
            background-color: #fff8ed !important;
            border: 1px solid #ebd9c3 !important;
            border-radius: 12px !important;
            padding: 12px !important;
            box-shadow: 0 4px 12px rgba(133, 84, 0, 0.03) !important;
            page-break-inside: avoid !important;
            height: 120px !important;
            width: 100% !important;
          }

          .menu-img {
            width: 90px !important;
            height: 90px !important;
            object-fit: cover !important;
            border-radius: 8px !important;
            flex-shrink: 0 !important;
            border: 1px solid #ebd9c3 !important;
            background-color: #f7f5f2 !important;
          }

          .menu-details {
            display: flex !important;
            flex-direction: column !important;
            justify-content: space-between !important;
            flex-grow: 1 !important;
            min-width: 0 !important;
          }

          .menu-header {
            display: flex !important;
            justify-content: space-between !important;
            align-items: flex-start !important;
            gap: 8px !important;
          }

          .menu-name {
            font-weight: 700 !important;
            font-size: 14px !important;
            color: #212529 !important;
            display: inline-flex !important;
            align-items: center !important;
            gap: 6px !important;
            line-height: 1.2 !important;
          }

          .veg-badge {
            width: 13px !important;
            height: 13px !important;
            border: 2px solid #28a745 !important;
            display: inline-flex !important;
            align-items: center !important;
            justify-content: center !important;
            border-radius: 3px !important;
            flex-shrink: 0 !important;
          }

          .veg-badge::after {
            content: '' !important;
            width: 5px !important;
            height: 5px !important;
            border-radius: 50% !important;
            background-color: #28a745 !important;
          }

          .veg-badge.non-veg {
            border-color: #dc3545 !important;
          }

          .veg-badge.non-veg::after {
            background-color: #dc3545 !important;
          }

          .menu-price {
            font-weight: 800 !important;
            color: #855400 !important;
            font-size: 14px !important;
            flex-shrink: 0 !important;
          }

          .menu-badges {
            display: flex !important;
            gap: 5px !important;
            margin-top: 4px !important;
          }

          .badge {
            font-size: 8px !important;
            font-weight: 700 !important;
            padding: 2px 6px !important;
            border-radius: 4px !important;
            text-transform: uppercase !important;
            letter-spacing: 0.5px !important;
          }

          .badge-kcal {
            background-color: #f1f3f5 !important;
            border: 1px solid #dee2e6 !important;
            color: #495057 !important;
          }

          .badge-spice {
            background-color: #fff0f6 !important;
            border: 1px solid #ffdeeb !important;
            color: #d6336c !important;
          }

          .badge-mild {
            background-color: #e6f7ff !important;
            border: 1px solid #bae7ff !important;
            color: #096dd9 !important;
          }

          .menu-desc {
            font-size: 10px !important;
            color: #534433 !important;
            margin: 4px 0 0 0 !important;
            line-height: 1.3 !important;
            display: -webkit-box !important;
            -webkit-line-clamp: 2 !important;
            -webkit-box-orient: vertical !important;
            overflow: hidden !important;
          }

          @media print {
            body {
              padding: 0 !important;
              background-color: #ffffff !important;
              margin: 0 auto !important;
            }
            .menu-border-frame {
              box-shadow: none !important;
              border-color: #ebd9c3 !important;
              padding: 20px !important;
            }
            .grid {
              display: grid !important;
              grid-template-cols: repeat(2, 1fr) !important;
              gap: 20px !important;
              width: 100% !important;
            }
          }
        </style>
      </head>
      <body>
        <div class="menu-border-frame">
          <div class="header">
            <h1>NOVOTEL SIGNATURE RESTAURANT</h1>
            <p>HITEC City, Kondapur, Hyderabad, India</p>
          </div>

          <div class="section-title">Main Courses</div>
          <div class="grid">
            ${mainCoursesHtml}
          </div>

          <div class="section-title">Drinks</div>
          <div class="grid">
            ${drinksHtml}
          </div>
        </div>

        <script>
          window.onload = function() {
            const images = Array.from(document.querySelectorAll('img'));
            let loadedCount = 0;
            let printTriggered = false;

            function triggerPrint() {
              if (printTriggered) return;
              printTriggered = true;
              window.print();
            }

            // Fallback timeout of 3.5 seconds
            const timeoutId = setTimeout(triggerPrint, 3500);

            function checkAllLoaded() {
              loadedCount++;
              if (loadedCount === images.length) {
                clearTimeout(timeoutId);
                setTimeout(triggerPrint, 500);
              }
            }

            if (images.length === 0) {
              triggerPrint();
            } else {
              images.forEach(img => {
                if (img.complete) {
                  checkAllLoaded();
                } else {
                  img.addEventListener('load', checkAllLoaded);
                  img.addEventListener('error', checkAllLoaded);
                }
              });
            }
          };
        </script>
      </body>
      </html>
    `);
    printWindow.document.close();
  };

  React.useEffect(() => {
    if (onDownloadRegister) {
      onDownloadRegister(() => handleDownloadMenu);
    }
    return () => {
      if (onDownloadRegister) {
        onDownloadRegister(null);
      }
    };
  }, [onDownloadRegister]);

  const renderItemCard = (item) => (
    <div key={item.id} className="w-full flex items-center gap-3 sm:gap-6 bg-white p-3 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow group min-w-0 h-[115px] sm:h-[135px]">
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
          {/* Row 1: Title & Type Indicator */}
          <div className="flex items-center gap-2 mb-1">
            <div className={`flex-shrink-0 flex items-center justify-center w-3.5 h-3.5 sm:w-4 sm:h-4 border-2 ${item.veg ? 'border-green-600' : 'border-red-600'} p-[1.5px] sm:p-[2px]`}>
              <div className={`w-full h-full rounded-full ${item.veg ? 'bg-green-600' : 'bg-red-600'}`}></div>
            </div>
            <h3 className="font-bold text-[#212529] text-[13px] sm:text-[16px] leading-tight truncate flex-grow">{item.name}</h3>
          </div>

          {/* Row 2: Consistent Badges (Calories & Spice) */}
          <div className="flex items-center gap-1.5 mb-1">
            <span className="text-[8px] sm:text-[9px] text-gray-500 font-bold bg-slate-50 border border-slate-100 px-1.5 py-0.5 rounded leading-none shrink-0">
              {item.kcal}
            </span>
            <span className={`text-[8px] sm:text-[9px] font-bold px-1.5 py-0.5 rounded leading-none shrink-0 border ${
              item.spice 
                ? 'text-orange-600 bg-orange-50 border-orange-100' 
                : 'text-slate-400 bg-slate-50 border-slate-100'
            }`}>
              {item.spice ? `${item.spice} Spice` : 'Mild'}
            </span>
          </div>

          {/* Row 3: Description (Truncated to exactly 1 line for perfect alignment) */}
          <p className="text-[10px] sm:text-[11px] font-normal text-[#534433] truncate leading-normal">{item.description}</p>
        </div>
        
        {/* Row 4: Bottom Action Button */}
        <div className="flex items-center">
          <button 
            onClick={() => setSelectedRecipeItem(item)}
            className="px-2 py-0.5 sm:px-2.5 sm:py-1 rounded bg-[#fff8ed] border border-orange-100 text-[#855400] text-[9px] sm:text-[10px] font-bold hover:bg-[#855400] hover:text-white transition-colors cursor-pointer active:scale-95 whitespace-nowrap"
          >
            View Recipe
          </button>
        </div>
      </div>
      
      {/* Right Column: Price & Add Button */}
      <div className="flex flex-col items-end justify-between flex-shrink-0 pl-1.5 sm:pl-4 border-l border-gray-100 self-stretch py-0.5">
        <span className="font-extrabold text-[#855400] text-xs sm:text-base whitespace-nowrap">{item.price}</span>
        <button 
          onClick={() => onAddItem && onAddItem(item)}
          className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#FFA500] text-white flex items-center justify-center hover:bg-[#e69500] transition-colors shadow-sm cursor-pointer mt-auto"
        >
          <svg className="w-4 h-4 sm:w-5 sm:h-5 text-white" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Category Navigation Tabs */}
      <div className="flex border-b border-gray-200 mb-6 overflow-x-auto scrollbar-none" id="menu">
        <button 
          className={`px-4 sm:px-12 py-2 sm:py-3 font-bold text-xs sm:text-[14px] transition-all whitespace-nowrap cursor-pointer border-b-2 ${activeTab === 'main-course' ? 'text-[#855400] border-[#ffa500] bg-[#fff8ed]' : 'text-[#534433] border-transparent hover:text-[#855400]'}`} 
          onClick={() => setActiveTab('main-course')}
        >
          Main Course
        </button>
        <button 
          className={`px-4 sm:px-12 py-2 sm:py-3 font-bold text-xs sm:text-[14px] transition-all whitespace-nowrap cursor-pointer border-b-2 ${activeTab === 'drinks' ? 'text-[#855400] border-[#ffa500] bg-[#fff8ed]' : 'text-[#534433] border-transparent hover:text-[#855400]'}`} 
          onClick={() => setActiveTab('drinks')}
        >
          Drinks
        </button>
      </div>

      {/* Menu Items Content */}
      {activeTab === 'main-course' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-[640px] overflow-y-auto menu-scrollbar pr-2 py-1">
          {mainCourses.map(renderItemCard)}
        </div>
      )}

      {activeTab === 'drinks' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-[640px] overflow-y-auto menu-scrollbar pr-2 py-1">
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
