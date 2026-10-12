import { gsap } from "https://cdn.jsdelivr.net/npm/gsap@3.13.0/+esm";
import { ScrollTrigger } from "https://cdn.jsdelivr.net/npm/gsap@3.13.0/ScrollTrigger/+esm";
import Lenis from "https://cdn.jsdelivr.net/npm/lenis@1.3.11/+esm";

gsap.registerPlugin(ScrollTrigger);

const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
if (!reduceMotion) {
  // Lenis is intentionally configured gently; native wheel/trackpad input remains responsive.
  const lenis = new Lenis({ duration: 0.9, smoothWheel: true, wheelMultiplier: 1, touchMultiplier: 1 });
  lenis.on("scroll", ScrollTrigger.update);
  gsap.ticker.add(time => lenis.raf(time * 1000));
  gsap.ticker.lagSmoothing(0);

  document.querySelectorAll(".reveal").forEach((element, index) => {
    gsap.fromTo(element,
      { autoAlpha: 0, y: 22 },
      {
        autoAlpha: 1, y: 0, duration: 0.8, ease: "power3.out",
        delay: element.classList.contains("hero-title") ? 0 : Math.min(index % 4, 3) * 0.04,
        scrollTrigger: { trigger: element, start: "top 88%", once: true }
      }
    );
  });

  document.querySelectorAll(".project-card").forEach((card, index) => {
    gsap.fromTo(card, { y: 28 }, {
      y: 0, duration: 0.7, ease: "power2.out", delay: index * 0.06,
      scrollTrigger: { trigger: card, start: "top 90%", once: true }
    });
  });
} else {
  document.querySelectorAll(".reveal").forEach(el => el.classList.add("is-visible"));
}
