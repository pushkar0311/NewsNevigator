import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './components/Home';
import News from './components/News';
import About from './components/About';
import Bookmarked from './components/BookmarksPage'; // Import the Bookmarked component
import "./styles/App.scss"
import "./styles/Header.scss"
import "./styles/Home.scss"
import "./styles/About.scss"
import "./styles/News.css"
import "./styles/bookmark.scss"

function App() {
  return (
    <Router>
      <div>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/news" element={<News />} />
          <Route path="/about" element={<About />} />
          <Route path="/bookmarked" element={<Bookmarked />} /> {/* Add route */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
