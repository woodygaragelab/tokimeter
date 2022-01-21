import React, { createContext } from "react"
import { CognitoUser, AuthenticationDetails, CognitoUserPool } from "amazon-cognito-identity-js";
import Pool from "../../UserPool";

const AccountContext = createContext();

const Account = (props) => {

  const getSession = async () => {
    return new Promise((resolve, reject) => {
      const user = Pool.getCurrentUser();
      if (user) {
        user.getSession(async (err, session) => {
          if (err) {
            alert("1")
            reject();
          } else {

            const attributes = await new Promise((resolve, reject) => {
              // user.getUserAttributes will return a callback.
              user.getUserAttributes((err, attributes) => {
                if (err) {
                  reject();
                } else {
                  const results = {};

                  for (let attribute of attributes) {
                    const { Name, Value } = attribute;
                    results[Name] = Value;
                  }

                  resolve(results);

                }
              })
            });
            resolve({ user, ...session, ...attributes });
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
      window.location.reload(false); // reload page
    }
  };

  return (
    <AccountContext.Provider value={{ authenticate, getSession, logout }}>
      {props.children}
    </AccountContext.Provider>
  );
};
export { Account, AccountContext };