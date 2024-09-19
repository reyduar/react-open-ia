interface Translation {
  language: string;
  translation: string;
}

interface suggestion {
  language: string;
  suggestion: string;
}

export interface Content {
  correctedText: string;
  errorsCorrected: string[];
  translations: Translation[];
  suggestions: suggestion[];
}

export interface OrthographyResponse {
  content?: Content;
  message: string;
  ok: boolean;
}
