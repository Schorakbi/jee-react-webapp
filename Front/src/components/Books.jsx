import { Link } from "react-router-dom"
import React from "react";
export default function Books() {
    const [data, setData] = React.useState([]);
    async function fetchBooks() {
        try {
          const response = await fetch("http://localhost:8080/BiblioWEB/ouvrage/liste");
          const data = await response.json();
    
          setData(data);
        } catch (error) {
          console.error("Error fetching books:", error.message);
        }
      }
      React.useEffect(() => {
        fetchBooks();
      }, []);
      async function handleDelete (id) {
        try {
          const response = await fetch(`http://localhost:8080/BiblioWEB/ouvrage/supprimer/${id}`, {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
          });
      
          if (response.ok) {
            setData((prevData) => prevData.filter((value) => value.id !== id));
            console.log("Book deleted successfully!");
          } else {
            console.error("Error deleting user:", response.statusText);
          }
        } catch (error) {
          console.error("Fetch error:", error.message);
        }
      };
    return(
        <>
            <div className="main-menu-container"><Link to="/" className="main-menu-link"><i className="fa-solid fa-arrow-left"></i>  Retour au menu principale</Link></div>
            <div className="container">
            <div className="table-title">
        <h2>Gérer les <b>Ouvrages</b></h2>
        <Link to="/addBook" className="btn">
          <i className="fa-solid fa-plus"></i> <span>Ajouter Un Nouveau Ouvrage</span>
        </Link>
      </div>
      <table className="rwd-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Type</th>
            <th>Titre</th>
            <th>Date de Création</th>
            <th>Disponibilité</th>
            <th>Editeur</th>
            <th>Duree</th>
            <th>Auteur</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((book) => (
            <tr key={book.id}>
              <td data-th="#">{book.id}</td>
              <td data-th="Type">{book.typeOuvrage}</td>
              <td data-th="Titre">{book.titre}</td>
              <td data-th="Date de Création">{book.dateDeCreation}</td>
              <td data-th="Disponibilité">{book.disponible ? "Oui" : "Non"}</td>
              <td data-th="Editeur">{book.editeur ? book.editeur : "N/A" }</td>
              <td data-th="Duree">{book.duree ? book.duree : "N/A" }</td>
              <td data-th="Auteur">{book.auteur ? book.auteur : "N/A" }</td>
              <td><div  className="actions-row">
              <Link to={`editBook/${book.id}`} className="button primary edit" href="#main"></Link>
              <button onClick={() =>handleDelete(book.id)} className="button primary delete" href="#main"></button>
              </div></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
        </>
    )
}