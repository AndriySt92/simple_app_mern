import React, { useContext, useState } from 'react'
import { Form, Button, Row, Container, Col, Alert } from 'react-bootstrap'
import { AuthContext } from '../context/AuthContext'
import { useHttpHook } from '../hooks/http.hook'

export const AuthPage = React.memo(() => {
  const [formData, setFormData] = useState({ email: '', password: '' })
  const { loading, error, request, clearError } = useHttpHook()
  const auth = useContext(AuthContext)
  const changeHandler = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value })
  }

  const onRegisterHandler = async () => {
    clearError()
    try {
      request('/api/auth/register', 'POST', { ...formData })
    } catch (error) {}
  }

  const onLoginHandler = async () => {
    clearError()
    try {
      const data = await request('/api/auth/login', 'POST', { ...formData })
      auth.login(data.token, data.userId)
    } catch (error) {}
  }
  return (
    <Container fluid="md sm">
      <Row className="pt-5">
        <Col xl={6} lg={9} md={10} sm={12} className="mx-auto">
          <h1 className="text-center mb-3 color1 font-italic">Autorization</h1>
          <Form className="auth_form">
            <Form.Group className="mb-3 font-italic" controlId="formBasicEmail">
              <Form.Label className="custom_text">
                <strong>Email address</strong>
              </Form.Label>
              <Form.Control
                type="email"
                name="email"
                placeholder="Enter email"
                onChange={changeHandler}
                value={formData.email}
              />
            </Form.Group>

            <Form.Group className="mb-3 button" controlId="formBasicPassword">
              <Form.Label className="custom_text">
                <strong>Password</strong>
              </Form.Label>
              <Form.Control
                type="password"
                name="password"
                placeholder="Password"
                onChange={changeHandler}
                value={formData.password}
              />
            </Form.Group>

            <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
              <Button className="custom_btn" onClick={onRegisterHandler} disabled={loading}>
                Sing up
              </Button>
              <Button className="custom_btn" onClick={onLoginHandler} disabled={loading}>
                Sing in
              </Button>
            </div>
            {error && (
              <Alert variant="danger" className="mt-2">
                {error}
              </Alert>
            )}
          </Form>
        </Col>
      </Row>
    </Container>
  )
})
