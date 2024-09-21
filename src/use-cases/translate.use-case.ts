import { API_URL } from "../config/config";
import { Translate, TranslateResponse } from "../interfaces";

export const translateUseCase = async (
  lang: string,
  prompt: string
): Promise<TranslateResponse> => {
  try {
    const response = await fetch(`${API_URL}/translate`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ lang, prompt }),
    });

    if (!response.ok) {
      throw new Error("Ocurrio un error al hacer la traducción");
    }
    const content = (await response.json()) as Translate;
    return {
      content,
      message: "*Resultado*",
      ok: true,
    };
  } catch (error) {
    console.error(error);
    return {
      message: JSON.stringify(error),
      ok: false,
    };
  }
};
