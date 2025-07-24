import React, { useState, useEffect, useCallback, useRef } from "react";
import axios from "axios";
import NoteForm from "./components/NoteForm";

function App() {
  const [notes, setNotes] = useState([]);
  const [filterTag, setFilterTag] = useState("");
  const [allTags, setAllTags] = useState([]);
  const fetchAllTagsRef = useRef(null);

  const fetchNotes = useCallback(async () => {
    try {
      const url = filterTag
        ? `http://localhost:3001/notes/tag/${filterTag}`
        : "http://localhost:3001/notes";
      const response = await axios.get(url);
      setNotes(response.data);
    } catch (error) {
      console.error("Error fetching notes:", error);
    }
  }, [filterTag]);

  const fetchAllTags = useCallback(async () => {
    try {
      const response = await axios.get("http://localhost:3001/notes");
      const tags = response.data.flatMap((note) =>
        note.tags && Array.isArray(note.tags)
          ? note.tags.map((t) => t.name)
          : []
      );
      setAllTags([...new Set(tags)]);
    } catch (error) {
      console.error("Error fetching tags:", error);
    }
  }, []);

  const deleteNote = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/notes/${id}`);
      setNotes(notes.filter((note) => note.id !== id)); // Update state to remove the deleted note
      await fetchAllTags(); // Refresh tags after deletion
    } catch (error) {
      console.error("Error deleting note:", error);
    }
  };

  useEffect(() => {
    fetchNotes();
    fetchAllTags();
  }, [fetchNotes, fetchAllTags]);

  useEffect(() => {
    fetchAllTagsRef.current = fetchAllTags;
  }, [fetchAllTags]);

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          Note App
        </h1>
        <NoteForm fetchAllTags={fetchAllTagsRef.current} />
        <div className="flex space-x-4 mb-6">
          <select
            value={filterTag}
            onChange={(e) => setFilterTag(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All Notes</option>
            {allTags.map((tag) => (
              <option key={tag} value={tag}>
                {tag}
              </option>
            ))}
          </select>
          <button
            onClick={fetchNotes}
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-200"
          >
            Filter
          </button>
        </div>
        <ul className="space-y-4">
          {notes.map((note) => (
            <li
              key={note.id}
              className="bg-gray-50 p-4 rounded-md border border-gray-200 hover:bg-gray-100 transition duration-200 flex justify-between items-center"
            >
              <div>
                <div className="text-lg font-medium text-gray-700">
                  {note.title}
                </div>
                <div className="text-gray-600">{note.content}</div>
                <div className="text-sm text-gray-500">
                  {note.tags && Array.isArray(note.tags)
                    ? note.tags.map((t) => t.name).join(", ")
                    : ""}
                </div>
              </div>
              <button
                onClick={() => deleteNote(note.id)}
                className="bg-gray-400 text-white px-2 py-1 rounded-md hover:bg-red-400 transition duration-200 mt-2"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
