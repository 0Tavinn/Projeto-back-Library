import{createGlobalStyle} from "styled-components";

const Global = createGlobalStyle`
    * {
    margin: 0;
    padding:0;
    font-family: 'poppins', sans-serif;
    }

    body{
    width: 100vw;
    height: 100vh;
    dislpay: flex;
    justify-content: center;
    background-image: url('https://png.pngtree.com/background/20230517/original/pngtree-book-shelf-picture-image_2639167.jpg');
}
`;

export default Global;