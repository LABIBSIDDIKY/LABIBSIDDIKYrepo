const clockElements = document.querySelectorAll("[data-clock]");
const yearElement = document.querySelector("[data-year]");
if (yearElement) yearElement.textContent = new Date().getFullYear();

function updateClock() {
  const now = new Date();
  const time = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Asia/Dhaka", hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: false
  }).format(now);
  clockElements.forEach(el => { el.textContent = time; });
}
updateClock();
window.setInterval(updateClock, 1000);
