export interface QuestionResponse {
  role: string;
  content: string[];
}

export interface Question {
  threadId: string;
  question: string;
}
