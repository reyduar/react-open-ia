import { useState } from "react";
import {
  GptMessage,
  GptMessageProsConsDiscusser,
  MyMessage,
  TextMessageBox,
  TypingLoader,
} from "../../components";
import {
  prosConsDiscusserStreamUseCase,
  prosConsDiscusserStreamGeneratorUseCase,
} from "../../../use-cases";

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
    // decodedStreamMessages(text);
    generatorDecodedStreamMessages(text);
  };

  /*Implementamos la funcion generador para extraer las lineas de text del reader */
  const generatorDecodedStreamMessages = async (text: string) => {
    const stream = await prosConsDiscusserStreamGeneratorUseCase(text);
    setIsLoading(false);
    setMessages((prev) => [...prev, { text: "", isGpt: true }]);
    for await (const streamText of stream) {
      setMessages((messages) => {
        const newMessages = [...messages];
        newMessages[newMessages.length - 1].content = streamText;
        return newMessages;
      });
    }
  };

  /*Implementamos la forma tradicional de extrar text de un reader */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const decodedStreamMessages = async (text: string) => {
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
