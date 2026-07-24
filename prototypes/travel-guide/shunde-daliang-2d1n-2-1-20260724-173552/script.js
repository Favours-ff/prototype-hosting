const dayTabs = [...document.querySelectorAll("[data-day-target]")];
const dayPanels = [...document.querySelectorAll("[data-day-panel]")];
const detailToggles = [...document.querySelectorAll(".detail-toggle")];
const tripChecks = [...document.querySelectorAll("[data-trip-check]")];
const progress = document.querySelector("#check-progress");
const storageKey = "shunde-daliang-trip-checklist-v2";

function activateDay(targetId) {
  dayTabs.forEach((tab) => {
    const active = tab.dataset.dayTarget === targetId;
    tab.classList.toggle("is-active", active);
    tab.setAttribute("aria-selected", String(active));
  });

  dayPanels.forEach((panel) => {
    const active = panel.id === targetId;
    panel.classList.toggle("is-active", active);
    panel.hidden = !active;
  });
}

dayTabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    activateDay(tab.dataset.dayTarget);
    document.querySelector(".day-switcher").scrollIntoView({ behavior: "smooth", block: "start" });
  });
});

detailToggles.forEach((toggle) => {
  toggle.addEventListener("click", () => {
    const detail = toggle.nextElementSibling;
    const expanded = toggle.getAttribute("aria-expanded") === "true";
    toggle.setAttribute("aria-expanded", String(!expanded));
    detail.hidden = expanded;
  });
});

function updateChecklist() {
  const state = tripChecks.map((item) => item.checked);
  progress.textContent = `${state.filter(Boolean).length} / ${state.length}`;
  localStorage.setItem(storageKey, JSON.stringify(state));
}

try {
  const savedState = JSON.parse(localStorage.getItem(storageKey) || "[]");
  tripChecks.forEach((item, index) => {
    item.checked = Boolean(savedState[index]);
    item.addEventListener("change", updateChecklist);
  });
} catch {
  tripChecks.forEach((item) => item.addEventListener("change", updateChecklist));
}
updateChecklist();

document.querySelector("#print-trip").addEventListener("click", () => window.print());

const query = new URLSearchParams(window.location.search);
if (query.get("view") === "all") {
  document.body.classList.add("poster-mode");
  dayPanels.forEach((panel) => {
    panel.hidden = false;
    panel.classList.add("is-active");
  });
}
