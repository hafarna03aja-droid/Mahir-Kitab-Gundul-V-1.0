import React, { useState } from 'react';
import { scholarsData } from '../constants/kitabData';
import type { Scholar, Book } from '../constants/kitabData';
import ScholarDetailModal from './ScholarDetailModal';
import BookContentModal from './BookContentModal';

const ScholarCard: React.FC<{ scholar: Scholar; onClick: () => void }> = ({ scholar, onClick }) => (
    <div 
        onClick={onClick}
        className="bg-slate-800 rounded-lg shadow-lg p-5 cursor-pointer transition-all duration-300 hover:shadow-amber-500/20 hover:ring-2 hover:ring-amber-500 hover:-translate-y-2 group"
    >
        <div className="flex flex-col items-center text-center">
            {/* Using a generic placeholder div for image */}
            <div className="w-24 h-24 rounded-full bg-slate-700 border-2 border-slate-600 group-hover:border-amber-400 transition-colors flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-slate-500 group-hover:text-amber-400 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
            </div>
            <h3 className="text-lg font-bold text-slate-200 group-hover:text-amber-400 transition-colors">{scholar.name}</h3>
            <p className="text-sm text-slate-400">{scholar.era}</p>
            <p className="mt-2 text-xs font-semibold text-sky-300 bg-sky-500/20 px-2 py-1 rounded-full">{scholar.expertise.split(',')[0]}</p>
        </div>
    </div>
);

const KitabTab: React.FC = () => {
    const [selectedScholar, setSelectedScholar] = useState<Scholar | null>(null);
    const [selectedBook, setSelectedBook] = useState<Book | null>(null);

    const openScholarModal = (scholar: Scholar) => {
        setSelectedScholar(scholar);
    };

    const closeScholarModal = () => {
        setSelectedScholar(null);
    };

    const openBookModal = (book: Book) => {
        if (book.content) {
            setSelectedBook(book);
        }
    };

    const closeBookModal = () => {
        setSelectedBook(null);
    };

    return (
        <div>
            <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-amber-400">Jelajahi Warisan 9 Ulama Besar</h2>
                <p className="mt-2 max-w-2xl mx-auto text-slate-400">
                    Kenali biografi dan karya-karya monumental dari para cendekiawan yang telah membentuk pilar-pilar keilmuan Islam.
                </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-8">
                {scholarsData.map((scholar) => (
                    <ScholarCard key={scholar.id} scholar={scholar} onClick={() => openScholarModal(scholar)} />
                ))}
            </div>
            <ScholarDetailModal scholar={selectedScholar} onClose={closeScholarModal} onBookClick={openBookModal} />
            <BookContentModal book={selectedBook} onClose={closeBookModal} />
        </div>
    );
};

export default KitabTab;