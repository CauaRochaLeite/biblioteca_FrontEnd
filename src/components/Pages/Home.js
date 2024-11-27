import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import logo from "./logo.jpg";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background: linear-gradient(135deg, #f0f8ff, #d6e4ff);
  color: #333;
  text-align: center;
  font-family: 'Roboto', sans-serif;
`;

const Title = styled.h1`
  font-size: 3rem;
  font-weight: 700;
  margin-bottom: 20px;
`;

const Subtitle = styled.p`
  font-size: 1.5rem;
  font-weight: 300;
  margin-bottom: 30px;
`;

const Logo = styled.img`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  margin-bottom: 30px;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 20px;
`;

const Button = styled(Link)`
  text-decoration: none;
  padding: 15px 30px;
  font-size: 1rem;
  font-weight: bold;
  color: white;
  background: linear-gradient(135deg, #7fb3ff, #5287ff);
  border: none;
  border-radius: 50px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease;

  &:hover {
    background: linear-gradient(135deg, #5287ff, #2b5fff);
    transform: translateY(-3px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.3);
  }
`;

function Home() {
  return (
    <Container>
      <Logo src={logo} alt="Logo da empresa" />
      <Title>Cadastro de Livros e Autores LTDA</Title>
      <Subtitle>Gerencie seus livros e autores de forma simples e rápida</Subtitle>
      <ButtonContainer>
        <Button to="/ListaAutores">Gerenciar Autores</Button>
        <Button to="/ListaLivros">Gerenciar Livros</Button>
      </ButtonContainer>
    </Container>
  );
}

export default Home;
