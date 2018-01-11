import gql from "graphql-tag";

export default gql`
  query note {
    note {
      id
      content
    }
  }
`;
