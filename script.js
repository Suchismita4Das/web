const navigationLinks = document.querySelectorAll(".nav-links a");
const sections = document.querySelectorAll("main section[id]");
const menuToggle = document.querySelector(".menu-toggle");
const sidebarClose = document.querySelector(".sidebar-close");
const navBackdrop = document.querySelector(".nav-backdrop");
const themeToggle = document.querySelector(".theme-toggle");
const contactForm = document.querySelector("#contact-form");
const emailCopyButton = document.querySelector(".email-copy");

function setActiveLink(sectionId) {
  navigationLinks.forEach((link) => {
    const isActive = link.getAttribute("href") === `#${sectionId}`;
    if (isActive) link.setAttribute("aria-current", "page");
    else link.removeAttribute("aria-current");
  });
}

const sectionObserver = new IntersectionObserver((entries) => {
  const visibleSection = entries.find((entry) => entry.isIntersecting);
  if (visibleSection) setActiveLink(visibleSection.target.id);
}, { rootMargin: "-20% 0px -65% 0px" });

sections.forEach((section) => sectionObserver.observe(section));

function closeMobileMenu() {
  document.body.classList.remove("menu-open");
  menuToggle.setAttribute("aria-expanded", "false");
  menuToggle.setAttribute("aria-label", "Open navigation menu");
}

menuToggle.addEventListener("click", () => {
  const isOpen = document.body.classList.toggle("menu-open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.setAttribute("aria-label", isOpen ? "Close navigation menu" : "Open navigation menu");
});

navigationLinks.forEach((link) => link.addEventListener("click", closeMobileMenu));
sidebarClose.addEventListener("click", closeMobileMenu);
navBackdrop.addEventListener("click", closeMobileMenu);
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && document.body.classList.contains("menu-open")) {
    closeMobileMenu();
    menuToggle.focus();
  }
});

themeToggle.addEventListener("click", () => {
  const isDark = document.body.classList.toggle("dark");
  themeToggle.innerHTML = isDark ? "<span aria-hidden=\"true\">○</span> Light mode" : "<span aria-hidden=\"true\">◐</span> Dark mode";
  themeToggle.setAttribute("aria-label", isDark ? "Switch to light mode" : "Switch to dark mode");
  localStorage.setItem("portfolio-theme", isDark ? "dark" : "light");
});

if (localStorage.getItem("portfolio-theme") === "dark") themeToggle.click();

emailCopyButton.addEventListener("click", async () => {
  const email = emailCopyButton.dataset.email;
  try {
    await navigator.clipboard.writeText(email);
    document.querySelector(".copy-status").textContent = "Email copied to clipboard.";
  } catch {
    document.querySelector(".copy-status").textContent = `Email: ${email}`;
  }
});

contactForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const formData = new FormData(contactForm);
  const subject = encodeURIComponent(`Portfolio message from ${formData.get("name")}`);
  const body = encodeURIComponent(
    `Name: ${formData.get("name")}\nEmail: ${formData.get("email")}\n\n${formData.get("message")}`,
  );
  window.location.href = `mailto:30942724036.bca@ticollege.org?subject=${subject}&body=${body}`;
});
