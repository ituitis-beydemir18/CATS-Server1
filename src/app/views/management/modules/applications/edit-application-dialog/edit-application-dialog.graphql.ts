import { gql } from "apollo-angular";


export const getApplicationGQL = gql`
  query($id: Int!) {
    application(id: $id) {
      id
      name
      typeId
      groupName
      iconUrl
      pageUrl
      rowIndex
      guestAccess
      roles {
        roleId
      }
    }
  }
`;

export const updateApplicationGQL = gql`
  mutation($input: ApplicationInput) {
    saveApplication(input: $input) {
      id
    }
  }
`;

export const deleteApplicationGQL = gql`
  mutation($id: Int!) {
    deleteApplication(id: $id)
  }
`;
