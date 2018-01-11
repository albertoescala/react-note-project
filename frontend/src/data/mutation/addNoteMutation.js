import gql from "graphql-tag";

export default gql`
  mutation addNote($content: String!) {
    addNote(content: $content) {
      id
      content
    }
  }
`;
