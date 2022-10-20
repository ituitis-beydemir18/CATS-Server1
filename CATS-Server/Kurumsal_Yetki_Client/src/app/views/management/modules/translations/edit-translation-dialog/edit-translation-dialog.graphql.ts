import gql from 'graphql-tag';

export const getTranslationGQL = gql`
  query($id: Int!) {
    translation(id: $id) {
      id
      languageCode
      key
      value
    }
  }
`;

export const deleteTranslationGQL = gql`
  mutation($id: Int!) {
    deleteTranslation(id: $id)
  }
`;

export const saveTranslationGQL = gql`
  mutation($input: TranslationInput) {
    saveTranslation(input: $input){
      id
    }
  }
`;
