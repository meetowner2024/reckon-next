"use client";
import { useEffect, useState } from "react";
import { Trash2, Plus, Loader2, X } from "lucide-react";

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

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch("/api/users/footer");
        const data = await res.json();
        setFooter({
          description: data.description ?? "",
          locations: data.locations ?? [],
          quickLinks: data.quickLinks ?? [],
          logo: data.logo ?? "",
          socialLinks: data.socialLinks ?? {
            facebook: "", twitter: "", instagram: "", linkedin: "",
          },
        });
        if (data.logo) setLogoPreview(data.logo);
      } catch {
        alert("Failed to load footer data");
      }
    }
    load();
  }, []);

  const handleLogo = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setLogoFile(file);
    const reader = new FileReader();
    reader.onloadend = () => setLogoPreview(reader.result);
    reader.readAsDataURL(file);
  };

  const clearLogo = () => {
    setLogoFile(null);
    setLogoPreview("");
    const el = document.getElementById("logo-upload");
    if (el) el.value = "";
  };

  const toBase64 = (file) =>
    new Promise((res, rej) => {
      const r = new FileReader();
      r.onload = () => res(r.result);
      r.onerror = rej;
      r.readAsDataURL(file);
    });

  const setField = (e) => {
    const { name, value } = e.target;
    if (name.startsWith("socialLinks.")) {
      const key = name.split(".")[1];
      setFooter(p => ({
        ...p,
        socialLinks: { ...p.socialLinks, [key]: value },
      }));
    } else {
      setFooter(p => ({ ...p, [name]: value }));
    }
  };

  const addLocation = () => setFooter(p => ({
    ...p,
    locations: [...p.locations, { type: "", address: "" }],
  }));

  const removeLocation = async (idx) => {
    if (!confirm("Delete this location?")) return;
    const key = `loc-${idx}`;
    setDeleting(d => ({ ...d, [key]: true }));
    try {
      const r = await fetch("/api/users/footer", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "locations", index: idx }),
      });
      if (!r.ok) throw new Error(await r.text());
      setFooter(p => ({
        ...p,
        locations: p.locations.filter((_, i) => i !== idx),
      }));
    } catch {
      alert("Failed to delete location");
    } finally {
      setDeleting(d => ({ ...d, [key]: false }));
    }
  };

  const setLoc = (idx, field, v) => {
    const copy = [...footer.locations];
    copy[idx][field] = v;
    setFooter(p => ({ ...p, locations: copy }));
  };

  const addQuickLink = () => setFooter(p => ({
    ...p,
    quickLinks: [...p.quickLinks, { title: "", url: "" }],
  }));

  const removeQuickLink = async (idx) => {
    if (!confirm("Delete this quick link?")) return;
    const key = `ql-${idx}`;
    setDeleting(d => ({ ...d, [key]: true }));
    try {
      const r = await fetch("/api/users/footer", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "quickLinks", index: idx }),
      });
      if (!r.ok) throw new Error(await r.text());
      setFooter(p => ({
        ...p,
        quickLinks: p.quickLinks.filter((_, i) => i !== idx),
      }));
    } catch {
      alert("Failed to delete quick link");
    } finally {
      setDeleting(d => ({ ...d, [key]: false }));
    }
  };

  const setQL = (idx, field, v) => {
    const copy = [...footer.quickLinks];
    copy[idx][field] = v;
    setFooter(p => ({ ...p, quickLinks: copy }));
  };

  const addSocial = () => setFooter(p => ({
    ...p,
    socialLinks: { ...p.socialLinks, "": "" },
  }));

  const removeSocial = async (platform) => {
    if (defaultPlatforms.includes(platform) && !confirm("Remove default platform?")) return;
    setFooter(p => {
      const { [platform]: _, ...rest } = p.socialLinks;
      return { ...p, socialLinks: rest };
    });
    try {
      await fetch("/api/users/footer", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "socialLinks", key: platform }),
      });
    } catch {
      console.warn("Social delete failed – will sync on save");
    }
  };

  const setSocial = (oldKey, field, v) => {
    if (field === "platform") {
      const trimmed = v.trim().toLowerCase();
      if (trimmed && Object.keys(footer.socialLinks).some(k => k.toLowerCase() === trimmed && k !== oldKey)) {
        alert("Platform already exists");
        return;
      }
    }
    setFooter(p => {
      const copy = { ...p.socialLinks };
      delete copy[oldKey];
      const newKey = field === "platform" ? v.trim() : oldKey;
      const newUrl = field === "url" ? v : copy[oldKey] ?? "";
      if (newKey) copy[newKey] = newUrl;
      return { ...p, socialLinks: copy };
    });
  };

  const save = async () => {
    setLoading(true);
    const payload = { ...footer };
    payload.quickLinks = payload.quickLinks.filter(l => l.title.trim() && l.url.trim());
    if (logoFile) {
      try {
        payload.logoBase64 = await toBase64(logoFile);
        delete payload.logo;
      } catch {
        alert("Failed to read logo file");
        setLoading(false);
        return;
      }
    }
    try {
      const r = await fetch("/api/users/footer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const res = await r.json();
      if (!r.ok) throw new Error(res.message ?? "Error");
      alert(res.message ?? "Footer updated!");
      const fresh = await (await fetch("/api/users/footer")).json();
      setFooter({
        description: fresh.description ?? "",
        locations: fresh.locations ?? [],
        quickLinks: fresh.quickLinks ?? [],
        logo: fresh.logo ?? "",
        socialLinks: fresh.socialLinks ?? {
          facebook: "", twitter: "", instagram: "", linkedin: "",
        },
      });
      if (logoFile) {
        setLogoPreview(fresh.logo);
        clearLogo();
      }
    } catch (e) {
      alert(e.message ?? "Failed to update footer");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 font-sans">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
        <div className="p-8 border-b border-gray-200">
          <h2 className="text-2xl text-center font-bold text-[#48ADB9]">Footer Admin Panel</h2>
        </div>

        <div className="p-8 space-y-10">

          <section>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Logo</label>
            {(logoPreview || footer.logo) && (
              <div className="relative inline-block mb-4">
                <img
                  src={logoPreview || footer.logo}
                  alt="Logo"
                  className="h-20 w-auto border-2 border-gray-500 rounded-lg object-contain bg-white"
                />
                <button
                  onClick={clearLogo}
                  className="absolute -top-2 cursor-pointer -right-2 bg-red-500 text-white rounded-full p-1 shadow-md hover:bg-red-600 transition"
                  title="Remove logo"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            )}
            <input
              id="logo-upload"
              type="file"
              accept="image/png,image/jpeg,image/svg+xml,image/webp"
              onChange={handleLogo}
              className="block w-full cursor-pointer text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-medium file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            />
            <p className="mt-1 text-xs text-gray-500">Recommended: 200×60px, PNG or SVG</p>
          </section>

          <section>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Description</label>
            <textarea
              name="description"
              value={footer.description}
              onChange={setField}
              placeholder="Footer description..."
              rows={3}
              className="w-full p-3 border border-gray-500 rounded-lg focus:ring-2  outline-none resize-none"
            />
          </section>

          <section>
            <h4 className="text-lg font-semibold text-gray-800 mb-4">Locations</h4>
            {footer.locations.map((loc, i) => (
              <div key={i} className="flex gap-3 items-center p-3 mb-3 border border-gray-200 rounded-lg bg-gray-50">
                <input
                  type="text"
                  placeholder="Type (e.g. PLANT LOCATION)"
                  value={loc.type}
                  onChange={e => setLoc(i, "type", e.target.value)}
                  className="flex-1 p-2 border border-gray-500 rounded-md focus:ring-2  outline-none"
                />
                <input
                  type="text"
                  placeholder="Address"
                  value={loc.address}
                  onChange={e => setLoc(i, "address", e.target.value)}
                  className="flex-[2] p-2 border border-gray-500 rounded-md focus:ring-2  outline-none"
                />
                <button
                  onClick={() => removeLocation(i)}
                  disabled={deleting[`loc-${i}`]}
                  className={`flex items-center cursor-pointer gap-1 px-3 py-2 rounded-md text-white font-medium transition ${
                    deleting[`loc-${i}`] ? "bg-gray-400 cursor-not-allowed" : "bg-red-500 hover:bg-red-600"
                  }`}
                >
                  {deleting[`loc-${i}`] ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
                  Remove
                </button>
              </div>
            ))}
            <button
              onClick={addLocation}
              className="flex items-center gap-2 px-4 py-2  hover:bg-[#48ADB9]  bg-[#48a5af] cursor-pointer text-white rounded-md  transition"
            >
              <Plus className="w-4 h-4" />
              Add Location
            </button>
          </section>

          <section>
            <h4 className="text-lg font-semibold text-gray-800 mb-4">Quick Links</h4>
            {footer.quickLinks.map((link, i) => (
              <div key={i} className="flex gap-3 items-center p-3 mb-3 border border-gray-200 rounded-lg bg-gray-50">
                <input
                  type="text"
                  placeholder="Link text"
                  value={link.title}
                  onChange={e => setQL(i, "title", e.target.value)}
                  className="flex-1 p-2 border border-gray-500 rounded-md focus:ring-2  outline-none"
                />
                <input
                  type="url"
                  placeholder="https://..."
                  value={link.url}
                  onChange={e => setQL(i, "url", e.target.value)}
                  className="flex-[2] p-2 border border-gray-500 rounded-md focus:ring-2  outline-none"
                />
                <button
                  onClick={() => removeQuickLink(i)}
                  disabled={deleting[`ql-${i}`]}
                  className={`flex items-center cursor-pointer gap-1 px-3 py-2 rounded-md text-white font-medium transition ${
                    deleting[`ql-${i}`] ? "bg-gray-400 cursor-not-allowed" : "bg-red-500 hover:bg-red-600"
                  }`}
                >
                  {deleting[`ql-${i}`] ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
                  Remove
                </button>
              </div>
            ))}
            <button
              onClick={addQuickLink}
              className="flex items-center gap-2 px-4 py-2 bg-[#48ADB9] cursor-pointer text-white rounded-md hover:bg-[#48a5af] transition"
            >
              <Plus className="w-4 h-4" />
              Add Quick Link
            </button>
            {footer.quickLinks.some(l => l.title.trim() && l.url.trim()) && (
              <div className="mt-5 p-4 bg-gray-100 rounded-lg border border-dashed border-gray-500">
                <strong className="block mb-2 text-gray-700">Preview:</strong>
                <ul className="list-disc list-inside space-y-1">
                  {footer.quickLinks
                    .filter(l => l.title.trim() && l.url.trim())
                    .map((l, i) => (
                      <li key={i}>
                        <a href={l.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                          {l.title}
                        </a>
                      </li>
                    ))}
                </ul>
              </div>
            )}
          </section>

          <section>
            <h4 className="text-lg font-semibold text-gray-800 mb-4">Social Media Links</h4>
            {Object.entries(footer.socialLinks).map(([plat, url], i) => {
              const isDefault = defaultPlatforms.includes(plat);
              const isEmpty = plat === "";
              return (
                <div key={i} className="flex gap-3 items-center mb-3">
                  <input
                    type="text"
                    placeholder={isDefault ? plat : "Platform"}
                    value={plat}
                    onChange={e => setSocial(plat, "platform", e.target.value)}
                    disabled={isDefault}
                    className={`w-36 p-2 border rounded-md focus:ring-2  outline-none ${
                      isDefault ? "bg-gray-100 cursor-not-allowed" : "bg-white"
                    }`}
                    title={isDefault ? "Default – cannot rename" : ""}
                  />
                  <input
                    type="url"
                    placeholder="https://..."
                    value={url}
                    onChange={e => setSocial(plat, "url", e.target.value)}
                    className="flex-1 p-2 border border-gray-500 rounded-md focus:ring-2  outline-none"
                  />
                  {!isEmpty && (
                    <button
                      onClick={() => removeSocial(plat)}
                      className="flex cursor-pointer items-center gap-1 px-3 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
                    >
                      <Trash2 className="w-4 h-4" />
                      Remove
                    </button>
                  )}
                </div>
              );
            })}
            <button
              onClick={addSocial}
              className="flex items-center gap-2 px-4 py-2 bg-[#48a5af] cursor-pointer hover:bg-[#48a5af] text-white rounded-md transition mt-2"
            >
              <Plus className="w-4 h-4" />
              Add Social Media Link
            </button>
          </section>

          <div className="text-center pt-4 border-t border-gray-200">
            <button
              onClick={save}
              disabled={loading}
              className={`inline-flex cursor-pointer  items-center gap-2 px-8 py-3 rounded-lg font-semibold transition ${
                loading ? "bg-gray-400 cursor-not-allowed" : "bg-[#48ADB9] hover:bg-[#48a5af] text-white"
              }`}
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Updating…
                </>
              ) : (
                "Update Footer"
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}