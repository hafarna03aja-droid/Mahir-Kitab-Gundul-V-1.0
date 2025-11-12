export type TabId = 'analisis' | 'asisten' | 'tutor' | 'kitab';

export interface AnalysisDetails {
    i_rab: string;
    sharaf: string;
    root_word: string;
    balaghah?: string;
}

export interface IrabEntry {
    word: string;
    analysis_details: AnalysisDetails;
}

export interface AnalysisResult {
    originalText: string;
    vocalizedText: string;
    translation: string;
    irab: IrabEntry[];
}

export interface Example {
    label: string;
    text: string;
}

export interface ExampleCategory {
    [category: string]: Example[];
}