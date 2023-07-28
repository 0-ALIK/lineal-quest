export default class PowerUpsManager {


    colocarPowerUpsHTML ( contenedor, powerUps ) {

        contenedor.innerHTML = ''

        powerUps.forEach( powerUp => {

            contenedor.innerHTML += `
                <div class="power-up" id="${ powerUp.id }">
                    <img src="/build/assets/sprites/power-up-${ powerUp.nombre }.png" alt="vida">
                </div> 
            `;
        });

    }


    colocarVidasHTML ( contenedor, vidas ) {
        contenedor.innerHTML = ''

        for (let index = 1; index <= vidas; index++) {
            contenedor.innerHTML += `
            <div class="vida">
                <img src="/build/assets/sprites/corazon.gif" alt="vida">
            </div>
            `;
        }
    }
}