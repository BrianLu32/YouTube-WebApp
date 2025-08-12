export type Statistics = {
  viewCount: string;
  likeCount: string;
  favoriteCount: string;
  commentCount: string;
}

class VideoInfo {
  id: string;
  statistics: Statistics;

  constructor(props: VideoInfo) {
    this.id = props.id;
    this.statistics = props.statistics;
  }
}

export default VideoInfo;