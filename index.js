let dealerscore = document.querySelector(".dealerScore");
let playerscore = document.querySelector(".playerScore");
let winner = document.querySelector(".winner");

let buttonHit = document.getElementById("hit");
buttonHit.onclick = function() {
  onePlayerGame.getOneCardForPlayer(onePlayerGame.deck.topCard());
};

let buttonStay = document.getElementById("stay");
buttonStay.onclick = function() {
  onePlayerGame.finishGame();
};
let buttonReset = document.getElementById("reset");
buttonReset.onclick = function() {
  location.reload();
};

class Card {
  constructor(value, suit) {
    this.realValue = value;
    this.value = value;
    if (value > 11) {
      value = 10;
    }
    this.value = value;
    switch (suit) {
      case 1:
        this.suit = "Clubs";
        break;
      case 2:
        this.suit = "Diamonds";
        break;
      case 3:
        this.suit = "Hearts";
        break;
      case 4:
        this.suit = "Spades";
        break;
    }
  }

  toString() {
    return this.suit + " of " + this.value;
  }
}
class Deck {
  constructor() {
    this.cards = [];

    for (var i = 2; i < 15; i++) {
      for (var j = 1; j < 5; j++) {
        this.cards.push(new Card(i, j));
      }
    }
    this.shuffle();
  }
  topCard() {
    return this.cards.pop();
  }

  shuffle() {
    for (let i = this.cards.length - 1; i > 0; i--) {
      let randomIndex = Math.floor(Math.random() * (i + 1));
      let tmp = this.cards[i];
      this.cards[i] = this.cards[randomIndex];
      this.cards[randomIndex] = tmp;
    }
  }
}

class Dealer {
  constructor(name) {
    this.name = name;
    this.score = 0;
    this.hand = [];
  }
  showCard(card) {
    let div = "";

    if (this.name == "Dealer") {
      div = document.querySelector(".Dealer");
    } else {
      div = document.querySelector(".Player");
    }
    let img = document.createElement("img");
    img.style.height = 150 + "px";

    if (this.hand.length == 2 && this.name == "Dealer") {
      img.src = "deck/facedawn.jpg";
      img.id = "facedawn";
    } else {
      img.src = "deck/" + card.realValue + card.suit + ".jpg";
    }
    div.appendChild(img);

    console.log(this.hand);
  }
  getOneCard(card) {
    this.score += card.value;
    this.hand.push(card);
    this.showCard(card);
  }
}

class OnePlayerGame {
  constructor() {
    this.deck = new Deck();
    this.dealer = new Dealer("Dealer");
    this.player = new Dealer("Andrii");
    this.dealer.getOneCard(this.deck.topCard());
    this.dealer.getOneCard(this.deck.topCard());

    this.getOneCardForPlayer(this.deck.topCard());
    this.getOneCardForPlayer(this.deck.topCard());
  }

  getOneCardForPlayer(card) {
    this.player.score += card.value;
    this.player.hand.push(card);
    this.player.showCard(card);

    if (this.player.score === 21) {
      dealerscore.innerHTML = this.dealer.score;
      playerscore.innerHTML = this.player.score;
      winner.innerHTML += "<h2>You have 21 you win</h2>";
      buttonMore.onclick = null;
      buttonStop.onclick = null;
      return;
    }
    if (this.player.score >= 21) {
      // alert("you have "+this.player.score);

      this.finishGame();
    }
  }
  finishGame() {
    document.images.namedItem("facedawn").src =
      "deck/" +
      this.dealer.hand[1].realValue +
      this.dealer.hand[1].suit +
      ".jpg";

    if (this.player.score > 21) {
      buttonHit.onclick = null;
      buttonStay.onclick = null;
      // TO DO  player lose, open facedawn card;
      dealerscore.innerHTML = this.dealer.score;
      playerscore.innerHTML = this.player.score;
      winner.innerHTML = "<h2>Player lose</h2>";

      return;
    }

    while (this.dealer.score < 17) {
      this.dealer.getOneCard(this.deck.topCard());
      dealerscore.innerHTML = this.dealer.score;
      playerscore.innerHTML = this.player.score;
    }
    if (
      this.dealer.score > 17 &&
      this.dealer.score <= 21 &&
      this.dealer.score > this.player.score
    ) {
      dealerscore.innerHTML = this.dealer.score;
      playerscore.innerHTML = this.player.score;
      winner.innerHTML = "<h2>Dealer win</h2>";
      buttonStay.onclick = null;
      buttonHit.onclick = null;
      return;
    }
    if (this.player.score == this.dealer.score) {
      dealerscore.innerHTML = this.dealer.score;
      playerscore.innerHTML = this.player.score;
      winner.innerHTML= "<h2>split</h2>";
      buttonStay.onclick = null;
      buttonHit.onclick = null;
      return;
    }
    if (this.player.score > this.dealer.score && this.player.score < 21) {
      dealerscore.innerHTML = this.dealer.score;
      playerscore.innerHTML = this.player.score;
      winner.innerHTML = "<h2>Player win</h2>";
      buttonStay.onclick = null;
      buttonHit.onclick = null;

      
      return;
    }

    if (this.player.score < 21 && this.dealer.score > 21) {
      dealerscore.innerHTML = this.dealer.score;
      playerscore.innerHTML = this.player.score;
      buttonStay.onclick = null;
      buttonHit.onclick = null;
      winner.innerHTML = "<h2>Player win</h2>";
      return;
    } else {
      dealerscore.innerHTML = this.dealer.score;
      playerscore.innerHTML = this.player.score;
      buttonStay.onclick = null;
      buttonHit.onclick = null;
      winner.innerHTML = "<h2>Player lose</h2>";
      return;
    }
  }
}
let onePlayerGame = new OnePlayerGame();
