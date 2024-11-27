import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
  background: linear-gradient(135deg, #f0f8ff, #d6e4ff);
  font-family: 'Roboto', sans-serif;
  color: #333;
  padding: 20px;
`;

const Title = styled.h2`
  font-size: 2.5rem;
  font-weight: bold;
  margin-bottom: 20px;
`;

const Table = styled.table`
  width: 100%;
  max-width: 800px;
  border-collapse: collapse;
  margin-bottom: 20px;

  th, td {
    border: 1px solid #ccc;
    padding: 10px;
    text-align: center;
  }

  th {
    background-color: #7fb3ff;
    color: white;
    font-weight: bold;
  }

  tr:nth-child(even) {
    background-color: #f9f9f9;
  }

  tr:hover {
    background-color: #eef5ff;
  }
`;

const Button = styled.button`
  padding: 10px 20px;
  font-size: 1rem;
  font-weight: bold;
  color: white;
  background: linear-gradient(135deg, #7fb3ff, #5287ff);
  border: none;
  border-radius: 50px;
  cursor: pointer;
  transition: all 0.3s ease;
  text-decoration: none; /* Remove o sublinhado */

  &:hover {
    background: linear-gradient(135deg, #5287ff, #2b5fff);
    transform: translateY(-3px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-top: 20px;
`;

const Error = styled.p`
  color: red;
  font-weight: bold;
`;

const ListaLivros = () => {
  const [livros, setLivros] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const apiURL = "http://localhost:8888/api/books";

  useEffect(() => {
    fetchLivros();
  }, []);

  const fetchLivros = async () => {
    try {
      const response = await axios.get(apiURL);
      setLivros(response.data._embedded.bookDtoList); // Adaptar conforme a estrutura de resposta da sua API
    } catch (err) {
      setError("Erro ao carregar os livros.");
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${apiURL}/${id}`);
      fetchLivros(); // Atualiza a lista após exclusão
    } catch (err) {
      setError("Erro ao excluir o livro.");
    }
  };

  return (
    <Container>
      <Title>Lista de Livros</Title>

      {error && <Error>{error}</Error>}

      {livros.length === 0 ? (
        <p>Nenhum livro encontrado.</p>
      ) : (
        <Table>
          <thead>
            <tr>
              <th>Título</th>
              <th>Data de Publicação</th>
              <th>Autor</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {livros.map((livro) => (
              <tr key={livro.id}>
                <td>{livro.title}</td>
                <td>{new Date(livro.publicationDate).toLocaleDateString()}</td> {/* Data formatada */}
                <td>{livro.author.name}</td>
                <td>
                  <ButtonContainer>
                    <Button as={Link} to={`/cadastrarLivros?edit=${livro.id}`}>
                      Editar
                    </Button>
                    <Button onClick={() => handleDelete(livro.id)}>
                      Excluir
                    </Button>
                  </ButtonContainer>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}

      <ButtonContainer>
        <Button as={Link} to="/cadastrarLivros">
          Cadastrar Novo Livro
        </Button>
        <Button onClick={() => navigate("/")}>Voltar</Button>
      </ButtonContainer>
    </Container>
  );
};

export default ListaLivros;
