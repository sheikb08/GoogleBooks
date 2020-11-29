import React from "react";
import Thumbnail from "../Thumbnail";
import { Container, Row, Col, ListGroup, Form } from "react-bootstrap";

// Exporting both BookList and BookListItem from this file

// BookList renders a bootstrap list item
export function BookList({ children }) {
  return <ListGroup>{children}</ListGroup>;
}

// BookListItem renders a bootstrap list item containing data from the book api call
export function BookListItem({
  authors,
  description,
  image,
  link,
  title,
  checkbox,
  read,
  checkText,
  subtitle,
  publisher,
  publishedDate
}) {
  return (
    <ListGroup.Item>
      <Container>
        <Row>
          <Col xs={4} sm={2}>
            <Thumbnail src={image || "https://placehold.it/300x300"} />
            {checkbox ? (
              <Form>
                <Form.Text muted>{checkText}:</Form.Text>
                <Form.Check aria-label={`${checkText} book: ${title}`} onChange={checkbox} checked={read ? !!read : undefined} />
              </Form>
            ) : (
                " "
              )}
          </Col>
          <Col xs={8} sm={9}>
            <h3 className="text-center">{title}</h3>
            {subtitle ? (
              <h4 className="text-center">{subtitle}</h4>
            ) : ( " " )}
            <p>Description: {description}</p>
            <p>By: {authors}</p>
            <a rel="noreferrer noopener" target="_blank" href={link}>
              Go to book!
            </a>
          </Col>
        </Row>
        {publisher ? (
          <Row className="mt-1">
            <Col>
              <h5>Publisher: {publisher}</h5>
            </Col>
            {publishedDate ? (
              <Col>
              <h5>First Published: {publishedDate}</h5>
                </Col>
            ) : ( " " )}
          </Row>
        ) : ( " " )}
      </Container>
    </ListGroup.Item>
  );
}