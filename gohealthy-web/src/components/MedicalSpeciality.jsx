'use client';
import React from 'react';
import axios from 'axios';

import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';

import 'bootstrap/dist/css/bootstrap.min.css';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';

const uriSpeciality = 'http://localhost:8080/api/v1/specialities';

export default class MedicalSpeciality extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      specialities: [],
      modalState: false,
      statusError: 0,
      showError: false,
    };
  }

  setName = (e) => {
    this.setState({
      name: e.target.value,
    });
  };

  retrieveSpecialities = () => {
    axios
      .get(uriSpeciality)
      .then((response) => {
        if (response.status >= 200 && response.status < 300) {
          this.setState({ specialities: response.data });
        }
      })
      .catch((err) => {
        this.handleError(true, err);
      });
  };

  createSpeciality = () => {
    axios
      .post(uriSpeciality, {
        name: this.state.name
      })
      .then((response) => {
        if (response.status >= 200 && response.status < 300) {
          this.retrieveSpecialities();
        }
      })
      .catch((err) => {
        this.handleError(true, err);
      });

    this.handleClose();
  };

  removeSpeciality = (id) => {
    axios
        .delete(`${uriSpeciality}/${id}`)
        .then((response) => {
          if (response.status > 200 && response.status < 300)
            this.retrieveSpecialities();
        })
        .catch((err) => {
          this.handleError(true, err);
        });
  };

  handleClose = () =>
    this.setState({
      modalState: false,
    });

  handleShow = () =>
    this.setState({
      modalState: true,
    });

  handleError = (status, err) => {
    this.setState({
      showError: status,
    });

    this.setState({
      statusError: err,
    });
  };

  componentDidMount() {
    this.retrieveSpecialities();
  }

  render() {
    return (
      <>
        <Container>
          <div className="p-4">
            {this.state.showError && (
              <Alert
                variant="danger"
                onClose={() => this.handleError(false)}
                on
                dismissible
              >
                <p>API ERROR [{this.state.statusError.message}]</p>
              </Alert>
            )}

            <Row>
              {this.state.specialities.map((speciality) => (
                <Col key={speciality.id}>
                  <Card style={{ width: '9.1rem' }}>
                    <Card.Body>
                      <Card.Img variant="top" width="80" height="88" src="https://img.icons8.com/3d-fluency/94/medical-doctor--v5.png" />
                      <Card.Subtitle className="pb-2 pt-2" >{speciality.name}</Card.Subtitle>
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() => this.removeSpeciality(speciality.id)}
                      >
                        Excluir
                      </Button>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          </div>

          <Button variant="primary" size="sm" onClick={this.handleShow}>
            Adicionar
          </Button>

          <Modal show={this.state.modalState} onHide={this.handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Informações do paciente</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form>
                <Form.Group className="mb-3">
                  <Form.Label>Nome da Especialidade</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Nome"
                    value={this.state.name}
                    onChange={this.setName}
                  />
                </Form.Group>

                <Form.Text className="text-muted">
                  Importante! Preencha todos os dados
                </Form.Text>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={this.handleClose}>
                Fechar
              </Button>
              <Button
                variant="primary"
                type="submit"
                onClick={this.createSpeciality}
              >
                Salvar
              </Button>
            </Modal.Footer>
          </Modal>
        </Container>
      </>
    );
  }
}
