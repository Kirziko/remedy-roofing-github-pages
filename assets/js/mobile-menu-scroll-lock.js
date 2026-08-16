(function () {
  function initializeMobileMenuScrollLock() {
    const menu = document.getElementById("navcol-2");
    const body = document.body;

    if (!menu || !body) return;

    let savedScrollPosition = 0;

    function lockPageScroll() {
      if (window.innerWidth >= 768 || body.classList.contains("rr-mobile-menu-open")) {
        return;
      }

      savedScrollPosition = window.scrollY || document.documentElement.scrollTop || 0;
      body.style.setProperty("--rr-menu-scroll-offset", `-${savedScrollPosition}px`);
      body.classList.add("rr-mobile-menu-open");
    }

    function unlockPageScroll() {
      if (!body.classList.contains("rr-mobile-menu-open")) return;

      body.classList.remove("rr-mobile-menu-open");
      body.style.removeProperty("--rr-menu-scroll-offset");
      window.scrollTo(0, savedScrollPosition);
    }

    menu.addEventListener("show.bs.collapse", lockPageScroll);
    menu.addEventListener("hidden.bs.collapse", unlockPageScroll);

    window.addEventListener("resize", function () {
      if (window.innerWidth >= 768) unlockPageScroll();
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initializeMobileMenuScrollLock);
  } else {
    initializeMobileMenuScrollLock();
  }
})();
