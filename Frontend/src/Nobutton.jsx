import React, { useState } from 'react';

const NoButton = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  
  const moveButton = () => {
    const movementRange = 200;
    setPosition({
      x: Math.random() * movementRange - movementRange / 2,
      y: Math.random() * movementRange - movementRange / 2
    });
  };

  return (
    <button
      onMouseOver={moveButton}
      onTouchStart={(e) => {
        e.preventDefault(); // Prevent default touch behavior
        moveButton();
      }}
      style={{
        transform: `translate(${position.x}px, ${position.y}px)`,
        transition: 'transform 0.2s ease'
      }}
      className="bg-red-500 hover:bg-red-600 text-white text-lg px-4 py-2 rounded-full"
    >
      No🤔
    </button>
  );
};

export default NoButton;