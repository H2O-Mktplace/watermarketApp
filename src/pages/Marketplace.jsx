import { useState, useMemo } from 'react'
import { Map, Grid, ShoppingCart, ShieldCheck, Banknote, Smartphone, MapPin, Search, Navigation } from 'lucide-react'
import { MapContainer, TileLayer, Circle, Popup, useMap } from 'react-leaflet'
import ProductCard from '../components/ProductCard'
import { Link } from 'react-router-dom'

// POPULAR SURF SPOTS DATA
const POPULAR_LOCATIONS = [
    { name: "Lago di Garda (Torbole)", lat: 45.8718, lng: 10.8753 },
    { name: "Lago di Garda (Malcesine)", lat: 45.7663, lng: 10.8123 },
    { name: "Tarifa, Spagna", lat: 36.0127, lng: -5.6033 },
    { name: "Hossegor, Francia", lat: 43.6644, lng: -1.4297 },
    { name: "Fuerteventura, Canarie", lat: 28.3587, lng: -14.0536 },
    { name: "Sardegna (Porto Pollo)", lat: 41.1925, lng: 9.3242 },
    { name: "Sicilia (Stagnone)", lat: 37.8639, lng: 12.4697 },
    { name: "Toscana (Talamone)", lat: 42.5546, lng: 11.1328 },
    { name: "Maui, Hawaii", lat: 20.7984, lng: -156.3319 },
    { name: "Cape Town, Sud Africa", lat: -33.9249, lng: 18.4241 }
];

const mockProducts = [
    {
        id: 1,
        title: "Fanatic Sky Wing 5'4\" 95L",
        price: 850,
        category: "Tavola",
        sport: "Wingfoil",
        brand: "Fanatic",
        image: "https://images.unsplash.com/photo-1621262973686-21877478096f?auto=format&fit=crop&w=800&q=80",
        condition: "Usato - Ottimo",
        year: 2022,
        location: "Roma",
        lat: 41.9028, lng: 12.4964
    },
    {
        id: 2,
        title: "Duotone Unit 5.0 D-Lab",
        price: 650,
        category: "Ala / Wing",
        sport: "Wingfoil",
        brand: "Duotone",
        image: "https://images.unsplash.com/photo-1616450697985-cc292ec9236d?auto=format&fit=crop&w=800&q=80",
        condition: "Usato - Buono",
        year: 2023,
        location: "Milano",
        lat: 45.4642, lng: 9.1900
    },
    {
        id: 3,
        title: "Severne Blade 4.7 Pro",
        price: 450,
        category: "Vela",
        sport: "Windsurf",
        brand: "Severne",
        image: "https://plus.unsplash.com/premium_photo-1664302152996-368e734d743a?auto=format&fit=crop&w=800&q=80",
        condition: "Nuovo",
        year: 2024,
        location: "Torbole",
        lat: 45.8718, lng: 10.8753
    },
    {
        id: 4,
        title: "Channel Islands Happy Everyday 5'10\"",
        price: 520,
        category: "Tavola",
        sport: "Surf",
        brand: "Channel Islands",
        image: "https://images.unsplash.com/photo-1531722569936-825d3dd91b15?auto=format&fit=crop&w=800&q=80",
        condition: "Usato - Segni di usura",
        year: 2021,
        location: "Sardegna",
        lat: 39.2238, lng: 9.1216
    },
    {
        id: 5,
        title: "North Orbit 9mq",
        price: 900,
        category: "Ala / Kite",
        sport: "Kitesurf",
        brand: "North",
        image: "https://images.unsplash.com/photo-1534145451291-76495f70049f?auto=format&fit=crop&w=800&q=80",
        condition: "Usato - Come nuovo",
        year: 2023,
        location: "Sicilia",
        lat: 38.1157, lng: 13.3615
    },
    {
        id: 6,
        title: "Sabfoil Leviathan 1350 Kit",
        price: 1200,
        category: "Foil",
        sport: "Wingfoil",
        brand: "Sabfoil",
        image: "https://images.unsplash.com/photo-1655823067676-42d480674d89?auto=format&fit=crop&w=800&q=80",
        condition: "Usato - Ottimo",
        year: 2023,
        location: "Toscana",
        lat: 43.7696, lng: 11.2558
    },
    {
        id: 7,
        title: "O'Neill Hyperfreak 4/3mm",
        price: 180,
        category: "Muta",
        sport: "Accessori",
        brand: "O'Neill",
        image: "https://images.unsplash.com/photo-1517652784013-1af6e8697666?auto=format&fit=crop&w=800&q=80",
        condition: "Nuovo",
        year: 2024,
        location: "Online",
        lat: null, lng: null
    },
    {
        id: 8,
        title: "JP Australia Magic Ride 119L",
        price: 750,
        category: "Tavola",
        sport: "Windsurf",
        brand: "JP Australia",
        image: "https://images.unsplash.com/photo-1465223616654-e0544f932854?auto=format&fit=crop&w=800&q=80",
        condition: "Usato - Buono",
        year: 2020,
        location: "Garda",
        lat: 45.6049, lng: 10.6351
    }
];

