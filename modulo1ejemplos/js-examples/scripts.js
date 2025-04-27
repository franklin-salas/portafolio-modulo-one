
document.addEventListener("DOMContentLoaded", function () {
    const inputs = document.querySelectorAll("input[type='text'], input[type='number']");

    inputs.forEach(input => {
        // Validar si el input está vacío al perder el foco
        input.addEventListener("blur", function () {
            const mensajeErrorId = `${this.id}-error`; // ID único para el mensaje
            const mensajeError = document.getElementById(mensajeErrorId);
            // Validar el campo
            if (!mensajeError) return;

            if (this.value.trim() === "") {
                this.style.border = "2px solid red";
                mensajeError.style.display="block";
                mensajeError.textContent = "Este campo es requerido.";
            } else {
                this.style.border = ""; // Limpia el borde si es válido
                mensajeError.textContent = ""; // Limpia el mensaje de error
                mensajeError.style.display="none";
            }
        });

        // Restaurar estilo al escribir algo
        input.addEventListener("input", function () {
            this.style.border = ""; // Limpia el borde
            const mensajeError = document.getElementById(`${this.id}-error`);
            if (mensajeError){
             mensajeError.textContent = ""; // Limpia el mensaje de error
             mensajeError.style.display="none";
            }    
        });
    });
});

// 1. Función declarativa
function cuadrado(x) {
    return x * x;
}

function mostrarCuadrado() {
    const numero = document.getElementById('numeroCuadrado').value;
    let mensaje = document.getElementById('resultadoCuadrado');
    if(numero.trim() ===""){
        mensaje.style.display = "none";
        return;
    }
    mensaje.style.display = "block";
    const respuesta = cuadrado(numero);
     mensaje.innerHTML = `El cuadrado de ${numero} es ${respuesta}`;
}
// resultadoPotencia
// 2. Función expresiva
const potencia = function(base, exponente) {
    let resultado = 1;
    for (let i = 0; i < exponente; i++) {
        resultado *= base;
    }
    return resultado;
};

function mostrarPotencia() {
    const base = document.getElementById('base').value;
    const exponente = document.getElementById('exponente').value;
    let mensaje = document.getElementById('resultadoPotencia');
    if(base.trim() ==="" || exponente.trim() ===""){
        mensaje.style.display = "none";
        return;
        };
    mensaje.style.display = "block";    
    const respuesta = potencia(base, exponente);
    mensaje.innerHTML = 
        `${base} elevado a ${exponente} = ${respuesta}`;
}

// 3. Arrow function
const dividir = (a, b) => a / b;

function mostrarDivision() {
    const dividendo = document.getElementById('dividendo').value;
    const divisor = document.getElementById('divisor').value;
    let mensaje = document.getElementById('resultadoDivision');
    if(dividendo.trim() ==="" || divisor.trim() ===""){
        mensaje.style.display = "none";
        return;
        };
    mensaje.style.display = "block";
    const resultado = dividir(dividendo, divisor);
    mensaje.innerHTML = `${dividendo} ÷ ${divisor} = ${resultado.toFixed(2)}`;
}

// 4. Función anidada
function humus(factor) {
    const ingrediente = (cantidad, unidad, nombre) => {
        const mensaje = `${cantidad * factor} ${unidad} de ${nombre}<br>`;
        document.getElementById('resultadoHummus').innerHTML += mensaje;
    };
    document.getElementById('resultadoHummus').style.display = "block";  
    document.getElementById('resultadoHummus').innerHTML = '';
    ingrediente(1, "lata", "garbanzos");
    ingrediente(0.5, "taza", "tahini");
    ingrediente(2, "cucharadas", "limón");
}

function prepararHummus() {
    humus(2);
}

// 5. Scope
function probarScope() {
    let x = "global";
    let resultado = '';

    function prueba() {
        let x = "local";
        resultado += `Dentro: ${x}<br>`;
    }

    prueba();
    resultado += `Fuera: ${x}`;
    document.getElementById('resultadoScope').style.display = "block"; 
    document.getElementById('resultadoScope').innerHTML = resultado;
}

// 6. Factorial (recursividad)
function factorial(n) {
    return n <= 1 ? 1 : n * factorial(n - 1);
}

function calcularFactorial() {
    const numero = document.getElementById('numeroFactorial').value;
    let mensaje = document.getElementById('resultadoFactorial');
    if(numero.trim() ==="" ){
        mensaje.style.display = "none";
        return;
        };
    mensaje.style.display = "block";
    const resultado = factorial(numero);
    mensaje.innerHTML = `${numero}! = ${resultado}`;
}
function icm(peso,altura){
    altura = altura /100;
    return peso /(altura * altura);
}
function calcularIMC() {
    const peso = document.getElementById('peso').value;
    const altura = document.getElementById('altura').value;
    let mensaje = document.getElementById('resultadoIMC');
    if(peso.trim() ==="" || altura.trim() ===""){
        mensaje.style.display = "none";
        return;
        };
    mensaje.style.display = "block";
    const imc = icm(peso,altura);
    mensaje.innerHTML = `Tu IMC es: ${imc.toFixed(2)}`;
        if (imc < 18.5) {
            mensaje.innerHTML += "<br>Categorización: Bajo peso";
          } else if (imc >= 18.5 && imc < 24.9) {
            mensaje.innerHTML += "<br>Categorización: Peso saludable";
          } else if (imc >= 25 && imc < 29.9) {
            mensaje.innerHTML += "<br>Categorización: Sobrepeso";
          } else {
            mensaje.innerHTML += "<br>Categorización: Obesidad";
          }

}

