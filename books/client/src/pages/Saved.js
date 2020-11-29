import React, { useState, useEffect } from "react";
import { Col, Container, Form, ListGroup, Row } from "react-bootstrap";
import { BookListItem } from "../components/BookList";
import DeleteBtn from "../components/DeleteBtn";
import API from "../utils/API";

function Saved() {
  const [books, setBooks] = useState([]);
  const [displayBook, setDisplayBook] = useState();

  useEffect(async () => {
    const response = await loadBooks();
    await setDisplayBook(response[0]);
  }, []);

  async function loadBooks() {
    try {
      const response = await API.server.searchDB();
      await setBooks(response.data);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  };

  // Deletes a book from the database with a given id, then reloads books from the db
  function deleteBook(id) {
    API.server.delete(id)
      .then(res => loadBooks())
      .catch(err => console.log(err));
  }

  function findBookInState(id) {
    return books.filter(item => {
      return item.key === id;
    });
  };

  function handleBookRead(key) {
    const bookToRead = findBookInState(key)[0];
    if (!bookToRead.read) {
      bookToRead.read = true;
    } else {
      bookToRead.read = false;
    }
    API.server.update(bookToRead._id, bookToRead);
    loadBooks();
  }

  function handleBookLinkClick(key) {
    const bookToDisplay = findBookInState(key)[0];
    setDisplayBook(bookToDisplay);
  }

  return (
    <>
      <Container className="savedPage">
        <Row>
          <Col xs={9} className="bookDisplayArea">
            {displayBook ? (
              <div>
                <h1>This Book: {displayBook.title}</h1>
                <BookListItem
                  key={displayBook.key}
                  title={displayBook.title}
                  authors={displayBook.authors}
                  link={displayBook.previewLink}
                  description={displayBook.description}
                  image={displayBook.image}
                  checkbox={() => handleBookRead(displayBook.key)}
                  read={displayBook.read}
                  checkText="Read"
                  subtitle={displayBook.subtitle}
                  publisher={displayBook.publisher}
                  publishedDate={displayBook.publishedDate}
                />
              </div>
            ) : (
                " "
              )}
          </Col>
          <Col xs={3} className="sideboard">
            <h2>Saved Books:</h2>
            {books.length ? (
              <ListGroup>
                <ListGroup.Item key="description">
                <Row noGutters={true} className="d-flex justify-content-between" >
                  <p>Read:</p>
                  <p>Delete:</p>
                </Row>
                </ListGroup.Item>
                {books.map(book => {
                  return (
                    <ListGroup.Item key={book._id}>
                      <Row noGutters={true} >
                        <Col md={2}>
                        <Form>
                          <Form.Check checked={!!book.read} aria-label="Book Has Been Read" onChange={() => handleBookRead(book.key)} />
                          </Form>
                        </Col>
                        <Col md={10}>
                          <a onClick={() => handleBookLinkClick(book.key)}>
                            <strong>
                              {book.title} by {book.authors}
                            </strong>
                          </a>
                          <DeleteBtn onClick={() => deleteBook(book._id)} />
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  );
                })}
              </ListGroup>
            ) : (
                <h3>No Results to Display</h3>
              )}

          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Saved;