"use strict";

const settings = {
    images: [
        { url: "/assets/images/bg01.jpg", position: "center" },
        { url: "/assets/images/bg02.jpg", position: "center" },
        { url: "/assets/images/bg03.jpg", position: "center" },
    ],
    delay: 6000,
};

function initSlideshow() {
    const body = document.body;
    const wrapper = document.createElement("div");
    wrapper.id = "bg";
    body.appendChild(wrapper);

    const bgElements = settings.images.map((img) => {
        const bg = document.createElement("div");
        bg.style.backgroundImage = `url("${img.url}")`;
        bg.style.backgroundPosition = img.position;
        wrapper.appendChild(bg);
        return bg;
    });

    if (bgElements.length === 0) return;

    let pos = 0;

    // Initial state
    bgElements[pos].classList.add("visible", "top");

    if (bgElements.length < 2) return;

    setInterval(() => {
        const lastPos = pos;
        pos = (pos + 1) % bgElements.length;

        // Swap top images
        bgElements[lastPos].classList.remove("top");
        bgElements[pos].classList.add("visible", "top");

        // Hide last image after delay
        setTimeout(() => {
            bgElements[lastPos].classList.remove("visible");
        }, settings.delay / 2);
    }, settings.delay);
}

// Remove preload class on window load
window.addEventListener("load", () => {
    setTimeout(() => {
        document.body.classList.remove("is-preload");
    }, 100);
});

// Initialize slideshow if on homepage
if (document.body.classList.contains("is-preload")) {
    initSlideshow();
}

/**
 * Obfuscates email addresses using Base64.
 * Looks for elements with data-email attribute.
 */
function initEmailObfuscation() {
    const emailElements = document.querySelectorAll("[data-email]");
    emailElements.forEach((el) => {
        const encodedEmail = el.getAttribute("data-email");
        if (encodedEmail) {
            const decodedEmail = atob(encodedEmail);
            el.setAttribute("href", "mailto:" + decodedEmail);
        }
    });
}

// Initialize email obfuscation
document.addEventListener("DOMContentLoaded", initEmailObfuscation);
