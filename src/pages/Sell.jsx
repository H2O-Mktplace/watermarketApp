import { useState, useMemo } from 'react'
import { Upload } from 'lucide-react'
import { sportsData } from '../data/sportsData'

export default function Sell() {
    const [formData, setFormData] = useState({
        title: '',
        price: '',
        description: '',
        sport: '',
        brand: '',
        category: '',
        model: '',
        size: '',
        volume: '',
        material: '',
        diameter: '',
        carbon: '',
        year: '',
        year: '',
        isCustomModel: false,
        // Wingfoil Specific
        mastLength: '',
        frontWing: '',
        boardMount: ''
    });

    // Cascading Data Helpers
    const sports = Object.keys(sportsData);

    const brands = useMemo(() => {
        if (!formData.sport) return [];
        return Object.keys(sportsData[formData.sport] || {}).sort((a, b) => a.localeCompare(b));
    }, [formData.sport]);

    const categories = useMemo(() => {
        if (!formData.sport || !formData.brand) return [];
        return Object.keys(sportsData[formData.sport][formData.brand] || {}).sort((a, b) => a.localeCompare(b));
    }, [formData.sport, formData.brand]);

    const modelsData = useMemo(() => {
        if (!formData.sport || !formData.brand || !formData.category) return [];
        const data = sportsData[formData.sport][formData.brand][formData.category] || [];
        return [...data].sort((a, b) => a.model.localeCompare(b.model));
    }, [formData.sport, formData.brand, formData.category]);

    const sizes = useMemo(() => {
        if (!formData.model || formData.isCustomModel) return [];
        const modelObj = modelsData.find(m => m.model === formData.model);
        return modelObj ? modelObj.sizes : [];
    }, [formData.model, modelsData, formData.isCustomModel]);

    // Handlers
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => {
            const updated = { ...prev, [name]: value };

            // Reset logic
            if (name === 'sport') {
                updated.brand = ''; updated.category = ''; updated.model = ''; updated.size = ''; updated.volume = ''; updated.isCustomModel = false;
                updated.mastLength = ''; updated.frontWing = ''; updated.boardMount = '';
            } else if (name === 'brand') {
                updated.category = ''; updated.model = ''; updated.size = ''; updated.volume = ''; updated.isCustomModel = false;
                updated.mastLength = ''; updated.frontWing = ''; updated.boardMount = '';
            } else if (name === 'category') {
                updated.model = ''; updated.size = ''; updated.volume = ''; updated.isCustomModel = false;
                updated.material = ''; updated.diameter = ''; updated.carbon = '';
                updated.mastLength = ''; updated.frontWing = ''; updated.boardMount = '';
                if (value === 'other') updated.isCustomModel = true;
            }
            return updated;
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Submitting Product:', formData);
        alert('Prodotto pronto per la pubblicazione! (Simulazione)');
    };

    // Unified Section Styles
    const sectionHeaderClasses = "text-xl md:text-2xl font-black font-display mb-0 uppercase tracking-wide text-left block text-gradient";
    const dividerClasses = "hidden"; // Hidden as we rely on whitespace

    // Form Styles
    // Form Styles
    const inputClasses = "w-full px-4 py-4 bg-slate-800 border border-slate-700 rounded-xl text-white placeholder-slate-400 focus:border-[#0EA5E9] focus:ring-1 focus:ring-[#0EA5E9] outline-none transition-all font-medium hover:border-slate-500 hover:bg-slate-700/80";
    const labelClasses = "block text-sky-400 text-base font-extrabold mb-2 uppercase tracking-wider ml-1";

    return (
        <div className="min-h-screen bg-[#0F172A] py-12 px-4 relative overflow-hidden font-sans">
            {/* Background Gradients */}
            <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-[#0EA5E9]/10 rounded-full blur-[120px] -translate-y-1/2 pointer-events-none"></div>
            <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-purple-500/10 rounded-full blur-[120px] translate-y-1/2 pointer-events-none"></div>

            <div className="container max-w-4xl mx-auto relative z-10">

                {/* Page Header */}
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-black font-outfit tracking-wide uppercase mb-2 drop-shadow-2xl text-gradient">
                        VENDI ATTREZZATURA
                    </h2>
                    <p className="mt-4 text-lg md:text-xl text-white font-medium font-outfit text-center">Dai una seconda vita al tuo usato, con un solo click!</p>
                </div>

                {/* MAIN UNIFIED CARD */}
                {/* MAIN FORM - NO CONTAINER */}
                <div className="">
                    <form onSubmit={handleSubmit}>

                        {/* SECTION 1: SPECIFICHE TECNICHE */}
                        <div className="flex flex-col">
                            <h3 className={sectionHeaderClasses}>
                                Specifiche Tecniche
                            </h3>
                            <div className="h-5 w-full"></div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-5">
                                {/* Sport */}
                                <div className="col-span-1 md:col-span-2">
                                    <label className={labelClasses}>Sport</label>
                                    <select
                                        name="sport"
                                        value={formData.sport}
                                        onChange={handleChange}
                                        className={inputClasses}
                                        required
                                    >
                                        <option value="" className="text-slate-500">Seleziona lo Sport...</option>
                                        {sports.map(s => <option key={s} value={s}>{s.toUpperCase()}</option>)}
                                    </select>
                                </div>

                                {/* Brand */}
                                <div>
                                    <label className={labelClasses}>Marca</label>
                                    <select
                                        name="brand"
                                        value={formData.brand}
                                        onChange={handleChange}
                                        disabled={!brands.length}
                                        className={`${inputClasses} disabled:opacity-50`}
                                        required
                                    >
                                        <option value="">Seleziona Marca...</option>
                                        {brands.map(b => <option key={b} value={b}>{b.toUpperCase()}</option>)}
                                    </select>
                                </div>

                                {/* Category */}
                                <div>
                                    <label className={labelClasses}>Categoria</label>
                                    <select
                                        name="category"
                                        value={formData.category}
                                        onChange={handleChange}
                                        disabled={!categories.length}
                                        className={`${inputClasses} disabled:opacity-50`}
                                        required
                                    >
                                        <option value="">Seleziona Categoria...</option>
                                        {categories.map(c => <option key={c} value={c}>{c.toUpperCase()}</option>)}
                                    </select>
                                </div>

                                {/* Model */}
                                <div>
                                    <label className={labelClasses}>Modello</label>
                                    {formData.isCustomModel ? (
                                        <input
                                            type="text"
                                            name="model"
                                            placeholder="Nome modello..."
                                            className={inputClasses}
                                            onChange={(e) => setFormData(prev => ({ ...prev, model: e.target.value }))}
                                        />
                                    ) : (
                                        <select
                                            name="model"
                                            value={formData.model}
                                            onChange={handleChange}
                                            disabled={!modelsData.length}
                                            className={`${inputClasses} disabled:opacity-50`}
                                            required
                                        >
                                            <option value="">Seleziona Modello...</option>
                                            {modelsData.map(m => <option key={m.model} value={m.model}>{m.model.toUpperCase()}</option>)}
                                            <option value="other" className="font-bold text-[#0EA5E9]">+ Inserisci Manualmente</option>
                                        </select>
                                    )}
                                </div>

                                {/* Year */}
                                <div>
                                    <label className={labelClasses}>Anno</label>
                                    <select
                                        name="year"
                                        value={formData.year}
                                        onChange={handleChange}
                                        className={inputClasses}
                                        required
                                    >
                                        <option value="">Seleziona Anno...</option>
                                        {Array.from({ length: 17 }, (_, i) => 2026 - i).map(y => (
                                            <option key={y} value={y}>{y}</option>
                                        ))}
                                        <option value="Pre-2010">PRE-2010</option>
                                    </select>
                                </div>

                                {/* Dynamic Fields */}
                                <div className="col-span-1 md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-5">
                                    {formData.category === 'Boma' ? (
                                        <div>
                                            <label className={labelClasses}>Materiale</label>
                                            <select name="material" value={formData.material} onChange={handleChange} className={inputClasses} required>
                                                <option value="">Seleziona Materiale</option>
                                                <option value="Carbonio">CARBONIO</option>
                                                <option value="Alluminio">ALLUMINIO</option>
                                            </select>
                                        </div>
                                    ) : formData.category === 'Albero' ? (
                                        <>
                                            <div>
                                                <label className={labelClasses}>Diametro</label>
                                                <select name="diameter" value={formData.diameter} onChange={handleChange} className={inputClasses} required>
                                                    <option value="">Seleziona Diametro</option>
                                                    <option value="RDM">RDM</option>
                                                    <option value="SDM">SDM</option>
                                                </select>
                                            </div>
                                            <div>
                                                <label className={labelClasses}>Carbonio %</label>
                                                <select name="carbon" value={formData.carbon} onChange={handleChange} className={inputClasses} required>
                                                    <option value="">Seleziona %</option>
                                                    {['30%', '50%', '70-80%', '90-100%'].map(c => <option key={c} value={c}>{c}</option>)}
                                                </select>
                                            </div>
                                        </>
                                    ) : formData.sport === 'Wingfoil' ? (
                                        <>
                                            {formData.category === 'Tavola' && (
                                                <div>
                                                    <label className={labelClasses}>Volume (L)</label>
                                                    <input
                                                        type="number"
                                                        name="volume"
                                                        value={formData.volume}
                                                        onChange={handleChange}
                                                        placeholder="Es. 75L"
                                                        className={inputClasses}
                                                        min="0"
                                                        required
                                                    />
                                                </div>
                                            )}
                                            {formData.category === 'Ala' && (
                                                <div>
                                                    <label className={labelClasses}>Misura (mq)</label>
                                                    <select name="size" value={formData.size} onChange={handleChange} className={inputClasses} required>
                                                        <option value="">Seleziona Misura...</option>
                                                        {sizes.length > 0 ? (
                                                            sizes.map(s => <option key={s} value={s}>{s} mq</option>)
                                                        ) : (
                                                            <>
                                                                <option value="2.0">2.0 mq</option>
                                                                <option value="3.0">3.0 mq</option>
                                                                <option value="4.0">4.0 mq</option>
                                                                <option value="5.0">5.0 mq</option>
                                                                <option value="6.0">6.0 mq</option>
                                                                <option value="7.0">7.0 mq</option>
                                                            </>
                                                        )}
                                                    </select>
                                                </div>
                                            )}
                                            {formData.category === 'Foil' && (
                                                <>
                                                    <div>
                                                        <label className={labelClasses}>Lunghezza Albero (cm)</label>
                                                        <input
                                                            type="number"
                                                            name="mastLength"
                                                            value={formData.mastLength}
                                                            onChange={handleChange}
                                                            placeholder="Es. 85"
                                                            className={inputClasses}
                                                            min="0"
                                                            required
                                                        />
                                                    </div>
                                                    <div>
                                                        <label className={labelClasses}>Ala Anteriore (cm²)</label>
                                                        <input
                                                            type="number"
                                                            name="frontWing"
                                                            value={formData.frontWing}
                                                            onChange={handleChange}
                                                            placeholder="Es. 1250"
                                                            className={inputClasses}
                                                            min="0"
                                                            required
                                                        />
                                                    </div>
                                                    <div>
                                                        <label className={labelClasses}>Attacco Tavola</label>
                                                        <select
                                                            name="boardMount"
                                                            value={formData.boardMount}
                                                            onChange={handleChange}
                                                            className={inputClasses}
                                                            required
                                                        >
                                                            <option value="">Seleziona Attacco...</option>
                                                            <option value="Piastra">Piastra (Plate Mount)</option>
                                                            <option value="Tuttle Box">Tuttle Box</option>
                                                            <option value="Deep Tuttle">Deep Tuttle</option>
                                                        </select>
                                                    </div>
                                                </>
                                            )}
                                        </>
                                    ) : formData.sport === 'Surf' ? (
                                        <>
                                            <div>
                                                <label className={labelClasses}>Lunghezza (ft)</label>
                                                <select name="size" value={formData.size} onChange={handleChange} className={inputClasses} required>
                                                    <option value="">Seleziona Lunghezza...</option>
                                                    {Array.from({ length: 61 }, (_, i) => {
                                                        const feet = Math.floor(i / 12) + 5;
                                                        const inches = i % 12;
                                                        return `${feet}'${inches}"`;
                                                    }).filter(s => parseInt(s.split("'")[0]) <= 10).map(s => (
                                                        <option key={s} value={s}>{s}</option>
                                                    ))}
                                                    <option value="10'0&quot;+">10'0"+</option>
                                                </select>
                                            </div>
                                            <div>
                                                <label className={labelClasses}>Volume (L)</label>
                                                <input
                                                    type="number"
                                                    name="volume"
                                                    value={formData.volume}
                                                    onChange={handleChange}
                                                    placeholder="Es. 28.5L"
                                                    className={inputClasses}
                                                    step="0.1"
                                                    min="0"
                                                    required
                                                />
                                            </div>
                                        </>
                                    ) : (
                                        <div className="col-span-1 md:col-span-2">
                                            <label className={labelClasses}>
                                                {formData.category ? 'Misura / Volume' : 'Misura'}
                                            </label>
                                            {formData.isCustomModel || sizes.length === 0 ? (
                                                <input
                                                    type="text"
                                                    name="size"
                                                    value={formData.size}
                                                    onChange={handleChange}
                                                    placeholder="Es. 100L, 5.0mq..."
                                                    className={inputClasses}
                                                />
                                            ) : (
                                                <select name="size" value={formData.size} onChange={handleChange} className={inputClasses}>
                                                    <option value="">Seleziona Misura...</option>
                                                    {sizes.map(s => <option key={s} value={s}>{s}</option>)}
                                                </select>
                                            )}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* DIVIDER */}
                        {/* ROBUST SPACER (48px) */}
                        <div className="w-full h-12"></div>

                        {/* SECTION 2: DETTAGLI & FOTO */}
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

                            {/* Left Column: Text Info (7 cols) */}
                            <div className="lg:col-span-7 flex flex-col">
                                <h3 className={sectionHeaderClasses}>
                                    Dettagli Annuncio
                                </h3>
                                <div className="h-4 w-full"></div>

                                <div className="flex flex-col gap-5">
                                    <div>
                                        <label className={labelClasses}>Titolo Annuncio</label>
                                        <input
                                            type="text"
                                            name="title"
                                            value={formData.title}
                                            onChange={handleChange}
                                            className={`${inputClasses} text-lg font-bold`}
                                            placeholder="Es. Tavola usata pochissimo..."
                                            required
                                        />
                                    </div>

                                    <div>
                                        <label className={labelClasses}>Descrizione</label>
                                        <textarea
                                            name="description"
                                            value={formData.description}
                                            onChange={handleChange}
                                            rows="6"
                                            className={`${inputClasses} resize-none leading-relaxed`}
                                            placeholder="Descrivi condizioni, riparazioni, accessori inclusi..."
                                        ></textarea>
                                    </div>

                                    <div>
                                        <label className={labelClasses}>Prezzo (€)</label>
                                        <div className="relative">
                                            <input
                                                type="number"
                                                name="price"
                                                value={formData.price}
                                                onChange={handleChange}
                                                className={`${inputClasses} pl-12 text-3xl font-black text-[#0EA5E9] tracking-tight`}
                                                placeholder="0"
                                                required
                                            />
                                            <span className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-500 font-bold text-xl">€</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Right Column: Photo Upload (5 cols) */}
                            <div className="lg:col-span-5 flex flex-col">
                                <h3 className={sectionHeaderClasses}>
                                    Foto
                                </h3>
                                <div className="h-4 w-full"></div>

                                <div className="border-2 border-dashed border-slate-700 rounded-3xl w-full h-64 flex flex-col items-center justify-center relative overflow-hidden group cursor-pointer bg-slate-800 hover:bg-slate-700 hover:border-[#0EA5E9] transition-all duration-300">
                                    <div className="absolute inset-0 bg-gradient-to-br from-[#0EA5E9]/0 to-[#0EA5E9]/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                    <div className="p-6 rounded-full bg-[#1E293B] mb-4 group-hover:scale-110 group-hover:rotate-3 transition-transform shadow-xl border border-white/5 relative z-10">
                                        <Upload className="text-[#0EA5E9]" size={32} />
                                    </div>
                                    <p className="text-white font-bold uppercase tracking-widest text-sm relative z-10 group-hover:text-[#0EA5E9] transition-colors">Carica Foto</p>
                                    <p className="text-slate-500 text-xs mt-2 relative z-10">Max 5MB (JPG, PNG)</p>
                                </div>
                            </div>
                        </div>

                        {/* SUBMIT BUTTON */}
                        <div className="mt-16 pt-8 border-t border-white/5">
                            <button
                                type="submit"
                                className="w-full py-6 bg-gradient-to-r from-[#0EA5E9] to-[#38BDF8] text-white font-black text-xl uppercase tracking-widest rounded-3xl shadow-[0_10px_40px_-10px_rgba(14,165,233,0.5)] hover:shadow-[0_20px_50px_-10px_rgba(14,165,233,0.6)] hover:-translate-y-1 transition-all active:scale-95 active:translate-y-0 relative overflow-hidden group"
                            >
                                <span className="relative z-10">Pubblica Annuncio</span>
                                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out"></div>
                            </button>
                        </div>

                    </form>
                </div>
            </div >
        </div >
    )
}
