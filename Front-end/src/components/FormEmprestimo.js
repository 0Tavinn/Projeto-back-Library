// Importa as dependências necessárias: React, styled-components para estilos e toast para notificações
import React, { useRef } from "react";
import styled from "styled-components";
import { toast } from "react-toastify";
import axios from "axios";
// Define o estilo para o contêiner do formulário
const FormContainer = styled.form`
    display: flex; // Define layout flexível
    align-items: flex-end; // Alinha itens no final do eixo vertical
    gap: 10px; // Espaçamento entre itens
    flex-wrap: wrap; // Permite que itens quebrem linha
    background-color: #fff; // Cor de fundo branca
    padding: 30px; // Espaçamento interno
    box-shadow: 10px 10px 10px #ccc; // Sombra em torno do contêiner
    border-radius: 10px; // Bordas arredondadas
    margin-right: -75%; // Ajusta o alinhamento à direita
`;

// Define o estilo para uma área de entrada de dados
const InputArea = styled.div`
    display: flex; // Define layout flexível
    flex-direction: column; // Alinha itens verticalmente
`;

// Define o estilo para rótulos no formulário
const Label = styled.label``;

// Define o estilo para o botão de envio do formulário
const Button = styled.button`
    padding: 12px; // Espaçamento interno
    cursor: pointer; // Define o cursor ao passar o mouse
    border-radius: 5px; // Bordas arredondadas
    border: none; // Remove borda padrão
    background-color: #3CBF4E; // Cor de fundo verde
    color: white; // Texto branco
    font-weight: bold; // Texto em negrito
    height: 42px; // Altura fixa do botão
`;

// Define o estilo para o campo de seleção
const Select = styled.select`
    width: 200px; // Largura fixa
    padding: 5px; // Espaçamento interno
    border: 1px solid #bbb; // Borda cinza
    border-radius: 5px; // Bordas arredondadas
    height: 40px; // Altura fixa
    
`;

// Componente funcional para gerenciar o formulário de empréstimos
const FormEmprestimo = ({ onEdit, setOnEdit, getLoans, getLoansReport, users, books }) => {
    const ref = useRef(); // Cria uma referência ao formulário para manipulação direta

    // Função para lidar com o envio do formulário
    const handleSubmit = async (e) => {
        e.preventDefault(); // Evita o comportamento padrão de recarregar a página
        const loan = ref.current; // Obtém os valores do formulário usando a referência

        // Validação para verificar se os campos obrigatórios estão preenchidos
        if (!loan.livro_idlivro.value || !loan.usuario_idusuario.value) {
            return toast.warn("Selecione um livro e um usuário!"); // Exibe aviso se houver campos vazios
        }


        await axios
            .post("http://localhost:8081/loans", {
                livro_idlivro: loan.livro_idlivro.value,
                usuario_idusuario: loan.usuario_idusuario.value,
            })
            .then(({ data }) => toast.success(data))
            .catch((error) => {
                const errorMessage = error.response?.data?.error || 'Erro desconhecido';
                toast.error(errorMessage, {
                    style: {
                        color: 'red',         // Texto vermelho
                        backgroundColor: '#ffe6e6', // Fundo com tom claro de vermelho
                    },
                });
            });

        loan.livro_idlivro.value = ""; // Reseta o campo de seleção de livro
        loan.usuario_idusuario.value = ""; // Reseta o campo de seleção de usuário
        setOnEdit(null); // Reseta o estado de edição
        getLoans(); // Atualiza a lista de empréstimos
        getLoansReport(); // Atualiza o relatório de empréstimos
    };

    // Renderiza o formulário de empréstimos
    return (
        <FormContainer ref={ref} onSubmit={handleSubmit}>
            {/* Campo de seleção para o ID do Livro */}
            <InputArea>
                <Label>ID do Livro</Label> {/* Rótulo para o campo */}
                <Select name="livro_idlivro"> {/* Campo de seleção */}
                    <option value="">Selecione um livro</option> {/* Opção padrão */}
                    {books.map((book) => ( // Mapeia a lista de livros para criar opções
                        <option key={book.idlivro} value={book.idlivro}>
                            {book.idlivro} - {book.titulo} {/* Exibe o ID e título do livro */}
                        </option>
                    ))}
                </Select>
            </InputArea>

            {/* Campo de seleção para o ID do Usuário */}
            <InputArea>
                <Label>ID do Usuário</Label> {/* Rótulo para o campo */}
                <Select name="usuario_idusuario"> {/* Campo de seleção */}
                    <option value="">Selecione um usuário</option> {/* Opção padrão */}
                    {users.map((user) => ( // Mapeia a lista de usuários para criar opções
                        <option key={user.idusuario} value={user.idusuario}>
                            {user.idusuario} - {user.nome} {/* Exibe o ID e nome do usuário */}
                            
                        </option>

                    ))}
                </Select>
            </InputArea>

            {/* Botão para salvar o empréstimo */}
            <Button type="submit">SALVAR</Button>
        </FormContainer>
    );
};

export default FormEmprestimo; // Exporta o componente para uso em outras partes do aplicativo
