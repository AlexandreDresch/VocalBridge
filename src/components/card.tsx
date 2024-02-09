import {
  Close,
  Content,
  DialogOverlay,
  Portal,
  Root,
  Trigger,
} from "@radix-ui/react-dialog";
import { formatDistanceToNow } from "date-fns";
import { X } from "lucide-react";
import { useContext } from "react";
import { NotesContext } from "../providers/notes-context";
import { toast } from "sonner";
import ContentBox from "./content-box";

interface CardProps {
  note: {
    id: string;
    date: Date;
    content: string;
  };
}

export default function Card({ note }: CardProps) {
  const { removeNote } = useContext(NotesContext);

  function handleNoteDelete() {
    removeNote(note);

    toast.success("Note deleted!");
  }

  return (
    <Root>
      <Trigger className="rounded-sm flex flex-col text-left bg-slate-700 p-5 space-y-3 overflow-hidden relative outline-none hover:ring-1 hover:ring-slate-600 transition-transform hover:scale-105 focus-visible:ring-1 focus-visible:ring-slate-500 focus-visible:scale-105">
        <span className="text-sm font-medium text-slate-200">
          {formatDistanceToNow(note.date, { addSuffix: true })}
        </span>

        <p className="text-sm leading-6 text-slate-400">{note.content}</p>

        <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-slate-900/70 to-slate-900/0 pointer-events-none" />
      </Trigger>

      <Portal>
        <DialogOverlay className="inset-0 fixed bg-black/60" />
        <Content className="z-10 overflow-hidden fixed inset-0 md:inset-auto md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:max-w-[640px] md:h-[60vh] w-full bg-slate-700 rounded-sm flex flex-col outline-none">
          <Close className="absolute right-0 top-0 p-1.5 text-slate-400 hover:text-slate-300">
            <X className="size-5" />
          </Close>

          <div className="flex flex-1 flex-col gap-3 p-5">
            <span className="text-sm font-medium text-slate-200">
              {formatDistanceToNow(note.date, { addSuffix: true })}
            </span>

            <ContentBox content={note.content} />
          </div>

          <button
            type="button"
            onClick={handleNoteDelete}
            className="w-full bg-slate-800 py-4 text-center text-sm font-semibold text-slate-300 outline-none transition-colors duration-200 hover:bg-red-800"
          >
            Delete
          </button>
        </Content>
      </Portal>
    </Root>
  );
}
