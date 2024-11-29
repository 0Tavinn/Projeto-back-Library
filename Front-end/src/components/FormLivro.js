import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import axios from "axios";
import { toast } from "react-toastify";

const FormContainer = styled.form`
    display: flex;
    align-items: flex-end;
    gap: 10px;
    flex-wrap: wrap;
    background-color: #fff;
    padding: 30px;
    box-shadow: 10px 10px 10px #ccc;
    border-radius: 10px;
    margin-right: -75%;
    `;

const InputArea = styled.div`
    display: flex;
    flex-direction: column;
    `;
const Input = styled.input`
    width: 190px;
    padding: 0 10px;
    border: 1px solid #bbb;
    border-radius: 5px;
    height: 40px;
`;
const Label = styled.label``
const Select = styled.select`
    width: 190px;
    padding: 0 10px;
    border: 1px solid #bbb;
    border-radius: 5px;
    height: 40px;
    
    `

const Button = styled.button`
    padding: 10px;
    cursor: pointer;
    border-radius: 5px;
    border: none;
    background-color: #2c73d2;
    color: white;
    height: 42px;
`;
const Form = ({ getBooks, onEdit, setOnEdit }) => {
    const ref = useRef();

    useEffect(() => {
        if (onEdit) {
            const book = ref.current;
            book.titulo.value = onEdit.titulo;
            book.autor.value = onEdit.autor;
            book.genero.value = onEdit.genero;
            book.ano_publicacao.value = onEdit.ano_publicacao;
        }
    }, [onEdit]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const book = ref.current;

        if (
            !book.titulo.value ||
            !book.autor.value ||
            !book.genero.value ||
            !book.ano_publicacao.value
        ) {
            return toast.warn("Preencha todos os campos!");
        }
        if (onEdit) {
            await axios
                .put("http://localhost:8081/book/" + onEdit.idlivro, {
                    titulo: book.titulo.value,
                    autor: book.autor.value,
                    genero: book.genero.value,
                    ano_publicacao: book.ano_publicacao.value,
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
        } else {
            await axios
                .post("http://localhost:8081/book", {
                    titulo: book.titulo.value,
                    autor: book.autor.value,
                    genero: book.genero.value,
                    ano_publicacao: book.ano_publicacao.value,
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
        }

        book.titulo.value = "";
        book.autor.value = "";
        book.genero.value = "";
        book.ano_publicacao.value = "";

        setOnEdit(null);
        getBooks();
    };
    return (
        <>
            {/* Formulário */}
            <FormContainer ref={ref} onSubmit={handleSubmit}>
                <InputArea>
                    <Label>Titulo</Label>
                    <Input name="titulo" />
                </InputArea>
                <InputArea>
                    <Label>Autor</Label>
                    <Input name="autor" type="text" />
                </InputArea>
                <InputArea>
                    <Label>Genero</Label>
                    <Input name="genero" type="text" />
                </InputArea>
                <InputArea>
                    <Label>Ano de Publicação</Label>
                    <Select name="ano_publicacao" >
                        {Array.from({ length: 500 }, (_, index) => {
                            const year = new Date().getFullYear() - index;
                            return <option key={year} value={year}>{year}</option>;
                        })}
                    </Select>
                </InputArea>
                <Button type="submit">SALVAR</Button>
            </FormContainer>
        </>
    );

};
export default Form;