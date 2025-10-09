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

export type ChannelInfo = {
  title: string;
  description: string;
  customUrl: string;
  publishedAt: string;
  thumbnails: YouTubeThumbnailsRes;
}

class Channel {
  id: string;
  channelInfo: ChannelInfo;

  constructor(props: any) {
    this.id = props.id;
    this.channelInfo = props.snippet;
  }
}

export default Channel;