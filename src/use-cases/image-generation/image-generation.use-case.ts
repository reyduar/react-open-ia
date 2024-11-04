import { API_URL } from "../../config/config";
import {
  GeneratedImage,
  ImageGenerationResponse,
  ImageGenRequest,
} from "../../interfaces";

export const imageGenerationUseCase = async (
  imageGenRequest: ImageGenRequest
): Promise<GeneratedImage> => {
  try {
    const response = await fetch(`${API_URL}/image-generation`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(imageGenRequest),
    });

    if (!response.ok) {
      throw new Error("Ocurrio un error al generar la imagen");
    }
    const { url, revised_propmt: alt } =
      (await response.json()) as ImageGenerationResponse;
    return { url, alt };
  } catch (error) {
    console.error(error);
    return null;
  }
};
