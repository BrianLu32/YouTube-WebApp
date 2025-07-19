'use client';

import { useState } from 'react';
import YoutubeService from '../../services/youtube-service.js'
import SearchYouTubeInfo from "../../model/youtube-info.js";
import SearchResults from '../SearchResult/search-result'

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchYouTubeInfo[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function search(query: string) {
    if(!query.trim()) return;
    setLoading(true);
    setError(null);

    try {
      const data = await YoutubeService.SearchYouTube(query);
      setResults(data);
    } catch (err) {
      console.error(err);
      setError("Something went wrong while fetching search results.");
    } finally {
      setLoading(false);
    }
  }

  function searchOnEnter(e: React.KeyboardEvent<HTMLInputElement>) {
    if(e.key === 'Enter') {
      search(query);
    }
  }

  return (
    <div>
      <input 
        className="searchbar-input" 
        type="text" 
        placeholder="Search" 
        onChange={event => setQuery(event.target.value)} 
        onKeyDown={searchOnEnter}>
      </input>

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      <SearchResults results={results} />
    </div>
  )
}