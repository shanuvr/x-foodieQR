import React, { useState, useMemo, useEffect } from "react";
import { useLocation } from "react-router-dom";
import {
    FaFire,
    FaTimes,
    FaHeart,
    FaRegHeart,
    FaStar,
    FaRegStar,
    FaClock,
    FaUsers,
    FaInstagram,
    FaFacebookF,
    FaWhatsapp,
    FaUtensils,
    FaCoffee,
    FaBeer
} from "react-icons/fa";
import { GiCupcake, GiTeapot, GiChiliPepper } from "react-icons/gi";
import "./testTemplate2.css";



// Fallback categories and menu items
const FALLBACK_CATEGORIES = ["Burgers", "Sides", "Drinks"];

const FALLBACK_ITEMS = [
    {
        id: 1,
        category: "Burgers",
        name: "CLASSIC BURGER",
        price: 10,
        veg: false,
        egg: true,
        calories: 520,
        prepTime: 12,
        image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd",
        description: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore.",
        spice: 3,
        recipe: "Season a beef patty with salt and pepper. Grill on high heat for 4 minutes each side. Toast the brioche bun, layer with lettuce, tomato, pickles, and cheese. Top with signature house sauce."
    },
    {
        id: 2,
        category: "Burgers",
        name: "CHEEDAR BURGER",
        price: 10,
        veg: false,
        calories: 540,
        prepTime: 12,
        image: "https://images.unsplash.com/photo-1550547660-d9450f859349",
        description: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore.",
        spice: 1,
        recipe: "Press fresh beef into a thick patty. Cook on a cast iron skillet until juices run clear. Melt double cheddar on top, place in a buttered bun with caramelised onions and mustard."
    },
    {
        id: 3,
        category: "Burgers",
        name: "DOUBLE CHEESE BURGER",
        price: 10,
        veg: false,
        calories: 680,
        prepTime: 15,
        image: "https://images.unsplash.com/photo-1586190848861-99aa4a171e90",
        description: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore.",
        spice: 3,
        recipe: "Stack two smash patties on a hot griddle. Add a slice of American cheese to each patty right off the heat. Assemble in a toasted sesame bun with pickles, diced onion, and smoky mayo."
    },
    {
        id: 4,
        category: "Burgers",
        name: "DOUBLE MEAT BURGER",
        price: 10,
        veg: false,
        calories: 740,
        prepTime: 15,
        image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38",
        description: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore.",
        spice: 5,
        recipe: "Grill two seasoned beef patties with jalapeño slices. Layer on a brioche bun with ghost pepper sauce, crispy fried onions, and extra pickles. Handle with heat-proof gloves — it's fiery!"
    },
    {
        id: 5,
        category: "Burgers",
        name: "SPECIAL BURGER",
        price: 10,
        veg: false,
        calories: 580,
        prepTime: 14,
        image: "https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5",
        description: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore.",
        spice: 2,
        recipe: "Marinate chicken overnight in buttermilk and herbs. Coat in seasoned flour and deep fry until golden. Serve in a pretzel bun with slaw, sriracha mayo, and dill pickles."
    },
    {
        id: 6,
        category: "Burgers",
        name: "PREMIUM BURGER",
        price: 10,
        veg: false,
        calories: 610,
        prepTime: 13,
        image: "https://images.unsplash.com/photo-1521305916504-4a1121188589",
        description: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore.",
        spice: 1,
        recipe: "Use a wagyu beef blend patty cooked medium. Top with brie cheese, truffle aioli, and caramelised figs. Serve in a brioche bun lightly toasted with herb butter."
    },
    {
        id: 7,
        category: "Sides",
        name: "CRISPY FRENCH FRIES",
        price: 5,
        veg: true,
        calories: 320,
        prepTime: 8,
        image: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877",
        description: "Golden crispy skin-on potato fries, lightly salted and served with dipping sauce.",
        spice: 4,
        recipe: "Cut potatoes into thin strips, soak in cold water for 30 mins. Double-fry at 160°C then 190°C for maximum crunch. Season immediately with chilli salt and toss with crushed red pepper."
    },
    {
        id: 8,
        category: "Drinks",
        name: "ICE COLD COLA",
        price: 3,
        veg: true,
        calories: 140,
        prepTime: 2,
        image: "https://images.unsplash.com/photo-1622483767028-3f66f32aef97",
        description: "Refreshing carbonated cola served over a glass of crushed ice."
    }
];

