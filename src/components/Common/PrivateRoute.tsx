import React, { FC, Component } from "react";
import { Navigate } from "react-router-dom";

import Layout from "../../pages/layout/Header";

interface Props {
  children: Component
  // any props that come into the component
}

const PrivateRoute: FC<Props> = ({ children, ...rest }) => {
  function hasJWT() {
    let flag = false;
    //check user has JWT token
    localStorage.getItem("token") ? (flag = true) : (flag = false);
    return flag;
  }
  if (hasJWT())
    return (
      <>
        <Layout />
        <React.Component {...rest}>{children}</React.Component>
      </>
    );
  return <Navigate to="/login" />;
};

export default PrivateRoute;
