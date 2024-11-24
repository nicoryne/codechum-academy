/* ==================
   PokeAPI Service Scripts
   ================== */

// Initialized chunk of PokeAPI address for reusaability
const apiAddress = "https://pokeapi.co/api/v2/";

/**
 * Helper method to fetch Pokemon by IDs
 * @param {number} pokemonId - The ID of the Pokémon to fetch
 * @returns {Object} - Pokémon data, including name, image, types, height, and weight
 */
const fetchPokemonDataById = async (pokemonId) => {
  let apiUrl = `${apiAddress}pokemon/${pokemonId}`;

  // Fetch data from the API and parse the response as JSON
  const res = await fetch(apiUrl);
  const data = await res.json();

  // Extract relevant data and return as a structured object
  let pokemonData = {
    id: data.id,
    name: data.name,
    image: data.sprites.front_default,
    types: data.types.map((typeInfo) => typeInfo.type.name),
    height: data.height,
    weight: data.weight,
  };

  return pokemonData;
};

/**
 * Fetches data for a list of Pokémon by their IDs in a specified range
 * @param {number} start - The starting Pokémon ID
 * @param {number} end - The ending Pokémon ID
 * @returns {Array} - An array of Pokémon data objects
 */
export const fetchPokemonDataList = async (start, end) => {
  const fetchPromises = [];

  // Loop through the specified range and push fetch promises for each Pokémon
  for (let i = start; i <= end; i++) {
    fetchPromises.push(fetchPokemonDataById(i));
  }

  try {
    // Wait for all the fetch requests to complete and return the results
    const data = await Promise.all(fetchPromises);
    return data;
  } catch (err) {
    console.error("Failed to fetch Pokemon data:", err);
  }

  return [];
};

/**
 * Fetches all available Pokémon types from the API
 * @returns {Array} - A list of Pokémon types
 */
export const fetchPokemonTypes = async () => {
  let apiUrl = `${apiAddress}type/?`;

  // Fetch data from the API and parse the response as JSON
  const res = await fetch(apiUrl);
  const data = await res.json();

  return data.results;
};
