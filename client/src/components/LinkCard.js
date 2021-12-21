import React from 'react'

import { Container, Row , Col} from 'react-bootstrap'

export const LinkCard = React.memo(({ link }) => {
  return (
    <Container fluid="md sm">
      <Row className="pt-5">
      <Col xl={6} lg={9} md={10} sm={12} className='custom_text' >
        <h1>Detail about link</h1>
        <p>Your link: <a href={link.to} target="_blank" rel="noopener noreferrer"> {link.from}</a> </p>
        <p>From:<a href={link.to} target="_blank" rel="noopener noreferrer"> {link.to} </a></p>
        <p>Number of clicks: <strong>{link.clicks}</strong></p>
        <p>
          Creation date: <strong>{new Date(link.date).toLocaleDateString()}</strong>{' '}
        </p>
        </Col>
      </Row>
    </Container>
  )
})
