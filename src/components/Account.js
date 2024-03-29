import React, { createContext } from "react"
import { CognitoUser, AuthenticationDetails, CognitoUserPool } from "amazon-cognito-identity-js";
import Pool from "../UserPool";

const AccountContext = createContext();

const Account = (props) => {

  const getSession = async () => {
    return  new Promise((resolve, reject) => {
      const user = Pool.getCurrentUser();
      if (user) {
        user.getSession((err, session) => {
          if (err) {
            //alert("1")
            reject();
          } else {
            resolve(session);
          }
        });
      } else {
        // todo: Uncautht (in Promise) error　発生
        //alert("2")
        //reject();
      }
    });
  };

  const authenticate = async (Username, Password) => {
    return await new Promise((resolve, reject) => {
      const user = new CognitoUser({ Username, Pool });

      const authDetails = new AuthenticationDetails({ Username, Password });

      user.authenticateUser(authDetails, {
        onSuccess: (data) => {
          console.log("onSuccess: ", data);
          resolve(data);
        },
        onFailure: (err) => {
          console.error("onFailure: ", err);
          reject(err);
        },
        newPasswordRequired: (data) => {
          console.log("newPasswordRequired: ", data);
          resolve(data);
        },
      });
    });
  };

  const logout = () => {
   
    const user = Pool.getCurrentUser();
    if (user) {
      user.signOut();
    }
  };

  return (
    <AccountContext.Provider value={{ authenticate, getSession,logout }}>
    {props.children}
  </AccountContext.Provider>
  );
};
export { Account, AccountContext };