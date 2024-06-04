import React from 'react';

export default function WhiteCard({ text, onClick, buttonText }) {
  return (
    <div className="white-card" onClick={onClick}>
      <p>{text}</p>
      <button>{buttonText}</button>
    </div>
  );
};
