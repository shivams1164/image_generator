import React from 'react';
import './HomePage.css';
import Navbar from '../Navbar/Navbar';

const HomePage = () => {
    return (
        <div>
            <Navbar page="home" />
            <div className="homepage-container">
                <div className="homepage-header">
                    <h1>Welcome to Our Application</h1>
                </div>
                <div className="homepage-content">
                    <p>Discover a wide range of features and functionalities designed to enhance your experience.</p>
                    <div className="homepage-buttons">
                        <button onClick={() => window.location.href = '/image-generator'}>Generate Images</button>
                        <button onClick={() => window.location.href = '/history'}>View History</button>
                    </div>
                </div>
                <div className="homepage-footer">
                    &copy; 2024 Your Company. All rights reserved.
                </div>
            </div>
        </div>
    );
};

export default HomePage;
