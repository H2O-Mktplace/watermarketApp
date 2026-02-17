
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
        location: "Roma"
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
        location: "Milano"
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
        location: "Torbole"
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
        location: "Sardegna"
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
        location: "Sicilia"
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
        location: "Toscana"
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
        location: "Online"
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
        location: "Garda"
    }
];

const filters = {
    sport: '',
    brand: '',
    category: '',
    minYear: '',
    maxYear: '',
    maxPrice: 3000,
    model: '',
    material: '',
    diameter: '',
    carbon: ''
};

const searchTerm = "";

console.log("Simulating Marketplace filtering...");
console.log("Filters:", filters);
console.log("SearchTerm:", searchTerm);

const filteredProducts = mockProducts.filter(product => {
    // 1. Search Term (Title or Description)
    if (searchTerm) {
        const term = searchTerm.toLowerCase();
        const matchesTitle = product.title.toLowerCase().includes(term);
        const matchesDesc = (product.description || "").toLowerCase().includes(term);
        if (!matchesTitle && !matchesDesc) {
            console.log(`Product ${product.id} ignored by SEARCH`);
            return false;
        }
    }

    // 2. Sidebar Filters
    if (filters.sport && product.sport !== filters.sport) {
        console.log(`Product ${product.id} ignored by SPORT: ${product.sport} vs ${filters.sport}`);
        return false;
    }
    if (filters.brand && product.brand !== filters.brand) {
        console.log(`Product ${product.id} ignored by BRAND`);
        return false;
    }
    if (filters.category && product.category !== filters.category) {
        console.log(`Product ${product.id} ignored by CATEGORY: ${product.category} vs ${filters.category}`);
        return false;
    }
    // if (filters.minYear && product.year < parseInt(filters.minYear)) return false; // Add year to data if needed
    // if (filters.maxYear && product.year > parseInt(filters.maxYear)) return false;
    if (filters.maxPrice && product.price > filters.maxPrice) {
        console.log(`Product ${product.id} ignored by PRICE`);
        return false;
    }

    // Volume Filter (Surf)
    if (filters.minVolume && product.volume && parseFloat(product.volume) < parseFloat(filters.minVolume)) return false;
    if (filters.maxVolume && product.volume && parseFloat(product.volume) > parseFloat(filters.maxVolume)) return false;

    // Size Filter (Generic & Surf Length)
    if (filters.size && product.size !== filters.size) return false;

    // Specific Filters
    if (filters.material && product.material !== filters.material) return false;
    if (filters.diameter && product.diameter !== filters.diameter) return false;
    if (filters.carbon && product.carbon !== filters.carbon) return false;

    // Wingfoil Specific Filters
    if (filters.minMastLength && product.mastLength && parseFloat(product.mastLength) < parseFloat(filters.minMastLength)) return false;
    if (filters.maxMastLength && product.mastLength && parseFloat(product.mastLength) > parseFloat(filters.maxMastLength)) return false;
    if (filters.minFrontWing && product.frontWing && parseFloat(product.frontWing) < parseFloat(filters.minFrontWing)) return false;
    if (filters.maxFrontWing && product.frontWing && parseFloat(product.frontWing) > parseFloat(filters.maxFrontWing)) return false;
    if (filters.boardMount && product.boardMount && product.boardMount !== filters.boardMount) return false;

    return true;
});

console.log("Filtered Products Count:", filteredProducts.length);
if (filteredProducts.length === 8) {
    console.log("SUCCESS: Logic is correct.");
} else {
    console.log("FAILURE: Logic validation failed.");
}
