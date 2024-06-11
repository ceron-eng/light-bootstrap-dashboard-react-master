import React, { useState } from "react";
import {
  Button,
  Card,
  Form,
  Container,
  Row,
  Col
} from "react-bootstrap";
import { createAutor,uploadImage } from '../api'; 

function User() {
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [fechaNacimiento, setFechaNacimiento] = useState('');
  const [imagen, setImagen] = useState(null); // Estado para almacenar la imagen

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!imagen) {
      console.log("No se seleccionó ningún archivo.");
      return;
    }
    try {
      const result = await createAutor({ nombre, apellido, fechaNacimiento });
      if(result != null){
        console.log(result);
        const formData = new FormData();
        formData.append('image', imagen);
        formData.append('guid', result); // Agregar el Id al formulario
        const result2 = await uploadImage(formData);
        if(result2.success){
          window.alert('Autor creado con éxito');
          window.location.reload();
        }
      }
    
    } catch (error) {
      console.error(error);
    }
  };  

  const handleImagenChange = (event) => {
    const file = event.target.files[0];
    setImagen(file);
  };

  return (
    <>
      <Container fluid>
        <Row>
          <Col md="8">
            <Card>
              <Card.Header>
                <Card.Title as="h4">Crea un autor</Card.Title>
              </Card.Header>
              <Card.Body>
                <Form onSubmit={handleSubmit}>
                  <Row>
                    <Col md="12">
                      <Form.Group>
                        <label>Nombre</label>
                        <Form.Control
                          type="text"
                          placeholder="Nombre"
                          required
                          value={nombre}
                          onChange={(e) => setNombre(e.target.value)}
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="12">
                      <Form.Group>
                        <label>Apellido</label>
                        <Form.Control
                          type="text"
                          placeholder="Apellido"
                          required
                          value={apellido}
                          onChange={(e) => setApellido(e.target.value)}
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="12">
                      <Form.Group>
                        <label>Fecha de Nacimiento (DD-MM-YYYY)</label>
                        <Form.Control
                          type="date"
                          placeholder="Fecha de Nacimiento"
                          required
                          value={fechaNacimiento}
                          onChange={(e) => setFechaNacimiento(e.target.value)}
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="12">
                      <Form.Group>
                        <label>Imagen de Perfil</label>
                        <Form.Control
                          type="file"
                          required
                          onChange={handleImagenChange}
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  <br></br>
                  <Button
                    className="btn-fill pull-right"
                    type="submit"
                    variant="info"
                  >
                    Update Profile
                  </Button>
                  <div className="clearfix"></div>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default User;
