'use client';

import { useState } from 'react';
import YoutubeService from '../services/youtube-service.js'

export default function LikeButton() {
  const [likes, setLikes] = useState(0);
  const [results, setResults] = useState("");

  function handleClick() {
    setLikes(likes + 1);
  }

  function search() {
    YoutubeService.test().then(response => {
      setResults(response);
    })
  }

  return (
    <div>
      <button onClick={search}>Like ({likes})</button>
      <div>
        {results}
      </div>
    </div>
  )
}