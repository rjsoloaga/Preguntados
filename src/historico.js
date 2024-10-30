view_menuPrincipal();

// vista: vista general que muestra el historico en el DOM
function view_historico() {
  document.getElementById("root").innerHTML = `
    <h1>Bienvenido al juego de preguntas</h1>
    <h3>Tabla historico de partidas:</h3>
    <table>${mostrarHistorico()}</table>
    <br>
    <br>
    <button onclick="ctrl_irAMenuPrincipal()">Regresar a menu principal</button>

    `;

  function mostrarHistorico() {
    var tabla = `<tr><th>Nickname</th><th>Acumulado</th></tr>`;
    for (let index = 0; index < modelo.historico.length; index++) {
      tabla =
        tabla +
        `<tr><td>${modelo.historico[index].nickname}</td><td>${modelo.historico[index].totalAcumulado}</td></tr>`;
    }
    return tabla;
  }
}

// controladores: solo ellos pueden cambiar el modelo y las vistas

function ctrl_verHistorico() {
  view_historico();
}

function ctrl_irAMenuPrincipal() {
  view_menuPrincipal();
}
