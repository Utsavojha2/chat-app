import { Avatar } from "@material-ui/core";
import {db} from '../../firebase';
import React, {useState, useEffect} from 'react';
import {useGlobalContext} from '../../context';

const User = ({addedUsers, id}) => {
    const {setCurrentChatID} = useGlobalContext();
    const [appUsers, setAppUsers] = useState([]);
    const info = appUsers.length && appUsers.filter(el => el.data.email === addedUsers[1])[0];

    useEffect(() => {
        const unsubscribe = db.collection('users').onSnapshot(snap => {
            setAppUsers(snap.docs.map(doc => ({
                id : doc.id,
                data : doc.data()
            })))
        })

        return () => unsubscribe();
    }, [])

    return (
            <div onClick={() => {
                setCurrentChatID(id);
            }}>
                {info ? <Avatar src={info.data.userImg} alt="" /> 
                : <Avatar style={{backgroundColor : "black"}}>{addedUsers[1][0].toUpperCase()}</Avatar>}
                <h4>{addedUsers[1]}</h4>
            </div>
    ) 
}

export default User;

