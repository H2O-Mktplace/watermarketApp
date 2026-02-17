import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowLeft, ChevronRight, ChevronLeft } from 'lucide-react';
import windsurfImg from '../assets/hero/windsurf.jpg';
import kitesurfImg from '../assets/hero/kitesurf.jpg';
import surfImg from '../assets/hero/surf.jpg';

const heroImages = [
    {
        url: windsurfImg,
        alt: "Windsurf Action"
    },
    {
        url: kitesurfImg,
        alt: "Kitesurf Aerial"
    },
    {
        url: surfImg,
        alt: "Surf Wave"
    }
];

export default function HeroSection({ onNavigate }) {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    // Auto-slide effect
    useEffect(() => {
        const interval = setInterval(() => {
            nextSlide();
        }, 5000);
        return () => clearInterval(interval);
    }, [currentImageIndex]);

    const nextSlide = () => {
        setCurrentImageIndex((prev) => (prev === heroImages.length - 1 ? 0 : prev + 1));
    };

    const prevSlide = () => {
        setCurrentImageIndex((prev) => (prev === 0 ? heroImages.length - 1 : prev - 1));
    };

    return (
        <div className="relative h-[85vh] min-h-[600px] flex items-center justify-center overflow-hidden mb-[-40px]">
            {/* 1. Carousel Background */}
            <div className="absolute inset-0 z-0 bg-slate-900 pointer-events-none">
                {heroImages.map((image, index) => (
                    <div
                        key={index}
                        className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === currentImageIndex ? 'opacity-100' : 'opacity-0'
                            }`}
                    >
                        <img
                            src={image.url}
                            alt={image.alt}
                            className="w-full h-full object-cover object-center"
                        />
                        {/* Dark Overlay per image */}
                        <div className="absolute inset-0 bg-black/40"></div>
                        <div className="absolute inset-0 bg-gradient-to-t from-[#1E293B] via-transparent to-black/30"></div>
                    </div>
                ))}
            </div>

            {/* Navigation Arrows */}
            {/* Navigation Arrows */}
            <button
                onClick={prevSlide}
                className="absolute left-4 md:left-8 z-20 p-3 rounded-full border border-white/20 bg-white/10 backdrop-blur-md text-white transition-all duration-300 hover:scale-110 hover:bg-white/20 hover:border-white/40 active:scale-95"
            >
                <ChevronLeft size={32} />
            </button>
            <button
                onClick={nextSlide}
                className="absolute right-4 md:right-8 z-20 p-3 rounded-full border border-white/20 bg-white/10 backdrop-blur-md text-white transition-all duration-300 hover:scale-110 hover:bg-white/20 hover:border-white/40 active:scale-95"
            >
                <ChevronRight size={32} />
            </button>

            {/* 2. Direct Content (No Card) */}
            <div className="relative z-10 w-full max-w-5xl px-6 flex flex-col items-center text-center animate-fade-in-up">

                {/* Slogan - Huge & White */}
                <h1
                    className="text-5xl md:text-7xl font-black mb-6 uppercase tracking-wide leading-tight text-gradient drop-shadow-lg"
                    style={{ fontFamily: "'Outfit', sans-serif" }}
                >
                    Tanti mari,<br />un unico mercato.
                </h1>

                {/* Ghost Buttons */}
                <div className="flex flex-col sm:flex-row gap-8 w-full justify-center mt-8">
                    <Link
                        to="/marketplace"
                        className="group relative px-10 py-5 border-2 border-white text-white text-xl font-bold rounded-full overflow-hidden transition-all duration-300 hover:border-[#0EA5E9] hover:text-white hover:shadow-[0_0_30px_rgba(14,165,233,0.6)] active:scale-95 min-w-[240px] flex items-center justify-center"
                    >
                        <span className="relative z-10 flex items-center justify-center gap-3">
                            Esplora
                        </span>
                        <div className="absolute inset-0 bg-[#0EA5E9] transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300 ease-out"></div>
                    </Link>

                    <Link
                        to="/sell"
                        className="group relative px-10 py-5 border-2 border-white text-white text-xl font-bold rounded-full overflow-hidden transition-all duration-300 hover:border-[#0EA5E9] hover:text-white hover:shadow-[0_0_30px_rgba(14,165,233,0.6)] active:scale-95 min-w-[240px] flex items-center justify-center"
                    >
                        <span className="relative z-10 flex items-center justify-center gap-3">
                            Vendi
                        </span>
                        <div className="absolute inset-0 bg-[#0EA5E9] transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300 ease-out"></div>
                    </Link>
                </div>
            </div>
        </div>
    );
}
