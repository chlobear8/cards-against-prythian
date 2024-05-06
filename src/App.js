import React from 'react';
import BlackCard from './Components/BlackCard';
import WhiteCard from './Components/WhiteCard';
import blackCardOptions from './Deck/BlackCardDeck';

export default function App() {
  const randomBlackCard = blackCardOptions[Math.floor(Math.random() * blackCardOptions.length)];
  return (
    <div className="App">
      <BlackCard text={randomBlackCard.text} />
      <WhiteCard text="Taking a long walk" />
      <WhiteCard text="Reading a good book" />
    </div>
  );
};


