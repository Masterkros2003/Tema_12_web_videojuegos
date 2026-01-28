import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Carousel from '../components/Carousel';
import { getPopularGames } from '../services/api';
import { Link } from 'react-router-dom';
import { ArrowRight, Search, Trophy, Gamepad } from 'lucide-react';

const HomePage = () => {
    const [popularGames, setPopularGames] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchGames = async () => {
            try {
                const data = await getPopularGames();
                if (data && data.results) {
                    setPopularGames(data.results);
                }
            } catch (error) {
                console.error('Error loading popular games', error);
            } finally {
                setLoading(false);
            }
        };
        fetchGames();
    }, []);

    return (
        <div className="min-h-screen flex flex-col bg-slate-900 text-white font-sans">
            <Header />

            <main className="grow">
                {/* Hero Section with Carousel */}
                <section className="container mx-auto px-4 py-8">
                    {loading ? (
                        <div className="w-full h-[500px] bg-slate-800 rounded-3xl animate-pulse flex items-center justify-center">
                            <p className="text-slate-500">Cargando...</p>
                        </div>
                    ) : (
                        <Carousel games={popularGames} />
                    )}
                </section>

                {/* Promo / Features Section */}
                <section className="py-20 bg-slate-950 border-t border-slate-900">
                    <div className="container mx-auto px-4">
                        <div className="text-center mb-16">
                            <h2 className="text-3xl md:text-5xl font-bold bg-clip-text text-transparent bg-linear-to-r from-teal-400 to-blue-500 mb-4">
                                Explora el Universo Gaming
                            </h2>
                            <p className="text-slate-400 text-xl max-w-2xl mx-auto">
                                Descubre miles de videojuegos, busca tus títulos favoritos y marca los que más te gusten.
                                Toda la información que necesitas en un solo lugar.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            <div className="bg-slate-900 p-8 rounded-2xl border border-slate-800 hover:border-teal-500/50 transition duration-300 shadow-lg hover:shadow-teal-900/10">
                                <div className="bg-teal-500/10 w-16 h-16 rounded-2xl flex items-center justify-center text-teal-400 mb-6">
                                    <Search size={32} />
                                </div>
                                <h3 className="text-2xl font-bold mb-3 text-white">Búsqueda Avanzada</h3>
                                <p className="text-slate-400 mb-6 leading-relaxed">
                                    Encuentra cualquier videojuego al instante. Filtra por nombre y descubre nuevos lanzamientos o clásicos.
                                </p>
                                <Link to="/games" className="text-teal-400 font-bold hover:underline flex items-center gap-1 group">
                                    Buscar ahora <ArrowRight size={16} className="group-hover:translate-x-1 transition" />
                                </Link>
                            </div>

                            <div className="bg-slate-900 p-8 rounded-2xl border border-slate-800 hover:border-purple-500/50 transition duration-300 shadow-lg hover:shadow-purple-900/10">
                                <div className="bg-purple-500/10 w-16 h-16 rounded-2xl flex items-center justify-center text-purple-400 mb-6">
                                    <Trophy size={32} />
                                </div>
                                <h3 className="text-2xl font-bold mb-3 text-white">Los Más Populares</h3>
                                <p className="text-slate-400 mb-6 leading-relaxed">
                                    Mantente al día con los juegos mejor valorados y más jugados del momento por la comunidad global.
                                </p>
                                <div className="text-purple-400 font-bold flex items-center gap-1 cursor-default">
                                    Actualizado diariamente
                                </div>
                            </div>

                            <div className="bg-slate-900 p-8 rounded-2xl border border-slate-800 hover:border-blue-500/50 transition duration-300 shadow-lg hover:shadow-blue-900/10">
                                <div className="bg-blue-500/10 w-16 h-16 rounded-2xl flex items-center justify-center text-blue-400 mb-6">
                                    <Gamepad size={32} />
                                </div>
                                <h3 className="text-2xl font-bold mb-3 text-white">Detalles Completos</h3>
                                <p className="text-slate-400 mb-6 leading-relaxed">
                                    Accede a información detallada: plataformas, géneros, fechas de lanzamiento y valoraciones de la crítica.
                                </p>
                                <Link to="/games" className="text-blue-400 font-bold hover:underline flex items-center gap-1 group">
                                    Ver catálogo <ArrowRight size={16} className="group-hover:translate-x-1 transition" />
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
};
export default HomePage;
