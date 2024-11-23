const apiAddress = "https://pokeapi.co/api/v2/";


const fetchTotalPokemonCount = async () => {
  let apiUrl = `${apiAddress}pokemon/?`

  const res = await fetch(apiUrl);
  const data = await res.json();
  
  return data.count;
}

const fetchPokemonDataById = async (pokemonId) => {
  let apiUrl = `${apiAddress}pokemon/${pokemonId}`;

  const res = await fetch(apiUrl);
  const data = await res.json();

  let pokemonData = {
    id: data.id,
    name: data.name,
    image: data.sprites.front_default,
    types: data.types.map((typeInfo) => typeInfo.type.name),
    height: data.height,
    weight: data.weight,
  }
  
  return pokemonData;
};

const fetchPokemonDataList = async (start, end) => {
  const fetchPromises = [];

  for (let i = start; i <= end; i++) {
    fetchPromises.push(fetchPokemonDataById(i));
  }

  try {
    const data = await Promise.all(fetchPromises);
    return data;
  } catch (err) {
    console.error("Failed to fetch Pokemon data:", err);
  }

  return [];
};

const fetchAndRenderPokemonSubset = async (start, end) => {
  const pokemonSubset = await fetchPokemonDataList(start, end);

  const container = document.getElementById("pkmn-container");

  pokemonSubset.forEach((pokemon) => {
    const card = document.createElement("pokemon-card");
    card.setAttribute("pokemon", JSON.stringify(pokemon));
    container.appendChild(card);
  });
};
