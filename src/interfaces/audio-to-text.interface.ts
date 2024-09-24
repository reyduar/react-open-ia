export interface SubtitleResponse {
  message: string;
  ok: boolean;
  content?: Subtitle;
}

export interface Subtitle {
  language: string;
  text: string;
}
