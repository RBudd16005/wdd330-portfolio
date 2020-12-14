import pk_party from './pk_party.js';

// Step 0
pk_party.loadParty();

// Event Listners
document.querySelector('#search_button').onclick = searchPokemon;
document.querySelector('#add_button').onclick = pk_party.newPokemon;

// Fetches infomation from the API and converts it to JSON
async function getPokemonJSON(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw Error(response.statusText);
    } else {
      const fetchJson = await response.json();
      return fetchJson;
    }
  } catch (error) {
    alert("Name not recognized.");
    console.log(error);
  }
}


// Fetches the Pokemon information and populates the HTML with the information
async function searchPokemon() {
  const search = document.getElementById("search_input").value;
  if (search) {
    // Get the data
    const result = await getPokemonJSON("https://pokeapi.co/api/v2/pokemon/" + search);

    // Get the picture
    const mainImageElement = document.getElementById("main_image");
    mainImageElement.src = result.sprites.front_default;

    // Get the name and number
    const nameDivElement = document.getElementById("name_div");
    nameDivElement.innerText = result.name.charAt(0).toUpperCase() + result.name.slice(1) + ' #' + result.id;

    // Get the type/s
    const typeDivElement = document.getElementById("type_div");
    const typesList = result.types;
    typeDivElement.innerText = typesList[0].type.name.charAt(0).toUpperCase() + typesList[0].type.name.slice(1);
    if (typesList[1]) {
      typeDivElement.innerText += '/' + typesList[1].type.name.charAt(0).toUpperCase() + typesList[1].type.name.slice(1);
    }

    // Get ability/ies
    const abilityDivElement = document.getElementById("ability_div");
    const abilityList = result.abilities;
    abilityDivElement.innerText = abilityList[0].ability.name.charAt(0).toUpperCase() + abilityList[0].ability.name.slice(1);
    if (abilityList[1]){
      abilityDivElement.innerText += '/' + abilityList[1].ability.name.charAt(0).toUpperCase() + abilityList[1].ability.name.slice(1);
    }
    if (abilityList[2]){
      abilityDivElement.innerText += "/" + abilityList[2].ability.name.charAt(0).toUpperCase() + abilityList[2].ability.name.slice(1);
    }

    // Get stats
    const hpDivElement = document.getElementById("hp_div");
    const atkDivElement = document.getElementById("atk_div");
    const defDivElement = document.getElementById("def_div");
    const spatkDivElement = document.getElementById("spatk_div");
    const spdefDivElement = document.getElementById("spdef_div");
    const spdDivElement = document.getElementById("spd_div");
    const statList = result.stats;

    hpDivElement.innerText = statList[0].base_stat;
    atkDivElement.innerText = statList[1].base_stat;
    defDivElement.innerText = statList[2].base_stat;
    spatkDivElement.innerText = statList[3].base_stat;
    spdefDivElement.innerText = statList[4].base_stat;
    spdDivElement.innerText = statList[5].base_stat;

    // Get move/s
    const moveResult = result.moves
    const moveList = document.getElementById("move_list").children[1];
    moveList.innerHTML = "";

    moveResult.forEach(function (move) {
      let listMove = document.createElement("tr");
      listMove.innerHTML = `
      <td>&nbsp;&nbsp;&nbsp;${move.version_group_details[0].level_learned_at}</td>
      <td>${move.move.name}</td>
      `;

      moveList.appendChild(listMove);
    });
    
  }
  else {
    alert("Please input a Pokemon name!");
  }
}

