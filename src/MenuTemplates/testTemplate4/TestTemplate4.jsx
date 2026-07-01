import React, { useState, useMemo, useEffect } from "react";
import { useLocation } from "react-router-dom";
import {
    FaFire,
    FaShoppingCart,
    FaTimes,
    FaHeart,
    FaRegHeart,
    FaStar,
    FaRegStar,
    FaClock,
    FaUsers
} from "react-icons/fa";
import { GiChiliPepper } from "react-icons/gi";
import "./testTemplate4.css";

// Fallback categories and menu items
const FALLBACK_CATEGORIES = ["Breakfast", "Salads", "Main", "Drink", "Juice", "Smoothies"];

const FALLBACK_ITEMS = [
    {
        id: 1,
        category: "Breakfast",
        name: "Eggs benedict",
        price: 5,
        veg: false,
        egg: true,
        calories: 320,
        prepTime: 10,
        image: "https://images.unsplash.com/photo-1608039829572-78524f79c4c7",
        description: "Classic eggs benedict with hollandaise sauce, poached eggs, and English muffins.",
        recipe: "1. Poach the eggs. 2. Toast the English muffins. 3. Prepare hollandaise sauce. 4. Assemble with ham or bacon."
    },
    {
        id: 2,
        category: "Breakfast",
        name: "Waffle fresh berries",
        price: 6,
        veg: true,
        egg: true,
        calories: 280,
        prepTime: 8,
        image: "https://images.unsplash.com/photo-1562376502-6f769499c886",
        description: "Freshly made waffles topped with fresh strawberries, blueberries, and maple syrup."
    },
    {
        id: 3,
        category: "Breakfast",
        name: "Porridge with cherries",
        price: 7,
        veg: true,
        calories: 210,
        prepTime: 5,
        image: "https://images.unsplash.com/photo-1517686469429-8faf88b9f7af",
        description: "Warm oatmeal porridge cooked in almond milk, topped with glazed cherries."
    },
    {
        id: 4,
        category: "Breakfast",
        name: "Poached egg sandwiches",
        price: 5,
        veg: false,
        egg: true,
        calories: 290,
        prepTime: 7,
        image: "https://images.unsplash.com/photo-1525351484163-7529414344d8",
        description: "Whole wheat toast with sliced avocado and soft poached eggs."
    },
    {
        id: 5,
        category: "Salads",
        name: "Poke salad",
        price: 5,
        veg: false,
        calories: 310,
        prepTime: 12,
        image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c",
        description: "Fresh salmon poke bowl with edamame, cucumber, and spicy mayo."
    },
    {
        id: 6,
        category: "Salads",
        name: "Salmon salad",
        price: 5,
        veg: false,
        calories: 290,
        prepTime: 10,
        image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd",
        description: "Grilled salmon over organic mixed greens with olive oil dressing."
    },
    {
        id: 7,
        category: "Main",
        name: "Lasagna",
        price: 10,
        veg: false,
        calories: 650,
        prepTime: 20,
        image: "https://images.unsplash.com/photo-1574894709920-11b28e7367e3",
        description: "Classic Italian baked lasagna with rich beef ragu and creamy béchamel."
    },
    {
        id: 8,
        category: "Main",
        name: "Beef stew",
        price: 9,
        veg: false,
        calories: 580,
        prepTime: 25,
        spice: 3,
        image: "https://images.unsplash.com/photo-1547592165-e1d17ffd760c",
        description: "Slow-cooked tender beef with carrots, potatoes, and thick gravy."
    },
    {
        id: 9,
        category: "Drink",
        name: "Green tea",
        price: 4,
        veg: true,
        calories: 0,
        prepTime: 3,
        image: "https://images.unsplash.com/photo-1576092768241-dec231879fc3",
        description: "Brewed organic Japanese green tea."
    },
    {
        id: 10,
        category: "Juice",
        name: "Orange juice",
        price: 4,
        veg: true,
        calories: 120,
        prepTime: 3,
        image: "https://images.unsplash.com/photo-1621506289937-a8e4df240d0b",
        description: "Freshly squeezed sweet oranges."
    },
    {
        id: 11,
        category: "Smoothies",
        name: "Green smoothie",
        price: 6,
        veg: true,
        calories: 180,
        prepTime: 4,
        image: "https://images.unsplash.com/photo-1610970881699-44a5587caa90",
        description: "Blend of spinach, banana, pineapple, and coconut water."
    }
];

