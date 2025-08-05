'use client';

import { useState } from 'react';
import YoutubeService from '../../services/youtube-service.js'
import SearchYouTubeInfo from '../../model/youtube-info';
import SearchResults from '../SearchResult/search-result'
import VideoInfo from '../../model/video-info';

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
      const youtubeSearchResults: SearchYouTubeInfo[] = await YoutubeService.SearchYouTube(query);

      const videoIds: string = youtubeSearchResults.map((item: SearchYouTubeInfo) => item.id.videoId).join(",");
      const videoDetails: VideoInfo[] = await YoutubeService.GetVideoInfo(videoIds);
      const finalResult: SearchYouTubeInfo[] = youtubeSearchResults.map((searchSnippet: SearchYouTubeInfo) => {
        const stats = videoDetails.find((video: VideoInfo) => video.id === searchSnippet.id.videoId);
        return new SearchYouTubeInfo({
          ...searchSnippet,
          statistics: stats
        });
      });

      setResults(finalResult);
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