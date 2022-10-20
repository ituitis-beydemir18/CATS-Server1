import { gql } from "apollo-angular";

export const getAllAirportsGQL = gql`
  query($keyword: String) {
    airports(where: { name: { contains: $keyword } }, order: { name: ASC }) {
      id
      name
      code
      hasVip
      isDomestic
      locked
    }
  }
`;
