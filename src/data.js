export const products = [
    {
        id: 1,
        title: "Fanatic Sky Wing 5'4\" 95L",
        price: 850,
        category: "Tavola",
        sport: "Wingfoil",
        brand: "Fanatic",
        image: "https://images.unsplash.com/photo-1621262973686-21877478096f?q=80&w=1000&auto=format&fit=crop",
        condition: "Usato - Ottimo",
        year: 2022,
        location: "Roma"
    },
    {
        id: 2,
        title: "Duotone Unit 5.0 D-Lab",
        price: 650,
        category: "Ala",
        sport: "Wingfoil",
        brand: "Duotone",
        image: "/duotone-unit.png",
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
        image: "/severne-blade.png",
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
        image: "https://images.unsplash.com/photo-1531722569936-825d3dd91b15?q=80&w=1000&auto=format&fit=crop",
        condition: "Usato - Segni di usura",
        year: 2021,
        location: "Sardegna"
    },
    {
        id: 5,
        title: "North Orbit 9mq",
        price: 900,
        category: "Ala",
        sport: "Kitesurf",
        brand: "North",
        image: "https://images.unsplash.com/photo-1534145451291-76495f70049f?q=80&w=1000&auto=format&fit=crop",
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
        image: "https://images.unsplash.com/photo-1655823067676-42d480674d89?q=80&w=1000&auto=format&fit=crop",
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
        image: "https://images.unsplash.com/photo-1517652784013-1af6e8697666?q=80&w=1000&auto=format&fit=crop",
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
        image: "https://images.unsplash.com/photo-1465223616654-e0544f932854?q=80&w=1000&auto=format&fit=crop",
        condition: "Usato - Buono",
        year: 2020,
        location: "Garda"
    }
];

// Helper to get search suggestions from sportsData
import { sportsData } from './data/sportsData.js';

export const getSearchSuggestions = (query) => {
    if (!query || query.length < 2) return [];

    const lowerQuery = query.toLowerCase();
    const suggestions = new Set();

    // 1. Search in Categories and Subcategories
    Object.keys(sportsData).forEach(sport => {
        if (sport.toLowerCase().includes(lowerQuery)) {
            suggestions.add(sport);
        }

        Object.keys(sportsData[sport]).forEach(category => {
            if (category.toLowerCase().includes(lowerQuery)) {
                suggestions.add(category);
            }

            // Search in sub-subcategories/types if array exists
            if (Array.isArray(sportsData[sport][category])) {
                sportsData[sport][category].forEach(item => {
                    if (item.toLowerCase().includes(lowerQuery)) {
                        suggestions.add(item);
                    }
                });
            }
        });
    });

    // 2. Search in Product Titles (optional, but good for specific items)
    products.forEach(product => {
        if (product.title.toLowerCase().includes(lowerQuery)) {
            suggestions.add(product.title);
        }
    });

    return Array.from(suggestions).slice(0, 5); // Return top 5 unique suggestions
};
