const cards = document.querySelectorAll(".card");
const refreshBtn = document.querySelector(".details button");

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
                alert("Какое слово спрятано?");
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
    }, 100);

    setTimeout(() => {
        cardOne.classList.remove("shake", "flip");
        cardTwo.classList.remove("shake", "flip");

        cardOne = null;
        cardTwo = null;
        disableDeck = false;
    }, 350);
}

function shuffleCard() {
    matchedCard = 0;
    cardOne = null;
    cardTwo = null;
    disableDeck = false;

    const arr = [
        1,2,3,4,5,6,7,8,9,10,
        1,2,3,4,5,6,7,8,9,10
    ];

    arr.sort(() => Math.random() - 0.5);

    cards.forEach((card, index) => {
        card.classList.remove("flip");
        card.classList.remove("shake");

        const imgTag =
            card.querySelector(".back-view img");

        imgTag.src = `img-${arr[index]}.png`;

        card.removeEventListener(
            "click",
            flipCard
        );

        card.addEventListener(
            "click",
            flipCard
        );
    });
}

if (refreshBtn) {
    refreshBtn.addEventListener(
        "click",
        shuffleCard
    );
}

shuffleCard();
