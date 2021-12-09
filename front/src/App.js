import React, {useState,useEffect} from 'react';
import './App.css';
import Container from "react-bootstrap/Container"
import HomeScreen from "./views/main"
import axios from "axios";

function App() {
  const [update,setUpdate] = useState(false)
  const [user, setUser] = useState({});
  const [allUsers,setAllUsers] = useState({})
  const [projects, setProjects] = useState({})
  const [activities, setActivities] = useState({})
  const [task, setTask] = useState({})
  useEffect(() => {
    axios.get("http://localhost:3000/teammember/61a915549b0d733fdc7f4633").then(res => setUser(res.data))
    .catch(error => {
      console.log(error)
    })
  }, [update]);
  useEffect(() => {
    axios.get("http://localhost:3000/project").then(res => setProjects(res.data))
    .catch(error => {
      console.log(error)
    })
  }, [update]);
  useEffect(() => {
    axios.get("http://localhost:3000/task").then(res => setActivities(res.data))
    .catch(error => {
      console.log(error)
    })
  }, [update]);

  useEffect(() => {
    axios.get("http://localhost:3000/task").then(res => setTask(res.data))
    .catch(error => {
      console.log(error)
    })
  }, [update]);

  useEffect(() => {
    axios.get("http://localhost:3000/teammember").then(res => setAllUsers(res.data))
    .catch(error => {
      console.log(error)
    })
  }, [update]);


  
  return (
    <Container className="App">
      <HomeScreen user={user} projects={projects} activities={activities} task={task} allUsers={allUsers} setUpdate={setUpdate}/>     
    </Container>
  );
}

export default App;
