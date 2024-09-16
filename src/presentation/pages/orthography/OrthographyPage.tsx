import { useState } from "react";
import {
  GptMessage,
  MyMessage,
  TextMessageBox,
  TypingLoader,
} from "../../components";

interface Message {
  text: string;
  isGpt: boolean;
}

export function OrthographyPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);

  const handlePost = async (text: string) => {
    setIsLoading(true);

    const response = await fetch("http://localhost:5000/orthography", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text: text }),
    });

    const data = await response.json();

    setMessages((prev) => [...prev, { text: data.text, isGpt: true }]);

    setIsLoading(false);
  };

  return (
    <div className="chat-container">
      <div className="chat-messages">
        <div className="grid grid-cols-12 gap-y-2">
          {/* Bienvenidas */}
          <GptMessage text="¡Hola! Soy un modelo de lenguaje de OpenAI. ¿En qué puedo ayudarte hoy?" />

          {/* Preguntas */}
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
