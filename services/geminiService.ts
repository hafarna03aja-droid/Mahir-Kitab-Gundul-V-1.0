import type { AnalysisResult } from '../types';

// Get API URL from environment or use default for local development
const API_BASE_URL = import.meta.env.VITE_APP_URL || 'http://localhost:3000';

export const analyzeArabicText = async (text: string): Promise<AnalysisResult> => {
    try {
        const response = await fetch(`${API_BASE_URL}/api/analyze`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ text }),
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.error || 'Gagal menganalisis teks');
        }

        const result = await response.json();
        return result;

    } catch (error) {
        console.error("Error calling analyze API:", error);
        throw new Error("Gagal menganalisis teks. Silakan coba lagi.");
    }
};

export const convertToArabGundul = async (text: string): Promise<string> => {
    try {
        const response = await fetch(`${API_BASE_URL}/api/convert`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ text }),
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.error || 'Gagal mengonversi teks');
        }

        const result = await response.json();
        return result.arabGundul;

    } catch (error) {
        console.error("Error calling convert API:", error);
        throw new Error("Gagal mengonversi teks. Pastikan kalimat Anda jelas.");
    }
};

export const askAiAssistant = async (question: string): Promise<string> => {
    try {
        const response = await fetch(`${API_BASE_URL}/api/assistant`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ question }),
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.error || 'Gagal mendapatkan jawaban');
        }

        const result = await response.json();
        return result.answer;

    } catch (error) {
        console.error("Error calling assistant API:", error);
        throw new Error("Gagal mendapatkan jawaban dari asisten. Silakan coba lagi.");
    }
};
