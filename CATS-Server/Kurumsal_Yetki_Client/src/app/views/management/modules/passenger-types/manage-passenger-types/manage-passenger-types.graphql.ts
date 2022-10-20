import gql from 'graphql-tag';

export const getAllPassengerTypesGQL = gql`
  query($keyword: String) {
    passengerTypes(
      where: { name: { contains: $keyword } }
      order: { name: ASC }
    ) {
      id
      name
      groupName
    }
  }
`;
