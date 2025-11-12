import React, { useState, useEffect } from 'react';
import { analyzeArabicText, convertToArabGundul } from '../services/geminiService';
import { saveAnalysisHistory, getAnalysisHistory, clearAllHistory } from '../services/supabaseService';
import { CATEGORIZED_EXAMPLES } from '../constants';
import type { AnalysisResult } from '../types';
import AnalysisResultDisplay from './AnalysisResultDisplay';

const LoadingSpinner: React.FC = () => (
    <div className="flex flex-col items-center justify-center p-8 text-slate-500">
        <svg className="animate-spin h-8 w-8 text-amber-500" xmlns="http://www.w.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        <p className="mt-4 text-center">AI sedang menganalisis teks... Mohon tunggu sejenak.</p>
    </div>
);

const AnalysisTab: React.FC = () => {
    const [inputText, setInputText] = useState('');
    const [result, setResult] = useState<AnalysisResult | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [selectedCategory, setSelectedCategory] = useState<string>(Object.keys(CATEGORIZED_EXAMPLES)[0]);
    const [indonesianInput, setIndonesianInput] = useState('');
    const [isConverting, setIsConverting] = useState(false);
    const [conversionError, setConversionError] = useState<string | null>(null);
    const [history, setHistory] = useState<any[]>([]);
    const [loadingHistory, setLoadingHistory] = useState(true);

    // Load history from Supabase on mount
    useEffect(() => {
        const loadHistory = async () => {
            setLoadingHistory(true);
            try {
                const dbHistory = await getAnalysisHistory(20);
                if (dbHistory.length > 0) {
                    setHistory(dbHistory);
                } else {
                    // Fallback to localStorage if no database data
                    const storedHistory = localStorage.getItem('analysisHistory');
                    if (storedHistory) {
                        const localHistory = JSON.parse(storedHistory);
                        setHistory(localHistory.map((text: string) => ({ original_text: text })));
                    }
                }
            } catch (e) {
                console.error("Failed to load history", e);
                // Fallback to localStorage
                try {
                    const storedHistory = localStorage.getItem('analysisHistory');
                    if (storedHistory) {
                        const localHistory = JSON.parse(storedHistory);
                        setHistory(localHistory.map((text: string) => ({ original_text: text })));
                    }
                } catch (e2) {
                    console.error("Failed to parse localStorage", e2);
                }
            } finally {
                setLoadingHistory(false);
            }
        };
        loadHistory();
    }, []);

    const handleAnalyze = async (textToAnalyze: string = inputText) => {
        if (!textToAnalyze.trim()) {
            setError('Silakan masukkan teks Arab untuk dianalisis.');
            return;
        }
        setIsLoading(true);
        setError(null);
        setResult(null);

        try {
            const analysisResult = await analyzeArabicText(textToAnalyze);
            setResult(analysisResult);
            
            // Save to Supabase database
            await saveAnalysisHistory(analysisResult);
            
            // Reload history from database
            const updatedHistory = await getAnalysisHistory(20);
            setHistory(updatedHistory);
            
            // Also update localStorage as backup
            const textHistory = updatedHistory.map(item => item.original_text);
            localStorage.setItem('analysisHistory', JSON.stringify(textHistory));
        } catch (err) {
            setError((err as Error).message || 'Terjadi kesalahan yang tidak diketahui.');
        } finally {
            setIsLoading(false);
        }
    };
    
    const handleConvert = async () => {
        if (!indonesianInput.trim()) {
            setConversionError('Silakan masukkan teks Indonesia untuk dikonversi.');
            return;
        }
        setIsConverting(true);
        setConversionError(null);
        try {
            const arabGundulText = await convertToArabGundul(indonesianInput);
            setInputText(arabGundulText);
        } catch (err) {
            setConversionError((err as Error).message || 'Terjadi kesalahan saat konversi.');
        } finally {
            setIsConverting(false);
        }
    };

    const handleHistoryClick = (text: string) => {
        setInputText(text);
        handleAnalyze(text);
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            <div className="lg:col-span-2 bg-white rounded-lg shadow-lg p-4 sm:p-6 lg:p-8 text-slate-800">
                <div className="prose prose-slate max-w-none">
                    <h2 className="text-xl sm:text-2xl font-bold text-slate-900">Penganalisis Teks Arab</h2>
                    <p className="text-sm sm:text-base">
                        Masukkan teks Arab (dengan atau tanpa harakat) di bawah ini untuk mendapatkan analisis gramatikal (I'rab) yang mendalam, teks yang sudah divokalisasi, dan terjemahannya.
                    </p>
                </div>
                
                <div className="mt-4 sm:mt-6">
                    <label className="block text-xs sm:text-sm font-medium text-slate-600 mb-2">Pilih Contoh Teks dari Kategori:</label>
                    <div className="flex flex-wrap gap-1.5 sm:gap-2 border-b border-slate-200 pb-2 sm:pb-3 mb-2 sm:mb-3">
                        {Object.keys(CATEGORIZED_EXAMPLES).map((category) => (
                            <button
                                key={category}
                                onClick={() => setSelectedCategory(category)}
                                className={`px-2 sm:px-4 py-1.5 sm:py-2 rounded-md text-xs sm:text-sm font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 ${
                                    selectedCategory === category
                                        ? 'bg-amber-500 text-white shadow'
                                        : 'bg-white text-slate-700 hover:bg-slate-200 border border-slate-300'
                                }`}
                            >
                                {category}
                            </button>
                        ))}
                    </div>

                    <div className="flex flex-wrap gap-1.5 sm:gap-2 min-h-[40px] items-center">
                        {CATEGORIZED_EXAMPLES[selectedCategory].map((example) => (
                            <button
                                key={example.label}
                                onClick={() => setInputText(example.text)}
                                className="px-2 sm:px-3 py-1 bg-slate-100 text-slate-700 rounded-full text-xs sm:text-sm hover:bg-amber-100 border border-slate-200 transition-colors"
                            >
                                {example.label}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-slate-200">
                    <h3 className="text-base sm:text-lg font-bold text-slate-700">Alat Bantu: Konversi Teks Indonesia</h3>
                    <p className="text-xs sm:text-sm text-slate-500 mb-2 sm:mb-3">
                        Ketik kalimat dalam Bahasa Indonesia, lalu klik konversi untuk membuat teks Arab gundulnya. Teks akan muncul di kotak utama di bawah untuk dianalisis.
                    </p>
                    <textarea
                        value={indonesianInput}
                        onChange={(e) => setIndonesianInput(e.target.value)}
                        placeholder="Contoh: 'ilmu itu adalah cahaya'..."
                        className="w-full h-20 sm:h-24 p-2 sm:p-3 border border-slate-300 rounded-md focus:ring-amber-500 focus:border-amber-500 text-sm sm:text-base"
                    />
                    <div className="mt-2 flex justify-end">
                        <button
                            onClick={handleConvert}
                            disabled={isConverting}
                            className="px-3 sm:px-5 py-2 bg-slate-600 text-white text-xs sm:text-sm font-semibold rounded-md hover:bg-slate-700 transition-colors disabled:bg-slate-400 disabled:cursor-not-allowed"
                        >
                            {isConverting ? 'Mengonversi...' : 'Konversi ke Arab Gundul'}
                        </button>
                    </div>
                    {conversionError && (
                        <div className="mt-3 p-2 sm:p-3 bg-red-100 border border-red-400 text-red-700 rounded-md text-xs sm:text-sm">
                            <p><span className="font-bold">Error Konversi:</span> {conversionError}</p>
                        </div>
                    )}
                </div>

                <div className="mt-4 sm:mt-6">
                    <label className="block text-xs sm:text-sm font-medium text-slate-600 mb-2">Teks Arab untuk Dianalisis:</label>
                    <textarea
                        value={inputText}
                        onChange={(e) => setInputText(e.target.value)}
                        placeholder="...اكتب النص العربي هنا أو اختر dari contoh/konversi di atas"
                        className="w-full h-40 sm:h-48 p-3 sm:p-4 border border-slate-300 rounded-md focus:ring-amber-500 focus:border-amber-500 font-arabic text-xl sm:text-2xl text-right"
                        dir="rtl"
                        lang="ar"
                    />
                </div>

                <div className="mt-3 sm:mt-4 flex justify-end">
                    <button
                        onClick={() => handleAnalyze()}
                        disabled={isLoading}
                        className="w-full sm:w-auto px-4 sm:px-6 py-2.5 sm:py-3 bg-amber-500 text-white font-bold text-sm sm:text-base rounded-md hover:bg-amber-600 transition-colors disabled:bg-slate-400 disabled:cursor-not-allowed flex items-center justify-center"
                    >
                        {isLoading ? 'Menganalisis...' : 'Analisis Teks'}
                    </button>
                </div>
                
                {error && (
                    <div className="mt-4 sm:mt-6 p-3 sm:p-4 bg-red-100 border border-red-400 text-red-700 rounded-md text-xs sm:text-sm">
                        <p><span className="font-bold">Error:</span> {error}</p>
                    </div>
                )}

                <div className="mt-6 sm:mt-8">
                    {isLoading && <LoadingSpinner />}
                    {result && <AnalysisResultDisplay result={result} />}
                </div>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6 h-fit lg:sticky lg:top-24">
                <h3 className="text-base sm:text-lg font-bold text-slate-800 border-b border-slate-200 pb-2 sm:pb-3 mb-2 sm:mb-3">
                    Riwayat Analisis
                    {loadingHistory && <span className="text-xs text-slate-500 ml-2">(memuat...)</span>}
                </h3>
                {history.length > 0 ? (
                    <>
                        <ul className="space-y-1.5 sm:space-y-2 max-h-60 sm:max-h-96 overflow-y-auto">
                            {history.map((item, index) => (
                                <li key={item.id || index}>
                                    <button 
                                        onClick={() => handleHistoryClick(item.original_text)}
                                        className="w-full text-right p-2 font-arabic text-sm sm:text-md text-slate-700 rounded-md hover:bg-amber-50 transition-colors truncate"
                                        title={item.original_text}
                                    >
                                        {item.original_text}
                                    </button>
                                </li>
                            ))}
                        </ul>
                        <button 
                            onClick={async () => {
                                // Clear from Supabase
                                await clearAllHistory();
                                // Clear localStorage
                                localStorage.removeItem('analysisHistory');
                                // Clear UI
                                setHistory([]);
                            }}
                            className="w-full mt-3 sm:mt-4 px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm text-red-700 bg-red-100 hover:bg-red-200 rounded-md transition-colors"
                        >
                            Bersihkan Riwayat
                        </button>
                    </>
                ) : loadingHistory ? (
                    <div className="flex items-center justify-center p-4">
                        <svg className="animate-spin h-5 w-5 text-amber-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                    </div>
                ) : (
                    <p className="text-xs sm:text-sm text-slate-500 italic">Belum ada riwayat analisis.</p>
                )}
            </div>
        </div>
    );
};

export default AnalysisTab;