import {
  Close,
  Content,
  DialogOverlay,
  Portal,
  Root,
  Title,
  Trigger,
} from "@radix-ui/react-dialog";
import { formatDistanceToNow } from "date-fns";
import { ChevronRightIcon, X } from "lucide-react";
import { useContext } from "react";
import { Note, NotesContext } from "../providers/notes-context";
import { toast } from "sonner";
import ContentBox from "./content-box";
import { getLanguageFlag, getLanguageName } from "../utils/language-functions";
import Separator from "./separator";

interface CardProps {
  note: Note;
}

export default function Card({ note }: CardProps) {
  const { removeNote } = useContext(NotesContext);

  function handleNoteDelete() {
    removeNote(note);

    toast.success("Note deleted!");
  }

  return (
    <Root>
      <Trigger className="rounded-sm flex flex-col text-left bg-primary p-5 space-y-3 overflow-hidden relative outline-none hover:ring-1 hover:ring-slate-600 transition-transform hover:scale-105 focus-visible:ring-1 focus-visible:ring-slate-500 focus-visible:scale-105">
        <span className="text-sm font-medium text-slate-200">
          {formatDistanceToNow(note.date, { addSuffix: true })}
        </span>

        <div className="flex flex-col w-full">
          <div className="flex w-full justify-around items-center">
            <div className="flex gap-2">
              <p className="font-semibold text-sm">
                {getLanguageFlag(note.from)}
              </p>
              <p className="font-semibold text-sm">
                {getLanguageName(note.from).toUpperCase()}
              </p>
            </div>

            <ChevronRightIcon size={20} />

            <div className="flex gap-2">
              <p className="font-semibold text-sm">
                {getLanguageName(note.to).toUpperCase()}
              </p>
              <p className="font-semibold text-sm">
                {getLanguageFlag(note.to)}
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-3 w-full">
          <p className="text-sm leading-6 text-slate-400">
            {note.originalContent}
          </p>

          <Separator orientation="horizontal" />

          <p className="text-sm leading-6 text-slate-400">
            {note.translatedContent}
          </p>
        </div>
      </Trigger>

      <Portal>
        <DialogOverlay className="inset-0 fixed bg-black/60" />
        <Content className="z-10 overflow-hidden fixed inset-0 md:inset-auto md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:max-w-[640px] md:h-[60vh] w-full bg-primary rounded-sm flex flex-col outline-none">
          <Close className="absolute right-0 top-0 p-1.5 text-slate-400 hover:text-slate-300">
            <X className="size-5" />
          </Close>

          <Title className="pt-5 pl-5 text-sm font-medium text-slate-200">
            {formatDistanceToNow(note.date, { addSuffix: true })}
          </Title>

          <div className="flex flex-1 flex-col gap-3 p-5">
            <div className="flex flex-col h-full gap-1">
              <div className="flex gap-2">
                <p className="font-semibold text-sm">
                  {getLanguageFlag(note.from)}
                </p>
                <p className="font-semibold text-sm">
                  {getLanguageName(note.from).toUpperCase()}:
                </p>
              </div>
              <ContentBox content={note.originalContent} />
            </div>

            <div className="flex flex-col h-full gap-1">
              <div className="flex gap-2">
                <p className="font-semibold text-sm">
                  {getLanguageFlag(note.to)}
                </p>
                <p className="font-semibold text-sm">
                  {getLanguageName(note.to).toUpperCase()}:
                </p>
              </div>
              <ContentBox content={note.translatedContent} />
            </div>
          </div>

          <button
            type="button"
            onClick={handleNoteDelete}
            className="w-full bg-secondary py-4 text-center text-sm font-semibold text-slate-100 outline-none transition-colors duration-200 "
          >
            Delete
          </button>
        </Content>
      </Portal>
    </Root>
  );
}
