export default class ScenesManager {

    currentScene = null;

    constructor() {
        if (!ScenesManager.instance) {
            ScenesManager.instance = this;
        }
        return ScenesManager.instance;
    }

    async cargarPantalla( scene ) {
        
        // Realizar el proceso de destrucción de la anterior escena
        if(this.currentScene) {
            this.currentScene?.onDestroy();
        }

        // Cargar en la pantalla del viedeo juego el template de la escena
        const pantalla = document.getElementById('pantalla');
        const template = await fetch(`./templates/${ scene.template }`).then(data => data.text());
        pantalla.innerHTML = template;

        // Cargar la lógica de la escena cargada
        scene.loadLogic();

        // Definir la escena cargada como la escena actual
        this.currentScene = scene;
    }

}