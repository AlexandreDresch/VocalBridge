import { ChangeEvent, useContext } from "react";
import logo from "../assets/bridge.svg";
import { NotesContext } from "../providers/notes-context";

export default function Header() {  
  const { handleQuery } = useContext(NotesContext);

  function handleSearch(e: ChangeEvent<HTMLInputElement>) {
    const query = e.target.value;

    handleQuery(query);
  }

  return (
    <header className="w-full space-y-5">
      <div className="flex  items-center">
        <h1 className="font-semibold text-xl text-slate-700 align-bottom">
          Vocal
        </h1>
        <img src={logo} alt="Bridge" className="w-10" />
      </div>

      <form className="w-full">
        <input
          type="text"
          placeholder="Search in your notes..."
          onChange={handleSearch}
          className="w-full bg-transparent text-3xl font-medium tracking-tight placeholder:text-slate-500 outline-none"
        />
      </form>

      <div className="w-full h-px  bg-gradient-to-r from bg-slate-500 via-slate-600 to-slate-700" />
    </header>
  );
}
