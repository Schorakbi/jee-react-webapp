import React from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

export default function EditOuvrage() {
  const { id } = useParams();
  const [ouvrage, setOuvrage] = React.useState({
    titre: "",
    dateDeCreation: "",
    editeur: "",
    duree: "",
    auteur: "",
    typeOuvrage: "",
  });

  React.useEffect(() => {
    fetch(`http://localhost:8080/BiblioWEB/ouvrage/rechercher/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setOuvrage({
            id : id,
          titre: data.titre || "",
          dateDeCreation: data.dateDeCreation || "",
          editeur: data.editeur || "",
          duree: data.duree || "",
          auteur: data.auteur || "",
          typeOuvrage: data.typeOuvrage,
        });
      })
      .catch((error) => {
        console.error("Error fetching ouvrage data:", error.message);
      });
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setOuvrage((prevOuvrage) => ({ ...prevOuvrage, [name]: value }));
  };

  const handleSend = async () => {
    try {
      const response = await fetch(`http://localhost:8080/BiblioWEB/ouvrage/update${ouvrage.typeOuvrage}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(ouvrage),
      });

      if (response.ok) {
        console.log("Ouvrage updated successfully!");
      } else {
        console.error("Error updating ouvrage:", response.statusText);
      }
    } catch (error) {
      console.error("Fetch error:", error.message);
    }
  };
  return (
    <>
      <div className="main-menu-container">
        <Link to="/booksList" className="main-menu-link">
          <i className="fa-solid fa-arrow-left"></i> Retour au menu des Ouvrages
        </Link>
      </div>
      <div className="card">
        <h2>
          <i className="fa-solid fa-pen"></i> Modifier {ouvrage.typeOuvrage==="Ouvrage" ?  "Ouvrage" :  ouvrage.typeOuvrage==="Livre" ?  "Le Livre" : "La Video"}
        </h2>
        <label className="input">
          <input
            className="input__field"
            type="text"
            placeholder=" "
            name="titre"
            value={ouvrage.titre}
            onChange={handleInputChange}
          />
          <span className="input__label">Titre :</span>
        </label>
        <label className="input">
          <input
            className="input__field"
            type="text"
            placeholder=" "
            name="dateDeCreation"
            value={ouvrage.dateDeCreation}
            onChange={handleInputChange}
          />
          <span className="input__label">Date de Création :</span>
        </label>
        {ouvrage.typeOuvrage === "Livre" && (
          <label className="input">
            <input
              className="input__field"
              type="text"
              placeholder=" "
              name="auteur"
              value={ouvrage.auteur}
              onChange={handleInputChange}
            />
            <span className="input__label">Auteur :</span>
          </label>
        )}

        {ouvrage.typeOuvrage === "Video" && (
          <>
            <label className="input">
              <input
                className="input__field"
                type="text"
                placeholder=" "
                name="editeur"
                value={ouvrage.editeur}
                onChange={handleInputChange}
              />
              <span className="input__label">Editeur :</span>
            </label>
            <label className="input">
              <input
                className="input__field"
                type="text"
                placeholder=" "
                name="duree"
                value={ouvrage.duree}
                onChange={handleInputChange}
              />
              <span className="input__label">Durée :</span>
            </label>
          </>
        )}

        <div className="button-group">
          <button onClick={handleSend}>Envoyer</button>
          <button
            type="reset"
            onClick={() => {
              setOuvrage({
                titre: "",
                dateDeCreation: "",
                editeur: "",
                duree: "",
                auteur: "",
                typeOuvrage: ouvrage.typeOuvrage,
              });
            }}
          >
            Réinitialiser
          </button>
        </div>
      </div>
    </>
  );
}
