export function crearModal( texto ) {
    const pantalla = document.getElementById('screen'); 
    const modal = document.createElement('div');
    modal.classList.add('modal');
    modal.innerHTML = `<p class="modal-text">${ texto }</p>`
    pantalla.appendChild( modal );
    setTimeout(() => {
        modal.remove();
    }, 3000);
}