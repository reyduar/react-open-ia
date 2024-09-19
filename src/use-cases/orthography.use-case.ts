import { API_URL } from "../config/config";
import { Content, OrthographyResponse } from "../interfaces";

export const orthographyUseCase = async (
  text: string
): Promise<OrthographyResponse> => {
  try {
    const response = await fetch(`${API_URL}/orthography-check`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ prompt: text }),
    });

    if (!response.ok) {
      throw new Error("Ocurrio un error al corregir la ortografía");
    }
    const content = (await response.json()) as Content;
    return {
      content,
      message: "*Resultado*",
      ok: true,
    };
  } catch (error) {
    console.error(error);
    return {
      message: "Ocurrio un error al corregir la ortografía",
      ok: false,
    };
  }
};
