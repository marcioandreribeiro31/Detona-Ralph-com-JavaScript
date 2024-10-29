const state = {
    view: {
        squares: document.querySelectorAll(".square"),
        enemy: document.querySelector(".enemy"),
        timeleft: document.querySelector("#time-left"),
        score: document.querySelector("#score"),
    },
    values: {

        gameVelocity: 1000,
        hitPosition: 0,
        result: 0,
        currentTilme: 60,
    },

    actions: {
        timerId: setInterval(randomSquare, 1000),
        countDownTimerId: setInterval(countDown, 1000),
    }
};

function countDown() {
    state.values.currentTilme--;
    state.view.timeleft.textContent = state.values.currentTilme;

    if (state.values.currentTilme <= 0) {
        clearInterval(state.actions.countDownTimerId);
        clearInterval(state.actions.TimerId);
        alert(`Game Over! O resultado foi ${state.values.result}`)
    }
}

function playSound(audioname) {
    let audio = new Audio(`./src/audios/${audioname}.m4a`);
    audio.volume = 0.3;
    audio.play();
}

function randomSquare() {
    state.view.squares.forEach((square) => {
        square.classList.remove("enemy");
    })

    let randomNumber = Math.floor(Math.random() * 9);
    let randomSquare = state.view.squares[randomNumber];
    randomSquare.classList.add("enemy");
    state.values.hitPosition = randomSquare.id;
    
}

function addListenerHitBox() {
    state.view.squares.forEach((square) => {
        square.addEventListener("mousedown", () => {
            if (square.id === state.values.hitPosition) {
                state.values.result++;
                state.view.score.textContent = state.values.result;
                state.values.hitPosition = null;
                playSound("hit");
            }
        })
    });
}

// função que inicia algumas funções do jogo
function initialaze() {
    addListenerHitBox();
}

initialaze();

