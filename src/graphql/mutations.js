/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createActivity = /* GraphQL */ `
  mutation CreateActivity(
    $input: CreateActivityInput!
    $condition: ModelActivityConditionInput
  ) {
    createActivity(input: $input, condition: $condition) {
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
export const updateActivity = /* GraphQL */ `
  mutation UpdateActivity(
    $input: UpdateActivityInput!
    $condition: ModelActivityConditionInput
  ) {
    updateActivity(input: $input, condition: $condition) {
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
export const deleteActivity = /* GraphQL */ `
  mutation DeleteActivity(
    $input: DeleteActivityInput!
    $condition: ModelActivityConditionInput
  ) {
    deleteActivity(input: $input, condition: $condition) {
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
export const createTextAnalysisResult = /* GraphQL */ `
  mutation CreateTextAnalysisResult(
    $input: CreateTextAnalysisResultInput!
    $condition: ModelTextAnalysisResultConditionInput
  ) {
    createTextAnalysisResult(input: $input, condition: $condition) {
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
export const updateTextAnalysisResult = /* GraphQL */ `
  mutation UpdateTextAnalysisResult(
    $input: UpdateTextAnalysisResultInput!
    $condition: ModelTextAnalysisResultConditionInput
  ) {
    updateTextAnalysisResult(input: $input, condition: $condition) {
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
export const deleteTextAnalysisResult = /* GraphQL */ `
  mutation DeleteTextAnalysisResult(
    $input: DeleteTextAnalysisResultInput!
    $condition: ModelTextAnalysisResultConditionInput
  ) {
    deleteTextAnalysisResult(input: $input, condition: $condition) {
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
