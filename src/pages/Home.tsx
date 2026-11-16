import React, { useEffect } from "react";
import BeforeAfterTransformation from "../components/BeforeAfterTransformation";
import PanoramaViewer from "../components/PanoramaViewer";
import AboutSection from "../components/sections/About";
import ServiceCards from "../components/sections/ServiceCards";
import ApproachSection from "../components/sections/ApproachSection";
import ProjectsSection from "../components/sections/ProjectsSection";
import WhyChooseSection from "../components/sections/WhyChoose";
import TestimonialsSection from "../components/sections/Testimonials";
import ScrollWalkthroughVideoHero from "../components/VideoWalkthroughHero";

// Feature flag: set to true to restore legacy text-marquee or legacy hero banner
const SHOW_LEGACY_MARQUEE = false;
const SHOW_LEGACY_HERO_BANNER = false;

export default function Home() {
  useEffect(() => {
    document.title = "Mitjen Interiors";
    document.body.classList.add("home-dark-theme");
    document.documentElement.classList.add("home-dark-theme");
    return () => {
      document.body.classList.remove("home-dark-theme");
      document.documentElement.classList.remove("home-dark-theme");
    };
  }, []);

  return <>
<main className="cs_home_main">
{SHOW_LEGACY_HERO_BANNER && (
<section className={"cs_hero_style_4 cs_bg_filed cs_gray_bg position-relative"} data-src={"/assets/img/hero-banner1.webp"} aria-label={"Hero section - Architecture that connects people and places"}>
<div className={"cs_hero_overlay position-absolute"} aria-hidden={"true"}></div>
<div className={"container-fluid position-relative z-1"}>
<div className={"row cs_gap_y_40"}>
<div className={"col-lg-7"}>
<div className={"cs_hero_content"}>
<div className={"cs_hero_text cs_mb_40 cs_mb_lg_35"}>
<p className={"cs_hero_subtitle cs_fs_18 cs_bold cs_white_color cs_primary_font cs_mb_20 text-uppercase"}>CREATING A Brighter Future For Property Owners</p>
<h1 className={"cs_hero_title cs_fs_60 cs_bold cs_white_color cs_mb_20"}>ARCHITECTURE THAT CONNECTS PEOPLE AND PLACES.</h1>
<p className={"cs_hero_desc cs_white_color mb-0"}>It shapes how people live, work, and interact with their environment by combining creative vision with technical expertise. From residential homes to commercial complexes and urban landmarks, architecture focuses on structural integrity, efficient use of space, and aesthetic appeal.</p>
</div>
<div className={"cs_funfact_wrapper_1 cs_mb_65 cs_mb_lg_45"}>
<div className={"cs_funfact_style_1"}>
<div className={"cs_funfact_number cs_fs_60 cs_bold cs_white_color cs_primary_font"}>
<span className={"odometer"} data-count-to={"15"}></span><span aria-hidden={"true"}>K</span>
</div>
<div className={"cs_funfact_title cs_fs_14 cs_bold cs_white_color cs_primary_font text-uppercase"}>CLIENT review</div>
</div>
<div className={"cs_funfact_style_1"}>
<div className={"cs_funfact_number cs_fs_60 cs_bold cs_white_color cs_primary_font"}>
<span className={"odometer"} data-count-to={"90"}></span><span aria-hidden={"true"}>K</span>
</div>
<div className={"cs_funfact_title cs_fs_14 cs_bold cs_white_color cs_primary_font text-uppercase"}>WORK REPORT DONE</div>
</div>
<div className={"cs_funfact_style_1"}>
<div className={"cs_funfact_number cs_fs_60 cs_bold cs_white_color cs_primary_font"}>
<span className={"odometer"} data-count-to={"75"}></span><span aria-hidden={"true"}>+</span>
</div>
<div className={"cs_funfact_title cs_fs_14 cs_bold cs_white_color cs_primary_font text-uppercase"}>Happy CUSTOMER</div>
</div>
<div className={"cs_funfact_style_1"}>
<div className={"cs_funfact_number cs_fs_60 cs_bold cs_white_color cs_primary_font"}>
<span className={"odometer"} data-count-to={"11"}></span>
</div>
<div className={"cs_funfact_title cs_fs_14 cs_bold cs_white_color cs_primary_font text-uppercase"}>Bad Reviews</div>
</div>
</div>
<a href={"/contact"} className={"cs_btn_style_1 cs_fs_14 cs_bold cs_primary_font cs_radius_50"} aria-label={"Get started now - contact us"}>
<span>GET STARTED NOW</span>
<span className={"cs_btn_icon cs_radius_100 cs_center"} aria-hidden={"true"}>
<svg width={"13"} height={"13"} viewBox={"0 0 14 14"} fill={"none"} xmlns={"http://www.w3.org/2000/svg"}>
<path d={"M1 7H13M13 7L7.5 1.5M13 7L7.5 12.5"} stroke={"currentColor"} strokeWidth={"1.8"} strokeLinecap={"round"} strokeLinejoin={"round"}></path>
</svg>
</span>
</a>
</div>
</div>
<div className={"col-lg-5"}>
<div className={"cs_height_30 cs_height_lg_0"} aria-hidden={"true"}></div>
<div className={"row cs_gap_y_40"}>
<div className={"col-sm-6"}>
<div className={"cs_card_style_7"}>
<a href={"#"} className={"cs_card_thumbnail cs_radius_10 cs_mb_20"} aria-label={"View Lecturer Office Building project details"}>
<img src={"/assets/img/service-img-12.webp"} alt={"Lecturer Office Building exterior view 1"} />
<img src={"/assets/img/service-img-13.webp"} alt={"Lecturer Office Building exterior view 2"} />
</a>
<div className={"cs_card_info"}>
<h2 className={"cs_card_title cs_fs_18 cs_bold cs_white_color cs_mb_16 text-uppercase"}>
<a href={"#"} aria-label={"Lecturer Office Building - project title link"}>LECTURER OFFICE BUILDING</a>
</h2>
<p className={"cs_card_subtitle cs_white_color mb-0"}>It shapes how people live, work, and interact with their environment by technical expertise.</p>
</div>
</div>
</div>
<div className={"col-sm-6"}>
<div className={"cs_card_style_7"}>
<a href={"#"} className={"cs_card_thumbnail cs_radius_10 cs_mb_20"} aria-label={"View White Blocks House project details"}>
<img src={"/assets/img/service-img-13.webp"} alt={"White Blocks House exterior view 1"} />
<img src={"/assets/img/service-img-12.webp"} alt={"White Blocks House exterior view 2"} />
</a>
<div className={"cs_card_info"}>
<h2 className={"cs_card_title cs_fs_18 cs_bold cs_white_color cs_mb_16 text-uppercase"}>
<a href={"#"} aria-label={"White Blocks House - project title link"}>WHITE BLOCKS HOUSE</a>
</h2>
<p className={"cs_card_subtitle cs_white_color mb-0"}>It shapes how people live, work, and interact with their environment by technical expertise.</p>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</section>
)}
{SHOW_LEGACY_MARQUEE && (
<div className={"cs_horizontal_slider cs_primary_bg cs_bg_filed cs_primary_font"} data-src={"/assets/img/text-bg1.webp"}>
<div className={"cs_slider_inner"}>
<div className={"cs_sliding_content cs_fs_64 cs_bold cs_white_color"}>INTERIOR ARCHITECTURE SPACE . HIGH - END INTERIOR DESIGN. INNOVATE DESIGN IN CANADA</div>
<div className={"cs_sliding_content cs_fs_64 cs_bold cs_white_color"}>INTERIOR ARCHITECTURE SPACE . HIGH - END INTERIOR DESIGN. INNOVATE DESIGN IN CANADA</div>
</div>
</div>
)}
<ScrollWalkthroughVideoHero />
<AboutSection />
<ServiceCards />
<ApproachSection />
<ProjectsSection />
<section className={"cs_skills_layout_1"}>
<div className={"container"}>
<div className={"row cs_gap_y_40 align-items-center"}>
<div className={"col-lg-6"}>
<div className={"cs_skill_thumbnail"}>
<img src={"/assets/images/projects/image9.jpg"} alt={"Mitjen Capabilities - Modern machinery and precision execution"} />
</div>
</div>
<div className={"col-lg-6"}>
<div className={"cs_skill_info"}>
<div className={"cs_section_heading_style_1 cs_mb_30"}>
<p className={"cs_section_subtitle cs_bold cs_accent_color cs_mb_20 text-uppercase"}>OUR CAPABILITIES</p>
<h2 className={"cs_section_title cs_fs_53 cs_bold cs_mb_16"}>TECHNOLOGY THAT SHAPES QUALITY.</h2>
<p className={"mb-0"}>Good interiors need the right tools as well as good ideas. The right technology helps us plan clearly, produce accurately and finish every detail with care, so the final space matches what you imagined.</p>
</div>
<div className={"cs_skill_progress_wrapper"}>
<div className={"cs_skill_progress"}>
<div className={"cs_progress_head cs_fs_24 cs_semibold cs_primary_color cs_primary_font cs_mb_20"}>GERMAN MACHINERY</div>
<div className={"cs_progress"} data-progress={"98"}>
<div className={"cs_progress_in"}><span className={"cs_fs_24 cs_semibold cs_primary_color cs_primary_font"}>98%</span></div>
</div>
</div>
<div className={"cs_skill_progress"}>
<div className={"cs_progress_head cs_fs_24 cs_semibold cs_primary_color cs_primary_font cs_mb_20"}>CNC DETAILING</div>
<div className={"cs_progress"} data-progress={"96"}>
<div className={"cs_progress_in"}><span className={"cs_fs_24 cs_semibold cs_primary_color cs_primary_font"}>96%</span></div>
</div>
</div>
<div className={"cs_skill_progress"}>
<div className={"cs_progress_head cs_fs_24 cs_semibold cs_primary_color cs_primary_font cs_mb_20"}>2D &amp; 3D VISUALS</div>
<div className={"cs_progress"} data-progress={"94"}>
<div className={"cs_progress_in"}><span className={"cs_fs_24 cs_semibold cs_primary_color cs_primary_font"}>94%</span></div>
</div>
</div>
</div>
</div>
</div>
</div>
<div className={"cs_height_50 cs_height_lg_40"}></div>
</div>
</section>

{/* Interactive Architectural Before & After Transformations */}




<WhyChooseSection />
<TestimonialsSection />
<section className={"cs_cta_style_2 cs_primary_bg cs_bg_fixed position-relative"} data-src={"/assets/img/cta-bg2.webp"} aria-label={"Call to action - Unlock your dream home today"}>
<div className={"cs_cta_overlay position-absolute"} aria-hidden={"true"}></div>
<div className={"container"}>
<div className={"cs_cta_content cs_center_column text-center"}>
<div className={"cs_logo_text_wrapper cs_center cs_radius_100 cs_mb_40 position-relative"}>
<div className={"cs_text_logo position-absolute"}>
<img src={"/assets/img/logo-text.svg"} alt={"Mitjen Architectural Design badge"} />
</div>
<span className={"cs_arrow_icon cs_center cs_radius_100 position-absolute"} aria-hidden={"true"}>
<svg width={"22"} height={"12"} viewBox={"0 0 24 12"} fill={"none"} xmlns={"http://www.w3.org/2000/svg"}>
<path d={"M1 6H23M23 6L17.5 1M23 6L17.5 11"} stroke={"currentColor"} strokeWidth={"2"} strokeLinecap={"round"} strokeLinejoin={"round"}></path>
</svg>
</span>
</div>
<h2 className={"cs_cta_title cs_fs_96 cs_bold cs_white_color cs_mb_60 cs_mb_lg_40"}>LET&apos;S BRING YOUR SPACE TO LIFE</h2>
<a href={"/contact"} aria-label={"Start your project with Mitjen Interiors"} className={"cs_btn_style_1 cs_fs_14 cs_bold cs_primary_font cs_radius_50"}>
<span>START YOUR PROJECT</span>
<span className={"cs_btn_icon cs_radius_100 cs_center"} aria-hidden={"true"}>
<svg width={"13"} height={"13"} viewBox={"0 0 14 14"} fill={"none"} xmlns={"http://www.w3.org/2000/svg"}>
<path d={"M1 7H13M13 7L7.5 1.5M13 7L7.5 12.5"} stroke={"currentColor"} strokeWidth={"1.8"} strokeLinecap={"round"} strokeLinejoin={"round"}></path>
</svg>
</span>
</a>
</div>
</div>
</section>
</main>

  </>;
}
