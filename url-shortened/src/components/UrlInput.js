import React, { useState } from 'react';
import UrlDisplay from './UrlDisplay';

const UrlInput = () => {
  const [url, setUrl] = useState('');
  const [error, setError] = useState(null);
  const [shortUrl, setShortUrl] = useState('');
  const [custom, setCustom] = useState('');
  const [validityPeriod, setValidityPeriod] = useState('');

  const handleInputChange = (event) => {
    setUrl(event.target.value);
  };

  const handleCustomChange = (event) => {
    setCustom(event.target.value);
  };

  const handleValidityPeriodChange = (event) => {
    setValidityPeriod(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!url.match(/^https?:\/\/[^\s]+$/)) {
      setError('Invalid URL');
      return;
    }
    let shortenedUrl;
    if (custom) {
      shortenedUrl = `http://${custom}.com`;
    } else {
      shortenedUrl = `https://shorturl.com/${Math.floor(Math.random() * 1000000)}`;
    }
    setShortUrl(shortenedUrl);
  };

  return (
    <div className="url-input-container">
      <h1>URL Shortener</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Enter URL:</label>
          <input
            type="text"
            value={url}
            onChange={handleInputChange}
            placeholder="Enter URL"
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label>Custom Short URL:</label>
          <input
            type="text"
            value={custom}
            onChange={handleCustomChange}
            placeholder="Enter Custom Short URL"
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label>Validity Period (in minutes):</label>
          <input
            type="number"
            value={validityPeriod}
            onChange={handleValidityPeriodChange}
            placeholder="Choose the validity time in minutes for Short URL"
            className="form-control"
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Shorten URL
        </button>
        {error && <div className="alert alert-danger">{error}</div>}
        {shortUrl && (
          <div className="alert alert-success">
            <UrlDisplay url={shortUrl} originalUrl={url} />
          </div>
        )}
      </form>
    </div>
  );
};

export default UrlInput;