import React, { useState } from 'react';

import Patient from '@/components/Patient';
import Doctor from '@/components/Doctor';
import Home from '@/components/Home';

import { Nav } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';

import 'bootstrap/dist/css/bootstrap.min.css';

function Index() {
  const [selectedComponent, setSelectedComponent] = useState('home');

  return (
    <>
      <Container>
        <div className="App">
          <h2 className="p-2">Go Healthy - Admin</h2>

          <Nav variant="tabs">
            <Nav.Link onClick={() => setSelectedComponent('home')}>
              Página Inicial
            </Nav.Link>
            <Nav.Link onClick={() => setSelectedComponent('patient')}>
              Pacientes
            </Nav.Link>
            <Nav.Link onClick={() => setSelectedComponent('doctor')}>
              Médicos
            </Nav.Link>
          </Nav>

          {selectedComponent === 'home' && <Home />}
          {selectedComponent === 'patient' && <Patient />}
          {selectedComponent === 'doctor' && <Doctor />}
        </div>
      </Container>
    </>
  );
}

export default Index;
