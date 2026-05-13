/* =========================================
   🎭 ADIVINA QUIÉN P2P
   ULTRA ESTABLE FINAL
========================================= */

/* =========================================
   PERSONAJES
========================================= */

const characters = [

{
    name:"Carlos",
    image:"./assets/carlos.png",
    mujer:false,
    gafas:false,
    sombrero:false,
    barba:false,
    cabelloNegro:true,
    ojosAzules:false
},

{
    name:"Luis",
    image:"./assets/luis.png",
    mujer:false,
    gafas:true,
    sombrero:false,
    barba:false,
    cabelloNegro:true,
    ojosAzules:false
},

{
    name:"Rafael",
    image:"./assets/rafael.png",
    mujer:false,
    gafas:false,
    sombrero:false,
    barba:false,
    cabelloNegro:true,
    ojosAzules:true
},

{
    name:"Withman",
    image:"./assets/withman.png",
    mujer:false,
    gafas:true,
    sombrero:false,
    barba:true,
    cabelloNegro:true,
    ojosAzules:false
},
{
    name:"Marbin",
    image:"./assets/marbin.png",
    mujer:false,
    gafas:false,
    sombrero:false,
    barba:false,
    cabelloNegro:true,
    ojosAzules:true
},

{
    name:"Freddy",
    image:"./assets/freddy.png",
    mujer:false,
    gafas:true,
    sombrero:false,
    barba:true,
    cabelloNegro:false,
    ojosAzules:false
},

{
    name:"Camilo",
    image:"./assets/camilo.png",
    mujer:false,
    gafas:true,
    sombrero:false,
    barba:true,
    cabelloNegro:true,
    ojosAzules:false
},

{
    name:"Jaider",
    image:"./assets/jaider.png",
    mujer:false,
    gafas:false,
    sombrero:false,
    barba:false,
    cabelloNegro:true,
    ojosAzules:false
},
{
    name:"Nuvia",
    image:"./assets/nuvia.png",
    mujer:true,
    gafas:false,
    sombrero:false,
    barba:false,
    cabelloNegro:true,
    ojosAzules:false
},

{
    name:"Carla",
    image:"./assets/carla.png",
    mujer:true,
    gafas:false,
    sombrero:false,
    barba:false,
    cabelloNegro:true,
    ojosAzules:false
},

{
    name:"Jesus",
    image:"./assets/jesus.png",
    mujer:false,
    gafas:false,
    sombrero:false,
    barba:false,
    cabelloNegro:true,
    ojosAzules:false
},

{
    name:"Laura",
    image:"./assets/laura.png",
    mujer:true,
    gafas:false,
    sombrero:false,
    barba:false,
    cabelloNegro:true,
    ojosAzules:false
},
{
    name:"Francy",
    image:"./assets/francy.png",
    mujer:true,
    gafas:false,
    sombrero:false,
    barba:false,
    cabelloNegro:true,
    ojosAzules:false
},

{
    name:"Pedro",
    image:"./assets/pedro.png",
    mujer:false,
    gafas:false,
    sombrero:true,
    barba:false,
    cabelloNegro:true,
    ojosAzules:false
},

{
    name:"Jhoan",
    image:"./assets/jhoan.png",
    mujer:false,
    gafas:false,
    sombrero:true,
    barba:false,
    cabelloNegro:true,
    ojosAzules:false
},

{
    name:"Valentina",
    image:"./assets/valentina.png",
    mujer:true,
    gafas:true,
    sombrero:false,
    barba:false,
    cabelloNegro:false,
    ojosAzules:false
},
{
    name:"Lorena",
    image:"./assets/lorena.png",
    mujer:true,
    gafas:false,
    sombrero:false,
    barba:false,
    cabelloNegro:false,
    ojosAzules:true
},

{
    name:"Miguel",
    image:"./assets/miguel.png",
    mujer:false,
    gafas:false,
    sombrero:false,
    barba:true,
    cabelloNegro:false,
    ojosAzules:false
},

{
    name:"Jorge",
    image:"./assets/jorge.png",
    mujer:false,
    gafas:false,
    sombrero:false,
    barba:false,
    cabelloNegro:true,
    ojosAzules:false
},

{
    name:"Lucia",
    image:"./assets/lucia.png",
    mujer:true,
    gafas:false,
    sombrero:false,
    barba:false,
    cabelloNegro:true,
    ojosAzules:false
},
{
    name:"Anderson",
    image:"./assets/anderson.png",
    mujer:false,
    gafas:false,
    sombrero:false,
    barba:true,
    cabelloNegro:true,
    ojosAzules:false
},

{
    name:"Luigi",
    image:"./assets/luigi.png",
    mujer:false,
    gafas:false,
    sombrero:false,
    barba:false,
    cabelloNegro:true,
    ojosAzules:false
},

{
    name:"Lucas",
    image:"./assets/lucas.png",
    mujer:false,
    gafas:true,
    sombrero:true,
    barba:true,
    cabelloNegro:true,
    ojosAzules:false
},

{
    name:"Karina",
    image:"./assets/karina.png",
    mujer:true,
    gafas:false,
    sombrero:false,
    barba:false,
    cabelloNegro:true,
    ojosAzules:false
}
];

