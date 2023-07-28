const dataExample = {
    powerUps: [
        { nombre: 'vida', id: '123123' },
        { nombre: 'stoptimer', id: '123123' }
    ], 
    jugador: {
        nombre: 'Alik',
        vidas: 3
    },
    niveles: {
        'nivel-1': {
            jugado: false,
            tiempo: 0,
            estrellas: 0
        },
        'nivel-2': {
            jugado: false,
            tiempo: 0,
            estrellas: 0
        },
        'nivel-3': {
            jugado: false,
            tiempo: 0,
            estrellas: 0
        },
        'nivel-4': {
            jugado: false,
            tiempo: 0,
            estrellas: 0
        },
        'nivel-5': {
            jugado: false,
            tiempo: 0,
            estrellas: 0
        }
    }
}; 

export default class BaseDatos {

    constructor() {
        if( !localStorage.getItem('data') ) {
            localStorage.setItem( 'data', JSON.stringify( dataExample ) );
        }

        if (!BaseDatos.instance) {
            BaseDatos.instance = this;
        }
        return BaseDatos.instance;
    }

    #getData() {
        return JSON.parse( localStorage.getItem('data') ); 
    }

    #setData( data ) {
        localStorage.setItem( 'data', JSON.stringify( data ) );
    }

    setNombreJugador( nombre ) {
        const data = this.#getData();
        data.jugador.nombre = nombre;
        this.#setData( data );
    }

    getNombreJugador() {
        const data = this.#getData();
        return data.jugador.nombre;
    }

    getVidasJugador() {
        const data = this.#getData();
        return data.jugador.vidas;
    }

    setVidasJugador( vidas ) {
        const data = this.#getData();
        data.jugador.vidas = vidas;
        this.#setData( data );
    }

    getPowerUps() {
        const data = this.#getData();
        return data.powerUps;
    }

    consumirPowerUp( id ) {
        const data = this.#getData();
        const powerUps = data.powerUps;
        const powerUpsConsumido = powerUps.filter( powerUp => powerUp.id !== id );
        data.powerUps = powerUpsConsumido;
        this.#setData( data );
    }


    pushPowerUp( nombre ) {
        const data = this.#getData();
        const powerUp = {
            nombre,
            id: Date.now().toString()
        }
        data.powerUps.push( powerUp );
        this.#setData( data );
    }

    setJuegoData( juego, jugado, tiempo, estrellas ) {
        const data = this.#getData();
        data.niveles[juego].jugado = jugado;
        data.niveles[juego].tiempo = tiempo;
        data.niveles[juego].estrellas = estrellas;
        this.#setData( data );
    }

    getJuegoData( juego ) {
        const data = this.#getData();
        return data.niveles[juego];
    }

}