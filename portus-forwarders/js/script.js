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

            const value = Math.floor(progress * target);

            counter.textContent = value;

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
  // Contact form validation
  // --------------------------------------------------------

  const contactForm = document.getElementById("contactForm");

  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      const name = document.getElementById("name");
      const email = document.getElementById("email");
      const phone = document.getElementById("phone");
      const message = document.getElementById("message");

      const fields = [
        name,
        email,
        phone,
        message,
      ];

      const hasEmptyField = fields.some(
        (field) => !field || !field.value.trim()
      );

      if (hasEmptyField) {
        e.preventDefault();

        alert(
          "Please fill in all fields before submitting."
        );

        return;
      }

      // IMPORTANT:
      // Do not call e.preventDefault() here.
      //
      // When validation passes, the browser must be
      // allowed to submit the form normally to:
      //
      // send-email.php
    });
  }
});