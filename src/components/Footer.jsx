const Footer = () => {
    return (
        <footer className="bg-slate-950 py-8 mt-12 border-t border-slate-800">
            <div className="container mx-auto px-4 text-center text-slate-500">
                <p className="mb-2">&copy; {new Date().getFullYear()} GameExplore. Diseño de Interfaces Web.</p>
                <p className="text-sm">Datos proporcionados por <a href="https://rawg.io/" target="_blank" rel="noopener noreferrer" className="text-teal-500 hover:underline">RAWG API</a></p>
            </div>
        </footer>
    );
};
export default Footer;
