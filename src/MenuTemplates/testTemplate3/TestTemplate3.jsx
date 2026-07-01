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
    FaCoffee,
    FaBeer,
    FaUtensils,
    FaGlassCheers,
    FaLeaf
} from "react-icons/fa";
import { GiCupcake, GiWheat, GiTeapot, GiChiliPepper } from "react-icons/gi";
// Mocking the missing backend integration for this template
const fetchTableMenuByToken = async () => { throw new Error("API not configured"); };
const mapTableMenuToTemplateState = () => ({});
import "./testTemplate3.css";


// Fallback categories and menu items
const FALLBACK_CATEGORIES = ["Specialties", "Drinks", "Snacks"];

const FALLBACK_ITEMS = [
    {
        id: 1,
        category: "Specialties",
        name: "Artisan Chocolate Cake",
        price: 750,
        veg: true,
        egg: false,
        calories: 380,
        sweetness: 4,
        prepTime: 15,
        serves: 2,
        image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587",
        description: "Rich dark chocolate cake layered with Belgian chocolate ganache.",
        ingredients: "Cocoa powder, flour, dark chocolate, fresh cream, butter.",
        recipe: "Melt dark chocolate with butter. Whisk eggs and sugar until fluffy, fold in the chocolate mixture and sifted flour. Bake at 175°C for 30 minutes. Finish with a glossy Belgian ganache drizzle."
    },
    {
        id: 2,
        category: "Specialties",
        name: "Classic Beef Burger",
        price: 240,
        veg: false,
        calories: 520,
        spice: 2,
        prepTime: 12,
        serves: 1,
        image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd",
        description: "Juicy beef patty grilled to perfection with cheddar cheese and fresh lettuce.",
        ingredients: "Beef patty, brioche bun, cheddar cheese, pickles, signature sauce.",
        recipe: "Season beef mince with salt, pepper, and Worcestershire sauce. Shape into a 180g patty. Grill on high for 4 min each side. Melt cheddar on top, assemble in a toasted brioche bun with pickles and house sauce."
    },
    {
        id: 3,
        category: "Drinks",
        name: "Iced Caramel Macchiato",
        price: 180,
        veg: true,
        calories: 140,
        sweetness: 3,
        prepTime: 5,
        serves: 1,
        image: "https://images.unsplash.com/photo-1517701604599-bb29b565090c",
        description: "Freshly brewed espresso poured over iced milk and sweet vanilla syrup, finished with caramel drizzle.",
        ingredients: "Espresso, whole milk, caramel sauce, vanilla syrup, ice."
    },
    {
        id: 4,
        category: "Snacks",
        name: "Paneer Tikka Roll",
        price: 160,
        veg: true,
        calories: 340,
        spice: 3,
        prepTime: 10,
        serves: 1,
        image: "https://images.unsplash.com/photo-1626700051175-6818013e1d4f",
        description: "Marinated paneer cooked in tandoor and wrapped in soft paratha with mint chutney.",
        ingredients: "Paneer cubes, paratha, capsicum, yogurt, spices, mint chutney.",
        recipe: "Marinate paneer cubes in hung yogurt, chilli powder, garam masala, and ginger-garlic paste for 2 hours. Grill in tandoor or on a grill pan until charred. Wrap in a warm paratha with sliced onions and mint chutney."
    }
];

const normalizeCategoryKey = (value) =>
    String(value || "")
        .trim()
        .toLowerCase();

