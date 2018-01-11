import gql from "graphql-tag";

export default gql`
  mutation removeNote($id: Int) {
    removeNote(id: $id) {
      id
    }
  }
`;
