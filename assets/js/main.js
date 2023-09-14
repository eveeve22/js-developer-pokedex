
const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')
const transformContent = document.getElementById('pokemonList')

const maxRecords = 151
const limit = 10
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

                <img src="${pokemon.photo}"
                     alt="${pokemon.name}">
            </div>
        </li>
    `
}


function loadPokemonItens(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map(convertPokemonToLi).join('')
        pokemonList.innerHTML += newHtml
        console.log(newHtml)   
     })
}

loadPokemonItens(offset, limit)

loadMoreButton.addEventListener('click', () => {
    offset += limit
    const qtdRecordsWithNexPage = offset + limit

    if (qtdRecordsWithNexPage >= maxRecords) {
        const newLimit = maxRecords - offset
        loadPokemonItens(offset, newLimit)

        loadMoreButton.parentElement.removeChild(loadMoreButton)
    } else {
        loadPokemonItens(offset, limit)
    }
})



// Função para abrir a janela modal
function openModal() {
    const windowModal = document.getElementById('windowModal')
    windowModal.classList.add('abrir')
}

// Função para fechar a janela modal
document.getElementById('fechar').addEventListener('click', () => {
    const windowModal = document.getElementById('windowModal')
    windowModal.classList.remove('abrir')
});

// Função para buscar e exibir os detalhes do Pokémon
function buscarPokemon() {
    const pokemonNumberInput = document.getElementById('PokemonNumberInput')
    const pokemonNumber = parseInt(pokemonNumberInput.value)

    pokeApi.getPokemonDetail({ url: `https://pokeapi.co/api/v2/pokemon/${pokemonNumber}/` })
        .then((pokemon) => {
            const pokemonName = document.getElementById('pokemonName')
            const pokemonNumber = document.getElementById('pokemonNumber')
            const pokemonTypes = document.getElementById('pokemonTypes')
            const pokemonImage = document.getElementById('pokemonImage')
            
            pokemonName.textContent = pokemon.name
            pokemonNumber.textContent = pokemon.number
            pokemonTypes.textContent = pokemon.types.join(', ')
            pokemonImage.src = pokemon.photo
            
            

            const pokemonDetails = document.getElementById('pokemonDetails')
            pokemonDetails.style.display = 'block'
        })
        .catch((error) => {
            console.error('Erro ao buscar o Pokémon:', error)
        })
}

// Adicione um evento de clique ao botão "Buscar"
document.getElementById('buscar').addEventListener('click', buscarPokemon)
