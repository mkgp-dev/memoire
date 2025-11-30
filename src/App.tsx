import { Grid } from "./components/panels/Grid";
import { Scoreboard } from "./components/panels/Scoreboard";

export default function App() {

  return (
    <main className="flex items-center justify-center min-h-screen">
      <div className="w-full max-w-5xl space-y-4">
        <section id="header" className="flex items-center justify-between">
          <div className="flex flex-col">
            <h1 className="font-montserrat font-semibold text-8xl">Memoire</h1>
            <p className="font-thin">Pick a difficulty and try not to click the same Pokémon twice.</p>
          </div>

          <Scoreboard />
        </section>
        <Grid />
      </div>
    </main>
  );
}