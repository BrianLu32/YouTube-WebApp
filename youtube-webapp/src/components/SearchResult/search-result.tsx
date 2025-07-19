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
          <h3>{item.snippet.title}</h3>
          <p>{item.snippet.description}</p>
          <small>Video ID: {item.id.videoId}</small>
          <hr />
        </div>
      ))}
    </div>
  );
}
