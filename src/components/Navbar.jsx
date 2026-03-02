import { LayoutGrid, PlusCircle, SlidersHorizontal, Search, User, LogOut, Package, ShoppingBag, Bell } from 'lucide-react';
import logo from '../assets/logo_wm_transparent.png';
import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { getSearchSuggestions } from '../data';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { useNotification } from '../context/NotificationContext';


export default function Navbar({ currentPage, onNavigate, onToggleFilters, searchTerm, onSearchChange }) {
    const { user, signOut } = useAuth();
    const { cartCount, setIsCartOpen } = useCart();
    const { notifications, unreadCount, markAsRead, markAllAsRead, addNotification, addToast } = useNotification();

    const [isSearchFocused, setIsSearchFocused] = useState(false);
    const [suggestions, setSuggestions] = useState([]);

    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
    const userMenuRef = useRef(null);

    const [isNotificationMenuOpen, setIsNotificationMenuOpen] = useState(false);
    const notificationMenuRef = useRef(null);

    // Update suggestions when searchTerm changes
    useEffect(() => {
        if (searchTerm) {
            setSuggestions(getSearchSuggestions(searchTerm));
        } else {
            setSuggestions([]);
        }
    }, [searchTerm]);

    // Close user menu when clicking outside
    useEffect(() => {
        function handleClickOutside(event) {
            if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
                setIsUserMenuOpen(false);
            }
            if (notificationMenuRef.current && !notificationMenuRef.current.contains(event.target)) {
                setIsNotificationMenuOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    // Test button simulate notification (for dev)
    useEffect(() => {
        // window.simulateNotification = () => {
        //   addToast("Hai ricevuto un'offerta di €150 per Rrd Firemove 120L", 'success');
        //   addNotification({ title: 'Nuova Offerta', message: "Hai ricevuto un'offerta di €150 per Rrd Firemove 120L", type: 'offer' });
        // };
    }, [addToast, addNotification]);

    const handleLogout = async () => {
        await signOut();
        setIsUserMenuOpen(false);
        onNavigate('home');
    };

    return (
        <>
            {/* Focus Overlay "Cinema Effect" */}
            {isSearchFocused && (
                <div
                    className="fixed inset-0 bg-black/60 z-40 backdrop-blur-sm transition-opacity duration-300"
                    onClick={() => setIsSearchFocused(false)}
                />
            )}

            <nav className={`bg-[var(--color-dark)] border-b border-white/10 py-4 sticky top-0 transition-all duration-300 ${isSearchFocused ? 'z-50' : 'z-50 shadow-md'}`}>
                <div className="container flex items-center justify-between gap-4 relative">

                    {/* 1. Left Section: Filter Button + Logo */}
                    <div className={`flex items-center gap-4 transition-opacity duration-300 ${isSearchFocused ? 'opacity-20 pointer-events-none' : 'opacity-100'}`}>
                        {/* Filter Button */}
                        <button
                            onClick={onToggleFilters}
                            className="flex items-center gap-2 text-sm font-bold text-slate-200 hover:text-white bg-white/10 px-3 py-2 rounded-lg border border-white/10 transition-all hover:bg-white/20 hover:border-white/30"
                        >
                            <SlidersHorizontal size={18} />
                            <span className="hidden md:inline">Filtri</span>
                        </button>

                        {/* Logo Section */}
                        <Link
                            to="/"
                            className="flex items-center cursor-pointer transition-transform hover:scale-105"
                        >
                            <img src={logo} alt="WaterMarket Logo" className="h-16 md:h-20 w-auto object-contain p-1" />
                        </Link>
                    </div>

                    {/* 2. Center Section: Global Search Bar */}
                    <div className={`flex-grow max-w-xl mx-4 transition-all duration-300 ${isSearchFocused ? 'scale-105 z-50' : 'z-auto'}`}>
                        <div className="relative w-full">
                            {/* Flex Container for Search - Premium Dark Glassmorphism */}
                            <div className={`flex items-center w-full px-5 py-3 border transition-all duration-300 group rounded-full ${isSearchFocused
                                ? 'bg-slate-900/95 backdrop-blur-xl border-[var(--color-primary)] ring-4 ring-[var(--color-primary)]/20 shadow-[0_0_30px_-5px_var(--color-primary)]'
                                : 'bg-white/10 border-transparent hover:bg-white/15 focus-within:bg-slate-900 focus-within:border-[var(--color-primary)]'
                                }`}>

                                {/* Search Icon */}
                                <div className={`mr-3 flex-shrink-0 transition-colors duration-300 ${isSearchFocused ? 'text-[var(--color-primary)] drop-shadow-[0_0_8px_var(--color-primary)]' : 'text-slate-400 group-focus-within:text-[var(--color-primary)]'}`}>
                                    <Search size={22} strokeWidth={isSearchFocused ? 2.5 : 2} />
                                </div>

                                {/* Input Field */}
                                <input
                                    type="text"
                                    placeholder="Cerca tavole, vele..."
                                    className={`w-full bg-transparent border-none focus:outline-none text-sm h-full transition-colors duration-300 ${isSearchFocused ? 'text-white placeholder:text-slate-500' : 'text-white group-focus-within:text-white placeholder:text-slate-400'
                                        }`}
                                    value={searchTerm}
                                    onChange={(e) => onSearchChange(e.target.value)}
                                    onFocus={() => setIsSearchFocused(true)}
                                    // Delay blur to allow clicking suggestions
                                    onBlur={() => setTimeout(() => setIsSearchFocused(false), 200)}
                                />
                            </div>

                            {/* Suggestions Dropdown - Premium Dark */}
                            {isSearchFocused && suggestions.length > 0 && (
                                <div className="absolute top-full left-0 right-0 mt-3 bg-slate-900/95 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl overflow-hidden animate-in fade-in slide-in-from-top-4 duration-200">
                                    <div className="py-2">
                                        <div className="px-5 py-3 text-xs font-bold text-[var(--color-primary)] uppercase tracking-widest opacity-80">
                                            Suggerimenti
                                        </div>
                                        {suggestions.map((suggestion, index) => (
                                            <div
                                                key={index}
                                                className="px-5 py-3.5 hover:bg-white/5 cursor-pointer flex items-center gap-4 text-slate-300 hover:text-white transition-all border-l-2 border-transparent hover:border-[var(--color-primary)]"
                                                onClick={() => {
                                                    onSearchChange(suggestion);
                                                    setIsSearchFocused(false);
                                                }}
                                            >
                                                <Search size={16} className="text-slate-500" />
                                                <span className="font-medium">{suggestion}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* 3. Right Section: Auth & Navigation */}
                    <div className={`flex items-center gap-4 transition-opacity duration-300 ${isSearchFocused ? 'opacity-20 pointer-events-none' : 'opacity-100'}`}>

                        <Link
                            to="/marketplace"
                            className={`hidden lg:block font-bold text-lg transition-colors ${currentPage === '/marketplace'
                                ? 'text-gradient'
                                : 'text-slate-300 hover:text-white'
                                }`}
                        >
                            Marketplace
                        </Link>

                        <Link
                            to="/community"
                            className={`hidden lg:block font-bold text-lg transition-colors ${currentPage === '/community'
                                ? 'text-gradient'
                                : 'text-slate-300 hover:text-white'
                                }`}
                        >
                            Community
                        </Link>


                        <Link
                            to="/sell"
                            className="hidden sm:flex items-center justify-center gap-3 w-40 py-3 rounded-full font-bold text-sm tracking-widest !text-white hover:!text-white shadow-lg hover:shadow-cyan-500/40 hover:brightness-110 transform transition-all duration-300 active:scale-95 bg-[var(--color-primary)] uppercase"
                        >
                            <PlusCircle size={18} />
                            <span>Vendi</span>
                        </Link>

                        {/* Cart Button */}
                        <button
                            onClick={() => setIsCartOpen(true)}
                            className="relative p-2 text-slate-200 hover:text-white transition-colors"
                        >
                            <ShoppingBag size={24} />
                            {cartCount > 0 && (
                                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold h-5 w-5 flex items-center justify-center rounded-full border-2 border-[var(--color-dark)]">
                                    {cartCount}
                                </span>
                            )}
                        </button>

                        {/* Notifications Button */}
                        <div className="relative" ref={notificationMenuRef}>
                            <button
                                onClick={() => setIsNotificationMenuOpen(!isNotificationMenuOpen)}
                                className="relative p-2 text-slate-200 hover:text-white transition-colors"
                            >
                                <Bell size={24} />
                                {unreadCount > 0 && (
                                    <span className="absolute top-1 right-2 h-2.5 w-2.5 rounded-full bg-[#0EA5E9] border-2 border-[var(--color-dark)] shadow-[0_0_8px_rgba(14,165,233,0.8)] animate-pulse"></span>
                                )}
                            </button>

                            {/* Dropdown Menu (Glassmorphism) */}
                            {isNotificationMenuOpen && (
                                <div className="absolute right-0 mt-2 w-80 bg-slate-900/90 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl py-2 z-50 animate-in fade-in slide-in-from-top-4 duration-200">
                                    <div className="px-4 py-3 border-b border-white/10 flex items-center justify-between">
                                        <h3 className="text-white font-bold tracking-wide">Notifiche</h3>
                                        {unreadCount > 0 && (
                                            <button
                                                onClick={() => markAllAsRead()}
                                                className="text-xs text-[var(--color-primary)] hover:text-white transition-colors"
                                            >
                                                Segna tutte lette
                                            </button>
                                        )}
                                    </div>
                                    <div className="max-h-72 overflow-y-auto custom-scrollbar">
                                        {notifications.length === 0 ? (
                                            <div className="px-4 py-8 text-center text-slate-400 text-sm">
                                                Nessuna nuova notifica

                                                {/* Hidden dev button triggers for testing */}
                                                <div className="mt-4 flex gap-2 justify-center">
                                                    <button
                                                        onClick={() => {
                                                            addToast("Hai ricevuto un'offerta di €150 per Rrd Firemove 120L", 'success');
                                                            addNotification({ title: 'Nuova Offerta', message: "Hai ricevuto un'offerta di €150 per Rrd Firemove 120L", type: 'offer' });
                                                        }}
                                                        className="text-[10px] bg-white/5 p-1 rounded hover:bg-white/10"
                                                    >Test Offerta</button>
                                                    <button
                                                        onClick={() => {
                                                            addToast("Il tuo QR Code per lo scambio sicuro è pronto!", 'info');
                                                            addNotification({ title: 'QR Code Pronto', message: "Il tuo QR Code per lo scambio sicuro è pronto!", type: 'system' });
                                                        }}
                                                        className="text-[10px] bg-white/5 p-1 rounded hover:bg-white/10"
                                                    >Test QR</button>
                                                </div>
                                            </div>
                                        ) : (
                                            notifications.map((notif) => (
                                                <div
                                                    key={notif.id}
                                                    onClick={() => markAsRead(notif.id)}
                                                    className={`px-4 py-3 hover:bg-white/5 cursor-pointer transition-colors border-l-2 ${notif.read ? 'border-transparent opacity-60' : 'border-[var(--color-primary)] bg-white/[0.02]'}`}
                                                >
                                                    <p className="text-sm font-bold text-white mb-0.5">{notif.title}</p>
                                                    <p className="text-xs text-slate-300">{notif.message}</p>
                                                    <p className="text-[10px] text-slate-500 mt-2">
                                                        {new Date(notif.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                                    </p>
                                                </div>
                                            ))
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>

                        {user ? (
                            // User Logged In
                            <div className="relative" ref={userMenuRef}>
                                <button
                                    onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                                    className="flex items-center gap-2 text-slate-200 hover:text-white pl-2 transition-colors"
                                >
                                    <div className="w-10 h-10 rounded-full bg-slate-700 flex items-center justify-center border border-white/10 overflow-hidden">
                                        <div className="w-full h-full flex items-center justify-center bg-[#0EA5E9] text-white font-bold text-lg">
                                            {user.email.charAt(0).toUpperCase()}
                                        </div>
                                    </div>
                                </button>

                                {/* Dropdown Menu */}
                                {isUserMenuOpen && (
                                    <div className="absolute right-0 mt-2 w-48 bg-slate-800 border border-white/10 rounded-xl shadow-2xl py-1 z-50 animate-in fade-in zoom-in-95 duration-200">
                                        <div className="px-4 py-3 border-b border-white/10">
                                            <p className="text-sm text-white font-medium truncate">{user.email}</p>
                                        </div>
                                        <button className="w-full text-left px-4 py-2 text-sm text-slate-300 hover:text-white hover:bg-white/5 flex items-center gap-2">
                                            <User size={16} /> Il mio Profilo
                                        </button>
                                        <button className="w-full text-left px-4 py-2 text-sm text-slate-300 hover:text-white hover:bg-white/5 flex items-center gap-2">
                                            <Package size={16} /> I miei annunci
                                        </button>
                                        <button
                                            onClick={handleLogout}
                                            className="w-full text-left px-4 py-2 text-sm text-red-400 hover:text-red-300 hover:bg-white/5 flex items-center gap-2"
                                        >
                                            <LogOut size={16} /> Logout
                                        </button>
                                    </div>
                                )}
                            </div>
                        ) : (
                            // Guest
                            <Link
                                to="/login"
                                className="text-lg font-bold text-white hover:text-[var(--color-primary)] transition-colors px-3 py-2"
                            >
                                Accedi
                            </Link>
                        )}
                    </div>
                </div>
            </nav>
        </>
    );
}
