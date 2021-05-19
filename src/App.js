import './App.scss';
import React, { useState, useEffect } from 'react'
import { Button,Container,Row,Col,ButtonToolbar,ButtonGroup,Form,Accordion,Card } from 'react-bootstrap';
import Axios from "axios";

const App = () => {
  const [bookList, setBookList] = useState([]);
  const [activePage, setActivePage] = useState(1);
  const booksPerPage = 4;

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

  const indexOfLastBook = activePage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentItems = bookList.slice(indexOfFirstBook, indexOfLastBook);

  const booksOnPage = currentItems.map((item, key) => {
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
    <Container fluid className="mt-5 px-5">
      <Row noGutters>
        <Col lg={9} className="p-2 rounded mx-auto bg-light shadow">
          <Row className="m-1 p-4">
            <Col id="logo" className="p-2 h1 text-primary text-center mx-auto display-inline-block">
              <i className="bg-primary rounded p-2 pt-5"></i>
              <i className="bg-secondary rounded p-2 pt-4"></i>
              <i className="bg-warning rounded p-2"></i>
              <i className="bg-danger rounded p-2"></i>
              <i className="bg-success rounded mr-2 p-2 pt-3"></i>
              <span className="d-block mt-2">BookShop.pl</span>
            </Col>
          </Row>
          <div className="p-2 mx-4 border-bottom"></div>
          <Row className="row m-1 p-3 px-5 justify-content-end">
            <Col lg={4} className="d-sm-flex text-center align-items-center px-1 pr-3">
              <Form.Label className="text-secondary my-2 pr-2 view-opt-label">Tytuł</Form.Label>
              <Form.Control placeholder="W pustyni i w puszczy" />
            </Col>
            <Col lg={4} className="d-sm-flex text-center align-items-center px-1 pr-3">
              <Form.Label className="text-secondary my-2 pr-2 view-opt-label">Autor</Form.Label>
              <Form.Control placeholder="Henryk Sienkiewicz" />
            </Col>
            <Col lg={4} className="d-sm-flex text-center align-items-center px-1 pr-3">
              <Form.Label className="text-secondary my-2 pr-2 view-opt-label">Sortuj</Form.Label>
              <Form.Control as="select" custom>
                <option>Rosnąco po autorze</option>
                <option>Malejąco po autorze</option>
                <option>Rosnąco po tytule</option>
                <option>Malejąco po tytule</option>
              </Form.Control>
            </Col>
          </Row>
          <div className="p-2 mx-4 border-bottom"></div>
          <Row className="row m-md-1 py-md-3 px-md-5 justify-content-end">
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
        </Col>
        <Col lg={3}>
        <Accordion className="collapseBook">
          <div>
            <div>
              <Accordion.Toggle as={Button} variant="link" eventKey="0">
                Dodaj książke
              </Accordion.Toggle>
            </div>
            <Accordion.Collapse eventKey="0">
              <div>Hello! I'm the body</div>
            </Accordion.Collapse>
          </div>
        </Accordion>
        </Col>
      </Row>
    </Container>
  );
}

export default App;
