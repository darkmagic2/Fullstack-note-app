import React, { useState, useEffect, useCallback, useRef } from "react";
import axios from "axios";
import NoteForm from "./components/NoteForm";

function App() {
  const [notes, setNotes] = useState([]);
  const [filterTag, setFilterTag] = useState("");
  const [showArchived, setShowArchived] = useState(false);
  const [allTags, setAllTags] = useState([]);
  const [editingNote, setEditingNote] = useState(null);
  const fetchAllTagsRef = useRef(null);

  const fetchNotes = useCallback(async () => {
    try {
      const url = filterTag
        ? `http://localhost:3001/notes/tag/${filterTag}`
        : showArchived
        ? `http://localhost:3001/notes/archived`
        : `http://localhost:3001/notes`;
      const response = await axios.get(url);
      setNotes(response.data);
    } catch (error) {
      console.error("Error fetching notes:", error);
    }
  }, [filterTag, showArchived]);

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

  const archiveNote = async (id) => {
    try {
      setNotes((prevNotes) => prevNotes.filter((note) => note.id !== id));
      await axios.patch(`http://localhost:3001/notes/${id}/archive`);
      await fetchAllTags();
    } catch (error) {
      console.error("Error archiving note:", error);
      fetchNotes();
    }
  };

  const unarchiveNote = async (id) => {
    try {
      await axios.patch(`http://localhost:3001/notes/${id}/unarchive`);
      if (showArchived) fetchNotes();
      await fetchAllTags();
    } catch (error) {
      console.error("Error unarchiving note:", error);
      fetchNotes();
    }
  };

  const deleteNote = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/notes/${id}`);
      setNotes(notes.filter((note) => note.id !== id));
      await fetchAllTags();
    } catch (error) {
      console.error("Error deleting note:", error);
    }
  };

  const updateNote = async (id, updatedNote) => {
    try {
      await axios.patch(`http://localhost:3001/notes/${id}`, updatedNote);
      setEditingNote(null);
      fetchNotes();
      await fetchAllTags();
    } catch (error) {
      console.error("Error updating note:", error);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, [fetchNotes, showArchived]);

  useEffect(() => {
    fetchAllTagsRef.current = fetchAllTags;
  }, [fetchAllTags]);

  const handleNoteAdded = () => {
    window.location.reload();
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          Note App
        </h1>
        <NoteForm
          fetchAllTags={fetchAllTagsRef.current}
          onNoteAdded={handleNoteAdded}
          editingNote={editingNote}
          onUpdateNote={updateNote}
        />
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
          <button
            onClick={() => setShowArchived(!showArchived)}
            className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 transition duration-200"
          >
            {showArchived ? "Show Active" : "Show Archived"}
          </button>
        </div>
        <ul className="space-y-4">
          {notes.map((note) => (
            <li
              key={note.id}
              className="bg-gray-50 p-4 rounded-md border border-gray-200 hover:bg-gray-100 transition duration-200 flex justify-between items-center gap-2"
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
              <div className="flex space-x-2">
                {!note.archived && (
                  <button
                    onClick={() => archiveNote(note.id)}
                    className="bg-yellow-500 text-white px-3 py-1 rounded-md hover:bg-yellow-600 transition duration-200 text-sm"
                  >
                    Archive
                  </button>
                )}
                {note.archived && (
                  <button
                    onClick={() => unarchiveNote(note.id)}
                    className="bg-green-500 text-white px-3 py-1 rounded-md hover:bg-green-600 transition duration-200 text-sm"
                  >
                    Unarchive
                  </button>
                )}
                <button
                  onClick={() => deleteNote(note.id)}
                  className="bg-red-300 text-white px-3 py-1 rounded-md hover:bg-red-400 transition duration-200 mt-2 text-sm"
                >
                  Delete
                </button>
                <button
                  onClick={() => setEditingNote(note)}
                  className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600 transition duration-200 text-sm"
                >
                  Edit
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
