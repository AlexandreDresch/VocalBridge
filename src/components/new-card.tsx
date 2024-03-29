import {
  Close,
  Content,
  DialogOverlay,
  Portal,
  Root,
  Trigger,
} from "@radix-ui/react-dialog";
import { ChevronLeft, Languages, MicIcon, Save, X } from "lucide-react";
import { ChangeEvent, FormEvent, useContext, useState } from "react";
import { toast } from "sonner";
import { NotesContext } from "../providers/notes-context";
import {
  ITranslationResult,
  fetchTranslation,
} from "../services/translate-api";
import ContentBox from "./content-box";
import SelectLanguageButton from "./select-language";
import Loading from "./loading";

let speechRecognition: SpeechRecognition | null = null;

export default function NewCard() {
  const [shouldShowOnboarding, setShouldShowOnboarding] =
    useState<boolean>(true);
  const [originalContent, setOriginalContent] = useState<string>("");
  const [translatedContentData, setTranslatedContentData] =
    useState<ITranslationResult>({
      from: "",
      to: "",
      translation: "",
    });
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { addNote, language, setLanguage } = useContext(NotesContext);

  function handleStartEditor() {
    setShouldShowOnboarding(false);
  }

  function handleStopEditor() {
    setShouldShowOnboarding(true);
    setIsRecording(false);
  }

  function handleStartRecording() {
    const isSpeechRecognitionAPIAvailable =
      "SpeechRecognition" in window || "webkitSpeechRecognition" in window;

    if (!isSpeechRecognitionAPIAvailable) {
      toast.error(
        "Unfortunately your browser does not support speech recognition :("
      );
      return;
    }

    setIsRecording(true);
    setShouldShowOnboarding(false);

    const SpeechRecognitionAPI =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    speechRecognition = new SpeechRecognitionAPI();

    speechRecognition.lang = navigator.language;
    speechRecognition.continuous = true;
    speechRecognition.maxAlternatives = 1;
    speechRecognition.interimResults = true;

    speechRecognition.onresult = (event: SpeechRecognitionEvent) => {
      const transcript = Array.from(event.results).reduce((text, result) => {
        return text.concat(result[0].transcript);
      }, "");
      setOriginalContent(transcript);
    };

    speechRecognition.onerror = (event: SpeechRecognitionErrorEvent) => {
      console.error(event);
    };

    speechRecognition.start();
  }

  function handleStopRecording() {
    if (speechRecognition != null) {
      speechRecognition.stop();
    }

    setIsRecording(false);
  }

  function handleOriginalContentChange(e: ChangeEvent<HTMLTextAreaElement>) {
    setOriginalContent(e.target.value);
  }

  function handleSaveNote(e: FormEvent) {
    e.preventDefault();

    if (originalContent === "") {
      toast.error("Please enter a note!");
      return;
    }

    if (translatedContentData.translation === "") {
      toast.error("Please translate first!");
      return;
    }

    const note = {
      id: crypto.randomUUID(),
      date: new Date(),
      originalContent,
      from: translatedContentData.from,
      to: translatedContentData.to,
      translatedContent: translatedContentData.translation,
    };

    addNote(note);

    setShouldShowOnboarding(true);
    setOriginalContent("");
    setLanguage("");
    setTranslatedContentData({ from: "", to: "", translation: "" });
    toast.success("Note saved successfully!");
  }

  async function handleTranslate() {
    if (originalContent === "") {
      toast.error("Please enter a note to translate.");
      return;
    }

    if (language === "") {
      toast.error("Please select a language first.");
      return;
    }

    setIsRecording(false);
    setIsLoading(true);
    try {
      const data = await fetchTranslation(originalContent, language);
      setTranslatedContentData(data);
      setLanguage("");
      setIsLoading(false);
    } catch (error) {
      toast.error("Error fetching translation, try again.");
      setIsLoading(false);
    }
  }

  return (
    <Root>
      <Trigger className="md:rounded-sm bg-primary p-5 flex flex-col gap-3 text-left outline-none hover:ring-1 hover:ring-slate-600 transition-transform hover:scale-105 focus-visible:ring-1 focus-visible:ring-slate-500 focus-visible:scale-105">
        <span className="text-sm font-medium text-slate-200">
          Start Translating!
        </span>

        <p className="text-sm leading-6 text-slate-400">
          Record your voice, or type something, and then translate it into the
          language you want.
        </p>
      </Trigger>

      <Portal>
        <DialogOverlay className="inset-0 fixed bg-black/60" />
        <Content className="z-10 overflow-hidden inset-0 fixed md:inset-auto md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:max-w-[640px] md:h-[60vh] w-full bg-primary rounded-sm flex flex-col outline-none">
          <Close className="absolute right-0 top-0 p-1.5 text-slate-400 hover:text-slate-300">
            <X className="size-5" />
          </Close>

          {!shouldShowOnboarding && (
            <button
              type="button"
              className="absolute top-1.5 right-8 text-secondary/70 hover:text-secondary"
              onClick={handleStopEditor}
            >
              <ChevronLeft className="size-5" />
            </button>
          )}

          <form className="flex-1 flex flex-col">
            <div className="flex flex-1 flex-col gap-3 p-5">
              <span className="text-sm font-medium text-slate-200">
                Start Translating!
              </span>

              {shouldShowOnboarding ? (
                <p className="text-sm leading-6 text-slate-400">
                  <button
                    type="button"
                    className="font-medium text-slate-100 hover:underline"
                    onClick={handleStartRecording}
                  >
                    Record your voice
                  </button>
                  , or
                  <button
                    type="button"
                    className="font-medium text-slate-100 hover:underline ml-1.5"
                    onClick={handleStartEditor}
                  >
                    type something
                  </button>
                  , and then translate it into the language you want.
                </p>
              ) : (
                <>
                  <textarea
                    autoFocus
                    className="text-sm leading-6 text-slate-400 bg-transparent resize-none flex-1 outline-none"
                    onChange={handleOriginalContentChange}
                    value={originalContent}
                    placeholder={
                      isRecording ? "Say something..." : "Type something..."
                    }
                  />

                  {isRecording && (
                    <button
                      type="button"
                      onClick={handleStopRecording}
                      className="w-full py-4 flex items-center justify-center text-center text-sm font-semibold text-slate-300 outline-none"
                    >
                      <MicIcon className="size-10 rounded-full animate-pulse text-red-500 mr-2" />
                    </button>
                  )}

                  <SelectLanguageButton isLoading={isLoading} />

                  {translatedContentData.translation && (
                    <ContentBox content={translatedContentData.translation} />
                  )}
                </>
              )}
            </div>
            <button
              type="button"
              disabled={isLoading}
              onClick={handleTranslate}
              className="w-full bg-white flex gap-2 py-4 items-center justify-center text-sm font-bold text-secondary outline-none transition-colors duration-200"
            >
              {isLoading ? (
                <Loading />
              ) : (
                <>
                  <Languages strokeWidth={2} size={20} />
                  <span>Translate</span>
                </>
              )}
            </button>
            {translatedContentData.translation.length > 0 && (
              <button
                type="button"
                onClick={handleSaveNote}
                className="w-full flex items-center gap-2 justify-center bg-transparent py-4 text-center text-sm font-semibold text-slate-300 outline-none"
              >
                <Save strokeWidth={1} className="text-secondary" />
                <span>Save</span>
              </button>
            )}
          </form>
        </Content>
      </Portal>
    </Root>
  );
}
