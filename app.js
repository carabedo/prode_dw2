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
