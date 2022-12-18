import { gql } from "apollo-angular";

export const getAllLanguagesGQL = gql`
  query {
    languages {
      id
      name
      code
    }
  }
`;

