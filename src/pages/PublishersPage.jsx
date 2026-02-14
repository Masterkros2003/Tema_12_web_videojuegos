import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import SearchBar from '../components/SearchBar';
import Pagination from '../components/Pagination';
import { searchPublishers } from '../services/api';
import { Link, useSearchParams } from 'react-router-dom';
import { Loader2, Users } from 'lucide-react';

const PublishersPage = () => {
    const [publishers, setPublishers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [totalPublishers, setTotalPublishers] = useState(0);
    const [searchParams] = useSearchParams();
    const query = searchParams.get('search') || '';
    const page = parseInt(searchParams.get('page') || '1', 10);

    useEffect(() => {
        const fetchPublishers = async () => {
            setLoading(true);
            try {
                const data = await searchPublishers(query, page);
                if (data && data.results) {
                    setPublishers(data.results);
                    setTotalPublishers(data.count);
                } else {
                    setPublishers([]);
                    setTotalPublishers(0);
                }
            } catch (error) {
                console.error("Error fetching publishers", error);
                setPublishers([]);
            } finally {
                setLoading(false);
            }
        };

        fetchPublishers();
        window.scrollTo(0, 0);
    }, [query, page]);

    return (
        <div className="min-h-screen flex flex-col bg-slate-900 text-white font-sans">
            <Header />

            <main className="grow container mx-auto px-4 py-8">
                <div className="mb-12 flex flex-col items-center text-center space-y-6">
                    <h1 className="text-4xl md:text-5xl font-black bg-clip-text text-transparent bg-linear-to-r from-white to-slate-500">
                        Explorar Publishers
                    </h1>
                    <div className="w-full max-w-2xl transform hover:scale-[1.01] transition duration-300">
                        <SearchBar initialQuery={query} placeholder="Buscar publisher..." />
                    </div>
                </div>

                {loading ? (
                    <div className="flex flex-col items-center justify-center py-20">
                        <Loader2 size={48} className="animate-spin text-teal-500 mb-4" />
                        <p className="text-slate-400 animate-pulse">Cargando publishers...</p>
                    </div>
                ) : publishers.length > 0 ? (
                    <>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 animate-fadeIn">
                            {publishers.map((pub) => (
                                <Link key={pub.id} to={`/publisher/${pub.id}`} className="group relative bg-slate-800 rounded-xl overflow-hidden hover:shadow-2xl hover:shadow-teal-500/20 transition duration-300 border border-slate-700 hover:border-teal-500/50 block h-64">
                                    <div
                                        className="absolute inset-0 bg-cover bg-center transition duration-500 group-hover:scale-110 opacity-60 group-hover:opacity-40"
                                        style={{ backgroundImage: `url(${pub.image_background})` }}
                                    ></div>
                                    <div className="absolute inset-0 bg-linear-to-t from-slate-900 via-slate-900/60 to-transparent"></div>

                                    <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center z-10">
                                        <div className="w-16 h-16 bg-slate-900 rounded-full flex items-center justify-center mb-4 border border-slate-600 group-hover:border-teal-400 group-hover:scale-110 transition shadow-lg">
                                            <Users size={24} className="text-slate-300 group-hover:text-teal-400" />
                                        </div>
                                        <h3 className="text-xl font-bold text-white mb-2 group-hover:text-teal-300 transition">{pub.name}</h3>
                                        <p className="text-sm text-slate-400">{pub.games_count} juegos</p>
                                    </div>
                                </Link>
                            ))}
                        </div>
                        <Pagination totalItems={totalPublishers} itemsPerPage={20} />
                    </>
                ) : (
                    <div className="text-center py-20 bg-slate-800/50 rounded-3xl border border-slate-700">
                        <p className="text-2xl text-slate-300 font-bold mb-2">No se encontraron publishers</p>
                        <p className="text-slate-500">Intenta con otra búsqueda.</p>
                    </div>
                )}
            </main>

            <Footer />
        </div>
    );
};
export default PublishersPage;
