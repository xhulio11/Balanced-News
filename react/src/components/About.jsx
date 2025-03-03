import React from 'react';
import Row from "react-bootstrap/Row"; 
import Col from "react-bootstrap/Col";  
import 'bootstrap/dist/css/bootstrap.min.css';



function About(){   
  return(
  
    <Row className="mb-3 py-1">
      {/* Column for Article */}
      <Col xs={12} >
      <div>
        <article>
          <h1>This is an about Page</h1>
          <ol>
            <li>Components: UI Building Blocks</li>
            <li>Defining a Component</li>
            <li>Using a Component</li>
          </ol>
        </article>
      </div>
      </Col>
    </Row>
  )
}
export default About; 