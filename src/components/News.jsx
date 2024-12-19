import React, { useState, useEffect } from 'react';
import { useSwipeable } from 'react-swipeable';
import { FaRegBookmark, FaBookmark } from 'react-icons/fa';

function News() {
  const [articles, setArticles] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [bookmarked, setBookmarked] = useState([]);

  // Load bookmarks from local storage on component mount
  useEffect(() => {
    const storedBookmarks = JSON.parse(localStorage.getItem('bookmarked')) || [];
    setBookmarked(storedBookmarks);
  }, []);

  // Fetch news articles when page changes
  useEffect(() => {
    setLoading(true);
    fetch(
      `https://newsapi.org/v2/top-headlines?country=us&page=${page}&pageSize=20&apiKey=cf1ecb530f92408baa1e5a57dfc0e523`
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        if (data.status === 'ok') {
          setArticles(data.articles);
          setCurrentIndex(0); // Reset index when page changes
        } else {
          setError('Failed to fetch news');
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching news:', error);
        setError('An error occurred while fetching the news');
        setLoading(false);
      });
  }, [page]);

  // Swipe handlers for article navigation
  const handlers = useSwipeable({
    onSwipedUp: () =>
      setCurrentIndex((prevIndex) =>
        Math.min(prevIndex + 1, articles.length - 1)
      ),
    onSwipedDown: () =>
      setCurrentIndex((prevIndex) => Math.max(prevIndex - 1, 0)),
    preventDefaultTouchmoveEvent: true,
    trackMouse: true,
  });

  // Toggle bookmark for an article
  const toggleBookmark = (article) => {
    const isBookmarked = bookmarked.some((item) => item.url === article.url); // Check if the article is already bookmarked
    let updatedBookmarks;

    if (isBookmarked) {
      // Remove bookmark if already bookmarked
      updatedBookmarks = bookmarked.filter((item) => item.url !== article.url);
    } else {
      // Add article to bookmarks
      updatedBookmarks = [...bookmarked, article];
    }

    // Update state and local storage
    setBookmarked(updatedBookmarks);
    localStorage.setItem('bookmarked', JSON.stringify(updatedBookmarks));
  };

  if (loading) {
    return (
      <main className="news-container">
        <h2>Loading news...</h2>
      </main>
    );
  }

  if (error) {
    return (
      <main className="news-container">
        <h2>{error}</h2>
      </main>
    );
  }

  const currentArticle = articles[currentIndex];
  const isBookmarked = bookmarked.some(
    (item) => item.url === currentArticle.url
  );

  return (
    <main {...handlers} className="news-container">
      <h2>Latest News</h2>
      {articles.length > 0 ? (
        <section className="news-article">
          <h3>{currentArticle.title}</h3>
          <img
            src={currentArticle.urlToImage}
            alt={currentArticle.title}
            className="news-image"
          />
          <p>{currentArticle.description}</p>
          <a
            href={currentArticle.url}
            target="_blank"
            rel="noopener noreferrer"
            className="news-link"
          >
            Read more
          </a>

          {/* Bookmark Icon */}
          <button
            onClick={() => toggleBookmark(currentArticle)}
            className="bookmark-button"
          >
            {isBookmarked ? <FaBookmark /> : <FaRegBookmark />}
          </button>
        </section>
      ) : (
        <p>No news available</p>
      )}
      <div className="pagination-info">
        Article {currentIndex + 1} of {articles.length}
      </div>
      <div className="pagination-controls">
        <button
          onClick={() => setCurrentIndex((prev) => Math.max(prev - 1, 0))}
          disabled={currentIndex === 0}
          className="prev-article-button"
        >
          Previous Article
        </button>
        <button
          onClick={() =>
            setCurrentIndex((prev) => Math.min(prev + 1, articles.length - 1))
          }
          disabled={currentIndex === articles.length - 1}
          className="next-article-button"
        >
          Next Article
        </button>
      </div>
      <div className="page-controls">
        <button
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={page === 1}
          className="prev-page-button"
        >
          Previous Page
        </button>
        <button
          onClick={() => setPage((prev) => prev + 1)}
          className="next-page-button"
        >
          Next Page
        </button>
      </div>
    </main>
  );
}

export default News;
