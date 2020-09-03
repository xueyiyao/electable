import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { getFederalOffices } from "../../actions/federal_offices";
import { getFederalCandidates } from "../../actions/federal_candidates";
import { Card } from "react-bootstrap";
import {
  getStateOfficeById,
  getStateCandidatesByOfficeId,
} from "../../actions/state_data";
import {
  getLocalOfficeById,
  getLocalCandidatesByOfficeId,
} from "../../actions/local_data";
import { Link } from "react-router-dom";

export class OfficeDescription extends Component {
  static propTypes = {
    federal_offices: PropTypes.array.isRequired,
    getFederalOffices: PropTypes.func.isRequired,
    federal_candidates: PropTypes.array.isRequired,
    getFederalCandidates: PropTypes.func.isRequired,
    state_offices: PropTypes.array.isRequired,
    getStateOfficeById: PropTypes.func.isRequired,
    state_candidates: PropTypes.array.isRequired,
    getStateCandidatesByOfficeId: PropTypes.func.isRequired,
    local_offices: PropTypes.array.isRequired,
    getLocalOfficeById: PropTypes.func.isRequired,
    local_candidates: PropTypes.array.isRequired,
    getLocalCandidatesByOfficeId: PropTypes.func.isRequired,
  };

  componentDidMount() {
    var id = this.props.match.params.id;
    var category = this.props.match.params.slug;
    if (category === "fed") {
      this.props.getFederalOffices(id);
      this.props.getFederalCandidates(id);
    } else if (category === "state") {
      this.props.getStateOfficeById(id);
      this.props.getStateCandidatesByOfficeId(id);
    } else if (category === "loc") {
      this.props.getLocalOfficeById(id);
      this.props.getLocalCandidatesByOfficeId(id);
    } else {
      console.log("error");
    }
  }

  render() {
    var category = this.props.match.params.slug;
    let title, table, data;

    if (category === "fed") {
      if (
        this.props.federal_offices &&
        this.props.federal_offices.length != 0
      ) {
        title = this.props.federal_offices[0].name;
      }

      if (
        this.props.federal_candidates &&
        this.props.federal_candidates.length != 0
      ) {
        data = this.props.federal_candidates.map((candidate) => {
          return (
            <tr key={candidate.id}>
              <td>
                <Link to={`/cand/fed/${candidate.id}`}>{candidate.name}</Link>
              </td>
              <td>{candidate.score}</td>
            </tr>
          );
        });
      }
    } else if (category === "state") {
      if (this.props.state_offices && this.props.state_offices.length != 0) {
        title = this.props.state_offices[0].name;
      }
      if (
        this.props.state_candidates &&
        this.props.state_candidates.length != 0
      ) {
        data = this.props.state_candidates.map((candidate) => {
          return (
            <tr key={candidate.id}>
              <td>
                <Link to={`/cand/state/${candidate.id}`}>{candidate.name}</Link>
              </td>
              <td>{candidate.score}</td>
            </tr>
          );
        });
      }
    } else if (category === "loc") {
      if (this.props.local_offices && this.props.local_offices.length != 0) {
        title = this.props.local_offices[0].name;
      }
      if (
        this.props.local_candidates &&
        this.props.local_candidates.length != 0
      ) {
        data = this.props.local_candidates.map((candidate) => {
          return (
            <tr key={candidate.id}>
              <td>
                <Link to={`/cand/loc/${candidate.id}`}>{candidate.name}</Link>
              </td>
              <td>{candidate.score}</td>
            </tr>
          );
        });
      }
    } else {
      title = "";
      data = [];
    }

    table = (
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Name</th>
            <th>Score</th>
          </tr>
        </thead>
        <tbody>{data}</tbody>
      </table>
    );

    return (
      <Fragment>
        <h2>{title}</h2>
        <p>
          Duis mollis, est non commodo luctus, nisi erat porttitor ligula, eget
          lacinia odio sem nec elit. Cras mattis consectetur purus sit amet
          fermentum.
        </p>
        <Card>
          <Card.Header>Candidates Running for {title}</Card.Header>
          <Card.Body>{table}</Card.Body>
        </Card>
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  federal_offices: state.federal_offices.federal_offices,
  federal_candidates: state.federal_candidates.federal_candidates,
  state_offices: state.state_offices.state_offices,
  state_candidates: state.state_candidates.state_candidates,
  local_offices: state.local_data.local_offices,
  local_candidates: state.local_data.local_candidates,
});

export default withRouter(
  connect(mapStateToProps, {
    getFederalOffices,
    getFederalCandidates,
    getStateOfficeById,
    getStateCandidatesByOfficeId,
    getLocalOfficeById,
    getLocalCandidatesByOfficeId,
  })(OfficeDescription)
);
