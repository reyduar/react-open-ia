import Markdown from "react-markdown";
import { Content } from "../../../interfaces";

interface Props {
  text: string;
  content?: Content;
}
export const GptMessageOrthography = ({ text, content }: Props) => {
  const { correctedText, errorsCorrected, translations, suggestions } =
    content ?? {
      correctedText: "",
      errorsCorrected: [],
      translations: [],
      suggestions: [],
    };
  return (
    <div className="col-start-1 col-end-8 p-3 rounded-lg">
      <div className="flex flex-row items-start">
        <div className="flex items-center justify-center h-10 w-10 rounded-full bg-green-600 flex-shrink-0">
          IA
        </div>
        <div className="relative ml-3 text-sm bg-black bg-opacity-25 pt-3 pb-2 px-4 shadow rounded-xl">
          <Markdown>{text}</Markdown>

          {content && (
            <div className="bg-gray-800 shadow-lg rounded-lg p-6 space-y-6">
              <div>
                <h2 className="text-base font-semibold text-gray-100">
                  Texto Correcto
                </h2>
                <p className="text-gray-300 mt-2 text-sm italic">
                  {correctedText}
                </p>
              </div>

              <div>
                <h2 className="text-base font-semibold text-gray-100">
                  Errores corregidos
                </h2>
                <ul className="list-disc list-inside mt-2 text-gray-300 text-sm">
                  {errorsCorrected.map((error, index) => (
                    <li key={index}>{error}</li>
                  ))}
                </ul>
              </div>

              <div>
                <h2 className="text-base font-semibold text-gray-100">
                  Traducciones
                </h2>
                <div className="space-y-4 mt-2">
                  {translations.map((translation, index) => (
                    <div key={index} className="bg-gray-700 p-4 rounded-md">
                      <h3 className="text-sm font-medium text-gray-100 capitalize">
                        {translation.language}
                      </h3>
                      <p className="text-gray-300 text-sm">
                        {translation.translation}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h2 className="text-base font-semibold text-gray-100">
                  Sugerencias
                </h2>
                <div className="space-y-4 mt-2">
                  {suggestions.map((suggestion, index) => (
                    <div key={index} className="bg-gray-700 p-4 rounded-md">
                      <h3 className="text-sm font-medium text-gray-100 capitalize">
                        {suggestion.language.replace("_", " ")}
                      </h3>
                      <p className="text-gray-300 text-sm">
                        {suggestion.suggestion}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
