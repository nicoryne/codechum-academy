document.addEventListener("DOMContentLoaded", (e) => {
  
  const toggleMobileMenu = () => {
    const headerNav = document.getElementById("header-nav");
    if (headerNav.style.display === "none" || headerNav.style.display === '') {
      headerNav.style.display = "block";
    } else {
      headerNav.style.display = "none";
    }
  };

  const initHamburgerButton = () => {
    const hamburgerBtn = document.getElementById("btn-hamburger");
    hamburgerBtn.addEventListener("click", toggleMobileMenu);
  }
  
  const fetchTotalPages = async () => {
    const POKEMON_PER_PAGE = 6;

    let pokemonCount = await fetchTotalPokemonCount();
    pages = pokemonCount / POKEMON_PER_PAGE;
    return pages;
  }

  let pageStart = 1;
  let pageEnd = 0;
  let currPage = pageStart;

  const registerPagination = async () => {
    const pkmnPagination = document.getElementById("pkmn-pagination");
    pageEnd = await fetchTotalPages();

    for(let i = pageStart; i < 6 && i <= pageEnd; i++) {
      const page = document.createElement("a");
      page.innerText = i;
      
      if(i == currPage) {
        page.setAttribute("id", "active");
      } else if (i < currPage) {
        page.setAttribute("id", "prevPage");
      } else {
        page.setAttribute("id", "nextPage");
      }

      const nextPageAnchor = document.getElementById("nextPage");
      
      if(nextPageAnchor) {
        nextPageAnchor.addEventListener("click", () => {currPage++});
      }
      pkmnPagination.appendChild(page);
    }
  }

  console.log(currPage)
  

  registerPagination();
  initHamburgerButton();
  fetchAndRenderPokemonSubset(currPage, currPage + 5);
});
