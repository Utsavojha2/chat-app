import AttachFileIcon from '@material-ui/icons/AttachFile';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { Avatar, CircularProgress, IconButton } from '@material-ui/core';
import EmojiEmotionsIcon from '@material-ui/icons/EmojiEmotions';
import SendIcon from '@material-ui/icons/Send';
import ViewHeadlineIcon from '@material-ui/icons/ViewHeadline';
import * as Styled from './styles.js';
import {useGlobalContext} from '../../context';
import {db, auth} from '../../firebase';
import React, {createRef, useState,useEffect } from 'react';
import ChatScreen from './ChatScreen.js';
import {useAuthState} from 'react-firebase-hooks/auth';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import ModalScreen from './ModalScreen';
import firebase from 'firebase';
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime';

const Chat = () => {
    dayjs.extend(relativeTime);
    const chatContainerRef = createRef();
    const [user] = useAuthState(auth);
    const [modalOpen, setModalOpen] = useState(false);
    const [usersNotExist, setUsersNotExist] = useState(null);
    const [chatUsers, setChatUsers] = useState(null);
    const [chatMessages, setChatMessages] = useState([]);
    const [term, setTerm] = useState("");
    const {totalUsers, currentChatID, setCurrentChatID, sidebarMenuOpen , setSidebarMenuOpen} = useGlobalContext();
    const [appUsers, setAppUsers] = useState([]);
    const [timeMap, setTimeMap] = useState(null);

    const getRightUser = chatUsers?.data?.users[1] !== user?.email ? chatUsers?.data?.users[1] : chatUsers?.data?.users[0];
 
    const info = appUsers.length && appUsers.filter(el => el.data.email === getRightUser)[0];


    useEffect(() => {
        const getUserActiveStatus = () => {
            const rightUsers = totalUsers.map(u => {
                const userRes = u?.users[1] !== user?.email ? u?.users[1] : u?.users[0];
                return userRes
            })
    
            const res = appUsers.filter(el => rightUsers.includes(el.data.email)).filter(el => el.data.email === getRightUser)[0];

            if(!res){
                setTimeMap(null);
                return;
            }
    
            if(res){
                const {data : {timestamp, lastSeen}} = res;
                const time = timestamp ? new Date(timestamp?.toDate()) : new Date(lastSeen?.toDate());
                const timeFromNow = dayjs(time).fromNow()
    
                 if( timeFromNow === 'a few seconds ago' || timeFromNow === 'a minute ago' || timeFromNow === '2 minutes ago' ){
                     setTimeMap('online');
                 } else {
                    setTimeMap(timeFromNow);
                 }
                return res;
            }
        }
    
        getUserActiveStatus();
    }, [getRightUser, chatMessages])


    const setId = () => {

        if(!totalUsers.length){
            setUsersNotExist(true);
            return;
        } else {
            setUsersNotExist(false);
        }

        if(totalUsers.length >= 1){
            setCurrentChatID(totalUsers[0].id)
        }
    }

    useEffect(() => {

        const unsubscribe = db.collection('users').onSnapshot(snap => {
            setAppUsers(snap.docs.map(doc => ({
                id : doc.id,
                data : doc.data()
            })))
        })    

        return () => unsubscribe();
    }, [])


    useEffect(() => {
        chatContainerRef.current.scrollTo(0, chatContainerRef.current.scrollHeight);
    }, [chatMessages])

    useEffect(() => {
        chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }, [getRightUser])


    useEffect(() => {
        if(currentChatID){
            const ref = db.collection('chats').doc(currentChatID);

            const chatRes = ref.get().then((el) => setChatUsers({
                id : el.id,
                data : el.data()
            }))
            
        
            const messagesRes = ref.collection('messages').orderBy("timestamp", "asc").onSnapshot(snap => {
                setChatMessages(snap.docs.map(doc => ({
                        id : doc.id,
                        data : doc.data()
                    }))
            )})
        }
    
    }, [currentChatID])


    useEffect(() => {
        setId();
    }, [totalUsers])


    const sendAMessage = (e) => {
        e.preventDefault();
        const debTerm = term.trim();
        if(debTerm){

            // update last seen 
            db.collection('users').doc(user.uid).set({
                timestamp : firebase.firestore.FieldValue.serverTimestamp(),
            }, {merge : true})

            // update messages
            db.collection('chats').doc(currentChatID).collection('messages').add({
                timestamp : firebase.firestore.FieldValue.serverTimestamp(),
                msg : debTerm,
                email : user?.email, 
                userImg : user?.photoURL,
                uid : user?.uid
            })

            setTerm("");
        }
    }

    const deleteContact = (id) => {
        db.collection("chats").doc(id).delete().then(() => {
            setModalOpen(false);
        }).catch((error) => {
            alert("Error in deletion. Try Again!");
        });

        const ref = db.collection('chats').doc(id).collection('messages')
        ref.onSnapshot(snapshot => {
            snapshot.docs.map(document => ref.doc(document.id).delete())
        })
    }

     return (
        <Styled.ChatContainer menuOpen={sidebarMenuOpen} ref={chatContainerRef} >
            <Styled.ChatHeader menuOpen={sidebarMenuOpen}>
                <Styled.HeaderLeft>
                {!sidebarMenuOpen && <ViewHeadlineIcon onClick={() =>         setSidebarMenuOpen(!sidebarMenuOpen) }/> }
                {usersNotExist ? <Avatar style={{backgroundColor : 'black'}} src="" alt="" />
                : info ? (
                <Avatar src={info.data.userImg} alt="" /> 
                ) : (
                <Avatar style={{backgroundColor : "black"}}>{getRightUser && getRightUser[0].toUpperCase()}</Avatar>
                )}
                {!usersNotExist ? 
                    (chatUsers  ?  (
                    <div>
                        <p>{getRightUser}</p>
                        { !timeMap && (
                        <p>
                            Last active: <span>unavailable</span>
                        </p>
                        )}
                        {(timeMap && timeMap !== 'online') && (
                        <p>
                            Last active: <span>{timeMap}</span>
                        </p>
                        )}
                        {(timeMap && timeMap === 'online') && (<span>
                         <small></small> Online
                        </span>
                        )}
                    </div>
                    ) : (
                    <CircularProgress style={{width : '25px', height :
                    '25px', marginLeft : '20px' }}/>
                    )) : <AppMessage />}
                </Styled.HeaderLeft>
                <Styled.HeaderRight> 
                    <IconButton><MoreVertIcon /></IconButton>
                    <IconButton><AttachFileIcon /></IconButton>
                    {totalUsers.length ? <IconButton title="Delete Contact" onClick={() => setModalOpen(true)}><DeleteForeverIcon /></IconButton> : null}
                </Styled.HeaderRight>
            </Styled.ChatHeader>
            <Styled.ChatBody>
                {modalOpen && <ModalScreen modalOpen={modalOpen} setModalOpen={setModalOpen} deleteContact={deleteContact} id={currentChatID}/>}
                <ChatScreen chatMessages={chatMessages} chatUsers={chatUsers} user={user}/>
            </Styled.ChatBody>
            <Styled.ChatForm menuOpen={sidebarMenuOpen}>
                <IconButton><EmojiEmotionsIcon /></IconButton>
                <input disabled={!totalUsers.length} value={term} onChange={(e) => setTerm(e.target.value)} type="text" placeholder="Message" />
                <IconButton disabled={!term} onClick={sendAMessage} type="submit"><SendIcon /></IconButton>
            </Styled.ChatForm>
         </Styled.ChatContainer>
     )
 }

 export default Chat;

 const AppMessage = () => (
     <div>
         Add users & connect with them
     </div>
 )

 
