import { Star, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';

const GameCard = ({ game }) => {
    return (
        <Link to={`/game/${game.id}`} className="block group h-full">
            <div className="bg-slate-800 rounded-xl overflow-hidden shadow-lg transition duration-300 transform group-hover:-translate-y-1 group-hover:shadow-2xl h-full flex flex-col border border-slate-700 group-hover:border-teal-500/50">
                <div className="relative aspect-video overflow-hidden">
                    {game.background_image ? (
                        <img
                            src={game.background_image}
                            alt={game.name}
                            className="w-full h-full object-cover transition duration-500 group-hover:scale-110"
                            loading="lazy"
                        />
                    ) : (
                        <div className="w-full h-full bg-slate-700 flex items-center justify-center text-slate-500">
                            No Image
                        </div>
                    )}
                    <div className="absolute top-2 right-2 bg-black/70 backdrop-blur-md px-2 py-1 rounded-md flex items-center gap-1 text-yellow-400 text-sm font-bold border border-white/10">
                        <Star size={14} fill="currentColor" />
                        <span>{game.rating}</span>
                    </div>
                </div>
                <div className="p-4 flex flex-col grow">
                    <h3 className="text-xl font-bold text-white mb-2 line-clamp-1 group-hover:text-teal-400 transition">{game.name}</h3>

                    <div className="flex flex-wrap gap-2 mb-3">
                        {game.genres?.slice(0, 3).map(genre => (
                            <span key={genre.id} className="text-xs bg-slate-700 text-slate-300 px-2 py-0.5 rounded-full">
                                {genre.name}
                            </span>
                        ))}
                    </div>

                    <div className="mt-auto flex justify-between items-center text-slate-400 text-sm pt-3 border-t border-slate-700/50">
                        <div className="flex items-center gap-1">
                            <Calendar size={14} />
                            <span>{game.released?.split('-')[0] || 'TBA'}</span>
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    );
};
export default GameCard;
