import React from 'react';
import type { Book } from '../constants/kitabData';

interface BookContentModalProps {
    book: Book | null;
    onClose: () => void;
}

const BookContentModal: React.FC<BookContentModalProps> = ({ book, onClose }) => {
    if (!book || !book.content) return null;

    return (
        <div 
            className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center z-[60] p-4"
            onClick={onClose}
        >
            <div 
                className="bg-slate-900 rounded-xl shadow-2xl max-w-xl w-full border border-amber-500/50 transform transition-all duration-300 scale-95 animate-modal-enter"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="p-6 sm:p-8">
                    <div className="flex justify-between items-center border-b border-slate-700 pb-4 mb-6">
                        <div>
                            <h3 className="text-2xl font-bold text-amber-400">Kutipan dari Kitab</h3>
                            <p className="text-slate-300 font-semibold">{book.title}</p>
                        </div>
                        <button onClick={onClose} className="text-slate-500 hover:text-white transition-colors">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>

                    <div 
                        className="text-right font-arabic text-3xl text-slate-200 leading-loose bg-slate-800 p-6 rounded-md"
                        dir="rtl"
                        lang="ar"
                    >
                        {book.content}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BookContentModal;