
import Users from "./components/Users"
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AddUser from "./components/AddUser";
import EditUser from "./components/EditUser";
import Books from "./components/Books";
import SelectAvailableBook from "./components/SelectAvailableBook";
import MainMenu from "./components/MainMenu"
import EditBook from "./components/EditBook"
import AddBook from "./components/AddBook";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainMenu />} />
        <Route path="/usersList" element={<Users />} />
        <Route path="/addUser" element={<AddUser />} />
        <Route path="/addBook" element={<AddBook />} />
        <Route path="usersList/editUser/:id" element={<EditUser />} />
        <Route path="/booksList/editBook/:id" element={<EditBook />} />
        <Route path="/selectAvailableBook/:id" element={<SelectAvailableBook />} />
        <Route path="/booksList" element={<Books />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
