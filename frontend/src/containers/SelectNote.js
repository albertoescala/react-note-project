import React, { Component } from "react";
import { graphql, compose } from "react-apollo";
import notesQuery from "../data/query/notesQuery";
import noteQuery from "../data/query/noteQuery";
import editNoteMutation from "../data/mutation/editNoteMutation";
import Form from "../components/UI/Form/Form";
import Input from "../components/UI/Input/Input";
import Button from "../components/UI/Button/Button";


class SelectNote extends Component {
  state = {
    content: "",
    firstTime: true,
    edit: false
  };
  submitHandler = event => {
    event.preventDefault();
    if (this.state.content !== "") {
      this.mutateDB();
    }
  };

  keyDownHandler = evt => {
    if (evt.keyCode === 13) {
      evt.persist();
      this.mutateDB();
    }
  };
  componentDidUpdate(){
    if (this.state.firstTime === true) {
      this.props.data.note && this.props.data.note.map(note => {
          if (note.id === Number(this.props.match.params.id)) {
            return this.setState({ content: note.content, firstTime: false });
          } else {
            return null;
          }
        });
    }
  }
  mutateDB = () => {
    this.props
      .mutate({
        variables: {
          id: Number(this.props.match.params.id),
          content: this.state.content
        },
        refetchQueries: [
          {
            query: noteQuery,
            variables: { id: Number(this.props.match.params.id) }
          }
        ]
      })
      .then(({ data }) => {
        console.log("got data", data);
      })
      .then(() => {
        this.setState({ edit: false });
      })
      .catch(error => {
        console.log("there was an error sending the query", error);
      });
  }
  wantToEdit = event => {
    event.preventDefault();
    this.setState({edit: true})
  }
  inputChangeHandler = event => {
    let updatedContent = {
      ...this.state.content
    };
    updatedContent = event.target.value;
    this.setState({ content: updatedContent });
  };

  render() {
    let noteToEdit;
    if ( this.state.edit ) {
      noteToEdit = (
      <Form onSubmit={this.submitHandler} btnText="Editar">
        <Input value={this.state.content} onChange={this.inputChangeHandler} onKeyDown={this.keyDownHandler} />
        <Button>Editar</Button>
      </Form>)
    } else {
      noteToEdit = (
        <div>
          <h1>{this.state.content}</h1>
          <Button onClick={this.wantToEdit}>¿Editar?</Button>
        </div>
      )
    }
    return <div>{noteToEdit}</div>;
  }
}
const ContainerWithMutations = compose(
  graphql(editNoteMutation),
  graphql(notesQuery)
)(SelectNote);



export default ContainerWithMutations;
