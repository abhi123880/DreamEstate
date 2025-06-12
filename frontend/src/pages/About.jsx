import React from 'react';
import '../styles/About.css';

const About = () => {
  return (
    <div className="about-container">
      <div className="about-wrapper">
        <h1 className="about-title">About DreamEstate</h1>

        <p className="about-text">
          At DreamEstate, we are committed to helping individuals and families find their perfect home.
          Whether you're buying, selling, or renting, our mission is to simplify the real estate journey.
        </p>

        <div className="about-section">
          <div className="about-mission">
            <h2 className="about-subtitle">Our Mission</h2>
            <p>
              We aim to provide a seamless and stress-free experience for our clients by combining expert advice
              with the latest property technology. Our professional agents work closely with clients to understand
              their needs and offer properties that truly fit their lifestyle.
            </p>
            <h2 className="about-subtitle">Why Choose Us?</h2>
            <ul className="about-list">
             <li>Wide range of premium properties across various locations</li>
             <li>Experienced and certified real estate agents</li>
             <li>Transparent pricing and honest communication</li>
             <li>Excellent customer support and after-sale service</li>
            </ul>
          </div>
          

          <img
            src={require("../images/04.jpg")} 
            alt="Our Team"
            className="about-image"
          />
        </div>
      </div>
    </div>
  );
};

export default About;
