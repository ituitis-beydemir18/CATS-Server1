import { gql } from "apollo-angular";

export function findGQL(
  query: string,
  idField: string,
  nameField: string,
  groupField: string,
  pagingEnabled: boolean = false
) {
  return pagingEnabled
    ? gql`
  query{
    items : ${query}{
      nodes {
        ${idField ? `id: ${idField}` : ``}
        ${nameField ? `name: ${nameField}` : ``}
        ${groupField ? `groupName: ${groupField}` : ``}
      }
    }
  } 
  `
    : gql`
    query {
      items : ${query} {
        ${idField ? `id: ${idField}` : ``}
        ${nameField ? `name: ${nameField}` : ``}
        ${groupField ? `groupName: ${groupField}` : ``}
      }
    }
  `;
}
