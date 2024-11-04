import { useEffect, useState } from "react";
import {
  GptMessage,
  MyMessage,
  TextMessageBox,
  TypingLoader,
} from "../../components";
import { createThreadUseCase, postQuestionUseCase } from "../../../use-cases";
import { Question } from "../../../interfaces";

interface Message {
  text: string;
  isGpt: boolean;
}

export const AssistantPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);

  const [threadId, setThreadId] = useState<string>();

  useEffect(() => {
    const threadId = localStorage.getItem("threadId");
    if (threadId) {
      setThreadId(threadId);
    } else {
      createThreadUseCase().then((id) => {
        setThreadId(id);
        localStorage.setItem("threadId", id);
      });
    }
  }, []);

  // useEffect(() => {
  //   if (threadId) {
  //     setMessages((prev) => [
  //       ...prev,
  //       { text: `Thread Number ${threadId}`, isGpt: true },
  //     ]);
  //   }
  // }, [threadId]);

  const handlePost = async (text: string) => {
    if (!threadId) return;

    setIsLoading(true);
    setMessages((prev) => [...prev, { text: text, isGpt: false }]);

    //TODO: UseCase
    const req: Question = {
      threadId: threadId!,
      question: text,
    };
    const replies = await postQuestionUseCase(req);

    setIsLoading(false);

    // Todo: Añadir el mensaje de isGPT en true
    setMessages((prev) => [
      ...prev,
      { text: replies[0].content[0], isGpt: true },
    ]);

    // for (const reply of replies) {
    //   for (const content of reply.content) {
    //     if (reply.role === "assistant") {
    //       setMessages((prev) => [
    //         ...prev,
    //         { text: content, isGpt: true, info: reply },
    //       ]);
    //     }
    //   }
    // }
  };

  return (
    <div className="chat-container">
      <div className="chat-messages">
        <div className="grid grid-cols-12 gap-y-2">
          {/* Bienvenida */}
          <GptMessage text="Buen día soy Dante. En que puedo ayudar?" />

          {messages.map((message, index) =>
            message.isGpt ? (
              <GptMessage key={index} text={message.text} />
            ) : (
              <MyMessage key={index} text={message.text} />
            )
          )}

          {isLoading && (
            <div className="col-start-1 col-end-12 fade-in">
              <TypingLoader />
            </div>
          )}
        </div>
      </div>

      <TextMessageBox
        onSendMessage={handlePost}
        placeholder="Escribe aquí lo que deseas"
        disableCorrections
      />
    </div>
  );
};
