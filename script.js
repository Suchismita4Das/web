const navigationLinks = document.querySelectorAll(".nav-links a");
const sections = document.querySelectorAll("section[id]");

function setActiveLink(sectionId) {
  navigationLinks.forEach((link) => {
    const isActive = link.getAttribute("href") === `#${sectionId}`;

    if (isActive) {
      link.setAttribute("aria-current", "page");
    } else {
      link.removeAttribute("aria-current");
    }
  });
}

const sectionObserver = new IntersectionObserver(
  (entries) => {
    const visibleSection = entries.find((entry) => entry.isIntersecting);

    if (visibleSection) {
      setActiveLink(visibleSection.target.id);
    }
  },
  {
    rootMargin: "-20% 0px -65% 0px",
  },
);

sections.forEach((section) => sectionObserver.observe(section));
