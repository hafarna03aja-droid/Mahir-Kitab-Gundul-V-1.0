

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { GoogleGenAI, Modality, Blob, LiveServerMessage } from '@google/genai';
import { MicrophoneIcon, StopCircleIcon } from './icons/TabIcons';

// Helper functions for audio encoding/decoding
function encode(bytes: Uint8Array) {
  let binary = '';
  const len = bytes.byteLength;
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
}

function decode(base64: string) {
  const binaryString = atob(base64);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes;
}

async function decodeAudioData(
  data: Uint8Array,
  ctx: AudioContext,
  sampleRate: number,
  numChannels: number,
): Promise<AudioBuffer> {
  const dataInt16 = new Int16Array(data.buffer);
  const frameCount = dataInt16.length / numChannels;
  const buffer = ctx.createBuffer(numChannels, frameCount, sampleRate);

  for (let channel = 0; channel < numChannels; channel++) {
    const channelData = buffer.getChannelData(channel);
    for (let i = 0; i < frameCount; i++) {
      channelData[i] = dataInt16[i * numChannels + channel] / 32768.0;
    }
  }
  return buffer;
}

function createBlob(data: Float32Array): Blob {
  const l = data.length;
  const int16 = new Int16Array(l);
  for (let i = 0; i < l; i++) {
    int16[i] = data[i] * 32768;
  }
  return {
    data: encode(new Uint8Array(int16.buffer)),
    mimeType: 'audio/pcm;rate=16000',
  };
}

interface Transcript {
    speaker: 'user' | 'tutor';
    text: string;
}

