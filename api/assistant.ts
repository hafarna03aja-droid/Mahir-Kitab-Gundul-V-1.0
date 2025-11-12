import type { VercelRequest, VercelResponse } from '@vercel/node';
import { GoogleGenAI } from "@google/genai";

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
        const { question } = req.body;

        if (!question || typeof question !== 'string') {
            return res.status(400).json({ error: 'Question is required' });
        }

        const API_KEY = process.env.GEMINI_API_KEY;
        if (!API_KEY) {
            console.error('GEMINI_API_KEY not set');
            return res.status(500).json({ error: 'API configuration error' });
        }

        const ai = new GoogleGenAI({ apiKey: API_KEY });

        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: question,
            config: {
                systemInstruction: `Anda adalah 'Kiai Cerdas', seorang ahli dan guru besar dalam tata bahasa Arab (Nahwu & Sharaf) dan sastra (Balaghah) dari lingkungan pesantren tradisional. Gaya bicara Anda sabar, jelas, dan mendalam. 
                Jawab pertanyaan pengguna dalam Bahasa Indonesia.
                Selalu gunakan format Markdown untuk menstrukturkan jawaban Anda agar sangat jelas dan menarik secara visual.
                
                Gunakan format berikut:
                - Gunakan \`### \` untuk judul atau topik utama pembahasan.
                - Gunakan \`**teks**\` untuk menyorot istilah-istilah penting dalam Bahasa Indonesia atau Arab.
                - Gunakan daftar berpoin dengan \`* \` untuk enumerasi, rincian, atau contoh.
                - Gunakan \`\`contoh Arab\`\` (dengan backticks) untuk setiap contoh dalam tulisan Arab. Ini sangat penting.
                - Gunakan \`> \` untuk kutipan, definisi, atau catatan penting yang perlu diperhatikan secara khusus.
                
                Pastikan penjelasan Anda komprehensif, memberikan contoh yang relevan, dan mudah dipahami oleh pembelajar dari semua tingkatan.`,
            },
        });

        return res.status(200).json({ answer: response.text });

    } catch (error) {
        console.error("Error calling Gemini API for assistance:", error);
        return res.status(500).json({ 
            error: 'Gagal mendapatkan jawaban dari asisten. Silakan coba lagi.',
            details: error instanceof Error ? error.message : 'Unknown error'
        });
    }
}
