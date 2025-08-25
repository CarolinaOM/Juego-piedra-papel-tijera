const PIEDRA = "piedra";
const PAPEL = "papel";
const TIJERA = "tijera";

const EMPATE = 0;
const GANAR = 1;
const PERDER = 2;

const piedraBtn = document.getElementById("piedra");
const papelBtn = document.getElementById("papel");
const tijeraBtn = document.getElementById("tijera");
const resultadoTexto = document.getElementById("star-text");
const usuarioImg = document.getElementById("usuario-img");
const maquinaImg = document.getElementById("maquina-img");
const container = document.querySelector(".container");
const salirBtn = document.getElementById("salir-btn");

let ganadas = 0, perdidas = 0, empates = 0;

// Mostrar pantalla de juego
function empezarJuego() {
    document.getElementById("intro").style.display = "none";
    container.style.display = "flex";
}

// Volver a pantalla de inicio y reiniciar el juego
salirBtn.addEventListener("click", () => {
    container.style.display = "none";
    document.getElementById("intro").style.display = "flex";
    
    // Reiniciar contadores
    ganadas = 0;
    perdidas = 0;
    empates = 0;

    // Actualizar la interfaz con los contadores reiniciados
    document.getElementById("ganadas").textContent = ganadas;
    document.getElementById("perdidas").textContent = perdidas;
    document.getElementById("empates").textContent = empates;

    // Restablecer el texto de resultado y las imágenes
    resultadoTexto.innerHTML = "Elige una opción para comenzar";
    resultadoTexto.style.color = "#000";
    usuarioImg.src = "img/piedra.png";
    maquinaImg.src = "img/piedra.png";
});

// Desactivar botones durante la jugada
function desactivarBotones() {
    piedraBtn.disabled = true;
    papelBtn.disabled = true;
    tijeraBtn.disabled = true;
}

// Activar botones después de la jugada
function activarBotones() {
    piedraBtn.disabled = false;
    papelBtn.disabled = false;
    tijeraBtn.disabled = false;
}

// Eventos de clic
piedraBtn.addEventListener("click", () => juego(PIEDRA));
papelBtn.addEventListener("click", () => juego(PAPEL));
tijeraBtn.addEventListener("click", () => juego(TIJERA));

// Lógica principal del juego
function juego(usuarioOpcion) {
    desactivarBotones();

    usuarioImg.src = "img/" + usuarioOpcion + ".png";
    resultadoTexto.innerHTML = "Pensando";
    resultadoTexto.style.color = "#000";
    resultadoTexto.classList.add("pensando");
    container.style.backgroundColor = "pink";

    const intervalo = setInterval(() => {
        const maquinaOpcion = calcularMaquinaOpcion();
        maquinaImg.src = "img/" + maquinaOpcion + ".png";
    }, 200);

    setTimeout(() => {
        clearInterval(intervalo);
        activarBotones();
        resultadoTexto.classList.remove("pensando");

        const maquinaOpcion = calcularMaquinaOpcion();
        const resultado = calcularResultado(usuarioOpcion, maquinaOpcion);

        maquinaImg.src = "img/" + maquinaOpcion + ".png";

        switch (resultado) {
            case EMPATE:
                resultadoTexto.innerHTML = "Empataste";
                resultadoTexto.style.color = "#555";
                empates++;
                break;
            case GANAR:
                resultadoTexto.innerHTML = "Ganaste";
                resultadoTexto.style.color = "green";
                ganadas++;
                container.classList.add("ganar-animado");
                setTimeout(() => container.classList.remove("ganar-animado"), 1500);
                break;
            case PERDER:
                resultadoTexto.innerHTML = "Perdiste";
                resultadoTexto.style.color = "red";
                perdidas++;
                break;
        }

        // Actualizar estadísticas
        document.getElementById("ganadas").textContent = ganadas;
        document.getElementById("perdidas").textContent = perdidas;
        document.getElementById("empates").textContent = empates;
    }, 2000);
}

// Elección aleatoria de la máquina
function calcularMaquinaOpcion() {
    const numero = Math.floor(Math.random() * 3);
    switch (numero) {
        case 0: return PIEDRA;
        case 1: return PAPEL;
        case 2: return TIJERA;
    }
}

// Determinar resultado
function calcularResultado(usuarioOpcion, maquinaOpcion) {
    if (usuarioOpcion === maquinaOpcion) {
        return EMPATE;
    } else if (usuarioOpcion === PIEDRA) {
        return maquinaOpcion === PAPEL ? PERDER : GANAR;
    } else if (usuarioOpcion === PAPEL) {
        return maquinaOpcion === TIJERA ? PERDER : GANAR;
    } else if (usuarioOpcion === TIJERA) {
        return maquinaOpcion === PIEDRA ? PERDER : GANAR;
    }
}