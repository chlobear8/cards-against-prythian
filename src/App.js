import React from 'react';
import BlackCard from './Components/BlackCard';
import WhiteCard from './Components/WhiteCard';

export default function App() {
  return (
    <div className="App">
      <BlackCard text="Fill in the blank: ___ is the best way to relax." />
      <WhiteCard text="Taking a long walk" />
      <WhiteCard text="Reading a good book" />
    </div>
  );
};


