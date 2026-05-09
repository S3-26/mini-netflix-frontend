import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

type History = {
  fileName: string;
  title: string;
  progress: number;
  duration: number;
};

const BASE_URL = "http://localhost:8080";

function ContinueWatching() {
  const [history, setHistory] = useState<History[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${BASE_URL}/api/watch/continue`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then(setHistory);
  }, []);

  if (!history.length) return null;

  return (
    <div>
      <h2>Continue Watching</h2>

      <div style={{ display: "flex", gap: "20px" }}>
        {history.map((h) => {
          const percent = h.duration > 0 ? (h.progress / h.duration) * 100 : 0;

          return (
            <div
              key={h.fileName}
              style={{ cursor: "pointer" }}
              onClick={() => navigate(`/watch/${h.fileName}`)}
            >
              <img src="https://via.placeholder.com/200x120" alt="thumbnail" />

              {/* Progress Bar */}
              <div
                style={{
                  width: "200px",
                  height: "4px",
                  background: "#444",
                }}
              >
                <div
                  style={{
                    width: `${percent}%`,
                    height: "100%",
                    background: "red",
                  }}
                />
              </div>

              <p>{h.title}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ContinueWatching;
