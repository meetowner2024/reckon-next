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
  const [deleting, setDeleting] = useState({});

  const defaultPlatforms = ["facebook", "twitter", "instagram", "linkedin"];

  /* ------------------- FETCH ------------------- */
  useEffect(() => {
    async function fetchFooter() {
      try {
        const res = await fetch("/api/users/footer");
        const data = await res.json();

        setFooter({
          description: data.description || "",
          locations: data.locations || [],
          quickLinks: data.quickLinks || [],
          logo: data.logo || "",
          socialLinks: data.socialLinks || {
            facebook: "",
            twitter: "",
            instagram: "",
            linkedin: "",
          },
        });
        if (data.logo) setLogoPreview(data.logo);
      } catch (err) {
        console.error(err);
        alert("Failed to load footer data");
      }
    }
    fetchFooter();
  }, []);

  /* ------------------- LOGO ------------------- */
  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setLogoFile(file);
    const reader = new FileReader();
    reader.onloadend = () => setLogoPreview(reader.result);
    reader.readAsDataURL(file);
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
      reader.onerror = reject;
    });

  /* ------------------- INPUTS ------------------- */
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

  /* ------------------- LOCATIONS ------------------- */
  const addLocation = () => {
    setFooter((prev) => ({
      ...prev,
      locations: [...prev.locations, { type: "", address: "" }],
    }));
  };

  const removeLocation = async (index) => {
    if (!confirm("Delete this location?")) return;
    const key = `loc-${index}`;
    setDeleting((prev) => ({ ...prev, [key]: true }));

    try {
      const res = await fetch("/api/users/footer", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "locations", index }),
      });
      if (!res.ok) throw new Error(await res.text());

      setFooter((prev) => ({
        ...prev,
        locations: prev.locations.filter((_, i) => i !== index),
      }));
    } catch (err) {
      alert("Failed to delete location");
    } finally {
      setDeleting((prev) => ({ ...prev, [key]: false }));
    }
  };

  const handleLocationChange = (index, field, value) => {
    const newLocs = [...footer.locations];
    newLocs[index][field] = value;
    setFooter((prev) => ({ ...prev, locations: newLocs }));
  };

  /* ------------------- QUICK LINKS ------------------- */
  const addQuickLink = () => {
    setFooter((prev) => ({
      ...prev,
      quickLinks: [...prev.quickLinks, { title: "", url: "" }],
    }));
  };

  const removeQuickLink = async (index) => {
    if (!confirm("Delete this quick link?")) return;
    const key = `ql-${index}`;
    setDeleting((prev) => ({ ...prev, [key]: true }));

    try {
      const res = await fetch("/api/users/footer", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "quickLinks", index }),
      });
      if (!res.ok) throw new Error(await res.text());

      setFooter((prev) => ({
        ...prev,
        quickLinks: prev.quickLinks.filter((_, i) => i !== index),
      }));
    } catch (err) {
      alert("Failed to delete quick link");
    } finally {
      setDeleting((prev) => ({ ...prev, [key]: false }));
    }
  };

  const handleQuickLinkChange = (index, field, value) => {
    const newLinks = [...footer.quickLinks];
    newLinks[index][field] = value;
    setFooter((prev) => ({ ...prev, quickLinks: newLinks }));
  };

  /* ------------------- SOCIAL LINKS (DYNAMIC) ------------------- */
  const addSocialLink = () => {
    setFooter((prev) => ({
      ...prev,
      socialLinks: { ...prev.socialLinks, "": "" },
    }));
  };

  const removeSocialLink = async (platform) => {
    if (defaultPlatforms.includes(platform) && !confirm("Remove default platform?")) return;

    setFooter((prev) => {
      const { [platform]: _, ...rest } = prev.socialLinks;
      return { ...prev, socialLinks: rest };
    });

    try {
      await fetch("/api/users/footer", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "socialLinks", key: platform }),
      });
    } catch (e) {
      console.warn("Instant delete failed, will sync on save");
    }
  };

  const handleSocialChange = (oldKey, field, value) => {
    if (field === "platform") {
      const trimmed = value.trim().toLowerCase();
      if (trimmed && Object.keys(footer.socialLinks).some(k => k.toLowerCase() === trimmed && k !== oldKey)) {
        alert("Platform name already exists");
        return;
      }
    }

    setFooter((prev) => {
      const newLinks = { ...prev.socialLinks };
      delete newLinks[oldKey];
      const newKey = field === "platform" ? value.trim() : oldKey;
      const newUrl = field === "url" ? value : newLinks[oldKey] ?? "";
      if (newKey) newLinks[newKey] = newUrl;
      return { ...prev, socialLinks: newLinks };
    });
  };

  /* ------------------- SUBMIT ------------------- */
  const handleSubmit = async () => {
    setLoading(true);
    const body = { ...footer };
    body.quickLinks = footer.quickLinks.filter(l => l.title.trim() && l.url.trim());

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
      if (!res.ok) throw new Error(result.message);

      alert(result.message || "Footer updated!");

      // Refresh from DB
      const fresh = await (await fetch("/api/users/footer")).json();
      setFooter({
        description: fresh.description || "",
        locations: fresh.locations || [],
        quickLinks: fresh.quickLinks || [],
        logo: fresh.logo || "",
        socialLinks: fresh.socialLinks || {
          facebook: "", twitter: "", instagram: "", linkedin: ""
        },
      });
      if (logoFile) {
        setLogoPreview(fresh.logo);
        clearLogo();
      }
    } catch (err) {
      console.error(err);
      alert("Failed to update footer");
    } 
    finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#f7fafc", padding: "32px 16px", fontFamily: "system-ui, -apple-system, sans-serif" }}>
      <div style={{ maxWidth: "900px", margin: "0 auto", background: "#fff", borderRadius: "12px", boxShadow: "0 10px 25px rgba(0,0,0,0.1)", border: "2px solid #e2e8f0", overflow: "hidden" }}>
        <div style={{ padding: "32px", borderBottom: "1px solid #e2e8f0" }}>
          <h2 style={{ margin: 0, fontSize: "1.75rem", fontWeight: 700, color: "#2d3748" }}>Footer Admin Panel</h2>
        </div>

        <div style={{ padding: "32px" }}>
          {/* LOGO */}
          <section style={{ marginBottom: "32px" }}>
            <label style={{ display: "block", fontWeight: 600, marginBottom: "8px", color: "#4a5568" }}>Logo</label>
            {(logoPreview || footer.logo) && (
              <div style={{ position: "relative", display: "inline-block", marginBottom: "12px" }}>
                <img src={logoPreview || footer.logo} alt="Logo" style={{ height: "80px", width: "auto", border: "2px solid #e2e8f0", borderRadius: "8px", objectFit: "contain", background: "#fff" }} />
                <button onClick={clearLogo} style={{ position: "absolute", top: "-8px", right: "-8px", background: "#e53e3e", color: "#fff", border: "none", width: "24px", height: "24px", borderRadius: "50%", fontSize: "14px", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 2px 4px rgba(0,0,0,0.2)" }} title="Remove logo">X</button>
              </div>
            )}
            <input id="logo-upload" type="file" accept="image/png,image/jpeg,image/svg+xml,image/webp" onChange={handleLogoChange} style={{ padding: "8px 0", fontSize: "14px", display: "block" }} />
            <small style={{ color: "#718096" }}>Recommended: 200×60px, PNG or SVG</small>
          </section>

          {/* DESCRIPTION */}
          <section style={{ marginBottom: "32px" }}>
            <label style={{ display: "block", fontWeight: 600, marginBottom: "8px", color: "#4a5568" }}>Description</label>
            <textarea name="description" value={footer.description} onChange={handleChange} placeholder="New description for the footer..." style={{ width: "100%", height: "90px", padding: "12px", border: "1px solid #cbd5e0", borderRadius: "8px", fontSize: "14px", resize: "vertical" }} />
          </section>

          {/* LOCATIONS */}
          <section style={{ marginBottom: "32px" }}>
            <h4 style={{ margin: "0 0 16px", fontWeight: 600, color: "#2d3748" }}>Locations</h4>
            {footer.locations.map((loc, idx) => (
              <div key={idx} style={{ display: "flex", gap: "12px", marginBottom: "12px", padding: "12px", border: "1px solid #e2e8f0", borderRadius: "8px", backgroundColor: "#fcfcfd" }}>
                <input type="text" placeholder="Type (e.g. PLANT LOCATION)" value={loc.type} onChange={(e) => handleLocationChange(idx, "type", e.target.value)} style={{ flex: 1, padding: "10px", border: "1px solid #cbd5e0", borderRadius: "6px" }} />
                <input type="text" placeholder="Address" value={loc.address} onChange={(e) => handleLocationChange(idx, "address", e.target.value)} style={{ flex: 2, padding: "10px", border: "1px solid #cbd5e0", borderRadius: "6px" }} />
                <button onClick={() => removeLocation(idx)} disabled={deleting[`loc-${idx}`]} style={{ background: "#e53e3e", color: "#fff", border: "none", padding: "8px 12px", borderRadius: "6px", cursor: deleting[`loc-${idx}`] ? "not-allowed" : "pointer", fontWeight: 500, opacity: deleting[`loc-${idx}`] ? 0.7 : 1 }}>
                  {deleting[`loc-${idx}`] ? "…" : "Remove"}
                </button>
              </div>
            ))}
            <button onClick={addLocation} style={{ background: "#3182ce", color: "#fff", border: "none", padding: "10px 16px", borderRadius: "6px", cursor: "pointer", fontWeight: 500 }}>+ Add Location</button>
          </section>

          {/* QUICK LINKS */}
          <section style={{ marginBottom: "32px" }}>
            <h4 style={{ margin: "0 0 16px", fontWeight: 600, color: "#2d3748" }}>Quick Links</h4>
            {footer.quickLinks.map((link, idx) => (
              <div key={idx} style={{ display: "flex", gap: "12px", marginBottom: "12px", padding: "12px", border: "1px solid #e2e8f0", borderRadius: "8px", backgroundColor: "#fcfcfd" }}>
                <input type="text" placeholder="Link text (e.g. About)" value={link.title} onChange={(e) => handleQuickLinkChange(idx, "title", e.target.value)} style={{ flex: 1, padding: "10px", border: "1px solid #cbd5e0", borderRadius: "6px" }} />
                <input type="url" placeholder="https://..." value={link.url} onChange={(e) => handleQuickLinkChange(idx, "url", e.target.value)} style={{ flex: 2, padding: "10px", border: "1px solid #cbd5e0", borderRadius: "6px" }} />
                <button onClick={() => removeQuickLink(idx)} disabled={deleting[`ql-${idx}`]} style={{ background: "#e53e3e", color: "#fff", border: "none", padding: "8px 12px", borderRadius: "6px", cursor: deleting[`ql-${idx}`] ? "not-allowed" : "pointer", fontWeight: 500, opacity: deleting[`ql-${idx}`] ? 0.7 : 1 }}>
                  {deleting[`ql-${idx}`] ? "…" : "Remove"}
                </button>
              </div>
            ))}
            <button onClick={addQuickLink} style={{ background: "#3182ce", color: "#fff", border: "none", padding: "10px 16px", borderRadius: "6px", cursor: "pointer", fontWeight: 500 }}>+ Add Quick Link</button>

            {footer.quickLinks.length > 0 && (
              <div style={{ marginTop: "20px", padding: "16px", background: "#f7fafc", borderRadius: "8px", border: "1px dashed #cbd5e0" }}>
                <strong style={{ display: "block", marginBottom: "8px", color: "#4a5568" }}>Preview:</strong>
                <ul style={{ margin: 0, paddingLeft: "20px" }}>
                  {footer.quickLinks.filter(l => l.title.trim() && l.url.trim()).map((l, i) => (
                    <li key={i}><a href={l.url} target="_blank" rel="noopener noreferrer" style={{ color: "#3182ce", textDecoration: "underline" }}>{l.title}</a></li>
                  ))}
                </ul>
              </div>
            )}
          </section>

          {/* SOCIAL LINKS */}
          <section style={{ marginBottom: "32px" }}>
            <h4 style={{ margin: "0 0 16px", fontWeight: 600, color: "#2d3748" }}>Social Links</h4>
            {Object.entries(footer.socialLinks).map(([platform, url], idx) => {
              const isDefault = defaultPlatforms.includes(platform);
              const isEmptyKey = platform === "";
              return (
                <div key={idx} style={{ marginBottom: "12px", display: "flex", alignItems: "center", gap: "12px" }}>
                  <input
                    type="text"
                    placeholder={isDefault ? platform : "Platform (e.g. youtube)"}
                    value={platform}
                    onChange={(e) => handleSocialChange(platform, "platform", e.target.value)}
                    style={{
                      width: "150px",
                      padding: "10px",
                      border: "1px solid #cbd5e0",
                      borderRadius: "6px",
                      fontSize: "14px",
                      background: isDefault ? "#f0f4f8" : "#fff",
                      cursor: isDefault ? "not-allowed" : "text",
                    }}
                    disabled={isDefault}
                    title={isDefault ? "Default – cannot rename" : ""}
                  />
                  <input
                    type="url"
                    placeholder="https://..."
                    value={url}
                    onChange={(e) => handleSocialChange(platform, "url", e.target.value)}
                    style={{ flex: 1, padding: "10px", border: "1px solid #cbd5e0", borderRadius: "6px", fontSize: "14px" }}
                  />
                  {!isEmptyKey && (
                    <button
                      onClick={() => removeSocialLink(platform)}
                      style={{ background: "#e53e3e", color: "#fff", border: "none", padding: "8px 12px", borderRadius: "6px", cursor: "pointer", fontWeight: 500 }}
                    >
                      Remove
                    </button>
                  )}
                </div>
              );
            })}
            <button onClick={addSocialLink} style={{ background: "#3182ce", color: "#fff", border: "none", padding: "10px 16px", borderRadius: "6px", cursor: "pointer", fontWeight: 500, marginTop: "8px" }}>
              + Add Social Link
            </button>
          </section>

          {/* SUBMIT */}
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
              {loading ? "Updating…" : "Update Footer"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}