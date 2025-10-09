export type Statistics = {
  viewCount: string;
  likeCount: string;
  favoriteCount: string;
  commentCount: string;
}

class VideoStats {
  id: string;
  // statistics: Statistics;
  viewCount: string;
  likeCount: string;
  favoriteCount: string;
  commentCount: string;

  constructor(props: any) {
    this.id = props.id;
    // Handles the API call where the actual stats are within 'statistics'
    // Prevents nested references such as video.statistics.statistics from SearchYouTubeInfo
    const stats = props.statistics ?? {};
    this.viewCount = stats.viewCount ?? "0";
    this.likeCount = stats.likeCount ?? "0";
    this.favoriteCount = stats.favoriteCount ?? "0";
    this.commentCount = stats.commentCount ?? "0";
  }
}

export default VideoStats;