import React from "react";
import "./style.css";
import { Jumbotron } from "react-bootstrap";

function HeroSection() {
  return (
    <Jumbotron className="text-center">
      <h1>React Books</h1>
      <a target="_blank" rel="noopener noreferrer" href="https://developers.google.com/books">
        Powered by Google Books
      </a>
    </Jumbotron>
  );
}

export default HeroSection;