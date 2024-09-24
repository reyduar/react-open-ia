import type { Subtitle } from "../../../interfaces";

interface Props {
  text?: string;
  content?: Subtitle;
}
export const GptMessageAudioToText = ({ text, content }: Props) => {
  return (
    <div className="col-start-1 col-end-8 p-3 rounded-lg">
      <div className="flex flex-row items-start">
        <div className="flex items-center justify-center h-10 w-10 rounded-full bg-green-600 flex-shrink-0">
          IA
        </div>
        <div className="relative ml-3 text-sm bg-black bg-opacity-25 pt-3 pb-2 px-4 shadow rounded-xl">
          {text && <p className="text-gray-100">{text}</p>}
          {content && (
            <div className="bg-gray-800 shadow-lg rounded-lg p-6 space-y-6">
              <div>
                <h2 className="text-base font-semibold text-gray-100">
                  [(Transcripción de Audio en {content.language}, duración{" "}
                  {Math.round(content.duration)} segundos)
                </h2>
                <p className="text-gray-300 mt-2 text-sm italic">
                  {content.text}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
