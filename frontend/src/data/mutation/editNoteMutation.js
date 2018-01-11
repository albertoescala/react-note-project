import gql from "graphql-tag";

export default gql`
  mutation updateNote($id: Int, $content: String!) {
    updateNote(id: $id, content: $content) {
      id
      content
    }
  }
`;
