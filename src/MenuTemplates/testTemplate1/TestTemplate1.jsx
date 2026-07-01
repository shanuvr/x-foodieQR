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
    FaUsers,
    FaCoffee,
    FaBeer,
    FaUtensils,
    FaGlassCheers,
    FaLeaf
} from "react-icons/fa";
import { GiCupcake, GiWheat, GiTeapot, GiChiliPepper } from "react-icons/gi";
import "./testTemplate1.css";


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
        recipe: "Mix flour, cocoa powder, butter and chocolate. Bake for 35 minutes and finish with ganache."
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
        recipe: "Mix flour, cocoa powder, butter and chocolate. Bake for 35 minutes and finish with ganache."
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
        ingredients: "Espresso, whole milk, caramel sauce, vanilla syrup, ice.",
        recipe: "Mix flour, cocoa powder, butter and chocolate. Bake for 35 minutes and finish with ganache."
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
        recipe: "Mix flour, cocoa powder, butter and chocolate. Bake for 35 minutes and finish with ganache."
    }
];

function TestTemplate1() {
    const location = useLocation();
    const routeState = location.state || {};

    const menuTitle = routeState.menuTitle || "FoodieQR Outlet";
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
        () => categories[0] || "Specialties"
    );

    const [selectedItem, setSelectedItem] = useState(null);
    const [likedItems, setLikedItems] = useState({});

    useEffect(() => {
        if (!categories.includes(activeCategory)) {
            setActiveCategory(categories[0] || "Specialties");
        }
    }, [categories, activeCategory]);

    const toggleLike = (e, id) => {
        e.stopPropagation();
        setLikedItems(prev => ({ ...prev, [id]: !prev[id] }));
    };

    const filteredItems = menuItems.filter((item) => item.category === activeCategory);

    // Sub-components for dynamic badges
    const SpiceIndicator = ({ level }) => {
        if (!level || level === 0) return null;
        return (
            <span style={{ display: 'flex', alignItems: 'center', color: '#ef4444', gap: '2px', fontSize: '0.95rem' }}>
                <span style={{ color: '#777', fontSize: '0.85rem', marginRight: '4px' }}>Spice Level:</span>
                {Array.from({ length: level }).map((_, i) => (
                    <GiChiliPepper key={i} />
                ))}
                {Array.from({ length: 5 - level }).map((_, i) => (
                    <GiChiliPepper key={i + level} style={{ color: '#d1d5db' }} />
                ))}
            </span>
        );
    };

    return (
        <div className="t1-page">
            <div className="t1-container">
                {/* Decorative top pattern */}
                <div className="t1-top-pattern">
                    {Array(12).fill(null).map((_, i) => (
                        <span key={i} className="t1-dot-pattern"></span>
                    ))}
                </div>

                <header className="t1-header">
                    <div className="t1-icon-row">
                        <FaUtensils className="t1-header-icon" />
                    </div>
                    <h1 className="t1-title">{menuTitle}</h1>
                    <p className="t1-subtitle">{menuSubtitle}</p>
                    <div className="t1-divider">
                        <span className="t1-divider-icon">
                            <FaFire />
                        </span>
                    </div>
                </header>

                <nav className="t1-nav">
                    {categories.map((category) => (
                        <button
                            key={category}
                            className={`t1-nav-btn ${activeCategory === category ? "t1-active" : ""}`}
                            onClick={() => setActiveCategory(category)}
                        >
                            {category}
                        </button>
                    ))}
                </nav>

                {filteredItems.length === 0 ? (
                    <p className="t1-empty-menu text-center text-muted py-5">
                        No items available in this category.
                    </p>
                ) : (
                    <div className="t1-menu-list">
                        {filteredItems.map((item) => (
                            <div className="t1-menu-item" key={item.id}>
                                <div className="t1-item-img-box">
                                    <img src={item.image} alt={item.name} className="t1-item-thumbnail" />
                                </div>
                                <div className="t1-item-info">
                                    <div className="t1-item-header">
                                        <h3 className="t1-item-name">{item.name}</h3>
                                        <span className="t1-dots"></span>
                                        <span className="t1-item-price">₹{item.price}</span>
                                    </div>
                                    <p className="t1-item-desc">{item.description}</p>
                                    <div className="t1-item-bottom">
                                        <div className="t1-item-tags">
                                            {/* Veg / Non-Veg Badge */}
                                            {item.veg !== undefined && (
                                                <span className={`t1-tag ${item.veg ? "t1-veg" : "t1-nonveg"}`}>
                                                    {item.veg ? "Veg" : "Non-Veg"}
                                                </span>
                                            )}

                                            {/* Egg / Eggless Badge (For Bakery/Desserts) */}
                                            {item.egg !== undefined && (
                                                <span className={item.egg ? "t1-tag t1-egg" : "t1-tag t1-eggless"}>
                                                    {item.egg ? "Egg" : "Eggless"}
                                                </span>
                                            )}

                                            {/* Prep time Badge */}
                                            {/* {item.prepTime !== undefined && (
                                                <span className="t1-chip">
                                                    <FaClock /> {item.prepTime} min
                                                </span>
                                            )} */}

                                            {/* Serves Badge */}
                                            {item.serves !== undefined && (
                                                <span className="t1-chip">
                                                    <FaUsers /> Serves {item.serves}
                                                </span>
                                            )}

                                            {/* Spice Level Indicator */}
                                            {item.spice !== undefined && item.spice > 0 && (
                                                <SpiceIndicator level={item.spice} />
                                            )}

                                            {/* Calories Badge */}
                                            {item.calories !== undefined && (
                                                <span className="t1-item-calories">
                                                    <FaFire /> {item.calories} kcal
                                                </span>
                                            )}
                                        </div>
                                        <button className="t1-like-btn" onClick={(e) => toggleLike(e, item.id)}>
                                            {likedItems[item.id] ? <FaHeart className="t1-liked" /> : <FaRegHeart />}
                                        </button>
                                    </div>
                                    {/* Fixed Bottom Buttons */}
                                    <div style={{ marginTop: 'auto', paddingTop: '12px', display: 'flex', gap: '10px' }}>
                                        <button
                                            style={{ flex: 1, padding: '6px 10px', borderRadius: '4px', border: 'none', backgroundColor: 'var(--primary-color)', color: 'white', fontSize: '0.8rem', fontWeight: '600', cursor: 'pointer', transition: 'background-color 0.2s' }}
                                            onClick={(e) => { e.stopPropagation(); console.log('Add to Cart clicked'); }}
                                            onMouseOver={(e) => e.target.style.backgroundColor = 'var(--primary-hover)'}
                                            onMouseOut={(e) => e.target.style.backgroundColor = 'var(--primary-color)'}
                                        >
                                            Add to Cart
                                        </button>
                                        {(item.recipe || item.ingredients) && (
                                            <button className="t1-view-recipe-btn" style={{ flex: 1, margin: 0 }} onClick={(e) => { e.stopPropagation(); setSelectedItem(item); }}>
                                                View Recipe
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                <div className="t1-bottom-pattern">
                    {Array(12).fill(null).map((_, i) => (
                        <span key={i} className="t1-dot-pattern"></span>
                    ))}
                </div>
            </div>

            {selectedItem && (
                <div className="t1-modal-overlay" onClick={() => setSelectedItem(null)}>
                    <div className="t1-modal" onClick={(e) => e.stopPropagation()}>
                        <button className="t1-modal-close" onClick={() => setSelectedItem(null)}><FaTimes /></button>
                        <div className="t1-modal-content" style={{ padding: '24px' }}>
                            <div className="t1-modal-details" style={{ padding: 0 }}>
                                <h2 style={{ marginBottom: '20px', borderBottom: '1px solid #eee', paddingBottom: '12px' }}>{selectedItem.name}</h2>

                                {selectedItem.ingredients && (
                                    <div className="t1-modal-section">
                                        <h3>Ingredients</h3>
                                        <p>{selectedItem.ingredients}</p>
                                    </div>
                                )}

                                {selectedItem.recipe && (
                                    <div className="t1-modal-section" style={{ borderBottom: 'none' }}>
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

export default TestTemplate1;
