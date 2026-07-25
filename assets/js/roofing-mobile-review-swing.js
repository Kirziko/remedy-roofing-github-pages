(function () {
  document.addEventListener("DOMContentLoaded", function () {
    const trigger = document.querySelector("#rr-reviews-swing-trigger");
    const phoneButton = document.querySelector(".rr-mobile-phone");
    const stickyHeader = document.querySelector(".navbar.sticky-top");
    const mobileViewport = window.matchMedia("(max-width: 767.98px)");

    if (!trigger || !phoneButton || !stickyHeader) return;

    let hasTriggered = false;
    let previousTriggerTop = trigger.getBoundingClientRect().top;
    let ticking = false;

    function replaySwing() {
      phoneButton.classList.remove("swing", "animated");
      void phoneButton.offsetWidth;
      phoneButton.classList.add("swing", "animated");
    }

    function checkTriggerPosition() {
      const triggerTop = trigger.getBoundingClientRect().top;
      const headerBottom = stickyHeader.getBoundingClientRect().bottom;

      if (
        !hasTriggered &&
        mobileViewport.matches &&
        previousTriggerTop > headerBottom &&
        triggerTop <= headerBottom
      ) {
        hasTriggered = true;
        replaySwing();
      }

      previousTriggerTop = triggerTop;
      ticking = false;
    }

    window.addEventListener("scroll", function () {
      if (!ticking) {
        window.requestAnimationFrame(checkTriggerPosition);
        ticking = true;
      }
    }, { passive: true });

    window.addEventListener("resize", checkTriggerPosition);
  });
})();
