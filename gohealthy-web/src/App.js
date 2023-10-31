import {BrowserRouter, Link, Route, Routes} from 'react-router-dom'
import {Nav} from 'react-bootstrap'

import Home from './components/Home'
import Patient from './components/Patient'
import Doctor from './components/Doctor'
import Container from 'react-bootstrap/Container';

import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
    return (
        <>
            <Container>
                <div className='App'>
                    <h2 className="p-2" >Go Healthy - Admin</h2>

                    <BrowserRouter>
                        <Nav variant='tabs'>
                            <Nav.Link as={Link} to='/'>Página Inicial</Nav.Link>
                            <Nav.Link as={Link} to='/patient'>Pacientes</Nav.Link>
                            <Nav.Link as={Link} to='/doctor'>Médicos</Nav.Link>
                        </Nav>
                        <Routes>
                            <Route path='/' index element={<Home/>}></Route>
                            <Route path='/patient' index element={<Patient/>}></Route>
                            <Route path='/doctor' index element={<Doctor/>}></Route>
                        </Routes>

                    </BrowserRouter>
                </div>
            </Container>
        </>
    );
}

export default App;
