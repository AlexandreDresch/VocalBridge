import { ReactNode, createContext, useEffect, useState } from "react";

interface Note {
  id: string;
  date: Date;
  content: string;
}

interface NotesContext {
  notes: Note[];
  addNote: (note: Note) => void;
  removeNote: (note: Note) => void;
  handleQuery: (query: string) => void;
}

export const NotesContext = createContext<NotesContext>({
  notes: [],
  addNote: () => {},
  removeNote: () => {},
  handleQuery: () => {},
});

export default function NotesProvider({ children }: { children: ReactNode }) {
  const [notes, setNotes] = useState<Note[]>([]);
  const [filteredNotes, setFilteredNotes] = useState<Note[]>([]);
  const [query, setQuery] = useState<string>("");

  useEffect(() => {
    setNotes(JSON.parse(localStorage.getItem("@vocal-bridge/notes") || "[]"));
  }, []);

  useEffect(() => {
    localStorage.setItem("@vocal-bridge/notes", JSON.stringify(notes));
  }, [notes]);

  useEffect(() => {
    if (query) {
      const filtered = notes.filter((note) =>
        note.content.toLowerCase().includes(query.toLowerCase())
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

  function handleQuery(query: string) {
    setQuery(query);
  }

  return (
    <NotesContext.Provider
      value={{
        notes: filteredNotes,
        addNote,
        removeNote,
        handleQuery
      }}
    >
      {children}
    </NotesContext.Provider>
  );
}
