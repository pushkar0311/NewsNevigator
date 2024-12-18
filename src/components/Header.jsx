import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function Header() {
  const [scrolling, setScrolling] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolling(true);
      } else {
        setScrolling(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`header ${scrolling ? 'scrolled' : ''}`}>
      <h1 className="header-title">News App</h1>
      <nav className="header-nav">
        <Link to="/">Home</Link>
        <Link to="/news">News</Link>
        <Link to="/about">About</Link>
      </nav>
    </header>
  );
}

export default Header;
