(function () {
  const header = document.querySelector(".navbar.sticky-top");
  if (!header) return;

  // Keep existing ad URLs, but land at each section's orange divider.
  const dividers = {
    reviews: "rr-reviews-swing-trigger",
    process: "rr-process-swing-trigger",
    "request-inspection": "rr-inspection-divider"
  };
  const targets = Array.from(document.querySelectorAll(
    ".rr-mobile-swing-trigger, #roofing-services, #reviews, #process, #request-inspection"
  ));
  let followAnchor = Boolean(window.location.hash);
  let frame = 0;

  function updateAnchors() {
    frame = 0;
    // Overlay the section divider with the header's orange bottom border.
    const headerLine = header.getBoundingClientRect().bottom -
      parseFloat(getComputedStyle(header).borderBottomWidth);

    targets.forEach(function (target) {
      const divider = document.getElementById(dividers[target.id]) || target;
      const offset = target.getBoundingClientRect().top - divider.getBoundingClientRect().top;
      target.style.scrollMarginTop = (headerLine + offset) + "px";
    });

    if (!followAnchor) return;
    let id;
    try {
      id = decodeURIComponent(window.location.hash.slice(1));
    } catch (_) {
      return;
    }
    const target = document.getElementById(id);
    if (!targets.includes(target)) return;
    const divider = document.getElementById(dividers[id]) || target;
    window.scrollTo({
      top: window.scrollY + divider.getBoundingClientRect().top - headerLine,
      behavior: "instant"
    });
  }

  function scheduleUpdate() {
    if (!frame) frame = window.requestAnimationFrame(updateAnchors);
  }

  // Correct initial fragment positioning as fonts and lazy images settle.
  // Stop following as soon as the visitor interacts, so scrolling stays free.
  ["wheel", "touchstart", "pointerdown"].forEach(function (event) {
    window.addEventListener(event, function () { followAnchor = false; }, { passive: true });
  });
  window.addEventListener("keydown", function (event) {
    if (["ArrowUp", "ArrowDown", "PageUp", "PageDown", "Home", "End", " ", "Tab"].includes(event.key)) {
      followAnchor = false;
    }
  });
  window.addEventListener("hashchange", function () {
    followAnchor = true;
    scheduleUpdate();
  });
  window.addEventListener("resize", scheduleUpdate);
  window.addEventListener("load", scheduleUpdate);
  if (document.fonts) document.fonts.ready.then(scheduleUpdate);
  if (window.ResizeObserver) {
    const observer = new ResizeObserver(scheduleUpdate);
    observer.observe(header);
    observer.observe(document.body);
  }
  updateAnchors();
})();