/* GENERAR 24 */

while(characters.length < 24){

    const base =
        characters[
            Math.floor(Math.random()*4)
        ];

    characters.push({

        ...base,

        name:
            base.name +
            characters.length,

        image:
            `https://i.pravatar.cc/300?img=${characters.length+5}`

    });

}

/* =========================================
   ELEMENTOS
========================================= */

const board =
    document.getElementById("board");

const answerText =
    document.getElementById("answerText");

const mySecretImage =
    document.getElementById("mySecretImage");

const mySecretName =
    document.getElementById("mySecretName");

const connectionStatus =
    document.getElementById("connectionStatus");

const turnStatus =
    document.getElementById("turnStatus");

const chatMessages =
    document.getElementById("chatMessages");

const clickSound =
    document.getElementById("clickSound");

/* =========================================
   VARIABLES
========================================= */

let mySecret = null;

let currentTurn = false;

let peer = null;

let conn = null;

let heartbeatInterval = null;

/* =========================================
   ROOM
========================================= */

const ROOM_ID =
    new URLSearchParams(
        window.location.search
    ).get("room");

const IS_HOST = !ROOM_ID;

/* =========================================
   SONIDOS
========================================= */

function playSound(){

    try{

        clickSound.currentTime = 0;

        clickSound.play();

    }catch(e){}

}

/* =========================================
   STATUS
========================================= */

function setStatus(text,color){

    connectionStatus.innerHTML = text;

    connectionStatus.style.color = color;

}

function updateTurn(){

    turnStatus.innerHTML =
        currentTurn
        ? "🟢 Tu turno"
        : "⏳ Turno rival";

}

/* =========================================
   CHAT
========================================= */

function addMessage(text,type="remote"){

    const div =
        document.createElement("div");

    div.classList.add("message");

    div.classList.add(type);

    div.innerHTML = text;

    chatMessages.appendChild(div);

    chatMessages.scrollTop =
        chatMessages.scrollHeight;

}

/* =========================================
   ROOM RANDOM
========================================= */

function randomRoom(){

    return Math.random()
    .toString(36)
    .substring(2,8);

}

/* =========================================
   QR
========================================= */

function generateQR(url){

    const qr =
        document.getElementById("qrcode");

    qr.innerHTML = "";

    new QRCode(qr,{

        text:url,

        width:180,

        height:180

    });

}

/* =========================================
   CREAR PEER
========================================= */

function createPeer(){

    let roomCode = ROOM_ID;

    let peerId;

    /* HOST */

    if(IS_HOST){

        roomCode =
            randomRoom();

        peerId =
            "room-" +
            roomCode +
            "-host";

        const url =
            window.location.origin +
            window.location.pathname +
            "?room=" +
            roomCode;

        generateQR(url);

        answerText.innerHTML =
            `
            📱 Escanea el QR
            <br><br>
            Sala:
            <b>${roomCode}</b>
            `;

    }

    /* GUEST */

    else{

        peerId =
            "guest-" +
            Math.random()
            .toString(36)
            .substring(2,8);

    }

    console.log(
        "PEER ID:",
        peerId
    );

    peer = new Peer(peerId,{

        debug:2,

        config:{

            iceServers:[

                {
                    urls:"stun:stun.l.google.com:19302"
                },

                {
                    urls:"stun:global.stun.twilio.com:3478"
                },

                {
                    urls:"stun:stun1.l.google.com:19302"
                }

            ]

        }

    });

    peer.on("open",(id)=>{

        console.log(
            "PEER READY:",
            id
        );

        document
        .getElementById("myPeerId")
        .innerHTML = id;

        setStatus(
            "🟡 Esperando conexión",
            "#F59E0B"
        );

        /* AUTO CONNECT */

        if(!IS_HOST){

            connectToHost();

        }

    });

    peer.on("connection",(connection)=>{

        console.log(
            "RIVAL CONECTADO"
        );

        conn = connection;

        setupConnection();

    });

    peer.on("error",(err)=>{

        console.error(err);

        setStatus(
            "🔴 Error Peer",
            "#EF4444"
        );

    });

}

/* =========================================
   CONECTAR A HOST
========================================= */

function connectToHost(){

    const hostId =
        "room-" +
        ROOM_ID +
        "-host";

    console.log(
        "Conectando a:",
        hostId
    );

    setStatus(
        "🟡 Conectando...",
        "#F59E0B"
    );

    setTimeout(()=>{

        conn = peer.connect(hostId,{

            reliable:true

        });

        setupConnection();

    },3000);

}

/* =========================================
   CONFIGURAR CONEXIÓN
========================================= */

