import Header from "./components/Header";
import Hero from "./components/Hero";
import Solutions from "./components/Solutions";
import Catalog from "./components/Catalog";
import Advantages from "./components/Advantages";
import Cases from "./components/Cases";
import Flow from "./components/Flow";
import Trust from "./components/Trust";
import Contact from "./components/Contact";
import { Ticker } from "./components/ui";
import { TICKER_ITEMS } from "./data";

export default function App() {
  return (
    <div className="min-h-screen">
      <div className="noise-layer" aria-hidden />
      <Header />
      <main>
        <Hero />
        <Ticker items={TICKER_ITEMS} />
        <Solutions />
        <Catalog />
        <Advantages />
        <Cases />
        <Flow />
        <Trust />
        <Contact />
      </main>
    </div>
  );
}
