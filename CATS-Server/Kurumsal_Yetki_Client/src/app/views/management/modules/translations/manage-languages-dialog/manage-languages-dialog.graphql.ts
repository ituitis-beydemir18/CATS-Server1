import gql from 'graphql-tag';

export const getAllLanguages = gql`
  query {
    languages {
      id
      name
      code
    }
  }
`;

export const getLanguageGQL = gql`
  query($id: Int!) {
    languages(id: $id) {
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
    saveLanguage(input: $input)
    {
      id
    }
  }
`;
