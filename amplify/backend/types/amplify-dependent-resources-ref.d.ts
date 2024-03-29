export type AmplifyDependentResourcesAttributes = {
    "auth": {
        "tokimeter08484232": {
            "IdentityPoolId": "string",
            "IdentityPoolName": "string",
            "UserPoolId": "string",
            "UserPoolArn": "string",
            "UserPoolName": "string",
            "AppClientIDWeb": "string",
            "AppClientID": "string",
            "CreatedSNSRole": "string"
        }
    },
    "api": {
        "formapi": {
            "RootUrl": "string",
            "ApiName": "string",
            "ApiId": "string"
        },
        "tokimeter": {
            "GraphQLAPIIdOutput": "string",
            "GraphQLAPIEndpointOutput": "string"
        }
    },
    "storage": {
        "dynamodbTokimeterTest": {
            "Name": "string",
            "Arn": "string",
            "StreamArn": "string",
            "PartitionKeyName": "string",
            "PartitionKeyType": "string",
            "Region": "string"
        },
        "heartBeatStorage": {
            "BucketName": "string",
            "Region": "string"
        }
    },
    "function": {
        "tokimeterformfunction": {
            "Name": "string",
            "Arn": "string",
            "Region": "string",
            "LambdaExecutionRole": "string"
        }
    }
}