import { Link } from "react-router-dom"

export default function MainMenu() {
    return(
        <div className="main-menu">
            <Link to="/UsersList" className="user-manager" >Gestion des Abonnés</Link>
            <Link to="/BooksList" className="book-manager" >Gestion des Ouvrages</Link>
        </div>
    )
}