function TestTemplate4() {
    const location = useLocation();
    const routeState = location.state || {};

    const menuTitle = routeState.menuTitle || "Organic";
    const menuSubtitle = routeState.menuSubtitle || "Food menu";



    // Memoized categories & items
    const categories = useMemo(() => {
        if (Array.isArray(routeState.categories) && routeState.categories.length > 0) {
            return routeState.categories;
        }
        return FALLBACK_CATEGORIES;
    }, [routeState.categories]);

    const menuItems = useMemo(() => {
        if (Array.isArray(routeState.menuItems) && routeState.menuItems.length > 0) {
            return routeState.menuItems;
        }
        return FALLBACK_ITEMS;
    }, [routeState.menuItems]);

    const [selectedItem, setSelectedItem] = useState(null);
    const [likedItems, setLikedItems] = useState({});

    const toggleLike = (e, id) => {
        e.stopPropagation();
        setLikedItems(prev => ({ ...prev, [id]: !prev[id] }));
    };

    const [activeCategory, setActiveCategory] = useState(
        () => categories[0] || "Breakfast"
    );

    useEffect(() => {
        if (!categories.includes(activeCategory)) {
            setActiveCategory(categories[0] || "Breakfast");
        }
    }, [categories, activeCategory]);

    const filteredItems = useMemo(() => {
        return menuItems.filter(item => item.category === activeCategory);
    }, [menuItems, activeCategory]);

    const { leftItems, rightItems } = useMemo(() => {
        const half = Math.ceil(filteredItems.length / 2);
        return {
            leftItems: filteredItems.slice(0, half),
            rightItems: filteredItems.slice(half)
        };
    }, [filteredItems]);

    // Fixed decorative images — completely neutral, no meat, works for any outlet type
    // (veg restaurant, bakery, cafe, cloud kitchen, etc.)
    const sampleImages = [
        "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe", // Vibrant colorful veggie dish
        "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445"  // Elegant pancakes / baked styling
    ];

    // Hero image (First image in the menu)
    const heroImage = useMemo(() => {
        const item = menuItems.find(i => i.image);
        return item ? item.image : "https://images.unsplash.com/photo-1546069901-ba9599a7e63c";
    }, [menuItems]);

    const renderItemRow = (item) => {
        return (
            <div className="t4-item-row" key={item.id} onClick={() => setSelectedItem(item)}>
                <div className="t4-item-main">
                    <div className="t4-item-title-dots">
                        <span className="t4-item-name">{item.name}</span>
                        <span className="t4-dots"></span>
                        <span className="t4-item-price">₹{item.price}</span>
                    </div>
                    {item.description && (
                        <p className="t4-item-desc">{item.description}</p>
                    )}
                    
                    {/* Fixed Bottom Buttons */}
                    <div style={{ marginTop: '8px', display: 'flex', gap: '8px' }}>
                        <button 
                            style={{ flex: 1, padding: '4px 8px', borderRadius: '4px', border: 'none', backgroundColor: 'var(--primary-color)', color: '#ffffff', fontSize: '0.7rem', fontWeight: '600', cursor: 'pointer', transition: 'background-color 0.2s', textTransform: 'uppercase', letterSpacing: '0.5px', fontFamily: 'Montserrat, sans-serif' }} 
                            onClick={(e) => { e.stopPropagation(); console.log('Add to Cart clicked'); }}
                            onMouseOver={(e) => e.target.style.opacity = '0.9'}
                            onMouseOut={(e) => e.target.style.opacity = '1'}
                        >
                            Add to Cart
                        </button>
                        <button 
                            style={{ flex: 1, padding: '4px 8px', borderRadius: '4px', border: '1px solid var(--border-color)', backgroundColor: 'transparent', color: 'var(--primary-color)', fontSize: '0.7rem', fontWeight: '600', cursor: 'pointer', transition: 'all 0.2s ease', textTransform: 'uppercase', letterSpacing: '0.5px', fontFamily: 'Montserrat, sans-serif' }} 
                            onClick={(e) => { e.stopPropagation(); setSelectedItem(item); }}
                            onMouseOver={(e) => { e.target.style.backgroundColor = 'var(--accent-light)'; }}
                            onMouseOut={(e) => { e.target.style.backgroundColor = 'transparent'; }}
                        >
                            View Recipe
                        </button>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div className="t4-page">
            <div className="t4-container">
                {/* Hero Header Banner */}
                <header className="t4-header">
                    <div className="t4-hero-card">
                        <div className="t4-hero-img-box">
                            <img src={heroImage} alt="hero logo" className="t4-hero-img" />
                        </div>
                        <div className="t4-hero-text">
                            <h1 className="t4-title-cursive">{menuTitle}</h1>
                            <p className="t4-title-spaced">{menuSubtitle}</p>
                        </div>
                    </div>
                </header>

                {/* Category navigation tabs */}
                <nav className="t4-nav">
                    {categories.map((category) => (
                        <button
                            key={category}
                            className={`t4-nav-btn ${activeCategory === category ? "t4-active" : ""}`}
                            onClick={() => setActiveCategory(category)}
                        >
                            {category}
                        </button>
                    ))}
                </nav>

                {filteredItems.length === 0 ? (
                    <p className="t4-empty-menu" style={{ textAlign: 'center', color: 'var(--text-muted)', fontStyle: 'italic', padding: '40px 0' }}>
                        No items available in this category.
                    </p>
                ) : (
                    <div className="t4-category-section">
                        <div className="t4-category-header">
                            <h2>{activeCategory}</h2>
                        </div>
                        {/* Two Column Newspaper Layout */}
                        <div className="t4-newspaper-layout">
                            {/* Left Column */}
                            <div className="t4-column">
                                <div className="t4-item-list">
                                    {leftItems.map(item => renderItemRow(item))}
                                </div>
                            </div>

                            {/* Right Column */}
                            <div className="t4-column">
                                <div className="t4-item-list">
                                    {rightItems.map(item => renderItemRow(item))}
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Interactive detail popup */}
            {selectedItem && (
                <div className="t4-modal-overlay" onClick={() => setSelectedItem(null)}>
                    <div className="t4-modal" onClick={(e) => e.stopPropagation()}>
                        <button className="t4-modal-close" onClick={() => setSelectedItem(null)}><FaTimes /></button>
                        <div className="t4-modal-content" style={{ padding: '24px' }}>
                            <div className="t4-modal-details" style={{ padding: 0 }}>
                                <h2 style={{ marginBottom: '20px', borderBottom: '1px solid var(--border-color)', paddingBottom: '12px' }}>{selectedItem.name}</h2>
                                
                                {selectedItem.ingredients && (
                                    <div className="t4-modal-section" style={{ borderTop: 'none', paddingTop: 0 }}>
                                        <h3>Ingredients</h3>
                                        <p>{selectedItem.ingredients}</p>
                                    </div>
                                )}
                                
                                {selectedItem.recipe && (
                                    <div className="t4-modal-section" style={selectedItem.ingredients ? {} : { borderTop: 'none', paddingTop: 0 }}>
                                        <h3>Recipe</h3>
                                        <p>{selectedItem.recipe}</p>
                                    </div>
                                )}
                                
                                {(!selectedItem.recipe && !selectedItem.ingredients) && (
                                    <div className="t4-modal-section" style={{ borderTop: 'none', paddingTop: 0 }}>
                                        <p style={{ fontStyle: 'italic', color: '#6b7280' }}>Detailed recipe information is not available for this item.</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default TestTemplate4;
