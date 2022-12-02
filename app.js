// arreglo de grupos
let grupos = ["A", "B", "C", "D", "E", "F", "G", "H"];

// creamos variable para ir rastreando que grupo esta activo
let grupoActivo = 0;

// generamos array de botones
let coleccionGrupos = document.getElementById('menu-grupos').getElementsByTagName('li');

// agrego en un bucle for los eventListener() a todos los botones
for (let i = 0; i < 8; i++) {
    coleccionGrupos[i].addEventListener('click', () => activarGrupo(i));
}

// función activarGrupo(), utilizada para cambiar el contenido del .html según el grupo activo
function activarGrupo(i) {
    coleccionGrupos[grupoActivo].classList.toggle('active');
    coleccionGrupos[i].classList.toggle('active');
    grupoActivo = i;
    completarPartidos(i);

    // se recupera mediante el DOM el contenedor de la fecha/horario de los partidos y se consulta el archivo fixture.js para recuperar la información de cada partido, luego se convierte a un formato más user friendly
    divFechaHorario = document.querySelectorAll("div.status.fecha-hora");
    horariosCrudos = encontrarHorarios(i);
    horariosConvertidos = convertirHorarios(horariosCrudos);
    completarFechas(divFechaHorario, horariosConvertidos);

    actualizarResultadosGrupos();
}

// función para filtrar los partidos de cada grupos
function mostrarPartidos(g) {

    function chequearGrupo(partido) {
        if (partido.group == grupos[g]) {
            return true;
        }
    }

    partidosFiltrados = fixture.filter(chequearGrupo);
    return partidosFiltrados;
}

// se completo los partidos de cada grupo, y lo agregamos al eventListerine de los botones
function completarPartidos(i) {
    divPartidos = document.getElementsByClassName("partido");
    partidos = mostrarPartidos(i);
    for (let j = 0; j < 6; j++) {
        nombreEquipo1 = partidos[j].team_1;
        nombreEquipo2 = partidos[j].team_2;
        divPartidos[j].getElementsByClassName("equipo1")[0].innerText = nombreEquipo1;
        divPartidos[j].getElementsByClassName("equipo2")[0].innerText = nombreEquipo2;
    }
}

// * --------------------------------------------------------------------------------- * //
// * --- recuperar la información de la fecha/hora de los partidos y darle formato --- * //
// * --------------------------------------------------------------------------------- * //

// función auxiliar para darle formato a la fecha y hora del partido 
function parsetime(datetime) {
    let formato = {
        day: "2-digit",
        weekday: "short",
        month: "short",
        hour: "numeric",
        minute: "2-digit"
    };

    a = new Date(datetime);
    s = new Intl.DateTimeFormat("es-AR", formato).format(a);

    fecha = s.slice(0, 11);
    hora = s.slice(11, s.length);

    return fecha.concat(". / ").concat(hora).replace(",", ".").toUpperCase().concat(" Hs.");
}

// rastrear "datetime" perteneciente a cada partido usando el índice de "partidos" y almacenarlos en "arregloHorarios[]"
function encontrarHorarios(i) {
    partidos = mostrarPartidos(i);
    arregloHorarios = [];

    for (let f = 0; f < 6; f++) {
        arregloHorarios.push(partidos[f].datetime);
    }

    return arregloHorarios;
}

// pasar cada valor de "arregloHorarios[]" por "parsetime()" y almacenarlos en "fechasHorarios[]"
function convertirHorarios(horariosCrudos) {
    fechasHorarios = [];

    for (let g = 0; g < 6; g++) {
        fechasHorarios.push(parsetime(horariosCrudos[g]));
    }

    return fechasHorarios;
}

// reemplazar los valores de "fechasHorarios[]" en "divFechaHorario[]" usando inner.text
function completarFechas(divFechaHorario, fechasHorarios) {
    for (let p = 0; p < 6; p++) {
        divFechaHorario[p].innerText = fechasHorarios[p];
    }
}

// * ----------------------------------------------------------------- * //
// * --- chequear el dato ingresado por el usuario en las casillas --- * //
// * ----------------------------------------------------------------- * //

