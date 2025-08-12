import VideoInfo from "./video-info";

type YouTubeId = {
  kind: string;
  videoId: string;
};

type YouTubeThumbnail = {
  url: string;
  width: number;
  height: number;
}

type YouTubeThumbnailsRes = {
  default: YouTubeThumbnail;
  medium: YouTubeThumbnail;
  high: YouTubeThumbnail;
}

type YouTubeSnippet = {
  publishedAt: string;
  channelId: string;
  title: string;
  description: string;
  thumbnails: YouTubeThumbnailsRes;
  channelTitle: string;
  liveBroadcastContent: string;
  publishTime: string;
};

class SearchYouTubeInfo {
  kind: string;
  etag: string;
  id: YouTubeId;
  snippet: YouTubeSnippet;
  statistics: VideoInfo;

  constructor(props: SearchYouTubeInfo) {
    this.kind = props.kind;
    this.etag = props.etag;
    this.id = props.id;
    this.snippet = props.snippet;
    this.statistics = props.statistics;
  }
}

export default SearchYouTubeInfo;
