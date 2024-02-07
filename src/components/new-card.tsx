import {
  Close,
  Content,
  DialogOverlay,
  Portal,
  Root,
  Trigger,
} from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { ChangeEvent, FormEvent, useState } from "react";
import { toast } from "sonner";

export default function NewCard() {
  const [shouldShowOnboarding, setShouldShowOnboarding] =
    useState<boolean>(true);
  const [content, setContent] = useState<string>("");

  function handleStartEditor() {
    setShouldShowOnboarding(false);
  }

  function handleContentChange(e: ChangeEvent<HTMLTextAreaElement>) {
    setContent(e.target.value);
    if (e.target.value === "") setShouldShowOnboarding(true);
  }

  function handleSaveNote(e: FormEvent) {
    e.preventDefault();

    toast.success("Note saved successfully!");

    console.log(content);
  }

  return (
    <Root>
      <Trigger className="rounded-sm bg-slate-700 p-5 flex flex-col gap-3 text-left outline-none hover:ring-1 hover:ring-slate-600 transition-transform hover:scale-105 focus-visible:ring-1 focus-visible:ring-slate-500 focus-visible:scale-105">
        <span className="text-sm font-medium text-slate-200">
          Start Recording!
        </span>

        <p className="text-sm leading-6 text-slate-400">
          Record your voice, or type something, and we will convert it into text
          in whatever language you want.
        </p>
      </Trigger>

      <Portal>
        <DialogOverlay className="inset-0 fixed bg-black/60" />
        <Content className="z-10 overflow-hidden fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 max-w-[640px] h-[60vh] w-full bg-slate-700 rounded-sm flex flex-col outline-none">
          <Close className="absolute right-0 top-0 p-1.5 text-slate-400 hover:text-slate-300">
            <X className="size-5" />
          </Close>

          <form onSubmit={handleSaveNote} className="flex-1 flex flex-col">
            <div className="flex flex-1 flex-col gap-3 p-5">
              <span className="text-sm font-medium text-slate-200">
                Start Recording!
              </span>

              {shouldShowOnboarding ? (
                <p className="text-sm leading-6 text-slate-400">
                  <button className="font-medium text-slate-100 hover:underline">
                    Record your voice
                  </button>
                  , or
                  <button
                    className="font-medium text-slate-100 hover:underline ml-1.5"
                    onClick={handleStartEditor}
                  >
                    type something
                  </button>
                  , and we will convert it into text in whatever language you
                  want.
                </p>
              ) : (
                <textarea
                  autoFocus
                  className="text-sm leading-6 text-slate-400 bg-transparent resize-none flex-1 outline-none"
                  onChange={handleContentChange}
                  placeholder="Type something..."
                />
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-slate-800 py-4 text-center text-sm font-semibold text-slate-300 outline-none transition-colors duration-200 hover:bg-green-700"
            >
              Save
            </button>
          </form>
        </Content>
      </Portal>
    </Root>
  );
}
