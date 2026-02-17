import { ShoppingCart } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';

export default function ProductCard({ product, onNavigate }) {
    const { user } = useAuth();
    const { addToCart } = useCart();

    const handleAddToCart = (e) => {
        e.preventDefault();
        e.stopPropagation();
        addToCart(product);
    };

    return (
        <Link to={`/product/${product.id}`} className="block h-full group">
            <div className="bg-white rounded-xl shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 overflow-hidden h-full flex flex-col border border-slate-200">
                {/* 1. IMAGE CONTAINER (Top) */}
                <div className="relative h-[200px] w-full shrink-0">
                    <img
                        src={product.image}
                        alt=""
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                    />

                    {/* Condition Badge */}
                    <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-md text-slate-900 text-[10px] font-bold px-2 py-0.5 rounded-md uppercase tracking-wider shadow-sm">
                        {product.condition}
                    </div>
                </div>

                {/* 2. INFO CONTAINER (Body) - White Background */}
                <div className="p-4 flex flex-col flex-grow bg-white">
                    {/* Category */}
                    <div className="text-[10px] text-slate-500 font-bold mb-1 uppercase tracking-widest">
                        {product.category}
                    </div>

                    {/* Title */}
                    <h3 className="text-base font-bold text-slate-900 mb-3 line-clamp-2 leading-tight">
                        {product.title}
                    </h3>

                    {/* Spacer to push price down */}
                    <div className="mt-auto"></div>

                    {/* Price & Cart Row */}
                    <div className="flex justify-between items-center pt-3 border-t border-slate-100">
                        <span className="text-lg font-bold text-[#0EA5E9] tracking-tight">
                            {product.price} €
                        </span>

                        <button
                            onClick={handleAddToCart}
                            className="bg-slate-100 text-slate-600 hover:bg-[#0EA5E9] hover:text-white p-2 rounded-lg transition-colors duration-200"
                        >
                            <ShoppingCart size={18} />
                        </button>
                    </div>
                </div>
            </div>
        </Link>
    );
}
