import React, {useState,useEffect} from 'react';
import './App.css';
import Container from "react-bootstrap/Container"
import HomeScreen from "./views/main"
import axios from "axios";

function App() {
  const [user, setUser] = useState({});
  const [projects, setProjects] = useState({})
  const [activities, setActivities] = useState({})
  useEffect(() => {
    axios.get("http://localhost:3000/teammember/61a915549b0d733fdc7f4633").then(res => setUser(res.data))
    .catch(error => {
      console.log(error)
    })
  }, []);
  useEffect(() => {
    axios.get("http://localhost:3000/project").then(res => setProjects(res.data))
    .catch(error => {
      console.log(error)
    })
  }, []);
  useEffect(() => {
    axios.get("http://localhost:3000/event").then(res => setActivities(res.data))
    .catch(error => {
      console.log(error)
    })
  }, []);
  
  return (
    <Container className="App">
      <HomeScreen user={user} projects={projects}/>     
    </Container>
  );
}

export default App;
