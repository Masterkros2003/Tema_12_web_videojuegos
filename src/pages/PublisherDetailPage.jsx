import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import GameCard from '../components/GameCard';
import Pagination from '../components/Pagination';
import { getPublisherDetails, getGamesByPublisher } from '../services/api';
import { Loader2, Globe } from 'lucide-react';
import { useSearchParams } from 'react-router-dom';

const PublisherDetailPage = () => {
    const { id } = useParams();
    const [publisher, setPublisher] = useState(null);
    const [games, setGames] = useState([]);
    const [loading, setLoading] = useState(true);
    const [totalGames, setTotalGames] = useState(0);
    const [searchParams] = useSearchParams();
    const page = parseInt(searchParams.get('page') || '1', 10);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const pubData = await getPublisherDetails(id);
                setPublisher(pubData);

                const gamesData = await getGamesByPublisher(id, page);
                if (gamesData && gamesData.results) {
                    setGames(gamesData.results);
                    setTotalGames(gamesData.count);
                }
            } catch (error) {
                console.error("Error fetching publisher data", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
        window.scrollTo(0, 0);
    }, [id, page]);

    if (loading) {
        return (
            <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-center text-white">
                <Loader2 size={48} className="animate-spin text-teal-500 mb-4" />
                <p className="text-xl text-slate-400">Cargando publisher...</p>
            </div>
        );
    }

    if (!publisher) return null;

    return (
        <div className="min-h-screen flex flex-col bg-slate-900 text-white font-sans">
            <Header />

            <div className="relative h-[40vh] min-h-[300px] w-full">
                <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: `url(${publisher.image_background})` }}
                >
                    <div className="absolute inset-0 bg-slate-900/80 backdrop-blur-[2px]"></div>
                    <div className="absolute inset-0 bg-linear-to-t from-slate-900 via-slate-900/40 to-transparent"></div>
                </div>

                <div className="container mx-auto px-4 h-full flex flex-col justify-end relative z-10 pb-8">
                    <h1 className="text-5xl md:text-7xl font-black mb-4">{publisher.name}</h1>
                    <div className="flex flex-wrap items-center gap-4 text-slate-300">
                        <span className="bg-white/10 px-4 py-2 rounded-lg backdrop-blur border border-white/20">
                            <strong>{publisher.games_count}</strong> Juegos
                        </span>
                        {publisher.description && (
                            <div className="max-w-2xl line-clamp-3 text-sm md:text-base opacity-80" dangerouslySetInnerHTML={{ __html: publisher.description }}></div>
                        )}
                    </div>
                </div>
            </div>

            <main className="grow container mx-auto px-4 py-12">
                <h2 className="text-3xl font-bold mb-8 border-l-4 border-teal-500 pl-4">Juegos de {publisher.name}</h2>

                {games.length > 0 ? (
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
                    </div>
                )}
            </main>

            <Footer />
        </div>
    );
};
export default PublisherDetailPage;
