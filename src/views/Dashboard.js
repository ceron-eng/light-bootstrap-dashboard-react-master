import React, { useState } from "react";
import {
  Table,
  Button,
  Card,
  Container,
  Row,
  Col,
  Form,
} from "react-bootstrap";
import { getAutor } from '../api';  

function AutorSearch() {
  const [autorId, setAutorId] = useState('');
  const [autor, setAutor] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async () => {
    setLoading(true);
    setError(null);
    try {
      const autorData = await getAutor(autorId);
      setAutor(autorData);
    } catch (error) {
      console.error(error);
      setError('Error fetching author');
    }
    setLoading(false);
  };

  return (
    <>
      <Container fluid>
        <Row>
          <Col md="12">
            <Card>
              <Card.Header>
                <Card.Title as="h4">Buscar Autor</Card.Title>
              </Card.Header>
              <Card.Body>
                <Form>
                  <Row>
                    <Col md="8">
                      <Form.Group>
                        <label>ID del Autor</label>
                        <Form.Control
                          type="text"
                          value={autorId}
                          onChange={(e) => setAutorId(e.target.value)}
                          placeholder="Ingrese el ID del autor"
                        />
                      </Form.Group>
                    </Col>
                    <Col md="4"  className="d-flex align-items-end">
                      <Button
                        className="btn-fill"
                        type="button"
                        variant="info"
                        onClick={handleSearch}
                        disabled={loading}
                      >
                        {loading ? 'Buscando...' : 'Buscar'}
                      </Button>
                    </Col>
                  </Row>
                </Form>
              </Card.Body>
            </Card>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {autor && (
              <Card className="strpied-tabled-with-hover">
                <Card.Header>
                  <Card.Title as="h4">Detalles del Autor</Card.Title>
                </Card.Header>
                <Card.Body className="table-full-width table-responsive px-0">
                  <Table className="table-hover table-striped">
                    <thead>
                      <tr>
                        <th className="border-0">ID</th>
                        <th className="border-0">Nombre</th>
                        <th className="border-0">Apellido</th>
                        <th className="border-0">Imagen</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>{autor.autorLibroId}</td>
                        <td>{autor.nombre}</td>
                        <td>{autor.apellido}</td>
                        <td>
                          {autor.imagen ? (
                            <img src={`data:image/jpeg;base64,${autor.imagen}`} alt="Autor" style={{ width: '50px', height: '50px' }} />
                          ) : (
                            'No Image'
                          )}
                        </td>
                      </tr>
                    </tbody>
                  </Table>
                </Card.Body>
              </Card>
            )}
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default AutorSearch;
