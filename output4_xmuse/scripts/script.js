/**
 * Waits for the document to be fully loaded and initializes functions
 * within the scope.
 */
$(function () {
  // Initialize the Slick slider
  initializeSlickSlider();

  // Set up the scroll event listener for the parallax effect
  setupScrollParallax();
});

/**
 * Initializes the Slick slider for product previews.
 */
function initializeSlickSlider() {
  $(".product-preview").slick({
    // Enable navigation dots at the bottom of the slider
    dots: true,

    // Enable side arrows at the left and right side of the slider
    arrows: true,

    // Adjust the slider's height based on the current slide's height
    adaptiveHeight: true,
  });
}

/**
 * Sets up the scroll event listener to create a parallax effect on scroll.
 */
function setupScrollParallax() {
  window.addEventListener("scroll", handleScroll);
}

/**
 * Handles the scroll event, calculates the parallax effect,
 * and updates the positions of the background and reindeer elements.
 */
function handleScroll() {
  const scrollPosition = window.scrollY;
  const parallaxSpeed = 2;

  // Apply the parallax effect to various elements
  updateParallaxBackgrounds(scrollPosition, parallaxSpeed);
  updateReindeerPositions(scrollPosition, parallaxSpeed);
}

/**
 * Updates the background positions of elements with parallax effects.
 * @param {number} scrollPosition - The current scroll position.
 * @param {number} parallaxSpeed - The speed factor for the parallax effect.
 */
function updateParallaxBackgrounds(scrollPosition, parallaxSpeed) {
  const backgroundPosition = scrollPosition * parallaxSpeed;

  // Apply the parallax effect to trees and snow backgrounds
  document.querySelectorAll(".trees-parallax").forEach((element) => {
    element.style.backgroundPosition = `${backgroundPosition}px center`;
  });

  document.querySelectorAll(".snow-bg").forEach((element) => {
    element.style.backgroundPosition = `center ${backgroundPosition}px`;
  });
}

/**
 * Updates the positions of the reindeer elements based on the scroll position.
 * @param {number} scrollPosition - The current scroll position.
 * @param {number} parallaxSpeed - The speed factor for the reindeer movement.
 */
function updateReindeerPositions(scrollPosition, parallaxSpeed) {
  // Update the left and right reindeer positions
  const leftReindeer = document.querySelector(".reindeer-left");
  const rightReindeer = document.querySelector(".reindeer-right");

  if (leftReindeer) {
    leftReindeer.style.left = `${20 - scrollPosition * 0.1}%`;
  }

  if (rightReindeer) {
    rightReindeer.style.right = `${20 - scrollPosition * 0.1}%`;
  }
}
