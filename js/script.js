/* AutoTech interactions: mobile navigation and WhatsApp enquiry form. */
document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.querySelector(".menu-toggle");
  const navLinks = document.querySelector(".nav-links");

  // The navigation exists on all three pages; guard against missing markup.
  if (menuToggle && navLinks) {
    const closeMenu = () => {
      navLinks.classList.remove("active");
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.setAttribute("aria-label", "Open navigation");
    };

    menuToggle.addEventListener("click", () => {
      const isOpen = navLinks.classList.toggle("active");
      menuToggle.setAttribute("aria-expanded", String(isOpen));
      menuToggle.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
    });

    navLinks.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", closeMenu);
    });

    document.addEventListener("click", (event) => {
      if (
        navLinks.classList.contains("active") &&
        !navLinks.contains(event.target) &&
        !menuToggle.contains(event.target)
      ) {
        closeMenu();
      }
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") closeMenu();
    });

    // Close the expanded menu if the screen is resized back to desktop.
    window.addEventListener("resize", () => {
      if (window.innerWidth > 768) closeMenu();
    });
  }

  const contactForm = document.querySelector("#contact-form");

  if (contactForm) {
    contactForm.addEventListener("submit", (event) => {
      event.preventDefault();

      const name = document.querySelector("#customer-name")?.value.trim() || "";
      const phone = document.querySelector("#customer-phone")?.value.trim() || "";
      const service = document.querySelector("#service")?.value || "";
      const message = document.querySelector("#customer-message")?.value.trim() || "";

      // Tanzania country code + business number, without the leading plus sign.
      const businessNumber = "255787772669";

      const whatsappMessage = [
        "Hello AutoTech!",
        "",
        `Name: ${name}`,
        `Phone: ${phone}`,
        `Service Required: ${service}`,
        `Message: ${message}`
      ].join("\n");

      const whatsappURL =
        `https://wa.me/${businessNumber}?text=${encodeURIComponent(whatsappMessage)}`;

      // Open WhatsApp in a new tab after the customer's submit action.
      const whatsappWindow = window.open(whatsappURL, "_blank", "noopener,noreferrer");

      // If the browser blocks new tabs, continue in the current tab.
      if (!whatsappWindow) {
        window.location.href = whatsappURL;
      }
    });
  }
});
