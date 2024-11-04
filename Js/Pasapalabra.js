//total preguntas del juego
const TOTAL_PREGUNTAS = 26;
//tiempo del juego
const TIEMPO_DEL_JUEGO = 120;
//estructura para almacenar las preguntas
const bd_juego = [
    {
        id: 'A',
        pregunta: "Con la A: Criatura con rostro de mujer y cuerpo de ave, que acecha desde el cielo sin miedo y sin clave.",
        respuesta: "arpia"
    },
    {
        id: 'B',
        pregunta: "Con la B: Con su mirada mortal, convierte en piedra a quien desafía; su aliento es veneno en cada mordida.",
        respuesta: "basilisco"
    },
    {
        id: 'C',
        pregunta: "Con la C: Monstruo marino gigante que amenaza con su furia y en el agua se oculta sin prisa.",
        respuesta: "ceto"
    },
    {
        id: 'D',
        pregunta: "Con la D: Ser de fuego y alas de terror, su aliento es llamas y su vuelo, temor.",
        respuesta: "dragon"
    },
    {
        id: 'E',
        pregunta: "Con la E: Guarda secretos y enigmas sin igual, si no aciertas su pregunta, te hace mal.",
        respuesta: "esfinge"
    },
    {
        id: 'F',
        pregunta: "Con la F: Lobo descomunal que desafía a los dioses y ruge por libertad.",
        respuesta: "fenrir"
    },
    {
        id: 'G',
        pregunta: "Con la G: Criatura mitad águila y mitad león, guardiana de tesoros y símbolo de fuerza.",
        respuesta: "grifo"
    },
    {
        id: 'H',
        pregunta: "Con la H: Criatura nacida de águila y corcel, con fuerza y majestuosidad vuela por doquier.",
        respuesta: "hipogrifo"
    },
    {
        id: 'I',
        pregunta: "Con la I: Ser de fuego y humo que se alza en el desierto, a quien no domina nada de este mundo.",
        respuesta: "ifrit"
    },
    {
        id: 'J',
        pregunta: "Con la J: Espíritu del viento o del fuego, te concede deseos, pero a cambio de juego.",
        respuesta: "jinn"
    },
    {
        id: 'K',
        pregunta: "Con la K: Monstruo marino con forma de pulpo gigante, capaz de destruir embarcaciones.",
        respuesta: "kraken"
    },
    {
        id: 'L',
        pregunta: "Con la L: Criatura que toma la forma de un lobo bajo la luna llena.",
        respuesta: "licántropo"
    },
    {
        id: 'M',
        pregunta: "Con la M: Ser mitológico de cuerpo de león y cola de escorpión, que habita en desiertos.",
        respuesta: "mantícora"
    },
    {
        id: 'N',
        pregunta: "Con la N: Ser serpentino, guardián de secretos, desliza entre templos y símbolos eternos.",
        respuesta: "naga"
    },
    {
        id: 'O',
        pregunta: "Con la O: Ninfas de los lagos y ríos, de aspecto encantador, que ayuda a los navegantes.",
        respuesta: "ondina"
    },
    {
        id: 'P',
        pregunta: "Con la P: Ser alado mitad humano y mitad Dragón que aterraba a las tribus; entre nubes y bosques, su vuelo era castigo.",
        respuesta: "piasa"
    },
    {
        id: 'Q',
        pregunta: "Con la Q: Ser feroz de con cabeza de león, cabra y serpiente, capaz de respirar fuego y representar el caos.",
        respuesta: "quimera"
    },
    {
        id: 'R',
        pregunta: "Con la R:  Demonio cambiante, que en forma humana se esconde y espera, hasta que alguien su odio despierte. Conocido por sus habilidades de manipulación.",
        respuesta: "rakshasa"
    },
    {
        id: 'S',
        pregunta: "Con la S: Criatura marina de belleza encantadora que atrae a los navegantes hacia su perdición.",
        respuesta: "sirena"
    },
    {
        id: 'T',
        pregunta: "Con la T: Dragón eslavo, con tres cabezas que escupe llamas, en cuentos y leyendas Rusos su fuerza es la trama.",
        respuesta: "tugarin"
    },
    {
        id: 'U',
        pregunta: "Con la U: Caballo blanco con un cuerno en la frente, símbolo de pureza y magia.",
        respuesta: "unicornio"
    },
    {
        id: 'V',
        pregunta: "Con la V: Ser nocturno que se alimenta de la sangre de los humanos y evita la luz del día.",
        respuesta: "vampiro"
    },
    {
        id: 'W',
        pregunta: "Con la W: Espíritu del frío y del hambre, del invierno extremo y en las noches te llama.",
        respuesta: "wendigo"
    },
    {
        id: 'X',
        pregunta: "Con la X: Perro sobrenatural mesoamericano, compañero de los muertos en su viaje al inframundo.",
        respuesta: "xoloitzcuintle"
    },
    {
        id: 'Y',
        pregunta: "Con la Y: Monstruo de las nieves, enorme y peludo, habitante de las montañas heladas.",
        respuesta: "yeti"
    },
    {
        id: 'Z',
        pregunta: "Con la letra Z: Soy una criatura tan vasta como una isla, los marineros me pisan creyendo que es tierra, pero, al sumergirme, los llevo a las profundidades del mar.",
        respuesta: "zaratan"
    }
];


