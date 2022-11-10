// creamos variable para ir rastreando que grupo esta activo
grupo_activo=0

// generamos array de botones
coleccionGrupos=document.getElementById('menu-grupos').getElementsByTagName('li')

// agrego en un loop los eventlisteners a todos los botones
for (let i = 0; i < 8; i++) {
    coleccionGrupos[i].addEventListener('click', () => activarGrupo(i));
}

// defini activarGrupo
function activarGrupo(i){
    coleccionGrupos[grupo_activo].classList.toggle('active')
    coleccionGrupos[i].classList.toggle('active')
    grupo_activo=i
}

//array de grupos
grupos=["A", "B", "C", "D", "E", "F", "G", "H"]

//funcion para filtrar partidos de grupos
function mostrarPartidos(i){
    partidosFiltrados=fixture.filter(chequear_grupo)
    function chequear_grupo(partido){
        if (partido.group==grupos[i]){
            return true
        }
    }
    return partidosFiltrados
}