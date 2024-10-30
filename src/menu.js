view_menuPrincipal();

// vistas: encargadas de pintar en el dom

// view_menuPrincipal(): Se encarga de la vista del menu principal
function view_menuPrincipal() {
  document.getElementById("root").innerHTML = `
    <h1>Bienvenido al juego de preguntas</h1>
    <h2>Menu principal</h2>
    <h4>Tienes las siguientes opciones:</h4>
    <button class="iniciar" onclick="ctrl_iniciarJuego()">1. Iniciar juego</button>
    <h1></h1>
    <button class="historico" onclick="ctrl_verHistorico()">2. Ver histórico</button>
  `;
}


// controladores: solo ellos pueden cambiar el modelo y las vistas

function ctrl_iniciarJuego() {
  view_iniciar_juego();
}

function ctrl_irAMenuPrincipal() {
  view_menuPrincipal();
}

function ctrl_verHistorico() {
  view_historico();
}
