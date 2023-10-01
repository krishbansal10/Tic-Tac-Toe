const selectBox = document.querySelector(".select-box"),
selectXBtn = document.querySelector(".playerX"),
selectOBtn = document.querySelector(".playerO"),
playBoard = document.querySelector(".playboard"),
players = document.querySelector(".players"),
allBox = document.querySelectorAll("section span"),
resultBox = document.querySelector(".result-box"),
wonText = resultBox.querySelector(".won"),
replayBtn = resultBox.querySelector(".replay");

window.onload = () => {
    for(let i=0; i<allBox.length; i++) {
        allBox[i].setAttribute("onclick", "clickedBox(this)");
    }
}

selectXBtn.onclick = () => {
    selectBox.classList.add("hide");
    playBoard.classList.add("show");
}
selectOBtn.onclick = () => {
    selectBox.classList.add("hide");
    playBoard.classList.add("show");
    players.setAttribute("class", "players active player");
}

let playerXIcon = "fas fa-times";
let playerOIcon = "far fa-circle";
let playerSign = "X";
let runBot = true;

function clickedBox(element) {
    if(players.classList.contains("player")) {
        playerSign = "O";
        element.innerHTML = `<i class="${playerOIcon}"></i>`;
        players.classList.remove("active");
        element.setAttribute("id", playerSign);
    } else {
        element.innerHTML = `<i class="${playerXIcon}"></i>`;
        element.setAttribute("id", playerSign);
        players.classList.add("active");
    }
    selectWinner();
    element.style.pointerEvents = "none";
    playBoard.style.pointerEvents = "none";
    let delayTime = ((Math.random() * 1000) + 200).toFixed();
    setTimeout(() => {
        bot(runBot);
    }, delayTime)
}

function bot() {
    let arr = [];
    if(runBot) {
        playerSign = "O";
        for(let i=0; i<allBox.length; i++) {
            if(allBox[i].childElementCount == 0) {
                arr.push(i);
            }
        }
        let randBox = arr[Math.floor(Math.random() * arr.length)];
        if(arr.length > 0) {
            if(players.classList.contains("player")) {
                playerSign = "X";
                allBox[randBox].innerHTML = `<i class="${playerXIcon}"></i>`;
                allBox[randBox].setAttribute("id", playerSign);
                players.classList.add("active");
            } else {
                allBox[randBox].innerHTML = `<i class="${playerOIcon}"></i>`;
                players.classList.remove("active");
                allBox[randBox].setAttribute("id", playerSign);
            }
            selectWinner();
        }
        allBox[randBox].style.pointerEvents = "none";
        playBoard.style.pointerEvents = "auto";
        playerSign = "X";
    }
}

function getID(idName) {
    return document.querySelector(".box" + idName).id;
}

function checkIDs(val1, val2, val3, sign) {
    if(getID(val1) == sign && getID(val2) == sign && getID(val3) == sign) {
        return true;
    }
}

function selectWinner() {
    if(checkIDs(1, 2, 3, playerSign) || checkIDs(4, 5, 6, playerSign) || checkIDs(7, 8, 9, playerSign)
        || checkIDs(1, 4, 7, playerSign) || checkIDs(2, 5, 8, playerSign) || checkIDs(3, 6, 9, playerSign)
        || checkIDs(1, 5, 9, playerSign) || checkIDs(3, 5, 7, playerSign)) {
            runBot = false;
            bot(runBot);
            setTimeout(() => {
                resultBox.classList.add("show");
                playBoard.classList.remove("show");
            }, 700)
            wonText.innerHTML = `Player <p>${playerSign}</p> wins the game!`;
    } else {
        if(getID(1) != "" && getID(2) != "" && getID(3) != "" 
            && getID(4) != "" && getID(5) != "" && getID(6) != "" 
            && getID(7) != "" && getID(8) != "" && getID(9) != "") {
            runBot = false; 
            bot(runBot); 
            setTimeout(() => { 
                resultBox.classList.add("show");
                playBoard.classList.remove("show");
            }, 700); 
            wonText.textContent = "Match has been drawn!";
        }
    }
}

replayBtn.onclick = () => {
    window.location.reload(); 
}