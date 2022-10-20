import gql from 'graphql-tag';

export const getPassengerTypeGQL = gql`
  query($id: Int!) {
    passengerType(id: $id) {
      id
      name
      groupName
    }
  }
`;

export const updatePassengerTypeGQL = gql`
  mutation($input: PassengerTypeInput) {
    savePassengerType(input: $input) {
      id
    }
  }
`;

export const deletePassengerTypeGQL = gql`
  mutation($id: Int!) {
    deletePassengerType(id: $id)
  }
`;
