import { ReactNode, createContext, useEffect, useState } from "react";
import { debounce } from "../utils";

export interface Note {
  id: string;
  date: Date;
  originalContent: string;
  from: string;
  to: string;
  translatedContent: string;
}

interface NotesContext {
  notes: Note[];
  addNote: (note: Note) => void;
  removeNote: (note: Note) => void;
  handleQuery: (query: string) => void;
  language: string;
  setLanguage: React.Dispatch<React.SetStateAction<string>>;
}

export const NotesContext = createContext<NotesContext>({
  notes: [],
  addNote: () => {},
  removeNote: () => {},
  handleQuery: () => {},
  language: "",
  setLanguage: () => {},
});

export default function NotesProvider({ children }: { children: ReactNode }) {
  const [notes, setNotes] = useState<Note[]>([]);
  const [filteredNotes, setFilteredNotes] = useState<Note[]>([]);
  const [query, setQuery] = useState<string>("");
  const [language, setLanguage] = useState<string>("");

  useEffect(() => {
    setNotes(JSON.parse(localStorage.getItem("@vocal-bridge/notes") || "[]"));
  }, []);

  useEffect(() => {
    localStorage.setItem("@vocal-bridge/notes", JSON.stringify(notes));
  }, [notes]);

  useEffect(() => {
    if (query) {
      const filtered = notes.filter((note) =>
        note.originalContent.toLowerCase().includes(query.toLowerCase()) || 
        note.translatedContent.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredNotes(filtered);
    } else {
      setFilteredNotes(notes);
    } 
  }, [query, notes]);

  function addNote(note: Note) {
    setNotes((prev) => [...prev, note]);
  }  

  function removeNote(note: Note) {
    setNotes((prev) => prev.filter((n) => n.id !== note.id));
  }

  const debouncedHandleQuery = debounce((query: string) => {
    setQuery(query);
  }, 300); 

  return (
    <NotesContext.Provider
      value={{
        notes: filteredNotes,
        addNote,
        removeNote,
        handleQuery: debouncedHandleQuery,
        language,
        setLanguage,
      }}
    >
      {children}
    </NotesContext.Provider>
  );
}
