"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

export default function HeaderForm() {
  const [logo, setLogo] = useState(null);
  const [preview, setPreview] = useState(null);
  const [existingLogoName, setExistingLogoName] = useState(null);
  const [phone, setPhone] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchHeader = async () => {
      try {
        const res = await fetch("/api/users/header/getHeader");
        if (!res.ok) return;
        const data = await res.json();

        setPhone(data.phone || "");
        if (data.logo) {
          const fullPath = `/uploads/${data.logo}`;
          setPreview(fullPath);
          const filename = data.logo
            .split("/")
            .pop()
            ?.split("-")
            .slice(1)
            .join("-");
          setExistingLogoName(filename || "logo.png");
        }
      } catch (err) {
        console.error("Failed to load header:", err);
      }
    };

    fetchHeader();
  }, []);

  const handleFileChange = (e) => {
    const file = e.target.files?.[0] || null;
    setLogo(file);
    if (file) {
      setPreview(URL.createObjectURL(file));
      setExistingLogoName(null);
    }
  };

  const removeLogo = () => {
    setLogo(null);
    setPreview(null);
    setExistingLogoName(null);
  };

  const validatePhone = (value) => {
    const cleaned = value.trim();
    const phoneRegex = /^(\+91)?[6-9]\d{9}$/;
    if (!phoneRegex.test(cleaned)) {
      setPhoneError(
        "Enter a valid 10-digit mobile number (with or without +91)."
      );
    } else {
      setPhoneError("");
    }
  };

  const handlePhoneChange = (e) => {
    const value = e.target.value;
    setPhone(value);
    validatePhone(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (phoneError || !phone) {
      setMessage("Please enter a valid phone number.");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const formData = new FormData();
      if (logo) formData.append("logo", logo);
      formData.append("phone", phone);
      if (!preview && existingLogoName) formData.append("removeLogo", "true");

      const res = await fetch("/api/users/header/updateHeader", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (res.ok) {
        setMessage(data.message || "Header updated successfully");
        if (data.logo) {
          setPreview(`/uploads/${data.logo}`);
          const filename = data.logo
            .split("/")
            .pop()
            ?.split("-")
            .slice(1)
            .join("-");
          setExistingLogoName(filename || "logo.png");
        } else {
          setExistingLogoName(null);
        }
        setLogo(null);
      } else {
        setMessage(data.message || "Update failed");
      }
    } catch (err) {
      console.error("Error submitting form:", err);
      setMessage("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-10 p-8 rounded-xl shadow-lg bg-[#48ADB9] text-white">
      <h2 className="text-2xl font-bold mb-6 text-center">Update Header</h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="flex flex-col items-center">
          {preview ? (
            <div className="relative w-48 h-48 mb-3">
              <Image
                src={preview}
                alt="Logo Preview"
                fill
                className="object-contain rounded-lg border-2 border-white p-2 bg-white"
              />
              <button
                type="button"
                onClick={removeLogo}
                className="absolute -top-3 -right-3 bg-red-500 text-white rounded-full w-7 h-7 flex items-center justify-center font-bold shadow-md hover:bg-red-600 transition"
              >
                ×
              </button>
            </div>
          ) : (
            <p className="text-white text-sm mb-2">No logo uploaded</p>
          )}

          {existingLogoName && !logo && (
            <p className="text-sm text-white mb-2 italic">
              Current: <span className="font-medium">{existingLogoName}</span>
            </p>
          )}

          {logo && (
            <p className="text-sm text-white mb-2 italic">
              Selected: <span className="font-medium">{logo.name}</span>
            </p>
          )}

          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="w-full border-2 border-white rounded-md p-2 text-black bg-white file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-white file:text-[#48ADB9] hover:file:bg-gray-100"
          />
        </div>
        <div>
          <label className="block mb-2 font-semibold">Phone Number</label>
          <input
            type="text"
            value={phone}
            onChange={handlePhoneChange}
            placeholder="e.g. +919876543210 or 9876543210"
            className={`w-full p-3 rounded-md border-2 text-black font-medium ${
              phoneError ? "border-red-500" : "border-white"
            }`}
          />
          {phoneError && (
            <p className="text-sm text-red-200 mt-1">{phoneError}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={loading || phoneError}
          className="w-full bg-white text-[#48ADB9] p-3 rounded-md font-bold hover:bg-gray-100 disabled:opacity-60 transition"
        >
          {loading ? "Updating..." : "Update Header"}
        </button>
      </form>

      {message && (
        <p
          className={`mt-4 text-center font-semibold ${
            message.toLowerCase().includes("success")
              ? "text-green-300"
              : "text-red-300"
          }`}
        >
          {message}
        </p>
      )}
    </div>
  );
}
