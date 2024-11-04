export interface Image {
  url: string;
  alt: string;
}

export type GeneratedImage = Image | null;

export interface ImageGenerationResponse {
  url: string;
  openIAUrl: string;
  revised_propmt: string;
}

export interface ImageGenRequest {
  prompt: string;
  originalImage?: string;
  maskImage?: string;
}
