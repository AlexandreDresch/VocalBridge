import { ChangeEvent, useContext } from "react";
import logo from "../assets/bridge.svg";
import { NotesContext } from "../providers/notes-context";
import { Search } from "lucide-react";

export default function Header() {
  const { handleQuery } = useContext(NotesContext);

  function handleSearch(e: ChangeEvent<HTMLInputElement>) {
    const query = e.target.value;

    handleQuery(query);
  }

  return (
    <header className="w-full space-y-5 flex justify-between items-center">
      <div className="flex justify-center items-center">
        <img src={logo} alt="Vocal Bridge" className="w-14" />
      </div>

      <form className="w-1/2 relative flex items-center">
        <Search className="absolute top-2 left-1 md:top-1.5 size-5 md:size-6"  />
        <input
          type="text"
          placeholder="Search..."
          onChange={handleSearch}
          className="w-full bg-tertiary p-1 pl-7 md:pl-8 rounded-xl text-lg md:text-xl font-medium tracking-tight placeholder:text-slate-400  outline-none"
        />
      </form>
    </header>
  );
}
