import { useState, useEffect } from "react";
import Note from "./components/Note";

import axios from "axios";

export default function App() {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState("a new note ...");
  const [showAll, setShowAll] = useState(true);

  useEffect(() => {
    axios.get("http://localhost:3001/notes").then(response => {
      setNotes(response.data)
    })
  }, [])

  const addNote = e => {
    e.preventDefault();

    const noteObject = {
      content: newNote,
      date: new Date().toISOString(),
      important: Math.random() < 0.5,
      id: notes.length + 1
    }

    axios.post("http://localhost:3001/notes", noteObject).then(res =>
      setNotes([...notes, res.data])
    )
    setNewNote("");
  }

  const handleNoteChange = (event) => {
    setNewNote(event.target.value);
  }

  const noteToShow = showAll ? notes : notes.filter(note => note.important === true);

  return (
    <div>
      <h1>Notes</h1>
      <div><button onClick={() => setShowAll(!showAll)}> show {showAll ? "important" : "all"}</button></div>

      <ul>
        {noteToShow.map(note => <Note key={note.id} note={note} />)}
      </ul>


      <form onSubmit={addNote}>
        <input value={newNote} onChange={handleNoteChange} />
        <button type="submit">save</button>
      </form>
    </div>
  )
}
