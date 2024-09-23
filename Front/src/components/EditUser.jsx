import React from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
export default function EditUser() {
  const { id } = useParams();
  const [name, setName] = React.useState("");
  const [identity, setIdentity] = React.useState("");
    
  React.useEffect(() => {
    fetch(`http://localhost:8080/BiblioWEB/abonne/rechercher/${id}`)
      .then(response => response.json())
      .then(data => {
        setName(data.nom || "");
        setIdentity(data.numeroIdentite || "");
      })
      .catch(error => {
        console.error("Error fetching user data:", error.message);
      });
  }, [id]);

  const handleSend = async () => {
    try {
      const updatedUser = {
        nom: name,
        numeroIdentite: identity,
        numeroAbonnement : id
      };

      const response = await fetch("http://localhost:8080/BiblioWEB/abonne/update", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(updatedUser)
      });

      if (response.ok) {
        console.log("User updated successfully!");
      } else {
        console.error("Error updating user:", response.statusText);
      }
    } catch (error) {
      console.error("Fetch error:", error.message);
    }
  };

  return (
    <>
      <div className="main-menu-container"><Link to="/usersList" className="main-menu-link"><i className="fa-solid fa-arrow-left"></i>  Retour au menu des Abonnés</Link></div>
    <div className="card">
      <h2>
      <i className="fa-solid fa-user-pen"></i>Abonné
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
        <button onClick={handleSend}>Envoyer</button>
        <button type="reset" onClick={() => { setName(""); setIdentity(""); }}>
        Réinitialiser
        </button>
      </div>
    </div>
    </>
  );
}
