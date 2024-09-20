import { useState } from "react";
import {
  GptMessage,
  GptMessageProsConsDiscusser,
  MyMessage,
  TextMessageBox,
  TypingLoader,
} from "../../components";
import { prosConsDiscusserUseCase } from "../../../use-cases";

interface Message {
  text: string;
  isGpt: boolean;
  content?: string;
}

export function ProsConsPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);

  const handlePost = async (text: string) => {
    setIsLoading(true);
    setMessages((prev) => [...prev, { text, isGpt: false }]);
    const { ok, message, content } = await prosConsDiscusserUseCase(text);
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
          <GptMessage
            text={`Puedes preguntar sobre dos temas que quieras que compare y te exponga los pros y contras. Ejemplo: ¿Qué me puede servir más AWS o Google Cloud?`}
          />

          {/* Preguntas */}
          {messages.map((message, index) =>
            message.isGpt ? (
              <GptMessageProsConsDiscusser
                key={index}
                text={message.text}
                content={message.content}
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

      {/* Caja de mensajes */}
      <TextMessageBox
        placeholder="Escribe tu mensaje..."
        onSendMessage={handlePost}
        disableCorrections
      />

      {/* <TextMessageBoxFile
        placeholder="Escribe tu mensaje..."
        onSendMessage={handlePost}
      /> */}

      {/* <TextMessageBoxSelect
        onSendMessage={(option) => console.log(option)}
        options={[
          { id: "1", text: "Español" },
          { id: "2", text: "Inglés" },
          { id: "3", text: "Francés" },
        ]}
      /> */}
    </div>
  );
}
