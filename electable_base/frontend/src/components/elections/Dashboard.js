import React, { Fragment } from "react";
import Search from "./Search";
import FederalElection from "./FederalElection";
import ElectionRow from "./ElectionsRow";

export default function Dashboard() {
  return (
    <Fragment>
      <br />
      <Search />
      <br />
      <FederalElection />
      <br />
      <ElectionRow />
      <br />
    </Fragment>
  );
}
