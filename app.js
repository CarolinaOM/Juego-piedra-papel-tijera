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

piedraBtn.addEventListener("click", () => {
    juego(PIEDRA);
});
papelBtn.addEventListener("click", () => {
    juego(PAPEL);
});
tijeraBtn.addEventListener("click", () => {
    juego(TIJERA);
});

function juego(usuarioOpcion) {
    usuarioImg.src = "img/" + usuarioOpcion + ".png";

    resultadoTexto.innerHTML = "Pensando";

    const intervalo = setInterval(function () {
        const maquinaOpcion = calcularMaquinaOpcion();
        maquinaImg.src = "img/" + maquinaOpcion + ".png";
    }, 200);

    setTimeout(function () {
        clearInterval(intervalo);

        const maquinaOpcion = calcularMaquinaOpcion();
        const resultado = calcularResultado(usuarioOpcion, maquinaOpcion);

        maquinaImg.src = "img/" + maquinaOpcion + ".png";

        switch (resultado) {
            case EMPATE:
                resultadoTexto.innerHTML = "Empataste";
                break;
            case GANAR:
                resultadoTexto.innerHTML = "Ganaste";
                break;
            case PERDER:
                resultadoTexto.innerHTML = "Perdiste";
                break;
        }

    }, 2000);
}

function calcularMaquinaOpcion() {
    const numero = Math.floor(Math.random() * 3);
    switch (numero) {
        case 0:
            return PIEDRA;
        case 1:
            return PAPEL;
        case 2:
            return TIJERA;
    }
}

function calcularResultado(usuarioOpcion, maquinaOpcion) {

    if (usuarioOpcion === maquinaOpcion) {
        return EMPATE;

    } else if (usuarioOpcion === PIEDRA) {

        if (maquinaOpcion === PAPEL) {
            return PERDER;
        }
        if (maquinaOpcion === TIJERA) {
            return GANAR;
        }

    } else if (usuarioOpcion === PAPEL) {

        if (maquinaOpcion === TIJERA) {
            return PERDER;
        }
        if (maquinaOpcion === PIEDRA) {
            return GANAR;
        }

    } else if (usuarioOpcion === TIJERA) {

        if (maquinaOpcion === PIEDRA) {
            return PERDER;
        }
        if (maquinaOpcion === PAPEL) {
            return GANAR;
        }
    }
}