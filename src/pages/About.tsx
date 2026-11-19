import { useEffect } from "react";
import HowItWorksSection from "../components/HowItWorksSection";
import MaterialsGallery from "../components/MaterialsGallery";
import AboutVaneBanner from "../components/AboutVaneBanner/AboutVaneBanner";
import ProjectsReflectOurRange from "../components/ProjectsReflectOurRange/ProjectsReflectOurRange";
import ArchitecturalParticleLogo from "../components/ArchitecturalParticleLogo/ArchitecturalParticleLogo";

const pageTitle = "About Us";

export default function About() {
  useEffect(() => {
    document.title = `${pageTitle} | Mitjen Interiors`;
  }, []);

  return (
    <main>
      {/* 1. Kinetic Vane Hero Banner (2 Images) */}
      <AboutVaneBanner />

      {/* 2. Interactive Architectural Particle Wordmark Banner */}
      <ArchitecturalParticleLogo />

      {/* 3. Text Marquee Slider */}
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
            <span>LUXURY LIVING</span>
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
            <span>LUXURY LIVING</span>
            <img src={"/assets/img/star-shape.svg"} alt={"Star shape"} />
          </div>
        </div>
      </div>

      {/* 3. Studio Story / Mission & Vision */}
      <section className={"cs_about_style_7"}>
        <div className={"cs_height_120 cs_height_lg_80"}></div>
        <div className={"container"}>
          <div className={"row cs_gap_y_40 align-items-center"}>
            <div className={"col-lg-5 order-lg-2"}>
              <div className={"cs_about_img_wrapper position-relative"}>
                <div className={"cs_about_img1 cs_radius_10"}>
                  <img src={"/assets/images/projects/image8.jpg"} alt={"Architectural interior showcase"} />
                </div>
              </div>
            </div>
            <div className={"col-lg-7"}>
              <div className={"cs_about_text"}>
                <div className={"cs_section_heading_style_1 cs_mb_18"}>
                  <p className={"cs_section_subtitle cs_bold cs_accent_color cs_mb_10"}>ABOUT MITJEN</p>
                  <h2 className={"cs_section_title cs_fs_53 cs_semibold mb-0"}>
                    DESIGNING SPACES THAT FEEL LIKE A LUXURY SANCTUARY.
                  </h2>
                </div>
                <div className={"cs_about_desc cs_mb_30"}>
                  Architecture shapes how people live, work, and interact with their environment by combining
                  visionary aesthetics with uncompromising technical mastery. From private residences to
                  heritage restorations, we focus on spatial equilibrium, light sculpting, and material authenticity.
                </div>
                <div className={"cs_about_features cs_mb_40"}>
                  <div className={"cs_about_feature cs_gray_bg cs_radius_10"}>
                    <div className={"cs_feature_header cs_mb_12"}>
                      <h3 className={"cs_feature_title cs_fs_24 cs_bold mb-0"}>OUR MISSION</h3>
                      <span className={"cs_feature_icon"}>
                        <img src={"/assets/img/icons/innovation.svg"} alt={"Innovation icon"} />
                      </span>
                    </div>
                    <p className={"cs_feature_desc"}>
                      To sculpt environments that inspire emotional connection, balance structural integrity with
                      pure visual elegance, and stand the test of time.
                    </p>
                  </div>
                  <div className={"cs_about_feature cs_gray_bg cs_radius_10"}>
                    <div className={"cs_feature_header cs_mb_12"}>
                      <h3 className={"cs_feature_title cs_fs_24 cs_bold mb-0"}>OUR VISION</h3>
                      <span className={"cs_feature_icon"}>
                        <img src={"/assets/img/icons/design.svg"} alt={"Design icon"} />
                      </span>
                    </div>
                    <p className={"cs_feature_desc"}>
                      To lead the frontier of conscious luxury architecture—where sustainable engineering and
                      handcrafted bespoke finishes converge seamlessly.
                    </p>
                  </div>
                </div>
                <a
                  href={"/services"}
                  aria-label={"View all services"}
                  className={"cs_btn_style_1 cs_fs_14 cs_bold cs_primary_font cs_radius_50 text-uppercase"}
                >
                  <span>EXPLORE SOLUTIONS</span>
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
      {/* Projects That Reflect Our Range (Horizontal Accordion & Mobile Grid) */}
      <ProjectsReflectOurRange />
      {/* 4. Core Services Showcase Strip */}
      {/* <section className={"cs_gray_bg"}>
        <div className={"cs_height_120 cs_height_lg_80"}></div>
        <div className={"container-fluid"}>
          <div className={"cs_section_heading_style_1 cs_center_column text-center"}>
            <p className={"cs_section_subtitle cs_bold cs_accent_color cs_mb_20 text-uppercase"}>
              OUR EXPERTISE
            </p>
            <h2 className={"cs_section_title cs_fs_60 cs_semibold mb-0"}>THE ART OF EXCEPTIONAL LIVING</h2>
          </div>
          <div className={"cs_height_60 cs_height_lg_50"}></div>
          <div className={"px-3 overflow-hidden"}>
            <div className={"cs_grid_style_8"}>
              <div className={"cs_card_style_12"}>
                <a href={"/services/details"} className={"cs_card_thumbnail cs_radius_10 cs_mb_45"} aria-label={"View details about Elite Craftsmanship service"}>
                  <img src={"/assets/images/projects/image1.jpg"} alt={"Luxury craftsmanship example showing bespoke interior living room"} />
                </a>
                <div className={"cs_card_info"}>
                  <h3 className={"cs_card_title cs_fs_24 cs_semibold cs_mb_10 text-uppercase"}>
                    <a href={"/services/details"}>ELITE CRAFTSMANSHIP</a>
                  </h3>
                  <p className={"cs_card_subtitle mb-0"}>
                    Precision millwork and hand-finished stone tailored to bespoke architectural tolerances.
                  </p>
                </div>
              </div>

              <div className={"cs_card_style_12"}>
                <a href={"/services/details"} className={"cs_card_thumbnail cs_radius_10 cs_mb_45"} aria-label={"View details about Personalized Design service"}>
                  <img src={"/assets/images/projects/image10.jpg"} alt={"Custom design consultation showcasing minimalist luxury lounge"} />
                </a>
                <div className={"cs_card_info"}>
                  <h3 className={"cs_card_title cs_fs_24 cs_semibold cs_mb_10 text-uppercase"}>
                    <a href={"/services/details"}>PERSONALIZED DESIGN</a>
                  </h3>
                  <p className={"cs_card_subtitle mb-0"}>
                    Spatial compositions tailored to individual lifestyles, diurnal light, and sensory wellbeing.
                  </p>
                </div>
              </div>

              <div className={"cs_card_style_12"}>
                <a href={"/services/details"} className={"cs_card_thumbnail cs_radius_10 cs_mb_45"} aria-label={"View details about Exclusive Locations service"}>
                  <img src={"/assets/images/projects/image4.jpg"} alt={"Premium property location with palatial architectural gallery"} />
                </a>
                <div className={"cs_card_info"}>
                  <h3 className={"cs_card_title cs_fs_24 cs_semibold cs_mb_10 text-uppercase"}>
                    <a href={"/services/details"}>EXCLUSIVE RESIDENCES</a>
                  </h3>
                  <p className={"cs_card_subtitle mb-0"}>
                    High-end architectural homes harmonizing with pristine coastal and urban panoramic vistas.
                  </p>
                </div>
              </div>

              <div className={"cs_card_style_12"}>
                <a href={"/services/details"} className={"cs_card_thumbnail cs_radius_10 cs_mb_45"} aria-label={"View details about Luxury Experience service"}>
                  <img src={"/assets/images/projects/image18.jpg"} alt={"Curated interiors and living experience with designer seating"} />
                </a>
                <div className={"cs_card_info"}>
                  <h3 className={"cs_card_title cs_fs_24 cs_semibold cs_mb_10 text-uppercase"}>
                    <a href={"/services/details"}>CURATED INTERIORS</a>
                  </h3>
                  <p className={"cs_card_subtitle mb-0"}>
                    Bespoke furnishings, museum-grade art curation, and custom acoustic architecture.
                  </p>
                </div>
              </div>

              <div className={"cs_card_style_12"}>
                <a href={"/services/details"} className={"cs_card_thumbnail cs_radius_10 cs_mb_45"} aria-label={"View details about Design and Planning service"}>
                  <img src={"/assets/images/projects/image5.jpg"} alt={"Architectural design and planning session in timber lounge"} />
                </a>
                <div className={"cs_card_info"}>
                  <h3 className={"cs_card_title cs_fs_24 cs_semibold cs_mb_10 text-uppercase"}>
                    <a href={"/services/details"}>DESIGN & PLANNING</a>
                  </h3>
                  <p className={"cs_card_subtitle mb-0"}>
                    End-to-end municipal zoning, technical engineering, and turnkey site governance.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={"cs_height_120 cs_height_lg_80"}></div>
      </section> */}

      {/* 5. Why Choose Us / Craftsmanship Standards */}
      <section className={"cs_about_style_1 cs_type_1"}>
        <div className={"cs_height_120 cs_height_lg_80"}></div>
        <div className={"container"}>
          <div className={"row cs_gap_y_40 align-items-center"}>
            <div className={"col-lg-6 order-lg-2"}>
              <div className={"cs_about_img_wrapper position-relative"}>
                <div className={"cs_about_img1 cs_radius_10"}>
                  <img src={"/assets/images/projects/image20.jpg"} alt={"Living space architectural execution"} />
                </div>
              </div>
            </div>
            <div className={"col-lg-6"}>
              <div className={"cs_skill_info"}>
                <div className={"cs_section_heading_style_1 cs_mb_40"}>
                  <p className={"cs_section_subtitle cs_bold cs_accent_color cs_mb_10 text-uppercase"}>
                    WHY CHOOSE US
                  </p>
                  <h2 className={"cs_section_title cs_fs_53 cs_semibold cs_mb_20 text-uppercase"}>
                    CREATING BEAUTY ONE SPACE AT A TIME.
                  </h2>
                  <p className={"cs_mb_20"}>
                    Architecture and interior curation converge when artistic intention meets meticulous structural
                    execution. We approach every commission as a unique spatial portrait of its occupants.
                  </p>
                  <p className={"mb-0"}>
                    From foundational structural engineering to the tactile warmth of honed limestone and hand-rubbed
                    oak, we balance aesthetic harmony with lasting comfort and functional integrity.
                  </p>
                </div>
                <div className={"cs_skill_progress_wrapper"}>
                  <div className={"cs_skill_progress"}>
                    <div className={"cs_progress_head cs_fs_20 cs_semibold cs_primary_color cs_primary_font cs_mb_16 text-uppercase"}>
                      SPATIAL & ARCHITECTURAL PRECISION
                    </div>
                    <div className={"cs_progress cs_type_1"} data-progress={"96"}>
                      <div className={"cs_progress_in"} style={{ width: "96%" }}>
                        <span className={"cs_fs_20 cs_semibold cs_primary_color cs_primary_font"}>96%</span>
                      </div>
                    </div>
                  </div>
                  <div className={"cs_skill_progress"}>
                    <div className={"cs_progress_head cs_fs_20 cs_semibold cs_primary_color cs_primary_font cs_mb_16 text-uppercase"}>
                      BESPOKE CRAFTSMANSHIP & CLIENT SATISFACTION
                    </div>
                    <div className={"cs_progress cs_type_1"} data-progress={"98"}>
                      <div className={"cs_progress_in"} style={{ width: "98%" }}>
                        <span className={"cs_fs_20 cs_semibold cs_primary_color cs_primary_font"}>98%</span>
                      </div>
                    </div>
                  </div>
                  <div className={"cs_skill_progress"}>
                    <div className={"cs_progress_head cs_fs_20 cs_semibold cs_primary_color cs_primary_font cs_mb_16 text-uppercase"}>
                      ON-TIME & BUDGET PRECISION DELIVERY
                    </div>
                    <div className={"cs_progress cs_type_1"} data-progress={"94"}>
                      <div className={"cs_progress_in"} style={{ width: "94%" }}>
                        <span className={"cs_fs_20 cs_semibold cs_primary_color cs_primary_font"}>94%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          6. REPLACED TEAM SECTION: SUPERB ARCHITECTURAL PHILOSOPHY,
             4-STAGE METHODOLOGY & STUDIO MILESTONES
          ───────────────────────────────────────────────────────────── */}
      <section className={"cs_philosophy_section"}>
        <div className={"cs_height_120 cs_height_lg_80"}></div>
        <div className={"container"}>
          {/* Section Heading */}
          <div className={"cs_section_heading_style_1 cs_center_column text-center cs_mb_60"}>
            <p className={"cs_section_subtitle cs_bold cs_accent_color cs_mb_16 text-uppercase"}>
              OUR ARCHITECTURAL PHILOSOPHY
            </p>
            <h2 className={"cs_section_title cs_fs_53 cs_semibold text-uppercase mb-3"}>
              ELEVATING EXPERIENCE THROUGH TIMELESS CRAFT
            </h2>
            <p className={"cs_desc mx-auto"} style={{ maxWidth: "780px", color: "#666" }}>
              True luxury is not the accumulation of ornament, but the choreography of light, volume, proportion,
              and tactile materiality. Every residence we curate is engineered to provide lasting serenity.
            </p>
          </div>

          {/* 3 Core Architectural Pillars */}
          <div className={"row cs_gap_y_30 cs_mb_60"}>
            {/* Pillar 1 */}
            <div className={"col-lg-4 col-md-6"}>
              <div className={"cs_philosophy_card"}>
                <div className={"cs_philosophy_thumb"}>
                  <img
                    src={"/assets/images/projects/image4.jpg"}
                    alt={"Light and volumetric harmony in palatial residence"}
                  />
                  <span className={"cs_philosophy_badge"}>01 / LIGHT</span>
                </div>
                <div className={"cs_philosophy_body"}>
                  <span className={"cs_philosophy_tag"}>SPATIAL EQUILIBRIUM</span>
                  <h3 className={"cs_philosophy_title"}>Sculpting Daylight & Volumetric Harmony</h3>
                  <p className={"cs_philosophy_desc"}>
                    We treat natural illumination as an essential structural medium. Every aperture, ceiling plane,
                    and vista is modeled to harness the sun’s natural arc, bringing warmth into morning rituals and
                    soft intimacy into evening gatherings.
                  </p>
                  <div className={"cs_philosophy_features"}>
                    <span className={"cs_philosophy_chip"}>Solar Vector Mapping</span>
                    <span className={"cs_philosophy_chip"}>Volumetric Flow</span>
                    <span className={"cs_philosophy_chip"}>Acoustic Balance</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Pillar 2 */}
            <div className={"col-lg-4 col-md-6"}>
              <div className={"cs_philosophy_card"}>
                <div className={"cs_philosophy_thumb"}>
                  <img
                    src={"/assets/images/projects/image2.jpg"}
                    alt={"Honest materiality and bespoke joinery"}
                  />
                  <span className={"cs_philosophy_badge"}>02 / MATERIALITY</span>
                </div>
                <div className={"cs_philosophy_body"}>
                  <span className={"cs_philosophy_tag"}>ATELIER CRAFT</span>
                  <h3 className={"cs_philosophy_title"}>Honest Materials & Multi-Generational Joinery</h3>
                  <p className={"cs_philosophy_desc"}>
                    We collaborate with master stone quarries and artisan woodworkers. Hand-honed Italian travertine,
                    sustainably harvested European white oak, and hand-patinated architectural bronze ensure that every
                    tactile surface patinas with nobility.
                  </p>
                  <div className={"cs_philosophy_features"}>
                    <span className={"cs_philosophy_chip"}>Honed Travertine</span>
                    <span className={"cs_philosophy_chip"}>Fumed White Oak</span>
                    <span className={"cs_philosophy_chip"}>Patinated Bronze</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Pillar 3 */}
            <div className={"col-lg-4 col-md-12"}>
              <div className={"cs_philosophy_card"}>
                <div className={"cs_philosophy_thumb"}>
                  <img
                    src={"/assets/images/projects/image12.jpg"}
                    alt={"Zero tolerance precision and architectural permanence"}
                  />
                  <span className={"cs_philosophy_badge"}>03 / LONGEVITY</span>
                </div>
                <div className={"cs_philosophy_body"}>
                  <span className={"cs_philosophy_tag"}>TECHNICAL RIGOR</span>
                  <h3 className={"cs_philosophy_title"}>Zero-Tolerance Precision & Living Permanence</h3>
                  <p className={"cs_philosophy_desc"}>
                    Behind the serene finishes lies high-performance engineering: hidden acoustic decoupling, integrated
                    invisible climate displacement, and intelligent ambient lighting scenes calibrated to human circadian rhythms.
                  </p>
                  <div className={"cs_philosophy_features"}>
                    <span className={"cs_philosophy_chip"}>Invisible Climate</span>
                    <span className={"cs_philosophy_chip"}>Circadian Lighting</span>
                    <span className={"cs_philosophy_chip"}>Turnkey Handover</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Studio Impact & Excellence Metrics */}
          <div className={"cs_stats_ribbon"}>
            <div className={"row cs_gap_y_24 align-items-center"}>
              <div className={"col-lg-3 col-6"}>
                <div className={"cs_stat_item"}>
                  <div className={"cs_stat_number"}>15+</div>
                  <p className={"cs_stat_label"}>Years of Architectural Practice</p>
                </div>
              </div>
              <div className={"col-lg-3 col-6"}>
                <div className={"cs_stat_item"}>
                  <div className={"cs_stat_number"}>250+</div>
                  <p className={"cs_stat_label"}>Luxury Residences Delivered</p>
                </div>
              </div>
              <div className={"col-lg-3 col-6"}>
                <div className={"cs_stat_item"}>
                  <div className={"cs_stat_number"}>18</div>
                  <p className={"cs_stat_label"}>Global Design & Architecture Awards</p>
                </div>
              </div>
              <div className={"col-lg-3 col-6"}>
                <div className={"cs_stat_item"}>
                  <div className={"cs_stat_number"}>100%</div>
                  <p className={"cs_stat_label"}>Bespoke Tailored Millwork</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={"cs_height_120 cs_height_lg_80"}></div>
      </section>

      {/* Interactive 3-Stage Client Journey */}
      <HowItWorksSection />

      {/* Interior Craft & Detail — Materials & Millwork Gallery */}
      <MaterialsGallery />

      {/* 7. Call To Action Strip */}
      <section
        className={"cs_cta_style_1 cs_primary_bg cs_bg_fixed position-relative"}
        data-src={"/assets/img/cta-bg1.webp"}
      >
        <div className={"cs_cta_overlay cs_primary_bg position-absolute"}></div>
        <div className={"container"}>
          <div className={"cs_cta_content cs_center_column text-center"}>
            <div className={"cs_logo_text_wrapper cs_center cs_radius_100 cs_mb_40 position-relative"}>
              <div className={"cs_text_logo position-absolute"}>
                <img src={"/assets/img/logo-text.webp"} alt={"Text logo"} />
              </div>
              <span className={"cs_arrow_icon cs_center cs_radius_100 position-absolute"}>
                <svg width={"20"} height={"14"} viewBox={"0 0 20 14"} fill={"none"} xmlns={"http://www.w3.org/2000/svg"}>
                  <path d={"M1 7H19M19 7L13.5 1.5M19 7L13.5 12.5"} stroke={"currentColor"} strokeWidth={"1.8"} strokeLinecap={"round"} strokeLinejoin={"round"}></path>
                </svg>
              </span>
            </div>
            <h2 className={"cs_cta_title cs_fs_96 cs_bold cs_white_color cs_mb_60 cs_mb_lg_40"}>
              UNLOCK YOUR DREAM HOME TODAY
            </h2>
            <a
              href={"/contact"}
              aria-label={"Book an appointment through our contact page"}
              className={"cs_btn_style_1 cs_fs_14 cs_bold cs_primary_font cs_radius_50"}
            >
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

      {/* 8. Testimonials Section */}
      <section>
        <div className={"cs_height_120 cs_height_lg_80"}></div>
        <div className={"container"}>
          <div className={"cs_section_heading_style_1"}>
            <p className={"cs_section_subtitle cs_bold cs_accent_color text-uppercase cs_mb_20"}>
              TESTIMONIALS
            </p>
            <h2 className={"cs_section_title cs_fs_53 cs_semibold text-uppercase mb-0"}>
              HERE’S WHAT WARM WORDS <br /> OUR CLIENTS SAY
            </h2>
          </div>
          <div className={"cs_height_60 cs_height_lg_50"}></div>
          <div className={"cs_testimonial_style_2"}>
            <div className={"cs_testimonial_thumbnail cs_radius_10"}>
              <img src={"/assets/images/projects/image3.jpg"} alt={"Client testimonial interior - Classical dining salon"} />
            </div>
            <div className={"cs_testimonial_content"}>
              <div className={"cs_testimonial_rating cs_mb_30"}>
                <h3 className={"cs_rating_summery cs_fs_64 cs_bold mb-0"}>4.80</h3>
                <div className={"cs_rating_star_wrap"}>
                  <div className={"cs_rating_star cs_center cs_accent_bg cs_fs_20 cs_white_color cs_radius_50 cs_mb_10"}>
                    <i className={"fa-solid fa-star"}></i>
                    <i className={"fa-solid fa-star"}></i>
                    <i className={"fa-solid fa-star"}></i>
                    <i className={"fa-solid fa-star"}></i>
                    <i className={"fa-solid fa-star"}></i>
                  </div>
                  <div className={"cs_rating_number cs_fs_18 cs_semibold cs_primary_color cs_primary_font"}>
                    2,688 REVIEWS
                  </div>
                </div>
              </div>
              <div className={"cs_client_review cs_mb_40"}>
                <blockquote>
                  Architecture and interior design blend creativity with functionality, shaping spaces that
                  inspire and elevate everyday life.
                </blockquote>
                <blockquote>
                  Mitjen transformed our residence into a light-filled sanctuary. Every detail—from the acoustic
                  quietness of the bedrooms to the tailored grain matching of the cabinetry—reflects unmatched
                  refinement and care.
                </blockquote>
              </div>
              <div className={"cs_avatar_style_1"}>
                <span className={"cs_avatar_icon cs_center cs_radius_100"}>
                  <img src={"/assets/img/avatar-2.webp"} alt={"Client avatar"} />
                </span>
                <div className={"cs_avatar_info"}>
                  <h3 className={"cs_avatar_title cs_fs_20 cs_bold cs_mb_10"}>MORGAN DUFRESNE</h3>
                  <p className={"cs_avatar_subtitle mb-0"}>Private Residence Owner, Montreal</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={"cs_height_120 cs_height_lg_80"}></div>
      </section>
    </main>
  );
}
