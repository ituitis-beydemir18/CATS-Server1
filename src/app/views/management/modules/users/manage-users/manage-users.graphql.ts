import { gql } from "apollo-angular";

export const allUsersGQL = gql`
  query(
    $keyword: String
    $first: Int
    $last: Int
    $after: String
    $before: String
  ) {
    users(
      where: { name: { contains: $keyword } }
      first: $first
      last: $last
      after: $after
      before: $before
      order: { name: ASC }
    ) {
      nodes {
        id
        username
        name
        jobTitle
        email
        locked
        type {
          id
          name
        }
      }
      pageInfo {
        hasPreviousPage
        hasNextPage
        startCursor
        endCursor
      }
      totalCount
    }
  }
`;

export const deleteUserGQL = gql`
  mutation($id: Int!) {
    deleteUser(id: $id)
  }
`;
