import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

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


function ListaAutores() {
  const [autores, setAutores] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const apiURL = "http://localhost:8888/api/authors";

  useEffect(() => {
    fetchAutores();
  }, []);

  const fetchAutores = async () => {
    try {
      setLoading(true);
      const response = await axios.get(apiURL);
      setAutores(response.data._embedded.authorDtoList);
    } catch (err) {
      setError("Erro ao carregar os autores.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${apiURL}/${id}`);
      fetchAutores();
    } catch (err) {
      setError("Erro ao excluir o Autor pois o mesmo possui relação com Livros cadastrados.");
    }
  };

  return (
    <Container>
      <Title>Lista de Autores</Title>

      {error && <Error>{error}</Error>}
      {loading ? (
        <p>Carregando...</p>
      ) : (
        <>
          {autores.length > 0 ? (
            <Table>
              <thead>
                <tr>
                  <th>Nome</th>
                  <th>Nacionalidade</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                {autores.map((author) => (
                  <tr key={author.id}>
                    <td>{author.name}</td>
                    <td>{author.nationality}</td>
                    <td>
                      <ButtonContainer>
                        <Button as={Link} to={`/cadastrar?edit=${author.id}`}>
                          Editar
                        </Button>
                        <Button onClick={() => handleDelete(author.id)}>
                          Excluir
                        </Button>
                      </ButtonContainer>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          ) : (
            <p>Nenhum autor cadastrado.</p>
          )}

          <ButtonContainer>
            <Button as={Link} to="/cadastrar">
              Cadastrar Novo Autor
            </Button>
            <Button onClick={() => navigate("/")}>Voltar</Button>
          </ButtonContainer>
        </>
      )}
    </Container>
  );
}

export default ListaAutores;