function TestTemplate2() {
    const location = useLocation();
    const routeState = location.state || {};

    const menuTitle = routeState.menuTitle || "BURGERS MENU";
    const menuSubtitle = routeState.menuSubtitle || "Premium Dine-in & Delivery";



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

    const [activeCategory, setActiveCategory] = useState(
        () => categories[0] || "Burgers"
    );

    const [selectedItem, setSelectedItem] = useState(null);
    const [likedItems, setLikedItems] = useState({});

    useEffect(() => {
        if (!categories.includes(activeCategory)) {
            setActiveCategory(categories[0] || "Burgers");
        }
    }, [categories, activeCategory]);

    const toggleLike = (e, id) => {
        e.stopPropagation();
        setLikedItems(prev => ({ ...prev, [id]: !prev[id] }));
    };

    const filteredItems = menuItems.filter((item) => item.category === activeCategory);

    // Extract large circular images from active items
    const circleImages = useMemo(() => {
        const imgs = [];
        filteredItems.forEach(item => {
            if (item.image && imgs.length < 2) {
                imgs.push(item.image);
            }
        });
        if (imgs.length < 2) {
            menuItems.forEach(item => {
                if (item.image && !imgs.includes(item.image) && imgs.length < 2) {
                    imgs.push(item.image);
                }
            });
        }
        while (imgs.length < 2) {
            imgs.push("https://images.unsplash.com/photo-1568901346375-23c9450c58cd");
        }
        return imgs;
    }, [filteredItems, menuItems]);

    // Sub-components for badges
    const SweetnessStars = ({ level }) => (
        <span className="t2-sweetness">
            {[1, 2, 3, 4, 5].map(i =>
                i <= level
                    ? <FaStar key={i} className="t2-star-filled" />
                    : <FaRegStar key={i} className="t2-star-empty" />
            )}
        </span>
    );

    const SpiceIndicator = ({ level, large = false }) => {
        if (level === 0 || level === undefined) return null;
        const chiliColors = ["", "#10b981", "#3b82f6", "#f59e0b", "#f97316", "#ef4444"];
        return (
            <span className={`t2-chili-row ${large ? "t2-chili-lg" : ""}`}>
                {[1, 2, 3, 4, 5].map(i => (
                    <GiChiliPepper
                        key={i}
                        className="t2-chili-icon"
                        style={{
                            color: i <= level ? chiliColors[level] : "#d1d5db",
                            fontSize: large ? "22px" : "14px"
                        }}
                    />
                ))}
            </span>
        );
    };

    return (
        <div className="t2-page">
            <div className="t2-container">
                {/* Header Section */}
                <header className="t2-header">
                    <div className="t2-header-left">
                        <h1 className="t2-title">{menuTitle}</h1>
                        <p className="t2-subtitle">{menuSubtitle}</p>
                    </div>
                    <div className="t2-header-right">
                        <div className="t2-logo-icon-wrapper">
                            <FaUtensils className="t2-header-icon" />
                        </div>
                        {/* Decorative Dot Grid */}
                        <div className="t2-dot-grid">
                            {Array(24).fill(0).map((_, i) => (
                                <span key={i} className="t2-decor-dot"></span>
                            ))}
                        </div>
                    </div>
                </header>

                {/* Decorative Mid-Bar */}
                <div className="t2-decor-bar">
                    <div className="t2-decor-circles">
                        <span>○</span>
                        <span>○</span>
                        <span>○</span>
                        <span>○</span>
                    </div>
                    <div className="t2-decor-arrows">
                        <span>▶</span>
                        <span>▶</span>
                        <span>▶</span>
                    </div>
                </div>

                {/* Category navigation tabs */}
                <nav className="t2-nav">
                    {categories.map((category) => (
                        <button
                            key={category}
                            className={`t2-nav-btn ${activeCategory === category ? "t2-active" : ""}`}
                            onClick={() => setActiveCategory(category)}
                        >
                            {category}
                        </button>
                    ))}
                </nav>

                {/* Main Content Layout */}
                <div className="t2-content-layout">
                    {/* Left Column: Menu Items */}
                    <div className="t2-items-column">
                        {filteredItems.length === 0 ? (
                            <p className="t2-empty-msg">No dishes listed here yet.</p>
                        ) : (
                            filteredItems.map((item) => (
                                <div className="t2-menu-item" key={item.id} onClick={() => setSelectedItem(item)}>
                                    <div className="t2-item-header">
                                        <h3 className="t2-item-name">{item.name}</h3>
                                        <span className="t2-item-price">₹{item.price}</span>
                                    </div>
                                    <p className="t2-item-desc">{item.description}</p>
                                    
                                    {/* Badges / Calories / Prep time row */}
                                    <div className="t2-item-bottom">
                                        <div className="t2-item-tags">
                                            {/* Veg / Non-Veg Badge */}
                                            {item.veg !== undefined && (
                                                <span className={`t2-tag ${item.veg ? "t2-veg" : "t2-nonveg"}`}>
                                                    {item.veg ? "Veg" : "Non-Veg"}
                                                </span>
                                            )}

                                            {/* Egg / Eggless Badge */}
                                            {item.egg !== undefined && (
                                                <span className={item.egg ? "t2-tag t2-egg" : "t2-tag t2-eggless"}>
                                                    {item.egg ? "Egg" : "Eggless"}
                                                </span>
                                            )}

                                            {/* Prep time Badge */}
                                            {item.prepTime !== undefined && (
                                                <span className="t2-chip">
                                                    <FaClock /> {item.prepTime} min
                                                </span>
                                            )}

                                            {/* Serves Badge */}
                                            {item.serves !== undefined && (
                                                <span className="t2-chip">
                                                    <FaUsers /> Serves {item.serves}
                                                </span>
                                            )}

                                            {/* Sweetness Badge */}
                                            {item.sweetness !== undefined && (
                                                <SweetnessStars level={item.sweetness} />
                                            )}

                                            {/* Spice Level */}
                                            {item.spice !== undefined && (
                                                <SpiceIndicator level={item.spice} />
                                            )}

                                            {/* Calories Badge */}
                                            {item.calories !== undefined && (
                                                <span className="t2-item-calories">
                                                    <FaFire /> {item.calories} kcal
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                    
                                    {/* Fixed Bottom Buttons */}
                                    <div style={{ marginTop: '12px', display: 'flex', gap: '10px' }}>
                                        <button 
                                            style={{ flex: 1, padding: '6px 12px', borderRadius: '4px', border: 'none', backgroundColor: 'var(--primary-color)', color: '#000000', fontSize: '0.8rem', fontWeight: '700', cursor: 'pointer', transition: 'opacity 0.2s' }} 
                                            onClick={(e) => { e.stopPropagation(); console.log('Add to Cart clicked'); }}
                                            onMouseOver={(e) => e.target.style.opacity = '0.85'}
                                            onMouseOut={(e) => e.target.style.opacity = '1'}
                                        >
                                            Add to Cart
                                        </button>
                                        {(item.recipe || item.ingredients) && (
                                            <button 
                                                style={{ flex: 1, padding: '6px 12px', borderRadius: '4px', border: '1px solid var(--border-color)', backgroundColor: 'rgba(255, 255, 255, 0.05)', color: 'var(--primary-color)', fontSize: '0.8rem', fontWeight: '700', cursor: 'pointer', transition: 'all 0.2s ease' }} 
                                                onClick={(e) => { e.stopPropagation(); setSelectedItem(item); }}
                                                onMouseOver={(e) => { e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.1)'; e.target.style.borderColor = 'var(--primary-color)'; }}
                                                onMouseOut={(e) => { e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.05)'; e.target.style.borderColor = 'var(--border-color)'; }}
                                            >
                                                View Recipe
                                            </button>
                                        )}
                                    </div>
                                </div>
                            ))
                        )}
                    </div>

                    {/* Right Column: Dynamic Circular Images */}
                    <div className="t2-images-column">
                        <div className="t2-circle-image-box">
                            <img src={circleImages[0]} alt="circular food visual 1" className="t2-circle-img" />
                        </div>
                        <div className="t2-circle-image-box">
                            <img src={circleImages[1]} alt="circular food visual 2" className="t2-circle-img" />
                        </div>
                    </div>
                </div>

                {/* Footer Section */}
                <footer className="t2-footer">
                    <div className="t2-footer-left">
                        <span className="t2-footer-delivery-label">DELIVERY</span>
                        <span className="t2-footer-delivery-phone">+210 555 4141</span>
                        <div className="t2-footer-line-dots"></div>
                    </div>
                    <div className="t2-footer-right">
                        <span className="t2-footer-website">www.foodieqr.com</span>
                        <div className="t2-social-icons">
                            <a href="#instagram" className="t2-social-icon"><FaInstagram /></a>
                            <a href="#facebook" className="t2-social-icon"><FaFacebookF /></a>
                            <a href="#whatsapp" className="t2-social-icon"><FaWhatsapp /></a>
                        </div>
                    </div>
                </footer>
                
                {/* Yellow Arc Decoration at bottom */}
                <div className="t2-bottom-arc-decor"></div>
            </div>

            {/* Popup details modal */}
            {selectedItem && (
                <div className="t2-modal-overlay" onClick={() => setSelectedItem(null)}>
                    <div className="t2-modal" style={{ backgroundColor: '#ffffff', color: '#1f2937' }} onClick={(e) => e.stopPropagation()}>
                        <button className="t2-modal-close" style={{ backgroundColor: '#f3f4f6', color: '#1f2937', border: '1px solid #e5e7eb' }} onClick={() => setSelectedItem(null)}><FaTimes /></button>
                        <div className="t2-modal-content" style={{ padding: '24px' }}>
                            <div className="t2-modal-details" style={{ padding: 0 }}>
                                <h2 style={{ marginBottom: '20px', borderBottom: '1px solid #e5e7eb', paddingBottom: '12px', color: '#1f2937' }}>{selectedItem.name}</h2>
                                
                                {selectedItem.ingredients && (
                                    <div className="t2-modal-section" style={{ borderTop: 'none', paddingTop: 0 }}>
                                        <h3 style={{ color: '#111827', fontWeight: '700' }}>Ingredients</h3>
                                        <p style={{ color: '#4b5563' }}>{selectedItem.ingredients}</p>
                                    </div>
                                )}
                                
                                {selectedItem.recipe && (
                                    <div className="t2-modal-section" style={selectedItem.ingredients ? { borderTop: '1px solid #e5e7eb', paddingTop: '15px' } : { borderTop: 'none', paddingTop: 0 }}>
                                        <h3 style={{ color: '#111827', fontWeight: '700' }}>Recipe</h3>
                                        <p style={{ color: '#4b5563' }}>{selectedItem.recipe}</p>
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

export default TestTemplate2;
