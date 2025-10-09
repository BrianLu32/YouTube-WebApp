'use client';

import { useState } from 'react';
import YoutubeService from '../../services/youtube-service'
import SearchYouTubeInfo from '../../model/youtube-info';
import SearchResults from '../SearchResult/search-result'
import VideoStats from '../../model/video-info';
import Channel from '../../model/channel-snippet';
import { ChannelInfo } from '../../model/channel-snippet';

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

      const videoIds: string = youtubeSearchResults.map((item: SearchYouTubeInfo) => item.videoIdInfo.videoId).join(",");
      const channelIds: string = youtubeSearchResults.map((item:SearchYouTubeInfo) => item.videoInfo.channelId).join(",");

      const videoDetails: VideoStats[] = await YoutubeService.GetVideoInfo(videoIds);
      const videoDetailsMap: Record<string, VideoStats> = {};
      videoDetails.forEach(VideoStats => {
        videoDetailsMap[VideoStats.id] = VideoStats;
      })

      const videoChannelSnippets: Channel[] = await YoutubeService.GetChannel(channelIds);
      const videoChannelSnippetMap: Record<string, Channel> = {};
      videoChannelSnippets.forEach(Channel => {
        videoChannelSnippetMap[Channel.id] = Channel;
      })

      const finalResult: SearchYouTubeInfo[] = youtubeSearchResults.map((searchSnippet: SearchYouTubeInfo) => {
        return new SearchYouTubeInfo({
          ...searchSnippet,
          statistics: videoDetailsMap[searchSnippet.videoIdInfo.videoId],
          channel: videoChannelSnippetMap[searchSnippet.videoInfo.channelId]
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

      {(results && results.length > 0) ? (
        <SearchResults results={results} />
      ) : (
        <p>No Results Found</p>
      )}
    </div>
  )
}