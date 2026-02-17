import { X, ChevronDown, ChevronUp } from 'lucide-react';
import { sportsData } from '../data/sportsData';
import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Reusable Filter Section "Minimal" Component
const FilterSection = ({ title, isOpen, onToggle, children, isLast }) => (
    <div className={`relative ${isLast ? '' : 'mb-12'}`} style={{ marginBottom: isLast ? 0 : '50px' }}>
        <button
            onClick={onToggle}
            className="w-full flex items-center justify-between py-6 pl-8 group transition-colors"
            style={{ paddingLeft: '2rem' }}
        >
            <span className="text-base font-medium uppercase tracking-[0.25em] text-white group-hover:text-[var(--color-primary)] transition-colors">
                {title}
            </span>
            {isOpen ?
                <ChevronUp size={18} className="text-slate-500 group-hover:text-[var(--color-primary)] transition-colors" /> :
                <ChevronDown size={18} className="text-slate-500 group-hover:text-[var(--color-primary)] transition-colors" />
            }
        </button>
        <div className={`transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] ${isOpen ? 'max-h-[500px] opacity-100 mb-8' : 'max-h-0 opacity-0'}`}>
            <div className="pt-2 pl-8" style={{ paddingLeft: '2rem' }}>
                {children}
            </div>
        </div>
        {!isLast && (
            <div
                className="absolute h-px bg-white/20"
                style={{
                    bottom: '-15px',
                    left: '1.5rem',
                    right: '3rem'
                }}
            />
        )}
    </div>
);

