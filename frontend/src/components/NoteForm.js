import React, { useState, useEffect } from "react";
import axios from "axios";

function NoteForm({ fetchAllTags, onNoteAdded, editingNote, onUpdateNote }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tag, setTag] = useState("");

  useEffect(() => {
    if (editingNote) {
      setTitle(editingNote.title || "");
      setContent(editingNote.content || "");
      setTag(
        editingNote.tags && editingNote.tags.length > 0
          ? editingNote.tags[0].name
          : ""
      );
    } else {
      setTitle("");
      setContent("");
      setTag("");
    }
  }, [editingNote]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const noteData = { title, content, tags: tag ? [tag] : [] };
      if (editingNote) {
        await onUpdateNote(editingNote.id, noteData);
      } else {
        await axios.post("http://localhost:3001/notes", noteData);
        if (onNoteAdded) onNoteAdded();
      }
    } catch (error) {
      console.error("Error adding/updating note:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6 space-y-4">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        required
      />
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Content"
        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        required
      />
      <input
        type="text"
        value={tag}
        onChange={(e) => setTag(e.target.value)}
        placeholder="Tag (optional)"
        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        type="submit"
        className="w-full bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-200"
      >
        {editingNote ? "Update Note" : "Add Note"}
      </button>
    </form>
  );
}

export default NoteForm;
