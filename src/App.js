import React from 'react';
import { BrowserRouter, Redirect, Route } from "react-router-dom";
import MagazinesPage from "./pages/MagazinesPage/MagazinesPage";
import NavbarComponent from "./components/Navbar/NavbarComponent";
import BooksPage from "./pages/BooksPage/BooksPage";

function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <NavbarComponent/>
                <Route path="/magazines" exact component={MagazinesPage} />
                <Route path="/books" exact component={BooksPage} />
                <Redirect to="/magazines" />
            </BrowserRouter>
        </div>
    );
}

export default App;
