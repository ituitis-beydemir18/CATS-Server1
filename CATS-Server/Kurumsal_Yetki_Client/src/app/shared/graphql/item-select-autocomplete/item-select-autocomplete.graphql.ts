import { gql } from "apollo-angular";

export function findGQL(
  query: string,
  idField: string,
  nameField: string,
  itemCount: number = 10
) {
  return gql`
    query($keyword: String) {
      items: ${query}(
        first: ${itemCount}
        where: { ${nameField} : { contains: $keyword } }
      ) {
        nodes {
          id : ${idField}
          name : ${nameField}
        }
      }
    }
  `;
}

export function getGQL(
  query: string,
  idField: string,
  nameField: string,
  idFieldType: string = "String"
) {
  return gql`
    query($value: ${idFieldType}) {
      items : ${query}(
        first: 1
        where: { ${idField}: { eq: $value } }
      ) {
        nodes {
          id : ${idField}
          name : ${nameField}
        }
      }
    }
  `;
}
