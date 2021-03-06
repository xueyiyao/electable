import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import {
  local_offices,
  local_candidates,
  county_not_in_state,
} from "../../reducers/local_data";
import top_local_candidates from "../../reducers/local_data";
import { Accordion, Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";

export class LocalElection extends Component {
  static propTypes = {
    local_offices: PropTypes.array.isRequired,
    local_candidates: PropTypes.array.isRequired,
    top_local_candidates: PropTypes.array.isRequired,
    county_not_in_state: PropTypes.bool.isRequired,
  };

  render() {
    let table;
    if (this.props.county_not_in_state) {
      table = <p>Oops, we couldn't find that county!</p>;
    } else if (
      this.props.top_local_candidates.length != this.props.local_offices.length
    ) {
      table = <p>loading...</p>;
    } else if (
      this.props.top_local_candidates &&
      this.props.top_local_candidates.length != 0
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
            {this.props.local_offices.map((local_office, index) => (
              <tr key={local_office.id}>
                <td>
                  <Link to={`/off/loc/${local_office.id}`}>
                    {local_office.name}
                  </Link>
                </td>
                <td>
                  <Card className="text-center">
                    <Card.Img variant="top" src="" />
                    <Card.Body>
                      <Card.Title>
                        <Link
                          to={`/cand/loc/${this.props.top_local_candidates[index].id}`}
                        >
                          {this.props.top_local_candidates[index].name}
                        </Link>
                      </Card.Title>
                      <Card.Text>
                        Score: {this.props.top_local_candidates[index].score}
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
      table = <p>Please search for a county in the search bar above!</p>;
    }

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
              <Card.Body>{table}</Card.Body>
            </Accordion.Collapse>
          </Card>
        </Accordion>
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  local_offices: state.local_data.local_offices,
  local_candidates: state.local_data.local_candidates,
  top_local_candidates: state.local_data.top_local_candidates,
  county_not_in_state: state.local_data.county_not_in_state,
});

export default connect(mapStateToProps, null)(LocalElection);
