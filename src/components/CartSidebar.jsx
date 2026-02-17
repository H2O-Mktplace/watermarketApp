import { X, Trash2, ShoppingBag, ArrowRight } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useEffect, useRef } from 'react';

export default function CartSidebar() {
    const { cart, isCartOpen, setIsCartOpen, removeFromCart, cartTotal } = useCart();
    const sidebarRef = useRef(null);

    // Close on click outside
    useEffect(() => {
        function handleClickOutside(event) {
            if (sidebarRef.current && !sidebarRef.current.contains(event.target) && isCartOpen) {
                // Check if click was on the toggle button (optional safety, but might be handled by Navbar logic)
                // For now, simple outside click closes it.
                setIsCartOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isCartOpen, setIsCartOpen]);

    return (
        <>
            {/* Overlay */}
            <div
                className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-[60] transition-opacity duration-300 ${isCartOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
                    }`}
                aria-hidden="true"
            />

            {/* Sidebar Panel */}
            <div
                ref={sidebarRef}
                className={`fixed top-0 right-0 h-full w-full max-w-md bg-slate-900 border-l border-slate-700 shadow-2xl z-[70] transform transition-transform duration-300 ease-in-out flex flex-col ${isCartOpen ? 'translate-x-0' : 'translate-x-full'
                    }`}
            >
                {/* Header */}
                <div className="p-5 border-b border-slate-700 flex items-center justify-between bg-slate-800/50">
                    <div className="flex items-center gap-3">
                        <ShoppingBag className="text-[var(--color-primary)]" />
                        <h2 className="text-xl font-bold text-white tracking-wide uppercase">Il tuo Carrello</h2>
                    </div>
                    <button
                        onClick={() => setIsCartOpen(false)}
                        className="text-slate-400 hover:text-white transition-colors p-2 hover:bg-white/5 rounded-full"
                    >
                        <X size={24} />
                    </button>
                </div>

                {/* Cart Items List */}
                <div className="flex-1 overflow-y-auto p-5 space-y-4">
                    {cart.length === 0 ? (
                        <div className="h-full flex flex-col items-center justify-center text-center space-y-4 opacity-50">
                            <ShoppingBag size={64} className="text-slate-600 mb-2" />
                            <p className="text-slate-400 text-lg font-medium">Il tuo carrello è vuoto.</p>
                            <button
                                onClick={() => setIsCartOpen(false)}
                                className="text-[var(--color-primary)] hover:underline"
                            >
                                Continua lo shopping
                            </button>
                        </div>
                    ) : (
                        cart.map((item, index) => (
                            <div key={`${item.id}-${index}`} className="group flex gap-4 bg-slate-800/50 p-3 rounded-xl border border-slate-700 hover:border-slate-600 transition-all">
                                {/* Image */}
                                <div className="h-20 w-20 flex-shrink-0 bg-slate-700 rounded-lg overflow-hidden border border-slate-600">
                                    <img
                                        src={item.image}
                                        alt={item.title}
                                        className="h-full w-full object-cover"
                                    />
                                </div>

                                {/* Content */}
                                <div className="flex-1 flex flex-col justify-between">
                                    <div>
                                        <div className="flex justify-between items-start gap-2">
                                            <h3 className="text-white font-bold text-sm line-clamp-2 leading-tight">
                                                {item.title}
                                            </h3>
                                            <button
                                                onClick={() => removeFromCart(item.id)}
                                                className="text-slate-500 hover:text-red-400 transition-colors"
                                                title="Rimuovi"
                                            >
                                                <Trash2 size={18} />
                                            </button>
                                        </div>
                                        <p className="text-xs text-slate-400 font-medium uppercase mt-1">{item.brand}</p>
                                    </div>
                                    <div className="flex justify-between items-end">
                                        <span className="text-[var(--color-primary)] font-bold text-lg">
                                            {item.price} €
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {/* Footer */}
                {cart.length > 0 && (
                    <div className="p-5 border-t border-slate-700 bg-slate-800/80 backdrop-blur-md">
                        <div className="flex justify-between items-center mb-4 text-slate-300">
                            <span className="font-medium">Totale Provvisorio</span>
                            <span className="text-2xl font-bold text-white">{cartTotal} €</span>
                        </div>
                        <button
                            className="w-full bg-[var(--color-primary)] hover:brightness-110 text-white font-bold py-4 rounded-xl shadow-lg hover:shadow-[var(--color-primary)]/40 transition-all flex items-center justify-center gap-2 uppercase tracking-wider"
                            onClick={() => alert("Checkout flow to be implemented!")}
                        >
                            Procedi all'ordine <ArrowRight size={20} />
                        </button>
                    </div>
                )}
            </div>
        </>
    );
}