// se creó la función resetResultados() para reiniciar el prode tras guardar los resultados (a fin de ser presentado en la feria)
function resetResultados() {
    resultados = {
        // grupo A
        0: [
            ['', ''],
            ['', ''],
            ['', ''],
            ['', ''],
            ['', ''],
            ['', '']
        ],
        // grupo B
        1: [
            ['', ''],
            ['', ''],
            ['', ''],
            ['', ''],
            ['', ''],
            ['', '']
        ],
        // grupo C
        2: [
            ['', ''],
            ['', ''],
            ['', ''],
            ['', ''],
            ['', ''],
            ['', '']
        ],
        // grupo D
        3: [
            ['', ''],
            ['', ''],
            ['', ''],
            ['', ''],
            ['', ''],
            ['', '']
        ],
        // grupo E
        4: [
            ['', ''],
            ['', ''],
            ['', ''],
            ['', ''],
            ['', ''],
            ['', '']
        ],
        // grupo F
        5: [
            ['', ''],
            ['', ''],
            ['', ''],
            ['', ''],
            ['', ''],
            ['', '']
        ],
        // grupo G
        6: [
            ['', ''],
            ['', ''],
            ['', ''],
            ['', ''],
            ['', ''],
            ['', '']
        ],
        // grupo H
        7: [
            ['', ''],
            ['', ''],
            ['', ''],
            ['', ''],
            ['', ''],
            ['', '']
        ]
    }
}

// se define la variable resultados como un objeto de 8 keys (perteneciente a cada grupo), cada una con un arreglo de seis espacios (los seis partidos de cada grupo) y a su vez estos poseen dos espacios (los goles de cada equipo)
let resultados = {};
resetResultados();

// recuperamos mediante el DOM los divs contenedores de los inputs (o casillas)
let divsInputs = document.querySelectorAll(".wrapper-inputs");

// función que es llamada al cambiar de grupo para actualizar y mostrar los resultados ingresados de cada grupo
function actualizarResultadosGrupos() {
    divsInputs = document.querySelectorAll(".wrapper-inputs");

    for (let fila = 0; fila < 6; fila++) {
        equiposInputs = divsInputs[fila].querySelectorAll('input');
        for (let columna = 0; columna < 2; columna++) {
            equiposInputs[columna].value = resultados[grupoActivo][fila][columna];
        }
    }
}

// se itera por todas las casillas y se recupera la fila de la casilla modificada
for (let fila = 0; fila < 6; fila++) {
    equiposInputs = divsInputs[fila].querySelectorAll('input');
    // se itera por todas las casillas y se recupera la columna de la casilla modificada
    for (let columna = 0; columna < 2; columna++) {
        // se genera un eventListener que se ejecuta al presionar una tecla, que llama a la función chequearInput()
        equiposInputs[columna].addEventListener('keydown', (evento) => chequearInput(fila, columna, evento));
    }
}

// creamos la función chequearInput() para verificar que el usuario ingresó un número y no una letra o carácter especial
function chequearInput(fila, columna, evento) {
    a = "0123456789".includes(evento.key);

    // en caso de que sea un valor númerico, se llama a la función guardarResultado(), en caso contrario se evita que se ingrese la tecla presioanda (es decir, letras o carácteres especiales)
    a ? setTimeout(() => guardarResultado(fila, columna, evento), 20) : evento.preventDefault();
}

// función destinada a guardar el dato ingreso por el usuario en la "base de datos" local
function guardarResultado(fila, columna, evento) {
    resultados[grupoActivo][fila][columna] = evento.key;

    // finalmente, se llama a la función focusNext() mediante un setTimeout() para saltar de casilla a casilla de manera automática
    setTimeout(() => focusNext(evento), 200);
}

