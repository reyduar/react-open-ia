import { API_URL } from "../config/config";
import type { SubtitleResponse, Subtitle } from "../interfaces";

type Error = {
  message: string;
};

export const audioToTextUseCase = async (
  file: File,
  prompt: string
): Promise<SubtitleResponse> => {
  try {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("prompt", prompt);
    const response = await fetch(`${API_URL}/audio-to-text`, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json(); // Extraer el error del cuerpo de la respuesta
      throw new Error(
        `Error ${response.status}: ${
          errorData.message || "Something went wrong"
        }`
      );
    }
    const content = (await response.json()) as Subtitle;
    return {
      ok: true,
      message: "",
      content,
    };
  } catch (error) {
    const msg = error as Error;
    console.error(msg);
    return {
      ok: false,
      message: msg.message,
    };
  }
};
