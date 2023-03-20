import React, { useState } from "react";
import "./home.css"

function Home() {
  const [url, setUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

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
        }
      })
      .catch((error) => {
        console.error(error);
        setErrorMessage("An error occurred while creating the short URL.");
      });
  };

  return (
    <div>
      <h1>Link Shortener</h1>
      <form onSubmit={handleSubmit}>
        <label>
          URL:
          <input
            type="text"
            value={url}
            onChange={(event) => setUrl(event.target.value)}
          />
        </label>
        <button type="submit">Create Short URL</button>
      </form>
      {errorMessage && <div className="error">{errorMessage}</div>}
      {shortUrl && (
        <div>
          <strong>Short URL:</strong>{" "}
          <a href={`${process.env.REACT_APP_SERVER_URL}/${shortUrl}`} target="_blank" rel="noreferrer">
          {`${process.env.REACT_APP_SERVER_URL}/${shortUrl}`} 
          </a>
        </div>
      )}
    </div>
  );
}

export default Home;
