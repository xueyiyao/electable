import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import state_offices from "../../reducers/state_offices";
import state_candidates from "../../reducers/state_offices";
import { Accordion, Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";

export class StateElection extends Component {
  static propTypes = {
    state_offices: PropTypes.array.isRequired,
    state_candidates: PropTypes.array.isRequired,
    top_state_candidates: PropTypes.array.isRequired,
  };

  render() {
    let table;
    if (
      this.props.top_state_candidates.length != this.props.state_offices.length
    ) {
      table = <p>loading...</p>;
    } else if (
      this.props.top_state_candidates &&
      this.props.top_state_candidates.length != 0
    ) {
      table = (
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Office</th>
              <th>Top Candidate</th>
            </tr>
          </thead>
          <tbody>
            {this.props.state_offices.map((state_office, index) => (
              <tr key={state_office.id}>
                <td>
                  <Link to={`/off/state/${state_office.id}`}>
                    {state_office.name}
                  </Link>
                </td>
                <td>
                  <Card className="text-center">
                    <Card.Img variant="top" src="" />
                    <Card.Body>
                      <Card.Title>
                        <Link
                          to={`/cand/state/${this.props.top_state_candidates[index].id}`}
                        >
                          {this.props.top_state_candidates[index].name}
                        </Link>
                      </Card.Title>
                      <Card.Text>
                        Score: {this.props.top_state_candidates[index].score}
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      );
    } else {
      table = <p>Please select a US State in the search bar above!</p>;
    }

    return (
      <Fragment>
        <h2>State Election</h2>
        <Accordion>
          <Card>
            <Card.Header>
              <Accordion.Toggle as={Button} variant="link" eventKey="1">
                State Elections
              </Accordion.Toggle>
            </Card.Header>
            <Accordion.Collapse eventKey="1">
              <Card.Body>{table}</Card.Body>
            </Accordion.Collapse>
          </Card>
        </Accordion>
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  state_offices: state.state_offices.state_offices,
  state_candidates: state.state_candidates.state_candidates,
  top_state_candidates: state.state_candidates.top_state_candidates,
});

export default connect(mapStateToProps, null)(StateElection);
