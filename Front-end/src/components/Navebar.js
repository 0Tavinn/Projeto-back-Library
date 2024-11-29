import React, {useRef} from "react";
import styled from "styled-components";

const Navbar = styled.nav`
  position: fixed; /* Fixa a navbar no topo da página */
  top: 0;
  left: 0;
  width: 98%; /* Garante que ocupa 100% da largura */
  background-color: #4a5d42; /* Cor de fundo semelhante à imagem */
  padding: 10px 20px;
  color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 1000; /* Mantém a navbar acima de outros elementos */
  
`;



const Logo = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;

  img {
    width: 30px;
    height: 30px;
  }
`;

const H1 = styled.h1`
  margin-right: 7%;
`;


const ProfileSection = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;

  img {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    cursor: pointer;
  }
`;
const NotificationButton = styled.button`
  position: relative;
  background-color: #4a5d42; /* Mesma cor do fundo da navbar */
  padding: 10px;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  color: #ccc;
  transition: color 0.3s, background-color 0.3s;

  &:hover {
    color: white;
    background-color: #3c4e37;
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px white, 0 0 0 4px #2c7d2b;
  }

  svg {
    width: 24px;
    height: 24px;
  }
`;
const Navebar = ({onEdit}) => {
    const ref = useRef();
    return(
    <>
        {/* Navbar */}
        <Navbar ref={ref}>
          <Logo>
            <img src="https://w7.pngwing.com/pngs/606/201/png-transparent-mississauga-library-system-school-library-public-library-online-public-access-catalog-library-miscellaneous-trademark-logo.png" alt="Logo" />
            <span><h2>Lumina Library</h2></span>
          </Logo>
          <H1>Sistema de Gerenciamento de Biblioteca</H1>
          <ProfileSection>
          <NotificationButton>
            <span className="sr-only">View notifications</span>
            <svg fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0"
              />
            </svg>
          </NotificationButton>
            <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="Perfil" />
          </ProfileSection>
        </Navbar>
        </>
    );

};
export default Navebar;