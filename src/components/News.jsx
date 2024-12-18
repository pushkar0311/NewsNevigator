import React, { useState, useEffect } from 'react';
import { useSwipeable } from 'react-swipeable';

function News() {
  const [articles, setArticles] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1); // Track the current page

  useEffect(() => {
    setLoading(true); // Set loading to true when fetching data
    fetch(`https://newsapi.org/v2/top-headlines?country=us&page=${page}&pageSize=20&apiKey=cf1ecb530f92408baa1e5a57dfc0e523`) 
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        if (data.status === 'ok') {
          setArticles(data.articles);
        } else {
          setError('Failed to fetch news');
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching news:", error);
        setError('An error occurred while fetching the news');
        setLoading(false);
      });
  }, [page]); // Re-run when the page changes

  // Swipeable handlers
  const handlers = useSwipeable({
    onSwipedUp: () => setCurrentIndex((prevIndex) => Math.min(prevIndex + 1, articles.length - 1)),
    onSwipedDown: () => setCurrentIndex((prevIndex) => Math.max(prevIndex - 1, 0)),
    preventDefaultTouchmoveEvent: true,
    trackMouse: true,
  });

  const goToNextArticle = () => {
    if (currentIndex < articles.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const goToPreviousArticle = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const loadNextPage = () => {
    setPage(page + 1);
  };

  const loadPreviousPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  if (loading) {
    return (
      <main>
        <h2>Loading news...</h2>
      </main>
    );
  }

  if (error) {
    return (
      <main>
        <h2>{error}</h2>
      </main>
    );
  }

  const currentArticle = articles[currentIndex];

  return (
    <main {...handlers} style={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', padding: '20px', backgroundColor: '#f4f4f9' }}>
      <h2>Latest News</h2>
      {articles.length > 0 ? (
        <section style={{ textAlign: 'center', width: '100%', maxWidth: '600px', border: '1px solid #ddd', borderRadius: '8px', padding: '10px', backgroundColor: '#fff' }}>
          <h3>{currentArticle.title}</h3>
          <img
            src={currentArticle.urlToImage}
            alt={currentArticle.title}
            style={{ maxWidth: '100%', maxHeight: '300px', objectFit: 'cover', borderRadius: '5px' }}
          />
          <p>{currentArticle.description}</p>
          <a href={currentArticle.url} target="_blank" rel="noopener noreferrer" style={{ color: '#0066cc' }}>
            Read more
          </a>
        </section>
      ) : (
        <p>No news available</p>
      )}
      <div style={{ marginTop: '20px', fontSize: '16px', color: '#666' }}>
        {currentIndex + 1} / {articles.length}
      </div>

      {}
      <button
        onClick={goToPreviousArticle}
        style={{
          marginTop: '20px',
          padding: '10px 20px',
          backgroundColor: '#0066cc',
          color: '#fff',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
          fontSize: '16px',
        }}
        disabled={currentIndex === 0} 
      >
        Previous Article
      </button>

      {}
      <button
        onClick={goToNextArticle}
        style={{
          marginTop: '10px',
          padding: '10px 20px',
          backgroundColor: '#0066cc',
          color: '#fff',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
          fontSize: '16px',
        }}
        disabled={currentIndex === articles.length - 1} 
      >
        Next Article
      </button>

      {}
      <div style={{ marginTop: '20px' }}>
        <button
          onClick={loadPreviousPage}
          style={{
            marginRight: '10px',
            padding: '10px 20px',
            backgroundColor: '#0066cc',
            color: '#fff',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            fontSize: '16px',
          }}
          disabled={page === 1} 
        >
          Previous Page
        </button>
        <button
          onClick={loadNextPage}
          style={{
            padding: '10px 20px',
            backgroundColor: '#0066cc',
            color: '#fff',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            fontSize: '16px',
          }}
        >
          Next Page
        </button>
      </div>
    </main>
  );
}

export default News;
