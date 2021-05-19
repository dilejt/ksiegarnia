import './App.scss';
import React, { useState, useEffect } from 'react'
import { Button,Container,Row,Col,ButtonToolbar,ButtonGroup,Form } from 'react-bootstrap';
import Axios from "axios";

const App = () => {
  const [bookList, setBookList] = useState([])
  const [filteredBookList, setFilteredBookList] = useState([])
  const [activePage, setActivePage] = useState(1)
  const booksPerPage = 4
  let titleFilter = ""
  let authorFilter = ""

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
      setFilteredBookList(res.data)
    });
  }, []);

  const filter = () => {
    setFilteredBookList(bookList.filter(bookList => bookList.autor.includes(authorFilter) && bookList.tytul.includes(titleFilter)))
  }

  const order = value => {
    const copy = [...filteredBookList]
    switch(value) {
      case "ascAuth":
        copy.sort((a, b) => ('' + a.autor).localeCompare(b.autor))
        break;
      case "descAuth":
        copy.sort((a, b) => ('' + a.autor).localeCompare(b.autor)).reverse()
        break;
      case "ascTitle":
        copy.sort((a, b) => ('' + a.tytul).localeCompare(b.tytul))
        break;
      case "descTitle":
        copy.sort((a, b) => ('' + a.tytul).localeCompare(b.tytul)).reverse()
        break;
      default:
        copy.sort((a, b) => ('' + a.autor).localeCompare(b.autor))
        break;
    }
    setFilteredBookList(copy)
  }

  const indexOfLastBook = activePage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentBooks = filteredBookList.slice(indexOfFirstBook, indexOfLastBook);

  const booksOnPage = currentBooks.map((item, key) => {
    return (
      <li className="list-group-item d-flex" key={key}>
        <div className="pt-2">
          <div>{item.tytul}</div>
          <div><i>{item.autor}</i></div>
        </div>
        <div className="remove d-block ml-auto"></div>
      </li>
    )
  })

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(bookList.length / booksPerPage); i++) {
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
    <Container className="m-5 p-2 rounded mx-auto bg-light shadow">
      <Row className="m-1 p-4">
        <Col id="logo" className="p-2 h1 text-primary text-center rounded mx-auto display-inline-block">
          <i className="bg-primary rounded p-2 pt-5"></i>
          <i className="bg-secondary rounded p-2 pt-4"></i>
          <i className="bg-warning rounded p-2"></i>
          <i className="bg-danger rounded p-2"></i>
          <i className="bg-success rounded mr-2 p-2 pt-3"></i>
          <span className="d-block mt-2">BookShop.pl</span>
        </Col>
      </Row>
      <div className="p-2 mx-4 border-bottom"></div>
      <Row className="row m-1 p-3 px-5 justify-content-center formRow">
        <Col lg={12} className="text-center align-items-center px-1 pb-3">
          <h3>Dodaj książkę</h3>
        </Col>
        <Form className="text-right">
          <Form.Group className="text-center" as={Row}>
            <Form.Label column sm={2}>
            Tytuł
            </Form.Label>
            <Col sm={10}>
              <Form.Control placeholder="Nowy tytuł" />
            </Col>
          </Form.Group>
          <Form.Group className="text-center" as={Row}>
            <Form.Label column sm={2}>
            Autor
            </Form.Label>
            <Col sm={10}>
              <Form.Control placeholder="Autor" />
            </Col>
          </Form.Group>
          <Button type="submit">Dodaj</Button>
        </Form>
      </Row>
      <div className="p-2 mx-4 border-bottom"></div>
      <Row className="row m-1 p-3 px-5 justify-content-end formRow">
        <Col lg={4} className="d-md-flex text-center align-items-center px-1 pr-3">
          <Form.Label className="my-2 pr-2">Tytuł</Form.Label>
          <Form.Control onChange={e => { titleFilter = e.target.value; filter() }} placeholder="W pustyni i w puszczy" />
        </Col>
        <Col lg={4} className="d-md-flex text-center align-items-center px-1 pr-3">
          <Form.Label className="my-2 pr-2">Autor</Form.Label>
          <Form.Control onChange={e => { authorFilter = e.target.value; filter() }} placeholder="Henryk Sienkiewicz" />
        </Col>
        <Col lg={4} className="d-md-flex text-center align-items-center px-1 pr-3">
          <Form.Label className="my-2 pr-2">Sortuj</Form.Label>
          <Form.Control as="select" defaultValue="ascAuth" onChange={e => order(e.target.value)} custom>
            <option value="ascAuth">Rosnąco po autorze</option>
            <option value="descAuth">Malejąco po autorze</option>
            <option value="ascTitle">Rosnąco po tytule</option>
            <option value="descTitle">Malejąco po tytule</option>
          </Form.Control>
        </Col>
      </Row>
      <Row className="row m-1 p-3 px-md-5 justify-content-end">
        <Col xs={12}>
          <ul className="list-group list-group-flush">
            {booksOnPage}
          </ul>
        </Col>
      </Row>
      <Row>
        <ButtonToolbar className="mx-auto" aria-label="Pagination">
          <ButtonGroup className="pb-2" aria-label="Group">
            <Button
              onClick={() => setActivePage(activePage>1 ? Number(activePage)-Number(1) : activePage)}
            >
              &lt;
            </Button>
            {paginationGroup}
            <Button
              onClick={() => setActivePage(activePage < pageNumbers.length ? Number(activePage)+Number(1) : activePage)}
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
