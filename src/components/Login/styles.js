import styled from 'styled-components';

export const LoginContainer = styled.div`
    overflow: hidden;
    > div {
    display: flex;
    width: 100vw;
    height: 95vh;

    @media screen and (max-width: 768px){
            align-items: center;
            justify-content: center;
        }
    }
    & > div > img{
        height: 100%;
        width: 50%;
        margin-left: 80px;

        @media screen and (max-width: 768px){
            display: none;
        }
    }
    & > div > div{
        width: 50%;
        display: flex;
        flex-direction: column;
        row-gap: 20px;
        align-items:center;
        justify-content:center;
        & > img{
            width: 120px;
            height: 120px;
        }
        & > h2{
            font-size: 45px;

            @media screen and (max-width: 768px){
               font-size: 29px;
          }
        }
        & > button{
            background-color: black;
            color: white;
            padding: 7px 12px;
            width: 250px;
            font-size: 16px;
            border-radius: 20px;
            border: none;
            outline-width: 0px;
            cursor: pointer;
            &:hover{
                opacity: 0.82;
            }
        }
        & > div{
            display: flex;
            align-items:center;
            column-gap: 13px;
            & > h4{
                font-size: 22px;
            }
            & > .loading{
                color: black;
                width: 23px !important;
                height : 23px !important;
            }
        }
    }
    & > ul{
        width: 90vw;
        display: flex;
        align-items:center;
        justify-content:center;
        list-style: none;
        column-gap: 38px;
        color: gray;
        font-size: 14px;
        margin: 7px;

        @media screen and (max-width: 768px){
            display: none;
        }
        
        & > li{
            cursor: pointer;
            &:hover{
                text-decoration: underline;
            }
        }
    }
`;