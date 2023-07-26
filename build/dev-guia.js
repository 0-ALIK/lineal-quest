// ESTE ARCHIVO DEBE SER QUITADO DESPUES
const indicadorCordenadas = document.getElementById('dev-indicador');
const pantalla = document.getElementById('screen');


indicadorCordenadas.style.position = 'absolute';
indicadorCordenadas.style.backgroundColor = '#fff';
indicadorCordenadas.style.padding = '5px';
indicadorCordenadas.style.zIndex = '100';


window.addEventListener('mousemove', e => {

    indicadorCordenadas.innerHTML = `
        <p>x: ${e.clientX - pantalla.offsetLeft}</p>
        <p>y: ${e.clientY - pantalla.offsetTop}</p>
    `;

});
