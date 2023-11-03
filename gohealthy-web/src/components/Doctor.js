'use client'
import React from 'react';
import axios from "axios";

import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";

import "bootstrap/dist/css/bootstrap.min.css";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";

const uriDefault = "http://localhost:8080/api/v1/doctors";
const uriSpeciality = "http://localhost:8080/api/v1/specialities";

export default class Doctor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            crm: "",
            specialityId: "",
            specialities: [],
            doctors: [],
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

    setCrm = (e) => {
        this.setState({
            crm: e.target.value,
        });
    };
    setSpeciality = (e) => {
        this.setState({
            specialityId: e.target.value
        });
    };

    retrieveDoctors = () => {
        axios
            .get(uriDefault)
            .then((response) => {
                this.setState({doctors: response.data});
            })
            .catch((err) => {
                this.handleError(true, err);
            });
    }

    retrieveSpecialities = () => {
        axios
            .get(uriSpeciality)
            .then((response) => {
                if (response.status >= 200 && response.status < 300) {
                    this.setState({specialities: response.data});
                    this.setState({specialityId: response.data[0].id});
                }
            })
            .catch((err) => {
                this.handleError(true, err);
            });
    }

    createDoctor = () => {
        axios.post(uriDefault, {
            name: this.state.name,
            crm: this.state.crm,
            medicalSpeciality: {
                id: this.state.specialityId
            },
        })
            .then((response) => {
                if (response.status > 200 && response.status < 300)
                    this.retrieveDoctors();
            })
            .catch((err) => {
                this.handleError(true, err);
            });

        this.handleClose();
    };

    removeDoctor = (id) => {
        axios.delete(`${uriDefault}/${id}`)
            .then((response) => {
                if (response.status > 200 && response.status < 300)
                    this.retrieveDoctors();
            })
            .catch((err) => {
                this.handleError(true, err);
            });
    }

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
    }

    componentDidMount() {
        this.retrieveSpecialities();
        this.retrieveDoctors();
    }

    render() {
        return (
            <>
                <Container>
                    <div className="p-4">

                        {this.state.showError &&
                            <Alert variant="danger" onClose={() => this.handleError(false)} on dismissible>
                                <p>
                                    API ERROR [{this.state.statusError.message}]
                                </p>
                            </Alert>
                        }

                        <Row xs={1} md={2} className="g-4">
                            {this.state.doctors.map((doctor) => (
                                <Col key={doctor.id}>
                                    <Card>
                                        <Card.Body>
                                            <Card.Title>{doctor.name}</Card.Title>
                                            <Card.Subtitle className="mb-2 text-muted">
                                                {doctor.medicalSpeciality.name}
                                            </Card.Subtitle>
                                            <Card.Text>
                                                {doctor.crm}
                                            </Card.Text>
                                            <Button variant="danger" size="sm"
                                                    onClick={() => this.removeDoctor(doctor.id)}>Excluir</Button>
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
                                    <Form.Label>Nome</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Nome"
                                        value={this.state.name}
                                        onChange={this.setName}
                                    />
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label>CRM</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="0000/UF"
                                        value={this.state.crm}
                                        onChange={this.setCrm}
                                    />
                                </Form.Group>

                                <Form.Select aria-label="Default select example" onChange={this.setSpeciality}>
                                    {this.state.specialities.map((speciality) => (
                                        <option key={speciality.id} value={speciality.id}>{speciality.name}</option>
                                    ))}
                                </Form.Select>
                                <Form.Text className="text-muted">
                                    Importante! Preencha todos os dados
                                </Form.Text>
                            </Form>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={this.handleClose}>
                                Fechar
                            </Button>
                            <Button variant="primary" type="submit" onClick={this.createDoctor}>
                                Salvar
                            </Button>
                        </Modal.Footer>
                    </Modal>
                </Container>
            </>
        );
    }
}
