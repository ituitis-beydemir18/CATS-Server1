import gql from "graphql-tag";

export const getPassengerGQL = gql`
  query($id: Int!) {
    passenger(id: $id) {
      id
      createdBy
      created
      lastModifiedBy
      lastModified
      name
      surname
      fullName
      title
      jobTitle
      typeId
      type {
        id
        name
        groupName
      }
      airlineCode
      flightNumber
      flightCode
      pnrNumber
      airportCode
      flightFrom
      flightTo
      flightRoute
      flightDate
      departureDate
      arrivalDate
      status
      assignedStaff
      comments
    }
  }
`;

export const updatePassengerGQL = gql`
  mutation($input: PassengerInput) {
    savePassenger(input: $input) {
      id
    }
  }
`;

export const deletePassengerGQL = gql`
  mutation($id: Int!) {
    deletePassenger(id: $id)
  }
`;
