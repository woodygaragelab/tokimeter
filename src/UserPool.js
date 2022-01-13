import { CognitoUserPool } from "amazon-cognito-identity-js";

const poolData = {
    UserPoolId:"ap-northeast-1_zdJf72mnl",
    ClientId:"kvtsigss9acmt5s2qkhrijcta"
}

export default new CognitoUserPool(poolData);