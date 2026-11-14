(function () {
  "use strict";

  var cards = Array.prototype.slice.call(document.querySelectorAll(".rr-color-card"));
  var preview = document.getElementById("rr-shingle-preview");
  var previewSource = document.getElementById("rr-shingle-preview-source");
  var previewPanel = document.querySelector(".rr-color-preview");
  var selectedName = document.getElementById("rr-selected-name");
  var selectedDescription = document.getElementById("rr-selected-description");
  var sunlight = document.getElementById("rr-sunlight");
  var status = document.getElementById("rr-shingle-status");

  if (!cards.length || !preview || !selectedName || !selectedDescription) {
    return;
  }

  function setColor(card, updateUrl) {
    cards.forEach(function (item) {
      item.setAttribute("aria-pressed", item === card ? "true" : "false");
    });

    preview.style.opacity = "0.55";
    if (previewSource) {
      previewSource.srcset = card.getAttribute("data-preview-avif");
    }
    preview.src = card.getAttribute("data-preview");
    preview.alt = card.getAttribute("data-name") + " Owens Corning Duration shingle swatch";
    selectedName.textContent = card.getAttribute("data-name");
    selectedDescription.textContent = card.getAttribute("data-description");

    if (updateUrl && window.history && window.history.replaceState) {
      var url = new URL(window.location.href);
      url.searchParams.set("color", card.getAttribute("data-slug"));
      window.history.replaceState({}, "", url.pathname + url.search + url.hash);
    }

    if (status) {
      status.textContent = card.getAttribute("data-name") + " selected.";
    }
  }

  preview.addEventListener("load", function () {
    preview.style.opacity = "1";
  });

  cards.forEach(function (card) {
    card.addEventListener("click", function () {
      setColor(card, true);

      if (previewPanel) {
        window.requestAnimationFrame(function () {
          previewPanel.scrollIntoView({ behavior: "instant", block: "start" });
        });
      }
    });
  });

  if (sunlight) {
    sunlight.addEventListener("input", function () {
      var percent = Number(sunlight.value);
      preview.style.setProperty("--rr-brightness", String(percent / 100));
      sunlight.setAttribute("aria-valuetext", percent + "% simulated sunlight");
    });
  }

  var requested = new URLSearchParams(window.location.search).get("color");
  var initial = cards.find(function (card) {
    return card.getAttribute("data-slug") === requested;
  }) || cards[0];

  setColor(initial, false);
})();
