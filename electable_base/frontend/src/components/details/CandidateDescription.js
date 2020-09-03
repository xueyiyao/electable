import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { getFederalCandidateById } from "../../actions/federal_candidates";
import { Card } from "react-bootstrap";
import { getStateCandidateById } from "../../actions/state_data";
import { getLocalCandidateById } from "../../actions/local_data";

export class CandidatesDescription extends Component {
  static propTypes = {
    federal_candidates: PropTypes.array.isRequired,
    getFederalCandidateById: PropTypes.func.isRequired,
    state_candidates: PropTypes.array.isRequired,
    getStateCandidateById: PropTypes.func.isRequired,
    local_candidates: PropTypes.array.isRequired,
    getLocalCandidateById: PropTypes.func.isRequired,
  };

  componentDidMount() {
    var id = this.props.match.params.id;
    var category = this.props.match.params.slug;
    if (category === "fed") {
      this.props.getFederalCandidateById(id);
    } else if (category === "state") {
      this.props.getStateCandidateById(id);
    } else if (category === "loc") {
      this.props.getLocalCandidateById(id);
    } else {
      console.log("error");
    }
  }

  render() {
    var category = this.props.match.params.slug;
    let title, score, data;

    if (category === "fed") {
      if (
        this.props.federal_candidates &&
        this.props.federal_candidates.length != 0
      ) {
        data = this.props.federal_candidates[0];
        title = data.name;
        score = data.score;
      }
    } else if (category === "state") {
      if (
        this.props.state_candidates &&
        this.props.state_candidates.length != 0
      ) {
        data = this.props.state_candidates[0];
        title = data.name;
        score = data.score;
      }
    } else if (category === "loc") {
      if (
        this.props.local_candidates &&
        this.props.local_candidates.length != 0
      ) {
        data = this.props.local_candidates[0];
        title = data.name;
        score = data.score;
      }
    } else {
      title = "";
      data = [];
      score = "";
    }

    return (
      <Fragment>
        <h2>{title}</h2>
        <h4>Score: {score}</h4>
        <p>
          Duis mollis, est non commodo luctus, nisi erat porttitor ligula, eget
          lacinia odio sem nec elit. Cras mattis consectetur purus sit amet
          fermentum.
        </p>
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  federal_candidates: state.federal_candidates.federal_candidates,
  state_candidates: state.state_candidates.state_candidates,
  local_candidates: state.local_data.local_candidates,
});

export default withRouter(
  connect(mapStateToProps, {
    getFederalCandidateById,
    getStateCandidateById,
    getLocalCandidateById,
  })(CandidatesDescription)
);
