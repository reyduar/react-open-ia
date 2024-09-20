import { API_URL } from "../config/config";
import { ProsConsDiscusserResponse } from "../interfaces";

export const prosConsDiscusserUseCase = async (text: string) => {
  try {
    const response = await fetch(`${API_URL}/pros-cons-discusser`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ prompt: text }),
    });

    if (!response.ok) {
      throw new Error("Ocurrio un error al encontrar los pros y contras");
    }
    const { content } = (await response.json()) as ProsConsDiscusserResponse;
    return {
      message: "*Resultado*",
      ok: true,
      content,
    };
  } catch (error) {
    console.error(error);
    return {
      message: "Ocurrio un error al encontrar los pros y contras",
      ok: false,
    };
  }
};
