import { useState } from 'react';
import { Calendar, MapPin, ExternalLink, Globe, Star } from 'lucide-react';

export default function Community() {
    const [activeSport, setActiveSport] = useState('Windsurf');

    const sportsData = [
        {
            sport: "Windsurf",
            icon: "windsurf_icon",
            // Flat list as requested
            events: [
                { date: "31 Gen - 08 Feb", title: "Margaret River Pro", location: "Australia 🇦🇺", circuit: "WWT-PWA", stars: "4" },
                { date: "30 Mar - 05 Apr", title: "Maui Pro Am", location: "Hawaii, USA 🇺🇸", circuit: "WWT-PWA", stars: "5" },
                { date: "04 Lug - 12 Lug", title: "Gran Canaria World Cup", location: "Pozo, Spagna 🇪🇸", circuit: "WWT-PWA", stars: "5" },
                { date: "17 Lug - 26 Lug", title: "Fuerteventura Grand Slam", location: "Canarie 🇪🇸", circuit: "PWA", stars: "Grand Slam" },
                { date: "31 Lug - 09 Ago", title: "Tenerife World Cup", location: "Canarie 🇪🇸", circuit: "WWT-PWA", stars: "5" },
                { date: "25 Set - 04 Ott", title: "Mercedes-Benz World Cup Sylt", location: "Germania 🇩🇪", circuit: "WWT-PWA", stars: "5" },
                { date: "19 Ott - 30 Ott", title: "The Aloha Classic", location: "Maui, Hawaii 🇺🇸", circuit: "WWT-PWA", stars: "5" },
                { date: "Date TBC", title: "Yokosuka World Cup", location: "Giappone 🇯🇵", circuit: "PWA", stars: "World Cup" },
                { date: "14 Nov - 24 Nov", title: "Chile Grand Final", location: "Matanzas, Cile 🇨🇱", circuit: "WWT-PWA", stars: "Final" }
            ]
        },
        {
            sport: "Wingfoil",
            icon: "wingfoil_icon",
            events: [
                { date: "Febbraio 2026", title: "Wingfoil Racing World Cup Hong Kong", location: "Hong Kong 🇭🇰", circuit: "IWSA", stars: "Racing" },
                { date: "21 Apr - 26 Apr", title: "Mondial du Vent", location: "Leucate, Francia 🇫🇷", circuit: "GWA", stars: "Surf-Freestyle" },
                { date: "Giugno 2026", title: "Wingfoil Racing World Cup Switzerland", location: "Svizzera 🇨🇭", circuit: "IWSA", stars: "Racing" },
                { date: "16 Jun - 21 Jun", title: "GWA Wingfoil World Cup Croatia", location: "Brac, Croazia 🇭🇷", circuit: "GWA", stars: "Slalom & Free" },
                { date: "24 Jun - 27 Jun", title: "Tarifa Wing Pro", location: "Tarifa, Spagna 🇪🇸", circuit: "GWA", stars: "Surf-Freestyle" },
                { date: "01 Jul - 04 Jul", title: "Lanzarote World Cup", location: "Lanzarote, Canarie 🇪🇸", circuit: "GWA", stars: "Surf-Freestyle" },
                { date: "Luglio 2026", title: "Wingfoil Racing World Cup Calabria", location: "Calabria, Italia 🇮🇹", circuit: "IWSA", stars: "Racing" },
                { date: "21 Jul - 25 Jul", title: "Gran Canaria World Cup", location: "Gran Canaria, Spagna 🇪🇸", circuit: "GWA", stars: "Surf-Freestyle" },
                { date: "27 Jul - 01 Aug", title: "Fuerteventura World Cup", location: "Fuerteventura, Canarie 🇪🇸", circuit: "GWA", stars: "FreeFly-Slalom" },
                { date: "Agosto 2026", title: "Wingfoil Racing World Cup Istanbul", location: "Istanbul, Turchia 🇹🇷", circuit: "IWSA", stars: "Racing" },
                { date: "Settembre 2026", title: "Wingfoil Racing World Cup China", location: "Cina 🇨🇳", circuit: "IWSA", stars: "Racing" },
                { date: "Ottobre 2026", title: "Wingfoil Racing World Cup Sardinia", location: "Sardegna, Italia 🇮🇹", circuit: "IWSA", stars: "Racing" },
                { date: "20 Oct - 25 Oct", title: "Abu Dhabi World Cup", location: "Abu Dhabi, UAE 🇦🇪", circuit: "GWA", stars: "FreeFly-Slalom" },
                { date: "05 Nov - 13 Nov", title: "Ibiraquera Wingfoil Cup", location: "Ibiraquera, Brasile 🇧🇷", circuit: "GWA", stars: "Wave" },
                { date: "16 Nov - 22 Nov", title: "Taiba Wingfoil World Cup", location: "Taiba, Brasile 🇧🇷", circuit: "GWA", stars: "Surf-Freestyle" },
                { date: "Dicembre 2026", title: "Wingfoil Racing World Cup Brazil", location: "Brasile 🇧🇷", circuit: "IWSA", stars: "Racing" },
                { date: "07 Dec - 10 Dec", title: "Jericoacoara World Cup", location: "Jericoacoara, Brasile 🇧🇷", circuit: "GWA", stars: "Surf-Freestyle" }
            ]
        },
        {
            sport: "Kitesurf",
            icon: "kite_icon",
            events: [
                { date: "16 Feb - 21 Feb", title: "GKA Kite-Surf World Cup Cape Verde", location: "Sal, Capo Verde 🇨🇻", circuit: "GKA", stars: "Kite-Surf" },
                { date: "28 Mar - 26 Apr", title: "Lords Of Tram (Big Air World Cup)", location: "Barcarès, Francia 🇫🇷", circuit: "GKA", stars: "Big Air" },
                { date: "26 May - 30 May", title: "GKA Freestyle World Cup Mexico", location: "Puerto Vallarta, Messico 🇲🇽", circuit: "GKA", stars: "Freestyle" },
                { date: "03 Jun - 07 Jun", title: "GKA Freestyle World Cup Germany", location: "Borkum, Germania 🇩🇪", circuit: "GKA", stars: "Freestyle" },
                { date: "15 Jun - 21 Jun", title: "GKA Big Air World Cup Greece", location: "Mykonos, Grecia 🇬🇷", circuit: "GKA", stars: "Big Air" },
                { date: "25 Aug - 30 Aug", title: "GKA Kite World Cup Sylt", location: "Sylt, Germania 🇩🇪", circuit: "GKA", stars: "Wave & Hydrofoil" },
                { date: "04 Oct - 11 Oct", title: "GKA Kite-Surf World Cup Dakhla", location: "Dakhla, Marocco 🇲🇦", circuit: "GKA", stars: "Kite-Surf" },
                { date: "20 Oct - 25 Oct", title: "GKA Hydrofoil Big Air World Cup", location: "Abu Dhabi, UAE 🇦🇪", circuit: "GKA", stars: "Hydrofoil Big Air" },
                { date: "28 Oct - 31 Oct", title: "GKA Freestyle World Cup Taiba", location: "Taiba, Brasile 🇧🇷", circuit: "GKA", stars: "Freestyle" },
                { date: "05 Nov - 13 Nov", title: "GKA Kite-Surf World Cup Ibiraquera", location: "Ibiraquera, Brasile 🇧🇷", circuit: "GKA", stars: "Kite-Surf" },
                { date: "16 Nov - 22 Nov", title: "GKA Kite-Surf World Cup Taiba", location: "Taiba, Brasile 🇧🇷", circuit: "GKA", stars: "Kite-Surf" }
            ]
        },
        {
            sport: "Surf",
            icon: "surf_icon",
            events: [
                { date: "29 Jan - 09 Feb", title: "Lexus Pipe Challenger", location: "Pipeline, Hawaii 🇺🇸", circuit: "WSL CS", stars: "Challenger" },
                { date: "09 Mar - 15 Mar", title: "Newcastle Surfest", location: "Newcastle, Australia 🇦🇺", circuit: "WSL CS", stars: "Challenger" },
                { date: "01 Apr - 11 Apr", title: "Rip Curl Pro Bells Beach", location: "Victoria, Australia 🇦🇺", circuit: "WSL CT", stars: "Stop #1" },
                { date: "17 Apr - 27 Apr", title: "Western Australia Margaret River Pro", location: "Margaret River, Australia 🇦🇺", circuit: "WSL CT", stars: "Stop #2" },
                { date: "01 May - 11 May", title: "Bonsoy Gold Coast Pro", location: "Snapper Rocks, Australia 🇦🇺", circuit: "WSL CT", stars: "Stop #3" },
                { date: "15 May - 25 May", title: "Raglan Pro (New Stop)", location: "Raglan, Nuova Zelanda 🇳🇿", circuit: "WSL CT", stars: "Stop #4" },
                { date: "05 Jun - 15 Jun", title: "Surf City El Salvador Pro", location: "Punta Roca, El Salvador 🇸🇻", circuit: "WSL CT", stars: "Stop #5" },
                { date: "19 Jun - 27 Jun", title: "Vivo Rio Pro", location: "Saquarema, Brasile 🇧🇷", circuit: "WSL CT", stars: "Stop #6" },
                { date: "25 Jul - 02 Aug", title: "Wallex US Open of Surfing", location: "Huntington Beach, USA 🇺🇸", circuit: "WSL CS", stars: "Challenger" },
                { date: "08 Aug - 18 Aug", title: "SHISEIDO Tahiti Pro", location: "Teahupo'o, Tahiti 🇵🇫", circuit: "WSL CT", stars: "Stop #7" },
                { date: "25 Aug - 04 Sep", title: "Corona Fiji Pro", location: "Cloudbreak, Fiji 🇫🇯", circuit: "WSL CT", stars: "Stop #8" },
                { date: "11 Sep - 20 Sep", title: "WSL Finals (Trestles Pro)", location: "Trestles, California 🇺🇸", circuit: "WSL CT", stars: "Stop #9" },
                { date: "14 Oct - 18 Oct", title: "Surf Abu Dhabi Pro", location: "Abu Dhabi, UAE 🇦🇪", circuit: "WSL CT", stars: "Stop #10" },
                { date: "22 Oct - 01 Nov", title: "MEO Rip Curl Pro Portugal", location: "Peniche, Portogallo 🇵🇹", circuit: "WSL CT", stars: "Stop #11" },
                { date: "08 Dec - 20 Dec", title: "Lexus Pipe Masters (The Finale)", location: "Pipeline, Hawaii 🇺🇸", circuit: "WSL CT", stars: "World Title" }
            ]
        }
    ];

    const getBadgeStyle = (circuit, stars = '') => {
        const c = circuit.toLowerCase();
        const s = stars.toLowerCase();

        // Kitesurf / GKA Disciplines
        if (s.includes('big air')) return "bg-red-500/10 text-red-400 border-red-500/20";
        if (s.includes('freestyle')) return "bg-green-500/10 text-green-400 border-green-500/20";
        if (s.includes('kite-surf') || s.includes('wave')) return "bg-blue-600/10 text-blue-400 border-blue-600/20"; // Wave

        if (c.includes('wwt')) return "bg-cyan-500/10 text-cyan-400 border-cyan-500/20"; // WWT
        if (c.includes('pwa')) return "bg-blue-600/10 text-blue-400 border-blue-600/20"; // PWA

        if (c.includes('gwa')) return "bg-emerald-500/10 text-emerald-400 border-emerald-500/20";
        if (c.includes('gka')) return "bg-orange-500/10 text-orange-400 border-orange-500/20"; // Fallback GKA
        if (c.includes('iwsa')) return "bg-fuchsia-500/10 text-fuchsia-400 border-fuchsia-500/20"; // IWSA Racing
        if (c.includes('wsl')) return "bg-indigo-500/10 text-indigo-400 border-indigo-500/20";

        if (c.includes('special') || c.includes('title match') || c.includes('final')) return "bg-amber-400/20 text-amber-300 border-amber-400/50 shadow-[0_0_10px_rgba(251,191,36,0.2)]"; // Special Gold

        return "bg-slate-700 text-slate-300";
    };

    const currentSportData = sportsData.find(s => s.sport === activeSport);
    const eventsToRender = currentSportData?.events || [];

    return (
        <div className="bg-slate-900 min-h-screen text-slate-200 font-sans">

            {/* HERO SECTION */}
            <div className="relative py-32 md:py-48 overflow-hidden bg-slate-950">
                <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-[#0f172a] to-slate-950 z-0"></div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-sky-500/10 rounded-full blur-[120px] pointer-events-none z-0 mix-blend-screen"></div>
                <div className="absolute bottom-0 left-0 w-full h-[300px] bg-gradient-to-t from-sky-900/10 to-transparent pointer-events-none z-0"></div>
                <div className="container px-4 mx-auto relative z-10 text-center">
                    <h1 className="text-6xl md:text-9xl font-extrabold font-display tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white via-white to-sky-200 drop-shadow-2xl">
                        Community Hub
                    </h1>
                </div>
            </div>

            {/* SECTION 1: EVENTS */}
            <div className="py-16 bg-slate-800/50">
                <div className="container px-4 mx-auto relative">

                    <h2 className="text-2xl md:text-3xl font-extrabold text-white font-display uppercase tracking-wider mb-8">
                        Upcoming Events 2K26
                    </h2>

                    {/* Left Column: Filters (Floating Desktop Sidebar) */}
                    <div className="hidden md:flex flex-col gap-2 absolute left-[-140px] top-24 w-32 text-right">
                        {sportsData.map((s) => (
                            <button
                                key={s.sport}
                                onClick={() => setActiveSport(s.sport)}
                                className={`py-1 text-xs font-bold uppercase tracking-wider transition-all hover:text-cyan-400 ${activeSport === s.sport ? 'text-cyan-400' : 'text-slate-500'}`}
                            >
                                {s.sport}
                            </button>
                        ))}
                    </div>

                    {/* Mobile Filters (Horizontal Scroll) */}
                    <div className="md:hidden flex gap-4 overflow-x-auto pb-4 mb-4 no-scrollbar">
                        {sportsData.map((s) => (
                            <button
                                key={s.sport}
                                onClick={() => setActiveSport(s.sport)}
                                className={`flex-shrink-0 text-xs font-bold uppercase tracking-wider transition-all whitespace-nowrap ${activeSport === s.sport ? 'text-cyan-400 border-b-2 border-cyan-400' : 'text-slate-500'}`}
                            >
                                {s.sport}
                            </button>
                        ))}
                    </div>

                    <div className="w-full overflow-hidden">

                        {/* Events Slider - Horizontal Scroll */}
                        <div className="flex overflow-x-auto gap-5 pb-8 no-scrollbar snap-x snap-mandatory -mx-4 px-4 md:mx-0 md:px-0">
                            {eventsToRender.map((event, index) => (
                                <div key={index}
                                    className={`flex-none w-[350px] md:w-[380px] snap-center group relative flex flex-col justify-between bg-slate-900/90 backdrop-blur-md border border-white/5 rounded-2xl p-6 hover:border-cyan-500/50 hover:shadow-lg hover:shadow-cyan-500/10 hover:-translate-y-0.5 transition-all duration-300 overflow-hidden`}
                                >
                                    {/* Glow Effect on Hover */}
                                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>

                                    {/* Header: Badge (Left) & Date (Right) */}
                                    <div className="flex items-center justify-between mb-4 relative z-10 w-full">
                                        {/* Badge Pill */}
                                        <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border bg-slate-950/50 backdrop-blur-md ${getBadgeStyle(event.circuit || '', event.stars || '')}`}>
                                            <span className="text-xs font-bold uppercase tracking-wide">{event.circuit}</span>
                                            {(event.stars && !event.stars.includes('#')) && (
                                                <>
                                                    <span className="w-px h-3 bg-current opacity-30"></span>
                                                    <span className="flex items-center gap-1 text-xs font-bold">
                                                        {event.stars}
                                                        {['1', '2', '3', '4', '5'].some(s => event.stars.includes(s)) && <Star size={10} fill="currentColor" />}
                                                    </span>
                                                </>
                                            )}
                                        </div>
                                        <span className="text-cyan-400 text-sm font-bold tracking-wide whitespace-nowrap ml-2 bg-slate-900/50 px-3 py-1 rounded-md border border-cyan-500/20">{event.date}</span>
                                    </div>

                                    {/* Body: Title */}
                                    <div className="flex-grow flex flex-col justify-center relative z-10 mb-4 w-full">
                                        <h3 className="text-xl text-white font-bold leading-tight break-words group-hover:text-cyan-50 transition-colors">
                                            {event.title}
                                        </h3>
                                    </div>

                                    {/* Footer: Location & Info */}
                                    <div className="flex items-center justify-between pt-4 border-t border-white/5 relative z-10 w-full mt-auto">
                                        <div className="flex items-center gap-2 text-slate-400 min-w-0 pr-2">
                                            <MapPin size={16} className="text-slate-500 flex-shrink-0" />
                                            <span className="text-sm font-medium uppercase tracking-wide truncate">{event.location}</span>
                                        </div>

                                        <a href="#" className="flex-shrink-0 flex items-center gap-1.5 text-xs font-bold text-slate-500 group-hover:text-cyan-400 transition-colors bg-slate-800/50 hover:bg-cyan-950/30 px-3 py-1.5 rounded-lg border border-transparent hover:border-cyan-500/20">
                                            INFO <ExternalLink size={12} />
                                        </a>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* SECTION 2: STORIES (Same as before) */}
            <div className="py-24 container px-4 mx-auto">
                <h2 className="text-3xl font-bold text-white font-display mb-12 border-l-4 border-sky-500 pl-4">
                    Dal Mondo WaterMarket
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Story 1 */}
                    <div className="group cursor-pointer">
                        <div className="aspect-[4/3] bg-slate-800 rounded-2xl overflow-hidden mb-6 relative">
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent opacity-60 group-hover:opacity-40 transition-opacity"></div>
                            <div className="absolute inset-0 flex items-center justify-center bg-slate-700">
                                <span className="text-slate-500 font-bold text-lg">IMG STORY 1</span>
                            </div>
                        </div>
                        <div className="flex items-center gap-3 mb-3">
                            <span className="text-xs font-bold text-sky-400 uppercase tracking-wider">Intervista</span>
                            <span className="text-xs text-slate-500">• 5 min lettura</span>
                        </div>
                        <h3 className="text-xl font-bold text-white mb-3 group-hover:text-sky-400 transition-colors leading-tight">
                            "Come ho venduto la mia prima tavola in 24 ore": La storia di Marco
                        </h3>
                        <p className="text-slate-400 line-clamp-3 text-sm leading-relaxed">
                            Marco ci racconta come WaterMarket ha cambiato il suo modo di gestire l'attrezzatura usata, permettendogli di fare l'upgrade al foil senza stress.
                        </p>
                    </div>

                    {/* Story 2 */}
                    <div className="group cursor-pointer">
                        <div className="aspect-[4/3] bg-slate-800 rounded-2xl overflow-hidden mb-6 relative">
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent opacity-60 group-hover:opacity-40 transition-opacity"></div>
                            <div className="absolute inset-0 flex items-center justify-center bg-slate-700">
                                <span className="text-slate-500 font-bold text-lg">IMG STORY 2</span>
                            </div>
                        </div>
                        <div className="flex items-center gap-3 mb-3">
                            <span className="text-xs font-bold text-sky-400 uppercase tracking-wider">Guide</span>
                            <span className="text-xs text-slate-500">• 8 min lettura</span>
                        </div>
                        <h3 className="text-xl font-bold text-white mb-3 group-hover:text-sky-400 transition-colors leading-tight">
                            Guida definitiva all'acquisto dell'usato sicuro nel 2026
                        </h3>
                        <p className="text-slate-400 line-clamp-3 text-sm leading-relaxed">
                            Cosa controllare prima di comprare una vela usata? I nostri esperti hanno stilato la checklist fondamentale per non avere brutte sorprese.
                        </p>
                    </div>

                    {/* Story 3 */}
                    <div className="group cursor-pointer">
                        <div className="aspect-[4/3] bg-slate-800 rounded-2xl overflow-hidden mb-6 relative">
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent opacity-60 group-hover:opacity-40 transition-opacity"></div>
                            <div className="absolute inset-0 flex items-center justify-center bg-slate-700">
                                <span className="text-slate-500 font-bold text-lg">IMG STORY 3</span>
                            </div>
                        </div>
                        <div className="flex items-center gap-3 mb-3">
                            <span className="text-xs font-bold text-sky-400 uppercase tracking-wider">Tech</span>
                            <span className="text-xs text-slate-500">• 4 min lettura</span>
                        </div>
                        <h3 className="text-xl font-bold text-white mb-3 group-hover:text-sky-400 transition-colors leading-tight">
                            I nuovi materiali eco-sostenibili nel mondo del Windsurf
                        </h3>
                        <p className="text-slate-400 line-clamp-3 text-sm leading-relaxed">
                            Scopri come i brand stanno riducendo l'impatto ambientale nella produzione delle tavole e come questo influisce sulle performance.
                        </p>
                    </div>
                </div>
            </div>

        </div >
    );
}
