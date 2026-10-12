const NS = "http://www.w3.org/2000/svg";
const DATA = JSON.parse(
  document.getElementById("skills-data")?.textContent || "[]"
);

const el = (tag, text, cls) => {
  const n = document.createElement(tag);
  if (text) n.textContent = text;
  if (cls) n.className = cls;
  return n;
};

const makePath = (svg, color) => {
  const p = document.createElementNS(NS, "path");
  p.setAttribute("fill", "none");
  p.setAttribute("stroke", color);
  p.setAttribute("stroke-width", "1.2");
  p.setAttribute("stroke-dasharray", "5 7");
  p.setAttribute("opacity", "0.7");
  svg.appendChild(p);
  return p;
};

const rad = (d) => (d * Math.PI) / 180;

document.querySelectorAll(".mindmap-wrap").forEach((wrap) => {
  const mains = [...wrap.querySelectorAll(".mind-node")];
  const linesBox = wrap.querySelector(".mindmap-lines");
  const nodesBox = wrap.querySelector(".mindmap-nodes");
  const detail = wrap.parentElement.querySelector("[data-skill-detail]");
  if (!mains.length) return;

  const svg = document.createElementNS(NS, "svg");
  linesBox.replaceChildren(svg);

  const groups = [];

  mains.forEach((main, i) => {
    const info = DATA[i] || {};
    const color = info.color || "#c7f36b";
    const skills = info.skills || [];
    main.style.setProperty("--node-color", color);

    const group = {
      main, info, color,
      baseDeg: -90 + (360 / mains.length) * i,
      mainPath: makePath(svg, color), // LABIB -> main
      subs: [],                        // { el, skill, path }
    };

    skills.forEach((s) => {
      const sub = el("button", s.name, "sub-node");
      sub.type = "button";
      sub.style.setProperty("--node-color", color);
      sub.addEventListener("click", () => showSub(group, s, sub));
      nodesBox.appendChild(sub);
      group.subs.push({ el: sub, skill: s, path: makePath(svg, color) }); // main -> sub
    });

    main.addEventListener("click", () => showMain(group));
    groups.push(group);
  });

  function layout() {
    const W = wrap.clientWidth;
    const H = wrap.clientHeight;
    if (!W || !H) return;
    const cx = W / 2, cy = H / 2;

    svg.setAttribute("width", W);
    svg.setAttribute("height", H);
    svg.setAttribute("viewBox", `0 0 ${W} ${H}`);

    const mainRx = W * 0.2, mainRy = H * 0.2;          // inner ring
    const outRx = W / 2 - 12, outRy = H / 2 - 20;      // outer ring limit
    const ringScale = [0.78, 1];                       // sub pills alternate rings

    groups.forEach((g) => {
      const mx = cx + mainRx * Math.cos(rad(g.baseDeg));
      const my = cy + mainRy * Math.sin(rad(g.baseDeg));
      g.main.style.left = mx + "px";
      g.main.style.top = my + "px";
      g.mainPath.setAttribute("d", `M${cx} ${cy} L${mx} ${my}`);

      const n = g.subs.length;
      const spread = Math.min(64, 22 * (n - 1));

      g.subs.forEach((sub, j) => {
        const offset = n === 1 ? 0 : -spread / 2 + (spread / (n - 1)) * j;
        const a = rad(g.baseDeg + offset);
        const k = ringScale[j % 2];
        let sx = cx + outRx * k * Math.cos(a);
        let sy = cy + outRy * k * Math.sin(a);

        // keep the whole pill inside the container
        const hw = sub.el.offsetWidth / 2 + 4;
        const hh = sub.el.offsetHeight / 2 + 4;
        sx = Math.max(hw, Math.min(W - hw, sx));
        sy = Math.max(hh, Math.min(H - hh, sy));

        sub.el.style.left = sx + "px";
        sub.el.style.top = sy + "px";
        sub.path.setAttribute("d", `M${mx} ${my} L${sx} ${sy}`);
      });
    });
  }

  function setActive(group, activeSub) {
    groups.forEach((g) => {
      const on = g === group;
      g.main.classList.toggle("is-active", on);
      g.mainPath.setAttribute("stroke-width", on ? "1.8" : "1.2");
      g.mainPath.setAttribute("opacity", on ? "1" : "0.7");
      g.subs.forEach((s) => {
        s.el.classList.toggle("is-lit", on);
        s.el.classList.toggle("is-active", s.el === activeSub);
        s.path.setAttribute("stroke-width", on ? "1.8" : "1.2");
        s.path.setAttribute("opacity", on ? "1" : "0.7");
      });
    });
  }

  function render(children, color) {
    if (!detail) return;
    detail.replaceChildren(...children);
    detail.style.setProperty("--node-color", color);
    detail.classList.add("is-updated");
    setTimeout(() => detail.classList.remove("is-updated"), 600);
  }

  function showMain(group) {
    setActive(group, null);
    const list = el("ul", "", "detail-list");
    group.subs.forEach((s) => {
      const li = document.createElement("li");
      li.append(el("strong", s.skill.name));
      list.appendChild(li);
    });
    render(
      [
        el("span", (group.info.label || "").toUpperCase(), "detail-kicker"),
        el("h3", group.info.summary || ""),
        list,
      ],
      group.color
    );
  }

  function showSub(group, skill, subEl) {
    setActive(group, subEl);
    render(
      [
        el("span", `${group.info.label} / ${skill.name}`.toUpperCase(), "detail-kicker"),
        el("h3", skill.name),
        el("em", skill.level, "detail-level"),
        el("p", skill.detail),
      ],
      group.color
    );
  }

  layout();
  new ResizeObserver(layout).observe(wrap);
  if (document.fonts?.ready) document.fonts.ready.then(layout);
});