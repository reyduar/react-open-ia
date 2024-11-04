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
      throw new Error("Error to post user question");
    }
    const replies = (await response.json()) as QuestionResponse[];
    return replies;
  } catch (error) {
    throw new Error("Error to post user question");
  }
};