// Sub-component for Search Control Overlay
function LocationSearch({ setFlyTo }) {
    const [query, setQuery] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [isOpen, setIsOpen] = useState(false);

    const handleSearch = (e) => {
        const val = e.target.value;
        setQuery(val);

        if (val.length < 2) {
            setSuggestions([]);
            setIsOpen(false);
            return;
        }

        const lowerVal = val.toLowerCase();
        const filtered = POPULAR_LOCATIONS.filter(loc =>
            loc.name.toLowerCase().includes(lowerVal)
        );
        setSuggestions(filtered);
        setIsOpen(true);
    };

    const handleSelect = (loc) => {
        setQuery(loc.name);
        setSuggestions([]);
        setIsOpen(false);
        setFlyTo({ lat: loc.lat, lng: loc.lng, zoom: 12 }); // Trigger fly-to
    };

    return (
        <div className="absolute top-4 left-4 z-[1000] w-[320px] font-sans">
            <div className="bg-white rounded-xl shadow-xl shadow-slate-900/10 flex items-center p-1 border border-slate-200">
                <div className="pl-3 text-slate-400">
                    <Search size={20} />
                </div>
                <input
                    type="text"
                    value={query}
                    onChange={handleSearch}
                    placeholder="Cerca località (es. Tarifa, Garda...)"
                    className="w-full bg-transparent border-none focus:ring-0 text-slate-700 placeholder-slate-400 text-sm font-medium py-2.5 px-3"
                    onFocus={() => query.length >= 2 && setIsOpen(true)}
                />
            </div>

            {isOpen && suggestions.length > 0 && (
                <div className="mt-2 bg-white rounded-xl shadow-xl border border-slate-100 overflow-hidden animate-fadeIn">
                    <ul className="py-1">
                        {suggestions.map((loc, idx) => (
                            <li key={idx}>
                                <button
                                    onClick={() => handleSelect(loc)}
                                    className="w-full text-left px-4 py-3 hover:bg-slate-50 flex items-center gap-3 transition-colors border-b border-slate-50 last:border-0"
                                >
                                    <div className="bg-slate-100 p-1.5 rounded-full text-slate-500">
                                        <MapPin size={14} />
                                    </div>
                                    <span className="text-sm font-semibold text-slate-700">{loc.name}</span>
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}

// Sub-component to handle map animations
function MapController({ flyTo, setFlyTo }) {
    const map = useMap();

    if (flyTo) {
        map.flyTo([flyTo.lat, flyTo.lng], flyTo.zoom, {
            duration: 2.5, // Slower, cinematic fly-to
            easeLinearity: 0.25
        });
        setFlyTo(null); // Reset trigger
    }

    return null;
}

export default function Marketplace({ filters, searchTerm, onNavigate }) {
    const [viewMode, setViewMode] = useState('grid');
    const [flyTo, setFlyTo] = useState(null); // State to trigger map fly-to

    // Filter Logic: Combined Search + Sidebar Filters
    const filteredProducts = mockProducts.filter(product => {
        // 1. Search Term
        if (searchTerm) {
            const term = searchTerm.toLowerCase();
            const matchesTitle = product.title.toLowerCase().includes(term);
            const matchesDesc = (product.description || "").toLowerCase().includes(term);
            if (!matchesTitle && !matchesDesc) return false;
        }
        // 2. Filters (Simplified for brevity, same as before)
        if (filters.sport && product.sport !== filters.sport) return false;
        if (filters.brand && product.brand !== filters.brand) return false;
        if (filters.category && product.category !== filters.category) return false;
        if (filters.maxPrice && product.price > filters.maxPrice) return false;
        return true;
    });

    return (
        <div className="bg-[#1E293B] min-h-screen pt-24 pb-12">
            <div className="container px-4 h-full flex flex-col">

                {/* Header Section: Count & View Toggle */}
                <div className="flex justify-between items-center mb-6">
                    <div className="flex items-center gap-4">
                        <div className="text-slate-400 text-sm font-medium bg-slate-800/50 px-3 py-1 rounded-full border border-slate-700">
                            {filteredProducts.length} risultati
                        </div>
                    </div>

                    {/* View Toggle */}
                    <div className="flex bg-slate-800 p-1 rounded-lg border border-slate-700">
                        <button
                            onClick={() => setViewMode('grid')}
                            className={`p-2 rounded-md transition-all flex items-center gap-2 ${viewMode === 'grid' ? 'bg-slate-700 text-sky-400 shadow-sm' : 'text-slate-400 hover:text-slate-200'}`}
                            title="Vista Griglia"
                        >
                            <Grid size={18} />
                            <span className="text-xs font-bold hidden sm:inline">GRIGLIA</span>
                        </button>
                        <button
                            onClick={() => setViewMode('map')}
                            className={`p-2 rounded-md transition-all flex items-center gap-2 ${viewMode === 'map' ? 'bg-slate-700 text-sky-400 shadow-sm' : 'text-slate-400 hover:text-slate-200'}`}
                            title="Vista Mappa"
                        >
                            <Map size={18} />
                            <span className="text-xs font-bold hidden sm:inline">MAPPA</span>
                        </button>
                    </div>
                </div>

                {/* Content Area */}
                {viewMode === 'grid' ? (
                    // GRID VIEW
                    filteredProducts.length > 0 ? (
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 animate-fadeIn">
                            {filteredProducts.map(product => (
                                <ProductCard key={product.id} product={product} onNavigate={onNavigate} />
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-32">
                            <div className="bg-slate-800/30 rounded-3xl p-12 inline-block border border-slate-700/50">
                                <p className="text-2xl text-slate-300 font-bold mb-3">Nessun prodotto trovato 🌊</p>
                                <p className="text-slate-500">Prova a modificare i filtri o la ricerca per trovare l'onda giusta.</p>
                            </div>
                        </div>
                    )
                ) : (
                    // MAP VIEW
                    <div className="h-[calc(100vh-220px)] w-full rounded-2xl overflow-hidden border border-slate-700 shadow-2xl relative z-0 animate-fadeIn bg-slate-100">
                        {/* Smart Search Bar Overlay */}
                        <LocationSearch setFlyTo={setFlyTo} />

                        {/* Legal Badge */}
                        <div className="absolute top-4 right-4 z-[900] bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-full border border-slate-200 shadow-sm flex items-center gap-2">
                            <ShieldCheck size={14} className="text-emerald-500" />
                            <span className="text-[10px] font-bold text-slate-600 uppercase tracking-wide">Mappa Protetta</span>
                        </div>

                        <MapContainer
                            center={[42.6, 12.5]}
                            zoom={6}
                            scrollWheelZoom={true}
                            className="h-full w-full bg-slate-100"
                        >
                            {/* Controller for Animations */}
                            <MapController flyTo={flyTo} setFlyTo={setFlyTo} />

                            {/* Light Theme Tiles (CartoDB Voyager) */}
                            <TileLayer
                                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
                                url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
                            />

                            {/* Product Circles */}
                            {filteredProducts.map(product => (
                                product.lat && (
                                    <Circle
                                        key={product.id}
                                        center={[product.lat, product.lng]}
                                        pathOptions={{
                                            fillColor: '#0ea5e9', // Sky-500
                                            color: '#0284c7', // Sky-600
                                            weight: 2,
                                            opacity: 0.8,
                                            fillOpacity: 0.4
                                        }}
                                        radius={8000}
                                    >
                                        <Popup className="custom-popup-light" closeButton={false}>
                                            <div className="w-[260px] bg-white p-0 rounded-xl overflow-hidden shadow-2xl font-sans">
                                                {/* Mini Card Header */}
                                                <div className="relative h-24">
                                                    <img src={product.image} className="w-full h-full object-cover" />
                                                    <div className="absolute top-2 right-2 bg-white/90 backdrop-blur px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider text-slate-800 shadow-sm">
                                                        {product.condition}
                                                    </div>
                                                </div>

                                                {/* Content */}
                                                <div className="p-3">
                                                    <h4 className="font-bold text-slate-900 text-sm line-clamp-1 mb-0.5">{product.title}</h4>
                                                    <p className="text-slate-500 text-xs mb-2">{product.category} • {product.brand}</p>
                                                    <div className="flex items-end justify-between">
                                                        <span className="text-lg font-black text-sky-600">{product.price} €</span>
                                                        <div className="flex items-center gap-1 text-[10px] text-emerald-600 font-bold bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-100">
                                                            <Banknote size={10} /> 3 Rate
                                                        </div>
                                                    </div>
                                                </div>

                                                <Link to={`/product/${product.id}`} className="block bg-slate-900 text-white text-center text-xs font-bold py-2.5 hover:bg-sky-600 transition-colors">
                                                    VAI ALL'ANNUNCIO
                                                </Link>
                                            </div>
                                        </Popup>
                                    </Circle>
                                )
                            ))}
                        </MapContainer>
                    </div>
                )}
            </div>

            <style>{`
                /* Leaflet Light Styles Override */
                .leaflet-popup-content-wrapper {
                    background: transparent !important;
                    box-shadow: none !important;
                    padding: 0 !important;
                }
                .leaflet-popup-tip {
                    background: #ffffff !important;
                    box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);
                }
            `}</style>
        </div>
    )
}
