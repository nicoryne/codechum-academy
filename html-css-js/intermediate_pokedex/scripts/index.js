document.addEventListener("DOMContentLoaded", (e) => {
  const hamburgerBtn = document.getElementById("btn-hamburger");

  const toggleMobileMenu = () => {
    const headerNav = document.getElementById("header-nav");

    if (headerNav.style.display === "none") {
      headerNav.style.display = "block";
    } else {
      headerNav.style.display = "none";
    }
  };

  fetchAndRenderPokemonSubset();
});
