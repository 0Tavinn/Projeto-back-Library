import React from "react";
import axios from "axios";
import styled from "styled-components";
import { FaTrash } from "react-icons/fa";
import { toast } from "react-toastify";

// Estilos para o contêiner com rolagem
const ScrollPane = styled.div`
    width: 125%;
    max-height: 400px; /* Define a altura máxima visível */
    overflow-y: auto; /* Adiciona a rolagem vertical */
    overflow-x: hidden; /* Evita a rolagem horizontal */
    margin: 20px auto; /* Centraliza na página */
    border: 1px solid #ccc; /* Bordas opcionais */
    border-radius: 5px;
    margin-right: -50%;
`;


// Define a styled component para a tabela
const Table = styled.table`
    width: 140%;
    background-color: #fff;
    padding: 30px;
    box-shadow: 0px 0px 5px #ccc;
    border-radius: 5px;
    max-width: 1000px;
    
`;

export const Thead = styled.thead``;

export const Tbody = styled.tbody``;

// Define a styled component para as linhas da tabela
export const Tr = styled.tr`
    color: ${(props) => (props.status === "DEVOLVIDO" ? "#B5B5B5" : "inherit")};    
`;

const H1 = styled.h1`
  font-size: 13px;
`;

// Define a styled component para os cabeçalhos da tabela
export const Th = styled.th`
    text-align: center;
    border-bottom: inset;
    padding-bottom: 15px;
    position: sticky; /* Fixa o elemento */
    top: 0; /* Fixa no topo do contêiner */
    z-index: 1; /* Garante que fique acima dos outros elementos */
    background-color: #fff; /* Fundo branco para consistência */
    @media (max-width: 500px) {
        ${(props) => props.onlyWeb && "display: none"}
    }
`;

// Define a styled component para as células da tabela
export const Td = styled.td`
    border: 1px solid #bbb;
    padding-top: 10px;
    text-align: ${(props) => (props.aligncenter ? "center" : "start")};
    width: ${(props) => (props.width ? props.width : "auto")};
    @media (max-width: 500px) {
        ${(props) => props.onlyWeb && "display: none"}
    }
`;

// Define a styled component para o botão
const Button = styled.button`
    padding: 1px;
    cursor: pointer;
    border-radius: 5px;
    border: none;
    background-color: #4a5d42;
    color: white;
    text-align: center;
    height: 45px; // Altura fixa do botão
`;

// Componente Grid que recebe empréstimos e funções como props
const Grid = ({ loans, getLoans, setLoans, setOnEdit }) => {

    // Função para lidar com a edição (devolução) de um empréstimo
    const handleEdit = async (idemprestimo) => {
        const confirm = window.confirm("Deseja realmente realizar a devolução deste empréstimo?");
        if (!confirm) return;
        await axios
            .put("http://localhost:8081/loans/devolver/" + idemprestimo)
            .then(({ data }) => {
                const newArray = loans.filter((loan) => loan.idemprestimo !== idemprestimo);
                setLoans(newArray);
                toast.success(data)
            })
            .catch((error) => {
                const errorMessage = error.response?.data?.error || 'Erro desconhecido';
                toast.error(errorMessage, {
                    style: {
                        color: 'red',         // Texto vermelho
                        backgroundColor: '#ffe6e6', // Fundo com tom claro de vermelho
                    },
                });
            });
        setOnEdit(null);
        getLoans();
    };

    // Função para lidar com a exclusão de um empréstimo
    const handleDelete = async (idemprestimo) => {
        const confirm = window.confirm("Deseja realmente excluir este empréstimo?");
        if (!confirm) return; // Se o usuário cancelar, não executa a ação

        await axios
            .delete("http://localhost:8081/loans/" + idemprestimo)
            .then(({ data }) => {
                const newArray = loans.filter((loan) => loan.idemprestimo !== idemprestimo);
                setLoans(newArray);
                toast.success(data)
            })
            .catch((error) => {
                const errorMessage = error.response?.data?.error || 'Erro desconhecido';
                toast.error(errorMessage, {
                    style: {
                        color: 'red',         // Texto vermelho
                        backgroundColor: '#ffe6e6', // Fundo com tom claro de vermelho
                    },
                });
            });
        setOnEdit(null);
    };

    return (
        <ScrollPane>
        <Table>
            <Thead>
                <Tr>
                    <Th>ID do Emprestimo</Th>
                    <Th>Data do Empréstimo</Th>
                    <Th>Data de Devolução</Th>
                    <Th>Status</Th>
                    <Th>ID do Livro</Th>
                    <Th>ID do Usuário</Th>
                    <Th></Th>
                    <Th></Th>
                </Tr>
            </Thead>
            <Tbody>
                {Array.isArray(loans) && loans.map((item, i) => (
                    <Tr key={i} status={item.status}>
                        <Td aligncenter width="5%">{item.idemprestimo}</Td>
                        <Td aligncenter width="13%">{item.data_emprestimo}</Td>
                        <Td aligncenter width="13%">{item.data_devolucao}</Td>
                        <Td aligncenter width="5%">{item.status}</Td>
                        <Td aligncenter width="5%">{item.livro_idlivro}</Td>
                        <Td aligncenter width="5%">{item.usuario_idusuario}</Td>
                        <Td aligncenter width="5%" >
                            {item.status === "PENDENTE" && (
                                <Button onClick={() => handleEdit(item.idemprestimo)}><H1>Realizar Devolução</H1></Button>
                            )}
                        </Td>
                        <Td aligncenter width="5%">
                            <FaTrash onClick={() => handleDelete(item.idemprestimo)} />
                        </Td>
                    </Tr>
                ))}
            </Tbody>
        </Table>
        </ScrollPane>
    );
};

export default Grid;
