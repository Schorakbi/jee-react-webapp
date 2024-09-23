import React from "react";
import { Link } from "react-router-dom";

export default function Users() {
  const [users, setUsers] = React.useState([]);
  const [sortOrder, setSortOrder] = React.useState({ field: "", asc: true });
  
  
  async function fetchUsers () {
    try {
      const response = await fetch("http://localhost:8080/BiblioWEB/abonne/liste");
      const data = await response.json();

      const usersWithOuvragePris = data.map((user) => ({
        ...user,
        ouvragePris: user.ouvragePris || { titre: "N/A" },
      }));

      setUsers(usersWithOuvragePris);
    } catch (error) {
      console.error("Error fetching users:", error.message);
    }
  };
  React.useEffect(() => {
    fetchUsers();
  },[])
  
  async function handleDelete (id) {
    try {
      const response = await fetch(`http://localhost:8080/BiblioWEB/abonne/supprimer/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      if (response.ok) {
        setUsers((prevUsers) => prevUsers.filter((value) => value.numeroAbonnement !== id));
        console.log("User deleted successfully!");
      } else {
        console.error("Error deleting user:", response.statusText);
      }
    } catch (error) {
      console.error("Fetch error:", error.message);
    }
  };  
  async function handleReturn(numeroAbonnement) {
    try {
      const response = await fetch(`http://localhost:8080/BiblioWEB/abonne/rendre/${numeroAbonnement}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      if (response.ok) {
        setUsers((prevUsers) => prevUsers.map((value) => value.numeroAbonnement === numeroAbonnement ? { ...value, ouvragePris: { titre: "N/A" } } : value));
        console.log("Book returned successfully!");
      } else {
        console.error("Error returning book:", response.statusText);
      }
    } catch (error) {
      console.error("Fetch error:", error.message);
    }
  };
  
  function handleSort(field){
    setSortOrder((prevState) => ({
      field,
      asc: prevState.field === field ? !prevState.asc : true,
    }));
  };

  
  

  const sortedUsers = [...users].sort((a, b) => {
    const x = a[sortOrder.field];
    const y = b[sortOrder.field];
    const multiplier = sortOrder.asc ? 1 : -1;

    if (sortOrder.field === "col-4") {
      return 0;
    }

    if (x === undefined) {
      return 1 * multiplier;
    }

    if (y === undefined) {
      return -1 * multiplier;
    }

    if (sortOrder.field === "ouvragePris" && typeof x === "object" && typeof y === "object") {
      return x.titre.localeCompare(y.titre) * multiplier;
    }

    return typeof x === "number" ? (x - y) * multiplier : x.localeCompare(y) * multiplier;
  });

  return (
    <>
      <div className="main-menu-container"><Link to="/" className="main-menu-link"><i className="fa-solid fa-arrow-left"></i>  Retour au menu principale</Link></div>
    <div className="container" id="main">
      
      <div className="table-title">
        <h2>Gérer les <b>Abonnés</b></h2>
        <Link to="/addUser" className="btn">
          <i className="fa-solid fa-plus"></i> <span>Ajouter Un Nouveau Abonné</span>
        </Link>
      </div>
      <ul className="responsive-table">
        <li className="table-header">
          <div onClick={() => handleSort("id")} className="col col-1">
            {" "}
            #{" "}
          </div>
          <div onClick={() => handleSort("nom")} className="col col-2">
            {" "}
            Nom de l'Abonné{" "}
          </div>
          <div onClick={() => handleSort("numeroIdentite")} className="col col-3">
            {" "}
            Numéro d'identité{" "}
          </div>
          <div onClick={() => handleSort("ouvragePris")} className="col col-4">
            {" "}
            Ouvrage Emprunté{" "}
          </div>
          <div className="col col-5"> Actions </div>
        </li>
        {sortedUsers.map((user, index) => (
          <li key={index} className="table-row">
            <div className="col col-1" data-label="ID :">
              {user.numeroAbonnement}
            </div>
            <div className="col col-2" data-label="Nom de l'Abonné :">
              {user.nom}
            </div>
            <div className="col col-3" data-label="Numero d'Identité :">
              {user.numeroIdentite}
            </div>
            <div className="col col-4" data-label="Ouvrage Emprunté :">
              {user.ouvragePris.titre}
            </div>
            <div className="col col-5" data-label="Actions :">
              <Link to={`editUser/${user.numeroAbonnement}`} className="button primary edit" href="#main"></Link>
              <button onClick={() =>handleDelete(user.numeroAbonnement)} className="button primary delete" href="#main"></button>
              {user.ouvragePris.titre !== "N/A" ? <button onClick={() => handleReturn(user.numeroAbonnement)} >
                <i className="fa-solid fa-book"></i>  Rendre l'Ouvrage</button> :  <button><Link to ={`/SelectAvailableBook/${user.numeroAbonnement}`}><i className="fa-solid fa-book"></i>  Emprunter un Ouvrage</Link></button>}
              
              
            </div>
            
            
        </li>
        
        ))}
            </ul>
    </div>
    </>
  );
};



