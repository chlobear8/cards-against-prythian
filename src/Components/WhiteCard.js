import React from 'react';

export default function WhiteCard({ text, onClick, buttonText }) {
  return (
    <div className="white-card">
      <p>{text}</p>
      <button onClick={onClick}>{buttonText}</button>
    </div>
  );
};
