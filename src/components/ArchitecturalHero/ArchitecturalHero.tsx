
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./ArchitecturalHero.css";

gsap.registerPlugin(ScrollTrigger);

const stages = [
  "/architectural/stage1.png",
  "/architectural/stage2.png",
  "/architectural/stage3.png",
  "/architectural/stage4.png",
  "/architectural/stage5.png",
  "/architectural/stage6.png",
];

export default function ArchitecturalHero() {
  const sectionRef = useRef<HTMLElement>(null);
  const stageRefs = useRef<(HTMLImageElement | null)[]>([]);
  const titleRefs = useRef<(HTMLDivElement | null)[]>([]);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const images = stageRefs.current.filter(
        (image): image is HTMLImageElement => image !== null
      );

      // Initial state: only the unfinished room is visible.
      gsap.set(images.slice(1), {
        clipPath: "inset(100% 0 0 0)",
      });

      gsap.set(titleRefs.current, { autoAlpha: 0, y: 20 });
      gsap.set(titleRefs.current[0], { autoAlpha: 1, y: 0 });

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "+=600%",
          scrub: 1,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      // Floor: reveal upwards from the bottom.
      timeline.to(images[1], {
        clipPath: "inset(0% 0 0 0)",
        duration: 1,
        ease: "none",
      });

      // Ceiling: reveal downwards from the top.
      timeline.to(images[2], {
        clipPath: "inset(0% 0 0 0)",
        duration: 1,
        ease: "none",
      });

      // Wall finishes: reveal from the centre.
      timeline.to(images[3], {
        clipPath: "inset(0% 0 0 0)",
        duration: 1,
        ease: "none",
      });

      // Furniture: reveal upwards.
      timeline.to(images[4], {
        clipPath: "inset(0% 0 0 0)",
        duration: 1,
        ease: "none",
      });

      // Final reveal: completed interior.
      timeline.to(images[5], {
        clipPath: "inset(0% 0 0 0)",
        duration: 1.2,
        ease: "none",
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section className="architectural-hero" ref={sectionRef}>
      <div className="architectural-hero__scene">
        {stages.map((src, index) => (
          <img
            key={src}
            ref={(el) => {
              stageRefs.current[index] = el;
            }}
            className="architectural-hero__image"
            src={src}
            alt=""
            draggable={false}
          />
        ))}

        <div className="architectural-hero__shade" />

        <div className="architectural-hero__brand">
          YOUR STUDIO
        </div>

        <div className="architectural-hero__copy">
          <div className="architectural-hero__headline">
            <span>01 / THE BEGINNING</span>
            <h1>Luxury Begins<br />Here.</h1>
          </div>
        </div>

        <div className="architectural-hero__progress">
          <span>SCROLL TO TRANSFORM</span>
          <div className="architectural-hero__line" />
        </div>
      </div>
    </section>
  );
}
