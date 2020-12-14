// Adds a Pokemon to local storage
function addToParty(pokemon) {
    const party = getPartyList();

    party.push(pokemon);
    saveParty(party);
}

// Filters out the removed Pokemon and saves the updated party to local storage
function removePokemon(id) {
    const party = getPartyList();

    const updatedParty = party.filter( pokemon => pokemon.id != id);
    saveParty(updatedParty);
}

// Pulls the party information from local storage and parses the JSON
function getPartyList() {
    const partyString = localStorage.getItem('party');
    let party = [];

    if (partyString) {
        party = JSON.parse(partyString);
    }

    return party;
}

// Saves the party information to local storage
function saveParty(party) {
    localStorage.setItem('party', JSON.stringify(party));
}

export default {
    addToParty,
    getPartyList,
    removePokemon
}