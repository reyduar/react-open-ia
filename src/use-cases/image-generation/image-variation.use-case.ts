import { API_URL } from "../../config/config";
import { GeneratedImage, ImageGenerationResponse } from "../../interfaces";

export const imageVariationUseCase = async (
  originalImage: string
): Promise<GeneratedImage> => {
  try {
    const response = await fetch(`${API_URL}/image-variation`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ baseImage: originalImage }),
    });

    if (!response.ok) {
      throw new Error("An error occurred while generating the image.");
    }
    const { url, revised_propmt: alt } =
      (await response.json()) as ImageGenerationResponse;
    return { url, alt };
  } catch (error) {
    console.error(error);
    return null;
  }
};
