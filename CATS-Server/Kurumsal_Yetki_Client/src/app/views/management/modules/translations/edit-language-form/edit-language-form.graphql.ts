import { gql } from "apollo-angular";

export const getLanguageGQL = gql`
  query($id: Int!) {
    language(id: $id) {
      id
      name
      code
    }
  }
`;

export const deleteLanguageGQL = gql`
  mutation($id: Int!) {
    deleteLanguage(id: $id)
  }
`;

export const saveLanguageGQL = gql`
  mutation($input: LanguageInput) {
    saveLanguage(input: $input) {
      id
    }
  }
`;
