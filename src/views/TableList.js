import React, { useEffect, useState } from "react";
import {
  Card,
  Table,
  Container,
  Row,
  Col,
} from "react-bootstrap";
import { getAutores,getAutor } from '../api'; 

function TableList() {
  const [autores, setAutores] = useState([]);

  useEffect(() => {
    const fetchAutores = async () => {
      try {
        const data = await getAutores();
        // Para cada autor, obtener su imagen
        const autoresConImagenes = await Promise.all(
          data.map(async (autor) => {
            const autorConImagen = await getAutor(autor.autorLibroId);
            return autorConImagen;
          })
        );
        setAutores(autoresConImagenes);
      } catch (error) {
        console.error(error);
      }
    };
    fetchAutores();
  }, []);

  return (
    <>
      <Container fluid>
        <Row>
          <Col md="12">
            <Card className="strpied-tabled-with-hover">
              <Card.Header>
                <Card.Title as="h4">Autores</Card.Title>
                <p className="card-category">Lista de autores</p>
              </Card.Header>
              <Card.Body className="table-full-width table-responsive px-0">
                <Table className="table-hover table-striped">
                  <thead>
                    <tr>
                      <th className="border-0">ID</th>
                      <th className="border-0">Nombre</th>
                      <th className="border-0">Apellido</th>
                    </tr>
                  </thead>
                  <tbody>
                    {autores.map((autor, index) => (
                      <tr key={index}>
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
                    ))}
                  </tbody>
                </Table>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default TableList;
