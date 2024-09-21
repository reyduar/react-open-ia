export interface Translate {
  translation: string;
}

export interface TranslateResponse {
  message: string;
  ok: boolean;
  content?: Translate;
}
