import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import AdminArea from "../components/AdminArea";
import CustomerList from "../components/CustomerList";
import CustomerRegistration from "../components/CustomerRegistration";
import Home from "../components/Home";
import SearchCustomer from "../components/SearchCustomer";

const Routes = () => {
  return (
    <>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route
            exact
            path="/customerRegistration"
            component={CustomerRegistration}
          />
          <Route exact path="/adminArea" component={AdminArea} />
          <Route
            exact
            path="/adminArea/customerList"
            component={CustomerList}
          />
          <Route
            exact
            path="/adminArea/searchCustomer"
            component={SearchCustomer}
          />
        </Switch>
      </BrowserRouter>
    </>
  );
};

export default Routes;
