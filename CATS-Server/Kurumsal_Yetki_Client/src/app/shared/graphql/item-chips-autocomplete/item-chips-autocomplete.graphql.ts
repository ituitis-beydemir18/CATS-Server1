import gql from 'graphql-tag';

export function findGQL(
  query: string,
  idField: string,
  nameField: string,
  itemCount: number = 10
) {
  return gql`
    query($keyword: String) {
      items : ${query}(
        first : ${itemCount}
        where : { ${nameField} : { contains: $keyword } }
      ) {
        nodes {
          id : ${idField}
          name : ${nameField}
        }
      }
    }
  `;
}

export function getGQL(query: string, idField: string, nameField: string) {
  return gql`
    query($values: [Int]) {
      items : ${query}(
        where: { ${idField} : { in: $values }}
      ) {
        nodes {
          id : ${idField}
          name : ${nameField}
        }
      }
    }
  `;
}
