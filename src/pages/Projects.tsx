import React, { useEffect, useMemo } from "react";
import { useLocation } from "react-router-dom";
import AboutVaneBanner, { type BannerSlide } from "../components/AboutVaneBanner/AboutVaneBanner";
import EditorialWorkGrid from "../components/EditorialWork/EditorialWorkGrid";
import { ProjectCategory } from "../data/editorialProjectsData";

const PROJECTS_BANNER_SLIDES: readonly [BannerSlide, BannerSlide] = [
  {
    id: "projects-slide-portfolio",
    num: "01",
    tabLabel: "PORTFOLIO",
    kicker: "CURATED PORTFOLIO // 04 SIGNATURE RESIDENCES",
    title: "SELECTED WORKS",
    desc: "Architectural residences, experiential retail studios, and high-performance corporate headquarters across South India.",
    image: "/images/projects/Mitjen-Racecourse-PU-Paint/Residential1.jpeg",
    ctaText: "BROWSE PROJECTS",
    ctaLink: "#projects-grid",
  },
  {
    id: "projects-slide-execution",
    num: "02",
    tabLabel: "EXECUTION",
    kicker: "PRECISION MILLWORK // TURNKEY DELIVERY",
    title: "CRAFTED IN EVERY DETAIL",
    desc: "From German CNC joinery to acoustic corporate environments, explore spaces engineered for longevity and poise.",
    image: "/images/projects/Mitjen-Corporate/Corporate1.jpeg",
    ctaText: "BOOK A CONSULTATION",
    ctaLink: "/contact",
  },
];

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
      {/* Kinetic Vane Hero Banner */}
      <AboutVaneBanner
        slides={PROJECTS_BANNER_SLIDES}
        breadcrumbLabel="Projects"
        badgeText="PORTFOLIO // CBE & BLR"
        ariaLabel="Mitjen Selected Works Kinetic Banner"
        triggerId="projects-vane-pin-trigger"
      />

      {/* ------------------------------------------------------------- */}
      {/* WARP ARCHITECTS REFERENCE-DRIVEN EDITORIAL WORK SHOWCASE      */}
      {/* Top category navigation: All Projects / Residential /          */}
      {/* Commercial / Corporate. Hover reveals ONLY project name.      */}
      {/* ------------------------------------------------------------- */}
      <div id="projects-grid">
        <EditorialWorkGrid initialCategory={initialCategory} initialGridMode={initialGridMode} />
      </div>
    </main>
  );
}
