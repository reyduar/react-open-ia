import { useState } from "react";
import {
  GptMessage,
  MyMessage,
  TypingLoader,
  TextMessageBox,
  GptMessageImage,
} from "../../components";
import { imageGenerationUseCase } from "../../../use-cases";
import { ImageGenRequest } from "../../../interfaces";

interface Message {
  text: string;
  isGpt: boolean;
  info?: {
    imageUrl: string;
    alt: string;
  };
}

export const ImageGenerationPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);

  const handlePost = async (text: string) => {
    setIsLoading(true);
    setMessages((prev) => [...prev, { text: text, isGpt: false }]);

    //TODO: UseCase
    const genRequest: ImageGenRequest = {
      prompt: text,
    };
    const response = await imageGenerationUseCase(genRequest);
    setIsLoading(false);

    // Todo: Añadir el mensaje de isGPT en true

    if (response) {
      setMessages((prev) => [
        ...prev,
        {
          text: "Imagen generada",
          isGpt: true,
          info: {
            imageUrl: response.url,
            alt: response.alt,
          },
        },
      ]);
    } else {
      setMessages((prev) => [
        ...prev,
        {
          text: "Ocurrió un error al generar la imagen",
          isGpt: false,
        },
      ]);
    }
  };

  return (
    <div className="chat-container">
      <div className="chat-messages">
        <div className="grid grid-cols-12 gap-y-2">
          {/* Bienvenida */}
          <GptMessage text="Describime la imagen que deseas crear." />

          {messages.map((message, index) =>
            message.isGpt ? (
              <GptMessageImage
                key={index}
                text={message.text}
                imageUrl={message.info?.imageUrl!}
                alt={message.info?.alt!}
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

      <TextMessageBox
        onSendMessage={handlePost}
        placeholder="Escribe aquí lo que deseas"
        disableCorrections
      />
    </div>
  );
};
