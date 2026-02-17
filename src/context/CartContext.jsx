import { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export function useCart() {
    return useContext(CartContext);
}

export function CartProvider({ children }) {
    const [cart, setCart] = useState(() => {
        try {
            const savedCart = localStorage.getItem('watermarket_cart');
            return savedCart ? JSON.parse(savedCart) : [];
        } catch (error) {
            console.error("Failed to load cart from localStorage", error);
            return [];
        }
    });

    const [isCartOpen, setIsCartOpen] = useState(false);

    // Persist cart to localStorage whenever it changes
    useEffect(() => {
        try {
            localStorage.setItem('watermarket_cart', JSON.stringify(cart));
        } catch (error) {
            console.error("Failed to save cart to localStorage", error);
        }
    }, [cart]);

    const addToCart = (product) => {
        setCart(prevCart => {
            // Check if item already exists
            const existingItem = prevCart.find(item => item.id === product.id);
            if (existingItem) {
                // Determine if we want to allow multiples or just ignore. 
                // For unique used items, maybe just 1 is enough? 
                // Let's assume unique items for now, so do nothing or alert?
                // Or maybe just re-open the sidebar to show it's there.
                return prevCart;
            }
            return [...prevCart, product];
        });
        // setIsCartOpen(true); // User requested to disable auto-open
    };

    const removeFromCart = (productId) => {
        setCart(prevCart => prevCart.filter(item => item.id !== productId));
    };

    const clearCart = () => {
        setCart([]);
    };

    const cartTotal = cart.reduce((total, item) => total + (Number(item.price) || 0), 0);
    const cartCount = cart.length;

    const value = {
        cart,
        isCartOpen,
        setIsCartOpen,
        addToCart,
        removeFromCart,
        clearCart,
        cartTotal,
        cartCount
    };

    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    );
}
