import React, { useEffect } from "react";
import BeforeAfterTransformation from "../components/BeforeAfterTransformation";
import PanoramaViewer from "../components/PanoramaViewer";
import AboutSection from "../components/sections/About";
import ServiceCards from "../components/sections/ServiceCards";

export default function Home() {
  useEffect(() => {
    document.title = "Mitjen Interiors";
  }, []);

  return <>
<main>
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
<a href={"/services/details"} className={"cs_card_thumbnail cs_radius_10 cs_mb_20"} aria-label={"View Lecturer Office Building project details"}>
<img src={"/assets/img/service-img-12.webp"} alt={"Lecturer Office Building exterior view 1"} />
<img src={"/assets/img/service-img-13.webp"} alt={"Lecturer Office Building exterior view 2"} />
</a>
<div className={"cs_card_info"}>
<h2 className={"cs_card_title cs_fs_18 cs_bold cs_white_color cs_mb_16 text-uppercase"}>
<a href={"/services/details"} aria-label={"Lecturer Office Building - project title link"}>LECTURER OFFICE BUILDING</a>
</h2>
<p className={"cs_card_subtitle cs_white_color mb-0"}>It shapes how people live, work, and interact with their environment by technical expertise.</p>
</div>
</div>
</div>
<div className={"col-sm-6"}>
<div className={"cs_card_style_7"}>
<a href={"/services/details"} className={"cs_card_thumbnail cs_radius_10 cs_mb_20"} aria-label={"View White Blocks House project details"}>
<img src={"/assets/img/service-img-13.webp"} alt={"White Blocks House exterior view 1"} />
<img src={"/assets/img/service-img-12.webp"} alt={"White Blocks House exterior view 2"} />
</a>
<div className={"cs_card_info"}>
<h2 className={"cs_card_title cs_fs_18 cs_bold cs_white_color cs_mb_16 text-uppercase"}>
<a href={"/services/details"} aria-label={"White Blocks House - project title link"}>WHITE BLOCKS HOUSE</a>
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
<div className={"cs_horizontal_slider cs_primary_bg cs_bg_filed cs_primary_font"} data-src={"/assets/img/text-bg1.webp"}>
<div className={"cs_slider_inner"}>
<div className={"cs_sliding_content cs_fs_64 cs_bold cs_white_color"}>INTERIOR ARCHITECTURE SPACE . HIGH - END INTERIOR DESIGN. INNOVATE DESIGN IN CANADA</div>
<div className={"cs_sliding_content cs_fs_64 cs_bold cs_white_color"}>INTERIOR ARCHITECTURE SPACE . HIGH - END INTERIOR DESIGN. INNOVATE DESIGN IN CANADA</div>
</div>
</div>
<AboutSection />
<ServiceCards />
<section className={"cs_exceptional_living_section"} aria-label={"Our Services - The Art of Exceptional Living"}>
<div className={"cs_height_120 cs_height_lg_80 cs_exceptional_top_spacer"}></div>
<div className={"container"}>
<div className={"cs_section_heading_style_1 cs_center_column text-center"}>
<p className={"cs_section_subtitle cs_bold cs_accent_color cs_mb_20 text-uppercase"}>OUR SERVICES</p>
<h2 className={"cs_section_title cs_fs_53 cs_semibold text-uppercase mb-0"}>THE ART OF EXCEPTIONAL LIVING</h2>
</div>
<div className={"cs_height_60 cs_height_lg_50 cs_exceptional_mid_spacer"}></div>
<div className={"cs_grid_style_5"}>
<div className={"cs_card_style_7"}>
<a href={"/services/details"} className={"cs_card_thumbnail cs_radius_10"} aria-label={"View Elite Craftsmanship service details"}>
<img src={"/assets/img/service-img-8.webp"} alt={"Elite Craftsmanship service image 1"} />
<img src={"/assets/img/service-img-10.webp"} alt={"Elite Craftsmanship service image 2"} />
</a>
<div className={"cs_card_info"}>
<h3 className={"cs_card_title cs_fs_24 cs_bold cs_mb_16 text-uppercase"}>
<a href={"/services/details"} aria-label={"Elite Craftsmanship - service title link"}>ELITE CRAFTSMANSHIP</a>
</h3>
<p className={"cs_card_subtitle cs_mb_20"}>Architecture is the art and science of designing buildings and spaces that Is balance beauty.</p>
<a href={"/services/details"} className={"cs_text_btn_style_1 cs_fs_14 cs_bold cs_accent_color"} aria-label={"More services - Elite Craftsmanship"}>
<span>MORE SERVICES</span>
<span aria-hidden={"true"}>
<svg width={"13"} height={"13"} viewBox={"0 0 14 14"} fill={"none"} xmlns={"http://www.w3.org/2000/svg"}>
<path d={"M1 7H13M13 7L7.5 1.5M13 7L7.5 12.5"} stroke={"currentColor"} strokeWidth={"1.8"} strokeLinecap={"round"} strokeLinejoin={"round"}></path>
</svg>
</span>
</a>
</div>
</div>
<div className={"cs_card_style_7"}>
<a href={"/services/details"} className={"cs_card_thumbnail cs_radius_10"} aria-label={"View Personalized Design service details"}>
<img src={"/assets/img/service-img-9.webp"} alt={"Personalized Design service image 1"} />
<img src={"/assets/img/service-img-11.webp"} alt={"Personalized Design service image 2"} />
</a>
<div className={"cs_card_info"}>
<h3 className={"cs_card_title cs_fs_24 cs_bold cs_mb_16 text-uppercase"}>
<a href={"/services/details"} aria-label={"Personalized Design - service title link"}>PERSONALIZED DESIGN</a>
</h3>
<p className={"cs_card_subtitle cs_mb_20"}>Architecture is the art and science of designing buildings and spaces that Is balance beauty.</p>
<a href={"/services/details"} className={"cs_text_btn_style_1 cs_fs_14 cs_bold cs_accent_color"} aria-label={"More services - Personalized Design"}>
<span>MORE SERVICES</span>
<span aria-hidden={"true"}>
<svg width={"13"} height={"13"} viewBox={"0 0 14 14"} fill={"none"} xmlns={"http://www.w3.org/2000/svg"}>
<path d={"M1 7H13M13 7L7.5 1.5M13 7L7.5 12.5"} stroke={"currentColor"} strokeWidth={"1.8"} strokeLinecap={"round"} strokeLinejoin={"round"}></path>
</svg>
</span>
</a>
</div>
</div>
<div className={"cs_card_style_7"}>
<a href={"/services/details"} className={"cs_card_thumbnail cs_radius_10"} aria-label={"View Exclusive Locations service details"}>
<img src={"/assets/img/service-img-10.webp"} alt={"Exclusive Locations service image 1"} />
<img src={"/assets/img/service-img-8.webp"} alt={"Exclusive Locations service image 2"} />
</a>
<div className={"cs_card_info"}>
<h3 className={"cs_card_title cs_fs_24 cs_bold cs_mb_16 text-uppercase"}>
<a href={"/services/details"} aria-label={"Exclusive Locations - service title link"}>EXCLUSIVE LOCATIONS</a>
</h3>
<p className={"cs_card_subtitle cs_mb_20"}>Architecture is the art and science of designing buildings and spaces that Is balance beauty.</p>
<a href={"/services/details"} className={"cs_text_btn_style_1 cs_fs_14 cs_bold cs_accent_color"} aria-label={"More services - Exclusive Locations"}>
<span>MORE SERVICES</span>
<span aria-hidden={"true"}>
<svg width={"13"} height={"13"} viewBox={"0 0 14 14"} fill={"none"} xmlns={"http://www.w3.org/2000/svg"}>
<path d={"M1 7H13M13 7L7.5 1.5M13 7L7.5 12.5"} stroke={"currentColor"} strokeWidth={"1.8"} strokeLinecap={"round"} strokeLinejoin={"round"}></path>
</svg>
</span>
</a>
</div>
</div>
<div className={"cs_card_style_7"}>
<a href={"/services/details"} className={"cs_card_thumbnail cs_radius_10"} aria-label={"View Luxury Experience service details"}>
<img src={"/assets/img/service-img-11.webp"} alt={"Luxury Experience service image 1"} />
<img src={"/assets/img/service-img-9.webp"} alt={"Luxury Experience service image 2"} />
</a>
<div className={"cs_card_info"}>
<h3 className={"cs_card_title cs_fs_24 cs_bold cs_mb_16 text-uppercase"}>
<a href={"/services/details"} aria-label={"Luxury Experience - service title link"}>LUXURY EXPERIENCE</a>
</h3>
<p className={"cs_card_subtitle cs_mb_20"}>Architecture is the art and science of designing buildings and spaces that Is balance beauty.</p>
<a href={"/services/details"} className={"cs_text_btn_style_1 cs_fs_14 cs_bold cs_accent_color"} aria-label={"More services - Luxury Experience"}>
<span>MORE SERVICES</span>
<span aria-hidden={"true"}>
<svg width={"13"} height={"13"} viewBox={"0 0 14 14"} fill={"none"} xmlns={"http://www.w3.org/2000/svg"}>
<path d={"M1 7H13M13 7L7.5 1.5M13 7L7.5 12.5"} stroke={"currentColor"} strokeWidth={"1.8"} strokeLinecap={"round"} strokeLinejoin={"round"}></path>
</svg>
</span>
</a>
</div>
</div>
</div>
</div>
</section>
<section>
<div className={"cs_height_120 cs_height_lg_80"}></div>
<div className={"container"}>
<div className={"cs_section_heading_style_1"}>
<p className={"cs_section_subtitle cs_bold cs_accent_color cs_mb_20 text-uppercase"}>OUR PROJECT</p>
<h2 className={"cs_section_title cs_fs_53 cs_semibold text-uppercase mb-0"}>SOME SPACES SOME ICONIC.</h2>
</div>
<div className={"cs_height_60 cs_height_lg_50"}></div>
<div className={"cs_grid_style_4"}>
<div className={"cs_card_style_6 cs_gray_bg cs_radius_10"}>
<a href={"/portfolio/details"} className={"cs_card_thumbnail"} aria-label={"View BAROXXI VEIG'S MUSEUM project details"}>
<img src={"/assets/img/portfolio-img-11.webp"} alt={"BAROXXI VEIG'S MUSEUM - Exterior view"} />
</a>
<div className={"cs_card_content_wrapper position-relative"}>
<div className={"cs_card_content"}>
<div className={"cs_card_header"}>
<h3 className={"cs_card_title cs_fs_18 cs_bold cs_mb_20"}>
<a href={"/portfolio/details"} aria-label={"BAROXXI VEIG'S MUSEUM project"}>BAROXXI VEIG'S MUSEUM</a>
</h3>
<a href={"/portfolio/details"} className={"cs_btn_style_1 cs_fs_14 cs_bold cs_primary_font cs_radius_50"} aria-label={"View LANDSCAPE category projects"}>
<span>LANDSCAPE</span>
<span className={"cs_btn_icon cs_radius_100 cs_center"} aria-hidden={"true"}>
<svg width={"13"} height={"13"} viewBox={"0 0 14 14"} fill={"none"} xmlns={"http://www.w3.org/2000/svg"}>
<path d={"M1 7H13M13 7L7.5 1.5M13 7L7.5 12.5"} stroke={"currentColor"} strokeWidth={"1.8"} strokeLinecap={"round"} strokeLinejoin={"round"}></path>
</svg>
</span>
</a>
</div>
<div className={"cs_card_desc"}>
<hr className={"cs_mb_20 mt-0"} aria-hidden={"true"} />
<p className={"cs_card_subtitle cs_mb_18"}>Buildings and spaces that balance beauty, environment by combining creative.</p>
<a href={"/portfolio/details"} aria-label={"Explore more architecture and design projects"} className={"cs_text_btn_style_1 cs_fs_14 cs_bold cs_accent_color"}>
<span>EXPLORE PROJECTS</span>
<span aria-hidden={"true"}>
<svg width={"13"} height={"13"} viewBox={"0 0 14 14"} fill={"none"} xmlns={"http://www.w3.org/2000/svg"}>
<path d={"M1 7H13M13 7L7.5 1.5M13 7L7.5 12.5"} stroke={"currentColor"} strokeWidth={"1.8"} strokeLinecap={"round"} strokeLinejoin={"round"}></path>
</svg>
</span>
</a>
</div>
</div>
</div>
</div>
<div className={"cs_card_style_6 cs_gray_bg cs_radius_10 active"} aria-current={"true"}>
<a href={"/portfolio/details"} className={"cs_card_thumbnail"} aria-label={"View BAROXXI VEIG'S MUSEUM project details (current project)"}>
<img src={"/assets/img/portfolio-img-12.webp"} alt={"BAROXXI VEIG'S MUSEUM - Interior view"} />
</a>
<div className={"cs_card_content_wrapper position-relative"}>
<div className={"cs_card_content"}>
<div className={"cs_card_header"}>
<h3 className={"cs_card_title cs_fs_18 cs_bold cs_mb_20"}>
<a href={"/portfolio/details"} aria-label={"BAROXXI VEIG'S MUSEUM project (current)"}>BAROXXI VEIG'S MUSEUM</a>
</h3>
<a href={"/portfolio/details"} className={"cs_btn_style_1 cs_fs_14 cs_bold cs_primary_font cs_radius_50"} aria-label={"View LANDSCAPE category projects"}>
<span>LANDSCAPE</span>
<span className={"cs_btn_icon cs_radius_100 cs_center"} aria-hidden={"true"}>
<svg width={"13"} height={"13"} viewBox={"0 0 14 14"} fill={"none"} xmlns={"http://www.w3.org/2000/svg"}>
<path d={"M1 7H13M13 7L7.5 1.5M13 7L7.5 12.5"} stroke={"currentColor"} strokeWidth={"1.8"} strokeLinecap={"round"} strokeLinejoin={"round"}></path>
</svg>
</span>
</a>
</div>
<div className={"cs_card_desc"}>
<hr className={"cs_mb_20 mt-0"} aria-hidden={"true"} />
<p className={"cs_card_subtitle cs_mb_18"}>Buildings and spaces that balance beauty, environment by combining creative.</p>
<a href={"/portfolio/details"} aria-label={"Explore more architecture and design projects"} className={"cs_text_btn_style_1 cs_fs_14 cs_bold cs_accent_color"}>
<span>EXPLORE PROJECTS</span>
<span aria-hidden={"true"}>
<svg width={"13"} height={"13"} viewBox={"0 0 14 14"} fill={"none"} xmlns={"http://www.w3.org/2000/svg"}>
<path d={"M1 7H13M13 7L7.5 1.5M13 7L7.5 12.5"} stroke={"currentColor"} strokeWidth={"1.8"} strokeLinecap={"round"} strokeLinejoin={"round"}></path>
</svg>
</span>
</a>
</div>
</div>
</div>
</div>
<div className={"cs_card_style_6 cs_gray_bg cs_radius_10"}>
<a href={"/portfolio/details"} className={"cs_card_thumbnail"} aria-label={"View BAROXXI VEIG'S MUSEUM project details"}>
<img src={"/assets/img/portfolio-img-13.webp"} alt={"BAROXXI VEIG'S MUSEUM - Architectural detail"} />
</a>
<div className={"cs_card_content_wrapper position-relative"}>
<div className={"cs_card_content"}>
<div className={"cs_card_header"}>
<h3 className={"cs_card_title cs_fs_18 cs_bold cs_mb_20"}>
<a href={"/portfolio/details"} aria-label={"BAROXXI VEIG'S MUSEUM project"}>BAROXXI VEIG'S MUSEUM</a>
</h3>
<a href={"/portfolio/details"} className={"cs_btn_style_1 cs_fs_14 cs_bold cs_primary_font cs_radius_50"} aria-label={"View LANDSCAPE category projects"}>
<span>LANDSCAPE</span>
<span className={"cs_btn_icon cs_radius_100 cs_center"} aria-hidden={"true"}>
<svg width={"13"} height={"13"} viewBox={"0 0 14 14"} fill={"none"} xmlns={"http://www.w3.org/2000/svg"}>
<path d={"M1 7H13M13 7L7.5 1.5M13 7L7.5 12.5"} stroke={"currentColor"} strokeWidth={"1.8"} strokeLinecap={"round"} strokeLinejoin={"round"}></path>
</svg>
</span>
</a>
</div>
<div className={"cs_card_desc"}>
<hr className={"cs_mb_20 mt-0"} aria-hidden={"true"} />
<p className={"cs_card_subtitle cs_mb_18"}>Buildings and spaces that balance beauty, environment by combining creative.</p>
<a href={"/portfolio/details"} aria-label={"Explore more architecture and design projects"} className={"cs_text_btn_style_1 cs_fs_14 cs_bold cs_accent_color"}>
<span>EXPLORE PROJECTS</span>
<span aria-hidden={"true"}>
<svg width={"13"} height={"13"} viewBox={"0 0 14 14"} fill={"none"} xmlns={"http://www.w3.org/2000/svg"}>
<path d={"M1 7H13M13 7L7.5 1.5M13 7L7.5 12.5"} stroke={"currentColor"} strokeWidth={"1.8"} strokeLinecap={"round"} strokeLinejoin={"round"}></path>
</svg>
</span>
</a>
</div>
</div>
</div>
</div>
<div className={"cs_card_style_6 cs_gray_bg cs_radius_10"}>
<a href={"/portfolio/details"} className={"cs_card_thumbnail"} aria-label={"View BAROXXI VEIG'S MUSEUM project details"}>
<img src={"/assets/img/portfolio-img-14.webp"} alt={"BAROXXI VEIG'S MUSEUM - Landscape view"} />
</a>
<div className={"cs_card_content_wrapper position-relative"}>
<div className={"cs_card_content"}>
<div className={"cs_card_header"}>
<h3 className={"cs_card_title cs_fs_18 cs_bold cs_mb_20"}>
<a href={"/portfolio/details"} aria-label={"BAROXXI VEIG'S MUSEUM project"}>BAROXXI VEIG'S MUSEUM</a>
</h3>
<a href={"/portfolio/details"} className={"cs_btn_style_1 cs_fs_14 cs_bold cs_primary_font cs_radius_50"} aria-label={"View LANDSCAPE category projects"}>
<span>LANDSCAPE</span>
<span className={"cs_btn_icon cs_radius_100 cs_center"} aria-hidden={"true"}>
<svg width={"13"} height={"13"} viewBox={"0 0 14 14"} fill={"none"} xmlns={"http://www.w3.org/2000/svg"}>
<path d={"M1 7H13M13 7L7.5 1.5M13 7L7.5 12.5"} stroke={"currentColor"} strokeWidth={"1.8"} strokeLinecap={"round"} strokeLinejoin={"round"}></path>
</svg>
</span>
</a>
</div>
<div className={"cs_card_desc"}>
<hr className={"cs_mb_20 mt-0"} aria-hidden={"true"} />
<p className={"cs_card_subtitle cs_mb_18"}>Buildings and spaces that balance beauty, environment by combining creative.</p>
<a href={"/portfolio/details"} aria-label={"Explore more architecture and design projects"} className={"cs_text_btn_style_1 cs_fs_14 cs_bold cs_accent_color"}>
<span>EXPLORE PROJECTS</span>
<span aria-hidden={"true"}>
<svg width={"13"} height={"13"} viewBox={"0 0 14 14"} fill={"none"} xmlns={"http://www.w3.org/2000/svg"}>
<path d={"M1 7H13M13 7L7.5 1.5M13 7L7.5 12.5"} stroke={"currentColor"} strokeWidth={"1.8"} strokeLinecap={"round"} strokeLinejoin={"round"}></path>
</svg>
</span>
</a>
</div>
</div>
</div>
</div>
</div>
</div>
<div className={"cs_height_120 cs_height_lg_80"}></div>
</section>
<section className={"cs_skills_layout_1"}>
<div className={"container"}>
<div className={"row cs_gap_y_40 align-items-center"}>
<div className={"col-lg-6"}>
<div className={"cs_skill_thumbnail"}>
<img src={"/assets/img/skill-img-1.webp"} alt={"Skill image"} />
</div>
</div>
<div className={"col-lg-6"}>
<div className={"cs_skill_info"}>
<div className={"cs_section_heading_style_1 cs_mb_30"}>
<p className={"cs_section_subtitle cs_bold cs_accent_color cs_mb_20 text-uppercase"}>OUR SKILLS</p>
<h2 className={"cs_section_title cs_fs_53 cs_bold cs_mb_16"}>THE CORE COMPANY VALUES</h2>
<p className={"mb-0"}>Architecture and interior design blend creativity with functionality, shaping spaces that aesthetic harmony of a building, while interior design breathes life into it with thoughtful layouts, textures, colors, and materials. </p>
</div>
<div className={"cs_skill_progress_wrapper"}>
<div className={"cs_skill_progress"}>
<div className={"cs_progress_head cs_fs_24 cs_semibold cs_primary_color cs_primary_font cs_mb_20"}>Interior Sketch</div>
<div className={"cs_progress"} data-progress={"65"}>
<div className={"cs_progress_in"}><span className={"cs_fs_24 cs_semibold cs_primary_color cs_primary_font"}>65%</span></div>
</div>
</div>
<div className={"cs_skill_progress"}>
<div className={"cs_progress_head cs_fs_24 cs_semibold cs_primary_color cs_primary_font cs_mb_20"}>3D Modeling</div>
<div className={"cs_progress"} data-progress={"85"}>
<div className={"cs_progress_in"}><span className={"cs_fs_24 cs_semibold cs_primary_color cs_primary_font"}>85%</span></div>
</div>
</div>
<div className={"cs_skill_progress"}>
<div className={"cs_progress_head cs_fs_24 cs_semibold cs_primary_color cs_primary_font cs_mb_20"}>2D Planning</div>
<div className={"cs_progress"} data-progress={"55"}>
<div className={"cs_progress_in"}><span className={"cs_fs_24 cs_semibold cs_primary_color cs_primary_font"}>55%</span></div>
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




<section>

<div className={"container"}>
<div className={"cs_section_heading_style_1 cs_center_column text-center"}>
<p className={"cs_section_subtitle cs_bold cs_accent_color cs_mb_20 text-uppercase"}>WHY CHOOSE US</p>
<h2 className={"cs_section_title cs_fs_60 cs_semibold mb-0"}>WHY CHOOSE Mitjen</h2>
</div>
<div className={"cs_height_60 cs_height_lg_50"}></div>
<div className={"row cs_gap_y_30"}>
<div className={"col-md-6"}>
<div className={"cs_iconbox_style_5 cs_gray_bg cs_radius_10"}>
<span className={"cs_iconbox_icon cs_center cs_radius_10"}>
<img src={"/assets/img/icons/expertise.svg"} alt={"Icon"} />
</span>
<div className={"cs_iconbox_info"}>
<div className={"cs_iconbox_header cs_mb_10"}>
<h3 className={"cs_iconbox_title cs_fs_24 cs_bold mb-0 text-uppercase"}>TRUSTED EXPERTISE</h3>
<span className={"cs_iconbox_index cs_fs_24 cs_bold cs_primary_font"}>01</span>
</div>
<p className={"cs_iconbox_subtitle mb-0"}>Architecture is the art and science of designing buildings and  vision with technical expertise. From Is residential homes to Is commercial complexes and urban landmarks.</p>
</div>
</div>
</div>
<div className={"col-md-6"}>
<div className={"cs_iconbox_style_5 cs_gray_bg cs_radius_10"}>
<span className={"cs_iconbox_icon cs_center cs_radius_10"}>
<img src={"/assets/img/icons/design.svg"} alt={"Icon"} />
</span>
<div className={"cs_iconbox_info"}>
<div className={"cs_iconbox_header cs_mb_10"}>
<h3 className={"cs_iconbox_title cs_fs_24 cs_bold mb-0 text-uppercase"}>TAILORED DESIGNS</h3>
<span className={"cs_iconbox_index cs_fs_24 cs_bold cs_primary_font"}>02</span>
</div>
<p className={"cs_iconbox_subtitle mb-0"}>Architecture is the art and science of designing buildings and  vision with technical expertise. From Is residential homes to Is commercial complexes and urban landmarks.</p>
</div>
</div>
</div>
<div className={"col-md-6"}>
<div className={"cs_iconbox_style_5 cs_gray_bg cs_radius_10"}>
<span className={"cs_iconbox_icon cs_center cs_radius_10"}>
<img src={"/assets/img/icons/chair3.svg"} alt={"Icon"} />
</span>
<div className={"cs_iconbox_info"}>
<div className={"cs_iconbox_header cs_mb_10"}>
<h3 className={"cs_iconbox_title cs_fs_24 cs_bold mb-0 text-uppercase"}>SEMLESS PROCESS</h3>
<span className={"cs_iconbox_index cs_fs_24 cs_bold cs_primary_font"}>03</span>
</div>
<p className={"cs_iconbox_subtitle mb-0"}>Architecture is the art and science of designing buildings and  vision with technical expertise. From Is residential homes to Is commercial complexes and urban landmarks.</p>
</div>
</div>
</div>
<div className={"col-md-6"}>
<div className={"cs_iconbox_style_5 cs_gray_bg cs_radius_10"}>
<span className={"cs_iconbox_icon cs_center cs_radius_10"}>
<img src={"/assets/img/icons/quality.svg"} alt={"Icon"} />
</span>
<div className={"cs_iconbox_info"}>
<div className={"cs_iconbox_header cs_mb_10"}>
<h3 className={"cs_iconbox_title cs_fs_24 cs_bold mb-0 text-uppercase"}>LASTING QUALITY</h3>
<span className={"cs_iconbox_index cs_fs_24 cs_bold cs_primary_font"}>04</span>
</div>
<p className={"cs_iconbox_subtitle mb-0"}>Architecture is the art and science of designing buildings and  vision with technical expertise. From Is residential homes to Is commercial complexes and urban landmarks.</p>
</div>
</div>
</div>
<div className={"col-md-6"}>
<div className={"cs_iconbox_style_5 cs_gray_bg cs_radius_10"}>
<span className={"cs_iconbox_icon cs_center cs_radius_10"}>
<img src={"/assets/img/icons/design.svg"} alt={"Icon"} />
</span>
<div className={"cs_iconbox_info"}>
<div className={"cs_iconbox_header cs_mb_10"}>
<h3 className={"cs_iconbox_title cs_fs_24 cs_bold mb-0 text-uppercase"}>CLEAR COMMUNICATION</h3>
<span className={"cs_iconbox_index cs_fs_24 cs_bold cs_primary_font"}>05</span>
</div>
<p className={"cs_iconbox_subtitle mb-0"}>Architecture is the art and science of designing buildings and  vision with technical expertise. From Is residential homes to Is commercial complexes and urban landmarks.</p>
</div>
</div>
</div>
<div className={"col-md-6"}>
<div className={"cs_iconbox_style_5 cs_gray_bg cs_radius_10"}>
<span className={"cs_iconbox_icon cs_center cs_radius_10"}>
<img src={"/assets/img/icons/expertise.svg"} alt={"Icon"} />
</span>
<div className={"cs_iconbox_info"}>
<div className={"cs_iconbox_header cs_mb_10"}>
<h3 className={"cs_iconbox_title cs_fs_24 cs_bold mb-0 text-uppercase"}>SKILED TEAM</h3>
<span className={"cs_iconbox_index cs_fs_24 cs_bold cs_primary_font"}>06</span>
</div>
<p className={"cs_iconbox_subtitle mb-0"}>Architecture is the art and science of designing buildings and  vision with technical expertise. From Is residential homes to Is commercial complexes and urban landmarks.</p>
</div>
</div>
</div>
</div>
<div className={"cs_height_40 cs_height_lg_40"}></div>
<div className={"cs_why_choose_summery cs_center_column text-center"}>
<p className={"cs_summery cs_mb_30"}>Architecture is the art and science of designing buildings and spaces that balance beauty,<br /> environment by combining creative vision with technical expertise. From Is residential homes to <br /> commercial complexes and urban landmarks.</p>
<a href={"/about"} className={"cs_text_btn_style_1 cs_fs_14 cs_bold cs_accent_color"} aria-label={"Learn more about us"}>
<span>READ MORE</span>
<span aria-hidden={"true"}>
<svg width={"13"} height={"13"} viewBox={"0 0 14 14"} fill={"none"} xmlns={"http://www.w3.org/2000/svg"}>
<path d={"M1 7H13M13 7L7.5 1.5M13 7L7.5 12.5"} stroke={"currentColor"} strokeWidth={"1.8"} strokeLinecap={"round"} strokeLinejoin={"round"}></path>
</svg>
</span>
</a>
</div>
</div>
</section>
<section className={"cs_testimonial_style_4 position-relative"}>
<div className={"cs_height_120 cs_height_lg_80"}></div>
<div className={"container"}>
<div className={"row cs_gap_y_40"}>
<div className={"col-lg-5 col-xl-6"}>
<div className={"cs_testimonial_left cs_white_bg position-relative z-2"}>
<div className={"cs_section_heading_style_1 cs_mb_10"}>
<p className={"cs_section_subtitle cs_bold cs_accent_color cs_mb_20 text-uppercase"}>TESTIMONIALS</p>
<h2 className={"cs_section_title cs_fs_53 cs_semibold cs_mb_30"}>STORIES FROM CLIENTS</h2>
<p className={"mb-0"}>Architecture is the art and science of designing buildings and spaces that balance
                  beauty, environment by combining creative vision with technical expertise.</p>
</div>
<div className={"cs_arrow_shape"}>
<svg width={"626"} height={"197"} viewBox={"0 0 626 197"} fill={"none"} xmlns={"http://www.w3.org/2000/svg"}>
<path opacity={"0.3"} d={"M625.713 5.77344L615.713 -6.53267e-05V11.5469L625.713 5.77344ZM1 5.77344H0V185.89H1H2V5.77344H1ZM11 195.89V196.89H399.888V195.89V194.89H11V195.89ZM409.888 185.89H410.888V15.7734H409.888H408.888V185.89H409.888ZM419.888 5.77344V6.77344H616.713V5.77344V4.77344H419.888V5.77344ZM409.888 15.7734H410.888C410.888 10.8029 414.917 6.77344 419.888 6.77344V5.77344V4.77344C413.813 4.77344 408.888 9.69831 408.888 15.7734H409.888ZM399.888 195.89V196.89C405.963 196.89 410.888 191.965 410.888 185.89H409.888H408.888C408.888 190.86 404.858 194.89 399.888 194.89V195.89ZM1 185.89H0C0 191.965 4.92487 196.89 11 196.89V195.89V194.89C6.02944 194.89 2 190.86 2 185.89H1Z"} fill={"#D9D9D9"}></path>
</svg>
</div>
</div>
</div>
<div className={"col-lg-7 col-xl-6"}>
<div className={"cs_testimonial_right cs_overflow_visible z-1"}>
<div className={"swiper"} data-autoplay={"0"} data-loop={"0"} data-center={"0"} data-speed={"800"} data-variable-width={"0"} data-slides-per-view={"responsive"} data-gap={"24"} data-effect={"slide"} data-mobile-sm={"1"} data-mobile={"1"} data-tablet-sm={"1"} data-tablet={"2"} data-laptop={"2"} data-desktop={"2"} data-desktop-lg={"2"}>
<div className={"swiper-wrapper"}>
<div className={"swiper-slide"}>
<div className={"cs_client_review cs_gray_bg cs_radius_10"}>
<div className={"cs_testimonial_rating cs_mb_20"} aria-label={"5 out of 5 stars rating"}>
<div className={"cs_rating_stars"}>
<svg width={"18"} height={"18"} viewBox={"0 0 24 24"} fill={"currentColor"} xmlns={"http://www.w3.org/2000/svg"} aria-hidden={"true"}><path d={"M12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.63L12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27Z"}></path></svg>
<svg width={"18"} height={"18"} viewBox={"0 0 24 24"} fill={"currentColor"} xmlns={"http://www.w3.org/2000/svg"} aria-hidden={"true"}><path d={"M12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.63L12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27Z"}></path></svg>
<svg width={"18"} height={"18"} viewBox={"0 0 24 24"} fill={"currentColor"} xmlns={"http://www.w3.org/2000/svg"} aria-hidden={"true"}><path d={"M12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.63L12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27Z"}></path></svg>
<svg width={"18"} height={"18"} viewBox={"0 0 24 24"} fill={"currentColor"} xmlns={"http://www.w3.org/2000/svg"} aria-hidden={"true"}><path d={"M12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.63L12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27Z"}></path></svg>
<svg width={"18"} height={"18"} viewBox={"0 0 24 24"} fill={"currentColor"} xmlns={"http://www.w3.org/2000/svg"} aria-hidden={"true"}><path d={"M12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.63L12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27Z"}></path></svg>
</div>
</div>
<p className={"cs_client_comment mb-0"}>Commercial complexes and urban landmarks, architecture focuses
                        Is on structural integrity, efficient use of space, and aesthetic.</p>
<div className={"mt-auto"}>
<hr className={"cs_mb_30 mt-0"} />
<div className={"cs_avatar_style_1"}>
<span className={"cs_avatar_icon cs_radius_5"}>
<img src={"/assets/img/avatar-3.webp"} alt={"Avatar"} />
</span>
<div className={"cs_avatar_info"}>
<h3 className={"cs_avatar_title cs_fs_18 cs_bold cs_mb_7 text-uppercase"}>ESTHER HOWARD</h3>
<p className={"cs_avatar_sibtitle cs_fs_14 mb-0 text-uppercase"}>FOUNDER & CEO</p>
</div>
</div>
</div>
</div>
</div>
<div className={"swiper-slide"}>
<div className={"cs_client_review cs_gray_bg cs_radius_10"}>
<div className={"cs_testimonial_rating cs_mb_20"} aria-label={"5 out of 5 stars rating"}>
<div className={"cs_rating_stars"}>
<svg width={"18"} height={"18"} viewBox={"0 0 24 24"} fill={"currentColor"} xmlns={"http://www.w3.org/2000/svg"} aria-hidden={"true"}><path d={"M12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.63L12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27Z"}></path></svg>
<svg width={"18"} height={"18"} viewBox={"0 0 24 24"} fill={"currentColor"} xmlns={"http://www.w3.org/2000/svg"} aria-hidden={"true"}><path d={"M12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.63L12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27Z"}></path></svg>
<svg width={"18"} height={"18"} viewBox={"0 0 24 24"} fill={"currentColor"} xmlns={"http://www.w3.org/2000/svg"} aria-hidden={"true"}><path d={"M12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.63L12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27Z"}></path></svg>
<svg width={"18"} height={"18"} viewBox={"0 0 24 24"} fill={"currentColor"} xmlns={"http://www.w3.org/2000/svg"} aria-hidden={"true"}><path d={"M12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.63L12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27Z"}></path></svg>
<svg width={"18"} height={"18"} viewBox={"0 0 24 24"} fill={"currentColor"} xmlns={"http://www.w3.org/2000/svg"} aria-hidden={"true"}><path d={"M12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.63L12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27Z"}></path></svg>
</div>
</div>
<p className={"cs_client_comment mb-0"}>Commercial complexes and urban landmarks, architecture focuses
                        Is on structural integrity, efficient use of space, and aesthetic.</p>
<div className={"mt-auto"}>
<hr className={"cs_mb_30 mt-0"} />
<div className={"cs_avatar_style_1"}>
<span className={"cs_avatar_icon cs_radius_5"}>
<img src={"/assets/img/avatar-4.webp"} alt={"Avatar"} />
</span>
<div className={"cs_avatar_info"}>
<h3 className={"cs_avatar_title cs_fs_18 cs_bold cs_mb_7 text-uppercase"}>ASTER HOWARD</h3>
<p className={"cs_avatar_sibtitle cs_fs_14 mb-0 text-uppercase"}>FOUNDER & CEO</p>
</div>
</div>
</div>
</div>
</div>
<div className={"swiper-slide"}>
<div className={"cs_client_review cs_gray_bg cs_radius_10"}>
<div className={"cs_testimonial_rating cs_mb_20"} aria-label={"5 out of 5 stars rating"}>
<div className={"cs_rating_stars"}>
<svg width={"18"} height={"18"} viewBox={"0 0 24 24"} fill={"currentColor"} xmlns={"http://www.w3.org/2000/svg"} aria-hidden={"true"}><path d={"M12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.63L12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27Z"}></path></svg>
<svg width={"18"} height={"18"} viewBox={"0 0 24 24"} fill={"currentColor"} xmlns={"http://www.w3.org/2000/svg"} aria-hidden={"true"}><path d={"M12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.63L12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27Z"}></path></svg>
<svg width={"18"} height={"18"} viewBox={"0 0 24 24"} fill={"currentColor"} xmlns={"http://www.w3.org/2000/svg"} aria-hidden={"true"}><path d={"M12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.63L12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27Z"}></path></svg>
<svg width={"18"} height={"18"} viewBox={"0 0 24 24"} fill={"currentColor"} xmlns={"http://www.w3.org/2000/svg"} aria-hidden={"true"}><path d={"M12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.63L12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27Z"}></path></svg>
<svg width={"18"} height={"18"} viewBox={"0 0 24 24"} fill={"currentColor"} xmlns={"http://www.w3.org/2000/svg"} aria-hidden={"true"}><path d={"M12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.63L12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27Z"}></path></svg>
</div>
</div>
<p className={"cs_client_comment mb-0"}>Commercial complexes and urban landmarks, architecture focuses
                        Is on structural integrity, efficient use of space, and aesthetic.</p>
<div className={"mt-auto"}>
<hr className={"cs_mb_30 mt-0"} />
<div className={"cs_avatar_style_1"}>
<span className={"cs_avatar_icon cs_radius_5"}>
<img src={"/assets/img/avatar-3.webp"} alt={"Avatar"} />
</span>
<div className={"cs_avatar_info"}>
<h3 className={"cs_avatar_title cs_fs_18 cs_bold cs_mb_7 text-uppercase"}>JOHN PHILIPE</h3>
<p className={"cs_avatar_sibtitle cs_fs_14 mb-0 text-uppercase"}>FOUNDER & CEO</p>
</div>
</div>
</div>
</div>
</div>
</div>
<div className={"cs_height_0 cs_height_lg_40"}></div>
<div className={"cs_swiper_arrow_style_1"}>
<div className={"slider-prev cs_center cs_radius_100"} aria-label={"Previous testimonial"}>
<svg width={"16"} height={"16"} viewBox={"0 0 16 16"} fill={"none"} xmlns={"http://www.w3.org/2000/svg"} aria-hidden={"true"}>
<path d={"M15 8H1M1 8L8 1M1 8L8 15"} stroke={"currentColor"} strokeWidth={"1.8"} strokeLinecap={"round"} strokeLinejoin={"round"}></path>
</svg>
</div>
<div className={"slider-next cs_center cs_radius_100"} aria-label={"Next testimonial"}>
<svg width={"16"} height={"16"} viewBox={"0 0 16 16"} fill={"none"} xmlns={"http://www.w3.org/2000/svg"} aria-hidden={"true"}>
<path d={"M1 8H15M15 8L8 1M15 8L8 15"} stroke={"currentColor"} strokeWidth={"1.8"} strokeLinecap={"round"} strokeLinejoin={"round"}></path>
</svg>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</section>
<div className={"cs_height_50 cs_height_lg_80"}></div>
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
<h2 className={"cs_cta_title cs_fs_96 cs_bold cs_white_color cs_mb_60 cs_mb_lg_40"}>UNLOCK YOUR DREAM HOME TODAY</h2>
<a href={"/contact"} aria-label={"Book an appointment through our contact page"} className={"cs_btn_style_1 cs_fs_14 cs_bold cs_primary_font cs_radius_50"}>
<span>BOOK APPOINTMENT</span>
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
