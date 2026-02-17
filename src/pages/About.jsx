import { Globe, Truck, ShieldCheck } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function About() {
    return (
        <div className="bg-slate-900 min-h-screen overflow-y-auto text-slate-200 font-sans custom-scrollbar">
            <style>{`
                /* Larghezza della barra */
                .custom-scrollbar::-webkit-scrollbar {
                    width: 8px;
                }
                /* Sfondo della barra (Track) */
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: transparent; 
                }
                /* La barra che si muove (Thumb) */
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background-color: white;
                    border-radius: 10px;
                    border: 2px solid #0f172a; 
                }
            `}</style>

            {/* HERO SECTION (No H1) */}
            <div className="relative py-24 md:py-32 overflow-hidden">
                {/* Background Decor */}
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-sky-900/20 to-slate-900 z-0"></div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-sky-500/10 rounded-full blur-[100px] z-0"></div>
            </div>

            {/* STORY / MISSION SECTION (Moved Up) */}
            <div className="py-12 container px-4 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    {/* Text Column */}
                    <div>
                        <h2 className="text-4xl md:text-5xl font-bold font-display mb-12 tracking-tight text-gradient">
                            Il nostro Spot.
                        </h2>
                        <div className="flex flex-col gap-4 text-lg text-slate-300 leading-relaxed">
                            <p>
                                Tutto nasce da una sensazione che conosciamo bene: l'attesa del vento, il rumore delle onde, la voglia di entrare in acqua. Siamo partiti da qui, dalla nostra stessa passione.
                            </p>
                            <p>
                                Vivendo il mare ogni giorno, conoscevamo anche l'altra faccia della medaglia: la difficoltà di trovare quel feeling perfetto con la nostra attrezzatura. Fino a ieri, vendere una tavola o trovare quella perfetta significava perdersi tra decine di gruppi social disordinati, forum abbandonati e trattative infinite.
                            </p>
                            <p>
                                <span className="text-white font-medium">Mancava un punto di riferimento. Mancava il nostro spot.</span>
                            </p>
                            <p>
                                WaterMarket nasce per colmare questo vuoto. La nostra missione non è creare un semplice marketplace, ma <span className="text-white font-bold">costruire una vera community</span>. Vogliamo unire chi, come noi, vive di vento e acqua, offrendo uno spazio sicuro, centrale e costruito su misura per le nostre esigenze.
                            </p>
                        </div>
                    </div>

                    {/* Image Column */}
                    <div className="relative h-[500px] w-full bg-slate-800 rounded-[2.5rem] overflow-hidden border border-white/10 shadow-2xl group">
                        <img
                            src="/assets/about_windsurfer.png"
                            alt="Windsurfer WaterMarket Team"
                            className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent"></div>
                    </div>
                </div>
            </div>

            {/* VALUES SECTION (Moved Bottom - Horizontal Layout with Centered Text Stack) */}
            <div className="py-24 mt-48 md:mt-64">
                <div className="container px-4 max-w-5xl mx-auto">
                    <div className="flex flex-col gap-12">

                        {/* Card 1: Centralizzazione */}
                        <div className="relative p-10 md:p-12 rounded-[2.5rem] bg-slate-800 border border-white/5 hover:border-sky-500/50 transition-all duration-500 group hover:-translate-y-2 hover:shadow-[0_20px_40px_-10px_rgba(14,165,233,0.2)] overflow-hidden w-full flex flex-col md:flex-row items-center gap-8 md:gap-10 text-center md:text-left">
                            {/* Hover Gradient Background */}
                            <div className="absolute inset-0 bg-gradient-to-br from-sky-500/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>

                            {/* Icon Wrapper (Left) */}
                            <div className="relative shrink-0 w-24 h-24 rounded-2xl bg-gradient-to-br from-slate-700 to-slate-800 border border-white/10 flex items-center justify-center shadow-inner z-10 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500 group-hover:border-sky-500/50 group-hover:shadow-[0_0_20px_rgba(14,165,233,0.3)] mx-auto md:mx-0">
                                <Globe className="text-sky-400 w-12 h-12 group-hover:text-white transition-colors duration-300 relative z-10" />
                            </div>

                            {/* Text Wrapper (Right, Stacked & Centered Internally) */}
                            <div className="relative flex-1 flex flex-col items-center justify-center text-center z-10">
                                <h3 className="text-2xl font-bold text-white mb-3 font-display group-hover:text-gradient transition-colors duration-300 w-full text-center">Un Unico Grande Spot</h3>
                                <p className="text-slate-300 leading-relaxed text-lg max-w-2xl mx-auto text-center">
                                    Basta perdere ore su decine di mercatini diversi, gruppi social e forum dispersivi. Abbiamo centralizzato la domanda e l'offerta in un unico hub digitale verticale. Per chi vende significa massima visibilità istantanea verso un pubblico mirato; per chi compra, la certezza di avere la più ampia scelta possibile di attrezzatura, tutta in un solo luogo.
                                </p>
                            </div>
                        </div>

                        {/* Card 2: Logistica */}
                        <div className="relative p-10 md:p-12 rounded-[2.5rem] bg-slate-800 border border-white/5 hover:border-sky-500/50 transition-all duration-500 group hover:-translate-y-2 hover:shadow-[0_20px_40px_-10px_rgba(14,165,233,0.2)] overflow-hidden w-full flex flex-col md:flex-row items-center gap-8 md:gap-10 text-center md:text-left">
                            {/* Hover Gradient */}
                            <div className="absolute inset-0 bg-gradient-to-br from-sky-500/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>

                            {/* Icon Wrapper */}
                            <div className="relative shrink-0 w-24 h-24 rounded-2xl bg-gradient-to-br from-slate-700 to-slate-800 border border-white/10 flex items-center justify-center shadow-inner z-10 group-hover:scale-110 group-hover:-rotate-3 transition-transform duration-500 group-hover:border-sky-500/50 group-hover:shadow-[0_0_20px_rgba(14,165,233,0.3)] mx-auto md:mx-0">
                                <Truck className="text-sky-400 w-12 h-12 group-hover:text-white transition-colors duration-300 relative z-10" />
                            </div>

                            {/* Text Wrapper */}
                            <div className="relative flex-1 flex flex-col items-center justify-center text-center z-10">
                                <h3 className="text-2xl font-bold text-white mb-3 font-display group-hover:text-gradient transition-colors duration-300 w-full text-center">Logistica Zero Stress</h3>
                                <p className="text-slate-300 leading-relaxed text-lg max-w-2xl mx-auto text-center">
                                    Il terrore di spedire una tavola o un boma è un ricordo del passato. Il nostro sistema integrato gestisce il ritiro e la consegna di attrezzatura ingombrante direttamente a domicilio. Tu prepari il pacco seguendo le nostre guide, noi pensiamo a farlo arrivare a destinazione, tracciato e assicurato. Semplice come vendere una t-shirt.
                                </p>
                            </div>
                        </div>

                        {/* Card 3: Sicurezza */}
                        <div className="relative p-10 md:p-12 rounded-[2.5rem] bg-slate-800 border border-white/5 hover:border-sky-500/50 transition-all duration-500 group hover:-translate-y-2 hover:shadow-[0_20px_40px_-10px_rgba(14,165,233,0.2)] overflow-hidden w-full flex flex-col md:flex-row items-center gap-8 md:gap-10 text-center md:text-left">
                            {/* Hover Gradient */}
                            <div className="absolute inset-0 bg-gradient-to-br from-sky-500/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>

                            {/* Icon Wrapper */}
                            <div className="relative shrink-0 w-24 h-24 rounded-2xl bg-gradient-to-br from-slate-700 to-slate-800 border border-white/10 flex items-center justify-center shadow-inner z-10 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500 group-hover:border-sky-500/50 group-hover:shadow-[0_0_20px_rgba(14,165,233,0.3)] mx-auto md:mx-0">
                                <ShieldCheck className="text-sky-400 w-12 h-12 group-hover:text-white transition-colors duration-300 relative z-10" />
                            </div>

                            {/* Text Wrapper */}
                            <div className="relative flex-1 flex flex-col items-center justify-center text-center z-10">
                                <h3 className="text-2xl font-bold text-white mb-3 font-display group-hover:text-gradient transition-colors duration-300 w-full text-center">Transazioni Protette</h3>
                                <p className="text-slate-300 leading-relaxed text-lg max-w-2xl mx-auto text-center">
                                    La fiducia è alla base della nostra community, ma la sicurezza è garantita dalla tecnologia. Grazie al nostro sistema di pagamento protetto (Escrow), il denaro viene trasferito al venditore solo quando l'acquirente ha ricevuto la merce e ne ha confermato la conformità. Niente truffe, niente brutte sorprese, solo puro sport.
                                </p>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}