// Función para cambiar secciones
function cambiarSeccion(seccionId) {
    document.querySelectorAll('.seccion').forEach(sec => sec.classList.remove('active'));
    document.querySelectorAll('.boton-menu').forEach(btn => btn.classList.remove('active'));
    
    document.getElementById(seccionId).classList.add('active');
    event.target.classList.add('active');
}

// Ejemplo 1: Obtener Pokémon básico (Promesas)
function obtenerPokemon() {
    const id = document.getElementById('pokemonId').value;
    if(id.trim() ==="" )return;
    document.getElementById('pokemonResult').classList.remove('errorr');
    fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
        .then(response => {
            if (!response.ok) throw new Error('Pokémon no encontrado');
            return response.json();
        })
        .then(data => {
            const html = `
                <h3>${data.name.toUpperCase()}</h3>
                <img src="${data.sprites.front_default}" class="img-pokemon">
                <p>Altura: ${data.height / 10}m | Peso: ${data.weight / 10}kg</p>
                <p>Tipos: ${data.types.map(t => t.type.name).join(', ')}</p>
            `;
            document.getElementById('pokemonResult').innerHTML = html;
        })
        .catch(error => {
            document.getElementById('pokemonResult').classList.add('errorr');
            document.getElementById('pokemonResult').innerHTML = `Error: ${error.message}`;
        });
}

// Ejemplo 2: Cadena de evoluciones (Async/Await)
async function obtenerEvoluciones() {
    try {
        const response = await fetch('https://pokeapi.co/api/v2/evolution-chain/1');
        const data = await response.json();
        
        let html = '<h3>Cadena de Evolución de Bulbasaur:</h3>';
        let chain = data.chain;
        
        while(chain) {
            html += `<p>${chain.species.name} → `;
            chain = chain.evolves_to[0];
        }
        
        html = html.replace(/→ $/, ''); // Eliminar última flecha
        document.getElementById('evolucionesResult').innerHTML = html;
        
    } catch (error) {
        document.getElementById('evolucionesResult').innerHTML = `Error: ${error.message}`;
    }
}

// Ejemplo 3: Pokémon aleatorio (Fetch + Then)
function pokemonAleatorio() {
    const randomId = Math.floor(Math.random() * 898) + 1;
    
    fetch(`https://pokeapi.co/api/v2/pokemon/${randomId}`)
        .then(response => response.json())
        .then(pokemon => {
            const abilities = pokemon.abilities.map(a => a.ability.name).join(', ');
            document.getElementById('randomPokemon').innerHTML = `
                <h3>${pokemon.name} (#${pokemon.id})</h3>
                <img src="${pokemon.sprites.front_default}" class="img-pokemon">
                <p>Habilidades: ${abilities}</p>
            `;
        });
}

// Ejemplo 4: Pokémon por nombre (Fetch + Async/Await)
async function pokemonPorNombre() {
    const nombre = document.getElementById('pokemonNombre').value.toLowerCase();
    // console.log(nombre);
    if(nombre.trim() ==="" )return;
    try {
        document.getElementById('nombrePokemonResult').classList.remove('errorr');
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${nombre}`);
        if (!response.ok) throw new Error('Pokémon no encontrado');
        
        const pokemon = await response.json();
        const abilities = pokemon.abilities.map(a => a.ability.name).join(', ');
        document.getElementById('nombrePokemonResult').innerHTML = `
            <h3>${pokemon.name} (#${pokemon.id})</h3>
            <img src="${pokemon.sprites.front_default}" class="img-pokemon">
            <p>Habilidades: ${abilities}</p>`;
    } catch (error) {
        document.getElementById('nombrePokemonResult').classList.add('errorr');
        document.getElementById('nombrePokemonResult').innerHTML = `Error: ${error.message}`;
    }
}

function mascotaAleatorio() {
        
    try {
        document.getElementById('randomMascota').classList.remove('errorr');
        fetch(`https://dog.ceo/api/breed/affenpinscher/images/random`)
        .then(response => response.json())
        .then(mascota => {
            document.getElementById('randomMascota').innerHTML = `
                <img src="${mascota.message}" class="img-pokemon">`;
        });   
    } catch (error) {
        document.getElementById('randomMascota').classList.add('errorr');
        document.getElementById('randomMascota').innerHTML = `Error: ${error.message}`;

    }

}