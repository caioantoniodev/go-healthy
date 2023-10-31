import React from "react";
import {format, utcToZonedTime, zonedTimeToUtc} from 'date-fns-tz';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Table from "react-bootstrap/Table";
import Form from 'react-bootstrap/Form';
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import axios from "axios";

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const uriDoctors = "/api/v1/doctors";
const uriPatients = "/api/v1/patients";
const uriSchedules = "/api/v1/schedules";

class Home extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            selectedDate: new Date(),
            doctorId: "",
            doctors: [],
            patientId: "",
            patients: [],
            schedules: [],
            statusError: 0,
            showError: false,
        };
    }

    retrieveDoctors = () => {
        axios
            .get(uriDoctors)
            .then((response) => {
                this.setState({doctors: response.data});
                this.setState({doctorId: response.data[0].id});
            })
            .catch((err) => {
                this.handleError(true, err);
            });
    }

    retrieveSchedules = () => {
        axios
            .get(uriSchedules)
            .then((response) => {
                this.setState({schedules: response.data});
            })
            .catch((err) => {
                this.handleError(true, err);
            });
    }


    retrievePatients = () => {
        axios
            .get(uriPatients)
            .then((response) => {
                this.setState({patients: response.data});
                this.setState({patientId: response.data[0].id});
            })
            .catch((err) => {
                this.handleError(true, err);
            });
    }

    setDoctorId = (e) => {
        this.setState({
            doctorId: e.target.value
        });
    };

    setPatientId = (e) => {
        this.setState({
            patientId: e.target.value
        });
    };

    setSelectedDate = (date) => {
        this.setState({selectedDate: date});
    }


    handleError = (status, err) => {
        this.setState({
            showError: status,
        });

        this.setState({
            statusError: err,
        });
    }

    createSchedule = () => {
        const selectedDate = this.state.selectedDate;
        const selectedDateUtc = zonedTimeToUtc(selectedDate, 'UTC');
        const brazilTimeZone = 'America/Sao_Paulo';
        const zonedDateTimeBrazil = utcToZonedTime(selectedDateUtc, brazilTimeZone);
        const formattedZonedDateTimeBrazil = format(zonedDateTimeBrazil, "yyyy-MM-dd'T'HH:mm:00XXX", {
            timeZone: brazilTimeZone,
        });

        axios.post(uriSchedules, {
            schedulingDateTime: formattedZonedDateTimeBrazil,
            patient: {
                id: this.state.patientId
            },
            doctor: {
                id: this.state.doctorId
            }
        })
            .then((response) => {
                if (response.status > 200 && response.status < 300) {
                    this.setSelectedDate(new Date())
                    this.retrieveSchedules()
                }
            })
            .catch((err) => {
                this.handleError(true, err);
            });

    }

    componentDidMount() {
        this.retrieveDoctors();
        this.retrievePatients();
        this.retrieveSchedules();

        console.log()
    }

    render() {
        return (
            <Container>
                <Row className="p-4">
                    {this.state.showError &&
                        <Alert variant="danger" onClose={() => this.handleError(false)} on dismissible>
                            <p>
                                API ERROR [{this.state.statusError.message}]
                            </p>
                        </Alert>
                    }

                    <Row>
                        <Col sm={3}>
                            <h6> Marcar consulta</h6>

                            <Form>
                                <Form.Group className="mb-3">
                                    <Form.Label>Escolha o médico</Form.Label>
                                    <Form.Select size="sm" onChange={this.setDoctorId}>
                                        {this.state.doctors.map((doctor) => (
                                            <option key={doctor.id}
                                                    value={doctor.id}>{doctor.name} - {doctor.medicalSpeciality.name}</option>
                                        ))}
                                    </Form.Select>
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label>Escolha o médico</Form.Label>
                                    <Form.Select size="sm" onChange={this.setPatientId}>
                                        {this.state.patients.map((patient) => (
                                            <option key={patient.id} value={patient.id}>{patient.firstName}</option>
                                        ))}
                                    </Form.Select>
                                </Form.Group>

                                <Form.Group controlId="datetimePicker" className="mb-3">
                                    <Form.Label>Data e Hora:</Form.Label>
                                    <DatePicker
                                        selected={this.state.selectedDate}
                                        onChange={date => this.setSelectedDate(date)}
                                        showTimeSelect
                                        timeIntervals={15}
                                        timeFormat="HH:mm"
                                        dateFormat="dd/MM/yyyy HH:mm"
                                        className="form-control form-control-sm" // Aplicando a classe de tamanho do Bootstrap
                                    />
                                </Form.Group>

                                <Button variant="primary" size="sm" onClick={this.createSchedule}>
                                    Agendar
                                </Button>
                            </Form>

                        </Col>
                        <Col sm={3}>
                            <h6> Desmarcar consulta</h6>

                            <Form>
                                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                                    <Form.Label>Escolha uma consulta</Form.Label>
                                    <Form.Select size="sm">
                                        <option>Médico</option>
                                    </Form.Select>
                                </Form.Group>

                                <Button variant="primary" size="sm" onClick={this.handleShow}>
                                    Desmarcar
                                </Button>
                            </Form>
                        </Col>
                        <Col sm={6}>
                            <h6> Consultas marcadas</h6>
                            <Table striped bordered hover>
                                <thead>
                                <tr>
                                    <th>Médico</th>
                                    <th>Paciente</th>
                                    <th>Horário</th>
                                    <th>Especialidade</th>
                                </tr>
                                </thead>
                                <tbody>
                                {this.state.schedules.map((schedule) => (
                                    <tr key={schedule.id}>
                                        <td>{schedule.doctor.name}</td>
                                        <td>{schedule.patient.firstName}</td>
                                        <td>{schedule.schedulingDateTime}</td>
                                        <td>{schedule.doctor.medicalSpeciality.name}</td>
                                    </tr>
                                ))}
                                </tbody>
                            </Table>
                        </Col>
                    </Row>
                </Row>
            </Container>

        )
    }
}

export default Home;
