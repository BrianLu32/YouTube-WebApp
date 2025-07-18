'use client';

import { useState } from 'react';
import YoutubeService from '../services/youtube-service.js'
import SearchYouTubeInfo from "../model/youtube-info.js";

export default function LikeButton() {
  const [results, setResults] = useState<SearchYouTubeInfo[]>([]);

  function search() {
    YoutubeService.test().then((response: SearchYouTubeInfo[]) => {
      setResults(response);
    });
  }

  return (
    <div>
      <button onClick={search}>Like</button>
      <div>
        {results.map((item, index) => (
          <div key={index}>
            <h3>{item.snippet.title}</h3>
            <p>{item.snippet.description}</p>
            <small>Video ID: {item.id.videoId}</small>
            <hr />
          </div>
        ))}
      </div>
    </div>
  )
}