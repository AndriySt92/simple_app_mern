import React from 'react'
import {useHistory} from 'react-router-dom'
import { Navbar, Nav, Container} from 'react-bootstrap'
import {useAuth} from '../hooks/auth.hook'

export const Menu = React.memo(() => {
  const history = useHistory()
  const { login, logout} = useAuth()


  const logoutHandler = () => {
    logout()
    history.push('/')
  }

  return (
    <Navbar className='navbar' variant='dark'>
    <Container fluid>
    <Navbar.Brand href="/create">Navbar</Navbar.Brand>
    <Nav className="justify-content-end color2">
      <Nav.Link href="/create">Create link</Nav.Link>
      <Nav.Link href="/links">Links</Nav.Link>
      <Nav.Link href="/" onClick={logoutHandler}>Logout</Nav.Link>
    </Nav>
    </Container>
  </Navbar>
  )
})
