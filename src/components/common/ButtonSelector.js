import React, { useEffect, useState } from 'react';
import '../../styles/buttonSelector.css';

const ButtonSelector = ({selected, setSelected}) => {

  const buttons = ['Classic', 'L Classico', 'R Classico', 'Modern'];

  return (
    <div className="selector-container">
      {buttons.map((label, index) => (
        <button
          key={label}
          className={`selector-button ${selected === label ? 'selected' : ''}`}
          onClick={() => {setSelected(label)}}
        >
          {label}
        </button>
      ))}
    </div>
  );
};

export default ButtonSelector;