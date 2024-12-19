import React, { useState, useEffect } from 'react';

function Bookmarked() {
  const [bookmarkedArticles, setBookmarkedArticles] = useState([]);

  // Load bookmarks from localStorage on mount
  useEffect(() => {
    const storedBookmarks = JSON.parse(localStorage.getItem('bookmarked')) || [];
    setBookmarkedArticles(storedBookmarks);
  }, []);

  // Function to remove a bookmarked article
  const removeBookmark = (articleUrl) => {
    const updatedBookmarks = bookmarkedArticles.filter(
      (article) => article.url !== articleUrl
    );
    // Update state
    setBookmarkedArticles(updatedBookmarks);
    // Update localStorage
    localStorage.setItem('bookmarked', JSON.stringify(updatedBookmarks));
  };

  return (
    <main className="bookmarked-container">
      <h2>Bookmarked Articles</h2>
      {bookmarkedArticles.length > 0 ? (
        <section>
          {bookmarkedArticles.map((article, index) => (
            <div key={index} className="bookmarked-article">
              <h3>{article.title}</h3>
              <img
                src={article.urlToImage}
                alt={article.title}
                className="news-image"
              />
              <p>{article.description}</p>
              <a
                href={article.url}
                target="_blank"
                rel="noopener noreferrer"
                className="news-link"
              >
                Read more
              </a>
              {/* Remove Bookmark Button */}
              <button
                onClick={() => removeBookmark(article.url)}
                className="remove-bookmark-button"
              >
                Remove Bookmark
              </button>
            </div>
          ))}
        </section>
      ) : (
        <p>No bookmarked articles</p>
      )}
    </main>
  );
}

export default Bookmarked;
