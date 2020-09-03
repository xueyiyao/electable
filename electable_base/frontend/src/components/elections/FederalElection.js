import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getFederalOffices } from "../../actions/federal_offices";
import {
  getFederalCandidates,
  getTopCandidates,
} from "../../actions/federal_candidates";
import federal_offices from "../../reducers/federal_offices";
import {
  federal_candidates,
  top_candidates,
} from "../../reducers/federal_candidates";
import { Accordion, Button, Card, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

export class FederalElection extends Component {
  static propTypes = {
    federal_offices: PropTypes.array.isRequired,
    getFederalOffices: PropTypes.func.isRequired,
    federal_candidates: PropTypes.array.isRequired,
    getFederalCandidates: PropTypes.func.isRequired,
    top_candidates: PropTypes.array.isRequired,
    getTopCandidates: PropTypes.func.isRequired,
  };

  componentDidMount() {
    this.props.getFederalOffices();
    this.props.getFederalCandidates();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.federal_candidates !== this.props.federal_candidates) {
      var i;
      var top = [];
      for (i = 0; i < this.props.federal_offices.length; i++) {
        top.push(
          this.props.federal_candidates.filter(
            (federal_candidate) =>
              federal_candidate.office == this.props.federal_offices[i].id
          )[0]
        );
      }
      // console.log(top);
      this.props.getTopCandidates(top);
    }
  }

  render() {
    let table;
    if (this.props.top_candidates && this.props.top_candidates.length != 0) {
      table = (
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Office</th>
              <th>Top Candidate</th>
            </tr>
          </thead>
          <tbody>
            {this.props.federal_offices.map((federal_office, index) => {
              return (
                <tr key={federal_office.id}>
                  <td>
                    <Link to={`/off/fed/${federal_office.id}`}>
                      {federal_office.name}
                    </Link>
                  </td>
                  <td>
                    <Link
                      to={`/cand/fed/${this.props.top_candidates[index].id}`}
                    >
                      <Card className="text-center">
                        <Card.Img variant="top" src="" />
                        <Card.Body>
                          <Card.Title>
                            {this.props.top_candidates[index].name}
                          </Card.Title>
                          <Card.Text>
                            Score: {this.props.top_candidates[index].score}
                          </Card.Text>
                        </Card.Body>
                      </Card>
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      );
    } else {
      table = (
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Office</th>
              <th>Top Candidate</th>
            </tr>
          </thead>
          <tbody>
            {this.props.federal_offices.map((federal_office, index) => (
              <tr key={federal_office.id}>
                <td>{federal_office.name}</td>
                <td>{}</td>
              </tr>
            ))}
          </tbody>
        </table>
      );
    }
    return (
      <Fragment>
        <h2>Elections</h2>
        <Accordion>
          <Card>
            <Card.Header>
              <Accordion.Toggle as={Button} variant="link" eventKey="0">
                Federal Elections
              </Accordion.Toggle>
            </Card.Header>
            <Accordion.Collapse eventKey="0">
              <Card.Body>{table}</Card.Body>
            </Accordion.Collapse>
          </Card>
        </Accordion>
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  federal_offices: state.federal_offices.federal_offices,
  federal_candidates: state.federal_candidates.federal_candidates,
  top_candidates: state.federal_candidates.top_candidates,
});

export default connect(mapStateToProps, {
  getFederalOffices: getFederalOffices,
  getFederalCandidates: getFederalCandidates,
  getTopCandidates: getTopCandidates,
})(FederalElection);
