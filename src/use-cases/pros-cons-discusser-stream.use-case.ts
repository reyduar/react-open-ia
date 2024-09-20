import { API_URL } from "../config/config";

export const prosConsDiscusserStreamUseCase = async (text: string) => {
  try {
    const response = await fetch(`${API_URL}/pros-cons-discusser-stream`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ prompt: text }),
    });

    if (!response.ok) {
      throw new Error("Ocurrio un error al encontrar los pros y contras");
    }
    const reader = response.body?.getReader();
    if (!reader) {
      throw new Error("No se pudo leer la respuesta");
    }
    // const decoder = new TextDecoder();
    // let content = "";

    // while (true) {
    //   const { done, value } = await reader.read();
    //   if (done) {
    //     break;
    //   }
    //   const decodedChunk = decoder.decode(value, { stream: true });
    //   content += decodedChunk;
    //   console.log(content);
    // }
    return {
      message: "*Respuesta*",
      ok: true,
      content: reader,
    };
  } catch (error) {
    console.error(error);
    return {
      message: "Ocurrio un error al encontrar los pros y contras",
      ok: false,
    };
  }
};
