import './circuit-hover.js';

const body = document.body;
body.classList.add("js-motion");

// Mobile navigation
const menuToggle = document.querySelector(".menu-toggle");
const nav = document.querySelector("#primary-nav");
if (menuToggle && nav) {
  menuToggle.addEventListener("click", () => {
    const open = menuToggle.getAttribute("aria-expanded") !== "true";
    menuToggle.setAttribute("aria-expanded", String(open));
    nav.classList.toggle("is-open", open);
  });
  nav.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
    nav.classList.remove("is-open");
    menuToggle.setAttribute("aria-expanded", "false");
  }));
}

// Contact form is intentionally a front-end demo until a mail provider is connected.
const form = document.querySelector("[data-contact-form]");
if (form) {
  form.addEventListener("submit", async event => {
    event.preventDefault();
    const status = form.querySelector("[data-form-status]");
    const submit = form.querySelector('button[type="submit"]');
    status.textContent = "Checking form…";
    submit.disabled = true;
    try {
      const response = await fetch("/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(Object.fromEntries(new FormData(form)))
      });
      const result = await response.json();
      status.textContent = result.message || "The form could not be sent.";
    } catch {
      status.textContent = "Message delivery is not configured yet.";
    } finally {
      submit.disabled = false;
    }
  });
}

// Hover affordance for devices with a real pointer; no custom cursor that blocks usability.
document.querySelectorAll(".project-card, .social-links a, .interest-card").forEach(item => {
  item.addEventListener("pointerenter", () => item.classList.add("is-hovered"));
  item.addEventListener("pointerleave", () => item.classList.remove("is-hovered"));
});