//preguntas que ya han sido contestadas. Si estan en 0 no han sido contestadas
var estadoPreguntas = Array(TOTAL_PREGUNTAS).fill(0);
var cantidadAcertadas = 0;

//variable que mantiene el num de pregunta actual
var numPreguntaActual = -1;

// Obtener el elemento del cronómetro
const timer = document.getElementById("tiempo");

// Establecer el tiempo inicial en 60 segundos
let timeLeft = TIEMPO_DEL_JUEGO;
var countdown;

//boton comenzar
var comenzar = document.getElementById("comenzar");
comenzar.addEventListener("click", function(event) {
    document.getElementById("pantalla-inicial").style.display = "none";
    document.getElementById("pantalla-juego").style.display = "block";
    largarTiempo();
    cargarPregunta();
});

//Creamos el circúlo con las letras de la A a la Z
const container = document.querySelector(".container");
for (let i = 1; i <= TOTAL_PREGUNTAS; i++) {
    const circle = document.createElement("div");
    circle.classList.add("circle");
    circle.textContent = String.fromCharCode(i + 96);
    circle.id = String.fromCharCode(i + 96).toUpperCase();
    container.appendChild(circle);

    const angle = ((i - 1) / TOTAL_PREGUNTAS) * Math.PI * 2 - (Math.PI / 2);
    const x = Math.round(95 + 120 * Math.cos(angle));
    const y = Math.round(95 + 120 * Math.sin(angle));
    circle.style.left = `${x}px`;
    circle.style.top = `${y}px`;
}


//Función que carga la pregunta
function cargarPregunta(){
    numPreguntaActual++;
    //controlo si he llegado al final de las preguntas, para comenzar de nuevo
    if(numPreguntaActual>=TOTAL_PREGUNTAS){
        numPreguntaActual=0;
    }

    if(estadoPreguntas.indexOf(0)>=0){ //Controlo que todavía hallan preguntas por contestar
        while(estadoPreguntas[numPreguntaActual]==1){
            numPreguntaActual++;
            if(numPreguntaActual>=TOTAL_PREGUNTAS){
                numPreguntaActual=0;
                }
        }

        document.getElementById("letra-pregunta").textContent = bd_juego[numPreguntaActual].id
        document.getElementById("pregunta").textContent = bd_juego[numPreguntaActual].pregunta
        var letra =  bd_juego[numPreguntaActual].id;
        document.getElementById(letra).classList.add("pregunta-actual");
        }
    else{
        clearInterval(countdown);
        mostrarPantallaFinal();
        }

}

//detecto cada vez que hay un cambio de tecla en el input
var respuesta = document.getElementById("respuesta");
respuesta.addEventListener("keyup", function(event) {
//detecto si la tecla presionada es ENTER
    if (event.keyCode === 13) {
        if(respuesta.value==""){
        alert("Debe ingresar un valor!!");
        return;
            }
        //obtengo la respuesta ingresada
        var txtRespuesta = respuesta.value;
        controlarRespuesta(txtRespuesta.toLowerCase());
        }
});

