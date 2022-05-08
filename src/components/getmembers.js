import { CognitoUserPool } from "amazon-cognito-identity-js"
import awsConfiguration    from '../awsConfiguration'
const userPool = new CognitoUserPool({
  UserPoolId: awsConfiguration.UserPoolId,
  ClientId:   awsConfiguration.ClientId,
})
const cognitoUser             = userPool.getCurrentUser();
var username                  = "default_user";
if (cognitoUser) {
  username = cognitoUser.username;
};

const GetMembers = async() => {        // serverからmember listを取得する関数
  var myHeaders      = new Headers();
  myHeaders.append("Content-Type", "application/json");
  var raw            = JSON.stringify({"userid":username});
  var requestOptions = {method: 'POST', headers: myHeaders, body: raw, redirect: 'follow' };
  return fetch(" https://hxejb9ahd9.execute-api.ap-northeast-1.amazonaws.com/dev/", requestOptions)
  .then(response => response.text())
  .then(response => {
    const apiData = JSON.parse(response);
    
    var memberData = apiData.filter(function(member) {   // member だけfilterする。 
      return member.memberid !== 0;                      // memberid=0(me)はmemberDataに入れない
    });
    
    var nameList = memberData.map(function(member) {     // name listを作る
      return member.membername;                
    });
    return nameList;
  })
};

export default GetMembers 