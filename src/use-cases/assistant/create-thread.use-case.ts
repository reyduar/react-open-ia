import { ASSISTANT_API_URL } from "../../config/config";

export const createThreadUseCase = async () => {
  try {
    const response = await fetch(`${ASSISTANT_API_URL}/create-thread`, {
      method: "POST",
    });

    if (!response.ok) {
      throw new Error("Ocurrio un error al crear el hilo");
    }
    const { id } = (await response.json()) as { id: string };
    return id;
  } catch (error) {
    throw new Error("Ocurrio un error al crear el hilo");
  }
};
