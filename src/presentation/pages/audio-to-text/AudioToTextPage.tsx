import { useState } from "react";
import {
  GptMessage,
  GptMessageAudioToText,
  MyMessage,
  TypingLoader,
  TextMessageBoxFile,
} from "../../components";
import { audioToTextUseCase } from "../../../use-cases";
import { Subtitle } from "../../../interfaces";

interface Message {
  text: string;
  isGpt: boolean;
  content?: Subtitle;
}

const disclaimer = `
## Adjunte el audio que desea transcribir a texto y ingreses la instrucciones que desee que se respeten.
*Nota*: Todas las transcripciones generadas son por AI y no deben ser utilizados en entornos profesionales.`;

export function AudioToTextPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);

  const handlePost = async (text: string, file: File) => {
    setIsLoading(true);
    setMessages((prev) => [...prev, { text, isGpt: false }]);
    const { ok, message, content } = await audioToTextUseCase(file, text);
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
          {/* Disclaimer */}
          <GptMessage text={disclaimer} />

          {/* adio */}
          {messages.map((message, index) =>
            message.isGpt ? (
              <GptMessageAudioToText
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

      <TextMessageBoxFile
        onSendMessage={handlePost}
        placeholder="Escribe las instrucciones para la transcripción"
        accept="audio/*"
      />
    </div>
  );
}
