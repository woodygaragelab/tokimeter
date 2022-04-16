/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createKzActivity = /* GraphQL */ `
  mutation CreateKzActivity(
    $input: CreateKzActivityInput!
    $condition: ModelKzActivityConditionInput
  ) {
    createKzActivity(input: $input, condition: $condition) {
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
export const updateKzActivity = /* GraphQL */ `
  mutation UpdateKzActivity(
    $input: UpdateKzActivityInput!
    $condition: ModelKzActivityConditionInput
  ) {
    updateKzActivity(input: $input, condition: $condition) {
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
export const deleteKzActivity = /* GraphQL */ `
  mutation DeleteKzActivity(
    $input: DeleteKzActivityInput!
    $condition: ModelKzActivityConditionInput
  ) {
    deleteKzActivity(input: $input, condition: $condition) {
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
export const createKzTextAnalysisResult = /* GraphQL */ `
  mutation CreateKzTextAnalysisResult(
    $input: CreateKzTextAnalysisResultInput!
    $condition: ModelKzTextAnalysisResultConditionInput
  ) {
    createKzTextAnalysisResult(input: $input, condition: $condition) {
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
export const updateKzTextAnalysisResult = /* GraphQL */ `
  mutation UpdateKzTextAnalysisResult(
    $input: UpdateKzTextAnalysisResultInput!
    $condition: ModelKzTextAnalysisResultConditionInput
  ) {
    updateKzTextAnalysisResult(input: $input, condition: $condition) {
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
export const deleteKzTextAnalysisResult = /* GraphQL */ `
  mutation DeleteKzTextAnalysisResult(
    $input: DeleteKzTextAnalysisResultInput!
    $condition: ModelKzTextAnalysisResultConditionInput
  ) {
    deleteKzTextAnalysisResult(input: $input, condition: $condition) {
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
