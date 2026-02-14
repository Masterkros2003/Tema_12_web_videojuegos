import React, { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import GameCard from '../components/GameCard';
import Pagination from '../components/Pagination';
import { getGamesByTag, getGamesByGenre } from '../services/api';
import { Loader2, Tag, Gamepad2 } from 'lucide-react';
import { useSearchParams } from 'react-router-dom';

const TagGamesPage = () => {
    const { id, slug } = useParams();
    const location = useLocation();
    const [games, setGames] = useState([]);
    const [loading, setLoading] = useState(true);
    const [totalGames, setTotalGames] = useState(0);
    const [searchParams] = useSearchParams();
    const page = parseInt(searchParams.get('page') || '1', 10);

    const isGenre = location.pathname.includes('/genre/');
    const typeLabel = isGenre ? 'Género' : 'Tag';
    const Icon = isGenre ? Gamepad2 : Tag;

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                let data;
                if (isGenre) {
                    data = await getGamesByGenre(id, page);
                } else {
                    data = await getGamesByTag(id, page);
                }

                if (data && data.results) {
                    setGames(data.results);
                    setTotalGames(data.count);
                } else {
                    setGames([]);
                    setTotalGames(0);
                }
            } catch (error) {
                console.error("Error fetching filtered games", error);
                setGames([]);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
        window.scrollTo(0, 0);
    }, [id, page, isGenre]);

    return (
        <div className="min-h-screen flex flex-col bg-slate-900 text-white font-sans">
            <Header />

            <main className="grow container mx-auto px-4 py-8">
                <div className="mb-12 flex flex-col items-center text-center space-y-4">
                    <div className="flex items-center gap-2 text-teal-500 font-bold uppercase tracking-wider text-sm">
                        <Icon size={18} />
                        {typeLabel}
                    </div>
                    <h1 className="text-4xl md:text-5xl font-black bg-clip-text text-transparent bg-linear-to-r from-white to-slate-500">
                        {slug?.replace(/-/g, ' ')}
                    </h1>
                </div>

                {loading ? (
                    <div className="flex flex-col items-center justify-center py-20">
                        <Loader2 size={48} className="animate-spin text-teal-500 mb-4" />
                        <p className="text-slate-400 animate-pulse">Cargando juegos...</p>
                    </div>
                ) : games.length > 0 ? (
                    <>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 animate-fadeIn">
                            {games.map((game) => (
                                <GameCard key={game.id} game={game} />
                            ))}
                        </div>
                        <Pagination totalItems={totalGames} itemsPerPage={20} />
                    </>
                ) : (
                    <div className="text-center py-20 bg-slate-800/50 rounded-3xl border border-slate-700">
                        <p className="text-2xl text-slate-300 font-bold mb-2">No se encontraron juegos</p>
                        <p className="text-slate-500">Intenta buscar otra categoría.</p>
                    </div>
                )}
            </main>

            <Footer />
        </div>
    );
};
export default TagGamesPage;
