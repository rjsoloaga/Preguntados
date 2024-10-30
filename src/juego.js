// modelo: aqui van solo datos, no funciones
let respuestas = ["R1", "R2", "R3", "R4"];
let preguntas = [0, 1, 2, 3, 4];
let preguntas_c1 = [];
let preguntas_c2 = [];
let preguntas_c3 = [];
let preguntas_c4 = [];
let preguntas_c5 = [];
let correcta = "";
let iterador = 0;
let listaTemporal = [];

// vistas generales

function view_iniciar_juego() {
  document.getElementById("root").innerHTML = `
    <h1>Bienvenido al juego de preguntas</h1>
    <h3>Vamos a jugar:</h3>
    <a>Ingresa por favor un Nickname</a>
    <input type="text" placeholder="NICKNAME"name="nickname" id="nickname">
    <br><br>
    <label for="correo">Ingresa tu Correo Electrónico:</label>
    <input type="email" placeholder="ejemplo@correo.com" name="correo" id="correo" required>
    <br><br>
    <button onclick="ctrl_nuevaPartida()">Iniciar partida</button>
    <br><br>
    <button onclick="ctrl_irAMenuPrincipal()">Regresar a menu principal</button>
    `;
}

function view_partidaPerdida() {
  document.getElementById("root").innerHTML = `
    <h3>Perdiste:</h3>
    <button onclick="ctrl_iniciarPartida()">Iniciar nueva partida</button>
    <br>
    <br>
    
    <button onclick="ctrl_irAMenuPrincipalPerdedor()">Regresar a menu principal</button>
    `;
}

function view_partidaGanada() {
  document.getElementById("root").innerHTML = `
    <h3>Felicidades: Ganaste</h3> 
    <button onclick="ctrl_iniciarPartida()">Iniciar nueva partida</button>
    <br>
    <br>
    
    <button onclick="ctrl_irAMenuPrincipalGanador()">Regresar a menu principal</button>
    `;
}

function view_iniciarPartida() {
  document.getElementById("root").innerHTML = `
  
  <section id="pregunta"></section>
  <section id="resp1" class="respuesta rizq" onclick="ctrl_dioClickEnRespuesta('R1')">A)<span id="R1"></span></section>
	<section id="resp2" class="respuesta rder" onclick="ctrl_dioClickEnRespuesta('R2')">B)<span id="R2"></span></section>
	<section id="resp3" class="respuesta rizq" onclick="ctrl_dioClickEnRespuesta('R3')">C)<span id="R3"></span></section>
	<section id="resp4" class="respuesta rder" onclick="ctrl_dioClickEnRespuesta('R4')">D)<span id="R4"></span></section>
	<button id="iniciar" class="panel_sup" onclick="menuPrincipal()" >Salir</button>
	<div id="wrap_premio" class="panel_sup">$<span id="premio">${modelo.acumulado}</span></div>
  
    `;
  if (modelo.preguntaActual < 5) {
    switch (modelo.preguntaActual) {
      case 0:
        ordenarPreguntasYRespuestas(preguntas_c1);
        break;
      case 1:
        ordenarPreguntasYRespuestas(preguntas_c2);
        break;
      case 2:
        ordenarPreguntasYRespuestas(preguntas_c3);
        break;
      case 3:
        ordenarPreguntasYRespuestas(preguntas_c4);
        break;
      case 4:
        ordenarPreguntasYRespuestas(preguntas_c5);
        break;
    }
    console.log("correcta" + correcta);
  }
}


// controladores: solo ellos pueden cambiar el modelo y las vistas
function ctrl_iniciarPartida() {
  limpiarPreguntas();
  crearPreguntas();
  modelo.acumulado = modelo.acumulado + 100;
  modelo.preguntaActual = 0;
  view_iniciarPartida();
}


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////



