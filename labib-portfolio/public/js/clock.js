const yearElement = document.querySelector("[data-year]");
if (yearElement) yearElement.textContent = new Date().getFullYear();

// Floating clock, added to every page that loads this script (bottom-left corner)
if (!document.querySelector(".floating-clock")) {
  const box = document.createElement("div");
  box.className = "floating-clock mono circuit-ignore";
  box.setAttribute("aria-label", "Current date and time in Bangladesh");
  box.innerHTML = '<span class="status-dot"></span><span data-clock>--</span>';
  document.body.appendChild(box);
}

const clockElements = document.querySelectorAll("[data-clock]");

const formatter = new Intl.DateTimeFormat("en-US", {
  timeZone: "Asia/Dhaka",
  weekday: "short",
  month: "short",
  day: "numeric",
  year: "numeric",
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  hour12: true
});

function updateClock() {
  const p = {};
  formatter.formatToParts(new Date()).forEach(part => { p[part.type] = part.value; });

  const date = `${p.weekday}, ${p.month} ${p.day}, ${p.year}`;
  const time = `${p.hour}:${p.minute}:${p.second} ${p.dayPeriod.toUpperCase()}`;

  clockElements.forEach(el => { el.textContent = `${date} · ${time}`; });
}

updateClock();
window.setInterval(updateClock, 1000);

// Remove the "BDT" time-zone label wherever it appears
document.querySelectorAll(".clock-zone, [data-clock-zone]").forEach(el => { el.textContent = ""; });