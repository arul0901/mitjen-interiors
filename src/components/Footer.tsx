import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  return <>

<footer className={"cs_footer_style_1 cs_gray_bg"}>
<div className={"cs_height_120 cs_height_lg_80"}></div>
<div className={"container"}>
<div className={"cs_footer_logo cs_center_column text-center position-relative"}>
<img alt={"Footer logo"} src={"/assets/img/footer-logo.svg"} />
<div className={"cs_logo_text_wrapper cs_center cs_gray_bg cs_radius_100"}>
<div className={"cs_text_logo position-absolute"}>
<img alt={"Text logo"} src={"/assets/img/logo-text.svg"} />
</div>
<span aria-hidden={"true"} className={"cs_arrow_icon cs_center cs_radius_100 position-absolute"}>
<svg fill={"none"} height={"12"} viewBox={"0 0 24 12"} width={"22"} xmlns={"http://www.w3.org/2000/svg"}>
<path d={"M1 6H23M23 6L17.5 1M23 6L17.5 11"} stroke={"currentColor"} strokeLinecap={"round"} strokeLinejoin={"round"} strokeWidth={"2"}></path>
</svg>
</span>
</div>
</div>
</div>
<div className={"cs_footer_main"}>
<div className={"container-fluid"}>
<div className={"cs_footer_rows"}>
<div className={"cs_footer_col"}>
<div className={"cs_footer_widget"}>
<h2 className={"cs_footer_widget_title cs_fs_24 cs_bold cs_mb_32 cs_mb_lg_24"}>ABOUT US</h2>
<ul aria-label={"Footer navigation menu"} className={"cs_footer_menu_list cs_mp_0 text-capitalize"}>
<li><Link aria-label={"About Us"} to={"/about"}>About Us</Link></li>
<li><Link aria-label={"Meet The Team"} to={"/team"}>Meet The Team</Link></li>
<li><Link aria-label={"Awards"} to={"/about"}>Awards</Link></li>
<li><Link aria-label={"Projects"} to={"/portfolio"}>Projects</Link></li>
<li><Link aria-label={"Testimonials"} to={"/about"}>Testimonials</Link></li>
</ul>
</div>
</div>
<div className={"cs_footer_col"}>
<div className={"cs_footer_widget"}>
<h2 className={"cs_footer_widget_title cs_fs_24 cs_bold cs_mb_32 cs_mb_lg_24"}>SERVICES</h2>
<ul aria-label={"Footer services menu"} className={"cs_footer_menu_list cs_mp_0 text-capitalize"}>
<li><Link aria-label={"Residential Design"} to={"/services/details"}>Residential Design</Link></li>
<li><Link aria-label={"Commercial Design"} to={"/services/details"}>Commercial Design</Link></li>
<li><Link aria-label={"Corporate Design"} to={"/services/details"}>Corporate Design</Link></li>
<li><Link aria-label={"Modular Kitchen"} to={"/services/details"}>Modular Kitchen</Link></li>
<li><Link aria-label={"Custom Joinery"} to={"/services/details"}>Custom Joinery</Link></li>
</ul>
</div>
</div>
<div className={"cs_footer_col"}>
<div className={"cs_footer_widget"}>
<h2 className={"cs_footer_widget_title cs_fs_24 cs_bold cs_mb_32 cs_mb_lg_24"}>VISIT US</h2>
<ul aria-label={"Footer contact and address"} className={"cs_footer_menu_list cs_mp_0"}>
<li className={"cs_mb_16"}>
<span className={"cs_bold cs_primary_color d-block"}>DESIGN STUDIO:</span>
<a href={"https://www.google.com/maps/place/craft+interior+studio/@11.0221026,77.021977,19z"} rel={"noopener noreferrer"} target={"_blank"}>
                      Craft Interior Studio<br />Alamelu Nagar, Coimbatore<br />Tamil Nadu — 641015
                    </a>
</li>
<li className={"cs_mb_16"}>
<span className={"cs_bold cs_primary_color d-block"}>CALL US:</span>
<a className={"cs_fs_18 cs_bold cs_accent_color"} href={"tel:+918940555526"}>89405 55526</a>
</li>
<li>
<a className={"cs_accent_color cs_bold"} href={"https://www.google.com/maps/place/craft+interior+studio/@11.0221026,77.021977,19z"} rel={"noopener noreferrer"} target={"_blank"}>
                      Open in Google Maps ↗
                    </a>
</li>
</ul>
</div>
</div>
<div className={"cs_footer_col"}>
<div className={"cs_footer_widget"}>
<h2 className={"cs_footer_widget_title cs_fs_24 cs_bold cs_mb_22"}>STUDIO HOURS</h2>
<p className={"cs_mb_10"}><strong>Mon – Sat:</strong> 9:30 AM – 7:00 PM</p>
<p className={"cs_mb_20"}><strong>Sunday:</strong> By Prior Appointment</p>
<p className={"cs_mb_16 cs_fs_14 text-muted"}>Subscribe for interior trends & project updates:</p>
<form action={"#"} className={"cs_newsletter_style_1"} onSubmit={(e) => e.preventDefault()}>
<input autoComplete={"off"} className={"cs_form_field cs_radius_50 cs_fs_14 cs_bold"} name={"email"} placeholder={"Enter Your Email"} type={"email"} />
<button className={"cs_submit_btn cs_radius_50 cs_fs_14 cs_bold"} type={"submit"}>Subscribe</button>
</form>
</div>
</div>
</div>
</div>
</div>
<div className={"cs_footer_bottom"}>
<div className={"container-fluid"}>
<div className={"cs_footer_bottom_content"}>
<div className={"cs_copywright_text cs_primary_color"}>Copyright & Design <span className={"cs_accent_color"}>@Mitjen </span> <span className={"cs_getting_year"}>{new Date().getFullYear()}</span></div>
<ul aria-label={"Footer legal menu"} className={"cs_footer_bottom_menu cs_mp_0 cs_primary_color"}>
<li><a aria-label={"Style Guide"} href={"#"}>Style Guide</a></li>
<li><a aria-label={"Licenses"} href={"#"}>Licenses</a></li>
<li><a aria-label={"Changelog"} href={"#"}>Changelog</a></li>
</ul>
</div>
</div>
</div>
</footer>
<button aria-label={"Scroll to top"} className={"cs_scrollup_btn cs_center"} id={"scrollToTopBtn"} name={"ScrollToTopBtn"} type={"button"}>
<svg fill={"none"} height={"18"} viewBox={"0 0 16 16"} width={"18"} xmlns={"http://www.w3.org/2000/svg"}>
<path d={"M8 15V1M8 1L1 8M8 1L15 8"} stroke={"currentColor"} strokeLinecap={"round"} strokeLinejoin={"round"} strokeWidth={"2"}></path>
</svg>
</button>

  </>;
}