function ctrl_nuevaPartida() {
  // con esto obtenemos los campos nickname y correo cheraa, para que no digan que solo fue chat gpt
  const nickname = document.getElementById("nickname").value;
  const correo = document.getElementById("correo").value;

  // con esta parte comprobamos si el gil que va a jugar completo los unicos 2 campos del formulario de inicio.
  if (!nickname || !correo) {
    alert("Por favor, completa todos los campos.");
    return;
  }

  // esta parte modificamos para que no deje campos vacios.
  modelo.nickname = nickname;
  modelo.correo = correo;
  modelo.acumulado = 100;
  modelo.preguntaActual = 0;
  limpiarPreguntas();
  crearPreguntas();
  view_iniciarPartida();

  fetch('http://localhost:5500/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ nickname, correo }),
  })
  .then(response => response.json())
  .then(data => {
    if (data.success) {
      alert("Usuario registrado con éxito, ¡a jugar!");
      limpiarPreguntas();
      crearPreguntas();
      view_iniciarPartida();  // Iniciar la partida
    } else {
      alert("Error al registrar usuario: " + data.message);
    }
  })
  .catch(error => {
    console.error("Error al registrar el usuario:", error);
    alert("Hubo un problema al registrar el usuario.");
  });
}



function ctrl_verHistorico() {
  fetch('http://localhost:5500/historico')
    .then(response => response.json())
    .then(data => {
      if (data.success) {
        
        const listaHistorico = data.data.map(item => {
          return `<li>Nickname: ${item.nickname}, Acumulado: ${item.acumulado}</li>`;
        }).join('');
        
        document.getElementById("root").innerHTML = `
          <h1>Histórico de Usuarios</h1>
          <ul>${listaHistorico}</ul>
          <button onclick="view_menuPrincipal()">Regresar al menú principal</button>
        `;
      } else {
        alert("Error al obtener el historial: " + data.message);
      }
    })
    .catch(error => {
      console.error("Error al obtener el historial:", error);
      alert("Hubo un problema al obtener el historial.");
    });
}





////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


//borrar
function menuPrincipal() {
  let premio = calculaPremioAcumulado(modelo.preguntaActual);
  if (modelo.nickname === "") {
    modelo.nickname = "Anonimo";
  }
  modelo.historico.push({
    nickname: modelo.nickname,
    totalAcumulado: premio,
  });
  view_menuPrincipal();
}

function ctrl_irAMenuPrincipalGanador() {
  if (modelo.nickname === "") {
    modelo.nickname = "Anonimo";
  }
  modelo.historico.push({
    nickname: modelo.nickname,
    totalAcumulado: modelo.acumulado,
  });
  view_menuPrincipal();
}

function ctrl_irAMenuPrincipalPerdedor() {
  view_menuPrincipal();
}

function ctrl_dioClickEnRespuesta(respuesta) {
  if (modelo.preguntaActual >= 4) {
    view_partidaGanada();
    return;
  }
  if (respuesta == correcta) {
    modelo.preguntaActual += 1;
    modelo.acumulado += 100;
    correcta = "";
    crearPreguntas();
  } else {
    correcta = "";
    if (modelo.nickname === "") {
      modelo.nickname = "Anonimo";
    }
    modelo.historico.push({
      nickname: modelo.nickname,
      totalAcumulado: 0,
    });
    crearPreguntas();
    view_partidaPerdida();
    return;
  }
  view_iniciarPartida();
}

// funciones complementarias

function ordenarPreguntasYRespuestas(pregunta) {
  shuffle();
  document.getElementById("pregunta").innerHTML = `${pregunta[0]}`;
  document.getElementById("R1").innerHTML = `${pregunta[listaTemporal[0]]}`;
  document.getElementById("R2").innerHTML = `${pregunta[listaTemporal[1]]}`;
  document.getElementById("R3").innerHTML = `${pregunta[listaTemporal[2]]}`;
  document.getElementById("R4").innerHTML = `${pregunta[listaTemporal[3]]}`;
  validarCorrecta();
  listaTemporal.splice(0, listaTemporal.length);
}

