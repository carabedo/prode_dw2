// creamos variable para ir rastreando que grupo esta activo
grupo_activo = 0

// generamos array de botones
coleccionGrupos = document.getElementById('menu-grupos').getElementsByTagName('li')

// agrego en un loop los eventlisteners a todos los botones
for (let i = 0; i < 8; i++) {
    coleccionGrupos[i].addEventListener('click', () => activarGrupo(i));
}

// defini activarGrupo
function activarGrupo(i) {
    coleccionGrupos[grupo_activo].classList.toggle('active')
    coleccionGrupos[i].classList.toggle('active')
    grupo_activo = i
    completarPartidos(i)

    DivFechaHorario = document.querySelectorAll("div.status.fecha-hora")
    HorariosCrudos = EncontrarHorarios(i)
    HorariosConvertidos = ConvertirHorarios(HorariosCrudos)
    CompletarFechas(DivFechaHorario, HorariosConvertidos)

    actualizarResultadosGrupos();
}




//array de grupos
grupos = ["A", "B", "C", "D", "E", "F", "G", "H"]

//funcion para filtrar partidos de grupos
function mostrarPartidos(i) {
    partidosFiltrados = fixture.filter(chequear_grupo)
    function chequear_grupo(partido) {
        if (partido.group == grupos[i]) {
            return true
        }
    }
    return partidosFiltrados
}

// Se completo los partidos de cada grupo, y lo agregamos al eventListerine de los botones
function completarPartidos(i) {

    divPartidos = document.getElementsByClassName("partido")
    partidos = mostrarPartidos(i)
    for (let j = 0; j < 6; j++) {
        nombreEquipo1 = partidos[j].team_1
        nombreEquipo2 = partidos[j].team_2
        divPartidos[j].getElementsByClassName("equipo1")[0].innerText = nombreEquipo1
        divPartidos[j].getElementsByClassName("equipo2")[0].innerText = nombreEquipo2
    }
}

//Función auxiliar para darle formato a la fecha y hora del partido 
function parsetime(datetime) {
    var formato = {
        day: "2-digit",
        weekday: "short",
        month: "short",
        hour: "numeric",
        minute: "2-digit"
    }
    a = new Date(datetime)
    s = new Intl.DateTimeFormat("es-AR", formato).format(a)

    fecha = s.slice(0, 11)
    hora = s.slice(11, s.length);

    return fecha.concat(". / ").concat(hora).replace(",", ".").toUpperCase().concat(" Hs.")
}

//Rastrear los divs donde va la fecha y hora usando "QuerySelectorAll" y almacenarlos en "DivFechaHorario[]"


//Rastrear "datetime" perteneciente a cada partido usando el indice de "partidos" y almacenarlos en "ArrayHorarios[]"
function EncontrarHorarios(i) {
    partidos = mostrarPartidos(i);
    ArrayHorarios = [];
    for (let f = 0; f < 6; f++) {
        ArrayHorarios.push(partidos[f].datetime)
    };
    return ArrayHorarios;
};


//Pasar cada valor de "ArrayHorarios[]" por "parsetime()" y almacenarlos en "FechasHorarios[]"
function ConvertirHorarios(HorariosCrudos) {
    FechasHorarios = [];
    for (let g = 0; g < 6; g++) {
        FechasHorarios.push(parsetime(HorariosCrudos[g]));
    };
    return FechasHorarios;
};


//Reemplazar los valores de "FechasHorarios[]" en "DivFechaHorario[]" usando inner.text
function CompletarFechas(DivFechaHorario, FechasHorarios) {
    for (let p = 0; p < 6; p++) {
        DivFechaHorario[p].innerText = FechasHorarios[p];
    };
};

// inputs para completar los resultados de los partidos
arrayResultados = [
    ['', '',
        '', '',
        '', '',
        '', '',
        '', '',
        '', ''],  // grupo A
    ['', '',
        '', '',
        '', '',
        '', '',
        '', '',
        '', ''],  // grupo B
    ['', '',
        '', '',
        '', '',
        '', '',
        '', '',
        '', ''],  // grupo C
    ['', '',
        '', '',
        '', '',
        '', '',
        '', '',
        '', ''],  // grupo D
    ['', '',
        '', '',
        '', '',
        '', '',
        '', '',
        '', ''],  // grupo E
    ['', '',
        '', '',
        '', '',
        '', '',
        '', '',
        '', ''],  // grupo F
    ['', '',
        '', '',
        '', '',
        '', '',
        '', '',
        '', ''],  // grupo G
    ['', '',
        '', '',
        '', '',
        '', '',
        '', '',
        '', ''],  // grupo H
];


resultados = {
    0: [
        ['', ''],
        ['', ''],
        ['', ''],
        ['', ''],
        ['', ''],
        ['', '']
    ],
    1: [
        ['', ''],
        ['', ''],
        ['', ''],
        ['', ''],
        ['', ''],
        ['', '']
    ],
    2: [
        ['', ''],
        ['', ''],
        ['', ''],
        ['', ''],
        ['', ''],
        ['', '']
    ],
    3: [
        ['', ''],
        ['', ''],
        ['', ''],
        ['', ''],
        ['', ''],
        ['', '']
    ],
    4: [
        ['', ''],
        ['', ''],
        ['', ''],
        ['', ''],
        ['', ''],
        ['', '']
    ],
    5: [
        ['', ''],
        ['', ''],
        ['', ''],
        ['', ''],
        ['', ''],
        ['', '']
    ],
    6: [
        ['', ''],
        ['', ''],
        ['', ''],
        ['', ''],
        ['', ''],
        ['', '']
    ],
    7: [
        ['', ''],
        ['', ''],
        ['', ''],
        ['', ''],
        ['', ''],
        ['', '']
    ]
}

// recuperamos mediante el DOM los divs contenedores de los inputs
divsInputs = document.querySelectorAll(".wrapper-inputs");

// la variable i representa los partidos (o filas)
for (let i = 0; i < 6; i++) {
    equiposInputs = divsInputs[i].querySelectorAll('input');
    //  y la variable j los equipos (o columnas)
    for (let j = 0; j < 2; j++) {
        equiposInputs[j].addEventListener('keydown', (evento) => chequearInput(evento));
        equiposInputs[j].addEventListener('keyup', (evento) => guardarResultado(i, j, evento));
    }
}

// creamos la función chequearInput para verificar que el usuario ingresó un número y no una letra o carácter especial
function chequearInput(evento) {
    if ("0123456789".includes(evento.key)) {
        console.log("si es un numero")
    } else {
        evento.preventDefault();
    }
}

// función destinada a guardar el dato ingreso por el usuario en la "base de datos" local
function guardarResultado(i, j, evento) {
    resultados[grupo_activo][i][j] = evento.key;
}

// función que es llamada al cambiar de grupo para actualizar y mostrar los resultados ingresados de cada grupo
function actualizarResultadosGrupos() {
    divsInputs = document.querySelectorAll(".wrapper-inputs");

    for (let i = 0; i < 6; i++) {
        equiposInputs = divsInputs[i].querySelectorAll('input');
        //  y la variable j los equipos (o columnas)
        for (let j = 0; j < 2; j++) {
            equiposInputs[j].value = resultados[grupo_activo][i][j];
        }
    }

}