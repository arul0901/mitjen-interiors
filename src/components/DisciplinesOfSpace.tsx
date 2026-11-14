import React from "react";

export interface DisciplineItem {
  id: string;
  tag: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  keyMaterials: string[];
  scale: string;
  link: string;
}

export const DISCIPLINES: DisciplineItem[] = [
  {
    id: "residential",
    tag: "01 · PRIVATE RESIDENCES",
    title: "Residential Sanctuary",
    subtitle: "Mitjen villas, private penthouses & luxury apartments",
    description:
      "Crafted around natural light, diurnal living patterns, and acoustic peace. We sculpt spaces where family life unfolds in effortless harmony and tactile comfort.",
    image: "/assets/mitijen/home1.jpeg",
    keyMaterials: ["Honed Italian Travertine", "Quarter-Sawn White Oak", "Natural Linen Upholstery", "Concealed Warm Brass Reveals"],
    scale: "2,500 – 18,000 Sq.Ft Volume",
    link: "/services/details",
  },
  {
    id: "commercial",
    tag: "02 · HOSPITALITY & RETAIL",
    title: "Commercial Venues",
    subtitle: "Flagship showrooms, boutique cafes & experiential spaces",
    description:
      "Interiors engineered to captivate attention and elevate the visitor journey. Every sightline, material transition, and lighting scene reinforces the brand identity.",
    image: "/assets/mitijen/warm1.jpeg",
    keyMaterials: ["Hand-Patinated Architectural Bronze", "Fluted Smoked Glass", "Seamless Micro-Cement", "Custom Sconces"],
    scale: "1,800 – 25,000 Sq.Ft Volume",
    link: "/services/details",
  },
  {
    id: "corporate",
    tag: "03 · WORKPLACES & STUDIOS",
    title: "Corporate Workspaces",
    subtitle: "Executive headquarters, private suites & collaborative studios",
    description:
      "High-performance work environments balancing private executive contemplation with collaborative flow, cutting-edge acoustic isolation, and discreet technology.",
    image: "/assets/mitijen/home3.jpeg",
    keyMaterials: ["Solid American Walnut", "Acoustic Decoupled Fabric Panels", "Architectural Steel Mullions", "Circadian LED"],
    scale: "3,000 – 35,000 Sq.Ft Volume",
    link: "/services/details",
  },
];

interface DisciplinesProps {
  className?: string;
  disciplines?: DisciplineItem[];
}

export default function DisciplinesOfSpace({
  className = "",
  disciplines = DISCIPLINES,
}: DisciplinesProps) {
  return (
    <section className={`cs_disciplines_section ${className}`} aria-label={"Disciplines of Form & Space"}>
      <div className={"container"}>
        <div className={"cs_disciplines_header"}>
          <div className={"cs_disciplines_header_lead"}>
            <span className={"cs_disciplines_kicker"}>DISCIPLINES OF FORM & SPACE</span>
            <h2 className={"cs_disciplines_title"}>Interiors Shaped for Living, Working & Growing.</h2>
          </div>
          <div className={"cs_disciplines_header_right"}>
            <p className={"cs_disciplines_intro"}>
              Whether crafting an intimate family retreat or a prestigious corporate headquarters, our studio applies
              the same rigorous architectural standards to every scale.
            </p>
            <a href={"/services"} className={"cs_disciplines_explore_btn"}>
              <span>EXPLORE ALL PRACTICES →</span>
            </a>
          </div>
        </div>

        <div className={"row cs_gap_y_40"}>
          {disciplines.map((item, idx) => (
            <div key={item.id} className={"col-lg-4 col-md-6"}>
              <div className={"cs_discipline_card"}>
                <div className={"cs_discipline_thumb_wrap"}>
                  <img
                    src={item.image}
                    alt={item.title}
                    className={"cs_discipline_img"}
                    loading={"lazy"}
                  />
                  <span className={"cs_discipline_tag"}>{item.tag}</span>
                  <span className={"cs_discipline_scale"}>{item.scale}</span>
                </div>

                <div className={"cs_discipline_body"}>
                  <h3 className={"cs_discipline_title"}>{item.title}</h3>
                  <p className={"cs_discipline_subtitle"}>{item.subtitle}</p>
                  <p className={"cs_discipline_desc"}>{item.description}</p>

                  <div className={"cs_discipline_materials"}>
                    <span className={"cs_discipline_mat_label"}>Key Materials:</span>
                    <div className={"cs_discipline_chips"}>
                      {item.keyMaterials.map((mat, i) => (
                        <span key={i} className={"cs_discipline_chip"}>{mat}</span>
                      ))}
                    </div>
                  </div>

                  <a href={item.link} className={"cs_discipline_link"}>
                    <span>Discover Typology</span>
                    <svg width={"14"} height={"14"} viewBox={"0 0 14 14"} fill={"none"} stroke={"currentColor"} strokeWidth={"1.8"}>
                      <path d={"M1 7H13M13 7L7.5 1.5M13 7L7.5 12.5"} strokeLinecap={"round"} strokeLinejoin={"round"} />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

