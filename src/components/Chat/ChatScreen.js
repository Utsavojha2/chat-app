import { Avatar } from '@material-ui/core';
import styled, {css} from 'styled-components';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime';
import {auth} from '../../firebase';
import {useAuthState} from 'react-firebase-hooks/auth';
import React, {useState} from 'react';

const ChatScreen = ({chatMessages, chatUsers}) => {

    return chatMessages.length ? (
    <div style={{marginTop : '-15px', marginBottom : '50px'}}>
        {chatMessages.map(el => {
        const {id, data} = el;
        return <Message key={id} {...data} chatUsers={chatUsers} />})}
    </div> 
    ) : (
        <StartContainer>
            <div>
                <h3>Start Up A Conversation Now!</h3>
                <ExitToAppIcon />
            </div>
        </StartContainer>
    )
}

export default ChatScreen;


const Message = ({msg, userImg,uid, timestamp}) => {
    const [user] = useAuthState(auth);

    const time = new Date(timestamp?.toDate());
    dayjs.extend(relativeTime);
  
    const [doesUserMatch, setUserMatch] = useState(user?.uid === uid);
 
    return (
        <MessageContainer doesUserMatch={doesUserMatch}>
            <Avatar src={userImg} alt="" />
            <p>{msg}</p>
            <small>{timestamp ? dayjs(time).fromNow() : null}</small>
        </MessageContainer>
    )
}

const StartContainer  = styled.div`
     display : grid;
     place-items : center;
     height : 70vh;

     @media screen and (max-width : 768px){
        height: 100vh;
     }

     & > div {
         display : flex;
         align-items: center;
         column-gap: 20px;

         @media screen and (max-width : 768px){
            column-gap: 8px;
         }

         & > h3{
             font-size: 30px;

             @media screen and (max-width : 768px){
                 font-size: 20px;
             }
         }

         & > .MuiSvgIcon-root{
            font-size: 30px !important;
         }
     }
`;

const MessageContainer = styled.div`
    display: flex;
    align-items : center;
    margin: 12px;
    position: relative;
    width: fit-content;
    ${({doesUserMatch}) => doesUserMatch ? css `
        margin-left: auto;

        & > *:nth-child(1){
            order: 1;
            margin: 15px;
        }

        & > p {
            background-color: #3cabfa !important;
            color: white;
        }

        & > small{
            left : 0px;
        }
        
    ` : css`
        order: 0;
    `}


    & > *:nth-child(1):hover{
        cursor: pointer;
        transform: scale(1.09);
    }

    & > p{
        font-size: medium;
        background-color: lightgray;
        padding: 12px 15px;
        border-radius: 20px;
        margin: 10px;
        margin-right: auto;
    }

    & > small{
        position: absolute;
        color: gray;
        font-size: 9px;
        bottom: -5px;
        right: -15px;
    }
    
`;





