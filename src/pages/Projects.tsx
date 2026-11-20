import React, { useEffect, useMemo } from "react";
import { useLocation } from "react-router-dom";
import EditorialWorkGrid from "../components/EditorialWork/EditorialWorkGrid";
import { ProjectCategory } from "../data/editorialProjectsData";

export default function Projects() {
  const location = useLocation();

  // Parse category from URL query parameters (e.g. ?category=residential)
  const initialCategory = useMemo(() => {
    const params = new URLSearchParams(location.search);
    const catParam = params.get("category")?.toLowerCase();
    if (catParam === "residential") return "Residential" as ProjectCategory;
    if (catParam === "commercial") return "Commercial" as ProjectCategory;
    if (catParam === "corporate") return "Corporate" as ProjectCategory;
    return "All Projects" as const;
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
      <EditorialWorkGrid initialCategory={initialCategory} />
    </main>
  );
}
