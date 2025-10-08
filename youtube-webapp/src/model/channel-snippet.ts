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

export type ChannelSnippet = {
  title: string;
  description: string;
  customUrl: string;
  publishedAt: string;
  thumbnails: YouTubeThumbnailsRes;
}

class ChannelInfo {
  id: string;
  snippet: ChannelSnippet;

  constructor(props: ChannelInfo) {
    this.id = props.id;
    this.snippet = props.snippet;
  }
}

export default ChannelInfo;