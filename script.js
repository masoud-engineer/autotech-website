document.addEventListener("DOMContentLoaded", function () {

    // Select the hamburger button and navigation menu
    const menuToggle = document.querySelector(".menu-toggle");
    const navLinks = document.querySelector(".nav-links");

    // Function to close the mobile navigation menu
    function closeMenu() {
        navLinks.classList.remove("active");

        // Update accessibility information
        menuToggle.setAttribute("aria-expanded", "false");
    }

    // Open or close the menu when the hamburger is clicked
    menuToggle.addEventListener("click", function () {

        const isOpen = navLinks.classList.toggle("active");

        menuToggle.setAttribute("aria-expanded", isOpen);

    });

    // Close the menu after selecting a navigation link
    const navItems = navLinks.querySelectorAll("a");

    navItems.forEach(function (link) {

        link.addEventListener("click", function () {
            closeMenu();
        });

    });

    // Close the menu when clicking outside the navigation
    document.addEventListener("click", function (event) {

        const clickedInsideMenu = navLinks.contains(event.target);
        const clickedToggle = menuToggle.contains(event.target);

        if (
            navLinks.classList.contains("active") &&
            !clickedInsideMenu &&
            !clickedToggle
        ) {
            closeMenu();
        }

    });

    // Close the menu when the Escape key is pressed
    document.addEventListener("keydown", function (event) {

        if (event.key === "Escape") {
            closeMenu();
        }

    });

});

document.addEventListener("DOMContentLoaded", function () {

    const contactForm = document.querySelector("#contact-form");

    // Run only on pages containing the contact form
    if (contactForm) {

        contactForm.addEventListener("submit", function (event) {

            // Stop the browser from reloading the page
            event.preventDefault();

            // Collect customer information
            const name = document.querySelector("#customer-name").value.trim();
            const phone = document.querySelector("#customer-phone").value.trim();
            const service = document.querySelector("#service").value;
            const message = document.querySelector("#customer-message").value.trim();

            // Prepare the WhatsApp message
            const whatsappMessage =
                `Hello AutoTech!\n\n` +
                `Name: ${name}\n` +
                `Phone: ${phone}\n` +
                `Service Required: ${service}\n` +
                `Message: ${message}`;

            // Replace with the actual business WhatsApp number
            const businessNumber = "255XXXXXXXXX";

            // Encode message for safe URL transmission
            const whatsappURL =
                `https://wa.me/${businessNumber}?text=${encodeURIComponent(whatsappMessage)}`;

            // Open WhatsApp with the customer's enquiry
            window.open(whatsappURL, "_blank");

        });

    }

});
