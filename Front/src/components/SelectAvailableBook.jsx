import React from "react";
import {useParams,Link,useNavigate } from "react-router-dom"
export default function SelectAvailableBook() {
  const [data, setData] = React.useState([]);
  const [selectedBook, setSelectedBook] = React.useState(null);
  const params = useParams();
  const navigate = useNavigate();
  async function fetchAvailableBooks() {
    try {
      const response = await fetch("http://localhost:8080/BiblioWEB/ouvrage/liste");
      const data = await response.json();
      const availableBooks = data.filter((ouvrage) => ouvrage.disponible);

      setData(availableBooks);
    } catch (error) {
      console.error("Error fetching books:", error.message);
    }
  }

  React.useEffect(() => {
    fetchAvailableBooks();
  }, []);

  const handleSelectBook = (book) => {
    setSelectedBook(book);
  };

  const handleConfirmSelection = async () => {
    console.log("Selected Book:", selectedBook);
    const response = await fetch(
        `http://localhost:8080/BiblioWEB/abonne/emprunter/${selectedBook.id}/${params.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json"
          }
        }
      );
      if (response.ok) {
        console.log("Request successful");
        navigate("/UsersList");
      } else {
        console.error("Error:", response.statusText);
      }
  };

  return (
    
    <>
        <div className="main-menu-container"><Link to="/UsersList" className="main-menu-link"><i className="fa-solid fa-arrow-left"></i>  Retour au menu des Abonnés</Link></div>
    {!data ? <h1>Aucun Ouvrage n'est disponible !</h1> : 

    <div className="availableBooks">
      <h1>Les ouvrages disponibles:</h1>
      <table className="rwd-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Type</th>
            <th>Titre</th>
            <th>Date de Création</th>
            <th>Editeur</th>
            <th>Duree</th>
            <th>Auteur</th>
            <th>Selectionnez</th>
          </tr>
        </thead>
        <tbody>
          {data.map((book) => (
            <tr key={book.id}>
              <td data-th="#">{book.id}</td>
              <td data-th="Type">{book.typeOuvrage}</td>
              <td data-th="Titre">{book.titre}</td>
              <td data-th="Date de Création">{book.dateDeCreation}</td>
              <td data-th="Editeur">{book.editeur ? book.editeur : "N/A" }</td>
              <td data-th="Duree">{book.duree ? book.duree : "N/A" }</td>
              <td data-th="Auteur">{book.auteur ? book.auteur : "N/A" }</td>
              <td data-th="Selectionnez">
                <input
                  type="radio"
                  name="selectedBook"
                  onChange={() => handleSelectBook(book)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={handleConfirmSelection} disabled={!selectedBook}>
        Confirmer Selection
      </button>
    </div>
  }
  </>)
}
