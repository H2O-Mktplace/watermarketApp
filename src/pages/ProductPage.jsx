import { useParams, Link } from 'react-router-dom';
import { useState } from 'react';
import { ArrowLeft, MapPin, MessageCircle, ShieldCheck, Share2, Heart, X, ShoppingCart, Check, QrCode } from 'lucide-react';
import { products } from '../data';
import { useCart } from '../context/CartContext';

export default function ProductPage() {
    const { id } = useParams();
    const { addToCart } = useCart();
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Find product
    const product = products.find(p => p.id === parseInt(id));

    if (!product) {
        return (
            <div className="min-h-screen bg-[#0F172A] flex items-center justify-center text-white">
                <div className="text-center">
                    <h2 className="text-3xl font-bold mb-4">Prodotto non trovato</h2>
                    <Link to="/marketplace" className="text-[#0EA5E9] hover:underline flex items-center justify-center gap-2">
                        <ArrowLeft size={20} /> Torna al Marketplace
                    </Link>
                </div>
            </div>
        );
    }

    // Spec Helper
    const getKeySpec = () => {
        switch (product.category) {
            case 'Surf':
            case 'Windsurf':
            case 'Wingfoil':
            case 'Tavola':
                return { label: 'Volume', value: '100L' }; // Placeholder if not in data 
            case 'Kitesurf':
            case 'Vela':
            case 'Ala':
            case 'Ala / Wing':
            case 'Ala / Kite':
                return { label: 'Dimensione', value: '9mq' };
            case 'Abbigliamento':
            case 'Muta':
                return { label: 'Taglia', value: 'M' };
            default:
                return { label: 'Categoria', value: product.category };
        }
    };
    const keySpec = getKeySpec();

    return (
        <div className="bg-[#0F172A] min-h-screen pt-24 pb-20">
            {/* Modal Lightbox */}
            {isModalOpen && (
                <div
                    className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 cursor-zoom-out"
                    onClick={() => setIsModalOpen(false)}
                >
                    <button
                        className="absolute top-6 right-6 text-white/50 hover:text-white transition-colors"
                        onClick={() => setIsModalOpen(false)}
                    >
                        <X size={40} />
                    </button>
                    <img
                        src={product.image}
                        alt={product.title}
                        className="max-h-[90vh] max-w-[90vw] object-contain rounded-lg shadow-2xl"
                    />
                </div>
            )}

            <div className="container px-4 md:px-8 mx-auto max-w-7xl">

                {/* 2-Column Layout */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20">

                    {/* LEFT COLUMN: IMAGE */}
                    <div className="flex flex-col gap-6">
                        {/* Breadcrumbs (Mobile) */}
                        <nav className="md:hidden flex items-center gap-2 text-sm text-slate-400 mb-2">
                            <Link to="/marketplace" className="hover:text-white transition-colors">Marketplace</Link>
                            <span>/</span>
                            <span className="text-[#0EA5E9] font-medium">{product.category}</span>
                        </nav>

                        <div
                            className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden border border-slate-700/50 shadow-2xl bg-slate-800 group cursor-zoom-in"
                            onClick={() => setIsModalOpen(true)}
                        >
                            <img
                                src={product.image}
                                alt={product.title}
                                className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                            />
                            {/* Overlay Badge */}
                            <div className="absolute top-4 left-4">
                                <span className="px-3 py-1.5 bg-black/60 backdrop-blur-md rounded-full text-white text-xs font-bold uppercase tracking-wider border border-white/10">
                                    {product.condition}
                                </span>
                            </div>
                        </div>

                        {/* Thumbnails (Simulated) */}
                        <div className="flex gap-4 overflow-x-auto pb-2">
                            {[product.image, product.image].map((img, idx) => (
                                <button key={idx} className={`w-20 h-20 rounded-xl overflow-hidden border-2 ${idx === 0 ? 'border-[#0EA5E9]' : 'border-slate-700'} flex-shrink-0 opacity-80 hover:opacity-100 transition-opacity`}>
                                    <img src={img} alt="" className="w-full h-full object-cover" />
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* RIGHT COLUMN: DETAILS */}
                    <div className="flex flex-col text-white">
                        {/* Breadcrumbs (Desktop) */}
                        <nav className="hidden md:flex items-center gap-2 text-sm text-slate-400 mb-8">
                            <Link to="/" className="hover:text-white transition-colors">Home</Link>
                            <span>/</span>
                            <Link to="/marketplace" className="hover:text-white transition-colors">Marketplace</Link>
                            <span>/</span>
                            <span className="text-white font-medium">{product.category}</span>
                        </nav>

                        {/* Title */}
                        <h1 className="text-2xl md:text-3xl font-bold mb-6 leading-tight tracking-tight text-gradient">
                            {product.title}
                        </h1>

                        {/* Seller Card (Compact) + Location */}
                        <div className="flex items-center gap-4 mb-8">
                            <div className="flex items-center gap-3 bg-slate-800/50 p-2 pr-4 rounded-full border border-slate-700/50">
                                <div className="relative">
                                    <div className="w-8 h-8 rounded-full bg-slate-600 border border-slate-500 overflow-hidden">
                                        <img src={`https://ui-avatars.com/api/?name=Marco+R&background=0EA5E9&color=fff`} alt="Seller" className="w-full h-full object-cover" />
                                    </div>
                                    <div className="absolute bottom-0 right-0 w-2 h-2 bg-emerald-500 rounded-full border border-slate-800"></div>
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-xs font-bold text-white leading-none">Marco R.</span>
                                    <div className="flex items-center gap-1 text-yellow-400 text-[10px] mt-0.5">
                                        <span>★★★★★</span>
                                        <span className="text-slate-500">(12)</span>
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center gap-1.5 text-slate-400 text-sm font-medium bg-slate-800/30 px-3 py-2 rounded-full border border-slate-700/30">
                                <MapPin size={14} />
                                {product.location}
                            </div>
                        </div>

                        {/* Price */}
                        <div className="mb-8 mt-6">
                            <span className="text-3xl font-black text-sky-400 tracking-tight">
                                {product.price} €
                            </span>
                        </div>

                        <div className="h-px bg-slate-500 w-full mb-20"></div>

                        {/* Specs Grid */}
                        <div className="grid grid-cols-2 gap-x-4 gap-y-3 mb-12">
                            <div>
                                <span className="block text-slate-400 text-sm uppercase font-bold tracking-wider mb-1">Marca</span>
                                <span className="text-xl font-medium text-white">{product.brand}</span>
                            </div>
                            <div>
                                <span className="block text-slate-400 text-sm uppercase font-bold tracking-wider mb-1">Modello/Anno</span>
                                <span className="text-xl font-medium text-white">{product.year || 'N/A'}</span>
                            </div>
                            <div>
                                <span className="block text-slate-400 text-sm uppercase font-bold tracking-wider mb-1">Condizione</span>
                                <span className="text-xl font-medium text-white">{product.condition}</span>
                            </div>
                            <div>
                                <span className="block text-slate-400 text-sm uppercase font-bold tracking-wider mb-1">{keySpec.label}</span>
                                <span className="text-xl font-medium text-white">{keySpec.value}</span>
                            </div>
                        </div>

                        {/* Description */}
                        <div className="mb-48 mt-24">
                            <div className="h-px bg-slate-500 w-full mb-8"></div>
                            <h3 className="text-lg font-bold text-white mb-3">Descrizione</h3>
                            <p className="text-slate-300 leading-relaxed text-lg">
                                {product.description || "Descrizione non disponibile per questo prodotto. Contatta il venditore per maggiori informazioni."}
                            </p>
                        </div>


                        {/* Secure Handover Section */}
                        <div className="mb-8 bg-gradient-to-br from-slate-800/60 to-slate-900/60 rounded-2xl p-6 border border-emerald-500/20 relative overflow-hidden group">
                            <div className="absolute -top-6 -right-6 p-4 opacity-5 group-hover:opacity-10 transition-opacity rotate-12">
                                <QrCode size={140} className="text-emerald-400" />
                            </div>

                            <div className="relative z-10">
                                <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                                    <ShieldCheck className="text-emerald-400" size={20} />
                                    Ritiro a Mano Sicuro
                                </h3>

                                <div className="flex items-start gap-4 mb-5">
                                    <div className="bg-white p-2.5 rounded-xl shadow-lg shadow-emerald-900/20 shrink-0">
                                        <QrCode size={32} className="text-slate-900" />
                                    </div>
                                    <div className="text-sm text-slate-300">
                                        <p className="mb-2 text-emerald-100 font-medium tracking-tight">Dimentica i contanti. Scambia in sicurezza.</p>
                                        <ol className="market-list space-y-1.5 text-slate-400 text-xs leading-relaxed">
                                            <li className="flex gap-2"><span className="text-emerald-500 font-bold">1.</span> <span>Paga in App: fondi bloccati e protetti.</span></li>
                                            <li className="flex gap-2"><span className="text-emerald-500 font-bold">2.</span> <span>Ricevi il tuo <strong>QR Code</strong> segreto.</span></li>
                                            <li className="flex gap-2"><span className="text-emerald-500 font-bold">3.</span> <span>Scansiona al ritiro per pagare il venditore.</span></li>
                                        </ol>
                                    </div>
                                </div>

                                <div className="flex flex-wrap gap-2">
                                    <span className="text-[10px] font-bold uppercase tracking-wider bg-emerald-500/10 text-emerald-400 px-2 py-1 rounded border border-emerald-500/20 flex items-center gap-1">
                                        <Check size={10} strokeWidth={4} /> Protezione WaterMarket
                                    </span>
                                    <span className="text-[10px] font-bold uppercase tracking-wider bg-slate-700/50 text-slate-300 px-2 py-1 rounded border border-slate-600/50">
                                        Zero Commissioni Ritiro
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Actions Row (Add to Cart + Share/Heart) */}
                        <div className="flex items-center gap-3 mt-auto pt-12 border-t border-slate-800/50">
                            <button
                                onClick={() => addToCart(product)}
                                className="flex-1 py-2.5 bg-[#0EA5E9] hover:bg-[#0284C7] text-white font-bold rounded-xl shadow-lg shadow-sky-500/20 active:scale-[0.98] transition-all flex items-center justify-center gap-2 uppercase tracking-wide text-sm"
                            >
                                <ShoppingCart size={18} />
                                Aggiungi al Carrello
                            </button>

                            <button className="p-3.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-teal-400 border border-slate-700 hover:border-teal-500/50 transition-all shadow-lg">
                                <Share2 size={20} />
                            </button>
                            <button className="p-3.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-rose-500 border border-slate-700 hover:border-rose-500/50 transition-all shadow-lg">
                                <Heart size={20} />
                            </button>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}
