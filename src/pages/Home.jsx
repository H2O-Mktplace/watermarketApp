import HeroSection from '../components/HeroSection'
import ProductCard from '../components/ProductCard'
import { products } from '../data'
import { Link } from 'react-router-dom'

export default function Home({ onNavigate }) {
    // Create a larger list of products for demonstration purposes to force scroll
    const displayProducts = [...products, ...products, ...products];

    return (
        <div className="bg-[#1E293B] min-h-screen">
            <HeroSection onNavigate={onNavigate} />

            <div className="py-20">
                <div className="container max-w-7xl mx-auto px-4">
                    <div className="flex justify-between items-center mb-12">
                        <h2 className="text-4xl font-bold tracking-tight text-gradient">In Evidenza</h2>
                        <Link
                            to="/marketplace"
                            className="text-gradient font-bold text-lg hover:opacity-80 transition-opacity flex items-center gap-2 group"
                        >
                            Vedi tutti
                            <span className="transform group-hover:translate-x-1 transition-transform">&rarr;</span>
                        </Link>
                    </div>



                    {/* VERTICAL SCROLLABLE GRID */}
                    <div className="grid grid-cols-[repeat(auto-fill,minmax(240px,1fr))] gap-6 max-h-[650px] overflow-y-auto overflow-x-hidden pr-[10px] container-evidenza">
                        {displayProducts.map((product, index) => (
                            <ProductCard key={`${product.id}-${index}`} product={product} onNavigate={onNavigate} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}
