import gql from "graphql-tag";

export default gql`
  query note($id: Int) {
    note(id: $id) {
      id
      content
    }
  }
`;