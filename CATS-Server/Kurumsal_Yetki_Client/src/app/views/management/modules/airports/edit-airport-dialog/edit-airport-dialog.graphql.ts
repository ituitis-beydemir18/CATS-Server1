import { gql } from "apollo-angular";

export const getAirportGQL = gql`
  query($id: Int!) {
    airport(id: $id) {
      id
      name
      code
      hasVip
      isDomestic
      locked
    }
  }
`;

export const updateAirportGQL = gql`
  mutation($input: AirportInput) {
    saveAirport(input: $input) {
      id
    }
  }
`;

export const deleteAirportGQL = gql`
  mutation($id: Int!) {
    deleteAirport(id: $id)
  }
`;
