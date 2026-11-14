import { useEffect } from "react";

const pageTitle = "Our Portfolio";

export default function Portfolio() {
  useEffect(() => {
    document.title = `${pageTitle} | Mitjen Interiors`;
  }, []);

  return (
    <main>
      {/* 1. Page Header */}
      <section
        className={"cs_page_header_style_1 cs_bg_filed cs_gray_bg position-relative"}
        data-src={"/assets/img/page-header-bg1.webp"}
      >
        <div className={"cs_overlay cs_primary_bg position-absolute"}></div>
        <div className={"container"}>
          <div className={"cs_page_header_content text-center"}>
            <h1
              className={"cs_page_header_title cs_fs_80 cs_bold cs_white_color cs_mb_16"}
              style={{ color: "#ffffff" }}
            >
              OUR PORTFOLIO
            </h1>
            <ol className={"breadcrumb cs_center mb-0"}>
              <li className={"breadcrumb-item"}>
                <a href={"/"} aria-label={"Back to home button"}>
                  Home
                </a>
              </li>
              <li className={"breadcrumb-item active"}>Our Portfolio</li>
            </ol>
          </div>
        </div>
      </section>

      {/* 2. Text Marquee Slider */}
      <div className={"cs_horizontal_slider cs_type_1 cs_accent_bg cs_primary_font"}>
        <div className={"cs_slider_inner"}>
          <div className={"cs_sliding_content cs_fs_24 cs_bold cs_white_color"}>
            <span>BUILDING DESIGN</span>
            <img src={"/assets/img/star-shape.svg"} alt={"Star shape"} />
            <span>CONSTRUCTION</span>
            <img src={"/assets/img/star-shape.svg"} alt={"Star shape"} />
            <span>RENOVATION & REMODELING</span>
            <img src={"/assets/img/star-shape.svg"} alt={"Star shape"} />
            <span>INTERIOR & EXTERIOR DESIGN</span>
            <img src={"/assets/img/star-shape.svg"} alt={"Star shape"} />
            <span>BESPOKE ARCHITECTURE</span>
            <img src={"/assets/img/star-shape.svg"} alt={"Star shape"} />
            <span>LUXURY HOME</span>
            <img src={"/assets/img/star-shape.svg"} alt={"Star shape"} />
          </div>
          <div className={"cs_sliding_content cs_fs_24 cs_bold cs_white_color"}>
            <span>BUILDING DESIGN</span>
            <img src={"/assets/img/star-shape.svg"} alt={"Star shape"} />
            <span>CONSTRUCTION</span>
            <img src={"/assets/img/star-shape.svg"} alt={"Star shape"} />
            <span>RENOVATION & REMODELING</span>
            <img src={"/assets/img/star-shape.svg"} alt={"Star shape"} />
            <span>INTERIOR & EXTERIOR DESIGN</span>
            <img src={"/assets/img/star-shape.svg"} alt={"Star shape"} />
            <span>BESPOKE ARCHITECTURE</span>
            <img src={"/assets/img/star-shape.svg"} alt={"Star shape"} />
            <span>LUXURY HOME</span>
            <img src={"/assets/img/star-shape.svg"} alt={"Star shape"} />
          </div>
        </div>
      </div>

      {/* 3. Featured Portfolio Projects Grid */}
      <section className={"cs_service_layout_1"}>
        <div className={"cs_height_120 cs_height_lg_80"}></div>
        <div className={"container"}>
          <div className={"cs_section_heading_style_1 cs_center_column text-center"}>
            <p className={"cs_section_subtitle cs_bold cs_accent_color cs_mb_20 text-uppercase"}>
              OUR PROJECT
            </p>
            <h2 className={"cs_section_title cs_fs_53 cs_semibold text-uppercase mb-0"}>
              SOME OF OUR LATEST PROJECTS.
            </h2>
          </div>
          <div className={"cs_height_60 cs_height_lg_50"}></div>
          <div className={"cs_cards_wrapper_2"} role={"list"} aria-label={"Portfolio projects"}>
            <div className={"cs_card_style_13"} role={"listitem"}>
              <a
                href={"/portfolio/details"}
                className={"cs_card_thumbnail cs_radius_10"}
                aria-label={"View project: House Architecture Design in Manhattan New York"}
              >
                <img
                  src={"/assets/images/projects/image1.jpg"}
                  alt={"Luxury contemporary living salon with bespoke craftsmanship"}
                />
              </a>
              <div className={"cs_card_info"}>
                <p className={"cs_card_subtitle cs_primary_color cs_mb_20"}>
                  <time dateTime={"2025-06-25"}>NEW YORK, NY - JUNE 25, 2025</time>
                </p>
                <h3 className={"cs_card_title cs_fs_53 cs_semibold cs_mb_20"}>
                  <a
                    href={"/portfolio/details"}
                    aria-label={"House Architecture Design in Manhattan New York - project details"}
                  >
                    HOUSE ARCHITECTURE DESIGN IN MANHATTAN NEW YORK
                  </a>
                </h3>
                <a
                  href={"/portfolio/details"}
                  className={"cs_btn_style_1 cs_fs_14 cs_bold cs_primary_font cs_radius_50"}
                  aria-label={"View all architecture projects"}
                >
                  <span>VIEW ALL PROJECTS</span>
                  <span className={"cs_btn_icon cs_radius_100 cs_center"} aria-hidden={"true"}>
                    <svg width={"13"} height={"13"} viewBox={"0 0 14 14"} fill={"none"} xmlns={"http://www.w3.org/2000/svg"}>
                      <path d={"M1 7H13M13 7L7.5 1.5M13 7L7.5 12.5"} stroke={"currentColor"} strokeWidth={"1.8"} strokeLinecap={"round"} strokeLinejoin={"round"}></path>
                    </svg>
                  </span>
                </a>
              </div>
            </div>

            <div className={"cs_card_style_13"} role={"listitem"}>
              <a
                href={"/portfolio/details"}
                className={"cs_card_thumbnail cs_radius_10"}
                aria-label={"View project: Palatial Architectural Gallery"}
              >
                <img
                  src={"/assets/images/projects/image4.jpg"}
                  alt={"Palatial architectural gallery with vaulted arches and grand hallway"}
                />
              </a>
              <div className={"cs_card_info"}>
                <p className={"cs_card_subtitle cs_primary_color cs_mb_20"}>
                  <time dateTime={"2025-06-25"}>NEW YORK, NY - JUNE 25, 2025</time>
                </p>
                <h3 className={"cs_card_title cs_fs_53 cs_semibold cs_mb_20"}>
                  <a
                    href={"/portfolio/details"}
                    aria-label={"Palatial Heritage Gallery Design - project details"}
                  >
                    PALATIAL HERITAGE GALLERY & RESIDENCE
                  </a>
                </h3>
                <a
                  href={"/portfolio/details"}
                  className={"cs_btn_style_1 cs_fs_14 cs_bold cs_primary_font cs_radius_50"}
                  aria-label={"View all architecture projects"}
                >
                  <span>VIEW ALL PROJECTS</span>
                  <span className={"cs_btn_icon cs_radius_100 cs_center"} aria-hidden={"true"}>
                    <svg width={"13"} height={"13"} viewBox={"0 0 14 14"} fill={"none"} xmlns={"http://www.w3.org/2000/svg"}>
                      <path d={"M1 7H13M13 7L7.5 1.5M13 7L7.5 12.5"} stroke={"currentColor"} strokeWidth={"1.8"} strokeLinecap={"round"} strokeLinejoin={"round"}></path>
                    </svg>
                  </span>
                </a>
              </div>
            </div>

            <div className={"cs_card_style_13"} role={"listitem"}>
              <a
                href={"/portfolio/details"}
                className={"cs_card_thumbnail cs_radius_10"}
                aria-label={"View project: Interior Design in Brooklyn Heights New York"}
              >
                <img
                  src={"/assets/images/projects/image10.jpg"}
                  alt={"Elegant minimalist interior design showing sophisticated living space"}
                />
              </a>
              <div className={"cs_card_info"}>
                <p className={"cs_card_subtitle cs_primary_color cs_mb_20"}>
                  <time dateTime={"2025-06-25"}>NEW YORK, NY - JUNE 25, 2025</time>
                </p>
                <h3 className={"cs_card_title cs_fs_53 cs_semibold cs_mb_20"}>
                  <a
                    href={"/portfolio/details"}
                    aria-label={"Interior Design in Brooklyn Heights New York - project details"}
                  >
                    INTERIOR DESIGN IN BROOKLYN HEIGHTS NEW YORK
                  </a>
                </h3>
                <a
                  href={"/portfolio/details"}
                  className={"cs_btn_style_1 cs_fs_14 cs_bold cs_primary_font cs_radius_50"}
                  aria-label={"View all interior design projects"}
                >
                  <span>VIEW ALL PROJECTS</span>
                  <span className={"cs_btn_icon cs_radius_100 cs_center"} aria-hidden={"true"}>
                    <svg width={"13"} height={"13"} viewBox={"0 0 14 14"} fill={"none"} xmlns={"http://www.w3.org/2000/svg"}>
                      <path d={"M1 7H13M13 7L7.5 1.5M13 7L7.5 12.5"} stroke={"currentColor"} strokeWidth={"1.8"} strokeLinecap={"round"} strokeLinejoin={"round"}></path>
                    </svg>
                  </span>
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className={"cs_height_120 cs_height_lg_80"}></div>
      </section>
    </main>
  );
}
