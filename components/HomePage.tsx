// HomePage.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { SignInButton } from "@clerk/clerk-react";

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="home-page">
      <div className="container">
        <h1>Welcome to Car Customizer</h1>
        <p>Customize your dream car with our intuitive editor.</p>
        <SignInButton mode="redirect">
          <button className="sign-in-btn">Sign In to Get Started</button>
        </SignInButton>
      </div>
    </div>
  );
};

export default HomePage;
