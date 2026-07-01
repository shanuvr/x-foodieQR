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
    FaMotorcycle,
    FaCoffee,
    FaBeer,
    FaUtensils,
    FaLeaf,
    FaGlassCheers
} from "react-icons/fa";
import { GiCupcake, GiWheat, GiTeapot, GiChiliPepper } from "react-icons/gi";
import "./testTemplate5.css";

// Fallback categories for preview
const FALLBACK_CATEGORIES = ["Starters", "Mains", "Desserts", "Beverages"];

const FALLBACK_ITEMS = [
    // Bakery Items
    {
        id: 1,
        category: "Cakes",
        name: "Blackforest Cake",
        price: 850,
        veg: true,
        egg: false,
        calories: 420,
        sweetness: 4,
        image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587",
        description: "Layers of chocolate sponge with whipped cream and cherries.",
        ingredients: "Flour, cocoa, cherries, whipped cream.",
        spice: 1,
        recipe: "1. Bake chocolate sponge. 2. Layer with cherry compote. 3. Cover with whipped cream."
    },
    {
        id: 2,
        category: "Cakes",
        name: "Red Velvet Slice",
        price: 950,
        veg: false,
        egg: true,
        calories: 480,
        sweetness: 5,
        image: "https://images.unsplash.com/photo-1586788680434-30d324b2d46f",
        description: "Velvety red sponge with premium cream cheese frosting.",
        ingredients: "Flour, buttermilk, cocoa, cream cheese, butter."
    },
    {
        id: 3,
        category: "Cakes",
        name: "Salted Caramel Mousse",
        price: 780,
        veg: true,
        egg: false,
        calories: 410,
        sweetness: 4,
        image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c",
        description: "Decadent mousse cake layered with home-style salted caramel.",
        ingredients: "Cream, sugar, dark chocolate, sea salt, gelatin.",
        recipe: "1. Bake chocolate sponge. 2. Layer with cherry compote. 3. Cover with whipped cream."
    },
    {
        id: 4,
        category: "Pastries",
        name: "Almond Croissant",
        price: 220,
        veg: false,
        egg: true,
        calories: 310,
        sweetness: 2,
        image: "https://images.unsplash.com/photo-1555507036-ab1f4038808a",
        description: "Flaky, buttery croissant filled with sweet almond cream.",
        ingredients: "Butter, flour, almond paste, eggs, sugar.",
        recipe: "1. Bake chocolate sponge. 2. Layer with cherry compote. 3. Cover with whipped cream."
    },
    {
        id: 5,
        category: "Pastries",
        name: "Chocolate Eclair",
        price: 180,
        veg: false,
        egg: true,
        calories: 290,
        sweetness: 3,
        image: "https://images.unsplash.com/photo-1608039829572-78524f79c4c7",
        description: "Choux pastry filled with vanilla custard and topped with chocolate glaze.",
        ingredients: "Choux paste, eggs, heavy cream, vanilla, dark chocolate.",
        recipe: "1. Bake chocolate sponge. 2. Layer with cherry compote. 3. Cover with whipped cream."
    },
    {
        id: 6,
        category: "Pastries",
        name: "Cinnamon Danish",
        price: 150,
        veg: true,
        egg: false,
        calories: 260,
        sweetness: 3,
        image: "https://images.unsplash.com/photo-1509365465985-25d11c17e812",
        description: "Soft layered laminated dough with sweet cinnamon sugar swirls.",
        ingredients: "Flour, yeast, butter, brown sugar, cinnamon.",
        recipe: "1. Bake chocolate sponge. 2. Layer with cherry compote. 3. Cover with whipped cream."
    },
    {
        id: 7,
        category: "Breads",
        name: "Sourdough Loaf",
        price: 320,
        veg: true,
        egg: false,
        calories: 180,
        sweetness: 1,
        image: "https://images.unsplash.com/photo-1549931319-a545dcf3bc73",
        description: "Rustic wild yeast sourdough loaf with a crispy crust.",
        ingredients: "Organic flour, water, salt, sourdough culture.",
        recipe: "1. Bake chocolate sponge. 2. Layer with cherry compote. 3. Cover with whipped cream."
    },
    {
        id: 8,
        category: "Breads",
        name: "Brioche Bun",
        price: 120,
        veg: false,
        egg: true,
        calories: 220,
        sweetness: 2,
        image: "https://images.unsplash.com/photo-1589367920969-ab8e050bbb04",
        description: "Buttery, golden french brioche roll, slightly sweet and soft.",
        ingredients: "Flour, butter, egg yolks, yeast, milk.",
        recipe: "1. Bake chocolate sponge. 2. Layer with cherry compote. 3. Cover with whipped cream."
    },

    // Restaurant Items
    {
        id: 9,
        category: "Starters",
        name: "Bruschetta",
        price: 320,
        veg: true,
        calories: 210,
        image: "https://images.unsplash.com/photo-1572695157366-5e585ab2b69f",
        description: "Toasted garlic bread topped with marinated fresh tomatoes and basil.",
        ingredients: "Baguette, plum tomatoes, garlic, olive oil, basil.",
        spice: 2,
        recipe: "1. Slice baguette and toast. 2. Rub with raw garlic. 3. Top with tomato and basil mix."
    },
    {
        id: 10,
        category: "Starters",
        name: "Paneer Tikka",
        price: 340,
        veg: true,
        calories: 290,
        image: "https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8",
        description: "Spiced paneer cubes marinated in curd and tandoor-roasted.",
        ingredients: "Paneer, bell peppers, thick yogurt, tandoori masala.",
        spice: 3,
        recipe: "1. Bake chocolate sponge. 2. Layer with cherry compote. 3. Cover with whipped cream."
    },
    {
        id: 11,
        category: "Starters",
        name: "Crispy Spring Rolls",
        price: 280,
        veg: true,
        calories: 240,
        image: "https://images.unsplash.com/photo-1544025162-83161c28c688",
        description: "Thin pastry shells loaded with stir-fried cabbage, carrots, and glass noodles.",
        ingredients: "Spring roll wrappers, cabbage, carrots, soy sauce, garlic.",
        recipe: "1. Bake chocolate sponge. 2. Layer with cherry compote. 3. Cover with whipped cream."
    },
    {
        id: 12,
        category: "Mains",
        name: "Truffle Risotto",
        price: 650,
        veg: true,
        calories: 520,
        image: "https://images.unsplash.com/photo-1473093295043-cdd812d0e601",
        description: "Creamy Italian arborio rice simmered with parmesan and black truffle oil.",
        ingredients: "Arborio rice, truffle oil, parmesan, broth, forest mushrooms.",
        recipe: "1. Bake chocolate sponge. 2. Layer with cherry compote. 3. Cover with whipped cream."
    },
    {
        id: 13,
        category: "Mains",
        name: "Wagyu Steak",
        price: 1200,
        veg: false,
        calories: 850,
        image: "https://images.unsplash.com/photo-1544025162-83161c28c688",
        description: "Premium pan-seared Wagyu ribeye steak with a garlic herb butter glaze.",
        ingredients: "Wagyu beef, garlic, butter, fresh rosemary, thyme.",
        recipe: "1. Bake chocolate sponge. 2. Layer with cherry compote. 3. Cover with whipped cream."
    },
    {
        id: 14,
        category: "Mains",
        name: "Classic Margherita Pizza",
        price: 450,
        veg: true,
        calories: 580,
        image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002",
        description: "Traditional hand-stretched sourdough pizza topped with sweet San Marzano sauce and mozzarella.",
        ingredients: "Pizza dough, San Marzano sauce, fresh mozzarella, basil, olive oil.",
        recipe: "1. Bake chocolate sponge. 2. Layer with cherry compote. 3. Cover with whipped cream."
    },
    {
        id: 15,
        category: "Desserts",
        name: "Tiramisu",
        price: 450,
        veg: true,
        calories: 430,
        image: "https://images.unsplash.com/photo-1571115177098-24ec42ed204d",
        description: "Espresso-soaked ladyfingers layered with rich mascarpone zabaglione.",
        ingredients: "Mascarpone, espresso, ladyfingers, coffee liqueur, cocoa.",
        recipe: "1. Bake chocolate sponge. 2. Layer with cherry compote. 3. Cover with whipped cream."
    },

    // Chayakkada / Cloud Kitchen Items
    {
        id: 16,
        category: "Rice Bowls",
        name: "Butter Chicken Bowl",
        price: 299,
        veg: false,
        calories: 620,
        spice: 2,
        prepTime: 18,
        serves: 1,
        available: true,
        image: "https://images.unsplash.com/photo-1585937421612-70a008356fbe",
        description: "Tender chicken cooked in rich tomato-butter gravy, served over steamed basmati rice.",
        ingredients: "Chicken, butter, tomatoes, cream, basmati rice, spices.",
        recipe: "1. Marinate chicken. 2. Grill chicken. 3. Prepare tomato-butter gravy. 4. Mix and serve."
    },
    {
        id: 17,
        category: "Rice Bowls",
        name: "Paneer Tikka Bowl",
        price: 259,
        veg: true,
        calories: 540,
        spice: 2,
        prepTime: 15,
        serves: 1,
        available: true,
        image: "https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8",
        description: "Chargrilled paneer cubes in smoky tikka masala, served with warm jeera rice.",
        ingredients: "Paneer, yogurt, tikka spices, jeera rice, bell peppers.",
        recipe: "1. Marinate paneer. 2. Grill paneer. 3. Prepare tikka masala gravy. 4. Mix and serve."
    },
    {
        id: 18,
        category: "Rice Bowls",
        name: "Spicy Andhra Chicken Bowl",
        price: 279,
        veg: false,
        calories: 670,
        spice: 5,
        prepTime: 20,
        serves: 1,
        available: true,
        image: "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d",
        description: "Fiery regional Andhra-style hot chicken curry served with steamed rice.",
        ingredients: "Chicken, red chillies, curry leaves, rice.",
        recipe: "1. Marinate chicken. 2. Grill chicken. 3. Prepare tikka masala gravy. 4. Mix and serve."
    },
    {
        id: 19,
        category: "Wraps",
        name: "Falafel Hummus Wrap",
        price: 199,
        veg: true,
        calories: 390,
        spice: 1,
        prepTime: 10,
        serves: 1,
        available: true,
        image: "https://images.unsplash.com/photo-1561649202-8c4d1e6a74bb",
        description: "Crispy chickpea falafel balls with smooth garlic hummus, pickles, and tahini wrapped in fresh lavash.",
        ingredients: "Chickpeas, hummus, pickles, tahini, lavash wrap.",
        recipe: "1. Marinate chicken. 2. Grill chicken. 3. Prepare tikka masala gravy. 4. Mix and serve."
    },
    {
        id: 20,
        category: "Wraps",
        name: "Kathi Chicken Wrap",
        price: 189,
        veg: false,
        calories: 430,
        spice: 3,
        prepTime: 12,
        serves: 1,
        available: true,
        image: "https://images.unsplash.com/photo-1626700051175-6818013e1d4f",
        description: "Layered paratha wrap filled with roasted chicken skewers, chopped onions, and sweet mint chutney.",
        ingredients: "Paratha, chicken tikka, eggs, raw onions, mint paste.",
        recipe: "1. Marinate chicken. 2. Grill chicken. 3. Prepare tikka masala gravy. 4. Mix and serve."
    },
    {
        id: 21,
        category: "Sides",
        name: "Loaded Cheesy Fries",
        price: 149,
        veg: true,
        calories: 380,
        spice: 2,
        prepTime: 8,
        serves: 2,
        available: true,
        image: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877",
        description: "Double fried potatoes loaded with hot cheddar cheese sauce and jalapeño slices.",
        ingredients: "Potato fries, liquid cheese, pickled jalapeños.",
        recipe: "1. Marinate chicken. 2. Grill chicken. 3. Prepare tikka masala gravy. 4. Mix and serve."
    },

    // Beverages & Drinks (Shared / mapped correctly)
    {
        id: 22,
        category: "Beverages",
        name: "Chai Latte",
        price: 160,
        veg: true,
        calories: 150,
        sweetness: 3,
        image: "https://images.unsplash.com/photo-1571934811356-5cc061b6821f",
        description: "Rich black tea infused with ground spices, topped with frothy steamed milk.",
        ingredients: "CTC tea, cardamoms, ginger, milk, sugar.",
        recipe: "1. Marinate chicken. 2. Grill chicken. 3. Prepare tikka masala gravy. 4. Mix and serve."
    },
    {
        id: 23,
        category: "Beverages",
        name: "Filter Coffee",
        price: 120,
        veg: true,
        calories: 90,
        sweetness: 2,
        image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085",
        description: "Traditional south Indian chicory-blend coffee served hot and frothy.",
        ingredients: "Coffee powder, water, sugar, whole milk.",
        recipe: "1. Marinate chicken. 2. Grill chicken. 3. Prepare tikka masala gravy. 4. Mix and serve."
    },
    {
        id: 24,
        category: "Drinks",
        name: "Mango Lassi",
        price: 99,
        veg: true,
        calories: 190,
        prepTime: 5,
        serves: 1,
        available: true,
        image: "https://images.unsplash.com/photo-1527661591475-527312dd65f5",
        description: "Creamy blended sweet yogurt shake prepared with Alphonso mango pulp.",
        ingredients: "Yogurt, mango pulp, green cardamom.",
        recipe: "1. Marinate chicken. 2. Grill chicken. 3. Prepare tikka masala gravy. 4. Mix and serve."
    },
    {
        id: 25,
        category: "Drinks",
        name: "Watermelon Mint Cooler",
        price: 89,
        veg: true,
        calories: 80,
        prepTime: 5,
        serves: 1,
        available: true,
        image: "https://images.unsplash.com/photo-1560508180-03f285f67ded",
        description: "Refreshing cold watermelon extract mixed with mint sprigs and black salt.",
        ingredients: "Watermelon, mint, lime, salt.",
        recipe: "1. Marinate chicken. 2. Grill chicken. 3. Prepare tikka masala gravy. 4. Mix and serve."
    }
];

