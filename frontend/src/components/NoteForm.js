import React, { useState } from "react";
import axios from "axios";

// Component for creating and submitting a new note with tagging
const NoteForm = ({ fetchAllTags }) => {
  const [title, setTitle] = useState(""); // Manages the title input state
  const [content, setContent] = useState(""); // Manages the content input state
  const [tag, setTag] = useState(""); // Manages the tag input state

  const handleSubmit = async (e) => {
    // Handles form submission, preventing default behavior
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3001/notes", {
        title,
        content,
        createdAt: new Date(),
      });
      if (tag) {
        await axios.patch(
          `http://localhost:3001/notes/${response.data.id}/tags`,
          { tagName: tag }
        );
      }
      // Re-fetch notes and update tags in App.js
      await axios.get("http://localhost:3001/notes");
      if (fetchAllTags) {
        await fetchAllTags(); // Trigger tag update in App.js
      }
      setTitle(""); // Resets title input after submission
      setContent(""); // Resets content input after submission
      setTag(""); // Resets tag input after submission
    } catch (error) {
      console.error("Error adding note or tag:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="grid gap-4 mb-6">
      {/* Title Input */}
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
        className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      {/* Content Textarea */}
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Content"
        className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 h-24 resize-none"
      />
      {/* Tag Input */}
      <input
        value={tag}
        onChange={(e) => setTag(e.target.value)}
        placeholder="Tag"
        className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      {/* Submit Button */}
      <button
        type="submit"
        className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition duration-200"
      >
        Add Note
      </button>
    </form>
  );
};

export default NoteForm; // Exports the NoteForm component
