import styled, {css} from 'styled-components';


export const ChatContainer = styled.div`
    flex : 0.7;
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100vh;
    overflow-y: scroll;
    overflow-x: hidden;
    scroll-behavior: smooth;

    @media screen and (max-width : 768px){
    
        ${({menuOpen}) => menuOpen ? css`
            display: none;
        ` : css`
            display: block;
            flex : 1;
            flex-grow: 1;
            ::-webkit-scrollbar {
                width: 0;  /* Remove scrollbar space */
                background: transparent;  /* Optional: just make scrollbar invisible */
            }
        `};
    }
`;


export const ChatHeader = styled.div`
    background-color: lightgray;
    display : flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px 20px;
    height:62px;
    position: sticky;
    top: 0px;
    z-index: 100;

    @media screen and (max-width : 768px){
        ${({menuOpen}) => !menuOpen && css`
            height: 75px;
            width: 113%;
        `};
    }
`;


export const HeaderLeft = styled.div`
  display : flex;
  align-items: center;
  column-gap: 10px;

  & > .MuiSvgIcon-root{
      font-size: 30px !important;
      display:none;
      &:hover{
          cursor: pointer;
          opacity: 0.7;
      }
  }

  & > div > p:nth-child(1){
    margin-bottom: -12px;
    font-weight: bold;
    font-size: 18px;

    @media screen and (max-width: 768px){
        font-size: 16px;
    }
  }

  & > div > p:nth-child(2){
    font-weight: light;
    font-size: 15px;
    color: gray;

    @media screen and (max-width: 768px){
        font-size: 11px;
        margin-top: 18px;
    }
  }

    @media screen and (max-width: 768px){
        & > .MuiSvgIcon-root{
        display:inline-flex;
    }
  }

  & > div > span{
        font-weight: light;
        font-size: 14px;
        color: gray;
        display : flex;
        align-items: center;
        column-gap: 5px;
        margin: 15px 0;

        & > small{
            width: 10px;
            height : 10px;
            background-color: green;
            border-radius : 50%;
        }
    }
`;



export const HeaderRight = styled.div`
    display: flex; 
    flex-direction: row-reverse;
    align-items: center;

    @media screen and (max-width: 768px){
        margin-right: 22px;
        & > *:not(:nth-child(3)){
            display : none;
        }
    }
`;

export const ChatBody = styled.div`
    flex : 1;
    flex-grow: 1;
    position: relative;
    width: 100%;
    padding: 10px 15px;

    @media screen and (max-width: 768px){
        min-height: 100%;
    }
`;

export const ChatForm = styled.form`
    background-color: gray;
    display: flex;
    column-gap: 2px;
    align-items: center;
    height: 70px;
    padding: 10px 18px;
    color: white !important;
    position: sticky;
    bottom : 0px;
    z-index: 100;

    @media screen and (max-width: 768px){
        ${({menuOpen}) => !menuOpen ? css`
        position: sticky;
        bottom: 0px;
        right: 0;
        left: 0px;
        width : 113%;
        ` : css`
         display: none;
        `}
    }

    & > input{
        flex : 1;
        background-color: white;
        height: 25px;
        border: none;
        outline-width: 0px;
        text-indent: 1%;
        border-radius: 15px;
        height: 30px;
        font-size: 18px;

        @media screen and (max-width: 768px){
            flex: 0.9;
        }
    }

    & > button {
        color: white !important;

        &:hover{
            filter : brightness(10%);
        }
    }

    @media screen and (max-width: 568px){
        & > button:nth-child(1){
            display:none;
        }

        & > input{
            text-indent: 5%;
            font-size: 15px;
        }
    }
`;

export const ModalContainer = styled.div`
    display: ${({modalOpen}) => modalOpen ? 'block' : 'none'}; 
    position: fixed; 
    z-index: 200;
    padding-top: 100px; 
    left: 0;
    top: 0;
    width: 100%;
    height: 100%; 
    overflow: auto; 
    background-color: rgb(0,0,0); 
    background-color: rgba(0,0,0,0.4); 
    display: grid; 
    place-items: center;
`;

export const ModalContent= styled.div`
    margin-top: -150px;
    background-color: #fefefe;
    border: 1px solid #888;
    width: 30%;
    position: relative;
    height: 140px;
    padding: 14px 20px 10px 20px;

    @media screen and (max-width : 768px){
        width : 80%;
    }

    & > p{
        font-size: 18px;
    }

    & > span{
        color: #aaaaaa;
        position: absolute;
        top: 0px;
        right : 5px;
        font-size: 38px;
        font-weight: bold;

        &:hover{
            color: #000;
            text-decoration: none;
            cursor: pointer;
        }
    }

    & > button{
        padding: 8px 13px;
        background-color: blue;
        color: white;
        font-size : 16px;
        border : none;
        outline-width: 0px;
        border-radius : 5px;
        cursor : pointer;

        &:hover{
            opacity : 0.62;
        }
    }

    & > button:nth-child(4){
        background-color: black;
        margin-left : 10px;
    }
`;