// función destinada a cambiar a la siguiente casilla automáticamente tras completar la casilla anterior
function focusNext(evento) {
    inputActivo = evento.target;
    inputsTel = Array.from(document.querySelectorAll("input"));
    let indice = inputsTel.indexOf(inputActivo);

    // mientras el índice sea menor a la cantidad de casillas (12), se le hace focus() a la casilla siguiente
    if (indice < inputsTel.length - 1) {
        inputsTel[indice + 1].focus();

        // al completar todas las casillas del grupo, EN ESTA VERSIÓN se le hace focus() al botón guardar (versión user friendly)
    } else {
        botonGuardar.focus();
    }

    /*
        // mientras el índice sea menor a la cantidad de casillas (12), se le hace focus() a la casilla siguiente
        if (indice < inputsTel.length - 1) {
            inputsTel[indice + 1].focus();
    
            // al completar todas las casillas del grupo, EN ESTA VERSIÓN se cambia el grupo activo al siguiente y se le hace focus() a la primera casilla del grupo (versión user friendlyn't)
        } else {
            if (grupoActivo < 7) {
                activarGrupo(grupoActivo + 1);
                inputsTel[0].focus();
    
                // al completar todas las casillas de todos los grupos, se le hace focus() al botón guardar
            } else {
                botonGuardar.focus();
            }
        }
    */
}

// * ----------------------------------------------------------- * //
// * --- chequear que se hayan modificado todas las casillas --- * //
// * ----------------------------------------------------------- * //

// recuperamos mediante el DOM el botón "GUARDAR PRONÓSTICO"
let botonGuardar = document.querySelector("#btnGuardar");

// agregamos un eventListener() al botón, indicando que al hacer click vaya a la función chequearCasillas()
botonGuardar.addEventListener('click', () => chequearCasillasPorGrupo());

// función chequearCasillasTotales(), destinada a comprobar que se haya ingresado un valor númerico en todas las casillas, en este caso el usuario debe llenar todos los grupos (versión user friendlyn't)
function chequearCasillasTotales() {
    // convertimos el object resultados (donde se almacenan todas las casillas) a un arreglo, para poder manipularlo de manera más sencilla (el doble .flat() se debe a que tenemos un arreglo de arreglos)
    let arregloResultados = Object.values(resultados).flat().flat();

    // bucle for destinado a comprobar que todas las casillas tienen un número
    for (let o = 0; o < arregloResultados.length; o++) {
        // con la ayuda de una variable auxiliar, se almacena un true en caso de NO haber ingresado un número en una casilla y un false en caso de haber completado todas las casillas
        n = "''".includes(arregloResultados[o]);
        if (n) {
            // ! AGREGAR ALERTA DE ERROR
            alert("Error... ha dejado casillas vacías, por favor complete todo el prode");
            return;
        } else {
            // ! AGREGAR ALERTA DE INGRESAR MAIL Y RESETEAR LA VARIABLE RESULTADOS
            console.log(arregloResultados[o]);
            prompt("Ingrese su mail:");
            resetResultados();
        }
    }
}

