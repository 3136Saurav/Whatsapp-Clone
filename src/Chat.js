import React, { useEffect, useState } from 'react';
import { Avatar, IconButton } from "@material-ui/core";
import AttachFileSharpIcon from '@material-ui/icons/AttachFileSharp';
import SearchOutlined from '@material-ui/icons/SearchOutlined';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import MicIcon from '@material-ui/icons/Mic';
import './Chat.css';
import MoreVert from '@material-ui/icons/MoreVert';
import { useParams } from 'react-router-dom'; 
import db from "./firebase";
import firebase from "firebase";
import { useStateValue } from "./StateProvider";

function Chat() {
    const [seed, setSeed] = useState("");
    const [input, setInput] = useState("");
    const [roomName, setRoomName] = useState(""); 
    const [messages, setMessages] = useState([]);
    const [{ user }, dispatch] = useStateValue();
    const { roomId } = useParams();

    useEffect(() => {
        setSeed(Math.floor(Math.random() * 5000));
    }, [roomId])

    useEffect(() => {
        if (roomId) {
            db.collection('rooms').doc(roomId).onSnapshot(snapshot => (setRoomName(snapshot.data().name)))
            db.collection('rooms').doc(roomId).collection('messages').orderBy('timestamp', 'asc').onSnapshot((snapshot) => setMessages(snapshot.docs.map((doc) => doc.data())))
        }
    }, [roomId])

    const sendMessage = (e) => {
        e.preventDefault();
        // alert(input);
        if (input){
            db.collection('rooms').doc(roomId).collection("messages").add({
                message: input,
                name: user.displayName,
                timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            });
        }
        setInput("");
    }

    return (
        <div className="chat">
            <div className="chat__header">
                <Avatar src={`https://avatars.dicebear.com/api/avataaars/${seed}.svg`} />
                <div className="chat__headerInfo">
                    <h3>{roomName}</h3> 
                    <p>Last seen at ...</p>   
                </div>
                <div className="chat__headerRight">
                    <IconButton>
                        <SearchOutlined />
                    </IconButton>
                    <IconButton>
                        <AttachFileSharpIcon />
                    </IconButton>
                    <IconButton>
                        <MoreVert />
                    </IconButton>
                </div>
            </div>
            <div className="chat__body">
                {messages.map(message => (
                    <p className={`chat__message ${message.name === user.displayName && "chat__receiver"}`}>
                    <span className="chat__name">{message.name}</span>
                    {message.message}
                    <span className="chat__timestamp">{new Date(message.timestamp?.toDate()).toUTCString()}</span>
                </p>
                ))}

            </div>
            <div className="chat__footer">
                <IconButton>
                    <InsertEmoticonIcon />
                </IconButton>
                <form>
                    <input value={input} onChange={(e) => setInput(e.target.value)} type="text" placeholder="Type a message ..."/>
                    <button type="submit" onClick={sendMessage}>Send a message</button>
                </form>
                <IconButton>
                    <MicIcon />
                </IconButton>
            </div>
        </div>
    );
}

export default Chat; 