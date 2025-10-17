"use client";
import FileUpload from "../../components/FileUpload";
import { useRouter } from "next/navigation";

export default function UploadPage() {
  const router = useRouter();

  const handleBack = () => {
    router.push("/"); // Navigate back to landing page
  };

  return (
    <div
      style={{
        fontFamily: "'Poppins', sans-serif",
        minHeight: "100vh",
        background:
          "url('https://images.unsplash.com/photo-1600891964599-f61ba0e24092?auto=format&fit=crop&w=1920&q=80') no-repeat center center/cover",
        backgroundSize: "cover",
        color: "#fff",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "relative",
        padding: 20,
      }}
    >
      {/* Dark overlay */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(0,0,0,0.7)",
          zIndex: 1,
        }}
      />

      {/* Floating Back Button */}
      <button
        onClick={handleBack}
        style={{
          position: "fixed",
          top: 20,
          left: 20,
          zIndex: 10,
          padding: "10px 18px",
          borderRadius: 8,
          backgroundColor: "#e63946",
          color: "#fff",
          border: "none",
          fontWeight: "bold",
          cursor: "pointer",
          boxShadow: "0 5px 15px rgba(0,0,0,0.4)",
          transition: "all 0.3s ease",
        }}
        onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
        onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
      >
        ← Back
      </button>

      {/* Content Container */}
      <div
        style={{
          position: "relative",
          zIndex: 2,
          width: "100%",
          maxWidth: 700,
          background: "rgba(0,0,0,0.85)",
          borderRadius: 16,
          padding: 30,
          boxShadow: "0 10px 30px rgba(0,0,0,0.6)",
        }}
      >
        <h1
          style={{
            fontSize: "2.8rem",
            marginBottom: 25,
            textAlign: "center",
            color: "#ffb703",
            textShadow: "0 2px 6px rgba(0,0,0,0.7)",
          }}
        >
          Admin Upload
        </h1>

        <p
          style={{
            textAlign: "center",
            marginBottom: 20,
            color: "#ccc",
            fontSize: "1rem",
          }}
        >
          Upload menu images directly to S3. Your menu will update instantly.
        </p>

        {/* FileUpload Component */}
        <FileUpload />

        {/* Optional Footer */}
        <p
          style={{
            textAlign: "center",
            marginTop: 20,
            fontSize: "0.85rem",
            color: "#888",
          }}
        >
          🍔 Made with love by Burger Admin
        </p>
      </div>
    </div>
  );
}
