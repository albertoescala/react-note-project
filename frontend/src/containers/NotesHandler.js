import React, { Component } from "react";
import { graphql, compose } from "react-apollo";
import { NavLink } from "react-router-dom";
import Input from "../components/UI/Input/Input";
import Form from "../components/UI/Form/Form";
import Button from "../components/UI/Button/Button";
import notesQuery from "../data/query/notesQuery";
import addNoteMutation from "../data/mutation/addNoteMutation";
import removeNoteMutation from "../data/mutation/removeNoteMutation";
import "./notesHandler.css";


class NotesHandler extends Component {
  state = {
    content: ""
  };
  submitHandler = event => {
    event.preventDefault();
    if (this.state.content !== "") {
      this.mutateDB();
    }
  };

  keyDownHandler = event => {
    if (event.keyCode === 13) {
      event.persist();
      this.mutateDB();
    }
  };
  mutateDB = () => {
    this.props
      .add({
        variables: { content: this.state.content },
        refetchQueries: [
          {
            query: notesQuery
          }
        ]
      })
      .then(({ data }) => {
        console.log("got data", data);
      })
      .then(res => {
        this.setState({ content: "" });
      })
      .catch(error => {
        console.log("there was an error sending the query", error);
      });
  };
  inputChangeHandler = event => {
    let updatedContent = {
      ...this.state.content
    };
    updatedContent = event.target.value;
    this.setState({ content: updatedContent });
  };

  removeNoteHandler = id => () => {
    this.props.remove({
      variables: { id },
      refetchQueries: [
        {
          query: notesQuery
        }
      ]
    });
  };

  render() {
    const notesList = this.props.data.note;
    return (
      <div>
        <Form onSubmit={this.submitHandler}>
          <Input
            value={this.state.content}
            onChange={this.inputChangeHandler}
            onKeyDown={this.keyDownHandler}
          />
          <Button>Enviar</Button>
        </Form>
        <h4>Comentarios:</h4>
        <ul className="ul">
          {notesList &&
            notesList.map((note, index) => (
              <li className="li" key={note.id}>
                <NavLink
                  key={note.id}
                  to={{ pathname: "/editNote/" + note.id }}
                >
                  {note.content}
                </NavLink>
                <Button key={index} onClick={this.removeNoteHandler(note.id)}>Eliminar</Button>
              </li>
            ))}
        </ul>
      </div>
    );
  }
}

const ContainerWithMutations = compose(
  graphql(addNoteMutation, {name: "add"}),
  graphql(notesQuery),
  graphql(removeNoteMutation, {name: "remove"})
)(NotesHandler);

export default ContainerWithMutations;