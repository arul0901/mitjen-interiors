import React, { useEffect } from "react";
import LivspacePortfolio from "../components/LivspacePortfolio/LivspacePortfolio";

export default function Portfolio() {
  useEffect(() => {
    document.title = "Livspace-Style Interior Design Portfolio | Mitjen";
    window.scrollTo({ top: 0, behavior: "auto" });
  }, []);

  return (
    <main className="cs_portfolio_page_main">
      <LivspacePortfolio />
    </main>
  );
}
