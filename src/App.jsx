import React, { useState, useEffect } from 'react';
import './App.css';
import mew from "./assets/mewingcat.gif";

function App() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [dragCount, setDragCount] = useState(0);
  const [showImagePopup, setShowImagePopup] = useState(false); 

  useEffect(() => {
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    setPosition({ x: centerX, y: centerY });
  }, []);

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setShowPopup(false); 
    e.preventDefault();
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;

    setPosition({
      x: e.clientX,
      y: e.clientY,
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);

    setDragCount((prevCount) => {
      const newCount = prevCount + 1;
      if (newCount === 5) {
        setShowImagePopup(true);
        setTimeout(() => {
          setShowImagePopup(false); 
        }, 3000);
        setDragCount(0);
      }
      return newCount;
    });

    
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    setPosition({ x: centerX, y: centerY });

    
    const inactivityTimer = setTimeout(() => {
      setShowPopup(true);
    }, 6000);

    return () => clearTimeout(inactivityTimer); 
  };

  return (
    <div
      className="drag-container"
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      {showPopup && (
        <div className="popup">
          <p>Drag the div!</p>
        </div>
      )}

      {showImagePopup && (
        <div className="image-popup">
          <img src={mew} alt="Popup Image" />
        </div>
      )}

      <div
        className="draggable"
        style={{
          position: 'absolute',
          left: position.x,
          top: position.y,
          cursor: 'grab',
          transform: `translate(-50%, -50%)`,
        }}
        onMouseDown={handleMouseDown}
      >
        {"<div></div>"}
      </div>
    </div>
  );
}

export default App;
