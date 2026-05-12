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

    const base = characters[
        Math.floor(Math.random()*4)
    ];

    characters.push({

        ...base,

        name:base.name + characters.length,

        image:`https://i.pravatar.cc/300?img=${characters.length+5}`

    });

}

const board = document.getElementById("board");
const answerText = document.getElementById("answerText");

const mySecretImage =
    document.getElementById("mySecretImage");

const mySecretName =
    document.getElementById("mySecretName");

const chatMessages =
    document.getElementById("chatMessages");

const clickSound =
    document.getElementById("clickSound");

let mySecret = null;

let currentTurn = false;

let peer;
let conn;

function playSound(){

    clickSound.currentTime = 0;

    clickSound.play();

}

function addMessage(text){

    const div = document.createElement("div");

    div.classList.add("message");

    div.innerHTML = text;

    chatMessages.appendChild(div);

    chatMessages.scrollTop =
        chatMessages.scrollHeight;

}

peer = new Peer();

peer.on("open",(id)=>{

    document.getElementById("myPeerId")
    .textContent = id;

    new QRCode(
        document.getElementById("qrcode"),
        id
    );

});

peer.on("connection",(connection)=>{

    conn = connection;

    setupConnection();

});

document
.getElementById("connectBtn")
.addEventListener("click",()=>{

    const id =
        document.getElementById("connectId").value;

    conn = peer.connect(id);

    setupConnection();

});

function setupConnection(){

    conn.on("open",()=>{

        document
        .getElementById("connectionStatus")
        .innerHTML =
            "🟢 Conectado";

        answerText.innerHTML =
            "🎮 Partida iniciada";

        currentTurn = true;

        updateTurn();

    });

    conn.on("data",(data)=>{

        handleData(data);

    });

}

function updateTurn(){

    document
    .getElementById("turnStatus")
    .innerHTML =
        currentTurn
        ? "🟢 Tu turno"
        : "⏳ Turno rival";

}

function handleData(data){

    playSound();

    if(data.type === "question"){

        const result =
            mySecret[data.question];

        answerText.innerHTML =
            `❓ ${data.label}`;

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

        if(data.guess === mySecret.name){

            conn.send({

                type:"win"

            });

            showLose();

        }else{

            alert("🎉 El rival falló");

        }

    }

    if(data.type === "win"){

        showWin();

    }

}

function showWin(){

    const modal =
        document.getElementById("winnerModal");

    modal.classList.remove("hidden");

    document
    .getElementById("winnerTitle")
    .innerHTML =
        "🏆 GANASTE";

}

function showLose(){

    const modal =
        document.getElementById("winnerModal");

    modal.classList.remove("hidden");

    document
    .getElementById("winnerTitle")
    .innerHTML =
        "😢 PERDISTE";

}

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

        card.addEventListener("click",()=>{

            card.classList.toggle("disabled");

        });

        card.addEventListener("dblclick",()=>{

            playSound();

            document
            .querySelectorAll(".card")
            .forEach(c=>{

                c.classList.remove("selected");

            });

            card.classList.add("selected");

            mySecret = character;

            mySecretImage.src =
                character.image;

            mySecretName.innerHTML =
                character.name;

        });

        board.appendChild(card);

    });

}

document
.getElementById("askBtn")
.addEventListener("click",()=>{

    if(!conn || !currentTurn) return;

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

document
.getElementById("guessBtn")
.addEventListener("click",()=>{

    const guess =
        document.getElementById("guessInput")
        .value;

    conn.send({

        type:"guess",

        guess:guess

    });

});

document
.getElementById("sendChatBtn")
.addEventListener("click",()=>{

    const input =
        document.getElementById("chatInput");

    if(!input.value.trim()) return;

    addMessage(
        `😀 Tú: ${input.value}`
    );

    conn.send({

        type:"chat",

        text:input.value

    });

    input.value = "";

});

createBoard();

if("serviceWorker" in navigator){

    navigator.serviceWorker
    .register("sw.js");

}