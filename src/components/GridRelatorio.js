import React from "react";
import styled from "styled-components";

// Estilos para o contêiner com rolagem
const ScrollPane = styled.div`
    width: 115%;
    max-height: 400px; /* Define a altura máxima visível */
    overflow-y: auto; /* Adiciona a rolagem vertical */
    margin: 20px auto; /* Centraliza na página */
    border: 1px solid #ccc; /* Bordas opcionais */
    border-radius: 5px;
   
`;

const Table = styled.table`
  width: 115%;
  background-color: #fff;
  padding: 20px;
  box-shadow: 5px 5px 5px #ccc;
  border-radius: 5px;
  margin: ${(props)=>(props.margin ? "20px auto" : "auto")};
  width: ${(props)=>(props.width ? "100%" : "115%")};
  `;
const H1 = styled.h1`
  font-size: 24px;
  background-color: black;
  text-align: center;
  box-shadow: 0px 0px 5px #ccc;
  border-radius: 5px;
  width:115%;
  color: white;
  margin-bottom: -3.3%;
  `;
const Container = styled.div`
  margin-bottom: 10%;
  display: flex;
  justify-content: space-between;
  flex-direction: column; /* Define a direção dos itens como coluna */ 
  gap: 10px; /* Define 20 pixels de espaço entre os itens */
  margin-right: -60%; // Ajusta o alinhamento horizontal
  
`;

export const Thead = styled.thead``;

export const Tbody = styled.tbody``;

export const Tr = styled.tr``;

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
  padding: 10px;
  text-align: center;
`;

const Grid = ({ loansreport1, loansreport2 }) => {
    return (
        <Container>
            <H1>Livros Mais Emprestados</H1>
            <Table margin>
                <Thead>
                    <Tr>
                        <Th>ID do Livro</Th>
                        <Th>Nome do Livro</Th>
                        <Th>Quantidade de Empréstimos</Th>
                        <Th>Tipo</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {Array.isArray(loansreport1) &&
                        loansreport1.slice(0, 3).map((item, i) => ( // Exibir apenas os 3 primeiros
                            <Tr key={i}>
                                <Td>{item.id_livro}</Td>
                                <Td>{item.nome_livro}</Td>
                                <Td>{item.quantidade_de_emprestimo}</Td>
                                <Td>{item.tipo}</Td>
                            </Tr>
                        ))}
                </Tbody>
            </Table>
            <H1>Usuários com Pendência</H1>
            <ScrollPane>
            <Table width="90%">
                <Thead>
                    <Tr>
                        <Th width="1%">ID do Usuário</Th>
                        <Th width="5%">Nome do Usuário</Th>
                        <Th width="1%">Quantidade de Empréstimos</Th>
                        <Th width="15%">Tipo</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {Array.isArray(loansreport2) &&
                        loansreport2.map((item, i) => (
                            <Tr key={i}>
                                <Td>{item.id_usuario}</Td>
                                <Td>{item.nome_usuario}</Td>
                                <Td>{item.quantidade_de_emprestimo}</Td>
                                <Td>{item.tipo}</Td>
                            </Tr>
                        ))}
                </Tbody>
            </Table>
            </ScrollPane>
        </Container>
    )

};

export default Grid;