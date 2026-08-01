(function () {
  document.addEventListener("DOMContentLoaded", function () {
    const triggers = Array.from(document.querySelectorAll(".rr-mobile-swing-trigger"));
    const mobilePhoneButton = document.querySelector(".rr-mobile-phone");
    const desktopPhoneButton = document.querySelector(".rr-desktop-phone");
    const stickyHeader = document.querySelector(".navbar.sticky-top");
    const mobileViewport = window.matchMedia("(max-width: 767.98px)");

    if (!triggers.length || (!mobilePhoneButton && !desktopPhoneButton) || !stickyHeader) return;

    let previousTriggerTops = triggers.map(function (trigger) {
      return trigger.getBoundingClientRect().top;
    });
    let ticking = false;

    function replaySwing() {
      const phoneButton = mobileViewport.matches
        ? mobilePhoneButton
        : desktopPhoneButton;

      if (!phoneButton) return;

      phoneButton.classList.remove("swing", "animated");
      void phoneButton.offsetWidth;
      phoneButton.classList.add("swing", "animated");
    }

    function checkTriggerPosition() {
      const headerBottom = stickyHeader.getBoundingClientRect().bottom;
      let shouldReplaySwing = false;

      triggers.forEach(function (trigger, index) {
        const triggerTop = trigger.getBoundingClientRect().top;

        if (
          previousTriggerTops[index] > headerBottom &&
          triggerTop <= headerBottom
        ) {
          shouldReplaySwing = true;
        }

        previousTriggerTops[index] = triggerTop;
      });

      if (shouldReplaySwing) {
        replaySwing();
      }

      ticking = false;
    }

    function resetTriggerPositions() {
      previousTriggerTops = triggers.map(function (trigger) {
        return trigger.getBoundingClientRect().top;
      });
    }

    window.addEventListener("scroll", function () {
      if (!ticking) {
        window.requestAnimationFrame(checkTriggerPosition);
        ticking = true;
      }
    }, { passive: true });

    window.addEventListener("resize", resetTriggerPositions);
  });
})();
