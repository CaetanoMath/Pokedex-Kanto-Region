const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')
const limit=12;
let offset = 0;
estadoShiny = true

const maxRecords=151



function loadPokemonItens(offset,limit){
    pokeApi.getPokemons(offset,limit).then((pokemons=[]) => {
        const newHtml = pokemons.map((pokemon) => `
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
                <button class="open-button" onclick="show(${pokemon.number})">
                
                </button>
                
                <div class="modal" id="modal-${pokemon.number}">
                    <div class="modalContent ${pokemon.type}" id="detalhes">
                        <div class="close">
                            
                            
                            
                            <ol class="types-detail">
                                ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                            </ol>
                            
                            <button type="button" onclick="fechar(${pokemon.number})">x</button>
                        </div>
                        
                        <div class="card-detail">
                            

                            <img class="img-detail"src="${pokemon.photo}"  alt="${pokemon.name}">
                            
                            <div class="sound-name">
                                <audio controls="play/pause" >
                                    <source src="${pokemon.cries}" type="audio/mp3" />
                                    Seu navegador não suporta HTML5
                                </audio>
                            </div> 

                        </div>
                        <div class="stats">
                        <h2>${pokemon.name}</h2>
                            <ol>
                                <li>
                                    <span class="stats-name">Height:</span><br>
                                    <span class="stats-value">${pokemon.height/10} m</span>
                                </li>
                                <li>
                                    <span class="stats-name">Weight:</span><br>
                                    <span class="stats-value">${pokemon.weight/10}kg</span>
                                </li>
                                <li>
                                
                            </ol>
                            
                              
                        </div>
                        
                        <div class="shiny-content">
                            <h3>Shiny form</h2>
                            <img class="img-shiny"src="${pokemon.frontShiny}"  alt="${pokemon.name} shiny frontal" id="shiny-${pokemon.name}">
                            <button type="button"  onclick="inputShiny('${pokemon.name}','${pokemon.frontShiny}','${pokemon.backShiny}')">
                                <img src="https://static.thenounproject.com/png/90765-200.png">
                            </button>
                        </div>

                    </div>
                </div>
            </li>
        `).join('')

        pokemonList.innerHTML += newHtml
    })
}

loadPokemonItens(offset,limit)

loadMoreButton.addEventListener('click',() => {
    offset += limit
    const qtdRecord = offset + limit
    if(qtdRecord >= maxRecords){
        const newLimit = maxRecords-offset;
        loadPokemonItens(offset,newLimit)

        loadMoreButton.parentElement.removeChild(loadMoreButton)
    }
    else{
        loadPokemonItens(offset,limit)
    }
    
})

function show(numero){
    detalhes = document.getElementById(`modal-${numero}`)
    detalhes.style.display = "block"
}

function fechar(numero){

    detalhes = document.getElementById(`modal-${numero}`)
    detalhes.style.display = "none"
}


function inputShiny(nome,frente,costas){
    imagem = document.getElementById(`shiny-${nome}`)

    if(estadoShiny== true){
        imagem.src = costas;
        imagem.alt = `${nome} shiny costas`
        estadoShiny = false;
    }
    else{
        imagem.src=frente;
        imagem.alt = `${nome} shiny frontal`
        estadoShiny = true;
    }
    
}
