import SearchYouTubeInfo from "../../model/youtube-info.js";

type Props = {
  results: SearchYouTubeInfo[];
};

export default function SearchResults({ results }: Props) {
  if (results.length === 0) return;

  return (
    <div>
      {results.map((item, index) => (
        <div key={index}>
          <img src={item.snippet.thumbnails.default.url} alt="" />
          <h3>{item.snippet.title}</h3>
          <p>{item.snippet.description}</p>
          <small>Likes: {item.statistics?.statistics.likeCount} Views: {item.statistics?.statistics.viewCount}</small>
          <hr />
        </div>
      ))}
    </div>
  );
}
