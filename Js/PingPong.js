// Código JavaScript para el juego de Ping Pong

// OBJETOS:

class Bordes {
    constructor(minX, maxX, minY, maxY) {
        this.minX = minX;
        this.maxX = maxX;
        this.minY = minY;
        this.maxY = maxY;
    }
}

class ObjetoMovil {
    constructor(bordesTablero, elem, vel) {
        this.bordesTablero = bordesTablero;
        this.vel = vel;
        this.x = parseInt(getComputedStyle(elem).left);
        this.y = parseInt(getComputedStyle(elem).bottom);
        this.ancho = parseInt(getComputedStyle(elem).width);
        this.alto = parseInt(getComputedStyle(elem).height);
        this.elem = elem;
    }

    GetBordes() {
        return new Bordes(this.x - this.ancho / 2, this.x + this.ancho / 2, this.y - this.alto / 2, this.y + this.alto / 2);
    }

    Resetear() {
        this.ancho = parseInt(getComputedStyle(this.elem).width);
        this.alto = parseInt(getComputedStyle(this.elem).height);
    }
}

class Pelota extends ObjetoMovil {
    constructor(bordesTablero, elem, vel, dirX, dirY, arrastre) {
        super(bordesTablero, elem, vel);
        this.dirX = dirX;
        this.dirY = dirY;
        this.arrastre = arrastre;
    }

    Movimiento() {
        this.x += this.vel * this.dirX;
        this.y += this.vel * this.dirY;
        this.elem.style.left = this.x + 'px';
        this.elem.style.bottom = this.y + 'px';
    }

    Colision() {
        if (this.GetBordes().minX < this.bordesTablero.minX || this.GetBordes().maxX > this.bordesTablero.maxX) {
            this.dirX *= -1;
        }
        if (this.GetBordes().minY < this.bordesTablero.minY || this.GetBordes().maxY > this.bordesTablero.maxY) {
            this.dirY *= -1;
        }
    }
}

class Pala extends ObjetoMovil {
    constructor(bordesTablero, elem, vel) {
        super(bordesTablero, elem, vel);
    }

    Movimiento(dir) {
        this.y += this.vel * dir;
        if (this.y < this.bordesTablero.minY + this.alto / 2) {
            this.y = this.bordesTablero.minY + this.alto / 2;
        }
        if (this.y > this.bordesTablero.maxY - this.alto / 2) {
            this.y = this.bordesTablero.maxY - this.alto / 2;
        }
        this.elem.style.bottom = this.y + 'px';
    }
}

// VARIABLES:

const escenario = document.querySelector(".escenario");
const pala1 = document.querySelector(".pala1");
const pala2 = document.querySelector(".pala2");
const pelota = document.querySelector(".pelota");
const marcador1 = document.querySelector(".marcador1");
const marcador2 = document.querySelector(".marcador2");

let velPelota = 5; 
let velPala = 5; 
let contador1 = 0; 
let contador2 = 0;

const bordesTablero = new Bordes(0, 800, 0, 600);
const pelotaMovil = new Pelota(bordesTablero, pelota, velPelota, 1, 1, 0.8);
const pala1Movil = new Pala(bordesTablero, pala1, velPala);
const pala2Movil = new Pala(bordesTablero, pala2, velPala);

// ESCUCHADORES DE EVENTOS:

document.addEventListener("keydown", (e) => {
    if (e.key == "ArrowUp") {
        pala2Movil.Movimiento(1);
    }
    if (e.key == "ArrowDown") {
        pala2Movil.Movimiento(-1);
    }
    if (e.key == "w") {
        pala1Movil.Movimiento(1);
    }
    if (e.key == "s") {
        pala1Movil.Movimiento(-1);
    }
});

// INICIO DEL JUEGO:

function IniciarJuego() {
    pelotaMovil.Movimiento();
    pelotaMovil.Colision();
    requestAnimationFrame(IniciarJuego);
}

// INICIAR JUEGO:
IniciarJuego();
