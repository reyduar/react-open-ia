import { useState } from "react";
import {
  GptMessage,
  GptMessageTranslate,
  MyMessage,
  TypingLoader,
  TextMessageBoxSelect,
} from "../../components";
import { translateUseCase } from "../../../use-cases";
import { Translate } from "../../../interfaces";
import { languages } from "../../../config/constants";

interface Message {
  text: string;
  isGpt: boolean;
  content?: Translate;
}

export function TranslatePage() {
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);

  const handlePost = async (text: string, selectedOption: string) => {
    setIsLoading(true);
    setMessages((prev) => [...prev, { text, isGpt: false }]);
    const { ok, message, content } = await translateUseCase(
      selectedOption,
      text
    );
    if (ok) {
      setMessages((prev) => [...prev, { text: message, isGpt: true, content }]);
    } else {
      setMessages((prev) => [...prev, { text: message, isGpt: true }]);
    }

    setIsLoading(false);
  };

  return (
    <div className="chat-container">
      <div className="chat-messages">
        <div className="grid grid-cols-12 gap-y-2">
          {/* Bienvenidas */}
          <GptMessage text="Ingrese el lenguaje y el texto quiere traducir. Ej. Spanish, Item postado." />

          {/* Preguntas */}
          {messages.map((message, index) =>
            message.isGpt ? (
              <GptMessageTranslate
                key={index}
                text={""}
                content={message.content?.translation}
              />
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

      <TextMessageBoxSelect onSendMessage={handlePost} options={languages} />
    </div>
  );
}
