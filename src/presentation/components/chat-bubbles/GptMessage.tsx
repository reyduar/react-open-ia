import Markdown from "react-markdown";
import { Content } from "../../../interfaces";

interface Props {
  text: string;
  content?: Content;
}
export const GptMessage = ({ text, content }: Props) => {
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
            <div className="bg-white shadow-lg rounded-lg p-6 space-y-6">
              {/* Texto corregido */}
              <div>
                <h2 className="text-xl font-semibold text-gray-800">
                  Corrected Text
                </h2>
                <p className="text-gray-700 mt-2 italic">{correctedText}</p>
              </div>

              {/* Errores corregidos */}
              <div>
                <h2 className="text-xl font-semibold text-gray-800">
                  Errors Corrected
                </h2>
                <ul className="list-disc list-inside mt-2 text-gray-700">
                  {errorsCorrected.map((error, index) => (
                    <li key={index}>{error}</li>
                  ))}
                </ul>
              </div>

              {/* Traducciones */}
              <div>
                <h2 className="text-xl font-semibold text-gray-800">
                  Translations
                </h2>
                <div className="space-y-4 mt-2">
                  {translations.map((translation, index) => (
                    <div key={index} className="bg-gray-100 p-4 rounded-md">
                      <h3 className="text-lg font-medium text-gray-900 capitalize">
                        {translation.language}
                      </h3>
                      <p className="text-gray-700">{translation.translation}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Sugerencias */}
              <div>
                <h2 className="text-xl font-semibold text-gray-800">
                  Suggestions
                </h2>
                <div className="space-y-4 mt-2">
                  {suggestions.map((suggestion, index) => (
                    <div key={index} className="bg-gray-100 p-4 rounded-md">
                      <h3 className="text-lg font-medium text-gray-900 capitalize">
                        {suggestion.language.replace("_", " ")}
                      </h3>
                      <p className="text-gray-700">{suggestion.suggestion}</p>
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
