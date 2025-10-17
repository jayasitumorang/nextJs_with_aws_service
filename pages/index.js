"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function Home() {
  const [menuImages, setMenuImages] = useState([]);
  const [loadingMenu, setLoadingMenu] = useState(true);
  const [showLogin, setShowLogin] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginMessage, setLoginMessage] = useState("");

  const router = useRouter();

  useEffect(() => {
    fetchMenuImages();
  }, []);

  const fetchMenuImages = async () => {
    try {
      const res = await axios.get(
        "https://adu23ievdvvmzyds72amfc27mq0fvsxh.lambda-url.ap-southeast-2.on.aws/"
      );
      setMenuImages(res.data.images || []);
    } catch (err) {
      console.error("Failed to fetch menu images:", err);
    } finally {
      setLoadingMenu(false);
    }
  };

  const handleLogin = () => {
    const envUser = process.env.NEXT_PUBLIC_ADMIN_USER;
    const envPass = process.env.NEXT_PUBLIC_ADMIN_PASS;

    if (username === envUser && password === envPass) {
      router.push("/upload"); // Navigate to upload page
    } else {
      setLoginMessage("❌ Invalid credentials");
    }
  };

  return (
    <div
      style={{
        fontFamily: "'Poppins', sans-serif",
        color: "#fff",
        minHeight: "100vh",
        background: "url('https://images.unsplash.com/photo-1600891964599-f61ba0e24092?auto=format&fit=crop&w=1920&q=80') no-repeat center center/cover",
        position: "relative",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(0,0,0,0.6)",
          zIndex: 1,
        }}
      />

      {/* Navbar */}
      <nav
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "10px 40px",
          position: "relative",
          zIndex: 2,
        }}
      >
        <h2 style={{ fontSize: "1.8rem", color: "#e63946" }}>🍔 Burger's Restaurant</h2>
        <button
          onClick={() => setShowLogin(true)}
          style={{
            padding: "8px 16px",
            borderRadius: 6,
            background: "#e63946",
            color: "#fff",
            border: "none",
            cursor: "pointer",
          }}
        >
          Admin Login
        </button>
      </nav>

      {/* Hero */}
      <section
        style={{
          position: "relative",
          zIndex: 2,
          textAlign: "center",
          minHeight: "60vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "0 20px",
        }}
      >
        <h1 style={{ fontSize: "3rem", marginBottom: 10 }}>Delicious Burgers Await!</h1>
        <p style={{ fontSize: "1.2rem", color: "#ccc", maxWidth: 600, margin: "0 auto" }}>
          Browse our menu and enjoy fresh, juicy burgers.
        </p>
      </section>

      {/* Menu */}
      <section
        style={{
          position: "relative",
          zIndex: 2,
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
          gap: 20,
          padding: "40px",
          background: "rgba(0,0,0,0.5)",
        }}
      >
        {loadingMenu && <p>Loading menu...</p>}
        {!loadingMenu && menuImages.length === 0 && <p>No menu images available.</p>}
        {menuImages.map((img, index) => (
          <div
            key={index}
            style={{
              background: "#1f1f1f",
              borderRadius: 12,
              overflow: "hidden",
              textAlign: "center",
              boxShadow: "0 5px 15px rgba(0,0,0,0.5)",
            }}
          >
            <img
              src={img}
              alt={`Menu ${index}`}
              style={{ width: "100%", height: 200, objectFit: "cover" }}
            />
            <p style={{ margin: "10px 0", color: "#e63946", fontWeight: "bold" }}>Menu Item</p>
          </div>
        ))}
      </section>

      {/* Login Modal */}
      {showLogin && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: "rgba(0,0,0,0.8)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1000,
          }}
        >
          <div
            style={{
              background: "#222",
              padding: 30,
              borderRadius: 12,
              width: "100%",
              maxWidth: 400,
              textAlign: "center",
            }}
          >
            <h2 style={{ marginBottom: 15 }}>Admin Login</h2>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              style={{
                width: "80%",
                padding: 10,
                marginBottom: 10,
                borderRadius: 6,
                border: "1px solid #555",
                background: "#111",
                color: "#fff",
              }}
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{
                width: "80%",
                padding: 10,
                marginBottom: 10,
                borderRadius: 6,
                border: "1px solid #555",
                background: "#111",
                color: "#fff",
              }}
            />
            <div>
              <button
                onClick={handleLogin}
                style={{
                  padding: "8px 16px",
                  borderRadius: 6,
                  background: "#457b9d",
                  color: "#fff",
                  border: "none",
                  cursor: "pointer",
                  marginRight: 10,
                }}
              >
                Login
              </button>
              <button
                onClick={() => setShowLogin(false)}
                style={{
                  padding: "8px 16px",
                  borderRadius: 6,
                  background: "#aaa",
                  color: "#000",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                Cancel
              </button>
            </div>
            {loginMessage && <p style={{ marginTop: 10 }}>{loginMessage}</p>}
          </div>
        </div>
      )}
    </div>
  );
}
