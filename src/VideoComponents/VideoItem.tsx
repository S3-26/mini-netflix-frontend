import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

type Video = {
  id: number;
  title: string;
  fileName: string;
  thumbnailPath: string;
};

type Props = {
  video: Video;
  mode?: "card" | "player";
  isInWatchlist?: boolean;
  onToggle?: (videoId: number) => void;
};

const BASE_URL = "http://localhost:8080";

function VideoItem({ video, mode = "card", isInWatchlist, onToggle }: Props) {
  const navigate = useNavigate();
  const lastSavedRef = useRef(0);
  const videoRef = useRef<HTMLVideoElement>(null);

  const videoUrl = `${BASE_URL}/api/videos/${video.fileName}`;

  // ⏯ Resume playback
  useEffect(() => {
    if (!video) return;

    fetch(`${BASE_URL}/api/watch/progress?fileName=${video.fileName}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then((time) => {
        if (videoRef.current && time > 0) {
          videoRef.current.currentTime = time;
        }
      });
  }, [video, localStorage.getItem("token")]);

  const handlePlay = () => {
    if (videoRef.current) {
      videoRef.current.requestFullscreen();
    }
  };

  // 🎬 PLAYER MODE
  if (mode === "player") {
    console.log("VIDEO URL:", videoUrl);

    return (
      <video
        ref={videoRef}
        preload="auto"
        className="video-player"
        src={videoUrl}
        controls
        onPlay={handlePlay}
        autoPlay
        onLoadedMetadata={() => {
          // 🔥 Ensures metadata loaded before seeking
          fetch(`${BASE_URL}/api/watch/progress?fileName=${video.fileName}`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          })
            .then((res) => res.json())
            .then((savedTime) => {
              if (videoRef.current && savedTime > 0) {
                videoRef.current.currentTime = savedTime;
              }
            });
        }}
        onTimeUpdate={(e) => {
          const current = e.currentTarget.currentTime;
          const duration = e.currentTarget.duration;

          if (Math.abs(current - lastSavedRef.current) > 5) {
            lastSavedRef.current = current;

            fetch(
              `${BASE_URL}/api/watch/progress?&fileName=${video.fileName}&progress=${current}&duration=${duration}`,
              {
                method: "POST",
                headers: {
                  Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
              },
            );
          }
        }}
      />
    );
  }

  // 🟦 CARD MODE
  return (
    <div className="video-item">
      <div
        className="card"
        onClick={() => navigate(`/watch/${video.fileName}`)}
      >
        <img
          src={`http://localhost:8080/${video.thumbnailPath}`}
          alt="thumbnail"
        />
        <p>{video.title}</p>
      </div>

      <button
        className="watchlist-btn"
        onClick={(e) => {
          e.stopPropagation();
          onToggle?.(video.id);
        }}
      >
        {isInWatchlist ? "✖ Remove" : "✓ Add"}
      </button>
    </div>
  );
}

export default VideoItem;
