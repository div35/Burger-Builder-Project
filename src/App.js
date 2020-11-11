import React, { Component, Suspense } from "react";
import Layout from "./components/Layout/Layout";
import Spinner from "./components/UI/Spinner/Spinner"
import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder";
import { Route, Switch, withRouter, Redirect } from "react-router-dom";
import Logout from "./containers/Auth/Logout/logout";
import { connect } from "react-redux";
import * as action from "./store/action/index";
// import Auth from "./containers/Auth/Auth";
// import Orders from "./containers/Orders/Orders";
// import Checkout from "./containers/Checkout/Checkout";
const Auth = React.lazy(() => import("./containers/Auth/Auth"));
const Orders = React.lazy(() => import("./containers/Orders/Orders"));
const Checkout = React.lazy(() => import("./containers/Checkout/Checkout"));


class App extends Component {
  componentDidMount() {
    this.props.onTryAutoSignUp();
  }
  render() {
    let routes = (
      <Suspense fallback={<Spinner/>}>
      <Switch>
        <Route path="/auth" component={Auth} />
        <Route path="/" exact component={BurgerBuilder} />
        <Redirect to="/" />
      </Switch>
      </Suspense>
    );

    if (this.props.isAuthenticated) {
      routes = (
        <Suspense fallback={<Spinner/>}>
        <Switch>
          <Route path="/orders" component={Orders} />
          <Route path="/checkout" component={Checkout} />
          <Route path="/auth" component={Auth} />\
          <Route path="/logout" component={Logout} />
          <Route path="/" exact component={BurgerBuilder} />
          <Redirect to="/" />
        </Switch>
        </Suspense>
      );
    }

    return (
      <div>
        <Layout>
          {routes}
        </Layout>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.token !== null,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onTryAutoSignUp: () => dispatch(action.authCheckState()),
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
