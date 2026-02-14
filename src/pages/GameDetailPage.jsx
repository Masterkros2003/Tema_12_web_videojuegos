import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { getGameDetails } from '../services/api';
import { Star, Globe, Monitor, Heart, Clock, Calendar, Loader2, Tag, Building2 } from 'lucide-react';

const GameDetailPage = () => {
    const { id } = useParams();
    const [game, setGame] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isFavorite, setIsFavorite] = useState(false); // Visual only

    useEffect(() => {
        const fetchDetail = async () => {
            setLoading(true);
            try {
                const data = await getGameDetails(id);
                setGame(data);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };
        fetchDetail();
        window.scrollTo(0, 0);
    }, [id]);

    if (loading) {
        return (
            <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-center text-white">
                <Loader2 size={48} className="animate-spin text-teal-500 mb-4" />
                <p className="text-xl text-slate-400">Cargando información...</p>
            </div>
        );
    }

    if (!game) return (
        <div className="min-h-screen bg-slate-900 text-white flex flex-col">
            <Header />
            <div className="grow flex items-center justify-center">
                <p className="text-2xl text-slate-500">Juego no encontrado</p>
            </div>
            <Footer />
        </div>
    );

    const toggleFavorite = () => setIsFavorite(!isFavorite);

    return (
        <div className="min-h-screen bg-slate-900 text-white font-sans flex flex-col">
            <Header />

            {/* Banner Image */}
            <div className="relative h-[50vh] min-h-[400px] w-full group">
                <div
                    className="absolute inset-0 bg-cover bg-center transition duration-700 group-hover:scale-105"
                    style={{ backgroundImage: `url(${game.background_image})` }}
                >
                    <div className="absolute inset-0 bg-slate-900/80 backdrop-blur-[2px]"></div>
                    <div className="absolute inset-0 bg-linear-to-t from-slate-900 via-slate-900/40 to-transparent"></div>
                </div>

                <div className="container mx-auto px-4 h-full flex items-end relative z-10 pb-12">
                    <div className="flex flex-col md:flex-row gap-8 items-end w-full">
                        <img
                            src={game.background_image}
                            alt={game.name}
                            className="w-64 h-80 object-cover rounded-xl shadow-2xl border-4 border-slate-800 hidden md:block transform hover:-translate-y-2 transition duration-500"
                        />
                        <div className="mb-2 grow">
                            <div className="flex flex-wrap gap-2 mb-4">
                                {game.genres?.map(g => (
                                    <Link key={g.id} to={`/genre/${g.id}/${g.slug}`} className="bg-teal-500/20 text-teal-300 border border-teal-500/30 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider hover:bg-teal-500/30 transition">
                                        {g.name}
                                    </Link>
                                ))}
                            </div>
                            <h1 className="text-4xl md:text-6xl font-black mb-6 leading-tight drop-shadow-xl">{game.name}</h1>
                            <div className="flex flex-wrap gap-4 items-center text-sm md:text-base">
                                <span className="flex items-center gap-2 bg-slate-800/80 backdrop-blur px-4 py-2 rounded-lg border border-slate-700 font-bold">
                                    <Star size={20} fill="currentColor" className="text-yellow-400" />
                                    {game.rating} / 5
                                </span>
                                <span className="flex items-center gap-2 bg-slate-800/80 backdrop-blur px-4 py-2 rounded-lg border border-slate-700">
                                    <Calendar size={18} className="text-slate-400" />
                                    {game.released || 'TBA'}
                                </span>
                                {game.playtime > 0 && (
                                    <span className="flex items-center gap-2 bg-slate-800/80 backdrop-blur px-4 py-2 rounded-lg border border-slate-700">
                                        <Clock size={18} className="text-slate-400" />
                                        {game.playtime} hrs
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <main className="grow container mx-auto px-4 py-12 grid grid-cols-1 lg:grid-cols-3 gap-12">
                {/* Main Content */}
                <div className="lg:col-span-2 space-y-10">
                    <section>
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-2xl font-bold border-l-4 border-teal-500 pl-4">Descripción</h2>
                            <button
                                onClick={toggleFavorite}
                                className={`flex items-center gap-2 px-6 py-2 rounded-full font-bold transition-all duration-300 border ${isFavorite
                                    ? 'bg-red-500/10 text-red-500 border-red-500'
                                    : 'bg-slate-800 text-slate-300 border-slate-700 hover:border-slate-500 hover:text-white'
                                    }`}
                            >
                                <Heart size={20} className={isFavorite ? 'fill-current' : ''} />
                                {isFavorite ? 'Favorito' : 'Añadir a Favoritos'}
                            </button>
                        </div>
                        <div
                            className="prose prose-invert prose-lg prose-slate max-w-none text-slate-300 leading-relaxed bg-slate-800/30 p-8 rounded-2xl border border-slate-800"
                            dangerouslySetInnerHTML={{ __html: game.description }}
                        />
                    </section>
                </div>

                {/* Sidebar Info */}
                <div className="space-y-8">
                    <div className="bg-slate-800 p-8 rounded-2xl border border-slate-700 shadow-xl sticky top-24">
                        <h3 className="text-xl font-bold mb-6 text-white border-b border-slate-700 pb-4">Detalles Técnicos</h3>

                        <div className="space-y-6">
                            <div>
                                <span className="text-slate-500 text-sm font-bold uppercase tracking-wider block mb-2">Plataformas</span>
                                <div className="flex flex-wrap gap-2">
                                    {game.platforms?.map(p => (
                                        <span key={p.platform.id} className="text-xs bg-slate-900 text-slate-300 px-3 py-1.5 rounded-lg border border-slate-700 flex items-center gap-1.5 hover:border-teal-500/50 transition cursor-default">
                                            <Monitor size={12} /> {p.platform.name}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <span className="text-slate-500 text-sm font-bold uppercase tracking-wider block mb-2">Publishers</span>
                                <div className="flex flex-col gap-2">
                                    {game.publishers?.map(p => (
                                        <Link key={p.id} to={`/publisher/${p.id}`} className="text-sm text-teal-400 hover:text-teal-300 transition flex items-center gap-2">
                                            <Building2 size={14} /> {p.name}
                                        </Link>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <span className="text-slate-500 text-sm font-bold uppercase tracking-wider block mb-2">Metascore</span>
                                {game.metacritic ? (
                                    <span className={`inline-block px-3 py-1 rounded font-bold text-sm ${game.metacritic >= 75 ? 'bg-green-500/20 text-green-400 border border-green-500/30' :
                                        game.metacritic >= 50 ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30' :
                                            'bg-red-500/20 text-red-400 border border-red-500/30'
                                        }`}>
                                        {game.metacritic}
                                    </span>
                                ) : <span className="text-slate-600 italic">No disponible</span>}
                            </div>

                            <div>
                                <span className="text-slate-500 text-sm font-bold uppercase tracking-wider block mb-2">Tags</span>
                                <div className="flex flex-wrap gap-2">
                                    {game.tags?.map(t => (
                                        <Link key={t.id} to={`/tag/${t.id}/${t.slug}`} className="text-xs bg-slate-900 text-slate-400 px-2 py-1 rounded border border-slate-800 hover:border-teal-500/30 hover:text-teal-400 transition flex items-center gap-1">
                                            <Tag size={10} /> {t.name}
                                        </Link>
                                    ))}
                                </div>
                            </div>

                            {game.website && (
                                <div className="pt-4 border-t border-slate-700">
                                    <a
                                        href={game.website}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="w-full bg-slate-700 hover:bg-teal-600 text-white py-3 rounded-lg flex items-center justify-center gap-2 transition font-bold"
                                    >
                                        <Globe size={18} /> Visit Website
                                    </a>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
};
export default GameDetailPage;
