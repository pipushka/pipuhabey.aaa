const cards = document.querySelectorAll(".card");
const flipsTag = document.querySelector(".flips b");
const refreshBtn = document.querySelector(".details button");

let flips = 0;
let matchedCard = 0;
let disableDeck = false;
let cardOne = null;
let cardTwo = null;

function flipCard(e) {
    const clickedCard = e.currentTarget;

    if (
        clickedCard === cardOne ||
        disableDeck ||
        clickedCard.classList.contains("flip")
    ) {
        return;
    }

    flips++;
    flipsTag.innerText = flips;

    clickedCard.classList.add("flip");

    if (!cardOne) {
        cardOne = clickedCard;
        return;
    }

    cardTwo = clickedCard;
    disableDeck = true;

    const cardOneImg =
        cardOne.querySelector(".back-view img").src;

    const cardTwoImg =
        cardTwo.querySelector(".back-view img").src;

    matchCards(cardOneImg, cardTwoImg);
}

function matchCards(img1, img2) {
    if (img1 === img2) {
        matchedCard++;

        if (matchedCard === 10) {
            setTimeout(() => {
                alert("Победа!");
            }, 300);
        }

        cardOne.removeEventListener("click", flipCard);
        cardTwo.removeEventListener("click", flipCard);

        cardOne = null;
        cardTwo = null;
        disableDeck = false;
        return;
    }

    setTimeout(() => {
        cardOne.classList.add("shake");
        cardTwo.classList.add("shake");
    }, 400);

    setTimeout(() => {
        cardOne.classList.remove("shake", "flip");
        cardTwo.classList.remove("shake", "flip");

        cardOne = null;
        cardTwo = null;
        disableDeck = false;
    }, 1200);
}

function shuffleCard() {
    flips = 0;
    matchedCard = 0;
    cardOne = null;
    cardTwo = null;
    disableDeck = false;

    flipsTag.innerText = flips;

    const arr = [
        1,2,3,4,5,6,7,8,9,10,
        1,2,3,4,5,6,7,8,9,10
    ];

    arr.sort(() => Math.random() - 0.5);

    cards.forEach((card, index) => {
        card.classList.remove("flip");
        card.classList.remove("shake");

        const imgTag = card.querySelector(".back-view img");
        imgTag.src = `img-${arr[index]}.png`;

        card.removeEventListener("click", flipCard);
        card.addEventListener("click", flipCard);
    });
}

refreshBtn.addEventListener("click", shuffleCard);

shuffleCard();
