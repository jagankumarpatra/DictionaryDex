import loaderGif from "./gif2.gif"; // Replace with the actual path to your loader GIF
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './loader.css'; // Import the CSS file

const Loader = () => {
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(10);

  useEffect(() => {
    const redirectTimeout = setTimeout(() => {
      navigate('/'); // Replace '/home' with the actual route of your home component
    }, 10000);

    return () => {
      clearTimeout(redirectTimeout);
    };
  }, [navigate]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown(prevCountdown => prevCountdown - 1);
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <div className="load">
      <img src={loaderGif} alt="Loader" />
      {/* <div className="loading">
        <span></span>
        <span></span>
        <span></span>
      </div> */}
      <div className="countdown">
        Loading in {countdown} seconds
      </div>
    </div>
  );
};

export default Loader;
