// ==========================================================
// Rei Global Logistics - Premium Script
// ==========================================================

document.addEventListener("DOMContentLoaded", () => {
  // --------------------------------------------------------
  // Page load fade-in
  // --------------------------------------------------------

  document.body.classList.add("page-loaded");

  // --------------------------------------------------------
  // Page transition on internal navigation
  // --------------------------------------------------------

  const pageLinks = document.querySelectorAll('a[href$=".html"]');

  pageLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      const url = link.getAttribute("href");

      if (!url || url.startsWith("#")) {
        return;
      }

      e.preventDefault();

      document.body.classList.add("page-leave");

      setTimeout(() => {
        window.location.href = url;
      }, 280);
    });
  });

  // --------------------------------------------------------
  // Mobile navigation toggle
  // --------------------------------------------------------

  const navToggle = document.querySelector(".nav-toggle");
  const navLinks = document.querySelector(".nav-links");

  if (navToggle && navLinks) {
    navToggle.addEventListener("click", () => {
      const isOpen = navLinks.classList.toggle("open");

      navToggle.setAttribute("aria-expanded", String(isOpen));
    });

    navLinks.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        navLinks.classList.remove("open");
        navToggle.setAttribute("aria-expanded", "false");
      });
    });

    window.addEventListener("resize", () => {
      if (window.innerWidth > 768) {
        navLinks.classList.remove("open");
        navToggle.setAttribute("aria-expanded", "false");
      }
    });
  }

  // --------------------------------------------------------
  // Smooth scrolling for in-page anchors
  // --------------------------------------------------------

  const anchorLinks = document.querySelectorAll('a[href^="#"]');

  anchorLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      const targetId = link.getAttribute("href");

      if (!targetId || targetId === "#") {
        return;
      }

      const target = document.querySelector(targetId);

      if (target) {
        e.preventDefault();

        target.scrollIntoView({
          behavior: "smooth",
        });
      }
    });
  });

  // --------------------------------------------------------
  // Scroll reveal animation
  // --------------------------------------------------------

  const revealElements = document.querySelectorAll(".reveal");

  if ("IntersectionObserver" in window && revealElements.length > 0) {
    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("reveal-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.2,
      }
    );

    revealElements.forEach((element) => {
      revealObserver.observe(element);
    });
  }

  // --------------------------------------------------------
  // Stats counter animation
  // --------------------------------------------------------

  const counters = document.querySelectorAll(".counter");

  if ("IntersectionObserver" in window && counters.length > 0) {
    const counterObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            return;
          }

          const counter = entry.target;

          const target = parseInt(
            counter.getAttribute("data-target"),
            10
          );

          if (isNaN(target)) {
            observer.unobserve(counter);
            return;
          }

          const duration = 1200;
          const startTime = performance.now();

          const updateCounter = (time) => {
            const progress = Math.min(
              (time - startTime) / duration,
              1
            );

            counter.textContent = Math.floor(
              progress * target
            );

            if (progress < 1) {
              requestAnimationFrame(updateCounter);
            }
          };

          requestAnimationFrame(updateCounter);

          observer.unobserve(counter);
        });
      },
      {
        threshold: 0.6,
      }
    );

    counters.forEach((counter) => {
      counterObserver.observe(counter);
    });
  }

  // --------------------------------------------------------
  // Button ripple effect
  // --------------------------------------------------------

  const buttons = document.querySelectorAll(".btn");

  buttons.forEach((button) => {
    button.addEventListener("click", (e) => {
      const circle = document.createElement("span");

      const diameter = Math.max(
        button.clientWidth,
        button.clientHeight
      );

      const radius = diameter / 2;
      const rect = button.getBoundingClientRect();

      circle.style.width = `${diameter}px`;
      circle.style.height = `${diameter}px`;

      circle.style.left = `${
        e.clientX - rect.left - radius
      }px`;

      circle.style.top = `${
        e.clientY - rect.top - radius
      }px`;

      circle.classList.add("ripple");

      const existingRipple =
        button.querySelector(".ripple");

      if (existingRipple) {
        existingRipple.remove();
      }

      button.appendChild(circle);
    });
  });

  // --------------------------------------------------------
  // Contact form
  // --------------------------------------------------------

  const contactForm = document.getElementById("contactForm");

  if (contactForm) {
    contactForm.addEventListener("submit", async (e) => {
      e.preventDefault();

      const name = document.getElementById("name");
      const email = document.getElementById("email");
      const phone = document.getElementById("phone");
      const message = document.getElementById("message");
      const submitButton = contactForm.querySelector(
        'button[type="submit"]'
      );

      // Validate fields
      if (
        !name.value.trim() ||
        !email.value.trim() ||
        !phone.value.trim() ||
        !message.value.trim()
      ) {
        alert(
          "Please fill in all fields before submitting."
        );
        return;
      }

      // Prevent duplicate submissions
      const originalButtonText = submitButton
        ? submitButton.textContent
        : "";

      if (submitButton) {
        submitButton.disabled = true;
        submitButton.textContent = "Sending...";
      }

      try {
        const formData = new FormData(contactForm);

        const response = await fetch(
          contactForm.getAttribute("action") || "send-email.php",
          {
            method: "POST",
            body: formData,
          }
        );

        let result;

        try {
          result = await response.json();
        } catch (jsonError) {
          throw new Error(
            "The server returned an unexpected response."
          );
        }

        if (response.ok && result.success) {
          alert(
            "Thank you. Your message has been sent successfully. We will get back to you shortly."
          );

          contactForm.reset();
        } else {
          alert(
            result.message ||
              "We were unable to send your message. Please try again later."
          );
        }
      } catch (error) {
        console.error(
          "Contact form submission error:",
          error
        );

        alert(
          "We could not send your message right now. Please check your internet connection and try again later."
        );
      } finally {
        if (submitButton) {
          submitButton.disabled = false;
          submitButton.textContent = originalButtonText;
        }
      }
    });
  }
});