import React, { useState } from "react";
import "./home.css"

function Home() {
  const [url, setUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [copied, setCopied] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    fetch(`${process.env.REACT_APP_SERVER_URL}/create/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        url: url,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          setErrorMessage(data.error);
        } else {
          setShortUrl(data.short_url);
          setCopied(false); // reset copied state
        }
      })
      .catch((error) => {
        console.error(error);
        setErrorMessage("An error occurred while creating the short URL.");
      });
  };

  const handleCopyClick = () => {
    navigator.clipboard.writeText(`${process.env.REACT_APP_SERVER_URL}/${shortUrl}`);
    setCopied(true);
  };


  return (
    <div className="container">
      <h1>Link Shortener-SYLN</h1>
      <form onSubmit={handleSubmit}>
        <label className="form-label">
          URL:
          <input
            className="form-input"
            type="text"
            value={url}
            onChange={(event) => setUrl(event.target.value)}
          />
        </label>
        <button type="submit">Create Short URL</button>
      </form>
      {errorMessage && <div className="error-message">{errorMessage}</div>}
      {shortUrl && (
        <div className="short-url-container">
          <label className="short-url-label">Short URL:</label>{" "}
          <a
            className="short-url-link"
            href={`${process.env.REACT_APP_SERVER_URL}/${shortUrl}`}
            target="_blank" rel="noreferrer">
          {`${process.env.REACT_APP_SERVER_URL}/${shortUrl}`} 
          </a>
        </div>
      )}
      <div>
        {shortUrl && (
          <button className="copy-button" onClick={handleCopyClick}>
            {copied ? "Copied!" : "Copy"}
          </button>
        )}
      </div>
      <p className="footer"><b>&copy; 2023 Arnab. All Rights Reserved.</b></p>
    </div>
  );
}

export default Home;
