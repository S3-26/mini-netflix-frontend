import "./Home.css";
import { getRoleFromToken, getUserFromToken } from "../AuthComponents/auth";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import VideoItem from "../VideoComponents/VideoItem";
import { IoSearchOutline } from "react-icons/io5";
import { toggleWatchlist } from "../WatchlistComponents/WatchlistOperations";
import ContinueWatching from "../VideoComponents/ContinueWatching";
import API_BASE_URL from "../config/api";

type Video = {
  id: number;
  title: string;
  fileName: string;
  thumbnailPath: string;
};

function Home() {
  const navigate = useNavigate();
  const email = getUserFromToken();
  const role = getRoleFromToken();
  const [watchlistIds, setWatchlistIds] = useState<number[]>([]);

  console.log("User Role:", role);

  const token = localStorage.getItem("token");
  const [videos, setVideos] = useState<Video[]>([]);
  const [searchText, setSearchText] = useState("");
  const [debounceSearch, setDebounceSearch] = useState("");
  const searching = searchText.length > 0;

  const filteredVideos = videos.filter((v) =>
    v.title.toLowerCase().includes(debounceSearch.toLowerCase()),
  );

  const finalList = searching ? filteredVideos : videos;

  // fetch videos once
  useEffect(() => {
    fetch(`${API_BASE_URL}/api/videos/all`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setVideos(data);
      });
  }, []);

  // ✅ fetch watchlist once
  useEffect(() => {
    fetch(`${API_BASE_URL}/api/watchlist`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data: Video[]) => {
        const ids = data.map((v) => v.id);
        setWatchlistIds(ids);
      });
  }, []);

  const handleToggle = async (videoId: number) => {
    const alreadyAdded = watchlistIds.includes(videoId);

    // ✅ INSTANT UI UPDATE
    if (alreadyAdded) {
      setWatchlistIds((prev) => prev.filter((id) => id !== videoId));
    } else {
      setWatchlistIds((prev) => [...prev, videoId]);
    }

    await toggleWatchlist(videoId);
  };

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebounceSearch(searchText);
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [searchText]);

  return (
    <div className="home">
      {/* Navbar */}
      <div className="navbar">
        <div className="left">
          <h1 className="logo">NETFLIX</h1>
          <ul className="menulist">
            <li>Home</li>
            <li>Movies</li>
            <li>TV Shows</li>
            <li>My List</li>
          </ul>
        </div>
        {/* Search */}
        <div className="search-container">
          <div className="search-box">
            <IoSearchOutline className="icon" />
            <input
              type="text"
              placeholder="Search..."
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
            <button onClick={() => navigate("/watchlist")}>My Watchlist</button>
          </div>
        </div>

        <div className="user">
          {email}
          <button
            onClick={() => {
              localStorage.removeItem("token");
              window.location.href = "/login";
            }}
          >
            Logout
          </button>
          {role === "ADMIN" && (
            <button onClick={() => navigate("/admin")}>Admin Panel</button>
          )}
        </div>
      </div>

      <ContinueWatching />

      {/* Row */}
      <h2 className="row-title">Trending Now</h2>

      <div className="row">
        {filteredVideos.length === 0 && (
          <p style={{ color: "gray", textAlign: "center" }}>
            No results found 😢
          </p>
        )}

        {finalList.map((video) => (
          <VideoItem
            video={video}
            mode="card"
            isInWatchlist={watchlistIds.includes(video.id)}
            onToggle={handleToggle}
          />
        ))}
      </div>
    </div>
  );
}

export default Home;
