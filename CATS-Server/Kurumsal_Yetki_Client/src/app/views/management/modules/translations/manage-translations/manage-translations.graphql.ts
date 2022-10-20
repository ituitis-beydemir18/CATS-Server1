import gql from 'graphql-tag';

export const getAllTranslationsGQL = gql`
  query(
    $keyword: String
    $first: Int
    $last: Int
    $after: String
    $before: String
  ) {
    translations(
      where: { key: { contains: $keyword } }
      first: $first
      last: $last
      after: $after
      before: $before
      order: { key: ASC }
    ) {
      nodes {
        id
        key
        value
        languageCode
        language {
          name
        }
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
`;
