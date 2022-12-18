import { gql } from "apollo-angular";

export const getAllApplicationsGQL = gql`
  query($keyword: String) {
    applications(
      where: { name: { contains: $keyword } }
      order: { name: ASC }
    ) {
      id
      name
      typeId
      groupName
      iconUrl
      pageUrl
      type {
        id
        name
      }
    }
  }
`;
