import gql from "graphql-tag";

export const getAllPassengersGQL = gql`
  query(
    $filters: PassengerExtendedFilterInput
    $first: Int
    $last: Int
    $after: String
    $before: String
  ) {
    passengers(
      filters: $filters
      first: $first
      last: $last
      after: $after
      before: $before
      order: { name: ASC }
    ) {
      nodes {
        ...passengerParts
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

  fragment passengerParts on Passenger {
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
`;

export const syncPassengersGQL = gql`
  mutation($airportId: Int!) {
    syncPassengers(airportId: $airportId)
  }
`;