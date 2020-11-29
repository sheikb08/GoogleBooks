import React, { useState } from "react";
import { BookList, BookListItem } from "../components/BookList";
import { Container, Row, Col, Button } from "react-bootstrap";
import Input from "../components/Input";
import API from "../utils/API";

function Search() {
  const [books, setBooks] = useState([]);
  const [bookSearch, setBookSearch] = useState("");

  const handleInputChange = event => {
    // Destructure the name and value properties off of event.target
    // Update the appropriate state
    const { value } = event.target;
    setBookSearch(value);
  };
  const interpretData = (data) => {
    const output = [];
    data.map(book => {
      const bookObj = {};

      if (book.id) {
        bookObj.bookId = book.id;
      };
      if (book.selfLink) {
        bookObj.selfLink = book.selfLink;
      };
      if (book.volumeInfo.title) {
        bookObj.title = book.volumeInfo.title;
      };
      if (book.volumeInfo.subtitle) {
        bookObj.subtitle = book.volumeInfo.subtitle;
      };
      if (book.volumeInfo.authors) {
        bookObj.authors = book.volumeInfo.authors;
      };
      if (book.volumeInfo.description) {
        bookObj.description = book.volumeInfo.description;
      };
      if (book.volumeInfo.publisher) {
        bookObj.publisher = book.volumeInfo.publisher;
      };
      if (book.volumeInfo.publishedDate) {
        bookObj.publishedDate = book.volumeInfo.publishedDate;
      };
      if (book.volumeInfo.previewLink) {
        bookObj.previewLink = book.volumeInfo.previewLink;
      };
      if (book.volumeInfo.imageLinks) {
        bookObj.image = book.volumeInfo.imageLinks.thumbnail;
      };
      bookObj.read = false;
      bookObj.key = `${book.etag}+${book.id}`

      output.push(bookObj);
    })
    setBooks(output);
  }
  const handleFormSubmit = event => {
    // When the form is submitted, prevent its default behavior, get books update the books state
    event.preventDefault();
    if (bookSearch.length > 0) {
      API.web.getBooks(bookSearch)
        .then((res) => {
          setBooks([]);
          interpretData(res.data.items);
          setBookSearch("");
        })
        .catch(err => console.log(err));
    };
  };

  function findBookInState(id) {
    return books.filter(item => {
      return item.key === id;
    });
  };


  function handleBookSave(key) {
    const bookToSave = findBookInState(key);
    API.server.post(bookToSave[0]);

  }

  return (
    <Container>
      <Row>
        <Col md={12}>
          <form>
            <Container>
              <Row>
                <Col xs={9} sm={10}>
                  <Input
                    name="BookSearch"
                    value={bookSearch}
                    onChange={handleInputChange}
                    placeholder="Search For a Book"
                  />
                </Col>
                <Col xs={3} sm={2}>
                  <Button
                    onClick={handleFormSubmit}
                    type="success"
                    className="input-lg"
                  >
                    Search
                    </Button>
                </Col>
              </Row>
            </Container>
          </form>
        </Col>
      </Row>
      <Row>
        <Col xs={12}>
          {!books.length ? (
            <h1 className="text-center">No Books to Display</h1>
          ) : (
              <BookList>
                {books.map(book => {
                  return (
                    <BookListItem
                      key={book.key}
                      title={book.title}
                      authors={book.authors}
                      link={book.previewLink}
                      description={book.description}
                      image={book.image}
                      checkbox={() => handleBookSave(book.key)}
                      checkText="Save"
                    />
                  );
                })}
              </BookList>
            )}
        </Col>
      </Row>
    </Container>
  )
};

export default Search;