import { Link } from 'react-router-dom';
import { Gamepad2 } from 'lucide-react';

const Header = () => {
    return (
        <header className="bg-slate-900 border-b border-slate-700 sticky top-0 z-50 shadow-md">
            <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                <Link to="/" className="flex items-center gap-2 text-2xl font-bold text-teal-400 hover:text-teal-300 transition">
                    <Gamepad2 size={32} />
                    <span>GameExplore</span>
                </Link>
                <nav>
                    <ul className="flex gap-6">
                        <li>
                            <Link to="/" className="text-slate-200 hover:text-teal-400 transition font-medium">Inicio</Link>
                        </li>
                        <li>
                            <Link to="/games" className="text-slate-200 hover:text-teal-400 transition font-medium">Explorar</Link>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    );
};
export default Header;
