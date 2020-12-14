import pk_ls from './pk_ls.js';

// Step 0
function loadParty() {
    let party = pk_ls.getPartyList();
    
    party.forEach( pokemon => {
        const el = createPokemonElement(pokemon)
        addToParty(el);
    })
}

// Step 1
function newPokemon() {
    const pokemon = createPokemon();
    const pokemonDiv = createPokemonElement(pokemon);
    addToParty(pokemonDiv);
    pk_ls.addToParty(pokemon);
}

// Step 2
function createPokemon() {
    const imageID = document.querySelector('#main_image');
    const nameID = document.querySelector('#name_div');
    const typeID = document.querySelector('#type_div');
    const newPokemon = { id: Date.now(), imageID: imageID.src, nameID: nameID.textContent, typeID: typeID.textContent};
    return newPokemon;
}

// Step 3
function createPokemonElement(pokemon) {
    // Pokemon div
    const pokemonDiv = document.createElement('div');

    // Pokemon image
    const pokemonImage = document.createElement('img');
    pokemonImage.classList.add('party-image');
    pokemonImage.src = pokemon.imageID;

    // Pokemon name
    const pokemonName = document.createElement('div');
    pokemonName.innerText = "Name:\xa0" + pokemon.nameID;

    // Pokemon type
    const pokemonType = document.createElement('div');
    pokemonType.innerText = "Type:\xa0" + pokemon.typeID;

    // Delete button
    const removeButton = document.createElement('button');
    removeButton.setAttribute('data-id', pokemon.id);
    removeButton.classList.add('pokemon-remove-button');
    removeButton.innerText = "Remove";
    removeButton.onclick = removeFromParty;
    
    pokemonDiv.appendChild(pokemonImage);
    pokemonDiv.appendChild(pokemonName);
    pokemonDiv.appendChild(pokemonType);
    pokemonDiv.appendChild(removeButton);

    return pokemonDiv;
}

// Step 4
function addToParty(pokemonDiv) {
    // Add to the document
    document.querySelector('#party').appendChild(pokemonDiv);
}

// Event Handlers
function removeFromParty(e) {
    const btn = e.currentTarget;
    pk_ls.removePokemon(btn.getAttribute('data-id'));
    document.querySelector('#party').innerHTML = '';
    loadParty();
}

export default {
    loadParty,
    newPokemon, 
    createPokemon,
    createPokemonElement,
    addToParty,
    removeFromParty
}