'use client';
import React from 'react';
import axios from 'axios';

import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import ListGroup from 'react-bootstrap/ListGroup';
import Row from 'react-bootstrap/Row';
import Tab from 'react-bootstrap/Tab';
import Alert from 'react-bootstrap/Alert';

import 'bootstrap/dist/css/bootstrap.min.css';

const uri = 'http://localhost:8080/api/v1/patients';
const uriSchedules = 'http://localhost:8080/api/v1/schedules';
const uriSyncEvent = 'http://localhost:8080/api/v1/health-events';

export default class Patient extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            name: '',
            lastName: '',
            phone: '',
            zipCode: '',
            complement: '',
            street: '',
            age: '',
            number: '',
            schedules: [],
            healthEvents: [],
            address: {},
            patient: {},
            patients: [],
            statusError: 0,
            showError: false,
            modalState: false,
            modal2State: false,
        };
    }

    handleClose = () =>
        this.setState({
            modalState: false,
        });

    handleShow = () =>
        this.setState({
            modalState: true,
        });

    handleCloseModal2 = () =>
        this.setState({
            modal2State: false,
        });

    handleShowModal2 = () =>
        this.setState({
            modal2State: true,
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
        this.retrievePatients();
    }

    setFirstName = (e) => {
        this.setState({
            firstName: e.target.value,
        });
    };

    setLastName = (e) => {
        this.setState({
            lastName: e.target.value,
        });
    };

    setAge = (e) => {
        this.setState({
            age: e.target.value,
        });
    };

    setPhone = (e) => {
        this.setState({
            phone: e.target.value,
        });
    };

    setZipCode = (e) => {
        this.setState({
            zipCode: e.target.value,
        });
    };

    setComplement = (e) => {
        this.setState({
            complement: e.target.value,
        });
    };

    setNumber = (e) => {
        this.setState({
            number: e.target.value,
        });
    };

    setStreet = (e) => {
        this.setState({
            street: e.target.value,
        });
    };

    retrievePatientDetail = (id) => {
        this.retrievePatientById(id);
        this.retrieveScheduleByPatientId(id);
        this.handleShowModal2();
    };

    retrievePatientById = (id) => {
        axios
            .get(`${uri}/${id}`)
            .then((response) => {
                this.setState({patient: response.data});
                this.setState({healthEvents: response.data.healthEvents});
                this.setState({address: response.data.address});
            })
            .catch((err) => {
                this.handleError(true, err);
            });
    };

    retrieveScheduleByPatientId = (id) => {
        axios
            .get(`${uriSchedules}/${id}`)
            .then((response) => {
                this.setState({schedules: response.data});
            })
            .catch((err) => {
                this.handleError(true, err);
            });
    };

    retrievePatients = () => {
        axios
            .get(uri)
            .then((response) => {
                this.setState({patients: response.data});
            })
            .catch((err) => {
                this.handleError(true, err);
            });
    };

    removePatient = (id) => {
        axios
            .delete(`${uri}/${id}`)
            .then((response) => {
                if (response.status > 200 && response.status < 300)
                    this.retrievePatients();
            })
            .catch((err) => {
                this.handleError(true, err);
            });
    };

    createPatient = () => {
        axios
            .post(uri, {
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                phone: this.state.phone,
                age: this.state.age,
                address: {
                    zipCode: this.state.zipCode,
                    street: this.state.street,
                    complement: this.state.complement,
                    number: this.state.number,
                },
            })
            .then((response) => {
                if (response.status > 200 && response.status < 300)
                    this.retrievePatients();
            })
            .catch((err) => {
                this.handleError(true, err);
            });

        this.handleClose();
    };

    syncEvents = () => {
        axios
            .post(uriSyncEvent)
            .then((response) => {
                if (response.status > 200 && response.status < 300)
                    this.retrievePatients();
            })
            .catch((err) => {
                this.handleError(true, err);
            });
    };


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

                        <Table striped bordered hover>
                            <thead>
                            <tr>
                                <th>Nome</th>
                                <th>Sobrenome</th>
                                <th>idade</th>
                                <th>Telefone</th>
                                <th>Ações</th>
                            </tr>
                            </thead>
                            <tbody>
                            {this.state.patients.map((patient) => (
                                <tr key={patient.id}>
                                    <td>{patient.firstName}</td>
                                    <td>{patient.lastName}</td>
                                    <td>{patient.age}</td>
                                    <td>{patient.phone}</td>
                                    <td>
                                        <div>
                                            <Button
                                                className="btn btn-info"
                                                size="sm"
                                                onClick={() => this.retrievePatientDetail(patient.id)}
                                            >
                                                Exibir
                                            </Button>{' '}
                                            <Button
                                                className="btn btn-danger"
                                                size="sm"
                                                onClick={() => this.removePatient(patient.id)}
                                            >
                                                Excluir
                                            </Button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </Table>
                    </div>

                    <div>
                        <Button variant="primary" onClick={this.handleShow} size="sm">
                            Adicionar
                        </Button>{' '}
                        <Button variant="secondary" onClick={this.syncEvents} size="sm">
                            Sincronizar
                        </Button>
                    </div>

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
                                        value={this.state.firstName}
                                        onChange={this.setFirstName}
                                    />
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label>Sobrenome</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Sobrenome"
                                        value={this.state.lastName}
                                        onChange={this.setLastName}
                                    />
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label>Idade</Form.Label>
                                    <Form.Control
                                        type="number"
                                        placeholder="Idade"
                                        value={this.state.age}
                                        onChange={this.setAge}
                                    />
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label>Telefone</Form.Label>
                                    <Form.Control
                                        type="phone"
                                        placeholder="551999999999"
                                        value={this.state.phone}
                                        onChange={this.setPhone}
                                    />
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label>Rua</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="rua"
                                        value={this.state.street}
                                        onChange={this.setStreet}
                                    />
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label>CEP</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="cep"
                                        value={this.state.zipCode}
                                        onChange={this.setZipCode}
                                    />
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label>Complemento</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="complemento"
                                        value={this.state.complement}
                                        onChange={this.setComplement}
                                    />
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label>Número</Form.Label>
                                    <Form.Control
                                        type="number"
                                        placeholder="10"
                                        value={this.state.number}
                                        onChange={this.setNumber}
                                    />
                                </Form.Group>
                                <Form.Text className="text-muted">
                                    Importante! Preencha todos os dados
                                </Form.Text>
                            </Form>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button
                                variant="primary"
                                type="submit"
                                onClick={this.createPatient}
                            >
                                Salvar
                            </Button>
                        </Modal.Footer>
                    </Modal>

                    <Modal
                        show={this.state.modal2State}
                        onHide={this.handleCloseModal2}
                        size="lg"
                    >
                        <Modal.Header closeButton>
                            <Modal.Title id="contained-modal-title-vcenter">
                                Detalhes
                            </Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Form>
                                <Form.Group className="mb-3">
                                    <Form.Label>Nome</Form.Label>
                                    <Form.Control
                                        type="text"
                                        size="sm"
                                        value={this.state.patient.firstName}
                                        disabled
                                        readOnly
                                    />
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label>Sobrenome</Form.Label>
                                    <Form.Control
                                        type="text"
                                        size="sm"
                                        value={this.state.patient.lastName}
                                        disabled
                                        readOnly
                                    />
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label>Idade</Form.Label>
                                    <Form.Control
                                        type="number"
                                        size="sm"
                                        value={this.state.patient.age}
                                        disabled
                                        readOnly
                                    />
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label>Telefone</Form.Label>
                                    <Form.Control
                                        type="phone"
                                        size="sm"
                                        value={this.state.patient.phone}
                                        disabled
                                        readOnly
                                    />
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label>Rua</Form.Label>
                                    <Form.Control
                                        type="text"
                                        size="sm"
                                        value={this.state.address.street}
                                        disabled
                                        readOnly
                                    />
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label>CEP</Form.Label>
                                    <Form.Control
                                        type="text"
                                        size="sm"
                                        value={this.state.address.zipCode}
                                        disabled
                                        readOnly
                                    />
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label>Complemento</Form.Label>
                                    <Form.Control
                                        type="text"
                                        size="sm"
                                        value={this.state.address.complement}
                                        disabled
                                        readOnly
                                    />
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label>Número</Form.Label>
                                    <Form.Control
                                        type="number"
                                        size="sm"
                                        value={this.state.address.number}
                                        disabled
                                        readOnly
                                    />
                                </Form.Group>
                            </Form>
                            <Tab.Container
                                id="list-group-tabs-example"
                                defaultActiveKey="#health-events"
                            >
                                <Row>
                                    <Col sm={4}>
                                        <ListGroup>
                                            <ListGroup.Item action href="#health-events">
                                                Patologias
                                            </ListGroup.Item>
                                            <ListGroup.Item action href="#schedules">
                                                Consultas
                                            </ListGroup.Item>
                                        </ListGroup>
                                    </Col>
                                    <Col sm={8}>
                                        <Tab.Content>
                                            <Tab.Pane eventKey="#health-events">
                                                <Table striped bordered hover size="sm">
                                                    <thead>
                                                    <tr>
                                                        <th>Descrição</th>
                                                        <th>Data/Hora do ocorrido</th>
                                                    </tr>
                                                    </thead>
                                                    <tbody>
                                                    {this.state.healthEvents.map((event) => (
                                                        <tr key={event.id}>
                                                            <td>{event.description}</td>
                                                            <td>{event.createdAt}</td>
                                                        </tr>
                                                    ))}
                                                    </tbody>
                                                </Table>
                                            </Tab.Pane>
                                            <Tab.Pane eventKey="#schedules">
                                                <Table striped bordered hover size="sm">
                                                    <thead>
                                                    <tr>
                                                        <th>Data/Hora da consulta</th>
                                                        <th>Especialidade</th>
                                                        <th>Doutor(a)</th>
                                                        <th>CRM</th>
                                                    </tr>
                                                    </thead>
                                                    <tbody>
                                                    {this.state.schedules.map((schedule) => (
                                                        <tr key={schedule.id}>
                                                            <td>{schedule.schedulingDateTime}</td>
                                                            <td>
                                                                {schedule.doctor.medicalSpeciality.name}
                                                            </td>
                                                            <td>{schedule.doctor.name}</td>
                                                            <td>{schedule.doctor.crm}</td>
                                                        </tr>
                                                    ))}
                                                    </tbody>
                                                </Table>
                                            </Tab.Pane>
                                        </Tab.Content>
                                    </Col>
                                </Row>
                            </Tab.Container>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button onClick={this.handleCloseModal2} size="sm">
                                Fechar
                            </Button>
                        </Modal.Footer>
                    </Modal>
                </Container>
            </>
        );
    }
}
