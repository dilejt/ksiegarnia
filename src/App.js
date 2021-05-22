import './App.scss'
import React, { useState, useEffect } from 'react'
import { Button,Container,Row,Col,ButtonToolbar,ButtonGroup,Form } from 'react-bootstrap'
import Axios from "axios"
//import "animate.css/source/animate.css";
import "animate.css";
import { CSSTransition, TransitionGroup } from 'react-transition-group';

const App = () => {
  const [bookList, setBookList] = useState([])
  const [filteredBookList, setFilteredBookList] = useState([])
  const [activePage, setActivePage] = useState(1)
  const [authorFilter, setAuthorFilter] = useState("")
  const [titleFilter, setTitleFilter] = useState("")
  const [newTitle, setNewTitle] = useState("")
  const [newAuthor, setNewAuthor] = useState("")
  const [order, setOrder] = useState("")
  const booksPerPage = 4

  const fetchData = () => {
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
    })
  }

  useEffect(() => {
    fetchData()
  }, [])

  const modifyBookList = (filteredBookList) => {
    let copy = [...filteredBookList]
    copy = copy.filter(bookList => bookList.autor.includes(authorFilter) && bookList.tytul.includes(titleFilter))
    switch(order) {
      case "ascAuth":
        copy.sort((a, b) => ('' + a.autor).localeCompare(b.autor))
        break
      case "descAuth":
        copy.sort((a, b) => ('' + a.autor).localeCompare(b.autor)).reverse()
        break
      case "ascTitle":
        copy.sort((a, b) => ('' + a.tytul).localeCompare(b.tytul))
        break
      case "descTitle":
        copy.sort((a, b) => ('' + a.tytul).localeCompare(b.tytul)).reverse()
        break
      default:
        copy.sort((a, b) => ('' + a.autor).localeCompare(b.autor))
        break
    }
    return copy.slice(indexOfFirstBook, indexOfLastBook)
  }

  const indexOfLastBook = activePage * booksPerPage
  const indexOfFirstBook = indexOfLastBook - booksPerPage
  let currentBooks = modifyBookList(filteredBookList)
  
  //const nodeRef = React.useRef(null)

  const booksOnPage = currentBooks.map((item) => {
    return (
      <CSSTransition
        in = {false}
        unmountOnExit
        // nodeRef = {nodeRef}
        timeout = {800}
        key = {item.id}
        classNames={{
          enter: "animate__animated",
          enterActive: "animate__bounceInLeft",
          exit: "animate__animated",
          exitActive: "animate__backOutDown"
        }}
      >
        <li className="list-group-item d-flex bookItemList">
          <div className="pt-2">
            <div>{item.tytul}</div>
            <div><i>{item.autor}</i></div>
          </div>
          <div onClick={() => removeBook(item.id) } className="remove d-block ml-auto"></div>
        </li>
      </CSSTransition>
    )
  })

  const pageNumbers = []
  for (let i = 1; i <= Math.ceil(bookList.length / booksPerPage); i++) {
    pageNumbers.push(i)
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
    )
  })

  const removeBook = id => {
    Axios({
      method: "DELETE",
      url: "http://localhost:5000/delete",
      data: {
        id : id
      }
    })
    .then(() => {
      fetchData()
    })
    .catch(function (error) {
      //console.log(error)
    })
  }

  const addBook = () => {
    Axios({
      method: "POST",
      url: "http://localhost:5000/add",
      data: {
        tytul: newTitle,
        autor: newAuthor
      }
    })
    .then(() => {
      fetchData()
    })
    .catch(function (error) {
      //console.log(error)
    })
  }

  return (
    <Container className="m-5 p-md-2 rounded mx-auto bg-light shadow">
      <Row className="m-1 p-4">
        <Col id="logo" className="p-2 h1 text-primary text-center rounded mx-auto display-inline-block">
          <i className="bg-primary rounded p-2 pt-5"></i>
          <i className="bg-secondary rounded p-2 pt-4"></i>
          <i className="bg-warning rounded p-2"></i>
          <i className="bg-danger rounded p-2"></i>
          <i className="bg-success rounded mr-2 p-2 pt-3"></i>
          <span className="animate__tada animate__animated d-block mt-2">BookShop.pl</span>
        </Col>
      </Row>
      <div className="p-2 mx-4 border-bottom"></div>
      <Row style={{ backgroundImage: "url(/images/bg.jpg)" }} className="row m-1 mt-3 py-3 justify-content-center formRow addBookForm">
        <Col md={6} className="text-right">
        <h3 className="text-center pb-3">Dodaj książkę</h3>
          <Form.Group className="text-center" as={Row}>
            <Form.Label className="font-weight-bold"column sm={2}>
            Tytuł
            </Form.Label>
            <Col sm={10}>
              <Form.Control className="border-primary" onChange={e => setNewTitle(e.target.value)} placeholder="Nowy tytuł" />
            </Col>
          </Form.Group>
          <Form.Group className="text-center" as={Row}>
            <Form.Label className="font-weight-bold" column sm={2}>
            Autor
            </Form.Label>
            <Col sm={10}>
              <Form.Control className="border-primary" onChange={e => setNewAuthor(e.target.value)} placeholder="Autor" />
            </Col>
          </Form.Group>
          <Button type="submit" onClick={() => addBook()}>Dodaj</Button>
        </Col>
      </Row>
      <div className="p-2 mx-4 border-bottom"></div>
      <Row className="row m-1 p-3 px-5 justify-content-end formRow">
        <Col lg={4} className="d-md-flex text-center align-items-center px-1 pr-3">
          <Form.Label className="my-2 pr-2 font-weight-bold">Tytuł</Form.Label>
          <Form.Control className="border-primary" onChange={e => setTitleFilter(e.target.value)} placeholder="W pustyni i w puszczy" />
        </Col>
        <Col lg={4} className="d-md-flex text-center align-items-center px-1 pr-3">
          <Form.Label className="my-2 pr-2 font-weight-bold">Autor</Form.Label>
          <Form.Control className="border-primary" onChange={e => setAuthorFilter(e.target.value)} placeholder="Henryk Sienkiewicz" />
        </Col>
        <Col lg={4} className="d-md-flex text-center align-items-center px-1 pr-3 overflow-hidden">
          <Form.Label className="my-2 pr-2 font-weight-bold">Sortuj</Form.Label>
          <Form.Control className="border-primary" as="select" defaultValue="ascAuth" onChange={e => setOrder(e.target.value)} custom>
            <option value="ascAuth">Rosnąco po autorze</option>
            <option value="descAuth">Malejąco po autorze</option>
            <option value="ascTitle">Rosnąco po tytule</option>
            <option value="descTitle">Malejąco po tytule</option>
          </Form.Control>
        </Col>
      </Row>
      <Row className="row m-1 p-3 px-md-5 justify-content-end overflow-hidden">
        <Col xs={12}>
          <TransitionGroup component="ul" className="list-group list-group-flush bookList">
            {booksOnPage}
          </TransitionGroup>
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
  )
}

export default App
