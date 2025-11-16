import VideoStats from "./video-info";
import Channel from "./channel-snippet"

type VideoId = {
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

type VideoInfo = {
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
  videoIdInfo: VideoId;
  videoInfo: VideoInfo;
  statistics: VideoStats;
  channel: Channel;

  constructor(props: any) {
    this.kind = props.kind;
    this.etag = props.etag;

    // Handles the API call and the search results conversion
    this.videoIdInfo = props.videoIdInfo ?? props.id;
    this.videoInfo = props.videoInfo ?? props.snippet;

    this.statistics = props.statistics;
    this.channel = props.channel;
  }
}

export default SearchYouTubeInfo;
