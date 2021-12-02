import React, { useState, useEffect } from "react";
import "./App.css";
import Container from "react-bootstrap/Container";
import HomeScreen from "./views/main";
import axios from "axios";

function App() {
  const [user, setUser] = useState({});
  useEffect(() => {
    axios.get("/teammember/?random=true").then(res => setUser(res.data));
  }, []);

  return (
    <Container className="App">
      <HomeScreen user={user} />
    </Container>
  );
}

export default App;
