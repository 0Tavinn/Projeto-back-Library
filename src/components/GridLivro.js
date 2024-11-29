import React from "react";
import axios from "axios";
import styled from "styled-components";
import {FaTrash, FaEdit} from "react-icons/fa";
import {toast} from "react-toastify";

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

const Table = styled.table`
    width: 130%;
    background-color: #fff;
    padding: 30px;
    box-shadow: 0px 0px 5px #ccc;
    border-radius: 5px;
    max-width: 1000px;
    
`;

export const Thead = styled.thead``;

export const Tbody = styled.tbody``;

export const Tr = styled.tr`
    text-align: center;`;

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
export const Td = styled.td`
    border: 1px solid #bbb;
    pading-top: 20px;
    text-align: ${(props)=>(props.aligncenter ? "center" : "start")};
    width: ${(props)=>(props.width ? props.width : "auto")};

    @media (max-width: 500px) {
        ${(props) => props.onlyWeb && "display: none"}
    }
`;


const Grid = ({books, setBooks, setOnEdit}) =>{
    const handleEdit = (item) => {
        setOnEdit(item);
    };

    const handleDelete = async (idlivro) => {
        await axios
         .delete("http://localhost:8081/book/"+ idlivro)
         .then(({ data }) => {
            const newArray = books.filter((book) => book.idlivro !== idlivro);

            setBooks(newArray);
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
                    <Th>ID</Th>
                    <Th>Título</Th>
                    <Th>Autor</Th>
                    <Th>Genero</Th>
                    <Th onlyWeb>Ano de publicação</Th>
                    <Th></Th>
                    <Th></Th>
                </Tr>
            </Thead>
            <Tbody>
                {Array.isArray(books) && books.map((item, i) =>(
                    <Tr key={i}>
                        <Td aligncenter width="5%">{item.idlivro}</Td>
                        <Td width="25%">{item.titulo}</Td>
                        <Td width="22%">{item.autor}</Td>
                        <Td width="20%">{item.genero}</Td>
                        <Td width="10%">{item.ano_publicacao}</Td>
                        <Td aligncenter width="5%">
                            <FaEdit onClick={() => handleEdit(item)}/>
                        </Td>
                        <Td aligncenter width="5%">
                            <FaTrash onClick={() => handleDelete(item.idlivro)}/>
                        </Td> 
                    </Tr>
                ))}
            </Tbody>
        </Table>
        </ScrollPane>
    );
};
export default Grid;