import { API_URL } from "../config/config";
import { AudioResponse } from "../interfaces";

export const textToAudioUseCase = async (
  voice: string,
  prompt: string
): Promise<AudioResponse> => {
  try {
    const response = await fetch(`${API_URL}/text-to-audio`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ voice, prompt }),
    });

    if (!response.ok) {
      throw new Error("Ocurrio un error al crear el audio");
    }
    const audioFile = await response.blob();
    const audioUrl = URL.createObjectURL(audioFile);

    return {
      ok: true,
      message: "*Resultado*",
      content: audioUrl,
    };
  } catch (error) {
    console.error(error);
    return {
      ok: false,
      message: JSON.stringify(error),
    };
  }
};
