import React, { Component } from "react";
import { Link } from "react-router-dom";
import { graphql } from "react-apollo";
import gql from "graphql-tag";

const GET_ALL_CUSTOMERS = gql`
  query {
    customers {
      name
    }
  }
`;

class HomeView extends Component {
  render() {
    let { data } = this.props;
    let users = data.customers.map((e, i) => {
      return (
        <p key={i}>
          <Link to={`/user/${e.id}`}>{e.name}</Link>
        </p>
      );
    });
    if (data.loading) {
      return <div>Loading...</div>;
    }

    return <div>This is the HOme view</div>;
  }
}

HomeView = graphql(GET_ALL_CUSTOMERS)(HomeView);
export default HomeView;
