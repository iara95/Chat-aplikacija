import './App.css';
import { useState, useEffect } from "react";

import Input from "./Components/Chat/Input";
import Message from "./Components/Chat/Message";
import Login from './Components/Prijava/Login';
import astronaut from "./Components/Assets/astronaut.svg"
import ninja from "./Components/Assets/ninja.svg"
import detective from "./Components/Assets/detective.svg"


function randomColor() {
  return "#" + Math.floor(Math.random() * 0xffffff).toString(16);
}

function App() {

  const [user, setUser] = useState({
    username: '',
    userColor: randomColor(),
    avatar: astronaut,
    avatarId: 0
  });

  const [messages, setMessages] = useState([]);
  const [drone, setDrone] = useState();
  const [userID, setUserID] = useState();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [usernameSubmitted, setUsernameSubmitted] = useState(false)


useEffect(() => {
  if(usernameSubmitted){
    console.log(`ovo je to ${usernameSubmitted}`)
    const drone = new window.Scaledrone("cqXFOa7wXB8yCDxG", {
      data: user,
    });
    setDrone(drone);
  }
  // eslint-disable-next-line
}, [usernameSubmitted]);

useEffect(() => {
  if (drone) {
    drone.on("open", (error) => {
      if (error) {
        console.log("Error on connecting", error);
      }

      const chatRoom = drone.subscribe("observable-room");

      chatRoom.on("open", (error) => {
        if (error) {
          return console.error(error);
        }
        // Connected to room
      });

      chatRoom.on("data", (text, chatUser) => {
         setUserID(drone.clientId);

        const username = chatUser.clientData.username;
        const chatUserID = chatUser.id;
        const userColor = chatUser.clientData.userColor;
        const userAvatar = chatUser.clientData.avatar;
        const timeStamp = new Date()

        console.log(`text je ${text}`)
        
        setMessages((oldArray) => [
          ...oldArray,
          { text, username, userColor, chatUserID, user, timeStamp, userAvatar },
        ]);
      });
    });
  }
}, [drone])

  const onSendMessage = (message) => {
    if (message) {
      drone.publish({
        room: "observable-room",
        message,
      });
    }
  };

  const loginHandler = (username) => {
    setIsLoggedIn(true);
    console.log('User', username, 'connected!');
  };

  return (
    <div className="App">
    {!isLoggedIn && <Login user={user} setUser={setUser} usernameSubmitted={usernameSubmitted} setUsernameSubmitted={setUsernameSubmitted} onLogin={loginHandler}/>}
    {isLoggedIn && 
      
      <>
        <div className="App-header">
          <h1>Moja chat aplikacija</h1>
        </div>
        <div>
          <Message messages={messages} userID={userID}/>
          <Input onSendMessage={onSendMessage} />
        </div>
      </>
    }
    </div> 
  );
}

export default App;
