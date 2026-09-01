import { useEffect, useState } from "react";
import { ThemeProvider, useTheme } from "./theme";
import WpAdminBar from "./components/WpAdminBar";
import WpHeader from "./components/WpHeader";
import WpFooter from "./components/WpFooter";
import Hero from "./components/Hero";
import Solutions from "./components/Solutions";
import Catalog from "./components/Catalog";
import Advantages from "./components/Advantages";
import Cases from "./components/Cases";
import Flow from "./components/Flow";
import Blog from "./components/Blog";
import Trust from "./components/Trust";
import Contact from "./components/Contact";
import NeonTheme from "./components/neon/NeonScreens";

/** Светлая тема «Microinvest Business» — полный сайт с блогом */
function PaperSite() {
  const [blogQuery, setBlogQuery] = useState("");

  const searchAndGo = (q: string) => {
    setBlogQuery(q);
    if (q.trim()) {
      document.getElementById("blog")?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
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
    </>
  );
}

function Shell() {
  const { theme } = useTheme();

  useEffect(() => {
    document.body.style.background = theme === "neon" ? "#0d1117" : "#ffffff";
    return () => {
      document.body.style.background = "";
    };
  }, [theme]);

  return (
    <div
      data-theme={theme}
      className={
        theme === "neon"
          ? "min-h-screen bg-carbon font-body text-white"
          : "relative min-h-screen bg-paper font-body text-ink"
      }
    >
      <WpAdminBar />
      {theme === "neon" ? <NeonTheme /> : <PaperSite />}
      <div className="noise-layer" aria-hidden />
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <Shell />
    </ThemeProvider>
  );
}
