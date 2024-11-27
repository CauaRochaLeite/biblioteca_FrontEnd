import React, { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
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

const Select = styled.select`
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

const CadastroLivro = () => {
  const [formData, setFormData] = useState({
    title: "",
    publicationDate: "",
    authorId: "",
  });
  const [autores, setAutores] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const apiURL = "http://localhost:8888/api/books";
  const autoresApiURL = "http://localhost:8888/api/authors";
  const editId = searchParams.get("edit");

  useEffect(() => {
    fetchAutores();
  }, []);

  useEffect(() => {
    if (editId) {
      fetchLivro(editId);
    }
  }, [editId]);

  const fetchAutores = async () => {
    try {
      const response = await axios.get(autoresApiURL);
      setAutores(response.data._embedded.authorDtoList);
    } catch (err) {
      setError("Erro ao carregar os autores.");
    }
  };

  const fetchLivro = async (id) => {
    try {
      const response = await axios.get(`${apiURL}/${id}`);
      const publicationDate = new Date(response.data.publicationDate);
      const formattedDate = publicationDate.toISOString().split("T")[0];


      setFormData({
        title: response.data.title,
        publicationDate: formattedDate,
        authorId: response.data.author.id,
      });
    } catch (err) {
      setError("Erro ao carregar os dados do livro.");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const dateWithTime = new Date(formData.publicationDate + "T00:00:00Z");
    const milliseconds = dateWithTime.getTime() + 86400000;

    const requestData = {
      id: editId || undefined,
      title: formData.title,
      publicationDate: milliseconds,
      author: {
        id: formData.authorId,
      },
    };

    setLoading(true);
    setError("");

    try {
      if (editId) {
        console.log(requestData.publicationDate)
        await axios.put(apiURL, { id: editId, ...requestData });
      } else {
        await axios.post(apiURL, requestData);
      }
      navigate("/ListaLivros");
    } catch (err) {
      setError("Erro ao salvar o livro.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <Title>{editId ? "Editar Livro" : "Cadastrar Novo Livro"}</Title>

      {error && <ErrorMessage>{error}</ErrorMessage>}

      <form onSubmit={handleSubmit}>
        <div>
          <label>Título:</label>
          <Input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Data de Publicação:</label>
          <Input
            type="date"
            name="publicationDate"
            value={formData.publicationDate}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Autor:</label>
          <Select
            name="authorId"
            value={formData.authorId}
            onChange={handleChange}
            required
          >
            <option value="">Selecione um autor</option>
            {autores.map((author) => (
              <option key={author.id} value={author.id}>
                {author.name}
              </option>
            ))}
          </Select>
        </div>

        <ButtonWrapper>
          <Button type="submit" disabled={loading}>
            {loading ? "Cadastrando..." : editId ? "Atualizar" : "Cadastrar"}
          </Button>
          <Button onClick={() => navigate("/ListaLivros")} type="button">
            Voltar
          </Button>
        </ButtonWrapper>
      </form>
    </Container>
  );
};

export default CadastroLivro;
