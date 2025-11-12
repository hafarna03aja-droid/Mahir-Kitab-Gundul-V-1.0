import type { VercelRequest, VercelResponse } from '@vercel/node';
import { GoogleGenAI, Type } from "@google/genai";

const gundulSchema = {
    type: Type.OBJECT,
    properties: {
        arab_gundul: {
            type: Type.STRING,
            description: "Teks Arab standar tanpa harakat (gundul) hasil terjemahan."
        }
    },
    required: ["arab_gundul"]
};

export default async function handler(req: VercelRequest, res: VercelResponse) {
    // Enable CORS
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
    res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const { text } = req.body;

        if (!text || typeof text !== 'string') {
            return res.status(400).json({ error: 'Text is required' });
        }

        const API_KEY = process.env.GEMINI_API_KEY;
        if (!API_KEY) {
            console.error('GEMINI_API_KEY not set');
            return res.status(500).json({ error: 'API configuration error' });
        }

        const ai = new GoogleGenAI({ apiKey: API_KEY });

        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: `Terjemahkan teks berikut ke Arab gundul: "${text}"`,
            config: {
                systemInstruction: `Anda adalah ahli penerjemah Bahasa Indonesia ke Bahasa Arab. Tugas Anda adalah menerjemahkan teks Indonesia yang diberikan menjadi teks Arab standar tanpa harakat (Arab Gundul). Hanya kembalikan hasilnya dalam format JSON dengan satu kunci: 'arab_gundul'. Jangan sertakan penjelasan atau teks tambahan apa pun.`,
                responseMimeType: "application/json",
                responseSchema: gundulSchema,
            },
        });

        const jsonString = response.text.trim();
        const result = JSON.parse(jsonString);
        
        if (result && result.arab_gundul) {
            return res.status(200).json({ arabGundul: result.arab_gundul });
        } else {
            throw new Error("Respons API tidak valid.");
        }

    } catch (error) {
        console.error("Error calling Gemini API for conversion:", error);
        return res.status(500).json({ 
            error: 'Gagal mengonversi teks. Pastikan kalimat Anda jelas.',
            details: error instanceof Error ? error.message : 'Unknown error'
        });
    }
}
