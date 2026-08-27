import { useState } from "react";
import WpAdminBar from "./components/WpAdminBar";
import WpHeader from "./components/WpHeader";
import Hero from "./components/Hero";
import Solutions from "./components/Solutions";
import Catalog from "./components/Catalog";
import Advantages from "./components/Advantages";
import Cases from "./components/Cases";
import Flow from "./components/Flow";
import Blog from "./components/Blog";
import Trust from "./components/Trust";
import Contact from "./components/Contact";
import WpFooter from "./components/WpFooter";

export default function App() {
  const [blogQuery, setBlogQuery] = useState("");

  const searchAndGo = (q: string) => {
    setBlogQuery(q);
    if (q.trim()) {
      document.getElementById("blog")?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="relative min-h-screen bg-paper font-body text-ink">
      <WpAdminBar />
      <WpHeader onSearch={searchAndGo} />
      <main>
        <Hero />
        <Solutions />
        <Catalog />
        <Advantages />
        <Cases />
        <Flow />
        <Blog query={blogQuery} onQuery={setBlogQuery} />
        <Trust />
        <Contact />
      </main>
      <WpFooter />
      <div className="noise-layer" aria-hidden />
    </div>
  );
}
