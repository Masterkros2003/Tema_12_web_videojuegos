import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const Carousel = ({ games = [] }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isHovered, setIsHovered] = useState(false);

    // Auto-advance
    useEffect(() => {
        if (!games.length || isHovered) return;

        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % games.length);
        }, 6000);

        return () => clearInterval(interval);
    }, [games.length, isHovered]);

    if (!games.length) {
        return (
            <div className="w-full h-[500px] rounded-3xl bg-slate-800/50 animate-pulse flex items-center justify-center border border-slate-700">
                <p className="text-slate-500 font-medium">Cargando juegos destacados...</p>
            </div>
        );
    }

    const prevSlide = () => {
        setCurrentIndex((prev) => (prev - 1 + games.length) % games.length);
    };

    const nextSlide = () => {
        setCurrentIndex((prev) => (prev + 1) % games.length);
    };

    const currentGame = games[currentIndex];

    return (
        <div
            className="relative w-full h-[500px] sm:h-[600px] rounded-3xl overflow-hidden group shadow-2xl border border-slate-700/50"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* Background Image with Gradient Overlay */}
            <div
                key={currentGame.id} // Enforce re-render on change for simple fade effect if supported or just strict switch
                className="absolute inset-0 bg-cover bg-center transition-all duration-700 transform scale-100"
                style={{ backgroundImage: `url(${currentGame.background_image})` }}
            >
                <div className="absolute inset-0 bg-linear-to-t from-slate-950 via-slate-950/60 to-transparent"></div>
                <div className="absolute inset-0 bg-linear-to-r from-slate-950/80 to-transparent"></div>
            </div>

            {/* Content */}
            <div className="absolute bottom-0 left-0 w-full sm:w-2/3 p-8 md:p-16 z-10 flex flex-col items-start ease-in-out duration-500">
                <div className="mb-4 flex flex-wrap gap-2 animate-fadeIn">
                    {currentGame.genres?.slice(0, 3).map(g => (
                        <span key={g.id} className="bg-teal-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg tracking-wide uppercase">{g.name}</span>
                    ))}
                </div>

                <h2 className="text-4xl md:text-6xl font-black text-white mb-6 drop-shadow-2xl leading-tight line-clamp-2">
                    {currentGame.name}
                </h2>

                <Link
                    to={`/game/${currentGame.id}`}
                    className="inline-flex items-center gap-2 bg-white text-slate-950 px-8 py-4 rounded-full font-bold text-lg hover:bg-teal-400 hover:text-white transition-all duration-300 shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:shadow-[0_0_30px_rgba(20,184,166,0.6)] transform hover:-translate-y-1"
                >
                    Ver Detalles
                </Link>
            </div>

            {/* Controls */}
            <div className="absolute bottom-8 right-8 flex gap-4 z-20">
                <button
                    onClick={prevSlide}
                    className="bg-white/10 hover:bg-white/20 text-white p-4 rounded-full backdrop-blur-md transition border border-white/10 hover:border-white/30"
                >
                    <ChevronLeft size={24} />
                </button>
                <button
                    onClick={nextSlide}
                    className="bg-white/10 hover:bg-white/20 text-white p-4 rounded-full backdrop-blur-md transition border border-white/10 hover:border-white/30"
                >
                    <ChevronRight size={24} />
                </button>
            </div>

            {/* Indicators */}
            <div className="absolute top-8 right-8 flex gap-2 z-20">
                {games.slice(0, 5).map((_, idx) => ( // Only show indicators for first 5 if huge list, or just assume passed list is short
                    <button
                        key={idx}
                        onClick={() => setCurrentIndex(idx)}
                        className={`h-1.5 rounded-full transition-all duration-500 ${idx === currentIndex ? 'bg-teal-400 w-8' : 'bg-white/20 w-4 hover:bg-white/40'}`}
                    />
                ))}
            </div>
        </div>
    );
};
export default Carousel;