// función chequearCasillasPorGrupo(), destinada a comprobar que se haya ingresado un valor númerico en las casillas del grupo activo (de este modo el usuario no se ve obligado a rellenar todos los grupos, versión user friendly)
function chequearCasillasPorGrupo() {
    let arregloResultados;
    switch (grupoActivo) {
        // grupo A
        case 0:
            arregloResultados = Object.values(resultados[0]).flat();

            for (let o = 0; o < arregloResultados.length; o++) {
                n = "''".includes(arregloResultados[o]);
                if (n) {
                    // ! AGREGAR ALERTA DE ERROR
                    alert("Error... ha dejado casillas vacías, por favor complete todo el prode");
                    return;
                } else {
                    // ! AGREGAR ALERTA DE INGRESAR MAIL Y RESETEAR LA VARIABLE RESULTADOS
                    console.log(arregloResultados[o]);
                    resetResultados();
                }
            }

            prompt("Ingrese su mail:");
            break;

        // grupo B
        case 1:
            arregloResultados = Object.values(resultados[1]).flat();

            for (let o = 0; o < arregloResultados.length; o++) {
                n = "''".includes(arregloResultados[o]);
                if (n) {
                    // ! AGREGAR ALERTA DE ERROR
                    alert("Error... ha dejado casillas vacías, por favor complete todo el prode");
                    return;
                } else {
                    // ! AGREGAR ALERTA DE INGRESAR MAIL Y RESETEAR LA VARIABLE RESULTADOS
                    console.log(arregloResultados[o]);
                    resetResultados();
                }
            }

            prompt("Ingrese su mail:");
            break;

        // grupo C
        case 2:
            arregloResultados = Object.values(resultados[2]).flat();

            for (let o = 0; o < arregloResultados.length; o++) {
                n = "''".includes(arregloResultados[o]);
                if (n) {
                    // ! AGREGAR ALERTA DE ERROR
                    alert("Error... ha dejado casillas vacías, por favor complete todo el prode");
                    return;
                } else {
                    // ! AGREGAR ALERTA DE INGRESAR MAIL Y RESETEAR LA VARIABLE RESULTADOS
                    console.log(arregloResultados[o]);
                    resetResultados();
                }
            }

            prompt("Ingrese su mail:");
            break;

        // grupo D
        case 3:
            arregloResultados = Object.values(resultados[3]).flat();

            for (let o = 0; o < arregloResultados.length; o++) {
                n = "''".includes(arregloResultados[o]);
                if (n) {
                    // ! AGREGAR ALERTA DE ERROR
                    alert("Error... ha dejado casillas vacías, por favor complete todo el prode");
                    return;
                } else {
                    // ! AGREGAR ALERTA DE INGRESAR MAIL Y RESETEAR LA VARIABLE RESULTADOS
                    console.log(arregloResultados[o]);
                    resetResultados();
                }
            }

            prompt("Ingrese su mail:");
            break;

        // grupo E
        case 4:
            arregloResultados = Object.values(resultados[4]).flat();

            for (let o = 0; o < arregloResultados.length; o++) {
                n = "''".includes(arregloResultados[o]);
                if (n) {
                    // ! AGREGAR ALERTA DE ERROR
                    alert("Error... ha dejado casillas vacías, por favor complete todo el prode");
                    return;
                } else {
                    // ! AGREGAR ALERTA DE INGRESAR MAIL Y RESETEAR LA VARIABLE RESULTADOS
                    console.log(arregloResultados[o]);
                    resetResultados();
                }
            }

            prompt("Ingrese su mail:");
            break;

        // grupo F
        case 5:
            arregloResultados = Object.values(resultados[5]).flat();

            for (let o = 0; o < arregloResultados.length; o++) {
                n = "''".includes(arregloResultados[o]);
                if (n) {
                    // ! AGREGAR ALERTA DE ERROR
                    alert("Error... ha dejado casillas vacías, por favor complete todo el prode");
                    return;
                } else {
                    // ! AGREGAR ALERTA DE INGRESAR MAIL Y RESETEAR LA VARIABLE RESULTADOS
                    console.log(arregloResultados[o]);
                    resetResultados();
                }
            }

            prompt("Ingrese su mail:");
            break;

        // grupo G
        case 6:
            arregloResultados = Object.values(resultados[6]).flat();

            for (let o = 0; o < arregloResultados.length; o++) {
                n = "''".includes(arregloResultados[o]);
                if (n) {
                    // ! AGREGAR ALERTA DE ERROR
                    alert("Error... ha dejado casillas vacías, por favor complete todo el prode");
                    return;
                } else {
                    // ! AGREGAR ALERTA DE INGRESAR MAIL Y RESETEAR LA VARIABLE RESULTADOS
                    console.log(arregloResultados[o]);
                    resetResultados();
                }
            }

            prompt("Ingrese su mail:");
            break;

        // grupo H
        case 7:
            arregloResultados = Object.values(resultados[7]).flat();

            for (let o = 0; o < arregloResultados.length; o++) {
                n = "''".includes(arregloResultados[o]);
                if (n) {
                    // ! AGREGAR ALERTA DE ERROR
                    alert("Error... ha dejado casillas vacías, por favor complete todo el prode");
                    return;
                } else {
                    // ! AGREGAR ALERTA DE INGRESAR MAIL Y RESETEAR LA VARIABLE RESULTADOS
                    console.log(arregloResultados[o]);
                    resetResultados();
                }
            }

            prompt("Ingrese su mail:");
            break;
    }
}