// Vista: muestra el historial en el DOM
function view_historico(datosHistorico) {
    // datosHistorico es el array de objetos traído desde la base de datos
    const tablaHistorico = datosHistorico
      .map(
        (item) => `<tr><td>${item.nickname}</td><td>${item.ranking}</td></tr>`
      )
      .join("");
  
    document.getElementById("root").innerHTML = `
      <h1>Bienvenido al juego de preguntas</h1>
      <h3>Tabla histórico de partidas:</h3>
      <table>
        <tr><th>Nickname</th><th>Ranking</th></tr>
        ${tablaHistorico}
      </table>
      <br>
      <br>
      <button onclick="ctrl_irAMenuPrincipal()">Regresar a menú principal</button>
    `;
  }
  
  // Controladores: obtienen el historial de la base de datos y lo muestran
  function ctrl_verHistorico() {
    fetch("http://localhost:5500/historico")
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          view_historico(data.data); // Pasamos los datos obtenidos a la vista
        } else {
          alert("Error al obtener el historial: " + data.message);
        }
      })
      .catch((error) => {
        console.error("Error al obtener el historial:", error);
        alert("Hubo un problema al obtener el historial.");
      });
  }
  
  function ctrl_irAMenuPrincipal() {
    view_menuPrincipal();
  }
  