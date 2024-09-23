import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function AddBook() {
  const [title, setTitle] = useState("");
  const [creationDate, setCreationDate] = useState("");
  const [author, setAuthor] = useState("");
  const [publisher, setPublisher] = useState("");
  const [duration, setDuration] = useState("");
  const [selectedType, setSelectedType] = useState("Ouvrage");

  async function handleSend() {
    const bookObject = {
      titre: title,
      dateDeCreation: creationDate,
      auteur: author,
      editeur: publisher,
      duree: duration,
      typeOuvrage: selectedType
    };

    try {
      const response = await fetch(`http://localhost:8080/BiblioWEB/ouvrage/ajouter${selectedType}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(bookObject)
      });

      if (response.ok) {
        console.log("Book added successfully!");
      } else {
        console.error("Error adding book:", response.statusText);
      }
    } catch (error) {
      console.error("Fetch error:", error.message);
    }

    // Reset form fields
    setTitle("");
    setCreationDate("");
    setAuthor("");
    setPublisher("");
    setDuration("");
    setSelectedType("Ouvrage");
  }

  return (
    <>
      <div className="main-menu-container">
        <Link to="/booksList" className="main-menu-link">
          <i className="fa-solid fa-arrow-left"></i> Retour au menu des Ouvrages
        </Link>
      </div>
      <div className="card">
        <h2>
          <i className="fa-solid fa-book-plus"></i> Ajouter un Ouvrage
        </h2>
        <div className="select-container">
            <span className="">Type d'Ouvrage :</span>
            <div className="select">
                
                    
                    <select
                        name="typeOuvrage"
                        value={selectedType}
                        onChange={(e) => setSelectedType(e.target.value)}
                    >
                        
                            <option value="Ouvrage">Ouvrage</option>
                            <option value="Livre">Livre</option>
                            <option value="Video">Video</option>
                        
                    </select>
                
            </div>
        </div>
        <label className="input">
          <input
            className="input__field"
            type="text"
            placeholder=" "
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <span className="input__label">Titre :</span>
        </label>
        <label className="input">
          <input
            className="input__field"
            type="text"
            placeholder=" "
            value={creationDate}
            onChange={(e) => setCreationDate(e.target.value)}
          />
          <span className="input__label">Date de Création :</span>
        </label>

        {selectedType === "Livre" && (
          <label className="input">
            <input
              className="input__field"
              type="text"
              placeholder=" "
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
            />
            <span className="input__label">Auteur :</span>
          </label>
        )}

        {selectedType === "Video" && (
          <>
            <label className="input">
              <input
                className="input__field"
                type="text"
                placeholder=" "
                value={publisher}
                onChange={(e) => setPublisher(e.target.value)}
              />
              <span className="input__label">Editeur :</span>
            </label>
            <label className="input">
              <input
                className="input__field"
                type="text"
                placeholder=" "
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
              />
              <span className="input__label">Durée :</span>
            </label>
          </>
        )}

        <div className="button-group">
          <button onClick={handleSend}>Ajouter</button>
          <button
            type="reset"
            onClick={() => {
              setTitle("");
              setCreationDate("");
              setAuthor("");
              setPublisher("");
              setDuration("");
              setSelectedType("Ouvrage");
            }}
          >
            Réinitialiser
          </button>
        </div>
      </div>
    </>
  );
}
