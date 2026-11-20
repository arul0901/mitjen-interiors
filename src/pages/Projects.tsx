import React, { useEffect, useMemo } from "react";
import { useLocation } from "react-router-dom";
import EditorialWorkGrid from "../components/EditorialWork/EditorialWorkGrid";
import { ProjectCategory } from "../data/editorialProjectsData";

export default function Projects() {
  const location = useLocation();

  // Parse category & grid mode from URL query parameters (e.g. ?category=residential&grid=three-col)
  const { initialCategory, initialGridMode } = useMemo(() => {
    const params = new URLSearchParams(location.search);
    const catParam = params.get("category")?.toLowerCase();
    const gridParam = params.get("grid")?.toLowerCase() || params.get("mode")?.toLowerCase();

    let cat: ProjectCategory | "All Projects" = "All Projects";
    if (catParam === "residential") cat = "Residential";
    if (catParam === "commercial") cat = "Commercial";
    if (catParam === "corporate") cat = "Corporate";

    let mode: "editorial" | "three-col" | "cinematic" = "editorial";
    if (gridParam === "three-col" || gridParam === "three" || gridParam === "3") mode = "three-col";
    if (gridParam === "cinematic" || gridParam === "wide") mode = "cinematic";

    return { initialCategory: cat, initialGridMode: mode };
  }, [location.search]);

  useEffect(() => {
    document.title = "Selected Works — Architecture & Interior Portfolio | Mitjen";

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
    <main className="cs_projects_page_main" style={{ minHeight: "100vh", backgroundColor: "#f9f7f4" }}>
      {/* ------------------------------------------------------------- */}
      {/* WARP ARCHITECTS REFERENCE-DRIVEN EDITORIAL WORK SHOWCASE      */}
      {/* Top category navigation: All Projects / Residential /          */}
      {/* Commercial / Corporate. Hover reveals ONLY project name.      */}
      {/* ------------------------------------------------------------- */}
      <EditorialWorkGrid initialCategory={initialCategory} initialGridMode={initialGridMode} />
    </main>
  );
}
