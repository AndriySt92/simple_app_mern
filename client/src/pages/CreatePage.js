import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { Form, Container, Row, Col, Button, Alert } from 'react-bootstrap'
import { useHttpHook } from '../hooks/http.hook'
import { useAuth } from '../hooks/auth.hook'

export const CreatePage = React.memo(() => {
  const [link, setLink] = useState('')
  const history = useHistory()
  const { loading, request, error, clearError } = useHttpHook()
  const { token } = useAuth()

  const changeHandler = (e) => {
    setLink(e.target.value)
  }

  const clickHandler = async () => {
    clearError()
    try {
      const data = await request(
        '/api/link/generate',
        'POST',
        { from: link },
        {
          Authorization: `Bearer ${token}`,
        },
      )
      history.push(`/detail/${data.link._id}`)
    } catch (error) {}
  }

  return (
    <Container>
      <Row className="pt-5">
        <Col xl={6} lg={9} md={10} sm={12} className="mx-auto">
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label className="custom_text">Enter link</Form.Label>
              <Form.Control type="email" placeholder="link" onChange={changeHandler} value={link} />
            </Form.Group>
            <Button className="custom_btn" onClick={clickHandler} disabled={loading}>
              Ok
            </Button>
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
