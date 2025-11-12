import React from 'react';
import type { Scholar, Book } from '../constants/kitabData';

interface ScholarDetailModalProps {
    scholar: Scholar | null;
    onClose: () => void;
    onBookClick: (book: Book) => void;
}

const ScholarDetailModal: React.FC<ScholarDetailModalProps> = ({ scholar, onClose, onBookClick }) => {
    if (!scholar) return null;

    return (
        <div 
            className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50 p-4"
            onClick={onClose}
        >
            <div 
                className="bg-slate-800 rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto text-slate-300 border border-slate-700 transform transition-all duration-300 scale-95 animate-modal-enter"
                onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
            >
                <div className="p-6 sm:p-8">
                    <div className="flex justify-between items-start">
                        <div>
                            <h2 className="text-3xl font-bold text-amber-400">{scholar.name}</h2>
                            <p className="text-slate-400">{scholar.era}</p>
                            <p className="mt-1 text-sm bg-sky-500/20 text-sky-300 px-2 py-0.5 rounded-full inline-block">{scholar.expertise}</p>
                        </div>
                        <button onClick={onClose} className="text-slate-500 hover:text-white transition-colors">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>

                    <div className="mt-6 prose prose-invert prose-p:text-slate-400 prose-headings:text-amber-300">
                        <h3>Biografi Singkat</h3>
                        <p>{scholar.bio}</p>
                    </div>

                    <div className="mt-8">
                        <h3 className="text-xl font-semibold text-amber-300 border-b border-slate-700 pb-2 mb-4">Karya-Karya Terkenal</h3>
                        <ul className="space-y-4">
                            {scholar.books.map((book, index) => {
                                const isClickable = !!book.content;
                                const ClickableWrapper = isClickable ? 'button' : 'div';
                                
                                return (
                                    <li key={index}>
                                        <ClickableWrapper 
                                            onClick={isClickable ? () => onBookClick(book) : undefined}
                                            className={`w-full text-left bg-slate-700/50 p-4 rounded-lg transition-colors duration-200 ${isClickable ? 'cursor-pointer hover:bg-slate-700' : ''}`}
                                        >
                                            <div className="flex justify-between items-center">
                                                <h4 className={`font-bold text-slate-100 ${isClickable ? 'group-hover:text-amber-300' : ''}`}>{book.title}</h4>
                                                {isClickable && (
                                                    <span className="text-xs font-semibold text-amber-400 bg-amber-500/20 px-2 py-0.5 rounded-full">
                                                        Lihat Kutipan
                                                    </span>
                                                )}
                                            </div>
                                            <p className="text-sm text-slate-400 mt-1">{book.description}</p>
                                        </ClickableWrapper>
                                    </li>
                                )
                            })}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ScholarDetailModal;