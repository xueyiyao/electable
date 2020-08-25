import React, { Fragment } from "react";
import StateElection from "./StateElection";
import LocalElection from "./LocalElection";
import { render } from "react-dom";
import { Col, Container, Row } from "react-bootstrap";

export default function ElectionRow() {
  return (
    <Fragment>
      <Row>
        <Col>
          <StateElection />
        </Col>
        <Col>
          <LocalElection />
        </Col>
      </Row>
    </Fragment>
  );
}
