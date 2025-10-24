"use client";
import { useEffect, useState } from "react";

export default function FooterAdmin() {
  const [footer, setFooter] = useState({
    description: "",
    locations: [],
    quickLinks: [],
    logo: "",
    socialLinks: { facebook: "", twitter: "", instagram: "", linkedin: "" },
  });
  const [logoFile, setLogoFile] = useState(null);
  const [logoPreview, setLogoPreview] = useState("");
  const [loading, setLoading] = useState(false);

 
  useEffect(() => {
    async function fetchFooter() {
      try {
        const res = await fetch("/api/users/footer");
        const data = await res.json();

        const baseUrl =
          process.env.NEXT_PUBLIC_BASE_URL ||
          (typeof window !== "undefined" ? window.location.origin : "");
        const absoluteLogo = data.logo
          ? `${baseUrl}${data.logo.startsWith("/") ? "" : "/"}${data.logo}`
          : "";

        setFooter({
          description: data.description || "",
          locations: data.locations || [],
          quickLinks: data.quickLinks || [],
          logo: absoluteLogo,
          socialLinks: {
            facebook: data.socialLinks?.facebook || "",
            twitter: data.socialLinks?.twitter || "",
            instagram: data.socialLinks?.instagram || "",
            linkedin: data.socialLinks?.linkedin || "",
          },
        });

        if (absoluteLogo) {
          setLogoPreview(absoluteLogo);
        }
      } catch (err) {
        console.error("Failed to fetch footer", err);
        alert("Failed to load footer data");
      }
    }
    fetchFooter();
  }, []);

  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setLogoFile(file);

      const reader = new FileReader();
      reader.onloadend = () => {
        setLogoPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const clearLogo = () => {
    setLogoFile(null);
    setLogoPreview("");
    const input = document.getElementById("logo-upload");
    if (input) input.value = "";
  };

  const getBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith("socialLinks.")) {
      const key = name.split(".")[1];
      setFooter((prev) => ({
        ...prev,
        socialLinks: { ...prev.socialLinks, [key]: value },
      }));
    } else {
      setFooter((prev) => ({ ...prev, [name]: value }));
    }
  };


  const handleLocationChange = (index, field, value) => {
    const newLocations = [...footer.locations];
    newLocations[index][field] = value;
    setFooter((prev) => ({ ...prev, locations: newLocations }));
  };
  const addLocation = () => {
    setFooter((prev) => ({
      ...prev,
      locations: [...prev.locations, { type: "", address: "" }],
    }));
  };
  const removeLocation = (index) => {
    setFooter((prev) => ({
      ...prev,
      locations: prev.locations.filter((_, i) => i !== index),
    }));
  };

  const handleQuickLinkChange = (index, field, value) => {
    const newLinks = [...footer.quickLinks];
    newLinks[index][field] = value;
    setFooter((prev) => ({ ...prev, quickLinks: newLinks }));
  };
  const addQuickLink = () => {
    setFooter((prev) => ({
      ...prev,
      quickLinks: [...prev.quickLinks, { title: "", url: "" }],
    }));
  };
  const removeQuickLink = (index) => {
    setFooter((prev) => ({
      ...prev,
      quickLinks: prev.quickLinks.filter((_, i) => i !== index),
    }));
  };


  const handleSubmit = async () => {
    setLoading(true);
    let body = { ...footer };

    body.quickLinks = footer.quickLinks.filter(
      (l) => l.title.trim() && l.url.trim()
    );

    if (logoFile) {
      try {
        body.logoBase64 = await getBase64(logoFile);
        delete body.logo; 
      } catch (err) {
        alert("Failed to process logo");
        setLoading(false);
        return;
      }
    }

    try {
      const res = await fetch("/api/users/footer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const result = await res.json();
      alert(result.message || "Footer updated successfully!");

      if (logoFile) clearLogo();
    } catch (err) {
      console.error(err);
      alert("Failed to update footer");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#f7fafc",
        padding: "32px 16px",
        fontFamily: "system-ui, -apple-system, sans-serif",

      }}
    >
      <div
        style={{
          maxWidth: "900px",
          margin: "0 auto",
          background: "#fff",
          borderRadius: "12px",
          boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
          border: "2px solid #e2e8f0",
          overflow: "hidden",
        }}
      >
        <div style={{ padding: "32px", borderBottom: "1px solid #e2e8f0" }}>
          <h2 style={{ margin: 0, fontSize: "1.75rem", fontWeight: 700, color: "#2d3748" }}>
            Footer Admin Panel
          </h2>
        </div>

        <div style={{ padding: "32px" }}>
          <section style={{ marginBottom: "32px" }}>
            <label style={{ display: "block", fontWeight: 600, marginBottom: "8px", color: "#4a5568" }}>
              Logo
            </label>

            {(logoPreview || footer.logo) && (
              <div
                style={{
                  position: "relative",
                  display: "inline-block",
                  marginBottom: "12px",
                }}
              >
                <img
                  src={logoPreview || footer.logo}
                  alt="Logo preview"
                  style={{
                    height: "80px",
                    width: "auto",
                    border: "2px solid #e2e8f0",
                    borderRadius: "8px",
                    objectFit: "contain",
                    background: "#fff",
                  }}
                />
                <button
                  onClick={clearLogo}
                  style={{
                    position: "absolute",
                    top: "-8px",
                    right: "-8px",
                    background: "#e53e3e",
                    color: "#fff",
                    border: "none",
                    width: "24px",
                    height: "24px",
                    borderRadius: "50%",
                    fontSize: "14px",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
                  }}
                  title="Remove logo"
                >
                  X
                </button>
              </div>
            )}

            <input
              id="logo-upload"
              type="file"
              accept="image/png,image/jpeg,image/svg+xml,image/webp"
              onChange={handleLogoChange}
              style={{
                padding: "8px 0",
                fontSize: "14px",
                display: "block",
              }}
            />
            <small style={{ color: "#718096" }}>
              Recommended: 200×60px, PNG or SVG
            </small>
          </section>


          <section style={{ marginBottom: "32px" }}>
            <label style={{ display: "block", fontWeight: 600, marginBottom: "8px", color: "#4a5568" }}>
              Description
            </label>
            <textarea
              name="description"
              value={footer.description}
              onChange={handleChange}
              placeholder="New description for the footer..."
              style={{
                width: "100%",
                height: "90px",
                padding: "12px",
                border: "1px solid #cbd5e0",
                borderRadius: "8px",
                fontSize: "14px",
                resize: "vertical",
              }}
            />
          </section>

          <section style={{ marginBottom: "32px" }}>
            <h4 style={{ margin: "0 0 16px", fontWeight: 600, color: "#2d3748" }}>Locations</h4>
            {footer.locations.map((loc, idx) => (
              <div
                key={idx}
                style={{
                  display: "flex",
                  gap: "12px",
                  marginBottom: "12px",
                  padding: "12px",
                  border: "1px solid #e2e8f0",
                  borderRadius: "8px",
                  backgroundColor: "#fcfcfd",
                }}
              >
                <input
                  type="text"
                  placeholder="Type (e.g. PLANT LOCATION)"
                  value={loc.type}
                  onChange={(e) => handleLocationChange(idx, "type", e.target.value)}
                  style={{ flex: 1, padding: "10px", border: "1px solid #cbd5e0", borderRadius: "6px" }}
                />
                <input
                  type="text"
                  placeholder="Address"
                  value={loc.address}
                  onChange={(e) => handleLocationChange(idx, "address", e.target.value)}
                  style={{ flex: 2, padding: "10px", border: "1px solid #cbd5e0", borderRadius: "6px" }}
                />
                <button
                  onClick={() => removeLocation(idx)}
                  style={{
                    background: "#e53e3e",
                    color: "#fff",
                    border: "none",
                    padding: "8px 12px",
                    borderRadius: "6px",
                    cursor: "pointer",
                    fontWeight: 500,
                  }}
                >
                  Remove
                </button>
              </div>
            ))}
            <button
              onClick={addLocation}
              style={{
                background: "#3182ce",
                color: "#fff",
                border: "none",
                padding: "10px 16px",
                borderRadius: "6px",
                cursor: "pointer",
                fontWeight: 500,
              }}
            >
              + Add Location
            </button>
          </section>

          <section style={{ marginBottom: "32px" }}>
            <h4 style={{ margin: "0 0 16px", fontWeight: 600, color: "#2d3748" }}>Quick Links</h4>
            {footer.quickLinks.map((link, idx) => (
              <div
                key={idx}
                style={{
                  display: "flex",
                  gap: "12px",
                  marginBottom: "12px",
                  padding: "12px",
                  border: "1px solid #e2e8f0",
                  borderRadius: "8px",
                  backgroundColor: "#fcfcfd",
                }}
              >
                <input
                  type="text"
                  placeholder="Link text (e.g. About)"
                  value={link.title}
                  onChange={(e) => handleQuickLinkChange(idx, "title", e.target.value)}
                  style={{ flex: 1, padding: "10px", border: "1px solid #cbd5e0", borderRadius: "6px" }}
                />
                <input
                  type="url"
                  placeholder="https://..."
                  value={link.url}
                  onChange={(e) => handleQuickLinkChange(idx, "url", e.target.value)}
                  style={{ flex: 2, padding: "10px", border: "1px solid #cbd5e0", borderRadius: "6px" }}
                />
                <button
                  onClick={() => removeQuickLink(idx)}
                  style={{
                    background: "#e53e3e",
                    color: "#fff",
                    border: "none",
                    padding: "8px 12px",
                    borderRadius: "6px",
                    cursor: "pointer",
                    fontWeight: 500,
                  }}
                >
                  Remove
                </button>
              </div>
            ))}
            <button
              onClick={addQuickLink}
              style={{
                background: "#3182ce",
                color: "#fff",
                border: "none",
                padding: "10px 16px",
                borderRadius: "6px",
                cursor: "pointer",
                fontWeight: 500,
              }}
            >
              + Add Quick Link
            </button>

            {footer.quickLinks.length > 0 && (
              <div style={{ marginTop: "20px", padding: "16px", background: "#f7fafc", borderRadius: "8px", border: "1px dashed #cbd5e0" }}>
                <strong style={{ display: "block", marginBottom: "8px", color: "#4a5568" }}>Preview:</strong>
                <ul style={{ margin: 0, paddingLeft: "20px" }}>
                  {footer.quickLinks
                    .filter((l) => l.title.trim() && l.url.trim())
                    .map((l, i) => (
                      <li key={i}>
                        <a
                          href={l.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{ color: "#3182ce", textDecoration: "underline" }}
                        >
                          {l.title}
                        </a>
                      </li>
                    ))}
                </ul>
              </div>
            )}
          </section>


          <section style={{ marginBottom: "32px" }}>
            <h4 style={{ margin: "0 0 16px", fontWeight: 600, color: "#2d3748" }}>Social Links</h4>
            {["facebook", "twitter", "instagram", "linkedin"].map((key) => (
              <div key={key} style={{ marginBottom: "12px", display: "flex", alignItems: "center", gap: "12px" }}>
                <label style={{ width: "100px", textTransform: "capitalize", fontWeight: 500, color: "#4a5568" }}>
                  {key}:
                </label>
                <input
                  type="url"
                  name={`socialLinks.${key}`}
                  value={footer.socialLinks[key] || ""}
                  onChange={handleChange}
                  placeholder="https://..."
                  style={{
                    flex: 1,
                    padding: "10px",
                    border: "1px solid #cbd5e0",
                    borderRadius: "6px",
                    fontSize: "14px",
                  }}
                />
              </div>
            ))}
          </section>

          <div style={{ textAlign: "center" }}>
            <button
              onClick={handleSubmit}
              disabled={loading}
              style={{
                background: loading ? "#a0aec0" : "#2c5282",
                color: "#fff",
                border: "none",
                padding: "14px 32px",
                borderRadius: "8px",
                cursor: loading ? "not-allowed" : "pointer",
                fontSize: "16px",
                fontWeight: 600,
                minWidth: "180px",
                transition: "background 0.2s",
              }}
            >
              {loading ? "Updating..." : "Update Footer"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}