//Función que controla la respuesta
function controlarRespuesta(txtRespuesta){
    // Eliminar espacios en blanco y convertir a minúsculas
    txtRespuesta = txtRespuesta.trim().toLowerCase();
    var respuestaCorrecta = bd_juego[numPreguntaActual].respuesta.toLowerCase(); // Convertir la respuesta correcta a minúsculas

    // Obtener la tarjeta de notificación
    var notificacion = document.getElementById("notificacion");
    var mensajeNotificacion = document.getElementById("mensaje-notificacion");

    // controlo si la respuesta es correcta
    if (txtRespuesta === respuestaCorrecta) {
        cantidadAcertadas++;

        // actualizo el estado de la pregunta actual a 1, indicando que ya está respondida
        estadoPreguntas[numPreguntaActual] = 1;
        var letra = bd_juego[numPreguntaActual].id;
        document.getElementById(letra).classList.remove("pregunta-actual");
        document.getElementById(letra).classList.add("bien-respondida");
        
        mensajeNotificacion.textContent = "¡Respuesta correcta!";
        notificacion.classList.remove("oculto");
        notificacion.classList.add("correcta");
    } else {
        // actualizo el estado de la pregunta actual a 1, indicando que ya está respondida
        estadoPreguntas[numPreguntaActual] = 1;
        var letra = bd_juego[numPreguntaActual].id;
        document.getElementById(letra).classList.remove("pregunta-actual");
        document.getElementById(letra).classList.add("mal-respondida");
        
        mensajeNotificacion.textContent = "Respuesta incorrecta. La respuesta correcta era: " + bd_juego[numPreguntaActual].respuesta;
        notificacion.classList.remove("oculto");
        notificacion.classList.add("incorrecta");
    }
    
    // Mostrar la notificación durante 5 segundos y luego ocultarla
    setTimeout(() => {
        notificacion.classList.add("oculto");
    }, 5000); // 5 segundos

    respuesta.value = "";
    cargarPregunta();
}


//botón para pasar de pregunta sin contestar
var pasar = document.getElementById("pasar");
pasar.addEventListener("click", function(event) {
    var letra =  bd_juego[numPreguntaActual].id;
    document.getElementById(letra).classList.remove("pregunta-actual");

    cargarPregunta();
});


// Crear la función que se encargará de actualizar el cronómetro cada segundo
function largarTiempo(){
    countdown = setInterval(() => {
        // Restar un segundo al tiempo restante
        timeLeft--;

        // Actualizar el texto del cronómetro con el tiempo restante
        timer.innerText = timeLeft;

        // Si el tiempo llega a 0, detener el cronómetro
        if (timeLeft < 0) {
            clearInterval(countdown);
            mostrarPantallaFinal();
            }
        }, 1000);
}

//muestro la pantlla final
function mostrarPantallaFinal(){
    document.getElementById("acertadas").textContent = cantidadAcertadas;
    var porcentajeCorrectas = (cantidadAcertadas * 100) / TOTAL_PREGUNTAS; // Calcular el porcentaje de respuestas correctas
    document.getElementById("score").textContent = porcentajeCorrectas.toFixed(2) + "% de acierto"; // Mostrar el porcentaje con dos decimales
    document.getElementById("pantalla-juego").style.display =  "none";
    document.getElementById("pantalla-final").style.display =  "block";
}

//boton para recomenzar el juego
var recomenzar = document.getElementById("recomenzar");
recomenzar.addEventListener("click", function(event) {
    numPreguntaActual = -1;
    timeLeft = TIEMPO_DEL_JUEGO;
    timer.innerText = timeLeft;
    cantidadAcertadas = 0;
    estadoPreguntas = Array(TOTAL_PREGUNTAS).fill(0);

  //quito las clases de los circulos
    var circulos = document.getElementsByClassName("circle");
    for(i=0;i<circulos.length;i++){
        circulos[i].classList.remove("bien-respondida");
        circulos[i].classList.remove("mal-respondida");
        }

    document.getElementById("pantalla-final").style.display = "none";
    document.getElementById("pantalla-juego").style.display = "block";
    largarTiempo();
    cargarPregunta();
});