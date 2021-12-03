import React, { useState, useEffect } from "react";
import "./App.css";
import Container from "react-bootstrap/Container";
import HomeScreen from "./views/main";
import axios from "axios";

function App() {
  const [user, setUser] = useState({});
  useEffect(() => {
    axios.get("/teammember/61a915549b0d733fdc7f4633").then(res => setUser(res.data));
  }, []);

  return (
    <Container className="App">
      <HomeScreen user={user} />
    </Container>
  );
}

export default App;
