import { useContext } from "react";
import Card from "./components/card";
import Header from "./components/header";
import NewCard from "./components/new-card";
import { NotesContext } from "./providers/notes-context";

export default function App() {
  const { notes } = useContext(NotesContext);

  return (
    <div className="mx-auto my-12 max-w-6xl space-y-5">
      <Header />

      <main className="grid grid-cols-3 gap-6 auto-rows-[250px]">
        <NewCard />

        {notes.map((note) => (
          <Card key={note.id} note={note} />
        ))}
      </main>
    </div>
  );
}