function TestTemplate5() {
    const location = useLocation();
    const routeState = location.state || {};

    const menuTitle = routeState.menuTitle || "L'ÉLÉGANCE";
    const menuSubtitle = routeState.menuSubtitle || "Fine Dining Experience";

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
        return FALLBACK_ITEMS.filter(item => FALLBACK_CATEGORIES.includes(item.category));
    }, [routeState.menuItems]);

    const [activeCategory, setActiveCategory] = useState(() => categories[0] || "");
    const [selectedItem, setSelectedItem] = useState(null);
    const [likedItems, setLikedItems] = useState({});

    useEffect(() => {
        if (!categories.includes(activeCategory)) {
            setActiveCategory(categories[0] || "");
        }
    }, [categories, activeCategory]);

    const toggleLike = (e, id) => {
        e.stopPropagation();
        setLikedItems(prev => ({ ...prev, [id]: !prev[id] }));
    };

    const filteredItems = menuItems.filter((item) => item.category === activeCategory);

    // Sub-components for ratings/stars/spices
    const SweetnessStars = ({ level }) => (
        <span className="b5-sweetness">
            {[1, 2, 3, 4, 5].map(i =>
                i <= level
                    ? <FaStar key={i} className="b5-star-filled" />
                    : <FaRegStar key={i} className="b5-star-empty" />
            )}
        </span>
    );

    const SpiceIndicator = ({ level, large = false }) => {
        if (level === 0 || level === undefined) return null;
        return (
            <span className={`ck5-spice-dots ${large ? "ck5-spice-lg" : ""}`}>
                {[1, 2, 3, 4, 5].map(i => (
                    <GiChiliPepper
                        key={i}
                        style={{
                            color: i <= level ? "#ef4444" : "#d1d5db",
                            fontSize: large ? "18px" : "14px",
                            marginRight: "2px"
                        }}
                    />
                ))}
            </span>
        );
    };


    return (
        <div className="r5-page">
            <div className="r5-container">
                <header className="r5-header">
                    <div className="r5-icon-row" style={{ textAlign: "center", marginBottom: "0.75rem" }}>
                        <FaUtensils className="r5-header-icon" style={{ fontSize: "2rem", color: "#d4af37", marginBottom: "1rem" }} />
                    </div>
                    <h1 className="r5-title">{menuTitle}</h1>
                    <p className="r5-subtitle">{menuSubtitle}</p>
                    <div className="r5-divider"></div>
                </header>

                <nav className="r5-nav">
                    {categories.map((category) => (
                        <button
                            key={category}
                            className={activeCategory === category ? "r5-nav-btn r5-active" : "r5-nav-btn"}
                            onClick={() => setActiveCategory(category)}
                        >
                            {category}
                        </button>
                    ))}
                </nav>

                {filteredItems.length === 0 ? (
                    <p className="text-center text-muted py-5">No dishes available.</p>
                ) : (
                    <div className="r5-menu-list">
                        {filteredItems.map((item) => (
                            <div className="r5-menu-item" key={item.id} onClick={() => setSelectedItem(item)}>
                                <div className="r5-item-img-box">
                                    <img src={item.image} alt={item.name} className="r5-item-thumbnail" />
                                </div>
                                <div className="r5-item-info">
                                    <div className="r5-item-header">
                                        <h3 className="r5-item-name">{item.name}</h3>
                                        <span className="r5-dots"></span>
                                        <span className="r5-item-price">₹{item.price}</span>
                                    </div>
                                    <p className="r5-item-desc">{item.description}</p>
                                    <div className="r5-item-bottom">
                                        <div className="r5-item-tags">
                                            {item.veg !== undefined && (
                                                <span className={item.veg ? "r5-tag r5-veg" : "r5-tag r5-nonveg"}>
                                                    {item.veg ? "V" : "NV"}
                                                </span>
                                            )}
                                            {item.spice !== undefined && (
                                                <SpiceIndicator level={item.spice} />
                                            )}
                                            {item.calories !== undefined && (
                                                <span className="r5-item-calories">
                                                    <FaFire /> {item.calories} kcal
                                                </span>
                                            )}
                                        </div>
                                        <button className="r5-like-btn" onClick={(e) => toggleLike(e, item.id)}>
                                            {likedItems[item.id] ? <FaHeart className="r5-liked" /> : <FaRegHeart />}
                                        </button>
                                    </div>
                                    
                                    {/* Fixed Bottom Buttons */}
                                    <div className="r5-item-actions">
                                        <button 
                                            className="r5-cart-btn"
                                            onClick={(e) => { e.stopPropagation(); console.log('Add to Cart clicked'); }}
                                        >
                                            Add to Cart
                                        </button>
                                        {(item.recipe || item.ingredients) && (
                                            <button 
                                                className="r5-recipe-btn"
                                                onClick={(e) => { e.stopPropagation(); setSelectedItem(item); }}
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
                <div className="r5-modal-overlay" onClick={() => setSelectedItem(null)}>
                    <div className="r5-modal" onClick={(e) => e.stopPropagation()}>
                        <button className="r5-modal-close" onClick={() => setSelectedItem(null)}><FaTimes /></button>
                        <div className="r5-modal-content" style={{ padding: '24px' }}>
                            <div className="r5-modal-details" style={{ padding: 0 }}>
                                <h2 style={{ marginBottom: '20px', borderBottom: '1px solid #eee', paddingBottom: '12px' }}>{selectedItem.name}</h2>
                                
                                {selectedItem.ingredients && (
                                    <div className="r5-modal-section" style={{ borderTop: 'none', paddingTop: 0 }}>
                                        <h3>Ingredients</h3>
                                        <p>{selectedItem.ingredients}</p>
                                    </div>
                                )}
                                
                                {selectedItem.recipe && (
                                    <div className="r5-modal-section" style={selectedItem.ingredients ? {} : { borderTop: 'none', paddingTop: 0 }}>
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

export default TestTemplate5;
