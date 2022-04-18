import React, { useEffect, useState } from 'react';
import Button from '../Prijava/Button';
import Card from '../Prijava/Card';
import astronaut from "../Assets/astronaut.svg"
import ninja from "../Assets/ninja.svg"
import detective from "../Assets/detective.svg"



export default function Login(props) {

    const [usernameIsValid, setUsernameIsValid] = useState(1);
    

useEffect(() => {
console.log(props.user);
}, [props.user])

    const handleUser = (event) => {
      console.log("ovo je user")
      console.log(props.user)
        event.preventDefault();
        if (props.user.username.trim().length === 0) {
          setUsernameIsValid(false);
          return;
        }
        setUsernameIsValid(true);
        props.onLogin(props.user.username);
      };


      const handleUsername = (event) => {
        props.setUser(prevValues => (
          {...prevValues,  username: event.target.value})
          )
      };


      const handleColor = (event) => {
        props.setUser(prevValues => (
          {...prevValues,  userColor: event.target.value})
          )
      }
      const submitUser = () => {
        props.setUsernameSubmitted(true)
      }

      
      const handleAvatar = (avatar) => {
        console.log(avatar);
        let userAvatar
    
        switch (avatar) {
          case 1: userAvatar = astronaut; break;
          case 2: userAvatar = ninja; break;
          default: userAvatar = detective; break;
        }
    
        props.setUser(prevValues => ({ ...prevValues, avatar: userAvatar, avatarId: avatar}))
      }
    

    return(
        <Card
            className={
                !usernameIsValid ? "login invalid" : "login"
            }
            >
          <form onSubmit={handleUser}>
              <h1 className="instruction">First type your chat name and pick an avatar</h1>
              <input className="inputText"
                type='text'
                placeholder='Your chat name'
                onChange={handleUsername}
              />
              <label>Choose one from existing avatars</label>
              <div className="avatars">
                <div className={`item ${props.user.avatarId === 1 ? 'active' : ''}`} onClick={() => handleAvatar(1)}>
                  <img src={astronaut} alt="" />
                </div>
                <div className={`item ${props.user.avatarId === 2 ? 'active' : ''}`} onClick={() => handleAvatar(2)}>
                  <img src={ninja} alt="" />
                </div>
                <div className={`item ${props.user.avatarId === 3 ? 'active' : ''}`} onClick={() => handleAvatar(3)}>
                  <img src={detective} alt="" />
                </div>
              </div>
              
              <label>Odaberite boju</label>
              <input className="inputColor" type="color" onChange={handleColor} value={props.user.userColor}></input>

              <Button type='submit' onClick={submitUser}>OK</Button>
          </form>
        </Card>
    )
}