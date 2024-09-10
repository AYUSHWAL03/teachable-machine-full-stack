import React from 'react';
import './Navbar.css'; // Import CSS file for styling

export function Navbar() {
    return (
        <div className="navbar">
            <a href="#trainModelData">Train Model</a>
            <a href="#preprocessData">Preprocess Data</a>
            <a href="#uploadData">Upload Data</a>
            <a href="#about">About</a>
            <a href="#home">Home</a>
        </div>
    );
}

