export interface Content {
  content: string;
}

export interface OrthographyResponse {
  content?: Content;
  message: string;
  ok: boolean;
}
