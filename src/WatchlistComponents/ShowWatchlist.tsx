import { useEffect, useState } from "react";
import VideoItem from "../VideoComponents/VideoItem";
import { getWatchList, toggleWatchlist } from "./WatchlistOperations";
import "./ShowWatchlist.css";

type Video = {
  id: number;
  title: string;
  fileName: string;
  thumbnailPath: string;
};

function ShowWatchlist() {
  const [videos, setVideos] = useState<Video[]>([]);

  useEffect(() => {
    getWatchList().then((data) => {
      setVideos(data);
    });
  }, []);

  const handleToggle1 = async (id: number) => {
    // ✅ update UI instantly
    setVideos((prev) => prev.filter((v) => v.id !== id));

    // and then API call
    await toggleWatchlist(id);
  };

  return (
    <div className="watchlist-container">
      <h2>Watchlist</h2>

      <div className="grid">
        {videos.map((video) => (
          <VideoItem
            key={video.id}
            video={video}
            mode="card"
            isInWatchlist={true}
            onToggle={handleToggle1}
          />
        ))}
      </div>
    </div>
  );
}

export default ShowWatchlist;
