import { useState } from "react";
import {
  GptMessage,
  MyMessage,
  TypingLoader,
  TextMessageBox,
  GptMessageImage,
  GptMessageSelectableImage,
} from "../../components";
import {
  imageGenerationUseCase,
  imageVariationUseCase,
} from "../../../use-cases";
import { ImageGenRequest } from "../../../interfaces";

interface Message {
  text: string;
  isGpt: boolean;
  info?: {
    imageUrl: string;
    alt: string;
  };
}

export const ImageTunningPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      text: "Image base.",
      isGpt: true,
      info: {
        imageUrl: "http://localhost:3000/gpt/image-generated/1730827241292.png",
        alt: "Image base.",
      },
    },
  ]);

  const [originalImageAndMask, setOriginalImageAndMask] = useState({
    original: undefined as string | undefined,
    mask: undefined as string | undefined,
  });

  const handleVariation = async () => {
    setIsLoading(true);
    const rep = await imageVariationUseCase(originalImageAndMask.original!);
    setIsLoading(false);

    if (!rep) return;

    setMessages((prev) => [
      ...prev,
      {
        text: "Variación generada",
        isGpt: true,
        info: {
          imageUrl: rep.url,
          alt: rep.alt,
        },
      },
    ]);
  };

  const handlePost = async (text: string) => {
    setIsLoading(true);
    setMessages((prev) => [...prev, { text: text, isGpt: false }]);

    const { original, mask } = originalImageAndMask;

    //TODO: UseCase
    const genRequest: ImageGenRequest = {
      prompt: text,
      originalImage: original,
      maskImage: mask,
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
    <>
      {originalImageAndMask.original && (
        <div className="fixed flex flex-col items-center top-10 right-10 z-10 fade-in">
          <span>Original</span>
          <img
            src={originalImageAndMask.mask ?? originalImageAndMask.original}
            alt="Original"
            className="border rounded-xl w-36 h-36 object-contain"
          />
          <button onClick={handleVariation} className="btn-primary mt-2">
            Generar variación
          </button>
        </div>
      )}
      <div className="chat-container">
        <div className="chat-messages">
          <div className="grid grid-cols-12 gap-y-2">
            {/* Bienvenida */}
            <GptMessage text="Describime la imagen que deseas crear." />

            {messages.map((message, index) =>
              message.isGpt ? (
                // <GptMessageImage
                <GptMessageSelectableImage
                  key={index}
                  text={message.text}
                  imageUrl={message.info?.imageUrl!}
                  alt={message.info?.alt!}
                  onImageSelected={(imageUrl) => {
                    setOriginalImageAndMask({
                      original: message.info?.imageUrl!,
                      mask: imageUrl,
                    });
                  }}
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
    </>
  );
};
