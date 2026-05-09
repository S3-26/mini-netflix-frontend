import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import VideoItem from "./VideoItem";
import "./Watch.css";

type Video = {
  id: number;
  title: string;
  fileName: string;
  thumbnailPath: string;
};

const BASE_URL = "http://localhost:8080";

function Watch() {
  const { fileName } = useParams();
  const navigate = useNavigate();

  const [video, setVideo] = useState<Video | null>(null);

  useEffect(() => {
    if (!fileName) return;

    fetch(`${BASE_URL}/api/videos/meta/${fileName}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Video not found");
        return res.json();
      })
      .then((data) => setVideo(data))
      .catch(() => setVideo(null));
  }, [fileName]);

  if (!video) return <h2>Loading video...</h2>;

  return (
    <div className="watch-container">
      {/* Top Bar */}
      <div className="top-bar">
        <button onClick={() => navigate("/home")}>⬅ Back</button>
        <h3>{video.title}</h3>
      </div>

      {/* 🎬 Player */}
      <VideoItem video={video} mode="player" />
    </div>
  );
}

export default Watch;
