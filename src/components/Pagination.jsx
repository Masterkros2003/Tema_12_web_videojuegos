import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useSearchParams } from 'react-router-dom';

const Pagination = ({ totalItems, itemsPerPage = 20 }) => {
    const [searchParams, setSearchParams] = useSearchParams();
    const currentPage = parseInt(searchParams.get('page') || '1', 10);
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    const handlePageChange = (page) => {
        if (page < 1 || page > totalPages) return;

        const newParams = new URLSearchParams(searchParams);
        newParams.set('page', page);
        setSearchParams(newParams);
        window.scrollTo(0, 0);
    };

    if (totalPages <= 1) return null;

    // Calculate range of pages to show
    let startPage = Math.max(1, currentPage - 2);
    let endPage = Math.min(totalPages, startPage + 4);

    if (endPage - startPage < 4) {
        startPage = Math.max(1, endPage - 4);
    }

    const pages = [];
    for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
    }

    return (
        <div className="flex items-center justify-center gap-2 mt-12 mb-8">
            <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="p-2 rounded-lg bg-slate-800 border border-slate-700 text-slate-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-700 hover:text-white transition"
                aria-label="Previous page"
            >
                <ChevronLeft size={20} />
            </button>

            {startPage > 1 && (
                <>
                    <button
                        onClick={() => handlePageChange(1)}
                        className={`w-10 h-10 rounded-lg border flex items-center justify-center font-bold transition
                            ${currentPage === 1
                                ? 'bg-teal-600 border-teal-500 text-white'
                                : 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700 hover:text-white'}`}
                    >
                        1
                    </button>
                    {startPage > 2 && <span className="text-slate-500">...</span>}
                </>
            )}

            {pages.map(page => (
                <button
                    key={page}
                    onClick={() => handlePageChange(page)}
                    className={`w-10 h-10 rounded-lg border flex items-center justify-center font-bold transition
                        ${currentPage === page
                            ? 'bg-teal-600 border-teal-500 text-white'
                            : 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700 hover:text-white'}`}
                >
                    {page}
                </button>
            ))}

            {endPage < totalPages && (
                <>
                    {endPage < totalPages - 1 && <span className="text-slate-500">...</span>}
                    <button
                        onClick={() => handlePageChange(totalPages)}
                        className={`w-10 h-10 rounded-lg border flex items-center justify-center font-bold transition
                            ${currentPage === totalPages
                                ? 'bg-teal-600 border-teal-500 text-white'
                                : 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700 hover:text-white'}`}
                    >
                        {totalPages}
                    </button>
                </>
            )}

            <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="p-2 rounded-lg bg-slate-800 border border-slate-700 text-slate-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-700 hover:text-white transition"
                aria-label="Next page"
            >
                <ChevronRight size={20} />
            </button>
        </div>
    );
};

export default Pagination;
