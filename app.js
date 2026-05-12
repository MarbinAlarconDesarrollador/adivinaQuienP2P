/* =========================================
   🎭 ADIVINA QUIÉN P2P ULTRA ESTABLE
   ========================================= */

const characters = [

{
    name:"Ana",
    image:"https://i.pravatar.cc/300?img=1",
    mujer:true,
    gafas:false,
    sombrero:false,
    barba:false,
    cabelloNegro:true,
    ojosAzules:false
},

{
    name:"Luis",
    image:"https://i.pravatar.cc/300?img=2",
    mujer:false,
    gafas:true,
    sombrero:false,
    barba:true,
    cabelloNegro:false,
    ojosAzules:true
},

{
    name:"Sara",
    image:"https://i.pravatar.cc/300?img=3",
    mujer:true,
    gafas:true,
    sombrero:false,
    barba:false,
    cabelloNegro:true,
    ojosAzules:true
},

{
    name:"Carlos",
    image:"https://i.pravatar.cc/300?img=4",
    mujer:false,
    gafas:false,
    sombrero:true,
    barba:true,
    cabelloNegro:true,
    ojosAzules:false
}

];

while(characters.length < 24){

    const base =
        characters[
            Math.floor(Math.random()*4)
        ];

    characters.push({

        ...base,

        name:base.name + characters.length,

        image:`https://i.pravatar.cc/300?img=${characters.length+5}`

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

let myPeerId = "";

let heartbeatInterval = null;

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
   PEERJS ULTRA ESTABLE
========================================= */

function createPeer(){

    peer = new Peer({

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

        myPeerId = id;

        document
        .getElementById("myPeerId")
        .innerHTML = id;

        generateQR(id);

        setStatus(
            "🟡 Esperando conexión",
            "#F59E0B"
        );

        autoConnect();

    });

    peer.on("connection",(connection)=>{

        conn = connection;

        setupConnection();

    });

    peer.on("error",(err)=>{

        console.error(err);

        setStatus(
            "🔴 Error conexión",
            "#EF4444"
        );

    });

}

/* =========================================
   QR AUTOMÁTICO
========================================= */

function generateQR(id){

    const qrContainer =
        document.getElementById("qrcode");

    qrContainer.innerHTML = "";

    const url =
        window.location.origin +
        window.location.pathname +
        "?peer=" + id;

    new QRCode(qrContainer,{

        text:url,

        width:180,

        height:180

    });

}

/* =========================================
   AUTO CONEXIÓN
========================================= */

function autoConnect(){

    const params =
        new URLSearchParams(
            window.location.search
        );

    const peerId =
        params.get("peer");

    if(!peerId) return;

    document
    .getElementById("connectId")
    .value = peerId;

    setTimeout(()=>{

        connectToPeer(peerId);

    },2000);

}

/* =========================================
   CONECTAR
========================================= */

function connectToPeer(id){

    if(conn) return;

    setStatus(
        "🟡 Conectando...",
        "#F59E0B"
    );

    conn = peer.connect(id,{

        reliable:true

    });

    setupConnection();

}

/* =========================================
   CONFIGURAR CONEXIÓN
========================================= */

function setupConnection(){

    conn.on("open",()=>{

        playSound();

        setStatus(
            "🟢 Conectado",
            "#10B981"
        );

        answerText.innerHTML =
            "🎮 Partida iniciada";

        currentTurn = true;

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

        addMessage(
            "❌ Conexión cerrada",
            "system"
        );

        stopHeartbeat();

    });

    conn.on("error",(err)=>{

        console.error(err);

        setStatus(
            "🔴 Error P2P",
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
   MANEJAR MENSAJES
========================================= */

function handleData(data){

    playSound();

    if(data.type === "ping"){

        return;

    }

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

    if(data.type === "answer"){

        answerText.innerHTML =
            data.answer
            ? "✅ Sí"
            : "❌ No";

    }

    if(data.type === "chat"){

        addMessage(
            `🧑 Rival: ${data.text}`
        );

    }

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

    if(data.type === "guessFail"){

        answerText.innerHTML =
            "❌ Adivinanza incorrecta";

    }

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

        /* DESCARTE */

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
   BOTÓN CONECTAR
========================================= */

document
.getElementById("connectBtn")
.addEventListener("click",()=>{

    const id =
        document.getElementById("connectId")
        .value
        .trim();

    if(!id) return;

    connectToPeer(id);

});

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

        label:select.options[
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

    if(!conn || !conn.open) return;

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

    if(!conn || !conn.open) return;

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

/* =========================================
   SERVICE WORKER
========================================= */

if("serviceWorker" in navigator){

    navigator.serviceWorker
    .register("service-worker.js");

}