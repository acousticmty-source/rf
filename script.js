const header = document.querySelector("[data-header]");
const menuToggle = document.querySelector(".menu-toggle");
const nav = document.querySelector(".site-nav");
const revealItems = document.querySelectorAll(".reveal");

function setHeaderState() {
  header.classList.toggle("is-scrolled", window.scrollY > 24);
}

function closeMenu() {
  document.body.classList.remove("menu-open");
  header.classList.remove("is-open");
  nav.classList.remove("is-active");
  menuToggle.setAttribute("aria-expanded", "false");
}

menuToggle.addEventListener("click", () => {
  const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
  document.body.classList.toggle("menu-open", !isOpen);
  header.classList.toggle("is-open", !isOpen);
  nav.classList.toggle("is-active", !isOpen);
  menuToggle.setAttribute("aria-expanded", String(!isOpen));
});

nav.addEventListener("click", (event) => {
  if (event.target.matches("a")) {
    closeMenu();
  }
});

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.14 }
);

revealItems.forEach((item) => revealObserver.observe(item));
setHeaderState();
window.addEventListener("scroll", setHeaderState, { passive: true });
