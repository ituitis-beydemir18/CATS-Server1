import { gql } from "apollo-angular";

export const getUserGQL = gql`
  query($id: Int!) {
    user(id: $id) {
      id
      username
      name
      typeId
      employeeId
      jobTitle
      email
      languageId
      airportId
      locked
      roles {
        roleId
      }
      airports {
        airportId
      }
    }
  }
`;

export const deleteUserGQL = gql`
  mutation($id: Int!) {
    deleteUser(id: $id)
  }
`;

export const saveUserGQL = gql`
  mutation($input: UserInput) {
    saveUser(input: $input) {
      id
    }
  }
`;
