import { GptMessage, MyMessage } from "../../components";

export function OrthographyPage() {
  return (
    <div className="chat-container">
      <div className="chat-messages">
        <div className="grid grid-cols-12 gap-y-2">
          {/* Bienvenidas */}
          <GptMessage text="¡Hola! Soy un modelo de lenguaje de OpenAI. ¿En qué puedo ayudarte hoy?" />

          {/* Preguntas */}
          <MyMessage text="¿Qué es la ortografía?" />
        </div>
      </div>
    </div>
  );
}
