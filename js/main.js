const pokeContent = document.getElementById('pokemonContent');
let pokeForm = document.getElementById('searchPokemon');
let generationshow = 1
const modalSearch = document.getElementById('pokemonContent')
const divGeneration = document.getElementById('textGen')


function showPokemonGen(gen){
    const pokemonGen = {
        1:[1, 151],
        2:[152,251],
        3:[252, 386]
    };

    const pokemonGenDefault = [1, 151];
    const generacion = pokemonGen[gen] || pokemonGenDefault;
    return generacion;
    
}

let pokemonGeneration = showPokemonGen(generationshow)


/*cambiar de generacion*/

let arrowRight = document.getElementById('arrow-right').addEventListener('click', e=>{
   
    if (generationshow < 3){
        modalSearch.innerHTML = '';
       generationshow += 1
       pokemonGeneration = showPokemonGen(generationshow)
       divGeneration.innerHTML = '# ' + generationshow
       drawPokemon()
   }
})


let arrowleft = document.getElementById('arrow-left').addEventListener('click', e=>{
    
     if (generationshow > 1){
        modalSearch.innerHTML = '';
        generationshow -= 1
        pokemonGeneration = showPokemonGen(generationshow)
        divGeneration.innerHTML = '# ' + generationshow
        drawPokemon()
        console.log(generationshow)
    }
 })


const drawPokemon = async () =>{
    for (let i = pokemonGeneration[0]; i <= pokemonGeneration[1]; i++) {
		await getPokemon(i);
	}
}

const getPokemon = async (id, modal) =>{
    const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
    const rest = await fetch(url);
    const pokemon = await rest.json();
    createPokemon(pokemon, modal);
}

/*pintar card pokemon*/
const colors = {
    fire: '#FFA05D',
	grass: '#8ef595',
	electric: '#e5f76f',
	water: '#78abff',
	ground: '#ab9f79',
	rock: '#bfbdbd',
	poison: '#c97dc7',
	bug: '#abf5d4',
	dragon: '#ff7452',
	psychic: '#fcacc4',
	flying: '#96aed6',
	fighting: '#ff7575',
	normal: '#fff0d4',
    undefined: '#ddc0fa'
}

const main_types = Object.keys(colors)


function  createPokemon(pokemon, modal){
    const pokemonEl = document.createElement('div');
    
	pokemonEl.classList.add('pokemon');
    
	const poke_types = pokemon.types.map(type => type.type.name);
	const type = main_types.find(type => poke_types.indexOf(type) > -1);
	const name = pokemon.name[0].toUpperCase() + pokemon.name.slice(1);
	const color = colors[type];
	
	pokemonEl.style.backgroundColor = color;

	

	if (modal !==true){
        const pokeInnerHTML = `
        <div class="img-container">
            <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
							pokemon.id
						}.png" alt="${name}" />
        </div>
        <div class="info">
            <span class="number">#${pokemon.id.toString().padStart(3, '0')}</span>
            <h3 class="name">${name}</h3>
            <small class="type">Tipo: <span>${type}</span></small>
        </div>
    `;
        pokemonEl.innerHTML = pokeInnerHTML;
        pokeContent.appendChild(pokemonEl);
    }

    else{
        const pokeInnerHTML = `
        <div class="modal" id="modalPokemon">
        <div class="pokemon">
        <div class="img-container">
            <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
							pokemon.id
						}.png" alt="${name}" />
        </div>
        <div class="info">
            <span class="number">#${pokemon.id.toString().padStart(3, '0')}</span>
            <h3 class="name">${name}</h3>
            <div class="type"><span>Tipo: ${type}</span></div>
            <div><span>Altura: ${pokemon.height.toString()}</span></div>
            <div><span>Peso: ${pokemon.weight.toString()}</span></div>
        </div>
        </div>
        </div>
    </div>`;
    modalSearch.innerHTML = pokeInnerHTML;
        
    }
}

drawPokemon()


/*Buscar pokemon*/

pokeForm.addEventListener('submit', e =>{
    e.preventDefault();
    let searchPokemon = document.getElementById('pokemon').value;
    getPokemon(searchPokemon, true);
})

function exitModal(){
   const modalPokemon = document.getElementById('modalPokemon');
   modalPokemon.style.display ='none'
   drawPokemon()
}
