let wordOneInput = document.getElementById("a");
let wordTwoInput = document.getElementById("b");
let animationContainer = document.getElementById("animfield");

let wordOne = "";
let wordTwo = "";

const CARD_WIDTH = 60;
const CARD_SPACING = 80;

const CARD_OFFSET = CARD_SPACING - CARD_WIDTH;

function findDiff() {
    wordOne = wordOneInput.value.toUpperCase();
    wordTwo = wordTwoInput.value.toUpperCase();

    remove = wordOne.split("");
    add = wordTwo.split("");
    move = [];

    for (let i = 0; i < remove.length; i++) {
        let j = add.indexOf(remove[i]);

        if (j != -1) {
            move[i] = [j, remove[i]];
            add[j] = null;
            remove[i] = null;
        }
    }
    
    startAnimation();
}

function startAnimation() {
    animationContainer.innerHTML = "";

    let width = 0;

    let oneOffset = 0;
    let twoOffset = 0;
    
    if (wordTwo.length > wordOne.length) {
        width = wordTwo.length * CARD_SPACING - CARD_OFFSET;
        oneOffset = Math.floor((width - wordOne.length * CARD_SPACING) / 2);
    } else {
        width = wordOne.length * CARD_SPACING - CARD_OFFSET;
        twoOffset = Math.floor((width - wordTwo.length * CARD_SPACING) / 2);
    }
    
    animationContainer.style.width = width + "px";

    for (let i = 0; i < remove.length; i++) {
        let letter = remove[i];

        if (letter != null && letter != " ") {
            addCard(oneOffset, i, letter, "disappearing");
        }
    }

    for (let i = 0; i < add.length; i++) {
        let letter = add[i];

        if (letter != null && letter != " ") {
            addCard(twoOffset, i, letter, "appearing");
        }
    }

    for (let i = 0; i < move.length; i++) {
        let letter = move[i];

        if (letter != null && letter[1] != " ") {
            let end = letter[0] * CARD_SPACING;
            let card = addCard(oneOffset, i, letter[1], "moving");
            
            setTimeout(() => { card.style.left = twoOffset + end + "px" }, 2000);
        }
    }
}

function addCard(offset, i, letter, className) {
    let div = document.createElement("div");

    div.innerText = letter;

    div.classList.add(className);
    div.classList.add("card");

    div.style.left = offset + CARD_SPACING * i + "px";

    animationContainer.append(div);

    return div;
}

function swapWords() {
    [ wordOneInput.value, wordTwoInput.value ] = [ wordTwoInput.value, wordOneInput.value ];
}

findDiff();