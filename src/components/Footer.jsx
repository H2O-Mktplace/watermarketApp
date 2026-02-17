import logo from '../assets/logo_wm_transparent.png';
import { Link } from 'react-router-dom';
import { Mail, Phone, Instagram, Facebook } from 'lucide-react';

export default function Footer() {
    return (
        <footer className="bg-slate-900 border-t border-white/5 pt-16 pb-10 mt-auto relative overflow-hidden">
            {/* Background Glow */}
            <div className="absolute top-0 left-0 w-[600px] h-[300px] bg-cyan-500/5 blur-[120px] rounded-full pointer-events-none -translate-y-1/2"></div>

            <div className="container relative z-10 px-4 mx-auto">

                {/* 1. LOGO (Top) */}
                <div className="flex justify-center mb-16">
                    <Link to="/" className="group relative block transition-transform duration-300 hover:scale-110">
                        <img
                            src={logo}
                            alt="WaterMarket Logo"
                            className="h-28 w-auto object-contain relative z-10 drop-shadow-lg"
                        />
                    </Link>
                </div>

                {/* 2. MAIN GRID (4 Columns) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">

                    {/* BLOCCO 1: CONTATTI */}
                    <div className="flex flex-col gap-6 text-left">
                        <h4 className="text-white font-bold text-lg uppercase tracking-wider text-gradient w-fit">Contatti</h4>
                        <div className="flex flex-col gap-4 text-slate-400">
                            <a href="mailto:info@watermarket.it" className="flex items-center gap-3 hover:text-cyan-400 transition-colors group">
                                <Mail size={18} className="text-cyan-500/80 group-hover:text-cyan-400" />
                                <span>info@watermarket.it</span>
                            </a>
                            <a href="tel:+393331234567" className="flex items-center gap-3 hover:text-cyan-400 transition-colors group">
                                <Phone size={18} className="text-cyan-500/80 group-hover:text-cyan-400" />
                                <span>+39 333 123 4567</span>
                            </a>
                        </div>
                    </div>

                    {/* BLOCCO 2: SOCIAL */}
                    <div className="flex flex-col gap-6 text-left">
                        <h4 className="text-white font-bold text-lg uppercase tracking-wider text-gradient w-fit">Seguici</h4>
                        <div className="flex gap-4">
                            <a href="#" className="p-3 rounded-xl bg-slate-800 border border-white/5 hover:border-cyan-500/50 hover:bg-cyan-500/10 hover:text-cyan-400 transition-all text-slate-400 group">
                                <Instagram size={22} className="group-hover:scale-110 transition-transform" />
                            </a>
                            <a href="#" className="p-3 rounded-xl bg-slate-800 border border-white/5 hover:border-cyan-500/50 hover:bg-cyan-500/10 hover:text-cyan-400 transition-all text-slate-400 group">
                                <Facebook size={22} className="group-hover:scale-110 transition-transform" />
                            </a>
                        </div>
                    </div>

                    {/* BLOCCO 3: NAVIGAZIONE */}
                    <div className="flex flex-col gap-6 text-left">
                        <h4 className="text-white font-bold text-lg uppercase tracking-wider text-gradient w-fit">Esplora</h4>
                        <nav className="flex flex-col gap-3 text-slate-400">
                            <Link to="/marketplace" className="hover:text-cyan-400 transition-colors hover:translate-x-1 duration-300 w-fit">Marketplace</Link>
                            <Link to="/sell" className="hover:text-cyan-400 transition-colors hover:translate-x-1 duration-300 w-fit">Vendi</Link>
                            <Link to="/chi-siamo" className="hover:text-cyan-400 transition-colors hover:translate-x-1 duration-300 w-fit">Chi siamo</Link>
                        </nav>
                    </div>

                    {/* BLOCCO 4: LEGAL */}
                    <div className="flex flex-col gap-6 text-left">
                        <h4 className="text-white font-bold text-lg uppercase tracking-wider text-gradient w-fit">Info</h4>
                        <nav className="flex flex-col gap-3 text-slate-400">
                            <Link to="/privacy" className="hover:text-cyan-400 transition-colors hover:translate-x-1 duration-300 w-fit">Privacy Policy</Link>
                            <Link to="/terms" className="hover:text-cyan-400 transition-colors hover:translate-x-1 duration-300 w-fit">Termini e Condizioni</Link>
                        </nav>
                    </div>

                </div>

                {/* BOTTOM COPYRIGHT */}
                <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center text-slate-600 text-sm gap-4">
                    <p>&copy; {new Date().getFullYear()} WaterMarket. All rights reserved.</p>
                    <p className="flex items-center gap-2">
                        P.IVA 12345678901
                    </p>
                </div>

            </div>
        </footer>
    );
}