export default function FilterSidebar({ isOpen, onClose, filters, setFilters }) {
    const navigate = useNavigate();

    // Accordion State
    const [openSections, setOpenSections] = useState({
        sport: true,
        accessories: false,
        brand: true,
        category: true,
        model: false,
        size: false,
        material: false,
        diameter: false,
        carbon: false,
        length: false,
        volume: false,
        mastLength: false,
        frontWing: false,
        boardMount: false,
        year: false,
        price: true
    });

    const toggleSection = (section) => {
        setOpenSections(prev => ({ ...prev, [section]: !prev[section] }));
    };

    // Cascading Logic Helpers
    // Filter out 'Accessori' from the main Sport list
    const sports = Object.keys(sportsData).filter(s => s !== 'Accessori');

    // Extract Unique Accessory Types (e.g., "Mute", "Trapezi") from the Brand-keyed data
    // Structure is: Accessori -> { Brand: { Type: [Models] } }
    const accessoryTypes = useMemo(() => {
        const accData = sportsData['Accessori'] || {};
        const types = new Set();
        Object.values(accData).forEach(brandData => {
            Object.keys(brandData).forEach(type => types.add(type));
        });
        return Array.from(types).sort();
    }, []);

    // 2. Independent BRANDS Logic
    const brands = useMemo(() => {
        const allBrands = new Set();
        const activeSport = filters.sport;
        const activeCategory = filters.category;

        // Iterate all sports to find matching brands
        Object.keys(sportsData).forEach(sport => {
            // If Sport is selected, ignore other sports
            if (activeSport && sport !== activeSport) return;

            const sportData = sportsData[sport] || {};

            // Accessori special handling: Accessori -> Brand -> Type(Category)
            if (sport === 'Accessori') {
                Object.keys(sportData).forEach(brand => {
                    const brandProducts = sportData[brand] || {}; // { Muta: [], Trapezio: [] }
                    // If Category is selected, check if this brand has it
                    if (activeCategory) {
                        if (Object.keys(brandProducts).includes(activeCategory)) {
                            allBrands.add(brand);
                        }
                    } else {
                        allBrands.add(brand);
                    }
                });
            } else {
                // Standard Sports: Sport -> Brand -> Category
                Object.keys(sportData).forEach(brand => {
                    const brandCats = sportData[brand] || {};
                    // If Category is selected, check if this brand has it
                    if (activeCategory) {
                        if (brandCats[activeCategory]) {
                            allBrands.add(brand);
                        }
                    } else {
                        allBrands.add(brand);
                    }
                });
            }
        });

        return Array.from(allBrands).sort((a, b) => a.localeCompare(b));
    }, [filters.sport, filters.category]);

    // 3. Independent CATEGORIES Logic
    const categories = useMemo(() => {
        const allCats = new Set();
        const activeSport = filters.sport;
        const activeBrand = filters.brand;

        Object.keys(sportsData).forEach(sport => {
            if (activeSport && sport !== activeSport) return;

            const sportData = sportsData[sport] || {};

            if (sport === 'Accessori') {
                // Accessori: Categories are the keys inside each brand object (or aggregated)
                // Actually structure is Accessori -> Brand -> Category
                Object.keys(sportData).forEach(brand => {
                    if (activeBrand && brand !== activeBrand) return;
                    const brandProducts = sportData[brand] || {};
                    Object.keys(brandProducts).forEach(cat => allCats.add(cat));
                });
            } else {
                // Standard: Sport -> Brand -> Category
                Object.keys(sportData).forEach(brand => {
                    if (activeBrand && brand !== activeBrand) return;
                    const brandCats = sportData[brand] || {};
                    Object.keys(brandCats).forEach(cat => allCats.add(cat));
                });
            }
        });

        return Array.from(allCats).sort((a, b) => a.localeCompare(b));
    }, [filters.sport, filters.brand]);

    // 4. Models Logic (Remains Dependent on Brand/Category per request)
    const models = useMemo(() => {
        // If no context, showing all models is too much. Keep it dependent.
        if (!filters.category && !filters.brand) return [];

        const allModels = new Set();
        const activeSport = filters.sport;
        const activeBrand = filters.brand;
        const activeCategory = filters.category;

        Object.keys(sportsData).forEach(sport => {
            if (activeSport && sport !== activeSport) return;

            const sportData = sportsData[sport] || {};

            if (sport === 'Accessori') {
                Object.keys(sportData).forEach(brand => {
                    if (activeBrand && brand !== activeBrand) return;
                    const brandProducts = sportData[brand] || {};

                    // Iterate categories
                    Object.keys(brandProducts).forEach(cat => {
                        if (activeCategory && cat !== activeCategory) return;
                        const list = brandProducts[cat] || [];
                        list.forEach(m => allModels.add(m.model));
                    });
                });
            } else {
                Object.keys(sportData).forEach(brand => {
                    if (activeBrand && brand !== activeBrand) return;
                    const brandCats = sportData[brand] || {};

                    Object.keys(brandCats).forEach(cat => {
                        if (activeCategory && cat !== activeCategory) return;
                        const list = brandCats[cat] || [];
                        list.forEach(m => allModels.add(m.model));
                    });
                });
            }
        });

        return Array.from(allModels).sort((a, b) => a.localeCompare(b));
    }, [filters.sport, filters.category, filters.brand]);

    // 5. Dynamic Size Logic (Aggregated)
    const availableSizes = useMemo(() => {
        const allSizes = new Set();
        const activeSport = filters.sport;
        const activeBrand = filters.brand;
        const activeCategory = filters.category;

        Object.keys(sportsData).forEach(sport => {
            if (activeSport && sport !== activeSport) return;

            const sportData = sportsData[sport] || {};

            if (sport === 'Accessori') {
                Object.keys(sportData).forEach(brand => {
                    if (activeBrand && brand !== activeBrand) return;
                    const brandProducts = sportData[brand] || {};
                    Object.keys(brandProducts).forEach(cat => {
                        if (activeCategory && cat !== activeCategory) return;
                        const list = brandProducts[cat] || [];
                        list.forEach(m => {
                            if (Array.isArray(m.sizes)) m.sizes.forEach(s => allSizes.add(s));
                        });
                    });
                });
            } else {
                Object.keys(sportData).forEach(brand => {
                    if (activeBrand && brand !== activeBrand) return;
                    const brandCats = sportData[brand] || {};
                    Object.keys(brandCats).forEach(cat => {
                        if (activeCategory && cat !== activeCategory) return;
                        const list = brandCats[cat] || [];
                        list.forEach(m => {
                            if (Array.isArray(m.sizes)) m.sizes.forEach(s => allSizes.add(s));
                        });
                    });
                });
            }
        });

        return Array.from(allSizes).sort((a, b) => {
            const numA = parseFloat(a);
            const numB = parseFloat(b);
            if (!isNaN(numA) && !isNaN(numB)) return numA - numB;
            return a.localeCompare(b);
        });
    }, [filters.sport, filters.brand, filters.category]);

    const sizeLabel = useMemo(() => {
        const cat = (filters.category || '').toLowerCase();
        if (cat.includes('tavola')) return "Volume (L)";
        if (cat.includes('vela') || cat.includes('ala') || cat.includes('kite') || cat.includes('wing')) return "Dimensione (MQ)";
        if (cat.includes('muta') || cat.includes('trapezio') || cat.includes('casco') || cat.includes('impact') || cat.includes('abbigliamento') || cat.includes('accessori')) return "Taglia";
        return "Grandezza";
    }, [filters.category]);

    const handleFilterChange = (key, value) => {
        setFilters(prev => {
            const newFilters = { ...prev, [key]: value };

            // Independent Logic: Do not aggressively reset.
            if (key === 'sport') {
                newFilters.model = '';
                newFilters.size = '';
            }
            if (key === 'brand') {
                newFilters.model = '';
                newFilters.size = '';
            }
            if (key === 'category') {
                newFilters.model = '';
                newFilters.size = '';
                if (value === 'Boma') setOpenSections(prev => ({ ...prev, model: true, material: true }));
                else if (value === 'Albero') setOpenSections(prev => ({ ...prev, model: true, diameter: true }));
                else setOpenSections(prev => ({ ...prev, model: true }));
            }

            return newFilters;
        });
    };

    // Specific handler for accessories
    const handleAccessoryChange = (accName) => {
        setFilters(prev => {
            if (prev.sport === 'Accessori' && prev.category === accName) {
                // Toggle off
                return { ...prev, sport: '', category: '' };
            }
            return {
                ...prev,
                sport: 'Accessori',
                category: accName
            };
        });
    };

    const isBoma = filters.category === 'Boma';
    const isAlbero = filters.category === 'Albero';

    return (
        <>
            {/* Overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/80 backdrop-blur-sm z-40 transition-opacity"
                    onClick={onClose}
                />
            )}

            {/* Sidebar - Dark Mode Matching Navbar */}
            <div className={`fixed top-0 left-0 h-full w-[400px] bg-[var(--color-dark)] shadow-2xl shadow-black/50 z-50 transform transition-transform duration-500 cubic-bezier(0.16, 1, 0.3, 1) ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                <div className="h-full flex flex-col">

                    {/* Header */}
                    <div className="p-10 flex justify-end items-center bg-[var(--color-dark)]">
                        <button onClick={onClose} className="p-2 hover:bg-white/5 rounded-full transition-colors text-slate-400 hover:text-white">
                            <X size={24} strokeWidth={1.5} />
                        </button>
                    </div>

                    {/* Scrollable Content */}
                    <div className="flex-grow overflow-y-auto px-14 pt-12 custom-scrollbar">

                        {/* SPORT Section */}
                        <FilterSection
                            title="Sport"
                            isOpen={openSections.sport}
                            onToggle={() => toggleSection('sport')}
                        >
                            <div className="flex flex-col space-y-4">
                                <button
                                    onClick={() => handleFilterChange('sport', '')}
                                    className={`text-left text-sm font-light tracking-wide transition-colors flex items-center gap-4 group ${!filters.sport ? 'text-[var(--color-primary)]' : 'text-slate-400 hover:text-white'}`}
                                >
                                    <span className={`w-1.5 h-1.5 rounded-full transition-all ${!filters.sport ? 'bg-[var(--color-primary)]' : 'bg-slate-700 group-hover:bg-white'}`}></span>
                                    TUTTI
                                </button>
                                {sports.map(sport => (
                                    <button
                                        key={sport}
                                        onClick={() => handleFilterChange('sport', sport)}
                                        className={`text-left text-sm font-light tracking-wide transition-colors flex items-center gap-4 group ${filters.sport === sport ? 'text-[var(--color-primary)]' : 'text-slate-400 hover:text-white'}`}
                                    >
                                        <span className={`w-1.5 h-1.5 rounded-full transition-all ${filters.sport === sport ? 'bg-[var(--color-primary)]' : 'bg-slate-700 group-hover:bg-white'}`}></span>
                                        {sport.toUpperCase()}
                                    </button>
                                ))}
                            </div>
                        </FilterSection>

                        {/* ACCESSORIES Section (Treated as Shortcuts) */}
                        <FilterSection
                            title="Accessori"
                            isOpen={openSections.accessories}
                            onToggle={() => toggleSection('accessories')}
                        >
                            <div className="flex flex-col space-y-4">
                                {accessoryTypes.map(type => (
                                    <button
                                        key={type}
                                        onClick={() => handleAccessoryChange(type)}
                                        className={`text-left text-sm font-light tracking-wide transition-colors flex items-center gap-4 group ${filters.sport === 'Accessori' && filters.category === type ? 'text-[var(--color-primary)]' : 'text-slate-400 hover:text-white'}`}
                                    >
                                        <span className={`w-1.5 h-1.5 rounded-full transition-all ${filters.sport === 'Accessori' && filters.category === type ? 'bg-[var(--color-primary)]' : 'bg-slate-700 group-hover:bg-white'}`}></span>
                                        {type.toUpperCase()}
                                    </button>
                                ))}
                            </div>
                        </FilterSection>

                        {/* BRAND Section - ALWAYS VISIBLE */}
                        <FilterSection
                            title="Marca"
                            isOpen={openSections.brand}
                            onToggle={() => toggleSection('brand')}
                        >
                            <div className="flex flex-col space-y-4">
                                <button
                                    onClick={() => handleFilterChange('brand', '')}
                                    className={`text-left text-sm font-light tracking-wide transition-colors flex items-center gap-4 group ${!filters.brand ? 'text-[var(--color-primary)]' : 'text-slate-400 hover:text-white'}`}
                                >
                                    <span className={`w-1.5 h-1.5 rounded-full transition-all ${!filters.brand ? 'bg-[var(--color-primary)]' : 'bg-slate-700 group-hover:bg-white'}`}></span>
                                    TUTTE LE MARCHE
                                </button>
                                {brands.map(brand => (
                                    <button
                                        key={brand}
                                        onClick={() => handleFilterChange('brand', brand)}
                                        className={`text-left text-sm font-light tracking-wide transition-colors flex items-center gap-4 group ${filters.brand === brand ? 'text-[var(--color-primary)]' : 'text-slate-400 hover:text-white'}`}
                                    >
                                        <span className={`w-1.5 h-1.5 rounded-full transition-all ${filters.brand === brand ? 'bg-[var(--color-primary)]' : 'bg-slate-700 group-hover:bg-white'}`}></span>
                                        {brand.toUpperCase()}
                                    </button>
                                ))}
                            </div>
                        </FilterSection>

                        {/* CATEGORY Section - ALWAYS VISIBLE */}
                        {(filters.sport !== 'Accessori') && (
                            <FilterSection
                                title="Categoria"
                                isOpen={openSections.category}
                                onToggle={() => toggleSection('category')}
                            >
                                <div className="flex flex-col space-y-4">
                                    <button
                                        onClick={() => handleFilterChange('category', '')}
                                        className={`text-left text-sm font-light tracking-wide transition-colors flex items-center gap-4 group ${!filters.category ? 'text-[var(--color-primary)]' : 'text-slate-400 hover:text-white'}`}
                                    >
                                        <span className={`w-1.5 h-1.5 rounded-full transition-all ${!filters.category ? 'bg-[var(--color-primary)]' : 'bg-slate-700 group-hover:bg-white'}`}></span>
                                        TUTTE LE CATEGORIE
                                    </button>
                                    {categories.map(cat => (
                                        <button
                                            key={cat}
                                            onClick={() => handleFilterChange('category', cat)}
                                            className={`text-left text-sm font-light tracking-wide transition-colors flex items-center gap-4 group ${filters.category === cat ? 'text-[var(--color-primary)]' : 'text-slate-400 hover:text-white'}`}
                                        >
                                            <span className={`w-1.5 h-1.5 rounded-full transition-all ${filters.category === cat ? 'bg-[var(--color-primary)]' : 'bg-slate-700 group-hover:bg-white'}`}></span>
                                            {cat.toUpperCase()}
                                        </button>
                                    ))}
                                </div>
                            </FilterSection>
                        )}

                        {/* MODEL Section */}
                        <FilterSection
                            title="Modello"
                            isOpen={openSections.model}
                            onToggle={() => toggleSection('model')}
                        >
                            {!filters.category && !filters.brand ? (
                                <p className="text-xs font-light text-slate-600 italic">Seleziona prima una categoria o una marca</p>
                            ) : (
                                <div className="flex flex-col space-y-4">
                                    <button
                                        onClick={() => handleFilterChange('model', '')}
                                        className={`text-left text-sm font-light tracking-wide transition-colors flex items-center gap-4 group ${!filters.model ? 'text-[var(--color-primary)]' : 'text-slate-400 hover:text-white'}`}
                                    >
                                        <span className={`w-1.5 h-1.5 rounded-full transition-all ${!filters.model ? 'bg-[var(--color-primary)]' : 'bg-slate-700 group-hover:bg-white'}`}></span>
                                        TUTTI I MODELLI
                                    </button>
                                    {models.map(mdl => (
                                        <button
                                            key={mdl}
                                            onClick={() => handleFilterChange('model', mdl)}
                                            className={`text-left text-sm font-light tracking-wide transition-colors flex items-center gap-4 group ${filters.model === mdl ? 'text-[var(--color-primary)]' : 'text-slate-400 hover:text-white'}`}
                                        >
                                            <span className={`w-1.5 h-1.5 rounded-full transition-all ${filters.model === mdl ? 'bg-[var(--color-primary)]' : 'bg-slate-700 group-hover:bg-white'}`}></span>
                                            {mdl}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </FilterSection>

                        {/* SPECIFIC FILTERS FOR BOMA / ALBERO */}
                        {/* 1. MATERIAL (Boma) */}
                        {isBoma && (
                            <FilterSection
                                title="Materiale"
                                isOpen={openSections.material}
                                onToggle={() => toggleSection('material')}
                            >
                                <div className="flex flex-col space-y-4">
                                    {['Carbonio', 'Alluminio'].map(opt => (
                                        <button
                                            key={opt}
                                            onClick={() => handleFilterChange('material', opt === filters.material ? '' : opt)}
                                            className={`text-left text-sm font-light tracking-wide transition-colors flex items-center gap-4 group ${filters.material === opt ? 'text-[var(--color-primary)]' : 'text-slate-400 hover:text-white'}`}
                                        >
                                            <span className={`w-1.5 h-1.5 rounded-full transition-all ${filters.material === opt ? 'bg-[var(--color-primary)]' : 'bg-slate-700 group-hover:bg-white'}`}></span>
                                            {opt.toUpperCase()}
                                        </button>
                                    ))}
                                </div>
                            </FilterSection>
                        )}

                        {/* 2. DIAMETER (Albero) */}
                        {isAlbero && (
                            <FilterSection
                                title="Diametro"
                                isOpen={openSections.diameter}
                                onToggle={() => toggleSection('diameter')}
                            >
                                <div className="flex flex-col space-y-4">
                                    {['RDM', 'SDM'].map(opt => (
                                        <button
                                            key={opt}
                                            onClick={() => handleFilterChange('diameter', opt === filters.diameter ? '' : opt)}
                                            className={`text-left text-sm font-light tracking-wide transition-colors flex items-center gap-4 group ${filters.diameter === opt ? 'text-[var(--color-primary)]' : 'text-slate-400 hover:text-white'}`}
                                        >
                                            <span className={`w-1.5 h-1.5 rounded-full transition-all ${filters.diameter === opt ? 'bg-[var(--color-primary)]' : 'bg-slate-700 group-hover:bg-white'}`}></span>
                                            {opt}
                                        </button>
                                    ))}
                                </div>
                            </FilterSection>
                        )}

                        {/* 3. CARBON (Albero) */}
                        {isAlbero && (
                            <FilterSection
                                title="Carbonio %"
                                isOpen={openSections.carbon}
                                onToggle={() => toggleSection('carbon')}
                            >
                                <div className="flex flex-col space-y-4">
                                    {['30%', '50%', '70-80%', '90-100%'].map(opt => (
                                        <button
                                            key={opt}
                                            onClick={() => handleFilterChange('carbon', opt === filters.carbon ? '' : opt)}
                                            className={`text-left text-sm font-light tracking-wide transition-colors flex items-center gap-4 group ${filters.carbon === opt ? 'text-[var(--color-primary)]' : 'text-slate-400 hover:text-white'}`}
                                        >
                                            <span className={`w-1.5 h-1.5 rounded-full transition-all ${filters.carbon === opt ? 'bg-[var(--color-primary)]' : 'bg-slate-700 group-hover:bg-white'}`}></span>
                                            {opt}
                                        </button>
                                    ))}
                                </div>
                            </FilterSection>
                        )}

                        {/* SPECIFIC FILTERS FOR SURF */}
                        {filters.sport === 'Surf' && (
                            <>
                                {/* LUNGHEZZA (FT) */}
                                <FilterSection
                                    title="Lunghezza"
                                    isOpen={openSections.length}
                                    onToggle={() => toggleSection('length')}
                                >
                                    <div className="relative">
                                        <select
                                            value={filters.size || ''}
                                            onChange={(e) => handleFilterChange('size', e.target.value)}
                                            className="w-full p-3 bg-slate-900/50 border border-white/10 rounded-lg font-light text-sm text-slate-300 outline-none focus:border-[var(--color-primary)] appearance-none cursor-pointer"
                                        >
                                            <option value="">Qualsiasi Lunghezza</option>
                                            {Array.from({ length: 61 }, (_, i) => {
                                                const feet = Math.floor(i / 12) + 5;
                                                const inches = i % 12;
                                                return `${feet}'${inches}"`;
                                            }).filter(s => parseInt(s.split("'")[0]) <= 10).map(s => (
                                                <option key={s} value={s}>{s}</option>
                                            ))}
                                            <option value="10'0&quot;+">10'0"+</option>
                                        </select>
                                        <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none" />
                                    </div>
                                </FilterSection>

                            </>
                        )}

                        {/* VOLUME (Surf & Wingfoil Tavola) */}
                        {(filters.sport === 'Surf' || (filters.sport === 'Wingfoil' && filters.category === 'Tavola')) && (
                            <FilterSection
                                title="Volume (L)"
                                isOpen={openSections.volume}
                                onToggle={() => toggleSection('volume')}
                            >
                                <div className="flex gap-4">
                                    <div className="w-1/2">
                                        <label className="text-[10px] font-medium text-slate-500 mb-2 block uppercase tracking-wider">Min</label>
                                        <input
                                            type="number"
                                            value={filters.minVolume || ''}
                                            onChange={(e) => setFilters(prev => ({ ...prev, minVolume: e.target.value }))}
                                            placeholder="20"
                                            className="w-full p-3 bg-slate-900/50 border border-white/10 rounded-lg font-light text-sm text-white outline-none focus:border-[var(--color-primary)]"
                                        />
                                    </div>
                                    <div className="w-1/2">
                                        <label className="text-[10px] font-medium text-slate-500 mb-2 block uppercase tracking-wider">Max</label>
                                        <input
                                            type="number"
                                            value={filters.maxVolume || ''}
                                            onChange={(e) => setFilters(prev => ({ ...prev, maxVolume: e.target.value }))}
                                            placeholder="150"
                                            className="w-full p-3 bg-slate-900/50 border border-white/10 rounded-lg font-light text-sm text-white outline-none focus:border-[var(--color-primary)]"
                                        />
                                    </div>
                                </div>
                            </FilterSection>
                        )}

                        {/* SPECIFIC FILTERS FOR WINGFOIL - FOIL */}
                        {filters.sport === 'Wingfoil' && filters.category === 'Foil' && (
                            <>
                                {/* MAST LENGTH */}
                                <FilterSection
                                    title="Lunghezza Albero (cm)"
                                    isOpen={openSections.mastLength}
                                    onToggle={() => toggleSection('mastLength')}
                                >
                                    <div className="flex gap-4">
                                        <div className="w-1/2">
                                            <label className="text-[10px] font-medium text-slate-500 mb-2 block uppercase tracking-wider">Min</label>
                                            <input
                                                type="number"
                                                value={filters.minMastLength || ''}
                                                onChange={(e) => setFilters(prev => ({ ...prev, minMastLength: e.target.value }))}
                                                placeholder="60"
                                                className="w-full p-3 bg-slate-900/50 border border-white/10 rounded-lg font-light text-sm text-white outline-none focus:border-[var(--color-primary)]"
                                            />
                                        </div>
                                        <div className="w-1/2">
                                            <label className="text-[10px] font-medium text-slate-500 mb-2 block uppercase tracking-wider">Max</label>
                                            <input
                                                type="number"
                                                value={filters.maxMastLength || ''}
                                                onChange={(e) => setFilters(prev => ({ ...prev, maxMastLength: e.target.value }))}
                                                placeholder="100"
                                                className="w-full p-3 bg-slate-900/50 border border-white/10 rounded-lg font-light text-sm text-white outline-none focus:border-[var(--color-primary)]"
                                            />
                                        </div>
                                    </div>
                                </FilterSection>

                                {/* FRONT WING */}
                                <FilterSection
                                    title="Ala Anteriore (cm²)"
                                    isOpen={openSections.frontWing}
                                    onToggle={() => toggleSection('frontWing')}
                                >
                                    <div className="flex gap-4">
                                        <div className="w-1/2">
                                            <label className="text-[10px] font-medium text-slate-500 mb-2 block uppercase tracking-wider">Min</label>
                                            <input
                                                type="number"
                                                value={filters.minFrontWing || ''}
                                                onChange={(e) => setFilters(prev => ({ ...prev, minFrontWing: e.target.value }))}
                                                placeholder="800"
                                                className="w-full p-3 bg-slate-900/50 border border-white/10 rounded-lg font-light text-sm text-white outline-none focus:border-[var(--color-primary)]"
                                            />
                                        </div>
                                        <div className="w-1/2">
                                            <label className="text-[10px] font-medium text-slate-500 mb-2 block uppercase tracking-wider">Max</label>
                                            <input
                                                type="number"
                                                value={filters.maxFrontWing || ''}
                                                onChange={(e) => setFilters(prev => ({ ...prev, maxFrontWing: e.target.value }))}
                                                placeholder="2000"
                                                className="w-full p-3 bg-slate-900/50 border border-white/10 rounded-lg font-light text-sm text-white outline-none focus:border-[var(--color-primary)]"
                                            />
                                        </div>
                                    </div>
                                </FilterSection>

                                {/* BOARD MOUNT */}
                                <FilterSection
                                    title="Attacco Tavola"
                                    isOpen={openSections.boardMount}
                                    onToggle={() => toggleSection('boardMount')}
                                >
                                    <div className="flex flex-col space-y-4">
                                        {['Piastra', 'Tuttle Box', 'Deep Tuttle'].map(opt => (
                                            <button
                                                key={opt}
                                                onClick={() => handleFilterChange('boardMount', opt === filters.boardMount ? '' : opt)}
                                                className={`text-left text-sm font-light tracking-wide transition-colors flex items-center gap-4 group ${filters.boardMount === opt ? 'text-[var(--color-primary)]' : 'text-slate-400 hover:text-white'}`}
                                            >
                                                <span className={`w-1.5 h-1.5 rounded-full transition-all ${filters.boardMount === opt ? 'bg-[var(--color-primary)]' : 'bg-slate-700 group-hover:bg-white'}`}></span>
                                                {opt.toUpperCase()}
                                            </button>
                                        ))}
                                    </div>
                                </FilterSection>
                            </>
                        )}

                        {/* DYNAMIC SIZE Section (Hidden for Surf, and Wingfoil Tavola/Foil) */}
                        {filters.sport !== 'Surf' && !(filters.sport === 'Wingfoil' && filters.category !== 'Ala') && (
                            <FilterSection
                                title={sizeLabel}
                                isOpen={openSections.size}
                                onToggle={() => toggleSection('size')}
                            >
                                {!filters.category && !filters.brand ? (
                                    <p className="text-xs font-light text-slate-600 italic">Seleziona prima una categoria o una marca</p>
                                ) : (
                                    <div className="flex flex-wrap gap-2">
                                        {availableSizes.length > 0 ? (
                                            <>
                                                <button
                                                    onClick={() => handleFilterChange('size', '')}
                                                    className={`px-3 py-1.5 text-xs font-medium border rounded transition-colors ${!filters.size
                                                        ? 'bg-[var(--color-primary)] text-white border-[var(--color-primary)]'
                                                        : 'bg-transparent text-slate-400 border-slate-700 hover:border-white hover:text-white'
                                                        }`}
                                                >
                                                    TUTTI
                                                </button>
                                                {availableSizes.map(size => (
                                                    <button
                                                        key={size}
                                                        onClick={() => handleFilterChange('size', size)}
                                                        className={`px-3 py-1.5 text-xs font-medium border rounded transition-colors ${filters.size === size
                                                            ? 'bg-[var(--color-primary)] text-white border-[var(--color-primary)]'
                                                            : 'bg-transparent text-slate-400 border-slate-700 hover:border-white hover:text-white'
                                                            }`}
                                                    >
                                                        {size}
                                                    </button>
                                                ))}
                                            </>
                                        ) : (
                                            <p className="text-xs font-light text-slate-500">Nessuna misura disponibile</p>
                                        )}
                                    </div>
                                )}
                            </FilterSection>
                        )}

                        {/* YEAR Section */}
                        <FilterSection
                            title="Anno"
                            isOpen={openSections.year}
                            onToggle={() => toggleSection('year')}
                        >
                            <div className="flex gap-4">
                                <div className="w-1/2">
                                    <label className="text-xs font-medium text-slate-500 mb-3 block uppercase tracking-wider">Da</label>
                                    <div className="relative">
                                        <select
                                            value={filters.minYear || ''}
                                            onChange={(e) => setFilters(prev => ({ ...prev, minYear: e.target.value }))}
                                            className="w-full p-3 bg-slate-900/50 border border-white/10 rounded-lg font-light text-sm text-slate-300 outline-none focus:border-[var(--color-primary)] appearance-none cursor-pointer"
                                        >
                                            <option value="">Qualsiasi</option>
                                            {Array.from({ length: 17 }, (_, i) => 2010 + i).map(y => (
                                                <option key={y} value={y}>{y}</option>
                                            ))}
                                            <option value="Pre-2010">Pre-2010</option>
                                        </select>
                                        <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none" />
                                    </div>
                                </div>
                                <div className="w-1/2">
                                    <label className="text-xs font-medium text-slate-500 mb-3 block uppercase tracking-wider">A</label>
                                    <div className="relative">
                                        <select
                                            value={filters.maxYear || ''}
                                            onChange={(e) => setFilters(prev => ({ ...prev, maxYear: e.target.value }))}
                                            className="w-full p-3 bg-slate-900/50 border border-white/10 rounded-lg font-light text-sm text-slate-300 outline-none focus:border-[var(--color-primary)] appearance-none cursor-pointer"
                                        >
                                            <option value="">Oggi</option>
                                            {Array.from({ length: 17 }, (_, i) => 2026 - i).map(y => (
                                                <option key={y} value={y}>{y}</option>
                                            ))}
                                        </select>
                                        <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none" />
                                    </div>
                                </div>
                            </div>
                        </FilterSection>

                        {/* PRICE Section */}
                        <FilterSection
                            title="Prezzo"
                            isOpen={openSections.price}
                            onToggle={() => toggleSection('price')}
                            isLast={true}
                        >
                            <div className="pb-4">
                                <div className="flex justify-between items-end mb-6">
                                    <span className="text-xs font-medium text-slate-500 uppercase tracking-wider">Max</span>
                                    <span className="text-2xl font-light text-[var(--color-primary)]">
                                        € {filters.maxPrice || 3000}
                                    </span>
                                </div>
                                <input
                                    type="range"
                                    min="0"
                                    max="10000"
                                    step="100"
                                    value={filters.maxPrice || 3000}
                                    onChange={(e) => setFilters(prev => ({ ...prev, maxPrice: Number(e.target.value) }))}
                                    className="w-full h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-[var(--color-primary)] hover:accent-[#0284C7] transition-all"
                                />
                                <div className="flex justify-between mt-3 text-[10px] font-medium text-slate-600 uppercase tracking-wider">
                                    <span>€0</span>
                                    <span>€10.000+</span>
                                </div>
                            </div>
                        </FilterSection>

                    </div>

                    {/* Footer Actions */}
                    <div className="p-8 border-t border-white/10 bg-[var(--color-dark)]">
                        <button
                            onClick={() => {
                                navigate('/marketplace');
                                onClose();
                            }}
                            className="w-full py-4 bg-[var(--color-primary)] text-white font-bold text-sm uppercase tracking-widest rounded-lg shadow-lg shadow-[var(--color-primary)]/20 hover:shadow-[var(--color-primary)]/40 hover:-translate-y-0.5 transition-all active:translate-y-0"
                        >
                            Applica Filtri
                        </button>
                        <button
                            onClick={() => setFilters({ sport: '', brand: '', category: '', model: '', size: '', minYear: '', maxYear: '', maxPrice: 3000, material: '', diameter: '', carbon: '', minVolume: '', maxVolume: '', minMastLength: '', maxMastLength: '', minFrontWing: '', maxFrontWing: '', boardMount: '' })}
                            className="w-full mt-4 text-xs font-medium text-slate-500 hover:text-white transition-colors uppercase tracking-widest"
                        >
                            Reset
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}
