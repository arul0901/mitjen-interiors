import { useEffect } from "react";
import ArchitecturalProjectShowcase from "../components/ArchitecturalShowcase/ArchitecturalProjectShowcase";

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
            <span>RESIDENTIAL INTERIORS</span>
            <img src={"/assets/img/star-shape.svg"} alt={"Star shape"} />
            <span>BESPOKE ARCHITECTURE</span>
            <img src={"/assets/img/star-shape.svg"} alt={"Star shape"} />
            <span>LUXURY VILLAS</span>
            <img src={"/assets/img/star-shape.svg"} alt={"Star shape"} />
            <span>CUSTOM MILLWORK</span>
            <img src={"/assets/img/star-shape.svg"} alt={"Star shape"} />
            <span>TURNKEY EXECUTION</span>
            <img src={"/assets/img/star-shape.svg"} alt={"Star shape"} />
          </div>
          <div className={"cs_sliding_content cs_fs_24 cs_bold cs_white_color"}>
            <span>RESIDENTIAL INTERIORS</span>
            <img src={"/assets/img/star-shape.svg"} alt={"Star shape"} />
            <span>BESPOKE ARCHITECTURE</span>
            <img src={"/assets/img/star-shape.svg"} alt={"Star shape"} />
            <span>LUXURY VILLAS</span>
            <img src={"/assets/img/star-shape.svg"} alt={"Star shape"} />
            <span>CUSTOM MILLWORK</span>
            <img src={"/assets/img/star-shape.svg"} alt={"Star shape"} />
            <span>TURNKEY EXECUTION</span>
            <img src={"/assets/img/star-shape.svg"} alt={"Star shape"} />
          </div>
        </div>
      </div>

      {/* 3. Art-Directed Architectural Project Showcase */}
      <ArchitecturalProjectShowcase />
    </main>
  );
}
