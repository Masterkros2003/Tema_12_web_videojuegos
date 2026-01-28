import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import GameCard from '../components/GameCard';
import SearchBar from '../components/SearchBar';
import { searchGames, getAllGames } from '../services/api';
import { useSearchParams } from 'react-router-dom';
import { Loader2 } from 'lucide-react';

const GamesPage = () => {
    const [games, setGames] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchParams] = useSearchParams();
    const query = searchParams.get('search');

    useEffect(() => {
        const fetchGames = async () => {
            setLoading(true);
            try {
                let data;
                if (query) {
                    data = await searchGames(query);
                } else {
                    data = await getAllGames();
                }

                if (data && data.results) {
                    setGames(data.results);
                } else {
                    setGames([]);
                }
            } catch (error) {
                console.error("Error fetching games", error);
                setGames([]);
            } finally {
                setLoading(false);
            }
        };

        fetchGames();
    }, [query]);

    return (
        <div className="min-h-screen flex flex-col bg-slate-900 text-white font-sans">
            <Header />

            <main className="grow container mx-auto px-4 py-8">
                <div className="mb-12 flex flex-col items-center text-center space-y-6">
                    <h1 className="text-4xl md:text-5xl font-black bg-clip-text text-transparent bg-linear-to-r from-white to-slate-500">
                        {query ? `Resultados para "${query}"` : 'Explorador de Videojuegos'}
                    </h1>
                    <div className="w-full max-w-2xl transform hover:scale-[1.01] transition duration-300">
                        <SearchBar initialQuery={query || ''} />
                    </div>
                </div>

                {loading ? (
                    <div className="flex flex-col items-center justify-center py-20">
                        <Loader2 size={48} className="animate-spin text-teal-500 mb-4" />
                        <p className="text-slate-400 animate-pulse">Cargando juegos...</p>
                    </div>
                ) : games.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 animate-fadeIn">
                        {games.map((game) => (
                            <GameCard key={game.id} game={game} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20 bg-slate-800/50 rounded-3xl border border-slate-700">
                        <p className="text-2xl text-slate-300 font-bold mb-2">No se encontraron juegos</p>
                        <p className="text-slate-500">Intenta con otra búsqueda o revisa tu conexión.</p>
                    </div>
                )}
            </main>

            <Footer />
        </div>
    );
};
export default GamesPage;
