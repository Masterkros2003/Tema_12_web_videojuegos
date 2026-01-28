import { Search } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SearchBar = ({ initialQuery = '' }) => {
    const [query, setQuery] = useState(initialQuery);
    const navigate = useNavigate();

    const handleSearch = (e) => {
        e.preventDefault();
        if (query.trim()) {
            navigate(`/games?search=${encodeURIComponent(query)}`);
        }
    };

    return (
        <form onSubmit={handleSearch} className="relative w-full shadow-lg">
            <div className="relative">
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Buscar juegos (e.j. Cyberpunk, Mario)..."
                    className="w-full bg-slate-800 text-white placeholder-slate-400 pl-12 pr-6 py-4 rounded-2xl border border-slate-700/50 focus:outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 transition-all font-medium text-lg"
                />
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={24} />
            </div>
        </form>
    );
};
export default SearchBar;