function setupConnection(){

    conn.on("open",()=>{

        playSound();

        console.log(
            "CONEXIÓN ABIERTA"
        );

        setStatus(
            "🟢 Conectado",
            "#10B981"
        );

        answerText.innerHTML =
            "🎮 Partida iniciada";

        currentTurn = IS_HOST;

        updateTurn();

        addMessage(
            "🎉 Rival conectado",
            "system"
        );

        startHeartbeat();

    });

    conn.on("data",(data)=>{

        handleData(data);

    });

    conn.on("close",()=>{

        setStatus(
            "🔴 Rival desconectado",
            "#EF4444"
        );

        stopHeartbeat();

    });

    conn.on("error",(err)=>{

        console.error(err);

        setStatus(
            "🔴 Error conexión",
            "#EF4444"
        );

    });

}

/* =========================================
   HEARTBEAT
========================================= */

function startHeartbeat(){

    stopHeartbeat();

    heartbeatInterval =
        setInterval(()=>{

            if(conn && conn.open){

                conn.send({

                    type:"ping"

                });

            }

        },5000);

}

function stopHeartbeat(){

    clearInterval(
        heartbeatInterval
    );

}

/* =========================================
   DATOS
========================================= */

function handleData(data){

    playSound();

    if(data.type === "ping"){

        return;

    }

    /* PREGUNTA */

    if(data.type === "question"){

        if(!mySecret){

            answerText.innerHTML =
                "⚠️ Selecciona personaje";

            return;

        }

        const result =
            mySecret[data.question];

        answerText.innerHTML =
            data.label;

        conn.send({

            type:"answer",

            answer:result

        });

        currentTurn = true;

        updateTurn();

    }

    /* RESPUESTA */

    if(data.type === "answer"){

        answerText.innerHTML =
            data.answer
            ? "✅ Sí"
            : "❌ No";

    }

    /* CHAT */

    if(data.type === "chat"){

        addMessage(
            `🧑 Rival: ${data.text}`
        );

    }

    /* ADIVINAR */

    if(data.type === "guess"){

        if(!mySecret) return;

        if(data.guess === mySecret.name){

            conn.send({

                type:"win"

            });

            showModal(
                "😢 PERDISTE"
            );

        }else{

            conn.send({

                type:"guessFail"

            });

        }

    }

    /* FALLÓ */

    if(data.type === "guessFail"){

        answerText.innerHTML =
            "❌ Falló la adivinanza";

    }

    /* GANÓ */

    if(data.type === "win"){

        showModal(
            "🏆 GANASTE"
        );

    }

}

/* =========================================
   MODAL
========================================= */

function showModal(title){

    const modal =
        document.getElementById("winnerModal");

    modal.classList.remove("hidden");

    document
    .getElementById("winnerTitle")
    .innerHTML = title;

}

/* =========================================
   TABLERO
========================================= */

function createBoard(){

    board.innerHTML = "";

    characters.forEach(character=>{

        const card =
            document.createElement("div");

        card.classList.add("card");

        card.innerHTML = `

            <img src="${character.image}">

            <h3>${character.name}</h3>

        `;

        /* DESCARTAR */

        card.addEventListener("click",()=>{

            card.classList.toggle(
                "disabled"
            );

        });

        /* PERSONAJE */

        card.addEventListener("dblclick",()=>{

            playSound();

            document
            .querySelectorAll(".card")
            .forEach(c=>{

                c.classList.remove(
                    "selected"
                );

            });

            card.classList.add(
                "selected"
            );

            mySecret = character;

            mySecretImage.src =
                character.image;

            mySecretName.innerHTML =
                character.name;

            answerText.innerHTML =
                "✅ Personaje seleccionado";

        });

        board.appendChild(card);

    });

}

/* =========================================
   PREGUNTAR
========================================= */

document
.getElementById("askBtn")
.addEventListener("click",()=>{

    if(!conn || !conn.open){

        answerText.innerHTML =
            "⚠️ No conectado";

        return;

    }

    if(!mySecret){

        answerText.innerHTML =
            "⚠️ Selecciona personaje";

        return;

    }

    if(!currentTurn){

        answerText.innerHTML =
            "⏳ Espera tu turno";

        return;

    }

    const select =
        document.getElementById("questionSelect");

    conn.send({

        type:"question",

        question:select.value,

        label:
            select.options[
                select.selectedIndex
            ].text

    });

    currentTurn = false;

    updateTurn();

});

/* =========================================
   ADIVINAR
========================================= */

document
.getElementById("guessBtn")
.addEventListener("click",()=>{

    if(!conn || !conn.open){

        answerText.innerHTML =
            "⚠️ No conectado";

        return;

    }

    const guess =
        document
        .getElementById("guessInput")
        .value
        .trim();

    if(!guess) return;

    conn.send({

        type:"guess",

        guess:guess

    });

});

/* =========================================
   CHAT
========================================= */

document
.getElementById("sendChatBtn")
.addEventListener("click",()=>{

    if(!conn || !conn.open){

        answerText.innerHTML =
            "⚠️ No conectado";

        return;

    }

    const input =
        document.getElementById("chatInput");

    if(!input.value.trim()) return;

    addMessage(
        `😀 Tú: ${input.value}`,
        "local"
    );

    conn.send({

        type:"chat",

        text:input.value

    });

    input.value = "";

});

/* =========================================
   INICIAR
========================================= */

createBoard();

createPeer();