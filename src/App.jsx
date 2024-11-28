import React, { useState, useEffect } from 'react';
import './App.css';
import mew from "./assets/mewingcat.gif";

function App() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [dragCount, setDragCount] = useState(0); // Track drag count
  const [showImagePopup, setShowImagePopup] = useState(false); // Track image popup visibility

  useEffect(() => {
    // Set initial position to the center of the page
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    setPosition({ x: centerX, y: centerY });
  }, []);

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setShowPopup(false); // Dismiss text popup when user interacts
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

    // Increment drag count
    setDragCount((prevCount) => {
      const newCount = prevCount + 1;
      if (newCount === 5) {
        // Show the image popup after 5 drags
        setShowImagePopup(true);
        setTimeout(() => {
          setShowImagePopup(false); // Fade out after 3 seconds
        }, 3000);
        setDragCount(0);
      }
      return newCount;
    });

    // Reset position to center after drag ends
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    setPosition({ x: centerX, y: centerY });

    // Restart inactivity timer
    const inactivityTimer = setTimeout(() => {
      setShowPopup(true);
    }, 6000);

    return () => clearTimeout(inactivityTimer); // Clear timer on unmount or activity
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
