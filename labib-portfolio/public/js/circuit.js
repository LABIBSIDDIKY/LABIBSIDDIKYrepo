// Add animated circuit paths to each page's hero/footer. SVG keeps the effect lightweight.
const heroCircuit = document.querySelector(".hero-circuit");
if (heroCircuit && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  heroCircuit.querySelectorAll("path").forEach((path, index) => {
    const length = path.getTotalLength();
    path.style.strokeDasharray = `${length}`;
    path.style.strokeDashoffset = `${length}`;
    path.style.transition = `stroke-dashoffset ${2.2 + index * 0.45}s cubic-bezier(.2,.7,.2,1)`;
    requestAnimationFrame(() => { path.style.strokeDashoffset = "0"; });
  });
}
