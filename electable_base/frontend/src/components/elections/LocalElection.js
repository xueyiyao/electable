import React, { Component, Fragment } from "react";

import { Accordion, Button, Card } from "react-bootstrap";

export class LocalElection extends Component {
  render() {
    return (
      <Fragment>
        <h2>Local Election</h2>
        <Accordion>
          <Card>
            <Card.Header>
              <Accordion.Toggle as={Button} variant="link" eventKey="1">
                Local Election
              </Accordion.Toggle>
            </Card.Header>
            <Accordion.Collapse eventKey="1">
              <Card.Body>Nothing here yet</Card.Body>
            </Accordion.Collapse>
          </Card>
        </Accordion>
      </Fragment>
    );
  }
}

export default LocalElection;
