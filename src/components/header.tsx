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
      <a className="flex justify-center items-center" href="/">
        <img src={logo} alt="Vocal Bridge" className="w-14" />
      </a>

      <form className="w-1/2 relative flex items-center">
        <Search className="absolute top-3 left-2 size-5"  />
        <input
          type="text"
          placeholder="Search..."
          onChange={handleSearch}
          className="w-full bg-tertiary p-2 pl-8 md:pl-9 rounded-xl text-lg  font-medium tracking-tight placeholder:text-slate-400  outline-none"
        />
      </form>
    </header>
  );
}