const LiveTutorTab: React.FC = () => {
    const [isSessionActive, setIsSessionActive] = useState(false);
    const [statusMessage, setStatusMessage] = useState('Klik "Mulai Sesi" untuk berlatih.');
    const [transcripts, setTranscripts] = useState<Transcript[]>([]);
    
    const sessionRef = useRef<Promise<any> | null>(null);
    const inputAudioContextRef = useRef<AudioContext | null>(null);
    const outputAudioContextRef = useRef<AudioContext | null>(null);
    const streamRef = useRef<MediaStream | null>(null);
    const scriptProcessorRef = useRef<ScriptProcessorNode | null>(null);
    const outputSourcesRef = useRef<Set<AudioBufferSourceNode>>(new Set());
    const nextStartTimeRef = useRef<number>(0);

    const currentInputTranscriptionRef = useRef('');
    const currentOutputTranscriptionRef = useRef('');
    const transcriptEndRef = useRef<HTMLDivElement>(null);

    const stopSession = useCallback(async () => {
        setStatusMessage('Menghentikan sesi...');
        if (sessionRef.current) {
            try {
                const session = await sessionRef.current;
                session.close();
            } catch (e) {
                console.error("Error closing session:", e);
            }
        }
        
        streamRef.current?.getTracks().forEach(track => track.stop());
        scriptProcessorRef.current?.disconnect();
        inputAudioContextRef.current?.close();
        outputAudioContextRef.current?.close();
        outputSourcesRef.current.forEach(source => source.stop());

        sessionRef.current = null;
        streamRef.current = null;
        scriptProcessorRef.current = null;
        inputAudioContextRef.current = null;
        outputAudioContextRef.current = null;
        outputSourcesRef.current.clear();
        nextStartTimeRef.current = 0;

        setIsSessionActive(false);
        setStatusMessage('Sesi berakhir. Klik "Mulai Sesi" untuk berlatih lagi.');
    }, []);

    const startSession = async () => {
        setStatusMessage('Meminta izin mikrofon...');
        setTranscripts([]);
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            streamRef.current = stream;
            setStatusMessage('Menghubungkan ke Ustadz Cerdas...');

            const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });

            inputAudioContextRef.current = new ((window as any).AudioContext || (window as any).webkitAudioContext)({ sampleRate: 16000 });
            outputAudioContextRef.current = new ((window as any).AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });

            sessionRef.current = ai.live.connect({
                model: 'gemini-2.5-flash-native-audio-preview-09-2025',
                config: {
                    responseModalities: [Modality.AUDIO],
                    inputAudioTranscription: {},
                    outputAudioTranscription: {},
                    systemInstruction: `Anda adalah 'Ustadz Cerdas', seorang guru Bahasa Arab yang sangat sabar dan ramah. Tujuan Anda adalah membantu pengguna berlatih percakapan Bahasa Arab dasar. Mulailah sesi dengan sapaan dalam Bahasa Arab yang sederhana seperti "Assalamualaikum, ahlan wa sahlan! Kaifa haluk?" dan tunggu respons pengguna. Bicaralah dalam Bahasa Arab secara perlahan dan jelas. Jika pengguna membuat kesalahan tata bahasa atau pengucapan, berikan koreksi yang lembut dan penjelasan singkat dalam Bahasa Indonesia. Jaga agar percakapan tetap ringan dan fokus pada topik sehari-hari.`,
                },
                callbacks: {
                    onopen: () => {
                        setStatusMessage('Terhubung! Anda bisa mulai berbicara.');
                        const source = inputAudioContextRef.current!.createMediaStreamSource(streamRef.current!);
                        const scriptProcessor = inputAudioContextRef.current!.createScriptProcessor(4096, 1, 1);
                        scriptProcessorRef.current = scriptProcessor;

                        scriptProcessor.onaudioprocess = (audioProcessingEvent) => {
                            const inputData = audioProcessingEvent.inputBuffer.getChannelData(0);
                            const pcmBlob = createBlob(inputData);
                            sessionRef.current?.then((session) => {
                                session.sendRealtimeInput({ media: pcmBlob });
                            });
                        };
                        source.connect(scriptProcessor);
                        scriptProcessor.connect(inputAudioContextRef.current!.destination);
                    },
                    onmessage: async (message: LiveServerMessage) => {
                        // Handle transcriptions
                        if (message.serverContent?.inputTranscription) {
                            currentInputTranscriptionRef.current += message.serverContent.inputTranscription.text;
                        }
                        if (message.serverContent?.outputTranscription) {
                            currentOutputTranscriptionRef.current += message.serverContent.outputTranscription.text;
                        }
                        if (message.serverContent?.turnComplete) {
                            const userInput = currentInputTranscriptionRef.current.trim();
                            const tutorOutput = currentOutputTranscriptionRef.current.trim();
                            
                            setTranscripts(prev => {
                                const newLog = [...prev];
                                if (userInput) newLog.push({ speaker: 'user', text: userInput });
                                if (tutorOutput) newLog.push({ speaker: 'tutor', text: tutorOutput });
                                return newLog;
                            });
                            
                            currentInputTranscriptionRef.current = '';
                            currentOutputTranscriptionRef.current = '';
                        }
                        
                        // Handle audio output
                        const audioData = message.serverContent?.modelTurn?.parts[0]?.inlineData?.data;
                        if (audioData) {
                            setStatusMessage('Ustadz Cerdas sedang menjawab...');
                            const ctx = outputAudioContextRef.current!;
                            nextStartTimeRef.current = Math.max(nextStartTimeRef.current, ctx.currentTime);
                            const audioBuffer = await decodeAudioData(decode(audioData), ctx, 24000, 1);
                            
                            const source = ctx.createBufferSource();
                            source.buffer = audioBuffer;
                            source.connect(ctx.destination);
                            
                            source.addEventListener('ended', () => {
                                outputSourcesRef.current.delete(source);
                                if (outputSourcesRef.current.size === 0) {
                                    setStatusMessage('Giliran Anda untuk berbicara.');
                                }
                            });
                            
                            source.start(nextStartTimeRef.current);
                            nextStartTimeRef.current += audioBuffer.duration;
                            outputSourcesRef.current.add(source);
                        }
                        
                        // Handle interruptions
                        if (message.serverContent?.interrupted) {
                            outputSourcesRef.current.forEach(source => source.stop());
                            outputSourcesRef.current.clear();
                            nextStartTimeRef.current = 0;
                        }
                    },
                    onerror: (e: ErrorEvent) => {
                        console.error('Session error:', e);
                        setStatusMessage(`Error: ${e.message}. Silakan coba lagi.`);
                        stopSession();
                    },
                    onclose: () => {
                        console.log('Session closed.');
                        if (isSessionActive) {
                            stopSession();
                        }
                    },
                },
            });
            setIsSessionActive(true);

        } catch (error) {
            console.error('Failed to start session:', error);
            setStatusMessage('Gagal memulai sesi. Pastikan Anda mengizinkan akses mikrofon.');
            setIsSessionActive(false);
        }
    };
    
    useEffect(() => {
        return () => {
            if (isSessionActive) {
                stopSession();
            }
        };
    }, [isSessionActive, stopSession]);
    
    useEffect(() => {
        transcriptEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [transcripts]);

    const handleToggleSession = () => {
        if (isSessionActive) {
            stopSession();
        } else {
            startSession();
        }
    };

    return (
        <div className="bg-slate-800 rounded-lg shadow-lg flex flex-col h-[75vh]">
            {/* Header and Status */}
            <div className="p-4 border-b border-slate-700 text-center">
                <h2 className="text-xl font-bold text-amber-400">Tutor Langsung: Ustadz Cerdas</h2>
                <p className="text-slate-400 text-sm mt-1">Berlatih percakapan Bahasa Arab secara langsung dengan AI.</p>
                <div className="mt-3 flex items-center justify-center gap-2 text-slate-300">
                   <div className={`w-3 h-3 rounded-full transition-colors ${isSessionActive ? 'bg-green-500 animate-pulse' : 'bg-slate-500'}`}></div>
                   <span className="font-medium text-sm">{statusMessage}</span>
                </div>
            </div>

            {/* Transcript Area */}
            <div className="flex-1 p-6 overflow-y-auto space-y-4">
                {transcripts.length === 0 && !isSessionActive && (
                    <div className="text-center text-slate-500 pt-16">
                        <MicrophoneIcon className="w-16 h-16 mx-auto text-slate-600" />
                        <p className="mt-4">Transkrip percakapan akan muncul di sini.</p>
                    </div>
                )}
                {transcripts.map((t, index) => (
                    <div key={index} className={`flex items-start gap-3 ${t.speaker === 'user' ? 'justify-end' : 'justify-start'}`}>
                       {t.speaker === 'tutor' && (
                           <div className="w-8 h-8 rounded-full bg-amber-500/20 flex items-center justify-center flex-shrink-0">
                                <p className="font-bold text-amber-400 text-sm">UC</p>
                           </div>
                       )}
                       <div className={`max-w-lg rounded-lg px-4 py-2 ${t.speaker === 'user' ? 'bg-sky-600 text-white text-right' : 'bg-slate-700 text-slate-300'}`}>
                           <p className="font-arabic text-lg" dir={t.speaker === 'user' ? 'rtl' : 'ltr'}>{t.text}</p>
                       </div>
                        {t.speaker === 'user' && (
                           <div className="w-8 h-8 rounded-full bg-sky-600/20 flex items-center justify-center flex-shrink-0">
                                <p className="font-bold text-sky-400 text-sm">Anda</p>
                           </div>
                       )}
                    </div>
                ))}
                <div ref={transcriptEndRef} />
            </div>

            {/* Controls */}
            <div className="p-4 bg-slate-900/50 border-t border-slate-700 flex justify-center">
                <button
                    onClick={handleToggleSession}
                    className={`px-8 py-4 rounded-full font-bold text-lg flex items-center gap-3 transition-all duration-300 transform hover:scale-105 shadow-lg
                        ${isSessionActive 
                            ? 'bg-red-600 text-white hover:bg-red-700' 
                            : 'bg-amber-500 text-white hover:bg-amber-600'
                        }`}
                >
                    {isSessionActive ? (
                        <>
                            <StopCircleIcon className="w-7 h-7" />
                            <span>Hentikan Sesi</span>
                        </>
                    ) : (
                        <>
                            <MicrophoneIcon className="w-7 h-7" />
                            <span>Mulai Sesi</span>
                        </>
                    )}
                </button>
            </div>
        </div>
    );
};

export default LiveTutorTab;