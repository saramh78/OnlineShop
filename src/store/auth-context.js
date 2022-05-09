import React, { useState, useEffect, useCallback } from "react";

let logoutTimer;

const AuthContext = React.createContext({
  token: "",
  localId: "",
  isLoggedIn: false,
  login: (token) => {},
  logout: () => {},
});

const calculateRemainingTime = (expirationTime) => {
  const currentTime = new Date().getTime();
  const adjExpirationTime = new Date(expirationTime).getTime();
  const remainingDuration = adjExpirationTime - currentTime;
  return remainingDuration;
};

const retreiveStoredToken = () => {
  const storedToken = localStorage.getItem("token");
  const storedLocalId = localStorage.getItem("localId");
  const storedExpirationDate = localStorage.getItem("expirationTime");
  const remainingTime = calculateRemainingTime(storedExpirationDate);

  if (remainingTime <= 60000) {
    localStorage.removeItem("token");
    localStorage.removeItem("localId");
    localStorage.removeItem("expirationTime");
    return null;
  }
  return { token: storedToken,localId:storedLocalId, duration: remainingTime };
};

export const AuthContextProvider = (props) => {
  const tokenData = retreiveStoredToken();
  let initialToken; 
  let initialLocalId;
  if (tokenData) {
    initialToken = tokenData.token;
    initialLocalId = tokenData.localId;
  }

  const [token, setToken] = useState(initialToken);
  const [UId, setUId] = useState(initialLocalId);

  const userIsLoggedIn = !!token;

  const logoutHandler = useCallback(() => {
    setToken(null);
    localStorage.removeItem("token");
    localStorage.removeItem("expirationTime");
    localStorage.removeItem("localId");

    if (logoutTimer) {
      clearTimeout(logoutTimer);
    }
  }, []);

  const loginHandler = (token, localId, expirationTime) => {
    setToken(token);
     setUId(localId);

    localStorage.setItem("token", token);
    localStorage.setItem("localId", localId);
    localStorage.setItem("expirationTime", expirationTime);

    const remainingTime = calculateRemainingTime(expirationTime);

    logoutTimer = setTimeout(logoutHandler, remainingTime);
  };

  useEffect(() => {
    if (tokenData) {
      console.log(tokenData.duration);
      logoutTimer = setTimeout(logoutHandler, tokenData.duration);

      
    }
  }, [tokenData, logoutHandler]);

  const contextValue = {
    token: token,
    localId: UId,
    isLoggedIn: userIsLoggedIn,
    login: loginHandler,
    logout: logoutHandler,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
