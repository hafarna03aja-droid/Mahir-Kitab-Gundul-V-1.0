import { GoogleGenAI, Type } from "@google/genai";
import type { AnalysisResult } from '../types';

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
    throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

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

export const analyzeArabicText = async (text: string): Promise<AnalysisResult> => {
    try {
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
        
        // Gabungkan hasil API dengan teks input asli
        const fullResult: AnalysisResult = {
            originalText: text,
            vocalizedText: apiResult.vocalizedText,
            translation: apiResult.translation,
            irab: apiResult.irab,
        };
        
        return fullResult;

    } catch (error) {
        console.error("Error calling Gemini API:", error);
        throw new Error("Gagal menganalisis teks. Silakan coba lagi.");
    }
};

export const convertToArabGundul = async (text: string): Promise<string> => {
    try {
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
            return result.arab_gundul;
        } else {
            throw new Error("Respons API tidak valid.");
        }

    } catch (error) {
        console.error("Error calling Gemini API for conversion:", error);
        throw new Error("Gagal mengonversi teks. Pastikan kalimat Anda jelas.");
    }
};

export const askAiAssistant = async (question: string): Promise<string> => {
    try {
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
        return response.text;
    } catch (error) {
        console.error("Error calling Gemini API for assistance:", error);
        throw new Error("Gagal mendapatkan jawaban dari asisten. Silakan coba lagi.");
    }
};
