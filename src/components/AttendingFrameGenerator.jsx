import React, { useState, useRef, useCallback } from "react";
import attendingTemplate from "../assets/attending.jpeg";
import vrGirlImage from "../assets/VR Girl.png";
import { Camera, Download, RefreshCw } from "lucide-react";

export default function AttendingFrameGenerator() {
  const [userName, setUserName] = useState("");
  const [userPhoto, setUserPhoto] = useState(null);
  const [generating, setGenerating] = useState(false);
  const [generated, setGenerated] = useState(false);
  const canvasRef = useRef(null);
  const fileInputRef = useRef(null);

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUserPhoto(URL.createObjectURL(file));
    setGenerated(false);
  };

  const generateFrame = useCallback(() => {
    if (!userName.trim() && !userPhoto) return;
    setGenerating(true);
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const template = new Image();
    template.src = attendingTemplate;
    template.onload = () => {
      canvas.width = 780;
      canvas.height = 975;
      ctx.drawImage(template, 0, 0, canvas.width, canvas.height);
      const drawName = () => {
        if (userName.trim()) {
          const bannerW = canvas.width * 0.62;
          ctx.fillStyle = "#ffffff";
          ctx.font = "bold 26px sans-serif";
          ctx.textAlign = "center";
          ctx.textBaseline = "middle";
          let text = userName.trim();
          while (ctx.measureText(text).width > bannerW - 40 && text.length > 1) text = text.slice(0, -1);
          ctx.fillText(text, canvas.width / 2, canvas.height * 0.776);
        }
        setGenerating(false);
        setGenerated(true);
      };
      
      const photoToDraw = userPhoto || vrGirlImage;
      if (photoToDraw) {
        const photo = new Image();
        photo.src = photoToDraw;
        photo.onload = () => {
          const cx = canvas.width / 2;
          const cy = canvas.height * 0.511;
          const r = canvas.width * 0.25;
          ctx.save();
          ctx.beginPath();
          ctx.arc(cx, cy, r, 0, Math.PI * 2);
          ctx.clip();
          const aspect = photo.width / photo.height;
          let drawW, drawH, drawX, drawY;
          if (aspect > 1) { drawH = r * 2; drawW = drawH * aspect; drawX = cx - drawW / 2; drawY = cy - r; }
          else { drawW = r * 2; drawH = drawW / aspect; drawX = cx - r; drawY = cy - drawH / 2; }
          ctx.drawImage(photo, drawX, drawY, drawW, drawH);
          ctx.restore();
          drawName();
        };
        photo.onerror = drawName;
      } else { drawName(); }
    };
  }, [userName, userPhoto]);

  const handleDownload = () => {
    const canvas = canvasRef.current;
    const link = document.createElement("a");
    link.download = "PenmAI2026_" + (userName || "attendee").replace(/\s+/g, "_") + ".png";
    link.href = canvas.toDataURL("image/png");
    link.click();
  };

  const handleReset = () => {
    setUserName(""); setUserPhoto(null); setGenerated(false);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    React.createElement("div", { style: { maxWidth: "900px", margin: "0 auto" } },
      React.createElement("div", { style: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "40px", alignItems: "start" } },
        React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: "20px" } },
          React.createElement("div", null,
            React.createElement("label", { style: { display: "block", fontSize: "13px", fontWeight: "700", color: "var(--color-text-primary)", marginBottom: "10px" } }, "Your Photo"),
            React.createElement("div", {
              onClick: () => fileInputRef.current && fileInputRef.current.click(),
              style: { border: userPhoto ? "2px solid var(--color-pink)" : "2px dashed rgba(239,21,94,0.4)", borderRadius: "16px", padding: "28px", textAlign: "center", cursor: "pointer", background: userPhoto ? "var(--color-soft-pink)" : "rgba(255,255,255,0.6)", transition: "all 0.3s ease" }
            },
              userPhoto
                ? React.createElement("div", null,
                    React.createElement("img", { src: userPhoto, alt: "photo", style: { width: "110px", height: "110px", borderRadius: "50%", objectFit: "cover", border: "3px solid var(--color-pink)", display: "block", margin: "0 auto 10px" } }),
                    React.createElement("p", { style: { fontSize: "12px", color: "var(--color-pink)", fontWeight: "700" } }, "Click to change photo")
                  )
                : React.createElement("div", null,
                    React.createElement("div", { style: { width: "56px", height: "56px", borderRadius: "50%", background: "var(--color-soft-pink)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 12px" } },
                      React.createElement(Camera, { size: 24, color: "var(--color-pink)" })
                    ),
                    React.createElement("p", { style: { fontSize: "13px", fontWeight: "700", color: "var(--color-text-primary)", marginBottom: "4px" } }, "Upload your photo"),
                    React.createElement("p", { style: { fontSize: "11px", color: "var(--color-text-secondary)" } }, "JPG or PNG, square looks best")
                  )
            ),
            React.createElement("input", { ref: fileInputRef, type: "file", accept: "image/*", style: { display: "none" }, onChange: handlePhotoUpload })
          ),
          React.createElement("div", null,
            React.createElement("label", { style: { display: "block", fontSize: "13px", fontWeight: "700", color: "var(--color-text-primary)", marginBottom: "10px" } }, "Your Name"),
            React.createElement("input", {
              type: "text", value: userName, maxLength: 32, placeholder: "Enter your full name...",
              onChange: (e) => { setUserName(e.target.value); setGenerated(false); },
              style: { width: "100%", padding: "12px 16px", borderRadius: "12px", border: "1.5px solid var(--color-border)", fontSize: "14px", color: "var(--color-text-primary)", background: "white", outline: "none", boxSizing: "border-box" }
            }),
            React.createElement("p", { style: { fontSize: "11px", color: "var(--color-text-secondary)", marginTop: "6px" } }, (32 - userName.length) + " characters remaining")
          ),
          React.createElement("button", {
            onClick: generateFrame,
            disabled: generating || (!userName.trim() && !userPhoto),
            className: "btn-gradient",
            style: { width: "100%", justifyContent: "center", padding: "14px", fontSize: "14px", opacity: (!userName.trim() && !userPhoto) ? 0.5 : 1, cursor: (!userName.trim() && !userPhoto) ? "not-allowed" : "pointer" }
          }, generating ? "Generating..." : "Generate My Frame"),
          generated && React.createElement("button", {
            onClick: handleDownload, className: "btn-outline",
            style: { width: "100%", justifyContent: "center", padding: "14px", fontSize: "14px", display: "flex", alignItems: "center", gap: "8px" }
          }, React.createElement(Download, { size: 16 }), " Download Image"),
          (userPhoto || userName) && React.createElement("button", {
            onClick: handleReset,
            style: { background: "none", border: "none", color: "var(--color-text-secondary)", fontSize: "12px", cursor: "pointer", display: "flex", alignItems: "center", gap: "6px", margin: "0 auto" }
          }, React.createElement(RefreshCw, { size: 12 }), " Reset")
        ),
        React.createElement("div", null,
          React.createElement("label", { style: { display: "block", fontSize: "13px", fontWeight: "700", color: "var(--color-text-primary)", marginBottom: "10px" } }, "Preview"),
          React.createElement("div", { style: { borderRadius: "20px", overflow: "hidden", border: "2px solid var(--color-border)", background: "var(--color-soft-pink)", position: "relative", boxShadow: "0 8px 32px rgba(239,21,94,0.12)" } },
            !generated && React.createElement("img", { src: attendingTemplate, alt: "Template", style: { width: "100%", display: "block", opacity: 0.85 } }),
            React.createElement("canvas", { ref: canvasRef, style: { width: "100%", display: generated ? "block" : "none" } }),
            !generated && React.createElement("div", { style: { position: "absolute", bottom: "16px", left: "50%", transform: "translateX(-50%)", background: "rgba(239,21,94,0.88)", color: "white", padding: "8px 18px", borderRadius: "20px", fontSize: "11px", fontWeight: "800", whiteSpace: "nowrap" } }, "Add photo & name, then Generate")
          ),
          generated && React.createElement("p", { style: { fontSize: "11px", color: "var(--color-text-secondary)", textAlign: "center", marginTop: "10px" } }, "Frame ready! Click Download Image to save.")
        )
      )
    )
  );
}