import type { VercelRequest, VercelResponse } from '@vercel/node';
import { GoogleGenAI, Type } from "@google/genai";

const analysisSchema = {
    type: Type.OBJECT,
    properties: {
        vocalizedText: {
            type: Type.STRING,
            description: "Teks Arab asli dengan semua harakat (vokal) yang benar ditambahkan."
        },
        translation: {
            type: Type.STRING,
            description: "Terjemahan yang akurat dari teks tersebut ke dalam Bahasa Indonesia."
        },
        irab: {
            type: Type.ARRAY,
            description: "Analisis gramatikal (I'rab & Sharaf) untuk setiap kata dalam teks.",
            items: {
                type: Type.OBJECT,
                properties: {
                    word: { type: Type.STRING, description: "Kata Arab yang dianalisis." },
                    analysis_details: {
                        type: Type.OBJECT,
                        description: "Analisis detail untuk kata tersebut.",
                        properties: {
                            i_rab: { 
                                type: Type.STRING, 
                                description: "Analisis I'rab (tata bahasa) yang sangat detail. Tulis dalam format tradisional pesantren: gunakan istilah nahwu dalam bahasa Arab (contoh: 'مبتدأ مرفوع وعلامة رفعه الضمة الظاهرة'), lalu tambahkan penjelasannya dalam bahasa Indonesia."
                            },
                            sharaf: {
                                type: Type.STRING,
                                description: "Analisis sharaf/tasrif (morfologi) kata tersebut. Sebutkan bentuknya (wazan/sighah), dan asal katanya. Contoh: 'Bentuk: Isim Fail dari fi'il 'علِم - يعلم', mengikuti wazan 'فاعل'."
                            },
                            root_word: {
                                type: Type.STRING,
                                description: "Huruf-huruf akar kata. Contoh: 'ع-ل-م'."
                            },
                            balaghah: {
                                type: Type.STRING,
                                description: "Analisis Balaghah (retorika/sastra). Jika ada, jelaskan gaya bahasa seperti majaz, kinayah, atau isti'arah. Jika tidak ada, kosongkan string ini."
                            }
                        },
                        required: ["i_rab", "sharaf", "root_word"]
                    }
                },
                required: ["word", "analysis_details"]
            }
        }
    },
    required: ["vocalizedText", "translation", "irab"]
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
            contents: text,
            config: {
                systemInstruction: `Anda adalah seorang ahli nahwu, sharaf, dan balaghah (tata bahasa dan retorika Arab klasik) yang sangat berpengalaman, setara dengan ulama di pesantren. Tugas Anda adalah menganalisis teks Arab yang diberikan secara SANGAT MENDALAM.

Untuk setiap kata dalam teks, berikan analisis terstruktur dalam objek 'analysis_details' dengan properti berikut:
1.  **i_rab:** Berikan analisis I'rab yang sangat detail. Tulis dalam format tradisional pesantren: gunakan istilah nahwu dalam bahasa Arab (contoh: 'مبتدأ مرفوع وعلامة رفعه الضمة الظاهرة'), lalu tambahkan penjelasannya dalam bahasa Indonesia.
2.  **sharaf:** Jelaskan analisis sharaf/tasrif kata tersebut. Sebutkan bentuknya (wazan/sighah), dan asal katanya. Contoh: "Bentuk: Isim Fail dari fi'il 'علِم - يعلم', mengikuti wazan 'فاعل'".
3.  **root_word:** Sebutkan dengan jelas huruf-huruf akar katanya. Contoh: "ع-ل-م".
4.  **balaghah:** Jika ada, berikan analisis balaghah (retorika). Identifikasi dan jelaskan gaya bahasa seperti majaz (metafora), isti'arah (kiasan), atau kinayah (metonimi) yang terkandung dalam kata atau frasa tersebut. Jelaskan dalam bahasa Indonesia. Jika tidak ada unsur balaghah yang signifikan, kembalikan string kosong untuk properti ini.

Selain itu, berikan juga:
-   **Tashkeel:** Teks asli yang sudah diberi harakat lengkap (vocalized) untuk properti 'vocalizedText'.
-   **Terjemahan:** Terjemahan yang akurat ke dalam Bahasa Indonesia untuk properti 'translation'.

Pastikan output Anda selalu sesuai dengan skema JSON yang diminta. Format penjelasan untuk setiap kata harus kaya informasi dan mudah dipahami.`,
                responseMimeType: "application/json",
                responseSchema: analysisSchema,
            },
        });

        const jsonString = response.text.trim();
        const apiResult = JSON.parse(jsonString);
        
        const fullResult = {
            originalText: text,
            vocalizedText: apiResult.vocalizedText,
            translation: apiResult.translation,
            irab: apiResult.irab,
        };
        
        return res.status(200).json(fullResult);

    } catch (error) {
        console.error("Error calling Gemini API:", error);
        return res.status(500).json({ 
            error: 'Gagal menganalisis teks. Silakan coba lagi.',
            details: error instanceof Error ? error.message : 'Unknown error'
        });
    }
}
