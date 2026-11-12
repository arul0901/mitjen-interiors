import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isSubmenuOpen, setIsSubmenuOpen] = useState(false);
  const location = useLocation();

  // Close all transient overlays whenever the route changes
  useEffect(() => {
    setIsMenuOpen(false);
    setIsSearchOpen(false);
    setIsSubmenuOpen(false);
    document.body.classList.remove("cs_menu_open");
  }, [location.pathname]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.classList.add("cs_menu_open");
    } else {
      document.body.classList.remove("cs_menu_open");
    }
    return () => {
      document.body.classList.remove("cs_menu_open");
    };
  }, [isMenuOpen]);

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);
  const closeMenu = () => {
    setIsMenuOpen(false);
    setIsSubmenuOpen(false);
  };

  return (
    <>
      <div className={"cs_preloader"} id={"preloader"}>
        <div className={"cs_preloader_container"}>
          <div className={"cs_preloader_content"}>
            <div className={"cs_progressbar_wrapper"}>
              <div className={"cs_progressbar"}></div>
            </div>
            <div className={"cs_loading_percentage"}></div>
            <div className={"cs_loading_text cs_white_color"}>Mitjen</div>
          </div>
        </div>
      </div>

      <header
        aria-label={"Main header"}
        className={"cs_site_header cs_style_2 cs_white_color cs_sticky_header"}
      >
        <div className={"cs_main_header"}>
          <div className={"container-fluid"}>
            <div className={"cs_main_header_in"}>
              <div className={"cs_main_header_left"}>
                <a aria-label={"Home page"} className={"cs_site_brand"} href={"/"} onClick={closeMenu}>
                  <img alt={"Mitjen"} className={"cs_site_logo"} src={"/assets/img/logo2.svg"} />
                </a>
              </div>

              <div className={"cs_main_header_center"}>
                <nav aria-label={"Main navigation"} className={"cs_nav"}>
                  <div className={`cs_nav_list_wrapper ${isMenuOpen ? "active" : ""}`}>
                    {/* Mobile drawer header with logo and close button */}
                    <div className={"cs_mobile_nav_header d-lg-none"}>
                      <a aria-label={"Home page"} className={"cs_site_brand"} href={"/"} onClick={closeMenu}>
                        <img alt={"Mitjen"} className={"cs_site_logo"} src={"/assets/img/logo2.svg"} />
                      </a>
                      <button
                        type={"button"}
                        aria-label={"Close navigation"}
                        className={"cs_close_nav_btn cs_center"}
                        onClick={closeMenu}
                      >
                        <svg width={"20"} height={"20"} viewBox={"0 0 24 24"} fill={"none"} stroke={"currentColor"} strokeWidth={"2.5"} strokeLinecap={"round"}>
                          <path d={"M18 6L6 18M6 6l12 12"} />
                        </svg>
                      </button>
                    </div>

                    <ul className={"cs_nav_list cs_mp_0"}>
                      <li className={"menu-item"}>
                        <a aria-label={"Home"} href={"/"} onClick={closeMenu}>Home</a>
                      </li>
                      <li>
                        <a aria-label={"About Us"} href={"/about"} onClick={closeMenu}>About Us</a>
                      </li>
                      <li className={`menu-item-has-children ${isSubmenuOpen ? "active" : ""}`}>
                        <div className={"cs_menu_item_header"}>
                          <a aria-label={"Services"} href={"/services"} onClick={closeMenu}>Services</a>
                          <span
                            className={`cs_menu_dropdown_toggle ${isSubmenuOpen ? "active" : ""}`}
                            role={"button"}
                            tabIndex={0}
                            aria-label={"Toggle submenu"}
                            aria-expanded={isSubmenuOpen}
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              setIsSubmenuOpen((prev) => !prev);
                            }}
                            onKeyDown={(e) => {
                              if (e.key === "Enter" || e.key === " ") {
                                e.preventDefault();
                                e.stopPropagation();
                                setIsSubmenuOpen((prev) => !prev);
                              }
                            }}
                          >
                            <span></span>
                          </span>
                        </div>
                        <ul
                          aria-label={"Services submenu"}
                          className={`cs_dropdown_list cs_mp_0 ${isSubmenuOpen ? "cs_submenu_open" : ""}`}
                        >
                          <li>
                            <a aria-label={"Our Services"} href={"/services"} onClick={closeMenu}>All Services</a>
                          </li>
                          <li>
                            <a aria-label={"Service Details"} href={"/services/details"} onClick={closeMenu}>Service Details</a>
                          </li>
                        </ul>
                      </li>
                      <li>
                        <a aria-label={"Portfolio"} href={"/portfolio"} onClick={closeMenu}>Portfolio</a>
                      </li>
                      <li>
                        <a aria-label={"Contact Us"} href={"/contact"} onClick={closeMenu}>Contact Us</a>
                      </li>
                    </ul>

                    {/* Mobile drawer quick actions footer */}
                    <div className={"cs_mobile_nav_footer d-lg-none"}>
                      <a
                        href={"/contact"}
                        className={"cs_btn_style_1 cs_fs_14 cs_bold cs_primary_font cs_radius_50 w-100 justify-content-center text-center"}
                        onClick={closeMenu}
                      >
                        <span>BOOK CONSULTATION</span>
                        <span aria-hidden={"true"} className={"cs_btn_icon cs_radius_100 cs_center ms-2"}>
                          <svg fill={"none"} height={"13"} viewBox={"0 0 14 14"} width={"13"} xmlns={"http://www.w3.org/2000/svg"}>
                            <path d={"M1 7H13M13 7L7.5 1.5M13 7L7.5 12.5"} stroke={"currentColor"} strokeLinecap={"round"} strokeLinejoin={"round"} strokeWidth={"1.8"}></path>
                          </svg>
                        </span>
                      </a>
                      <div className={"cs_mobile_contact_meta mt-3 text-start"}>
                        <p className={"mb-1 cs_fs_13 text-muted"}>Direct Studio Inquiry:</p>
                        <a href={"tel:+918940555526"} className={"cs_fs_16 cs_bold cs_accent_color d-inline-block"}>
                          +91 89405 55526
                        </a>
                      </div>
                    </div>
                  </div>

                  {/* Hamburger menu button */}
                  <span
                    className={`cs_menu_toggle ${isMenuOpen ? "active" : ""}`}
                    role={"button"}
                    tabIndex={0}
                    aria-label={"Toggle navigation"}
                    aria-expanded={isMenuOpen}
                    onClick={toggleMenu}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        toggleMenu();
                      }
                    }}
                  >
                    <span></span>
                  </span>
                </nav>
              </div>

              <div className={"cs_main_header_right"}>
                <div className={"cs_header_btns_wrapper"}>
                  <button
                    aria-label={"Search"}
                    className={"cs_search_btn"}
                    type={"button"}
                    onClick={() => setIsSearchOpen(true)}
                  >
                    <svg aria-hidden={"true"} fill={"none"} height={"24"} viewBox={"0 0 24 24"} width={"24"} xmlns={"http://www.w3.org/2000/svg"}>
                      <path d={"M23.7723 22.6943L17.5759 16.5969C19.1985 14.834 20.1955 12.5024 20.1955 9.93682C20.1947 4.44852 15.6742 0 10.0974 0C4.52055 0 0 4.44852 0 9.93682C0 15.4251 4.52055 19.8736 10.0974 19.8736C12.5069 19.8736 14.7169 19.0402 16.4529 17.6546L22.6733 23.776C22.9764 24.0746 23.4685 24.0746 23.7716 23.776C24.0754 23.4775 24.0754 22.9929 23.7723 22.6943ZM10.0974 18.3448C5.37877 18.3448 1.55362 14.5804 10.0974 19.93682C1.55362 5.29321 5.37877 1.52884 10.0974 1.52884C14.816 1.52884 18.6411 5.29321 18.6411 9.93682C18.6411 14.5804 14.816 18.3448 10.0974 18.3448Z"} fill={"currentColor"}></path>
                    </svg>
                  </button>
                  <a
                    aria-label={"Get in touch"}
                    className={"cs_btn_style_1 cs_fs_14 cs_bold cs_primary_font cs_radius_50 cs_header_cta"}
                    href={"/contact"}
                  >
                    <span>GET IN TOUCH</span>
                    <span aria-hidden={"true"} className={"cs_btn_icon cs_radius_100 cs_center"}>
                      <svg fill={"none"} height={"13"} viewBox={"0 0 14 14"} width={"13"} xmlns={"http://www.w3.org/2000/svg"}>
                        <path d={"M1 7H13M13 7L7.5 1.5M13 7L7.5 12.5"} stroke={"currentColor"} strokeLinecap={"round"} strokeLinejoin={"round"} strokeWidth={"1.8"}></path>
                      </svg>
                    </span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Dimmed mobile backdrop */}
      <div
        className={`cs_mobile_nav_backdrop ${isMenuOpen ? "active" : ""}`}
        onClick={closeMenu}
        aria-hidden={"true"}
      />

      {/* Search Modal */}
      <div className={`cs_header_search ${isSearchOpen ? "active" : ""}`}>
        <div className={"cs_header_search_in"}>
          <div className={"container"}>
            <div className={"cs_header_search_box"}>
              <form action={"#"} className={"cs_search_form position-relative"} onSubmit={(e) => e.preventDefault()}>
                <input autoComplete={"off"} name={"search-text"} placeholder={"Search Service"} type={"search"} autoFocus={isSearchOpen} />
                <button className={"cs_search_btn"} type={"submit"} aria-label={"Search submit"}>
                  <svg fill={"none"} height={"24"} viewBox={"0 0 24 24"} width={"24"} xmlns={"http://www.w3.org/2000/svg"}>
                    <path d={"M23.7723 22.6943L17.5759 16.5969C19.1985 14.834 20.1955 12.5024 20.1955 9.93682C20.1947 4.44852 15.6742 0 10.0974 0C4.52055 0 0 4.44852 0 9.93682C0 15.4251 4.52055 19.8736 10.0974 19.8736C12.5069 19.8736 14.7169 19.0402 16.4529 17.6546L22.6733 23.776C22.9764 24.0746 23.4685 24.0746 23.7716 23.776C24.0754 23.4775 24.0754 22.9929 23.7723 22.6943ZM10.0974 18.3448C5.37877 18.3448 1.55362 14.5804 10.0974 19.93682C1.55362 5.29321 5.37877 1.52884 10.0974 1.52884C14.816 1.52884 18.6411 5.29321 18.6411 9.93682C18.6411 14.5804 14.816 18.3448 10.0974 18.3448Z"} fill={"currentColor"}></path>
                  </svg>
                </button>
              </form>
              <button aria-label={"Close search"} className={"cs_close cs_center"} type={"button"} onClick={() => setIsSearchOpen(false)}>
                <svg fill={"none"} height={"18"} viewBox={"0 0 18 18"} width={"18"} xmlns={"http://www.w3.org/2000/svg"}>
                  <path d={"M1 1L17 17M1 17L17 1"} stroke={"currentColor"} strokeLinecap={"round"} strokeWidth={"2"}></path>
                </svg>
              </button>
            </div>
          </div>
        </div>
        <div className={"cs_sidenav_overlay"} onClick={() => setIsSearchOpen(false)}></div>
      </div>
    </>
  );
}
