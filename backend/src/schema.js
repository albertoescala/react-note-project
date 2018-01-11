import {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLString,
  GraphQLList,
  GraphQLSchema
} from "graphql";
import Db from "./db";
import { GraphQLNonNull } from "graphql";

const Note = new GraphQLObjectType({
    name: "Note",
    description: "This represents a Note",
    fields: () => {
        return { 
            id: { 
                type: GraphQLInt,
                resolve(note) {
                    return note.id;
                }
            },
            content: {
                type: GraphQLString,
                resolve(note) {
                    return note.content;
                }
            }
        }
    }
})

const Query = new GraphQLObjectType({
  name: "Query",
  description: "This is a root query",
  fields: () => {
    return {
      note: {
        type: new GraphQLList(Note),
        args: {
          id: {
            type: GraphQLInt
          }
        },
        resolve(root, args) {
          return Db.models.note.findAll({ where: args });
        }
      },
    };
  }
});

const Mutation = new GraphQLObjectType({
    name: "Mutation",
    description: "Functions to create stuff",
    fields(){
        return {
            addNote: {
                type: Note,
                args: {
                    content: {
                        type: new GraphQLNonNull(GraphQLString)
                    }
                },
                resolve(_, args){
                    return Db.models.note.create({
                        content: args.content
                    })
                }
            },
            removeNote: {
                type: Note,
                args: {
                    id: {
                        type: GraphQLInt
                    }
                },
                resolve(_, args){
                    console.log(args.id)
                    return Db.models.note.destroy({
                      where: {id: args.id}
                    });
                }
            },
            updateNote: {
                type: Note,
                args: {
                    id: {
                        type: GraphQLInt
                    },
                    content: {
                        type: new GraphQLNonNull(GraphQLString)
                    }
                },
                resolve(_, args){
                    return Db.models.note.update({
                        content:  args.content
                    }, {
                      where: {id: args.id}
                    });
                }
            }
        }
    }
})

const Schema = new GraphQLSchema({
  query: Query,
  mutation: Mutation
});

export default Schema;