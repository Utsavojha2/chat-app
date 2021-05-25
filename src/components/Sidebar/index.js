import * as Styled from './styles'
import MessageIcon from '@material-ui/icons/Message';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { Avatar, IconButton } from '@material-ui/core';
import { Search } from '@material-ui/icons';
import React, {useState, useEffect} from 'react';
import CloseIcon from '@material-ui/icons/Close';
import {db, auth} from '../../firebase';
import {useAuthState} from 'react-firebase-hooks/auth';
import User from './User';
import {useGlobalContext} from '../../context';

const Sidebar = () => {
    const [sidebarScroll, setSidebarScroll] = useState(false);  
    const [user] = useAuthState(auth);
    const {totalUsers, setTotalUsers, sidebarMenuOpen , setSidebarMenuOpen} = useGlobalContext();

 
    useEffect(() => {
       db.collection('chats').onSnapshot((snap) => {
           const totalUsersArray = snap.docs.map(doc => ({
               id : doc.id,
               users : doc.data().users
           }))
           const specificUsersArray = totalUsersArray.filter(el => el.users[0] === user?.email);
           const mutualAddition = totalUsersArray.filter(el => el.users[1] === user?.email).map(el => ({
               id : el.id,
               users : el.users?.reverse()
           }));
            const newCombArray = specificUsersArray.concat(mutualAddition);
            setTotalUsers(newCombArray);
       }, (error) => {
            alert(error.message);
       })
    }, [user])

    const validateEmail = (email) => {
         var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if(re.test(email)){
            if(email.indexOf("@gmail.com", email.length - "@gmail.com".length) !== -1){
                return true;
            } else {
                return false;
            }
       }
       return false;
    }

    const onSidebarScroll = (e) => {
        if(e.target.scrollTop > 11){
            setSidebarScroll(true);
        } else {
            setSidebarScroll(false);
        }
    }

    const addUser = () => {
        const userEmail = prompt('Please enter a valid user email');
        const val = totalUsers.map(el => el.users[1]).every(el => el !== userEmail);

        if(!val){
            alert('The user already exists in your list');
        }

        if(userEmail?.trim().length !== 0 && !validateEmail(userEmail)){
            alert('Invalid Gmail Account')
            return false;
        }

        if(userEmail?.trim().length !== 0 && validateEmail(userEmail) && userEmail !== user.email && val){
            db.collection('chats').add({
               users : [user.email, userEmail]
            })
        } 
    }


    return (
        <Styled.SideContainer onScroll={onSidebarScroll} users={5} menuOpen={sidebarMenuOpen}>
            <Styled.SidebarHeader sidebarScroll={sidebarScroll}>
                <Avatar onClick={(() => {
                    auth.signOut();
                })} title="Sign Out" src={user ? user?.photoURL : ""} alt ={user && user.displayName} />
                <div>
                    <IconButton><MessageIcon /></IconButton>
                    <IconButton><MoreVertIcon /></IconButton> 
                    {sidebarMenuOpen && <CloseIcon fontSize="large" onClick={() => setSidebarMenuOpen(!sidebarMenuOpen)}/>}
                </div>
            </Styled.SidebarHeader>
            <Styled.SidebarSearch>
                <Search />
                <input type="text" placeholder="Search in chats" />
            </Styled.SidebarSearch>
            <h3 onClick={addUser}>START A NEW CHAT</h3>
            <Styled.SidebarUsers>
                {totalUsers?.map(el => {
                    const {id, users} = el;
                    return <User key={id} id={id} addedUsers={users} />
                })}      
            </Styled.SidebarUsers>
        </Styled.SideContainer>
    )
}

export default Sidebar
