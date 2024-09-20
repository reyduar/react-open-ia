import { useState } from "react";
import {
  GptMessage,
  GptMessageProsConsDiscusser,
  MyMessage,
  TextMessageBox,
  TypingLoader,
} from "../../components";
import { prosConsDiscusserStreamUseCase } from "../../../use-cases";

interface Message {
  text: string;
  isGpt: boolean;
  content?: string;
}

export function ProsConsStreamPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);

  const handlePost = async (text: string) => {
    setIsLoading(true);
    setMessages((prev) => [...prev, { text, isGpt: false }]);
    const {
      ok,
      message,
      content: reader,
    } = await prosConsDiscusserStreamUseCase(text);
    setIsLoading(false);

    if (!ok) {
      setMessages((prev) => [...prev, { text: message, isGpt: true }]);
      return;
    } else {
      decodedStreamMessages(reader!, message);
    }
  };

  const decodedStreamMessages = async (
    reader: ReadableStreamDefaultReader<Uint8Array>,
    message: string
  ) => {
    if (!reader)
      return setMessages((prev) => [
        ...prev,
        { text: "No se pudo generar el reader", isGpt: true },
      ]);
    const decoder = new TextDecoder();
    let streamText = "";
    setMessages((prev) => [
      ...prev,
      { text: message, isGpt: true, content: streamText },
    ]);

    while (true) {
      const { done, value } = await reader.read();
      if (done) {
        break;
      }
      const decodedChunk = decoder.decode(value, { stream: true });
      streamText += decodedChunk;
      setMessages((messages) => {
        const newMessages = [...messages];
        newMessages[newMessages.length - 1].content = streamText;
        return newMessages;
      });
    }
  };

  return (
    <div className="chat-container">
      <div className="chat-messages">
        <div className="grid grid-cols-12 gap-y-2">
          {/* Bienvenidas */}
          <GptMessage text={`Dime, ¿Qué deseas comparar?`} />

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
    </div>
  );
}
