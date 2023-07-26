import BaseDatos from "./core/BaseDatos";
import ScenesManager from "./core/ScenesManager";
import mainmenu from "./scenes/main-menu";

new BaseDatos();

const scenesManager = new ScenesManager();

scenesManager.cargarPantalla( mainmenu );