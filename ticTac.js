let contadorUsuario = 0;
let contadorComputadora = 0;
let contadorEmpates = 0;
let esTurnoDeX = true;
let inicioPartida = null;
let tablero = Array(9).fill(null);

const celdas = document.querySelectorAll('[data-cell]');
const messageEl = document.getElementById('mensaje');
const restartBtn = document.getElementById('restart-btn');

// Iniciar cronómetro en el primer movimiento del jugador
const iniciarCronometro = () => {
    if (!inicioPartida) {
        inicioPartida = Date.now(); // Marca el tiempo de inicio
    }
};

// Movimiento aleatorio de la computadora
const movimientoComputadora = () => {
    let celdasLibres = [];
    tablero.forEach((celda, index) => {
        if (!celda) celdasLibres.push(index);
    });

    if (celdasLibres.length > 0) {
        const randomIndex = Math.floor(Math.random() * celdasLibres.length);
        tablero[celdasLibres[randomIndex]] = 'O'; // Movimiento aleatorio de la computadora
        actualizarTablero();
        verificarFinal();
    }
};

// Verificar si hay un ganador o empate
const verificarGanador = () => {
    const combinacionesVictoria = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Filas
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columnas
        [0, 4, 8], [2, 4, 6]             // Diagonales
    ];

    for (let combinacion of combinacionesVictoria) {
        const [pos1, pos2, pos3] = combinacion;

        if (tablero[pos1] && tablero[pos1] === tablero[pos2] && tablero[pos1] === tablero[pos3]) {
            return tablero[pos1]; // Devuelve "X" o "O" como ganador
        }
    }

    return tablero.includes(null) ? null : 'Empate'; // Si no hay celdas libres es empate
};

// Detectar click del jugador
const detectarClick = (e) => {
    const cell = e.target;
    const hijoP = cell.children[0];
    const index = Array.from(celdas).indexOf(cell);

    if (tablero[index] || verificarGanador()) return;

    // Iniciar cronómetro en el primer movimiento del jugador
    iniciarCronometro();

    // Asignar la jugada del jugador
    tablero[index] = 'X';
    hijoP.textContent = 'X';
    hijoP.className = 'X';

    if (verificarFinal()) return;

    esTurnoDeX = false;
    setTimeout(movimientoComputadora, 500); // Espera un breve momento para el movimiento de la computadora
};

// Verificar si hay un ganador o empate y mostrar el mensaje adecuado
const verificarFinal = () => {
    const hayGanador = verificarGanador();

    if (hayGanador) {
        messageEl.textContent = `¡${hayGanador} ha ganado!`;
        finalizarJuego(hayGanador);
        return true;
    } else if (tablero.every(cell => cell)) {
        messageEl.textContent = "¡Empate!";
        finalizarJuego('Empate');
        return true;
    }
    return false;
};

// Actualizar los contadores de victorias
const actualizarContadores = () => {
    document.getElementById('contador-usuario').textContent = contadorUsuario;
    document.getElementById('contador-computadora').textContent = contadorComputadora;
    document.getElementById('contador-empates').textContent = contadorEmpates;
};

// Función para finalizar el juego
const finalizarJuego = (ganador) => {
    if (ganador === 'X') {
        contadorUsuario++;
        manejarVictoriaJugador();
    } else if (ganador === 'O') {
        contadorComputadora++;
    } else if (ganador === 'Empate') {
        contadorEmpates++;
    }

    actualizarContadores();
};

// Función para manejar la victoria del jugador y pedir su nombre
const manejarVictoriaJugador = () => {
    const tiempoFinal = Math.floor((Date.now() - inicioPartida) / 1000); // Tiempo en segundos
    const nombreJugador = prompt('¡Felicidades! Ganaste. Ingresa tu nombre:');

    if (nombreJugador) {
        guardarMejorTiempo(nombreJugador, tiempoFinal);
    }
    actualizarMejoresTiempos();
};

// Guardar el mejor tiempo en LocalStorage
const guardarMejorTiempo = (nombre, tiempo) => {
    const mejoresTiempos = JSON.parse(localStorage.getItem('mejoresTiempos')) || [];

    mejoresTiempos.push({ nombre, tiempo, fecha: new Date().toLocaleString() });
    mejoresTiempos.sort((a, b) => a.tiempo - b.tiempo); // Ordena de menor a mayor tiempo
    if (mejoresTiempos.length > 10) mejoresTiempos.pop(); // Solo guarda los primeros 10

    localStorage.setItem('mejoresTiempos', JSON.stringify(mejoresTiempos));
};

// Actualizar la lista de mejores tiempos
const actualizarMejoresTiempos = () => {
    const mejoresTiempos = JSON.parse(localStorage.getItem('mejoresTiempos')) || [];
    const lista = document.getElementById('lista-tiempos');
    lista.innerHTML = '';

    mejoresTiempos.forEach(({ nombre, tiempo, fecha }) => {
        const item = document.createElement('li');
        item.textContent = `${nombre} - ${tiempo}s - ${fecha}`;
        lista.appendChild(item);
    });
};

// Reiniciar el juego
const reiniciarJuego = () => {
    tablero.fill(null);
    celdas.forEach(cell => cell.children[0].textContent = '');
    messageEl.textContent = '';
    esTurnoDeX = true;
    inicioPartida = null;
};

// Inicializar la lista de mejores tiempos al cargar la página
window.onload = () => {
    actualizarMejoresTiempos();
    celdas.forEach(cell => cell.addEventListener('click', detectarClick));
};

// Reiniciar el juego al hacer clic en el botón de reinicio
restartBtn.addEventListener('click', reiniciarJuego);

// Actualizar el tablero
const actualizarTablero = () => {
    celdas.forEach((cell, index) => {
        const hijoP = cell.children[0];
        hijoP.textContent = tablero[index];
        hijoP.className = tablero[index];
    });
};
