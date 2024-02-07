import Card from "./components/card";
import Header from "./components/header";
import NewCard from "./components/new-card";

export default function App() {
  return (
    <div className="mx-auto my-12 max-w-6xl space-y-5">
      <Header />

      <main className="grid grid-cols-3 gap-6 auto-rows-[250px]">
        <NewCard />

        <Card
          date={new Date()}
          content="Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas, rerum officiis necessitatibus asperiores maiores quis? Architecto, nam impedit? Rem facere ipsum corrupti cupiditate perferendis commodi officia fugiat natus adipisci possimus?"
        />
      </main>
    </div>
  );
}
