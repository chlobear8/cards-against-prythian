import React, { useState } from 'react';
import BlackCard from './Components/BlackCard';
import WhiteCard from './Components/WhiteCard';
import Player from './Player';
import whiteCardDeck from './Deck/WhiteCardDeck';
import blackCardDeck from './Deck/BlackCardDeck';

export default function App() {
  const [round, setRound] = useState(1);
  const [deck, setDeck] = useState(whiteCardDeck);
  const [currentBlackCard, setCurrentBlackCard] = useState({ text: "" });
  const [players, setPlayers] = useState([
    new Player(''),
    new Player(''),
    new Player(''),
    new Player(''),
    new Player('')
  ]);
  const [selectedCards, setSelectedCards] = useState([
    [],
    [],
    [],
    [],
    []
  ]);
  const [playedWhiteCards, setPlayedWhiteCards] = useState([]);

  const handleNameChange = (e, index) => {
    const newPlayers = [...players];
    newPlayers[index].name = e.target.value;
    setPlayers(newPlayers);
  };

  const drawWhiteCard = (playerIndex) => {
    const updatedPlayers = [...players];
    updatedPlayers[playerIndex].drawWhiteCard(deck);
    setPlayers(updatedPlayers);
    setDeck([...deck]);
  };

  const toggleCardSelection = (playerIndex, cardIndex) => {
    const updatedSelectedCards = [...selectedCards];
    const selectedCardsForPlayer = updatedSelectedCards[playerIndex];
    const indexOfCard = selectedCardsForPlayer.indexOf(cardIndex);
  
    if (indexOfCard === -1) {
      selectedCardsForPlayer.push(cardIndex);
    } else {
      selectedCardsForPlayer.splice(indexOfCard, 1);
    }
    setSelectedCards(updatedSelectedCards);
  };

  const playWhiteCard = (playerIndex) => {
    const cardsToPlay = selectedCards[playerIndex].map(cardIndex => players[playerIndex].hand[cardIndex]);
    const updatedPlayers = [...players];
    updatedPlayers[playerIndex].hand = updatedPlayers[playerIndex].hand.filter((_, index) => !selectedCards[playerIndex].includes(index));
    setPlayedWhiteCards(prevCards => [...prevCards, ...cardsToPlay]);
    setPlayers(updatedPlayers);
    setSelectedCards(new Array(players.length).fill([]));
  };

  const resetPlayerHands = () => {
    const resetPlayers = players.map(player => {
      player.hand = [];
      return player;
    });
    setPlayers(resetPlayers);
  };

  const drawNewBlackCard = () => {
    const randomIndex = Math.floor(Math.random() * blackCardDeck.length);
    const drawnCard = blackCardDeck.splice(randomIndex, 1)[0];
    setCurrentBlackCard(drawnCard);
  };

  const selectWinner = (playerIndex) => {
    const updatedPlayers = [...players];
    updatedPlayers[playerIndex].score += 1;
    setPlayers(updatedPlayers);
  }

  const handleNextRound = () => {
    resetRoundData();
    drawNewBlackCard();
    setRound(round + 1);
  };

  const resetRoundData = () => {
    resetPlayerHands();
    setPlayedWhiteCards([]);
  };

  return (
    <div className="App">
      <BlackCard text={currentBlackCard.text} />
      
      {players.map((player, index) => (
        <div key={index}>
          <input 
              type="text"
              value={player.name}
              onChange={(event) => handleNameChange(event, index)}
              placeholder={`Player ${index + 1} Name`}
          />
          <div className="hand">
            {player.hand && player.hand.map((card, cardIndex) => (
              <div key={cardIndex}>
                <WhiteCard 
                  key={cardIndex} 
                  text={card}
                  selectWinner={() => selectWinner(index)}
                  selected={selectedCards[index] && selectedCards[index].includes(cardIndex)} 
                  onClick={() => toggleCardSelection(index, cardIndex)} 
                /> 
              </div>
            ))}
          </div>
          <button onClick={() => playWhiteCard(index)}>Play Selected Cards</button>
          <button onClick={() => drawWhiteCard(index)}>Draw White Card</button>
        </div>
      ))}
      
      <div className="play-area">
        {playedWhiteCards.map((card, index) => (
          <div key={index}>
            <h3>{players[index].name}'s Response</h3>
            <WhiteCard text={card} />
          </div>
        ))}
      </div>
      
      <div className="scoreboard">
        {players.map((player, index) => (
          <div key={index}>
            <h3>{player.name}</h3>
            <p>Score: {player.score}</p>
          </div>
        ))}
      </div>
      
      <button onClick={handleNextRound}>Next Round</button>
    </div>
  );
}
