import React, { useEffect, useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";
import { onenote } from "../../../declarations/onenote";

function App() {
  const [notes, setNotes] = useState([]);

  function addNote(newNote) {
    setNotes(prevNotes => {
      onenote.createNote(newNote.title, newNote.content);
      return [newNote, ...prevNotes];
    });
  }

  // always quite the enless loop of useEffect with the array [] 
  // and tell it how many times it should be executed in every trigger or re-rendering
  useEffect(() => {
    console.log("useEffect is triggered");
    fetchData();
  }, []);

  async function fetchData() {
    const notesArray = await onenote.readNote();
    setNotes(notesArray);
  }


  function deleteNote(id) {
    onenote.removeNote(id);
    setNotes(prevNotes => {
      return prevNotes.filter((noteItem, index) => {
        return index !== id;

      });
    });
  }

  return (
    <div>
      <Header />
      <CreateArea onAdd={addNote} />
      {notes.map((noteItem, index) => {
        return (
          <Note
            key={index}
            id={index}
            title={noteItem.title}
            content={noteItem.content}
            onDelete={deleteNote}
          />
        );
      })}
      <Footer />
    </div>
  );
}

export default App;
