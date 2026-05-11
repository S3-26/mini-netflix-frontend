import { useState } from "react";
import "./AdminUpload.css";
import API_BASE_URL from "../config/api";

function AdminUpload() {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const handleUpload = async () => {
    if (!file) {
      alert("Please select a video file");
      return;
    }

    const token = localStorage.getItem("token");

    const formData = new FormData();
    formData.append("file", file);

    try {
      setLoading(true);

      const res = await fetch(`${API_BASE_URL}/api/videos/upload`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`, // optional if secured
        },
        body: formData, // ✅ IMPORTANT
      });

      if (res.ok) {
        alert("🎉 Video uploaded!");
        window.location.href = "/home"; // redirect to home after upload
        setFile(null);
      } else {
        alert("❌ Upload failed");
      }
    } catch (err) {
      alert("❌ Error uploading");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-container">
      <h1>🎬 Admin Upload Panel</h1>

      <div className="upload-box">
        <input
          type="file"
          accept="video/*"
          onChange={(e) => setFile(e.target.files ? e.target.files[0] : null)}
        />

        <button onClick={handleUpload} disabled={loading}>
          {loading ? "Uploading..." : "Upload Video"}
        </button>
      </div>
    </div>
  );
}

export default AdminUpload;
