import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from "react-router-dom";
import { Container } from "react-bootstrap";
import HeroSection from "./components/HeroSection";
import Header from "./components/Header";
import Search from "./pages/Search";
import Saved from "./pages/Saved";


function App() {


  return (
    <Router>
      <div className="app">
        <Header />
        <Container fluid>
          <Switch>
            <Route path="/" exact>
              <HeroSection />
              <Search />
            </Route>
            <Route path="/search">
              <HeroSection />
              <Search />
            </Route>
            <Route path="/saved">
              <Saved />
            </Route>
          </Switch>
        </Container>
      </div>
    </Router>
  );
}

export default App;