// Importa o estilo global definido no arquivo "styles/global"
import GlobalStyle from "./styles/global";

// Importa a biblioteca styled-components para criar componentes com estilos CSS personalizados
import styled from "styled-components";

// Importa componentes específicos do sistema de usuário, livros e empréstimos
import FormUser from "./components/FormUsuario.js"; // Formulário para gerenciar usuários
import GridUser from "./components/GridUsuario.js"; // Tabela para exibir usuários
import FormLivro from "./components/FormLivro.js";  // Formulário para gerenciar livros
import GridLivro from "./components/GridLivro.js";  // Tabela para exibir livros
import FormEmprestimo from "./components/FormEmprestimo.js"; // Formulário para gerenciar empréstimos
import GridEmprestimo from "./components/GridEmprestimo.js";  // Tabela para exibir empréstimos
import GridRelatorio from "./components/GridRelatorio.js";  // Tabela para exibir empréstimos
import Navebar from "./components/Navebar.js"; // Barra de navegação do sistema

// Importa hooks do React e bibliotecas auxiliares
import { useEffect, useState, useCallback } from "react";
import { toast, ToastContainer } from "react-toastify"; // Biblioteca para notificações
import "react-toastify/dist/ReactToastify.css"; // Estilo padrão do react-toastify
import axios from "axios"; // Biblioteca para realizar chamadas HTTP

// Define o componente Container com estilos CSS para layout responsivo
const Container = styled.div`
    width: 100%; // Largura total do componente
    max-width: 800px; // Largura máxima para manter o design responsivo
    margin-top: 10%; // Espaço superior
    display: flex; // Layout flexível
    flex-direction: column; // Alinhamento vertical
    align-items: center; // Centraliza o conteúdo horizontalmente
    gap: 10px; // Espaço entre os elementos
`;

// Define o componente Title com estilos CSS personalizados
const Title = styled.h1`
    color: white; /* Define a cor do texto como branca */ 
    font-weight: bold; /* Define o texto como negrito */ 
    margin-right: -70%; // Ajusta o alinhamento horizontal
    text-shadow: 4px 4px 4px black; /* Adiciona uma sombra preta ao texto */
    font-size: 45px;
`;


// Função principal do aplicativo
function App() {
  // Define estados para armazenar dados e controlar edições
  const [users, setUsers] = useState([]); // Lista de usuários
  const [books, setBooks] = useState([]); // Lista de livros
  const [loans, setLoans] = useState([]); // Lista de empréstimos
  const [loansreport1, setLoansReport1] = useState([]); // Lista de relatorio de empréstimos
  const [loansreport2, setLoansReport2] = useState([]); // Lista de relatorio de empréstimos
  const [onEditUser, setOnEditUser] = useState(null); // Usuário em edição
  const [onEditBook, setOnEditBook] = useState(null); // Livro em edição
  const [onEditLoan, setOnEditLoan] = useState(null); // Empréstimo em edição

  // Função para buscar usuários no backend
  const getUsers = useCallback(async () => {
    try {
      const res = await axios.get("http://localhost:8081/user"); // Requisição para buscar usuários
      setUsers(
        res.data.data.sort((a, b) => a.nome.localeCompare(b.nome)) // Ordena alfabeticamente por nome
      );
    } catch (error) {
      toast.error("Erro ao buscar usuários. Tente novamente mais tarde."); // Exibe erro em caso de falha
    }
  }, []); // Função estável (sem dependências externas)

  // Função para buscar livros no backend
  const getBooks = useCallback(async () => {
    try {
      const res = await axios.get("http://localhost:8081/book");
      setBooks(
        res.data.data.sort((a, b) => a.titulo.localeCompare(b.titulo)) // Ordena alfabeticamente por título
      );
    } catch (error) {
      toast.error("Erro ao buscar Livros. Tente novamente mais tarde.");
    }
  }, []);

  // Função para buscar empréstimos no backend
  const getLoans = useCallback(async () => {
    try {
      const res = await axios.get("http://localhost:8081/loans");
      setLoans(
        res.data.data.sort((a, b) => {
          // Ordena primeiro por status (decrescente)
          const statusComparison = b.status.localeCompare(a.status);
          if (statusComparison !== 0) {
            return statusComparison;
          }
          // Se o status for igual, ordena por usuario_idusuario (decrescente)
          return b.usuario_idusuario - a.usuario_idusuario;
        })
      );
    } catch (error) {
      toast.error("Erro ao buscar Empréstimos. Tente novamente mais tarde.");
    }
  }, []);

  const getLoansReport = useCallback(async () => {
    try {
      const res = await axios.get("http://localhost:8081/loans/relatorio");
      setLoansReport1(res.data.LivrosMaisEmprestados.data); // Livros mais emprestados
      setLoansReport2(res.data.UsuariosComPendencia.data);  // Usuários com pendência
    } catch (error) {
      toast.error("Erro ao buscar RELATÓRIO. Tente novamente mais tarde.");
    }
  }, []);


  // Executa funções para buscar dados ao carregar o componente
  useEffect(() => {
    getUsers();
    getBooks();
    getLoans();
    getLoansReport();
  }, [getUsers, getBooks, getLoans, getLoansReport]); // Atualiza apenas quando as funções mudarem

  // Define funções de edição para componentes filhos
  const handleSetOnEditUser = useCallback((user) => {
    setOnEditUser(user); // Atualiza usuário em edição
  }, []);

  const handleSetOnEditBook = useCallback((book) => {
    setOnEditBook(book); // Atualiza livro em edição
  }, []);

  const handleSetOnEditLoan = useCallback((loan) => {
    setOnEditLoan(loan); // Atualiza empréstimo em edição
  }, []);

  return (
    <>
      <Navebar /> {/* Componente de barra de navegação */}
      <Container>
        <Title>USUÁRIOS</Title>
        <FormUser
          onEdit={onEditUser}
          setOnEdit={handleSetOnEditUser}
          getUsers={getUsers}
        />
        <GridUser
          users={users}
          setUsers={setUsers}
          setOnEdit={handleSetOnEditUser}
        />
      </Container>
      <Container>
        <Title>LIVROS</Title>
        <FormLivro
          onEdit={onEditBook}
          setOnEdit={handleSetOnEditBook}
          getBooks={getBooks}
        />
        <GridLivro
          books={books}
          setBooks={setBooks}
          setOnEdit={handleSetOnEditBook}
        />
      </Container>
      <Container>
        <Title>EMPRÉSTIMOS</Title>
        <FormEmprestimo
          onEdit={onEditLoan}
          setOnEdit={handleSetOnEditLoan}
          getLoans={getLoans}
          getLoansReport={getLoansReport}
          users={users} // Passa a lista de usuários ativos
          books={books} // Passa a lista de livros ativos
        />
        <GridEmprestimo
          loans={loans}
          setLoans={setLoans}
          setOnEdit={handleSetOnEditLoan}
          getLoans={getLoans}
        />
      </Container>
      <Container>
        <Title>RELATÓRIO</Title>
        <GridRelatorio
          loansreport1={loansreport1}
          loansreport2={loansreport2}
          getLoansReport={getLoansReport}
        />
      </Container>
      <GlobalStyle /> {/* Aplica estilos globais */}
      <ToastContainer autoClose={3000} position="bottom-left" /> {/* Notificações */}
    </>
  );
}

export default App; // Exporta o componente principal
