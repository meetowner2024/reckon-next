// components/CardItem.js
"use client";

import { useState } from "react";
import { Edit2, Trash2, Save, X } from "lucide-react";
import Image from "next/image";

export default function CardItem({ card, index, onDelete, onUpdate }) {
  const [editing, setEditing] = useState(false);
  const [title, setTitle] = useState(card.title);
  const [description, setDescription] = useState(card.description);
  const [image, setImage] = useState(null);
  const [msg, setMsg] = useState("");

  const handleUpdate = async () => {
    const form = new FormData();
    form.append("type", "card");
    form.append("index", index);
    form.append("title", title);
    form.append("description", description);
    if (image) form.append("image", image);

    const res = await fetch("/api/about/company", { method: "PUT", body: form });
    const data = await res.json();
    setMsg(data.message || data.error);
    if (res.ok) {
      onUpdate();
      setEditing(false);
    }
  };

  if (editing) {
    return (
      <div className="p-4 border rounded space-y-3 bg-yellow-50">
        <input value={title} onChange={(e) => setTitle(e.target.value)} className="w-full p-2 border rounded" />
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={3} className="w-full p-2 border rounded" />
        <input type="file" accept="image/*" onChange={(e) => setImage(e.target.files[0] || null)} className="block" />
        {image && <p className="text-sm text-green-600">{image.name}</p>}
        <div className="flex gap-2">
          <button onClick={handleUpdate} className="flex items-center gap-1 px-3 py-1 bg-green-600 text-white rounded text-sm">
            <Save size={16} /> Save
          </button>
          <button onClick={() => setEditing(false)} className="flex items-center gap-1 px-3 py-1 bg-gray-600 text-white rounded text-sm">
            <X size={16} /> Cancel
          </button>
        </div>
        {msg && <p className="text-sm">{msg}</p>}
      </div>
    );
  }

  return (
    <div className="p-4 border rounded flex justify-between items-start bg-white">
      <div className="flex gap-3">
        {card.image && (
          <div className="w-20 h-20 border rounded overflow-hidden">
            <Image src={card.image} alt="Card" width={80} height={80} className="object-cover" />
          </div>
        )}
        <div>
          <h4 className="font-semibold">{card.title}</h4>
          <p className="text-sm text-gray-600">{card.description}</p>
        </div>
      </div>
      <div className="flex gap-2">
        <button onClick={() => setEditing(true)} className="text-blue-600 hover:text-blue-800">
          <Edit2 size={18} />
        </button>
        <button onClick={() => onDelete(index)} className="text-red-600 hover:text-red-800">
          <Trash2 size={18} />
        </button>
      </div>
    </div>
  );
}