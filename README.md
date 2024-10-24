# Tic-Tac-Toe

## Descripción del Proyecto

Este es un simple juego de Tic-Tac-Toe (Tres en Raya) desarrollado con HTML, CSS y JavaScript. El propósito del proyecto es crear un juego interactivo donde el jugador siempre comience primero, se cronometre el tiempo de la partida y, si el jugador gana, se registre su tiempo en una lista de los 10 mejores jugadores. Esta lista de los mejores tiempos se almacena utilizando la API de `LocalStorage`, lo que permite que los datos persistan incluso si se cierra la página.

### Características:
- **Cronómetro**: El tiempo de la partida comienza cuando el jugador hace su primer movimiento.
- **Movimiento aleatorio de la computadora**: La computadora realiza movimientos aleatorios para competir contra el jugador.
- **Registro de los mejores tiempos**: Al ganar, el jugador es invitado a ingresar su nombre, y su tiempo se registra en una lista que muestra los 10 mejores tiempos de las partidas.
- **Persistencia de los datos**: Los mejores tiempos se guardan utilizando `LocalStorage`, lo que permite mantener la lista incluso si el navegador se cierra o la página se recarga.
- **Contadores de victorias, derrotas y empates**: La página muestra la cantidad de partidas ganadas por el jugador, la computadora y las partidas que terminaron en empate.

## Funcionamiento del Juego

1. El jugador siempre realiza el primer movimiento.
2. A partir del primer movimiento del jugador, se inicia un cronómetro que registra el tiempo de la partida.
3. Después de cada turno del jugador, la computadora realiza un movimiento aleatorio.
4. El juego finaliza cuando un jugador ha logrado una combinación ganadora o si todas las casillas están ocupadas, resultando en un empate.
5. Si el jugador gana, se le pide su nombre para registrar su tiempo en la lista de los mejores tiempos.
6. Los tiempos se guardan en `LocalStorage`, permitiendo que persistan los 10 mejores resultados, ordenados de menor a mayor tiempo.

## Estructura del Código

- **HTML**: Contiene la estructura básica del tablero del juego, el marcador de los jugadores y la lista de los mejores tiempos.
- **CSS**: Estiliza el tablero del juego y los componentes visuales de la página.
- **JavaScript**: Maneja toda la lógica del juego, incluyendo:
  - Detección de clics del jugador.
  - Movimiento de la computadora.
  - Verificación de combinaciones ganadoras.
  - Cronometrado de la partida.
  - Almacenamiento y actualización de los mejores tiempos en `LocalStorage`.

## Cómo Funciona

1. **Inicio de la partida**: El jugador hace clic en una celda del tablero para colocar su marca ("X"). Este movimiento inicia el cronómetro.
2. **Movimiento de la computadora**: Después del turno del jugador, la computadora hace su movimiento automáticamente en una celda vacía aleatoria.
3. **Condiciones de victoria**: El juego revisa si hay un ganador después de cada turno. Si se detecta una combinación ganadora, el juego termina.
4. **Registro de tiempo**: Si el jugador gana, se le solicita su nombre y su tiempo se registra en la lista de los mejores tiempos.
5. **Reinicio del juego**: El jugador puede hacer clic en el botón de "Reiniciar" para empezar una nueva partida.

## Cómo Ejecutar el Proyecto

1. Clona o descarga el repositorio.
2. Abre el archivo `index.html` en tu navegador web.
3. Juega al Tic-Tac-Toe contra la computadora y compite para obtener el mejor tiempo.

## Dependencias

Este proyecto no requiere dependencias externas. Funciona únicamente con HTML, CSS y JavaScript.

