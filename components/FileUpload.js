"use client";
import { useState, useEffect } from "react";
import axios from "axios";

export default function FileUpload() {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [imageList, setImageList] = useState([]);

  // ✅ Fetch all images on mount
  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    try {
      const res = await axios.get(
        "https://adu23ievdvvmzyds72amfc27mq0fvsxh.lambda-url.ap-southeast-2.on.aws/"
      );
      setImageList(res.data.images || []);
    } catch (err) {
      console.error("Failed to fetch image list:", err);
      setMessage("❌ Failed to load images");
    }
  };

  const handleUpload = async () => {
    if (!file) return alert("Please select a file");
    setLoading(true);
    setMessage("");

    try {
      // 1️⃣ Get signed URL from Next.js API
      const res = await axios.get("/api/upload-url", {
        params: { filename: file.name, contentType: file.type },
      });
      const { url } = res.data;

      // 2️⃣ Upload file directly to S3
      await axios.put(url, file, { headers: { "Content-Type": file.type } });

      setMessage("✅ Uploaded Successfully!");
      setFile(null);

      // 3️⃣ Immediately update the gallery
      const newFileUrl = `https://restaurant-menu-uploads-12345.s3.ap-southeast-2.amazonaws.com/uploads/${encodeURIComponent(file.name)}`;
      setImageList((prev) => [newFileUrl, ...prev]);

      await fetchImages();
    } catch (err) {
      console.error(err);
      setMessage(`❌ Upload failed: ${err?.message || err}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        background: "#1f1f1f",
        color: "white",
        padding: 20,
        borderRadius: 12,
        maxWidth: 600,
        margin: "40px auto",
      }}
    >
      <h2>Upload Securely to S3</h2>

      <input
        type="file"
        onChange={(e) => setFile(e.target.files?.[0] || null)}
        style={{ marginBottom: 10 }}
      />

      <button
        onClick={handleUpload}
        disabled={loading || !file}
        style={{
          display: "block",
          marginBottom: 20,
          padding: "8px 16px",
          borderRadius: 6,
          background: "#4caf50",
          color: "white",
          border: "none",
          cursor: loading ? "not-allowed" : "pointer",
        }}
      >
        {loading ? "Uploading..." : "Upload"}
      </button>

      {message && <p>{message}</p>}

      <h3>Uploaded Files</h3>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(100px, 1fr))",
          gap: 10,
        }}
      >
        {imageList.map((img, index) => (
          <img
            key={index}
            src={img}
            alt={`Uploaded ${index}`}
            style={{ width: "100%", borderRadius: 8 }}
          />
        ))}
      </div>
    </div>
  );
}
