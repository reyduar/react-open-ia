import { useState } from "react";
import {
  GptMessage,
  GptMessageAudio,
  MyMessage,
  TypingLoader,
  TextMessageBoxFile,
} from "../../components";
import { audioToTextUseCase } from "../../../use-cases";

interface TextMessage {
  text: string;
  isGpt: boolean;
  type: "text";
}

interface AudioMessage {
  text: string;
  isGpt: boolean;
  audio: string;
  type: "audio";
}

type Message = TextMessage | AudioMessage;

const disclaimer = `
## Adjunte el audio que desea transcribir a texto y ingreses la instrucciones que desee que se respeten.
*Nota*: Todas las transcripciones generadas son por AI y no deben ser utilizados en entornos profesionales.`;

export function AudioToTextPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);

  const handlePost = async (text: string) => {
    setIsLoading(true);
    setMessages((prev) => [...prev, { text, isGpt: false, type: "text" }]);
    const { ok, message, content } = await audioToTextUseCase(text);
    setIsLoading(false);
    if (!ok) return;

    setMessages((prev) => [
      ...prev,
      { text: message, isGpt: true, type: "audio", audio: content! },
    ]);
  };

  return (
    <div className="chat-container">
      <div className="chat-messages">
        <div className="grid grid-cols-12 gap-y-2">
          {/* Disclaimer */}
          <GptMessage text={disclaimer} />

          {/* adio */}
          {messages.map((message, index) =>
            message.isGpt ? (
              message.type === "audio" ? (
                <GptMessageAudio
                  key={index}
                  text={message.text}
                  audio={message.audio}
                />
              ) : (
                <GptMessage key={index} text={message.text} />
              )
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

      <TextMessageBoxFile
        onSendMessage={handlePost}
        placeholder="Escribe las instrucciones para la transcripción"
      />
    </div>
  );
}
