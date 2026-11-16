import React, { useEffect } from "react";
import CompattoLanding from "../components/CompattoLanding/CompattoLanding";

export default function Home() {
  useEffect(() => {
    document.title = "Compatto | Bringing Simplicity In The Furnishing Market";
    // Clean up dark theme classes so the editorial warm palette shines
    document.body.classList.remove("home-dark-theme");
    document.documentElement.classList.remove("home-dark-theme");
  }, []);

  return (
    <main className="cs_home_main">
      <CompattoLanding />
    </main>
  );
}
