import gql from 'graphql-tag';

export function findGQL(
  query: string,
  idField: string,
  nameField: string,
  descField: string
) {
  return gql`
    query {
      items : ${query} {
        id: ${idField}
        name: ${nameField}
        ${descField ? "description:" + descField : ""}
      }
    }
  `;
}
