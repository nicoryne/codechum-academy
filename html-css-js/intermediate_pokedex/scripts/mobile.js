/* ==================
   Mobile Responsiveness Scripts
   ================== */

/**
 * Toggles the visibility of the mobile navigation menu
 */
const toggleMobileMenu = () => {
  const headerNav = document.getElementById("header-nav");

  // Show or hide the navigation menu based on its current state
  if (headerNav.style.display === "none" || headerNav.style.display === "") {
    headerNav.style.display = "block";
  } else {
    headerNav.style.display = "none";
  }
};

/**
 * Sets up the hamburger button to control the mobile navigation menu
 */
export const initHamburgerButton = () => {
  const hamburgerBtn = document.getElementById("btn-hamburger");

  // Attach click event listener to toggle the menu
  hamburgerBtn.addEventListener("click", toggleMobileMenu);
};
