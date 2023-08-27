const pokemonList = document.getElementById('pokemonList');
const loadMoreButton = document.getElementById('loadMoreButton');

const maxRecords = 151;
const limit = 10;
let offset = 0;

function convertPokemonToLi(pokemon) {
    return `
        <li class="pokemon ${pokemon.type}">
            <span class="number">#${pokemon.number}</span>
            <span class="name">${pokemon.name}</span>

            <div class="detail">
                <ol class="types">
                    ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                </ol>

                <img src="${pokemon.photo}" alt="${pokemon.name}">
                
                <!-- Botão para abrir a modal -->
                <button class="open-modal-button" data-modal-target="modal-${pokemon.number}" title="Clique para saber mais"></button>
                
                <!-- Modal -->
                <div id="modal-${pokemon.number}" class="modal">
                    <div class="modal-content">
                        <span class="close-button " data-modal-target="modal-${pokemon.number}">&times;</span>
                        <h2>${pokemon.name} Details</h2>
                       <div class="center"> <img src="${pokemon.photo}" alt="${pokemon.name}"></div>
                        <p>HP: ${pokemon.hp}</p>
                        <p>Attack: ${pokemon.attack}</p>
                        <p>Defense: ${pokemon.defense}</p>
                        <p>Abilities: ${pokemon.abilities.join(', ')}</p>
                    </div>
                </div>
            </div>
        </li>
    `;
}

function loadPokemonItens(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map(convertPokemonToLi).join('');
        pokemonList.innerHTML += newHtml;

        // Adicione um evento de clique aos botões "Open Modal"
        const openModalButtons = document.querySelectorAll('.open-modal-button');
        openModalButtons.forEach((button) => {
            button.addEventListener('click', () => {
                const modalTarget = button.getAttribute('data-modal-target');
                const modal = document.getElementById(modalTarget);
                if (modal) {
                    modal.style.display = 'block';
                }
            });
        });

        // Adicione um evento de clique aos botões de fechar modal
        const closeButton = document.querySelectorAll('.close-button');
        closeButton.forEach((button) => {
            button.addEventListener('click', () => {
                const modalTarget = button.getAttribute('data-modal-target');
                const modal = document.getElementById(modalTarget);
                if (modal) {
                    modal.style.display = 'none';
                }
            });
        });
    });
}

loadPokemonItens(offset, limit);

loadMoreButton.addEventListener('click', () => {
    offset += limit;
    const qtdRecordsWithNexPage = offset + limit;

    if (qtdRecordsWithNexPage >= maxRecords) {
        const newLimit = maxRecords - offset;
        loadPokemonItens(offset, newLimit);
        loadMoreButton.parentElement.removeChild(loadMoreButton);
    } else {
        loadPokemonItens(offset, limit);
    }
});
