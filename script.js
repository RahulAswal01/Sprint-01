const menuButton = document.querySelector(".menuToggle");
const navLinks = document.querySelector(".navbarLinks");
const mobileScreen = window.matchMedia("(max-width: 820px)");

let menuIsOpen = false;

function showMobileMenu() {
  navLinks.style.display = "flex";
  navLinks.style.flexDirection = "column";
  navLinks.style.alignItems = "flex-start";
  navLinks.style.gap = "1rem";
  navLinks.style.position = "absolute";
  navLinks.style.top = "70px";
  navLinks.style.left = "0";
  navLinks.style.right = "0";
  navLinks.style.padding = "1.2rem 3rem";
  navLinks.style.backgroundColor = "#e1f2fe";
  navLinks.style.boxShadow = "0 12px 20px rgba(23, 33, 43, 0.12)";
  navLinks.style.zIndex = "10";
}

function hideMobileMenu() {
  navLinks.style.display = "none";
}

function resetDesktopMenu() {
  navLinks.removeAttribute("style");
  menuButton.setAttribute("aria-expanded", "false");
  menuIsOpen = false;
}

function updateMenuView() {
  if (!mobileScreen.matches) {
    resetDesktopMenu();
    return;
  }

  document.querySelector(".navbar").style.position = "relative";
  menuIsOpen ? showMobileMenu() : hideMobileMenu();
  menuButton.setAttribute("aria-expanded", String(menuIsOpen));
}

if (menuButton && navLinks) {
  menuButton.setAttribute("aria-label", "Open navigation menu");
  menuButton.setAttribute("aria-expanded", "false");

  menuButton.addEventListener("click", () => {
    menuIsOpen = !menuIsOpen;
    updateMenuView();
  });

  navLinks.addEventListener("click", (event) => {
    if (event.target.tagName === "A" && mobileScreen.matches) {
      menuIsOpen = false;
      updateMenuView();
    }
  });

  mobileScreen.addEventListener("change", updateMenuView);
  updateMenuView();
}
