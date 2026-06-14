const menuButton = document.querySelector(".menuToggle");
const navLinks = document.querySelector(".navbarLinks");
const themeButton = document.querySelector(".themeToggle");
const mobileScreen = window.matchMedia("(max-width: 820px)");

let menuIsOpen = false;

function showMobileMenu() {
  navLinks.classList.add("showMenu");
}

function hideMobileMenu() {
  navLinks.classList.remove("showMenu");
}

function resetDesktopMenu() {
  hideMobileMenu();
  menuButton.setAttribute("aria-expanded", "false");
  menuIsOpen = false;
}

function updateMenuView() {
  if (!mobileScreen.matches) {
    resetDesktopMenu();
    return;
  }

  menuIsOpen ? showMobileMenu() : hideMobileMenu();
  menuButton.setAttribute("aria-expanded", String(menuIsOpen));
}

function updateThemeButton() {
  const darkModeIsOn = document.body.classList.contains("darkTheme");

  themeButton.setAttribute(
    "aria-label",
    darkModeIsOn ? "Switch to light mode" : "Switch to dark mode",
  );
  themeButton.setAttribute("aria-pressed", String(darkModeIsOn));
}

function setSavedTheme() {
  const savedTheme = localStorage.getItem("theme");

  if (savedTheme === "dark") {
    document.body.classList.add("darkTheme");
  }

  updateThemeButton();
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

if (themeButton) {
  setSavedTheme();

  themeButton.addEventListener("click", () => {
    document.body.classList.toggle("darkTheme");

    const newTheme = document.body.classList.contains("darkTheme")
      ? "dark"
      : "light";

    localStorage.setItem("theme", newTheme);
    updateThemeButton();
  });
}
