class Player {
  constructor(name) {
    this.name = name;
    this.hand = [];
    this.score = 0;
  }

  drawWhiteCard(deck) {
    // Draw a random white card from the deck and add it to the player's hand
    const randomIndex = Math.floor(Math.random() * deck.length);
    const drawnCard = deck.splice(randomIndex, 1)[0]; // Remove the drawn card from the deck
    this.hand.push(drawnCard);
  }

  playWhiteCard(index) {
    // Play the white card at the specified index from the player's hand
    const card = this.hand.splice(index, 1)[0]; // Remove the card from the player's hand
    return card; // Return the played card
  }
}

export default Player;
