import React from "react";
import { Link } from "react-router-dom";
export default function AddUser() {
  const [name, setName] = React.useState("");
  const [identity, setIdentity] = React.useState("");

  async function handleSend() {
    if (name && identity) {
      const userObject = {
        nom: name,
        numeroIdentite: identity
      };

      try {
        const response = await fetch("http://localhost:8080/BiblioWEB/abonne/ajouter", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(userObject)
        });

        if (response.ok) {
          console.log("User added successfully!");
        } else {
          console.error("Error adding user:", response.statusText);
        }
      } catch (error) {
        console.error("Fetch error:", error.message);
      }
      setName("");
      setIdentity("");
    }
  }

  return (
    <>
    <div className="main-menu-container"><Link to="/usersList" className="main-menu-link"><i className="fa-solid fa-arrow-left"></i>  Retour au menu des Abonnés</Link></div>
      <div className="card">
      <h2>
        <i className="fa-solid fa-user-plus"></i>Abonné
      </h2>
      <label className="input">
        <input
          className="input__field"
          type="text"
          placeholder=" "
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <span className="input__label">Nom :</span>
      </label>
      <label className="input">
        <input
          className="input__field"
          type="text"
          placeholder=" "
          value={identity}
          onChange={(e) => setIdentity(e.target.value)}
        />
        <span className="input__label">Identité :</span>
      </label>
      <div className="button-group">
        <button onClick={handleSend}>Ajouter</button>
        <button type="reset" onClick={() => { setName(""); setIdentity(""); }}>
        Réinitialiser
        </button>
      </div>
    </div>
    </>
  );
}
