import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import { Alert } from "react-bootstrap";
import { getStateData } from "../../actions/state_offices";
import {
  getLocalData,
  hideCountyNotInStateAlert,
} from "../../actions/local_data";

export class Search extends Component {
  state = {
    county: "",
    USstate: "",
  };

  static propTypes = {
    getStateData: PropTypes.func.isRequired,
    getLocalData: PropTypes.func.isRequired,
    county_not_in_state: PropTypes.bool.isRequired,
    show_county_not_in_state_alert: PropTypes.bool.isRequired,
  };

  onChange = (e) => this.setState({ [e.target.name]: e.target.value });

  onSubmit = (e) => {
    e.preventDefault();
    this.props.getStateData(this.state.USstate);
    if (this.state.county != "") {
      this.props.getLocalData(this.state.USstate, this.state.county);
    }
  };

  render() {
    const { county, USstate } = this.state;
    return (
      <Fragment>
        <Alert
          variant="danger"
          show={this.props.show_county_not_in_state_alert}
          onClose={this.props.hideCountyNotInStateAlert}
          dismissible
        >
          <Alert.Heading>Oops! Something happened...</Alert.Heading>
          <p>
            We couldn't find that county! Maybe check the spelling or ensure
            that the right state is selected.
          </p>
        </Alert>
        <h2>Search</h2>
        <Form onSubmit={this.onSubmit}>
          <Form.Row className="align-items-center">
            <Col>
              <Form.Control
                size="md"
                type="text"
                placeholder="Enter County"
                name="county"
                onChange={this.onChange}
                value={county}
              />
            </Col>
            <Col xs="auto">
              <Form.Control
                as="select"
                onChange={this.onChange}
                name="USstate"
                value={USstate}
              >
                <option>Select State</option>
                <option value="AL">Alabama</option>
                <option value="AK">Alaska</option>
                <option value="AZ">Arizona</option>
                <option value="AR">Arkansas</option>
                <option value="CA">California</option>
                <option value="CO">Colorado</option>
                <option value="CT">Connecticut</option>
                <option value="DE">Delaware</option>
                <option value="DC">District Of Columbia</option>
                <option value="FL">Florida</option>
                <option value="GA">Georgia</option>
                <option value="HI">Hawaii</option>
                <option value="ID">Idaho</option>
                <option value="IL">Illinois</option>
                <option value="IN">Indiana</option>
                <option value="IA">Iowa</option>
                <option value="KS">Kansas</option>
                <option value="KY">Kentucky</option>
                <option value="LA">Louisiana</option>
                <option value="ME">Maine</option>
                <option value="MD">Maryland</option>
                <option value="MA">Massachusetts</option>
                <option value="MI">Michigan</option>
                <option value="MN">Minnesota</option>
                <option value="MS">Mississippi</option>
                <option value="MO">Missouri</option>
                <option value="MT">Montana</option>
                <option value="NE">Nebraska</option>
                <option value="NV">Nevada</option>
                <option value="NH">New Hampshire</option>
                <option value="NJ">New Jersey</option>
                <option value="NM">New Mexico</option>
                <option value="NY">New York</option>
                <option value="NC">North Carolina</option>
                <option value="ND">North Dakota</option>
                <option value="OH">Ohio</option>
                <option value="OK">Oklahoma</option>
                <option value="OR">Oregon</option>
                <option value="PA">Pennsylvania</option>
                <option value="RI">Rhode Island</option>
                <option value="SC">South Carolina</option>
                <option value="SD">South Dakota</option>
                <option value="TN">Tennessee</option>
                <option value="TX">Texas</option>
                <option value="UT">Utah</option>
                <option value="VT">Vermont</option>
                <option value="VA">Virginia</option>
                <option value="WA">Washington</option>
                <option value="WV">West Virginia</option>
                <option value="WI">Wisconsin</option>
                <option value="WY">Wyoming</option>
              </Form.Control>
            </Col>
            <Col xs="auto">
              <Button variant="primary" type="submit">
                Search
              </Button>
            </Col>
          </Form.Row>
        </Form>
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  county_not_in_state: state.local_data.county_not_in_state,
  show_county_not_in_state_alert:
    state.local_data.show_county_not_in_state_alert,
});

export default connect(mapStateToProps, {
  getStateData: getStateData,
  getLocalData: getLocalData,
  hideCountyNotInStateAlert: hideCountyNotInStateAlert,
})(Search);
