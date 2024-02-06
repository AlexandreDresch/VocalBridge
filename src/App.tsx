import Card from "./components/card";
import Header from "./components/header";
import NewCard from "./components/new-card";

export default function App() {
  return (
    <div className="mx-auto my-12 max-w-6xl space-y-5">
      <Header />

      <main className="grid grid-cols-3 gap-6 auto-rows-[250px]">
        <NewCard />

        <Card />

        <Card />
      </main>
    </div>
  );
}
