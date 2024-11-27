import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";

const Container = styled.div`
  background: #f9f9f9;
  max-width: 600px;
  margin: 50px auto;
  padding: 30px;
  border-radius: 12px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h2`
  text-align: center;
  color: #333;
  margin-bottom: 20px;
  font-size: 24px;
`;

const Input = styled.input`
  width: 100%;
  padding: 12px 18px;
  margin-bottom: 15px;
  border-radius: 8px;
  border: 1px solid #ddd;
  font-size: 16px;
  box-sizing: border-box;

  &:focus {
    border-color: #5287ff;
    outline: none;
  }
`;

const Button = styled.button`
  padding: 12px 25px;
  font-size: 16px;
  font-weight: bold;
  color: white;
  background: linear-gradient(135deg, #7fb3ff, #5287ff);
  border: none;
  border-radius: 50px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: linear-gradient(135deg, #5287ff, #2b5fff);
    transform: translateY(-3px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }

  &:disabled {
    background: #ddd;
    cursor: not-allowed;
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
`;

const ErrorMessage = styled.p`
  color: red;
  text-align: center;
  margin-top: 15px;
`;

const CadastrarAutor = () => {
  const [nome, setNome] = useState("");
  const [nacionalidade, setNacionalidade] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const isEditing = location.search.includes("edit");

  const apiURL = "http://localhost:8888/api/authors";

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!nome || !nacionalidade) {
      setError("Todos os campos são obrigatórios.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      if (isEditing) {
        const authorId = new URLSearchParams(location.search).get("edit");
        await axios.put(`${apiURL}`, {id: authorId, name: nome, nationality: nacionalidade });
        alert("Autor editado com sucesso!");
      } else {
        await axios.post(apiURL, { name: nome, nationality: nacionalidade });
        alert("Autor cadastrado com sucesso!");
      }
      navigate("/ListaAutores");
    } catch (err) {
      setError("Erro ao cadastrar o autor.");
    } finally {
      setLoading(false);
    }
  };

  const preencherDados = () => {
    if (isEditing) {
      const authorId = new URLSearchParams(location.search).get("edit");
      axios.get(`${apiURL}/${authorId}`)
        .then((response) => {
          setNome(response.data.name);
          setNacionalidade(response.data.nationality);
        })
        .catch(() => setError("Erro ao carregar os dados do autor."));
    }
  };

  React.useEffect(() => {
    preencherDados();
  }, []);

  return (
    <Container>
      <Title>{isEditing ? "Editar Autor" : "Cadastrar Autor"}</Title>

      {error && <ErrorMessage>{error}</ErrorMessage>}

      <form onSubmit={handleSubmit}>
        <div>
          <label>Nome:</label>
          <Input
            type="text"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Nacionalidade:</label>
          <Input
            type="text"
            value={nacionalidade}
            onChange={(e) => setNacionalidade(e.target.value)}
            required
          />
        </div>

        <ButtonWrapper>
          <Button type="submit" disabled={loading}>
            {loading ? "Cadastrando..." : "Salvar"}
          </Button>
          <Button onClick={() => navigate("/ListaAutores")} type="button">
            Voltar
          </Button>
        </ButtonWrapper>
      </form>
    </Container>
  );
};

export default CadastrarAutor;
