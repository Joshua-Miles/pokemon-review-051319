const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

const request = (path, options) => {
    return fetch(path, options)
        .then( res => res.json())
        .then( results => {
            if(results.error) alert(results.message)
            else return results
        })
}

let c = tagName => document.createElement(tagName)

const main = () => {
    Promise.all([ 
        request(TRAINERS_URL),
        request(POKEMONS_URL)
    ])
        .then(renderTrainers)
}

const renderTrainers = ([ trainers, pokemons ]) => {
    let main = document.querySelector('main')
    main.innerHTML = ''
    trainers.forEach( trainer => {
        trainer.pokemons = pokemons.filter( pokemon => pokemon.trainer_id === trainer.id)
        renderTrainer(trainer)
    })
}

const renderTrainer = trainer => {
    let main = document.querySelector('main')
    let pokemonList = renderPokemonList(trainer)
    let card = (
        div({ class: 'card' },
            p(trainer.name),
            button('Add Pokemon', { click: function(){
                addPokemon(trainer.id)
                    .then( pokemon => {
                        pokemonList.append( renderPokemonCard(pokemon) )
                    })
            }}),
            pokemonList
        )
    )

    main.append(
        card
    )
}

const renderPokemonList = trainer => {
    return ul(
        ...trainer.pokemons.map( pokemon => (
            renderPokemonCard(pokemon)
         ))
    )
} 

const renderPokemonCard = (pokemon) => {
   let listItem = (
        li(
            `${pokemon.nickname} (${pokemon.species})`,
            button('Release', { class: 'release', click: function(){
                listItem.remove()
                removePokemon(pokemon.id)
            }})
        )
   )
   return listItem
}


const addPokemon = trainer_id => {
    return request(POKEMONS_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ trainer_id })
    })
}

const removePokemon = pokemon_id => {
    request(`${POKEMONS_URL}/${pokemon_id}`, {
        method: 'DELETE',
    })
}

document.addEventListener('DOMContentLoaded', main)