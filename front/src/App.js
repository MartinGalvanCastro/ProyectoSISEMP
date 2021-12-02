import React, {useState,useEffect} from 'react';
import './App.css';
import Container from "react-bootstrap/Container"
import HomeScreen from "./views/main"

function App() {
  const [user,setUser] = useState({})
  useEffect(()=>{
    fetch('/teammember/random')
    .then(res=>res.json())
    .then(res=>setUser(res))
  },[])
  
  return (
    <Container className="App">
      <HomeScreen/>
    </Container>
  );
}

export default App;
