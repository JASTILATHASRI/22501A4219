import React from 'react';

const UrlDisplay = ({ url, originalUrl }) => {
  return (
    <div>
      <h2>Shortened URL:</h2>
      <p>
        <a href={originalUrl} target="_blank" rel="noopener noreferrer">
          {url}
        </a>
      </p>
    </div>
  );
};

export default UrlDisplay;