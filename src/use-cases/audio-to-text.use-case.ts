import { API_URL } from "../config/config";
import { SubtitleResponse, Subtitle } from "../interfaces";

export const audioToTextUseCase = async (
  file: File,
  prompt: string
): Promise<SubtitleResponse> => {
  try {
    const response = await fetch(`${API_URL}/audio-to-text`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ file, prompt }),
    });

    if (!response.ok) {
      throw new Error("Ocurrio un error al convertir el audio a texto");
    }
    const content = (await response.json()) as Subtitle;

    return {
      ok: true,
      message: "*Resultado*",
      content,
    };
  } catch (error) {
    console.error(error);
    return {
      ok: false,
      message: JSON.stringify(error),
    };
  }
};
