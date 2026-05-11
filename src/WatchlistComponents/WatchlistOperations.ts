import API_BASE_URL from "../config/api";

export const toggleWatchlist = async (videoId: number) => {
  const token = localStorage.getItem("token");
  const res = await fetch(
    `${API_BASE_URL}/api/watchlist/toggle?videoId=${videoId}`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  if (!res.ok) {
    throw new Error("Failed to toggle watchlist");
  }
};

export const getWatchList = async () => {
  const token = localStorage.getItem("token");
  const res = await fetch(`${API_BASE_URL}/api/watchlist`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch watchlist");
  }

  return res.json();
};
