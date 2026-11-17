import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import LivspacePortfolio from "../components/LivspacePortfolio/LivspacePortfolio";

export default function Projects() {
  const location = useLocation();

  useEffect(() => {
    document.title = "Our Projects | Mitjen Interior Design Portfolio";

    if (location.hash) {
      const id = location.hash.replace("#", "");
      const timer = setTimeout(() => {
        const el = document.getElementById(id);
        if (el) {
          el.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }, 300);
      return () => clearTimeout(timer);
    } else {
      window.scrollTo({ top: 0, behavior: "auto" });
    }
  }, [location.hash]);

  return (
    <main className="cs_projects_page_main">
      <LivspacePortfolio />
    </main>
  );
}
