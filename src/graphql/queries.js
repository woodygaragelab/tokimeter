/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getKzActivity = /* GraphQL */ `
  query GetKzActivity($id: ID!) {
    getKzActivity(id: $id) {
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
export const listKzActivitys = /* GraphQL */ `
  query ListKzActivitys(
    $filter: ModelKzActivityFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listKzActivitys(filter: $filter, limit: $limit, nextToken: $nextToken) {
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
export const getKzTextAnalysisResult = /* GraphQL */ `
  query GetKzTextAnalysisResult($id: ID!) {
    getKzTextAnalysisResult(id: $id) {
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
export const listKzTextAnalysisResults = /* GraphQL */ `
  query ListKzTextAnalysisResults(
    $filter: ModelKzTextAnalysisResultFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listKzTextAnalysisResults(
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