function TestTemplate3() {
    const location = useLocation();
    const routeState = location.state || {};

    const menuTitle = routeState.menuTitle || "FoodieQR Outlet";
    const menuSubtitle = routeState.menuSubtitle || "Premium Dine-in & Delivery";

    const categories = useMemo(() => {
        if (Array.isArray(routeState.categories) && routeState.categories.length) {
            return routeState.categories;
        }
        return FALLBACK_CATEGORIES;
    }, [routeState.categories]);

    const menuItems = useMemo(() => {
        if (Array.isArray(routeState.menuItems) && routeState.menuItems.length) {
            return routeState.menuItems;
        }
        return FALLBACK_ITEMS;
    }, [routeState.menuItems]);

    const [activeCategory, setActiveCategory] = useState(
        () => categories[0] || "Specialties"
    );

    const [selectedItem, setSelectedItem] = useState(null);
    const [likedItems, setLikedItems] = useState({});

    useEffect(() => {
        const activeKey = normalizeCategoryKey(activeCategory);
        const hasActive = categories.some(
            (cat) => normalizeCategoryKey(cat) === activeKey
        );

        if (!hasActive) {
            setActiveCategory(categories[0] || "Specialties");
        }
    }, [categories, activeCategory]);

    const toggleLike = (e, id) => {
        e.stopPropagation();
        setLikedItems(prev => ({ ...prev, [id]: !prev[id] }));
    };

    const filteredItems = menuItems.filter(
        (item) =>
            normalizeCategoryKey(item.category) ===
            normalizeCategoryKey(activeCategory)
    );

    // Sub-components for dynamic badges
    const SweetnessStars = ({ level }) => (
        <span className="t3-sweetness">
            {[1, 2, 3, 4, 5].map(i =>
                i <= level
                    ? <FaStar key={i} className="t3-star-filled" />
                    : <FaRegStar key={i} className="t3-star-empty" />
            )}
        </span>
    );

    const SpiceIndicator = ({ level, large = false }) => {
        if (!level || level === 0) return null;
        return (
            <span className={`t3-chili-row ${large ? "t3-chili-lg" : ""}`}>
                {[1, 2, 3, 4, 5].map(i => (
                    <GiChiliPepper
                        key={i}
                        className="t3-chili-icon"
                        style={{
                            color: i <= level ? "#dc2626" : "#d1d5db",
                            fontSize: large ? "20px" : "13px"
                        }}
                    />
                ))}
            </span>
        );
    };

    return (
        <div className="t3-page">
            <div className="t3-container">
                <header className="t3-header">
                    <div className="t3-title-row">
                        <h1 className="t3-title">{menuTitle}</h1>
                        <div className="t3-logo-badge">
                            <FaUtensils className="t3-header-icon" />
                        </div>
                    </div>
                    <p className="t3-subtitle">{menuSubtitle}</p>
                    <div className="t3-header-line"></div>
                </header>

                <nav className="t3-nav">
                    {categories.map((category) => (
                        <button
                            key={category}
                            className={`t3-nav-btn ${activeCategory === category ? "t3-active" : ""}`}
                            onClick={() => setActiveCategory(category)}
                        >
                            {category}
                        </button>
                    ))}
                </nav>

                {filteredItems.length === 0 ? (
                    <p className="t3-empty-menu text-center text-muted py-5">
                        No dishes listed in this section yet.
                    </p>
                ) : (
                    <div className="t3-menu-list">
                        {filteredItems.map((item) => (
                            <div className="t3-menu-item" key={item.id} onClick={() => setSelectedItem(item)}>
                                <div className="t3-item-img-box">
                                    <img src={item.image} alt={item.name} className="t3-item-thumbnail" />
                                </div>
                                <div className="t3-item-info">
                                    <div className="t3-item-header">
                                        <h3 className="t3-item-name">{item.name}</h3>
                                        <span className="t3-dots"></span>
                                        <span className="t3-item-price">₹{item.price}</span>
                                    </div>
                                    <p className="t3-item-desc">{item.description}</p>
                                    <div className="t3-item-bottom">
                                        <div className="t3-item-tags">
                                            {/* Veg / Non-Veg Badge */}
                                            {item.veg !== undefined && (
                                                <span className={`t3-tag ${item.veg ? "t3-veg" : "t3-nonveg"}`}>
                                                    {item.veg ? "Veg" : "Non-Veg"}
                                                </span>
                                            )}

                                            {/* Egg / Eggless Badge */}
                                            {item.egg !== undefined && (
                                                <span className={item.egg ? "t3-tag t3-egg" : "t3-tag t3-eggless"}>
                                                    {item.egg ? "Egg" : "Eggless"}
                                                </span>
                                            )}

                                            {/* Prep time Badge */}
                                            {item.prepTime !== undefined && (
                                                <span className="t3-chip">
                                                    <FaClock /> {item.prepTime} min
                                                </span>
                                            )}

                                            {/* Serves Badge */}
                                            {item.serves !== undefined && (
                                                <span className="t3-chip">
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
                                            {item.calories > 0 && (
                                                <span className="t3-item-calories">
                                                    <FaFire /> {item.calories} kcal
                                                </span>
                                            )}
                                        </div>
                                        <button className="t3-like-btn" onClick={(e) => toggleLike(e, item.id)}>
                                            {likedItems[item.id] ? <FaHeart className="t3-liked" /> : <FaRegHeart />}
                                        </button>
                                    </div>
                                    
                                    {/* Fixed Bottom Buttons */}
                                    <div style={{ marginTop: '12px', display: 'flex', gap: '10px' }}>
                                        <button 
                                            style={{ flex: 1, padding: '6px 12px', borderRadius: '4px', border: 'none', backgroundColor: 'var(--primary-color)', color: '#ffffff', fontSize: '0.8rem', fontWeight: '600', cursor: 'pointer', transition: 'background-color 0.2s' }} 
                                            onClick={(e) => { e.stopPropagation(); console.log('Add to Cart clicked'); }}
                                            onMouseOver={(e) => e.target.style.opacity = '0.9'}
                                            onMouseOut={(e) => e.target.style.opacity = '1'}
                                        >
                                            Add to Cart
                                        </button>
                                        {(item.recipe || item.ingredients) && (
                                            <button 
                                                style={{ flex: 1, padding: '6px 12px', borderRadius: '4px', border: '1px solid var(--border-color)', backgroundColor: 'transparent', color: 'var(--primary-color)', fontSize: '0.8rem', fontWeight: '600', cursor: 'pointer', transition: 'all 0.2s ease' }} 
                                                onClick={(e) => { e.stopPropagation(); setSelectedItem(item); }}
                                                onMouseOver={(e) => { e.target.style.backgroundColor = 'var(--accent-light)'; }}
                                                onMouseOut={(e) => { e.target.style.backgroundColor = 'transparent'; }}
                                            >
                                                View Recipe
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {selectedItem && (
                <div className="t3-modal-overlay" onClick={() => setSelectedItem(null)}>
                    <div className="t3-modal" onClick={(e) => e.stopPropagation()}>
                        <button className="t3-modal-close" onClick={() => setSelectedItem(null)}><FaTimes /></button>
                        <div className="t3-modal-content" style={{ padding: '24px' }}>
                            <div className="t3-modal-details" style={{ padding: 0 }}>
                                <h2 style={{ marginBottom: '20px', borderBottom: '1px solid var(--border-color)', paddingBottom: '12px' }}>{selectedItem.name}</h2>
                                
                                {selectedItem.ingredients && (
                                    <div className="t3-modal-section" style={{ borderTop: 'none', paddingTop: 0 }}>
                                        <h3>Ingredients</h3>
                                        <p>{selectedItem.ingredients}</p>
                                    </div>
                                )}
                                
                                {selectedItem.recipe && (
                                    <div className="t3-modal-section" style={selectedItem.ingredients ? {} : { borderTop: 'none', paddingTop: 0 }}>
                                        <h3>Recipe</h3>
                                        <p>{selectedItem.recipe}</p>
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

export default TestTemplate3;