function calculaPremioAcumulado(ronda) {
  let premioAcumulado = 0;
  switch (ronda) {
    case 1:
      premioAcumulado = 100;
      break;
    case 2:
      premioAcumulado = 200;
      break;

    case 3:
      premioAcumulado = 300;
      break;
    case 4:
      premioAcumulado = 400;
      break;
    case 5:
      premioAcumulado = 500;
      break;

    default:
      premioAcumulado = 0;
      break;
  }
  return premioAcumulado;
}

function limpiarPreguntas() {
  preguntas_c1.splice(0, preguntas_c1.length);
  preguntas_c2.splice(0, preguntas_c2.length);
  preguntas_c3.splice(0, preguntas_c3.length);
  preguntas_c4.splice(0, preguntas_c4.length);
  preguntas_c5.splice(0, preguntas_c5.length);
}

function crearPreguntas() {
  iterador = Math.floor(Math.random() * 5);

  preguntas_c1.push(modelo.preguntas[iterador].pregunta.pregunta);
  preguntas_c1.push(modelo.preguntas[iterador].pregunta.opcion1);
  preguntas_c1.push(modelo.preguntas[iterador].pregunta.opcion2);
  preguntas_c1.push(modelo.preguntas[iterador].pregunta.opcion3);
  preguntas_c1.push(modelo.preguntas[iterador].pregunta.opcionCorrecta);

  iterador = Math.floor(Math.random() * (9 - 5 + 1) + 5);
  preguntas_c2.push(modelo.preguntas[iterador].pregunta.pregunta);
  preguntas_c2.push(modelo.preguntas[iterador].pregunta.opcion1);
  preguntas_c2.push(modelo.preguntas[iterador].pregunta.opcion2);
  preguntas_c2.push(modelo.preguntas[iterador].pregunta.opcion3);
  preguntas_c2.push(modelo.preguntas[iterador].pregunta.opcionCorrecta);

  iterador = Math.floor(Math.random() * (14 - 10 + 1) + 10);
  preguntas_c3.push(modelo.preguntas[iterador].pregunta.pregunta);
  preguntas_c3.push(modelo.preguntas[iterador].pregunta.opcion1);
  preguntas_c3.push(modelo.preguntas[iterador].pregunta.opcion2);
  preguntas_c3.push(modelo.preguntas[iterador].pregunta.opcion3);
  preguntas_c3.push(modelo.preguntas[iterador].pregunta.opcionCorrecta);

  iterador = Math.floor(Math.random() * (19 - 15 + 1) + 15);
  preguntas_c4.push(modelo.preguntas[iterador].pregunta.pregunta);
  preguntas_c4.push(modelo.preguntas[iterador].pregunta.opcion1);
  preguntas_c4.push(modelo.preguntas[iterador].pregunta.opcion2);
  preguntas_c4.push(modelo.preguntas[iterador].pregunta.opcion3);
  preguntas_c4.push(modelo.preguntas[iterador].pregunta.opcionCorrecta);

  iterador = Math.floor(Math.random() * (24 - 20 + 1) + 20);
  preguntas_c5.push(modelo.preguntas[iterador].pregunta.pregunta);
  preguntas_c5.push(modelo.preguntas[iterador].pregunta.opcion1);
  preguntas_c5.push(modelo.preguntas[iterador].pregunta.opcion2);
  preguntas_c5.push(modelo.preguntas[iterador].pregunta.opcion3);
  preguntas_c5.push(modelo.preguntas[iterador].pregunta.opcionCorrecta);
}

function shuffle() {
  //"Shufflea" las respuestas
  while (listaTemporal.length < 4) {
    iterador = Math.floor(Math.random() * 5);
    let idx = listaTemporal.indexOf(iterador);
    if (idx == -1 && iterador != 0) {
      listaTemporal.push(iterador);
    }
  }
}

function validarCorrecta() {
  let ind = 0;
  for (i = 0; i < listaTemporal.length; i++) {
    if (listaTemporal[i] == 4) {
      break;
    }
    ind++;
  }
  switch (ind) {
    case 0:
      correcta = "R1";
      break;
    case 1:
      correcta = "R2";
      break;
    case 2:
      correcta = "R3";
      break;
    case 3:
      correcta = "R4";
      break;
  }
}