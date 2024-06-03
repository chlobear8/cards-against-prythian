import React from 'react';

export default function WhiteCard({ text, selectWinner, onClick, selected }) {
  return (
    <div className={`white-card ${selected ? 'selected' : ''}`} onClick={onClick}>
      <p>{text}</p>
      <button onClick={(e) => { e.stopPropagation(); selectWinner(); }}>Select as the Winner</button>
    </div>
  );
};
