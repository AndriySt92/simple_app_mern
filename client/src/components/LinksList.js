import React from 'react'
import { Link } from 'react-router-dom'
import { Container, Row, Col, Table } from 'react-bootstrap'

export const LinksList = React.memo(({ links }) => {
  if (!links.length) {
    return <h2 className='text-center mt-5 color1'>Links list is empty</h2>
  }

  return (
    <Container fluid="md sm">
      <Row className="pt-5">
        <Col xl className="custom_text">
          <Table striped bordered hover variant="info">
            <thead>
              <tr>
                <th>#</th>
                <th>Origin link adress</th>
                <th>Short link</th>
                <th>Open link</th>
              </tr>
            </thead>
            <tbody>
              {links.map((link, index) => {
                return (
                  <tr key={link._id}>
                    {' '}
                    <td>{index + 1}</td>
                    <td>{link.from}</td>
                    <td>{link.to}</td>
                    <td>
                      <Link to={`/detail/${link._id}`}>Open link</Link>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  )
})
