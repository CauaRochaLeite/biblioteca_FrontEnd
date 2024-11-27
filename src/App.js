import React from "react";
import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Pages/Home";
import ListaAutores from "./components/Pages/ListaAutores";
import CadastroAutores from "./components/Pages/CadastroAutores";
import ListaLivros from "./components/Pages/ListaLivros";
import CadastroLivros from "./components/Pages/CadastroLivros";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/ListaAutores" element={<ListaAutores />} />
        <Route path="/cadastrar" element={<CadastroAutores />} />
        <Route path="/ListaLivros" element={<ListaLivros />} />
        <Route path="/cadastrarLivros" element={<CadastroLivros />} />
      </Routes>
    </Router>
  );
};

export default App;

