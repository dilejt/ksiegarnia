import './App.scss';
import React, { useState, useEffect } from 'react'
import { Button,Container,Row,Col,ButtonToolbar,ButtonGroup } from 'react-bootstrap';
import Axios from "axios";

const App = () => {
  const [bookList, setBookList] = useState([]);
  const [activePage, setActivePage] = useState(1);
  const [itemsPerPage] = useState(4);

  useEffect(() => {
    Axios({
      method: "GET",
      url: "http://localhost:5000/",
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    }).then(res => {
      setBookList(res.data)
    });
  }, []);

  const books = bookList.map(book => {
    return (
      <Col key={book.id}>
        {book.tytul}
      </Col>
    )
  })

  const indexOfLastItem = activePage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = books.slice(indexOfFirstItem, indexOfLastItem);

  const itemsOnPage = currentItems.map((item, key) => {
    return <Col key={key}>{item}</Col>;
  });

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(books.length / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  const paginationGroup = pageNumbers.map(key => {
    return (
      <Button
        key={key}
        id={key}
        onClick={(e) => setActivePage(e.target.id)}
      >
        {key}
      </Button>
    );
  });

  return (
    <Container className="App">
      <Row>
        {itemsOnPage}
        <ButtonToolbar aria-label="Pagination">
          <ButtonGroup className="mr-2" aria-label="Group">
            <Button
              onClick={() => setActivePage(activePage>1 ? activePage-1 : activePage)}
            >
              &lt;
            </Button>
            {paginationGroup}
            <Button
              onClick={() => setActivePage(activePage < pageNumbers.length ? activePage+1 : activePage)}
            >
              &gt;
            </Button>
          </ButtonGroup>
        </ButtonToolbar>
      </Row>
    </Container>
  );
}

export default App;
