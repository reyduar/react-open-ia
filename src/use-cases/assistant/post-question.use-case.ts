import { ASSISTANT_API_URL } from "../../config/config";
import { Question, QuestionResponse } from "../../interfaces";

export const postQuestionUseCase = async (question: Question) => {
  try {
    const response = await fetch(`${ASSISTANT_API_URL}/user-question`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(question),
    });

    if (!response.ok) {
      throw new Error("Error al postear la pregunta");
    }
    const replies = (await response.json()) as QuestionResponse[];
    console.log("====================================");
    console.log(replies);
    console.log("====================================");
    return replies;
  } catch (error) {
    throw new Error("Ocurrio un error al postear la pregunta");
  }
};
