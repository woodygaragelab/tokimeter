/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getActivity = /* GraphQL */ `
  query GetActivity($id: ID!) {
    getActivity(id: $id) {
      id
      event
      time
      member1
      member2
      member3
      member4
      createdAt
      updatedAt
    }
  }
`;
export const listActivitys = /* GraphQL */ `
  query ListActivitys(
    $filter: ModelActivityFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listActivitys(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        event
        time
        member1
        member2
        member3
        member4
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getTextAnalysisResult = /* GraphQL */ `
  query GetTextAnalysisResult($id: ID!) {
    getTextAnalysisResult(id: $id) {
      id
      Name
      TextContent
      excite
      pleasant
      calm
      nervous
      boring
      unpleasant
      surprise
      sleepy
      myakuari
      createdAt
      updatedAt
    }
  }
`;
export const listTextAnalysisResults = /* GraphQL */ `
  query ListTextAnalysisResults(
    $filter: ModelTextAnalysisResultFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listTextAnalysisResults(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        Name
        TextContent
        excite
        pleasant
        calm
        nervous
        boring
        unpleasant
        surprise
        sleepy
        myakuari
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
