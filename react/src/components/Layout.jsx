import Navigation from "./Navbar.jsx";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../style/App.css';
import { Outlet } from "react-router-dom";
import {Container, Row, Col} from "react-bootstrap"; 

function Layout() {
  return (
    <Container fluid className="external-style full-screen">
      <Row className="mb-3 py-l">
        <Col xs={12}>
          <Navigation />
        </Col>
      </Row>
      <Outlet/>

    </Container>
  );
}
export default Layout; 
