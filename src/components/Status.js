import React, { useContext, useState, useEffect } from "react";
import { AccountContext } from "./Account";

const Status = () => {
    const [status, setStatus] = useState(false);
  
    const { getSession, logout } = useContext(AccountContext);
  
    useEffect(() => {
      getSession().then((session) => {
        console.log("Session: ", session);
        setStatus(true);
      });
    }, []);
    
    return (
        <div>  
          {status ? <button onClick={logout}>logout</button> : "Please login"}
      　 </div>
       
    );
};
export default Status;

