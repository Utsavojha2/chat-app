import styled, {css} from 'styled-components';

export const SideContainer = styled.div`
     background-color: lightgray;
     flex: 0.3;
     display: flex;
     flex-direction: column;
     overflow-y: ${({users}) => users > 7 ? 'scroll' : 'hidden'};
     overflow-x: hidden;
     height: 100vh;
    ::-webkit-scrollbar {
    width: 10px;
    }

    ::-webkit-scrollbar-track {
    box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    border-radius: 10px;
    }
    
    /* Handle */
    ::-webkit-scrollbar-thumb {
    background: gray; 
    border-radius: 10px;
    }

    /* Handle on hover */
    ::-webkit-scrollbar-thumb:hover {
    background: darkgrey; 
    }

     & > h3{
         margin-top: 20px;
         text-align: center;
         font-weight: 500;
         font-size: 16px;
         padding: 19px;

         &:hover{
             cursor: pointer;
             background-color:gray;
             color: white;
         }
     }

     @media screen and (max-width : 768px){
            ${({menuOpen}) => menuOpen ? css`
              flex-grow: 1;
              max-height: 100vh;
            ` : css`
                flex : 0;
              flex-grow: 0;
            `};
    }
`;

export const SidebarHeader = styled.div`
   display: flex;
   align-items: center;
   justify-content: space-between;
   padding: 10px;
   height:62px;
   padding-left: 13px;
   position: sticky;
   top: 0;
   z-index : 1;
   margin-bottom: 10px;
   border-right: 1px solid lightgray;
   background-color: ${({sidebarScroll}) => sidebarScroll ? 'rgb(110, 109, 109)' : 'white'};

    & > *:nth-child(1){
        cursor: pointer;
        color: white;

        &:hover{
        opacity: 0.85;
        }
    }

   & > div{
       display: flex; 
       align-items: center;
        & > * {
            color: ${({sidebarScroll}) => sidebarScroll ? 'white' : 'black'};
        }

        & > *:nth-child(3){
            display: none;

            @media screen and (max-width: 768px){
                display: inline-flex;
                color: red;
                margin-left: 15px;
                font-size: 34px !important;
                cursor:pointer;
            }
        }
   }
`;


export const SidebarSearch = styled.div`
   display: flex;
   align-items: center;
   column-gap: 2px;
   margin: 5px 10px -5px 10px;;
   background: white;
   border-radius: 20px;
   padding: 5px;

   & > input{
       background: transparent;
       border: none;
       outline-width : 0px;
       flex : 1;
       font-size: 15px;
   }

   & > .MuiSvgIcon-root{
       margin-top: 2px;
       margin-left: 10px;
       font-size: 22px !important;
   }
`;

export const SidebarUsers = styled.div`
  flex : 1;
  margin-top: -12px;

  & > div{
      display : flex;
      align-items: center;
      column-gap: 12px;
      padding: 2px;
      margin-bottom: 5px;
      cursor: pointer;
      padding-left: 13px;
      width: 100%;

      @media screen and (max-width: 768px){
        column-gap: 8px;
      }

      &:hover{
             cursor: pointer;
             background-color:gray;
             color: white;
        }

      & > h4{
          font-size: 16px;
          font-weight: 400;
          width: 100%;
          height: auto;
          word-wrap: break-word;
          white-space: pre-wrap;
          max-width: 250px;

          @media screen and (max-width: 768px){
              font-size: 15px;
              max-width: 180px;
          }
      }

      @media screen and (max-width: 768px){
          & > *:nth-child(1){
             width: 28px !important;
             height: 28px !important;
          }
      }
  }
`;

















