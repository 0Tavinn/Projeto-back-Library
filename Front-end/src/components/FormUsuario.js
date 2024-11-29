import React, { useEffect, useRef, useState } from "react";
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

const Label = styled.label``;

const Button = styled.button`
    padding: 10px;
    cursor: pointer;
    border-radius: 5px;
    border: none;
    background-color: #2c73d2;
    color: white;
    height: 42px;
`;

const Form = ({ getUsers, onEdit, setOnEdit }) => {
    const ref = useRef();
    const [telefone, setTelefone] = useState("");

    useEffect(() => {
        if (onEdit) {
            const user = ref.current;
            user.nome.value = onEdit.nome;
            user.endereco.value = onEdit.endereco;
            user.email.value = onEdit.email;
            setTelefone(onEdit.telefone); // Preenche com o telefone formatado
        }
    }, [onEdit]);

    // Função para formatar o telefone
    const formatPhone = (value) => {
        // Remove tudo que não for número
        const onlyNumbers = value.replace(/\D/g, "");

        // Aplica a máscara do telefone
        const formattedPhone = onlyNumbers
            .replace(/^(\d{2})(\d)/, "($1) $2")
            .replace(/(\d{4,5})(\d{4})$/, "$1-$2");

        return formattedPhone;
    };

    // Função para lidar com a mudança no campo de telefone
    const handlePhoneChange = (e) => {
        const formattedValue = formatPhone(e.target.value);
        setTelefone(formattedValue); // Atualiza o estado com o valor formatado
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const user = ref.current;

        if (
            !user.nome.value ||
            !user.endereco.value ||
            !user.email.value ||
            !telefone // Verifica se o telefone está preenchido
        ) {
            return toast.warn("Preencha todos os campos!");
        }

        if (onEdit) {
            await axios
                .put("http://localhost:8081/user/" + onEdit.idusuario, {
                    nome: user.nome.value,
                    endereco: user.endereco.value,
                    email: user.email.value,
                    telefone: telefone, // Envia o telefone formatado
                })
                .then(({ data }) => toast.success(data))
                .catch((error) => {
                    const errorMessage = error.response?.data?.error || 'Erro desconhecido';
                    toast.error(errorMessage, {
                        style: {
                            color: 'red',         
                            backgroundColor: '#ffe6e6', 
                        },
                    });
                });
        } else {
            await axios
                .post("http://localhost:8081/user", {
                    nome: user.nome.value,
                    endereco: user.endereco.value,
                    email: user.email.value,
                    telefone: telefone, // Envia o telefone formatado
                })
                .then(({ data }) => toast.success(data))
                .catch((error) => {
                    const errorMessage = error.response?.data?.error || 'Erro desconhecido';
                    toast.error(errorMessage, {
                        style: {
                            color: 'red',         
                            backgroundColor: '#ffe6e6', 
                        },
                    });
                });
        }

        user.nome.value = "";
        user.endereco.value = "";
        user.email.value = "";
        setTelefone(""); // Limpa o telefone após o envio
        setOnEdit(null);
        getUsers();
    };

    return (
        <>
            <FormContainer ref={ref} onSubmit={handleSubmit}>
                <InputArea>
                    <Label>Nome</Label>
                    <Input
                        name="nome"
                        type="text"
                        onKeyUp={(e) => {
                            const invalidKeys = [
                                "Backspace", "Tab", "Enter", "CapsLock", "Shift", "Control",
                                "Alt", "ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown"
                            ];
                            
                            if (invalidKeys.includes(e.key)) return;

                            const hasNumber = /\d/.test(e.target.value);
                            if (hasNumber) {
                                e.target.value = "";
                                toast.warn("Não são permitidos números nesse campo!");
                            }
                        }}
                    />
                </InputArea>
                <InputArea>
                    <Label>Endereço</Label>
                    <Input name="endereco" type="text" />
                </InputArea>
                <InputArea>
                    <Label>E-mail</Label>
                    <Input name="email" type="email" />
                </InputArea>
                <InputArea>
                    <Label>Telefone</Label>
                    <Input
                        name="telefone"
                        type="text"
                        value={telefone}
                        onChange={handlePhoneChange} // Aplica a formatação no telefone
                        maxLength={15} // Limita a quantidade de caracteres
                        placeholder="(XX) X XXXX-XXXX"
                    />
                </InputArea>
                <Button type="submit">SALVAR</Button>
            </FormContainer>
        </>
    );
};

export default Form;
